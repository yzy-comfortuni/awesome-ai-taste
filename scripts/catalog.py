"""Read the full catalog without treating a short homepage as source removal."""
from pathlib import Path
import re

ENTRIES = re.compile(r'^- \[[^\]\n]+\]\(https://[^\s)]+\)', re.M)
COUNT = re.compile(r'<!-- catalog-count: (\d+) -->')


def read_catalog(root: Path, home: str) -> str:
    """Use CATALOG.md when present; keep legacy README-only fixtures working.

    A missing, empty, or count-mismatched catalog is an error, not an empty
    selection. The count also requires additions/removals to touch README.md,
    which is already covered by the existing push trigger.
    """
    path = root / 'CATALOG.md'
    if path.is_symlink():
        raise ValueError('catalog is a symlink')
    if not path.exists():
        if 'CATALOG.md' in home:
            raise ValueError('linked catalog is missing; refusing source removal')
        return home
    text = path.read_text(encoding='utf-8')
    entries = ENTRIES.findall(text)
    if not entries:
        raise ValueError('catalog is empty; refusing source removal')
    count = COUNT.search(home)
    if count and int(count[1]) != len(entries):
        raise ValueError('catalog count differs from README; update both files')
    return text
