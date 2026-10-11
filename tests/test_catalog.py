"""Offline regressions for the short homepage and the full source catalog."""
import contextlib
import io
import json
from pathlib import Path
import re
import tempfile
import unittest
from unittest.mock import patch

from scripts.catalog import read_catalog, ENTRIES, COUNT
from scripts import sync_sources, sync_pages

ROOT = Path(__file__).resolve().parents[1]
GITHUB_ENTRY = '- [Fixture](https://github.com/example/project) — fixture.\n'
PAGE_URL = 'https://developers.google.com/style/highlights'
PAGE_ENTRY = f'- [Fixture]({PAGE_URL}) — fixture.\n'
HOME = '# Taste\n\n[完整目录](CATALOG.md)\n<!-- catalog-count: 1 -->\n'


def summary_config():
    return {'id': 'fixture-summary', 'title': 'Fixture summary', 'author': 'Test author',
            'url': PAGE_URL, 'catalog_urls': [PAGE_URL], 'kind': 'summary',
            'license': 'No permission to copy the original', 'license_evidence_url': PAGE_URL,
            'reviewed_on': '2026-10-11', 'scope_note': 'Test fixture, not an archived source.',
            'summary': 'An editorial fixture, not the original article.'}


class CatalogReaderTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def test_legacy_readme(self):
        self.assertEqual(read_catalog(self.root, GITHUB_ENTRY), GITHUB_ENTRY)

    def test_catalog_takes_precedence(self):
        (self.root/'CATALOG.md').write_text(GITHUB_ENTRY)
        self.assertEqual(read_catalog(self.root, HOME), GITHUB_ENTRY)

    def test_missing_linked_catalog_is_not_an_empty_selection(self):
        with self.assertRaisesRegex(ValueError, 'missing'):
            read_catalog(self.root, HOME)

    def test_empty_catalog_is_rejected(self):
        (self.root/'CATALOG.md').write_text('# Empty\n')
        with self.assertRaisesRegex(ValueError, 'empty'):
            read_catalog(self.root, HOME)

    def test_symlink_is_rejected(self):
        target = self.root/'target.md'
        target.write_text(GITHUB_ENTRY)
        (self.root/'CATALOG.md').symlink_to(target)
        with self.assertRaisesRegex(ValueError, 'symlink'):
            read_catalog(self.root, HOME)

    def test_count_mismatch_is_rejected(self):
        (self.root/'CATALOG.md').write_text(GITHUB_ENTRY + PAGE_ENTRY)
        with self.assertRaisesRegex(ValueError, 'count'):
            read_catalog(self.root, HOME)

    def test_non_github_entries_count_too(self):
        (self.root/'CATALOG.md').write_text(PAGE_ENTRY)
        self.assertEqual(read_catalog(self.root, HOME), PAGE_ENTRY)

    def test_migration_accepts_an_existing_full_readme(self):
        (self.root/'CATALOG.md').write_text(GITHUB_ENTRY)
        self.assertEqual(read_catalog(self.root, GITHUB_ENTRY), GITHUB_ENTRY)


class SynchronizerCatalogTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root/'README.md').write_text(HOME)

    def test_short_home_does_not_delete_repository_snapshot(self):
        (self.root/'CATALOG.md').write_text(GITHUB_ENTRY)
        target = self.root/'vendor/example/project/README.md'
        target.parent.mkdir(parents=True)
        target.write_text('Keep these exact fixture bytes.\n')
        record = {'repository': 'example/project', 'copied_sha': 'a'*40,
                  'status': 'current', 'scope': ['.'], 'stars': 0,
                  'tree_sha256': sync_sources.digest_tree(target.parent)[0]}
        (self.root/'sources.lock.json').write_text(json.dumps({'version': 1, 'sources': {'example/project': record}}))
        with patch.object(sync_sources, 'update_one', return_value=record) as update, contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync_sources.run(self.root, 'sync'), 0)
            self.assertEqual(sync_sources.run(self.root, 'verify'), 0)
        update.assert_called_once()
        self.assertEqual(target.read_text(), 'Keep these exact fixture bytes.\n')
        self.assertEqual((self.root/'README.md').read_text(), HOME)
        self.assertEqual((self.root/'CATALOG.md').read_text(), GITHUB_ENTRY)

    def test_missing_catalog_stops_before_sync(self):
        with patch.object(sync_sources, 'update_one') as update:
            with self.assertRaisesRegex(ValueError, 'missing'):
                sync_sources.run(self.root, 'sync')
        update.assert_not_called()
        self.assertFalse((self.root/'sources.lock.json').exists())

    def test_web_coverage_checks_full_catalog(self):
        (self.root/'CATALOG.md').write_text(PAGE_ENTRY)
        (self.root/'pages.config.json').write_text(json.dumps({'version': 1, 'pages': []}))
        with self.assertRaisesRegex(sync_pages.ArchiveError, 'unregistered web articles'):
            sync_pages.run(self.root, 'verify')

    def test_summary_sync_retains_type_and_short_home(self):
        (self.root/'CATALOG.md').write_text(PAGE_ENTRY)
        (self.root/'pages.config.json').write_text(json.dumps({'version': 1, 'pages': [summary_config()]}))
        with patch.object(sync_pages, 'get') as network, contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync_pages.run(self.root, 'sync'), 0)
            self.assertEqual(sync_pages.run(self.root, 'verify'), 0)
        network.assert_not_called()
        record = json.loads((self.root/'vendor/articles/manifest.json').read_text())['pages']['fixture-summary']
        self.assertEqual(record['kind'], 'summary')
        self.assertEqual(record['status'], 'summary-only')
        self.assertIsNone(record['source_sha256'])
        self.assertEqual((self.root/'README.md').read_text(), HOME)
        self.assertEqual((self.root/'CATALOG.md').read_text(), PAGE_ENTRY)


@unittest.skipUnless((ROOT/'CATALOG.md').is_file(), 'README-only layout predates the split')
class PublishedCatalogTests(unittest.TestCase):
    def test_home_is_a_small_index(self):
        home = (ROOT/'README.md').read_text(encoding='utf-8')
        # During migration the old homepage remains until both readers are installed.
        if 'CATALOG.md' not in home:
            self.skipTest('catalog installed before short homepage')
        self.assertLessEqual(len(home.encode('utf-8')), 1200)
        self.assertEqual(ENTRIES.findall(home), [])
        self.assertIsNotNone(COUNT.search(home))
        read_catalog(ROOT, home)

    def test_one_visible_rule_and_source_per_resource(self):
        text = (ROOT/'CATALOG.md').read_text(encoding='utf-8')
        blocks = re.split(r'(?m)(?=^- \[|^## )', text)
        for block in blocks:
            if not ENTRIES.match(block):
                continue
            with self.subTest(entry=block.splitlines()[0]):
                self.assertEqual(len(re.findall(r'^  \*\*规则：\*\*', block, re.M)), 1)
                self.assertRegex(block, r'\[出处\]\(https://[^\s)]+\)')
                self.assertNotIn('<details', block)

    def test_home_category_links_exist(self):
        home = (ROOT/'README.md').read_text(encoding='utf-8')
        catalog = (ROOT/'CATALOG.md').read_text(encoding='utf-8')
        headings = set(re.findall(r'^## (.+)$', catalog, re.M))
        for anchor in re.findall(r'CATALOG\.md#([^\s)]+)', home):
            self.assertIn(anchor, headings)


if __name__ == '__main__':
    unittest.main()
