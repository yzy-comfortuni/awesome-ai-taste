#!/usr/bin/env python3
"""Maintain Stars badges and commit-pinned source snapshots. Python 3.11+, stdlib only.

README is the catalog; sources.config.json only contains scope/license exceptions.
No upstream scripts, package managers, hooks, submodules, or LFS objects are run.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import io
import json
import os
import re
import shutil
import sys
import tarfile
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
ENTRY = re.compile(r'^- \[[^\]\n]+\]\(https://github\.com/([A-Za-z0-9][A-Za-z0-9-]*)/([A-Za-z0-9_.-]+)(?:[/#?][^\s)]*)?\)')
REPO = re.compile(r'[A-Za-z0-9][A-Za-z0-9-]*/[A-Za-z0-9][A-Za-z0-9_.-]*\Z')
SHA = re.compile(r'[a-f0-9]{40}\Z')
DECORATION = re.compile(r' <!-- source-meta -->.*?<!-- /source-meta -->')
LEGAL = re.compile(r'^(licen[cs]e|copying|copyright|notice|authors|third[-_]party)', re.I)
ALLOWED = {'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', '0BSD', 'ISC',
           'Unlicense', 'CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0',
           'GPL-2.0', 'GPL-3.0', 'LGPL-2.1', 'LGPL-3.0', 'MPL-2.0', 'LicenseRef-Public-Domain'}
MAX_DOWNLOAD = 32 * 1024 * 1024
MAX_EXPANDED = 128 * 1024 * 1024
MAX_SNAPSHOT = 32 * 1024 * 1024
MAX_FILE = 8 * 1024 * 1024
MAX_MEMBERS = 12000
# Git metadata/attributes must not affect the parent repository; fonts are not mirrored.
EXCLUDED_NAMES = {'.git', '.gitattributes'}
EXCLUDED_SUFFIXES = {'.ttf', '.otf', '.woff', '.woff2', '.eot'}


class SyncError(Exception):
    """A source could not be safely checked or mirrored."""


class SafeRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        old, new = urllib.parse.urlsplit(req.full_url), urllib.parse.urlsplit(newurl)
        if new.scheme != 'https' or old.hostname != new.hostname:
            raise SyncError('cross-host redirect refused')
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def get(url: str, limit: int = 4 * 1024 * 1024) -> bytes:
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != 'https' or parsed.hostname not in {'api.github.com', 'codeload.github.com', 'raw.githubusercontent.com'}:
        raise SyncError('unexpected download host')
    headers = {'User-Agent': 'awesome-ai-taste-source-sync', 'Accept': 'application/vnd.github+json'}
    token = os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN')
    if token and parsed.hostname == 'api.github.com':
        headers['Authorization'] = f'Bearer {token}'
    opener = urllib.request.build_opener(SafeRedirect())
    for attempt in range(3):
        try:
            with opener.open(urllib.request.Request(url, headers=headers), timeout=45) as response:
                body = response.read(limit + 1)
            if len(body) > limit:
                raise SyncError(f'download exceeds {limit // 1024 // 1024} MiB')
            return body
        except urllib.error.HTTPError as exc:
            if exc.code in {429, 500, 502, 503, 504} and attempt < 2:
                time.sleep(2 ** attempt)
                continue
            # Do not log URLs, response bodies, or request headers containing credentials.
            raise SyncError(f'GitHub HTTP {exc.code}; rate limits/permissions may apply') from exc
        except (urllib.error.URLError, TimeoutError) as exc:
            if attempt < 2:
                time.sleep(2 ** attempt)
                continue
            raise SyncError('network request failed') from exc
    raise SyncError('request failed')


def api(path: str) -> dict:
    return json.loads(get('https://api.github.com/repos/' + path))


def discover(text: str) -> dict[str, str]:
    repos = {}
    for line in text.splitlines():
        match = ENTRY.match(line)
        if match:
            name = '/'.join(match.groups()).removesuffix('.git')
            if not REPO.fullmatch(name):
                raise SyncError('invalid repository name')
            repos.setdefault(name.lower(), name)
    return repos


def safe_path(raw: str) -> PurePosixPath:
    if '\\' in raw or any(ord(c) < 32 or ord(c) == 127 for c in raw):
        raise SyncError('unsafe archive path')
    parts = raw.split('/')
    if not raw or raw.startswith('/') or '..' in parts or ':' in raw:
        raise SyncError('unsafe archive path')
    p = PurePosixPath(raw)
    if not p.parts or any(x.lower() == '.git' for x in p.parts):
        raise SyncError('Git metadata or empty path refused')
    return p


def scope_for(config: dict) -> list[str]:
    paths = config.get('paths', ['.'])
    if not isinstance(paths, list) or not paths:
        raise SyncError('scope must be a nonempty list')
    for p in paths:
        if p != '.':
            safe_path(p)
    return sorted(set(paths))


def selected(path: str, scopes: list[str]) -> bool:
    if '.' in scopes or any(path == s or path.startswith(s + '/') for s in scopes):
        return True
    p = PurePosixPath(path)
    # Keep legal/attribution files at the root and every ancestor of a selected scope.
    return bool(LEGAL.match(p.name)) and any(p.parent == PurePosixPath('.') or
            p.parent == PurePosixPath(s) or p.parent in PurePosixPath(s).parents for s in scopes)


def unpack(data: bytes, dest: Path, scopes: list[str], license_path: str) -> list[str]:
    """Validate the full archive, then write regular files only into a new empty directory."""
    records, skipped, roots, seen = [], [], set(), set()
    expanded = kept = 0
    with tarfile.open(fileobj=io.BytesIO(data), mode='r:gz') as archive:
        for index, member in enumerate(archive, 1):
            if index > MAX_MEMBERS:
                raise SyncError('archive has too many members')
            p = safe_path(member.name.rstrip('/'))
            roots.add(p.parts[0])
            if len(roots) != 1:
                raise SyncError('archive must have one root')
            if len(p.parts) == 1:
                if not member.isdir():
                    raise SyncError('archive root is not a directory')
                continue
            rel = PurePosixPath(*p.parts[1:])
            path = str(rel)
            if path in seen:
                raise SyncError('duplicate archive path')
            seen.add(path)
            if member.isdir():
                continue
            expanded += member.size
            if expanded > MAX_EXPANDED:
                raise SyncError('archive expansion limit exceeded')
            if not selected(path, scopes) and path != license_path:
                continue
            if not member.isfile():
                skipped.append(path + ' (non-regular file; not followed)')
                continue
            if rel.name.lower() in EXCLUDED_NAMES or rel.suffix.lower() in EXCLUDED_SUFFIXES:
                skipped.append(path + ' (excluded metadata/font)')
                continue
            if member.size > MAX_FILE:
                raise SyncError('selected file exceeds 8 MiB; narrow the scope')
            kept += member.size
            if kept > MAX_SNAPSHOT:
                raise SyncError('snapshot exceeds 32 MiB; narrow the scope')
            stream = archive.extractfile(member)
            if stream is None:
                raise SyncError('unreadable archive member')
            content = stream.read(MAX_FILE + 1)
            if len(content) != member.size:
                raise SyncError('truncated archive member')
            if content.startswith(b'version https://git-lfs.github.com/spec/v1\n'):
                skipped.append(path + ' (LFS pointer retained; object not downloaded)')
            records.append((path, content, 0o755 if member.mode & 0o111 else 0o644))
        names = {p for p, _, _ in records}
        if license_path not in names:
            raise SyncError('approved license is missing from snapshot')
        for scope in scopes:
            if scope != '.' and not any(p == scope or p.startswith(scope + '/') for p in names):
                raise SyncError(f'selected scope is missing: {scope}')
        if not records:
            raise SyncError('empty snapshot')
        for path, content, mode in records:
            target = dest / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(content)
            target.chmod(mode)
    return sorted(skipped)



def download_scoped(repo: str, head: str, dest: Path, scopes: list[str], license_path: str) -> list[str]:
    """Walk only selected Git subtrees and verify each raw file against its Git blob SHA.

    This avoids downloading a large monorepo just to retain one small skill. Every
    tree and raw URL is pinned to the same commit, not a moving branch. No links or
    submodules are followed. A truncated listing is an error, never an empty tree.
    """
    if not REPO.fullmatch(repo) or not SHA.fullmatch(head):
        raise SyncError('invalid pinned source')
    pending, records, skipped, seen = [('', head)], [], [], set()
    entries = requests = total = 0
    interests = scopes + [license_path]
    while pending:
        prefix, tree_sha = pending.pop()
        requests += 1
        if requests > 200:
            raise SyncError('selected source requires too many tree requests')
        tree = api(f'{repo}/git/trees/{tree_sha}')
        if tree.get('truncated') or not isinstance(tree.get('tree'), list):
            raise SyncError('incomplete Git tree; refusing partial snapshot')
        for item in tree['tree']:
            entries += 1
            if entries > MAX_MEMBERS:
                raise SyncError('selected tree has too many members')
            name = str(safe_path(item['path']))
            if '/' in name:
                raise SyncError('non-recursive Git tree contains a nested path')
            path = prefix + name
            safe_path(path)
            if path in seen:
                raise SyncError('duplicate Git tree path')
            seen.add(path)
            sha = item.get('sha', '')
            if not SHA.fullmatch(sha):
                raise SyncError('invalid Git object SHA')
            if item.get('type') == 'tree':
                if any(s == '.' or path == s or path.startswith(s + '/') or
                       s.startswith(path + '/') for s in interests):
                    pending.append((path + '/', sha))
                continue
            if not selected(path, scopes) and path != license_path:
                continue
            if item.get('type') != 'blob' or item.get('mode') not in {'100644', '100755'}:
                skipped.append(path + ' (non-regular file/submodule; not followed)')
                continue
            relative = PurePosixPath(path)
            if relative.name.lower() in EXCLUDED_NAMES or relative.suffix.lower() in EXCLUDED_SUFFIXES:
                skipped.append(path + ' (excluded metadata/font)')
                continue
            size = item.get('size')
            if not isinstance(size, int) or size < 0 or size > MAX_FILE:
                raise SyncError('selected file exceeds limit or has invalid size')
            total += size
            if total > MAX_SNAPSHOT:
                raise SyncError('snapshot exceeds 32 MiB; narrow the scope')
            records.append((path, sha, size, item['mode']))
    names = {r[0] for r in records}
    if license_path not in names:
        raise SyncError('approved license is missing from selected tree')
    for scope in scopes:
        if scope != '.' and not any(p == scope or p.startswith(scope + '/') for p in names):
            raise SyncError(f'selected scope is missing: {scope}')
    for path, sha, size, mode in records:
        data = get(f'https://raw.githubusercontent.com/{repo}/{head}/{urllib.parse.quote(path)}', MAX_FILE)
        blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        if len(data) != size or blob != sha:
            raise SyncError('downloaded file differs from pinned Git blob')
        if data.startswith(b'version https://git-lfs.github.com/spec/v1\n'):
            skipped.append(path + ' (LFS pointer retained; object not downloaded)')
        target = dest / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        target.chmod(0o755 if mode == '100755' else 0o644)
    return sorted(skipped)


def digest_tree(path: Path) -> tuple[str, int, int]:
    digest = hashlib.sha256()
    count = size = 0
    for p in sorted(path.rglob('*')):
        if p.is_symlink():
            raise SyncError('local snapshot contains a symlink')
        if p.is_file():
            data = p.read_bytes()
            mode = 'x' if p.stat().st_mode & 0o111 else '-'
            digest.update(str(p.relative_to(path)).encode() + b'\0' + mode.encode() +
                          hashlib.sha256(data).digest())
            count += 1
            size += len(data)
    return digest.hexdigest(), count, size


def licensed(repo: str, sha: str, cfg: dict, previous: dict) -> dict:
    manual = cfg.get('license')
    if manual:
        if manual.get('spdx') not in ALLOWED or not SHA.fullmatch(manual.get('sha', '')):
            raise SyncError('invalid reviewed license exception')
        path = str(safe_path(manual['path']))
        info = api(f'{repo}/contents/{urllib.parse.quote(path)}?ref={sha}')
        spdx = manual['spdx']
        if info.get('sha') != manual['sha']:
            raise SyncError('reviewed license changed; manual review required')
    else:
        info = api(f'{repo}/license?ref={sha}')
        spdx = (info.get('license') or {}).get('spdx_id')
        path = info.get('path', '')
        if spdx not in ALLOWED:
            raise SyncError('license missing/unclear/unsupported; link only until reviewed')
        safe_path(path)
    content = base64.b64decode(info.get('content', ''))
    actual = hashlib.sha1(b'blob ' + str(len(content)).encode() + b'\0' + content).hexdigest()
    if not content or actual != info.get('sha'):
        raise SyncError('license content/hash mismatch')
    old = previous.get('license', {})
    if old and old.get('sha') != actual and not manual:
        raise SyncError('license text changed; manual review required')
    return {'spdx': spdx, 'path': path, 'sha': actual}


def source_target(root: Path, key: str) -> Path:
    if not REPO.fullmatch(key):
        raise SyncError('invalid source key')
    target = root / 'vendor' / key
    for p in [root / 'vendor', target.parent, target]:
        if p.is_symlink():
            raise SyncError('snapshot path is a symlink')
    return target


def replace_snapshot(staged: Path, target: Path) -> None:
    """Keep the prior snapshot until a validated replacement is ready; roll back rename errors."""
    target.parent.mkdir(parents=True, exist_ok=True)
    backup = target.with_name(target.name + '.sync-backup')
    if backup.exists() or backup.is_symlink():
        raise SyncError('unfinished replacement backup exists; inspect it before retrying')
    had_old = target.exists()
    if had_old:
        target.rename(backup)
    try:
        staged.rename(target)
    except OSError:
        if had_old:
            backup.rename(target)
        raise
    if had_old:
        shutil.rmtree(backup)


def update_one(root: Path, key: str, repo: str, cfg: dict, old: dict, write: bool, observed: dict | None = None) -> dict:
    target = source_target(root, key)
    meta = api(repo)
    if meta.get('private') or meta.get('full_name', '').lower() != key:
        raise SyncError('private/moved repository; update the reviewed catalog first')
    branch = meta['default_branch']
    head = api(f'{repo}/branches/{urllib.parse.quote(branch, safe="")}')['commit']['sha']
    if not SHA.fullmatch(head):
        raise SyncError('invalid upstream commit')
    scopes = scope_for(cfg)
    record = {**old, 'repository': repo, 'branch': branch, 'upstream_sha': head,
              'stars': meta['stargazers_count'], 'archived': meta.get('archived', False),
              'scope': scopes, 'config_sha256': hashlib.sha256(json.dumps(cfg, sort_keys=True).encode()).hexdigest()}
    if observed is not None:
        observed.update(record)
    unchanged = (old.get('copied_sha') == head and old.get('scope') == scopes and
                 old.get('config_sha256') == record['config_sha256'] and
                 target.is_dir() and digest_tree(target)[0] == old.get('tree_sha256'))
    if unchanged:
        record.update(status='current')
        record.pop('error', None)
        return record
    # --check does not claim new content is licensed; --sync rechecks it before copying.
    if not write:
        record['status'] = 'update-available'
        return record
    approval = licensed(repo, head, cfg, old)
    fetch_mode = cfg.get('fetch', 'archive')
    if fetch_mode not in {'archive', 'git-tree'}:
        raise SyncError('unsupported fetch mode')
    data = get(f'https://codeload.github.com/{repo}/tar.gz/{head}', MAX_DOWNLOAD) if fetch_mode == 'archive' else None
    with tempfile.TemporaryDirectory(prefix='.source-stage-', dir=root) as temp:
        staged = Path(temp) / 'snapshot'
        staged.mkdir()
        skipped = (unpack(data, staged, scopes, approval['path']) if data is not None else
                   download_scoped(repo, head, staged, scopes, approval['path']))
        license_data = (staged / approval['path']).read_bytes()
        blob = hashlib.sha1(b'blob ' + str(len(license_data)).encode() + b'\0' + license_data).hexdigest()
        if blob != approval['sha']:
            raise SyncError('archive license differs from reviewed license')
        digest, count, size = digest_tree(staged)
        replace_snapshot(staged, target)
    record.update(copied_sha=head, license=approval, tree_sha256=digest,
                  archive_sha256=hashlib.sha256(data).hexdigest() if data is not None else None,
                  fetch_mode=fetch_mode, files=count,
                  bytes=size, exclusions=skipped, status='current')
    record.pop('error', None)
    return record


def decorate(text: str, records: dict) -> str:
    lines = []
    for line in text.splitlines(keepends=True):
        line = DECORATION.sub('', line)
        match = ENTRY.match(line)
        if match:
            repo = '/'.join(match.groups()).removesuffix('.git')
            key = repo.lower()
            badge = f'[![Stars](https://img.shields.io/github/stars/{repo}?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/{repo}/stargazers)'
            record = records.get(key, {})
            copy = f' · [副本](vendor/{key})' if record.get('copied_sha') else ''
            nl = '\n' if line.endswith('\n') else ''
            line = line.rstrip('\n') + f' <!-- source-meta -->{badge}{copy}<!-- /source-meta -->' + nl
        lines.append(line)
    return ''.join(lines)


def status_page(records: dict) -> str:
    rows = ['# 来源副本状态', '', '由 `scripts/sync_sources.py --sync` 生成。Star 数为最近一次成功检查的快照；README 徽章独立缓存刷新。', '',
            '目录中的文件保持各自的原始许可证，不由本仓库重新授权。这里只同步源码，不安装或执行上游代码。',
            '“current”表示记录的上游 commit 已复制并通过本地内容校验，不代表安全审计或效果验证。错误时保留上次成功副本。', '',
            '| 仓库 | Stars | 状态 | 已复制 commit | 范围 |', '| --- | ---: | --- | --- | --- |']
    for key, r in records.items():
        repo = r['repository']
        sha = r.get('copied_sha')
        copied = f'[`{sha[:7]}`](https://github.com/{repo}/commit/{sha}) · [文件]({key}/)' if sha else '—'
        scope = ', '.join(r.get('scope', ['.']))
        rows.append(f'| [{repo}](https://github.com/{repo}) | {r.get("stars", "—")} | {r["status"]} | {copied} | `{scope}` |')
    rows.extend(['', '## 边界与待处理项', '',
                 '`.` 表示仓库范围，其他路径表示仅收录目录，不是完整安装包。Git 历史和子模块不会递归复制；Git 属性文件、字体和非普通文件不复制，LFS 只保留指针。完整排除清单、许可证、SHA 和内容摘要见 [`sources.lock.json`](../sources.lock.json)。', ''])
    for key, r in records.items():
        if r.get('error'):
            rows.append(f'- **{key}**：{r["error"]}。' + ('保留旧副本，未声称已更新。' if r.get('copied_sha') else '暂未生成副本。'))
        if r.get('exclusions'):
            rows.append(f'- **{key}**：有 {len(r["exclusions"])} 项排除或 LFS 提示，见锁定文件。')
    return '\n'.join(rows) + '\n'


def write_text(path: Path, text: str) -> None:
    if path.is_symlink():
        raise SyncError('managed file is a symlink')
    if path.exists() and path.read_text(encoding='utf-8') == text:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + '.tmp')
    if temp.is_symlink():
        raise SyncError('temporary file is a symlink')
    temp.write_text(text, encoding='utf-8')
    temp.replace(path)


def run(root: Path, mode: str) -> int:
    for managed in ['vendor', 'README.md', 'sources.config.json', 'sources.lock.json']:
        if (root / managed).is_symlink():
            raise SyncError('managed path is a symlink')
    readme = root / 'README.md'
    text = readme.read_text(encoding='utf-8')
    repos = discover(text)
    lock_path = root / 'sources.lock.json'
    state = json.loads(lock_path.read_text(encoding='utf-8')) if lock_path.exists() else {'version': 1, 'sources': {}}
    if state.get('version') != 1 or not isinstance(state.get('sources'), dict):
        raise SyncError('unrecognized lock format; refusing to overwrite')
    old = state['sources']
    if mode == 'badges':
        write_text(readme, decorate(text, old))
        return 0
    if mode == 'verify':
        for key, r in old.items():
            if r.get('copied_sha'):
                target = source_target(root, key)
                if not target.is_dir() or digest_tree(target)[0] != r['tree_sha256']:
                    raise SyncError(f'integrity failure: {key}')
        print('All recorded snapshots match their content hashes.')
        return 0
    config_path = root / 'sources.config.json'
    config = json.loads(config_path.read_text(encoding='utf-8')) if config_path.exists() else {}
    records, failures, updates = {}, 0, 0
    for key, repo in repos.items():
        observed = {**old.get(key, {}), 'repository': repo}
        try:
            r = update_one(root, key, repo, config.get(key, {}), old.get(key, {}), mode == 'sync', observed)
            updates += int(r.get('copied_sha') != old.get(key, {}).get('copied_sha') or r['status'] == 'update-available')
        except (SyncError, OSError, ValueError, KeyError, tarfile.TarError) as exc:
            r = {**observed, 'status': 'blocked', 'error': str(exc)}
            failures += 1
        records[key] = r
        print(f'{repo}: {r["status"]}' + (f' — {r["error"]}' if r.get('error') else ''))
    if mode == 'sync':
        # A removal from the reviewed README removes its managed snapshot, never restores it.
        for key in old.keys() - repos.keys():
            target = source_target(root, key)
            if target.exists():
                shutil.rmtree(target)
        write_text(lock_path, json.dumps({'version': 1, 'sources': records}, ensure_ascii=False, indent=2) + '\n')
        write_text(root / 'vendor' / 'README.md', status_page(records))
        write_text(readme, decorate(text, records))
    print(f'{len(repos)} repositories; {updates} updates; {failures} blocked. mode={mode}')
    return 2 if failures else (1 if updates and mode == 'check' else 0)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--check', action='store_true', help='read-only upstream check; exit 1 means updates, 2 means blocked')
    group.add_argument('--sync', action='store_true', help='update snapshots, lock, Stars badges and status page')
    group.add_argument('--badges-only', action='store_true', help='decorate README without network access')
    group.add_argument('--verify', action='store_true', help='verify existing snapshot content hashes offline')
    args = parser.parse_args()
    mode = 'check' if args.check else 'sync' if args.sync else 'verify' if args.verify else 'badges'
    try:
        return run(ROOT, mode)
    except (SyncError, OSError, ValueError, KeyError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
