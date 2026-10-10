#!/usr/bin/env python3
"""Archive reviewed web articles as Markdown. Python 3.11+, standard library only.

Full text requires a reviewed reusable license. Summaries are editorial work,
never labeled full copies. No upstream code, fonts, scripts, or media are run.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = 1
LIMIT = 4 * 1024 * 1024
HOSTS = {'developers.google.com', 'journals.plos.org', 'www.digital.go.jp',
         'writingcenter.gmu.edu', 'www.ursulakleguin.com', 'lithub.com',
         'poets.org', 'johnaugust.com', 'www.craftscicom.org', 'www.wipo.int'}
KINDS = {'fulltext': '正文 Markdown', 'summary': '摘要 Markdown（非全文）',
         'document-index': '书籍阅读索引（非全文）'}
ENTRY = re.compile(r'^- \[([^\]]+)\]\((https://[^\s)]+)\)')
DECORATION = re.compile(r' <!-- article-copy -->.*?<!-- /article-copy -->')
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
SKIP = {'script', 'style', 'nav', 'header', 'footer', 'aside', 'form', 'button', 'noscript', 'svg'}

class ArchiveError(Exception):
    pass

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(c.text() if isinstance(c, Node) else c for c in self.children)
    def walk(self):
        yield self
        for c in self.children:
            if isinstance(c, Node):
                yield from c.walk()

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in VOID:
            self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break
    def handle_data(self, data):
        self.stack[-1].children.append(data)


def digest(data):
    return hashlib.sha256(data if isinstance(data, bytes) else data.encode('utf-8')).hexdigest()


def url_ok(url):
    p = urllib.parse.urlsplit(url)
    if p.scheme != 'https' or p.hostname not in HOSTS or p.username or p.password or p.port not in {None, 443}:
        raise ArchiveError('unreviewed download host or URL')
    return url

class Redirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        url_ok(newurl)
        # Do not follow cross-host redirects, even between separately approved hosts.
        if urllib.parse.urlsplit(req.full_url).hostname != urllib.parse.urlsplit(newurl).hostname:
            raise ArchiveError('cross-host redirect requires review')
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def decode_text(raw, declared=None):
    """Honor Unicode BOMs before HTTP charset; do not silently replace bad bytes."""
    for bom, encoding in ((b'\xff\xfe\x00\x00', 'utf-32'),
                          (b'\x00\x00\xfe\xff', 'utf-32'),
                          (b'\xff\xfe', 'utf-16'),
                          (b'\xfe\xff', 'utf-16'),
                          (b'\xef\xbb\xbf', 'utf-8-sig')):
        if raw.startswith(bom):
            return raw.decode(encoding, errors='strict')
    try:
        return raw.decode(declared or 'utf-8', errors='strict')
    except (UnicodeError, LookupError) as e:
        raise ArchiveError(f'unsupported text encoding (declared={declared!r}; prefix={raw[:8].hex()})') from e


def get(url):
    url_ok(url)
    req = urllib.request.Request(url, headers={'User-Agent': 'awesome-ai-taste-article-archive/1.0', 'Accept': 'text/html,text/plain,application/xml;q=0.9'})
    try:
        with urllib.request.build_opener(Redirect()).open(req, timeout=25) as r:
            raw = r.read(LIMIT + 1)
            encoding = r.headers.get_content_charset()
        if len(raw) > LIMIT:
            raise ArchiveError('page exceeds 4 MiB limit')
        return decode_text(raw, encoding)
    except urllib.error.HTTPError as e:
        raise ArchiveError(f'HTTP {e.code}') from e
    except (urllib.error.URLError, TimeoutError, UnicodeError) as e:
        raise ArchiveError(f'page download failed: {type(e).__name__}') from e


def link(url, base):
    target = urllib.parse.urljoin(base, url)
    return target if urllib.parse.urlsplit(target).scheme in {'http', 'https', 'mailto'} else ''


def md(n, base):
    if isinstance(n, str):
        return re.sub(r'\s+', ' ', n).replace('<', '&lt;').replace('>', '&gt;')
    if n.tag in SKIP or n.attrs.get('aria-hidden') == 'true':
        return ''
    if 'devsite-summary' in n.attrs.get('class', '') or n.tag.startswith('devsite-'):
        return ''
    if n.tag == 'pre':
        text = n.text().strip('\n')
        fence = '`' * max(3, max((len(x) for x in re.findall(r'`+', text)), default=0)+1)
        return '\n\n' + fence + '\n' + text + '\n' + fence + '\n\n'
    inside = ''.join(md(c, base) for c in n.children)
    if n.tag == 'a':
        href = link(n.attrs.get('href', ''), base)
        return f'[{inside.strip()}]({href.replace(" ", "%20")})' if href and inside.strip() else inside
    if n.tag == 'img':
        href = link(n.attrs.get('src', ''), base)
        alt = n.attrs.get('alt', 'Figure').replace('[', '').replace(']', '')
        return f'\n\n![{alt}]({href})\n\n' if href else ''
    if n.tag == 'iframe':
        href = link(n.attrs.get('src', ''), base)
        return f'\n\n[Embedded media; online only]({href})\n\n' if href else ''
    if re.fullmatch('h[1-6]', n.tag):
        return '\n\n' + '#' * int(n.tag[1]) + ' ' + inside.strip() + '\n\n'
    if n.tag in {'p', 'section', 'article', 'div', 'figure', 'figcaption', 'dl'}:
        return '\n\n' + inside.strip() + '\n\n'
    if n.tag in {'ul', 'ol'}:
        rows = []
        for i, c in enumerate((c for c in n.children if isinstance(c, Node) and c.tag == 'li'), 1):
            body = md(c, base).strip()
            rows.append((f'{i}. ' if n.tag == 'ol' else '- ') + body.replace('\n', '\n   '))
        return '\n\n' + '\n'.join(rows) + '\n\n'
    if n.tag in {'strong', 'b'}:
        return '**' + inside.strip() + '**'
    if n.tag in {'em', 'i'}:
        return '*' + inside.strip() + '*'
    if n.tag == 'code':
        return '`' + n.text().replace('`', '\\`') + '`'
    if n.tag == 'blockquote':
        return '\n\n' + '\n'.join('> '+x for x in inside.strip().splitlines()) + '\n\n'
    if n.tag == 'br':
        return '  \n'
    if n.tag == 'hr':
        return '\n\n---\n\n'
    if n.tag == 'table':
        rows = []
        for tr in n.walk():
            if tr.tag == 'tr':
                cells = [' '.join(md(c, base).split()).replace('|', '\\|') for c in tr.children if isinstance(c, Node) and c.tag in {'th','td'}]
                if cells:
                    rows.append(cells)
        if not rows:
            return inside
        width = max(map(len, rows))
        lines = ['| ' + ' | '.join(row + ['']*(width-len(row))) + ' |' for row in rows]
        lines.insert(1, '| ' + ' | '.join(['---']*width) + ' |')
        return '\n\n' + '\n'.join(lines) + '\n\n'
    return inside


def clean(text):
    return re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+', '\n\n', text).strip() + '\n'


def extract(html, markers):
    root = Document(html).root
    candidates = [n for n in root.walk() if n.tag in {'article','main','div','body'}
                  and all(marker.casefold() in n.text().casefold() for marker in markers)]
    if not candidates:
        raise ArchiveError('article structure/required markers changed')
    return min(candidates, key=lambda n: len(n.text()))


def content_for(cfg):
    if cfg['kind'] != 'fulltext':
        # No copyrighted original is written into a summary file.
        return cfg['summary'].strip() + '\n', None, None
    html = get(cfg['url'])
    evidence_url = cfg['license_evidence_url']
    evidence = html if evidence_url == cfg['url'] else get(evidence_url)
    if cfg['license_marker'].casefold() not in evidence.casefold():
        raise ArchiveError('reviewed license marker absent; manual review required')
    if cfg.get('converter') == 'official-text':
        links = [n for n in Document(html).root.walk() if n.tag == 'a' and '代替テキスト' in n.text()]
        if len(links) != 1:
            raise ArchiveError('official alternative-text link missing or ambiguous')
        text_url = urllib.parse.urljoin(cfg['url'], links[0].attrs.get('href',''))
        body = get(text_url).lstrip('\ufeff')
        if '<html' in body[:1000].lower() or len(body) < cfg['min_chars']:
            raise ArchiveError('official text download is not a complete text document')
        # Preserve the official accessible text; do not manufacture PDF headings.
        body = clean(body)
        return body, digest(body), {'url': text_url, 'license_evidence_sha256': digest(evidence)}
    node = extract(html, cfg['markers'])
    body = clean(md(node, cfg['url']))
    if len(body) < cfg['min_chars'] or not all(m.casefold() in body.casefold() for m in cfg['markers']):
        raise ArchiveError('empty/truncated Markdown article')
    return body, digest(body), {'url': cfg['url'], 'license_evidence_sha256': digest(evidence)}


def safe_file(root, relative):
    p = Path(relative)
    if p.is_absolute() or '..' in p.parts or '\\' in relative:
        raise ArchiveError('unsafe output path')
    target = root / p
    for part in [root, *target.parents, target]:
        if part.is_symlink():
            raise ArchiveError('symlink in managed output path')
    return target


def write(path, text):
    if path.exists() and path.read_text(encoding='utf-8') == text:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix+'.tmp')
    if temporary.is_symlink():
        raise ArchiveError('symlink temporary path')
    temporary.write_text(text, encoding='utf-8')
    temporary.replace(path)


def load(root):
    config = json.loads((root / 'pages.config.json').read_text(encoding='utf-8'))
    if config.get('version') != VERSION or not isinstance(config.get('pages'), list):
        raise ArchiveError('unsupported page config version')
    ids, urls = set(), set()
    for c in config['pages']:
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', c['id']) or c['id'] in ids:
            raise ArchiveError('duplicate/unsafe page ID')
        ids.add(c['id'])
        if c['kind'] not in KINDS:
            raise ArchiveError('unknown copy kind')
        url_ok(c['url'])
        if c['kind'] == 'fulltext' and c['license'] not in {'CC-BY-4.0','LicenseRef-PDL-1.0'}:
            raise ArchiveError('full-text license requires review')
        if c['kind'] != 'fulltext' and not c.get('summary', '').strip():
            raise ArchiveError('empty editorial summary')
        for u in c['catalog_urls']:
            if u in urls:
                raise ArchiveError('duplicate catalog URL')
            urls.add(u)
    return config['pages']


def document(c, body):
    metadata = {'title': c['title'], 'author': c['author'], 'source_url': c['url'],
                'copy_kind': c['kind'], 'license': c['license'], 'reviewed_on': c['reviewed_on']}
    front = '\n'.join(k+': '+json.dumps(v,ensure_ascii=False) for k,v in metadata.items())
    rights = ('正文按所列许可转换为 Markdown；删除网站导航和广告，保留正文及链接，未翻译。图片/视频为远程链接，不是完整离线媒体包。'
              if c['kind'] == 'fulltext' else '本文件为本仓库编辑撰写的摘要或阅读索引，不是原文全文、翻译或获授权的全文副本。')
    extra = ''.join(f'\n- [补充来源]({u})' for u in c.get('related_urls', []))
    return f'---\n{front}\n---\n\n# {c["title"]}\n\n> {KINDS[c["kind"]]}。{rights}\n\n作者／机构：{c["author"]}。\n\n[原文]({c["url"]}) · [许可依据]({c["license_evidence_url"]}){extra}\n\n{c["scope_note"]}\n\n---\n\n'+body


def decorate(text, pages, records):
    mapping = {u:c for c in pages for u in c['catalog_urls']}
    out = []
    for line in text.splitlines(keepends=True):
        line = DECORATION.sub('', line)
        m = ENTRY.match(line)
        if m and m[2] in mapping:
            c = mapping[m[2]]
            r = records.get(c['id'], {})
            if r.get('sha256'):
                label = {'fulltext':'Markdown 正文','summary':'Markdown 摘要','document-index':'Markdown 阅读索引'}[r['kind']]
                nl = '\n' if line.endswith('\n') else ''
                line = line.rstrip('\n') + f' <!-- article-copy --> · [{label}]({r["path"]})<!-- /article-copy -->' + nl
        out.append(line)
    return ''.join(out)


def page_index(pages, records, uncovered):
    lines = ['# 网页文章的 Markdown 版本', '',
             '正文副本、摘要和书籍索引分别统计。摘要不是全文副本；没有转载许可的原文仍是全文归档缺口。', '',
             '| 来源 | Markdown 类型 | 状态 | 文件 |', '| --- | --- | --- | --- |']
    for c in pages:
        r = records[c['id']]
        f = '['+c['id']+'.md]('+c['id']+'.md)' if r.get('sha256') else '尚未生成'
        lines.append(f'| {c["title"]} | {KINDS[c["kind"]]} | {r["status"]} | {f} |')
    lines += ['', '## 全文与更新边界', '',
              '摘要只随编辑明确修改而更新；自动同步不会抓取受版权保护的全文代替摘要。正文转换在每次本仓库相关 push 或手动触发时检查来源和许可，失败时保留已验证版本。书籍不冒充单页文章。', '',
              '文件头保存作者、来源、类型、许可和审阅日期；`manifest.json` 保存内容 SHA-256、正文来源摘要、转换版本和实际抓取记录。哈希只校验保存完整性，不代表内容权威性。', '',
              'GitHub 原生 Markdown 文档在上级各仓库副本目录中，不在这里重复复制。', '']
    for c in pages:
        r = records[c['id']]
        if r.get('error'):
            lines.append(f'- {c["id"]}：{r["error"]}。')
    if uncovered:
        lines += ['', '## 尚未登记的网页条目', ''] + ['- '+u for u in uncovered]
    return '\n'.join(lines)+'\n'


def run(root, mode):
    pages = load(root)
    readme = safe_file(root, 'README.md')
    text = readme.read_text(encoding='utf-8')
    lock_path = safe_file(root, 'vendor/articles/manifest.json')
    state = json.loads(lock_path.read_text(encoding='utf-8')) if lock_path.exists() else {'version':VERSION,'pages':{}}
    if state.get('version') != VERSION:
        raise ArchiveError('unrecognized article manifest')
    old = state['pages']
    approved = {u for c in pages for u in c['catalog_urls']}
    external = [m[2] for line in text.splitlines() if (m := ENTRY.match(line)) and urllib.parse.urlsplit(m[2]).hostname != 'github.com']
    uncovered = sorted(set(external)-approved)
    if mode == 'verify':
        if uncovered:
            raise ArchiveError('unregistered web articles: '+', '.join(uncovered))
        for c in pages:
            r = old.get(c['id'], {})
            if not r.get('sha256'):
                raise ArchiveError('missing Markdown: '+c['id'])
            path = safe_file(root, r['path'])
            if not path.is_file() or digest(path.read_bytes()) != r['sha256']:
                raise ArchiveError('Markdown integrity failure: '+c['id'])
            if r['kind'] != c['kind'] or r.get('config_sha256') != digest(json.dumps(c,sort_keys=True,ensure_ascii=False)):
                raise ArchiveError('article config differs from saved copy: '+c['id'])
        print(f'{len(pages)} Markdown documents verified; '+str(sum(c['kind']=='summary' for c in pages))+' are summaries, NOT full text.')
        return 0
    records, failures, updates = {}, len(uncovered), 0
    for c in pages:
        key = c['id']
        r = dict(old.get(key, {}))
        config_hash = digest(json.dumps(c,sort_keys=True,ensure_ascii=False))
        try:
            body, source_hash, evidence = content_for(c)
            output = document(c, body)
            content_hash = digest(output)
            path = f'vendor/articles/{key}.md'
            local = safe_file(root, path)
            changed = (content_hash != r.get('sha256') or not local.is_file() or digest(local.read_bytes()) != content_hash)
            updates += int(changed)
            path = f'vendor/articles/{key}.md'
            if mode == 'sync':
                write(safe_file(root, path), output)
            stamp = (datetime.now(timezone.utc).isoformat() if changed else r.get('saved_at'))
            r = {'path':path, 'kind':c['kind'], 'sha256':content_hash, 'source_sha256':source_hash,
                 'config_sha256':config_hash, 'converter_version':VERSION, 'license':c['license'],
                 'source_url':c['url'], 'saved_at':stamp, 'source_evidence':evidence if changed else r.get('source_evidence', evidence),
                 'status': 'current' if c['kind']=='fulltext' else 'summary-only' if c['kind']=='summary' else 'index-only'}
        except (ArchiveError, OSError, ValueError, KeyError) as e:
            failures += 1
            r.update(status='blocked', error=str(e))
            r.setdefault('kind',c['kind'])
        records[key] = r
        print(key+': '+r['status']+(' — '+r['error'] if r.get('error') else ''))
    if mode == 'sync':
        write(lock_path, json.dumps({'version':VERSION,'pages':records,'unregistered':uncovered},ensure_ascii=False,indent=2)+'\n')
        write(safe_file(root, 'vendor/articles/README.md'), page_index(pages,records,uncovered))
        result = decorate(text,pages,records)
        # Correct an old schedule description; do not change actual trigger cadence.
        result = result.replace('保留原许可证，每 6 小时检查更新。', '保留原许可证，在本仓库相关内容推送或手动触发时检查更新。')
        if '[网页 Markdown 状态](vendor/articles/README.md)' not in result:
            result = result.replace('[副本状态](vendor/README.md)', '[副本状态](vendor/README.md) · [网页 Markdown 状态](vendor/articles/README.md)')
        write(readme, result)
    print(f'{len(pages)} pages; {updates} changed; {failures} blocked/unregistered; mode={mode}')
    return 2 if failures else 1 if updates and mode=='check' else 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group(required=True)
    for mode in ('check','sync','verify'):
        modes.add_argument('--'+mode,action='store_true')
    args = parser.parse_args()
    try:
        return run(ROOT, 'check' if args.check else 'verify' if args.verify else 'sync')
    except (ArchiveError,OSError,ValueError,KeyError) as e:
        print('ERROR: '+str(e),file=sys.stderr)
        return 2

if __name__ == '__main__':
    raise SystemExit(main())
