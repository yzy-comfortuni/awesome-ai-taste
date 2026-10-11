"""Build small, read-only task pages from CATALOG.md. No network or upstream code."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import quote, unquote, urlsplit

try:
    from .catalog import read_catalog
except ImportError:
    from catalog import read_catalog

ROOT = Path(__file__).resolve().parents[1]
MARKER = '<!-- generated: task-views; edit CATALOG.md -->'
ENTRY = re.compile(r'^- \[([^\]\n]+)\]\((https://[^\s)]+)\)')
LINK = re.compile(r'\[([^\]\n]+)\]\(([^\s)]+)\)')
META = re.compile(r' <!-- (source-meta|article-copy) -->.*?<!-- /\1 -->')
RULE = re.compile(r'^  \*\*规则：\*\* .+\[出处\]\(https://[^\s)]+\)$')
KINDS = {'fulltext': 'Markdown 正文', 'summary': 'Markdown 摘要（非全文）',
         'document-index': 'Markdown 阅读索引（非全文）'}


def safe(root: Path, relative: str) -> Path:
    parts = relative.split('/')
    if not relative or any(p in {'', '.', '..'} for p in parts) or '\\' in relative:
        raise ValueError('unsafe task-view path')
    path = root
    if path.is_symlink():
        raise ValueError('symlink in task-view path')
    for part in parts:
        path /= part
        if path.is_symlink():
            raise ValueError('symlink in task-view path')
    return path


def read_json(root: Path, name: str, default: dict) -> dict:
    path = safe(root, name)
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else default


def sections(text: str) -> dict[str, list[tuple[str, str]]]:
    """Keep catalog order and rule text; reject missing or duplicate rules."""
    result, heading, entry, rule = {}, None, None, None

    def finish():
        nonlocal entry, rule
        if entry is not None:
            if not heading or rule is None:
                raise ValueError('catalog entry needs a category and one sourced rule')
            result.setdefault(heading, []).append((entry, rule))
        entry = rule = None

    seen = set()
    for line in text.splitlines():
        if line.startswith('## '):
            finish()
            heading = line[3:].strip()
            if not re.fullmatch(r'[\w -]+', heading) or heading.casefold() in seen:
                raise ValueError('unsafe or duplicate category')
            seen.add(heading.casefold())
        elif ENTRY.match(line):
            finish()
            entry = line
        elif line.startswith('  **规则：**'):
            if entry is None or rule is not None or not RULE.fullmatch(line):
                raise ValueError('missing source or duplicate rule')
            rule = line
    finish()
    if not result:
        raise ValueError('empty task catalog')
    return result


def snapshot_link(root: Path, url: str, records: dict) -> str | None:
    """Map a reviewed GitHub blob URL to an existing Markdown file, never a directory."""
    parsed = urlsplit(url)
    parts = unquote(parsed.path).strip('/').split('/')
    if parsed.scheme != 'https' or parsed.netloc != 'github.com' or len(parts) < 5 or parts[2] != 'blob':
        return None
    key = '/'.join(parts[:2]).lower()
    record = records.get(key, {})
    if not record.get('copied_sha'):
        return None
    rest = '/'.join(parts[3:])
    refs = {record.get(k) for k in ('branch', 'copied_sha', 'upstream_sha')} - {None, ''}
    for ref in sorted(refs, key=len, reverse=True):
        if not rest.startswith(ref + '/'):
            continue
        tail = rest[len(ref) + 1:]
        if Path(tail).suffix.lower() not in {'.md', '.markdown'}:
            return None
        path = safe(root, f'vendor/{key}/{tail}')
        if path.is_file():
            target = quote(f'../{key}/{tail}', safe='/._-~')
            return target + ('#' + parsed.fragment if parsed.fragment else '')
        return None
    return None


def article_link(root: Path, url: str, pages: list, records: dict) -> str:
    for cfg in pages:
        if url not in cfg['catalog_urls']:
            continue
        record = records.get(cfg['id'], {})
        if not record.get('sha256'):
            return ''
        expected = f'vendor/articles/{cfg["id"]}.md'
        if record.get('path') != expected or record.get('kind') != cfg['kind']:
            raise ValueError('article path/type mismatch')
        path = safe(root, expected)
        if not path.is_file():
            return ''
        if hashlib.sha256(path.read_bytes()).hexdigest() != record['sha256']:
            raise ValueError('article hash mismatch')
        label = KINDS[cfg['kind']]
        return f' · [{label}](../articles/{cfg["id"]}.md)'
    return ''


def render(root: Path) -> dict[str, str]:
    home = safe(root, 'README.md').read_text(encoding='utf-8')
    text = read_catalog(root, home)
    sources = read_json(root, 'sources.lock.json', {'sources': {}})['sources']
    pages = read_json(root, 'pages.config.json', {'pages': []})['pages']
    articles = read_json(root, 'vendor/articles/manifest.json', {'pages': {}})['pages']
    output = {}
    for heading, entries in sections(text).items():
        lines = [MARKER, f'# {heading}', '',
                 '按语言和用途选 1–2 项，需要语境再读正文。副本是已保存版本，摘要不是全文。', '']
        for intro, rule in entries:
            canonical = ENTRY.match(intro)[2]
            intro = META.sub('', intro)

            def direct(match):
                label, url = match.groups()
                local = snapshot_link(root, url, sources)
                return f'[副本·{label}]({local})' if local else match[0]

            intro = LINK.sub(direct, intro)
            intro += article_link(root, canonical, pages, articles)
            # Source attribution and the full rule are kept verbatim.
            lines.extend([intro, '', rule, ''])
        output[f'vendor/tasks/{heading}.md'] = '\n'.join(lines)
    return output


def run(root: Path, mode: str) -> int:
    if mode not in {'sync', 'check', 'verify'}:
        raise ValueError('unknown task-view mode')
    expected = render(root)
    directory = safe(root, 'vendor/tasks')
    existing = set()
    if directory.exists():
        for path in directory.iterdir():
            relative = path.relative_to(root).as_posix()
            safe(root, relative)
            if not path.is_file() or not path.read_text(encoding='utf-8').startswith(MARKER + '\n'):
                raise ValueError('unmanaged file in task-view directory; inspect before writing')
            existing.add(relative)
    changed = []
    for relative, body in expected.items():
        path = safe(root, relative)
        if not path.is_file() or path.read_text(encoding='utf-8') != body:
            changed.append(relative)
    removed = existing - expected.keys()
    if mode == 'sync':
        directory.mkdir(parents=True, exist_ok=True)
        for relative in changed:
            path = safe(root, relative)
            temporary = safe(root, relative + '.tmp')
            if temporary.exists():
                raise ValueError('unfinished task-view write; inspect temporary file')
            temporary.write_text(expected[relative], encoding='utf-8')
            temporary.replace(path)
        for relative in removed:
            safe(root, relative).unlink()
    elif mode == 'verify' and (changed or removed):
        raise ValueError('task views differ from catalog/snapshots; run task_views.py --sync')
    print(f'{len(expected)} task pages; {len(changed)} changed; {len(removed)} removed; mode={mode}')
    return 1 if mode == 'check' and (changed or removed) else 0


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group(required=True)
    for mode in ('sync', 'check', 'verify'):
        modes.add_argument('--' + mode, action='store_true')
    args = parser.parse_args()
    try:
        result = run(ROOT, 'sync' if args.sync else 'check' if args.check else 'verify')
    except (OSError, ValueError, KeyError) as exc:
        print(f'ERROR: {exc}')
        result = 2
    raise SystemExit(result)
