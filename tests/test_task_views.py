"""Offline regressions for task-scoped reading and exact source-file links."""
import contextlib
import hashlib
import io
import json
from pathlib import Path
import re
import tempfile
import unittest
from urllib.parse import unquote, urlsplit

from scripts import task_views as views

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://github.com/Owner/Repo/blob/main/skills/edit/SKILL.md#rules'
INTRO = '- [Example](https://github.com/Owner/Repo) — 中文润色，保留限定。[正文](' + URL + ')'
RULE = '  **规则：** 保留“可能、仅、计划”。[出处](' + URL + ')'
BLOCK = INTRO + '\n\n' + RULE + '\n'


class TaskViewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.put('README.md', '# Taste\n[目录](CATALOG.md)\n<!-- catalog-count: 1 -->\n')
        self.put('CATALOG.md', '# 目录\n\n## 文字表达\n\n' + BLOCK)
        self.put('sources.lock.json', json.dumps({'sources': {'owner/repo': {
            'branch': 'main', 'copied_sha': 'a' * 40}}}))
        self.put('vendor/owner/repo/skills/edit/SKILL.md', '# Rules\nKeep facts.\n')

    def put(self, name, text):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding='utf-8')
        return path

    def run_mode(self, mode):
        with contextlib.redirect_stdout(io.StringIO()):
            return views.run(self.root, mode)

    def page(self):
        return views.render(self.root)['vendor/tasks/文字表达.md']

    def article(self, kind):
        url = 'https://example.org/writing'
        cfg = {'id': 'writing', 'catalog_urls': [url], 'kind': kind}
        self.put('pages.config.json', json.dumps({'pages': [cfg]}))
        path = self.put('vendor/articles/writing.md', 'Saved ' + kind + '\n')
        record = {'kind': kind, 'path': 'vendor/articles/writing.md',
                  'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        self.put('vendor/articles/manifest.json', json.dumps({'pages': {'writing': record}}))
        self.put('CATALOG.md', '# 目录\n## 文字表达\n' +
                 f'- [Writing]({url}) — 仅限英语。[正文]({url})\n\n' +
                 f'  **规则：** 先写条件，再写动作。[出处]({url})\n')
        return record

    def test_direct_markdown_path_not_repo_directory(self):
        self.assertIn('[副本·正文](../owner/repo/skills/edit/SKILL.md#rules)', self.page())
        self.assertIn(RULE, self.page())
        self.assertIn('中文润色，保留限定。', self.page())
        # Reading an in-memory view must not require its output directory to exist.
        target = (self.root / 'vendor/tasks' / '../owner/repo/skills/edit/SKILL.md').resolve()
        self.assertTrue(target.is_file())
        self.assertFalse((self.root / 'vendor/tasks').exists())

    def test_badges_removed_only_from_view(self):
        decorated = INTRO + ' <!-- source-meta -->[![Stars](https://img.example/a)](https://example.org) · [副本](vendor/owner/repo)<!-- /source-meta -->'
        original = '# 目录\n## 文字表达\n' + decorated + '\n\n' + RULE + '\n'
        self.put('CATALOG.md', original)
        self.assertNotIn('Stars', self.page())
        self.assertNotIn('source-meta', self.page())
        self.assertEqual((self.root / 'CATALOG.md').read_text(), original)

    def test_missing_file_keeps_original_link(self):
        (self.root / 'vendor/owner/repo/skills/edit/SKILL.md').unlink()
        self.assertIn('[正文](' + URL + ')', self.page())
        self.assertNotIn('副本·正文', self.page())

    def test_unrecorded_copy_is_not_preferred(self):
        self.put('sources.lock.json', '{"sources": {}}')
        self.assertNotIn('副本·正文', self.page())

    def test_unknown_branch_keeps_original(self):
        self.put('CATALOG.md', '# 目录\n## 文字表达\n' + BLOCK.replace('/main/', '/other/'))
        self.assertNotIn('副本·正文', self.page())

    def test_branch_with_slash_and_non_ascii_path(self):
        self.put('sources.lock.json', json.dumps({'sources': {'owner/repo': {
            'branch': 'release/docs', 'copied_sha': 'a' * 40}}}))
        self.put('vendor/owner/repo/中文 规则.md', 'Some text.\n')
        records = json.loads((self.root / 'sources.lock.json').read_text())['sources']
        target = views.snapshot_link(self.root,
            'https://github.com/Owner/Repo/blob/release/docs/中文%20规则.md', records)
        self.assertEqual(unquote(target), '../owner/repo/中文 规则.md')

    def test_traversal_in_source_link_is_rejected(self):
        bad = BLOCK.replace('skills/edit/SKILL.md', '../secret.md')
        self.put('CATALOG.md', '# 目录\n## 文字表达\n' + bad)
        with self.assertRaisesRegex(ValueError, 'unsafe'):
            self.page()

    def test_one_category_per_file(self):
        other = BLOCK.replace('Example', 'Other').replace('保留“可能、仅、计划”。', '检查停顿。')
        self.put('README.md', '# Taste\n[目录](CATALOG.md)\n<!-- catalog-count: 2 -->\n')
        self.put('CATALOG.md', '# 目录\n## 文字表达\n' + BLOCK + '\n## 诗歌写作\n' + other)
        rendered = views.render(self.root)
        self.assertEqual(len(rendered), 2)
        self.assertNotIn('检查停顿。', rendered['vendor/tasks/文字表达.md'])
        self.assertNotIn('保留“可能、仅、计划”。', rendered['vendor/tasks/诗歌写作.md'])

    def test_fulltext_summary_and_index_stay_distinct(self):
        for kind, label in views.KINDS.items():
            with self.subTest(kind=kind):
                self.article(kind)
                self.assertIn('[' + label + '](../articles/writing.md)', self.page())
                if kind != 'fulltext':
                    self.assertNotIn('[Markdown 正文]', self.page())

    def test_missing_article_does_not_get_copy_link(self):
        self.article('summary')
        (self.root / 'vendor/articles/writing.md').unlink()
        self.assertNotIn('](../articles/', self.page())

    def test_article_type_or_hash_mismatch_is_rejected(self):
        record = self.article('summary')
        record['kind'] = 'fulltext'
        self.put('vendor/articles/manifest.json', json.dumps({'pages': {'writing': record}}))
        with self.assertRaisesRegex(ValueError, 'type mismatch'):
            self.page()
        self.article('summary')
        self.put('vendor/articles/writing.md', 'Altered text.\n')
        with self.assertRaisesRegex(ValueError, 'hash mismatch'):
            self.page()

    def test_missing_or_duplicate_rule_fails(self):
        for body in (INTRO, BLOCK + RULE, INTRO + '\n  **规则：** 没有出处。'):
            with self.subTest(body=body):
                self.put('CATALOG.md', '# 目录\n## 文字表达\n' + body)
                with self.assertRaises(ValueError):
                    self.page()

    def test_unsafe_or_duplicate_category_fails(self):
        for body in ('## ../escape\n' + BLOCK,
                     '## 文字表达\n' + BLOCK + '\n## 文字表达\n'):
            with self.subTest(body=body):
                with self.assertRaisesRegex(ValueError, 'category'):
                    views.sections(body)

    def test_catalog_count_failure_does_not_remove_existing_pages(self):
        self.run_mode('sync')
        path = self.root / 'vendor/tasks/文字表达.md'
        before = path.read_bytes()
        self.put('README.md', '[目录](CATALOG.md)\n<!-- catalog-count: 2 -->\n')
        with self.assertRaisesRegex(ValueError, 'count'):
            self.run_mode('sync')
        self.assertEqual(path.read_bytes(), before)

    def test_sync_verify_idempotence_and_read_only_check(self):
        self.assertEqual(self.run_mode('check'), 1)
        self.assertFalse((self.root / 'vendor/tasks').exists())
        self.assertEqual(self.run_mode('sync'), 0)
        before = {p: p.stat().st_mtime_ns for p in (self.root / 'vendor/tasks').iterdir()}
        self.assertEqual(self.run_mode('verify'), 0)
        self.assertEqual(self.run_mode('sync'), 0)
        self.assertEqual(self.run_mode('check'), 0)
        self.assertEqual(before, {p: p.stat().st_mtime_ns for p in before})

    def test_stale_page_is_detected_and_only_owned_page_removed(self):
        self.run_mode('sync')
        self.put('vendor/tasks/old.md', views.MARKER + '\n# Old\n')
        with self.assertRaisesRegex(ValueError, 'differ'):
            self.run_mode('verify')
        self.run_mode('sync')
        self.assertFalse((self.root / 'vendor/tasks/old.md').exists())

    def test_unmanaged_file_is_not_overwritten_or_removed(self):
        path = self.put('vendor/tasks/mine.md', '# Hand-written\n')
        with self.assertRaisesRegex(ValueError, 'unmanaged'):
            self.run_mode('sync')
        self.assertEqual(path.read_text(), '# Hand-written\n')

    def test_symlink_output_and_source_are_rejected(self):
        source = self.root / 'vendor/owner/repo/skills/edit/SKILL.md'
        source.unlink()
        source.symlink_to(self.root / 'README.md')
        with self.assertRaisesRegex(ValueError, 'symlink'):
            self.page()
        source.unlink()
        self.put('vendor/owner/repo/skills/edit/SKILL.md', 'Restored.\n')
        (self.root / 'vendor/tasks').symlink_to(self.root / 'vendor/owner')
        with self.assertRaisesRegex(ValueError, 'symlink'):
            self.run_mode('sync')


@unittest.skipUnless((ROOT / 'CATALOG.md').is_file(), 'fixture-only local run')
class PublishedTaskViewTests(unittest.TestCase):
    def test_catalog_rules_preserved_and_local_links_exist(self):
        text = (ROOT / 'CATALOG.md').read_text(encoding='utf-8')
        rendered = views.render(ROOT)
        expected = [rule for entries in views.sections(text).values() for _, rule in entries]
        actual = [line for page in rendered.values() for line in page.splitlines() if views.RULE.fullmatch(line)]
        self.assertEqual(actual, expected)
        for relative, page in rendered.items():
            self.assertNotIn('source-meta', page)
            for _, target in views.LINK.findall(page):
                if target.startswith('../'):
                    path = ((ROOT / relative).parent / unquote(urlsplit(target).path)).resolve()
                    self.assertTrue(path.is_relative_to(ROOT.resolve()), target)
                    self.assertTrue(path.is_file(), target)

    def test_home_uses_task_files_when_enabled(self):
        home = (ROOT / 'README.md').read_text(encoding='utf-8')
        if 'vendor/tasks/' not in home:
            self.skipTest('task pages are installed before homepage links switch')
        rendered = views.render(ROOT)
        targets = re.findall(r'\]\((vendor/tasks/[^)]+)\)', home)
        self.assertEqual(set(targets), set(rendered))
        self.assertNotIn('CATALOG.md#', home)
        self.assertLessEqual(len(home.encode('utf-8')), 1200)
        for path in targets:
            self.assertTrue((ROOT / unquote(path)).is_file(), path)


if __name__ == '__main__':
    unittest.main()
