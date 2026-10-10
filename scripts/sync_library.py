#!/usr/bin/env python3
"""One push-triggered entry point for repository snapshots and web articles."""
import argparse
from pathlib import Path
import sync_sources
import sync_pages

# Chartability's reviewed footer grants CC BY-SA 3.0 (not 4.0).
# The existing exact license-blob check remains in force via sources.config.json.
sync_sources.ALLOWED.add('CC-BY-SA-3.0')
ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group(required=True)
    for mode in ('sync','check','verify'):
        modes.add_argument('--'+mode, action='store_true')
    parser.add_argument('--require-full', action='store_true', help='fail when any single-page article has only an editorial summary')
    args = parser.parse_args()
    mode = 'sync' if args.sync else 'check' if args.check else 'verify'
    results = []
    for module in (sync_sources,sync_pages):
        try:
            results.append(module.run(ROOT,mode))
        except (OSError,ValueError,KeyError,sync_sources.SyncError,sync_pages.ArchiveError) as e:
            print(f'{module.__name__}: ERROR: {e}')
            results.append(2)
    if mode == 'sync' and (ROOT/'vendor/README.md').exists():
        path = ROOT/'vendor/README.md'
        marker = '[网页文章 Markdown 状态](articles/README.md)'
        text = path.read_text(encoding='utf-8')
        if marker not in text:
            text = text.replace('# 来源副本状态\n', '# 来源副本状态\n\n'+marker+'。正文、摘要和多页书籍索引分别列明。\n', 1)
        sync_pages.write(path,text)
    if args.require_full:
        gaps = [c['id'] for c in sync_pages.load(ROOT) if c['kind']=='summary']
        if gaps:
            print('FULL-TEXT GAPS (summaries are not originals): '+', '.join(gaps))
            results.append(2)
    return 2 if 2 in results else 1 if 1 in results else 0

if __name__ == '__main__':
    raise SystemExit(main())
