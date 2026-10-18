"""Validate first-party trial notes and render them beside selected source rules.

No downloads, source execution, or semantic-quality claims. CATALOG.md alone
selects resources; examples are optional and cannot add new sources.
"""
from __future__ import annotations
import json
from pathlib import Path
import re
from urllib.parse import quote, unquote, urlsplit

ENTRY = re.compile(r'^- \[[^\]\n]+\]\((https://[^\s)]+)\)', re.M)
FIELDS = {'url', 'task', 'io', 'environment', 'example'}
OPTIONAL = {'note', 'errata'}


def safe(root: Path, relative: str) -> Path:
    parts = relative.split('/')
    if (not relative or any(p in {'', '.', '..'} for p in parts)
            or '\\' in relative or any(ord(c) < 32 for c in relative)):
        raise ValueError('unsafe practice path')
    path = root
    for part in ['', *parts]:
        if part:
            path /= part
        if path.is_symlink():
            raise ValueError('symlink in practice path')
    return path


def reference(root: Path, target: str) -> str:
    parsed = urlsplit(target)
    if parsed.scheme or parsed.netloc or parsed.query:
        raise ValueError('practice references must be local')
    relative = unquote(parsed.path)
    anchor = unquote(parsed.fragment)
    if not relative.endswith('.md') or not re.fullmatch(r'[a-z][a-z0-9-]*', anchor):
        raise ValueError('practice reference needs a Markdown file and explicit anchor')
    path = safe(root, relative)
    if not path.is_file():
        raise ValueError('missing practice file: ' + relative)
    if f'<a id="{anchor}"></a>' not in path.read_text(encoding='utf-8'):
        raise ValueError('missing practice anchor: ' + target)
    return quote('../../' + relative, safe='/._-~') + '#' + anchor


def load(root: Path, catalog: str) -> dict[str, dict[str, str]]:
    path = safe(root, 'examples/manifest.json')
    if not path.exists():
        return {}  # Older checkouts and isolated synchronizer fixtures.
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict) or data.get('version') != 1 or not isinstance(data.get('entries'), list):
        raise ValueError('unsupported practice registry')
    urls = ENTRY.findall(catalog)
    if len(set(urls)) != len(urls):
        raise ValueError('duplicate catalog resource URL')
    result = {}
    for record in data['entries']:
        if (not isinstance(record, dict) or not FIELDS <= record.keys()
                or record.keys() - FIELDS - OPTIONAL):
            raise ValueError('invalid practice fields')
        if any(not isinstance(v, str) or not v.strip() or '\n' in v or '\r' in v
               for v in record.values()):
            raise ValueError('practice fields must be nonempty single-line text')
        if any(len(record[k]) > 150 for k in ('task', 'io', 'environment', 'note') if k in record):
            raise ValueError('practice note too long; put detail in its example')
        if record['url'] in result:
            raise ValueError('duplicate practice resource')
        if 'errata' in record and 'note' not in record:
            raise ValueError('errata link needs a visible note')
        item = dict(record)
        item['example_link'] = reference(root, item['example'])
        if 'errata' in item:
            item['errata_link'] = reference(root, item['errata'])
        result[item['url']] = item
    extra = set(result) - set(urls)
    if extra:
        raise ValueError(f'practice coverage mismatch: {len(extra)} uncurated resources')
    return result


def render(item: dict[str, str]) -> str:
    lines = [f'  [示例]({item["example_link"]})']
    if 'note' in item:
        suffix = f' [本仓库勘误]({item["errata_link"]})' if 'errata_link' in item else ''
        lines += ['', '  **注意：** ' + item['note'] + suffix]
    return '\n'.join(lines)
