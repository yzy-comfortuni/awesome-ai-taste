"""Trial navigation and factual fixture regressions; no network or model calls."""
import copy
import json
from pathlib import Path
import tempfile
import unittest

from scripts import practice, task_views

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://github.com/example/project'
CATALOG = f'# Catalog\n## Writing\n- [Example]({URL}) — demo\n'


class PracticeTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'examples').mkdir()
        (self.root / 'examples/sample.md').write_text('<a id="trial"></a>\n# Trial\n', encoding='utf-8')
        self.row = dict(url=URL, task='编辑', io='输入→改稿', environment='文本',
                        example='examples/sample.md#trial')

    def save(self, rows):
        (self.root / 'examples/manifest.json').write_text(json.dumps({'version': 1, 'entries': rows}), encoding='utf-8')

    def test_valid_registry_and_rebased_link(self):
        self.save([self.row])
        result = practice.load(self.root, CATALOG)
        self.assertIn('../../examples/sample.md#trial', practice.render(result[URL]))

    def test_no_registry_keeps_legacy_fixture(self):
        self.assertEqual(practice.load(self.root, CATALOG), {})

    def test_missing_entry_is_error(self):
        self.save([])
        with self.assertRaisesRegex(ValueError, 'coverage'):
            practice.load(self.root, CATALOG)

    def test_extra_entry_is_error(self):
        self.save([self.row, {**self.row, 'url': URL + '2'}])
        with self.assertRaisesRegex(ValueError, 'coverage'):
            practice.load(self.root, CATALOG)

    def test_duplicate_registry_entry_is_error(self):
        self.save([self.row, self.row])
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            practice.load(self.root, CATALOG)

    def test_duplicate_catalog_entry_is_error(self):
        self.save([self.row])
        with self.assertRaisesRegex(ValueError, 'duplicate catalog'):
            practice.load(self.root, CATALOG + CATALOG)

    def test_missing_file_and_anchor_are_errors(self):
        for target in ('examples/missing.md#trial', 'examples/sample.md#absent'):
            with self.subTest(target=target), self.assertRaisesRegex(ValueError, 'missing'):
                practice.reference(self.root, target)

    def test_traversal_remote_and_queries_are_rejected(self):
        for target in ('../secret.md#trial', 'examples/%2e%2e/secret.md#trial',
                       'https://example.com/a.md#trial', '//example.com/a.md#trial',
                       '/examples/sample.md#trial', 'examples/sample.md?q=1#trial',
                       'examples/sample.md', 'examples/sample.md#../../x'):
            with self.subTest(target=target), self.assertRaises(ValueError):
                practice.reference(self.root, target)

    def test_symlink_target_is_rejected(self):
        (self.root / 'examples/link.md').symlink_to(self.root / 'examples/sample.md')
        with self.assertRaisesRegex(ValueError, 'symlink'):
            practice.reference(self.root, 'examples/link.md#trial')

    def test_incomplete_and_multiline_fields_are_rejected(self):
        variants = [{k: v for k, v in self.row.items() if k != 'environment'},
                    {**self.row, 'task': 'x\ny'}, {**self.row, 'note': ''},
                    {**self.row, 'io': 'a' * 151}, {**self.row, 'unused': 'x'}]
        for row in variants:
            with self.subTest(row=row):
                self.save([row])
                with self.assertRaises(ValueError):
                    practice.load(self.root, CATALOG)

    def test_warning_is_visible_and_does_not_mutate_record(self):
        (self.root / 'ERRATA.md').write_text('<a id="facts"></a>\nFacts\n', encoding='utf-8')
        row = {**self.row, 'note': '保留限定。', 'errata': 'ERRATA.md#facts'}
        before = copy.deepcopy(row)
        self.save([row])
        rendered = practice.render(practice.load(self.root, CATALOG)[URL])
        self.assertIn('**注意：** 保留限定。', rendered)
        self.assertIn('../../ERRATA.md#facts', rendered)
        self.assertEqual(row, before)

    def test_task_view_exposes_trial_and_caution_without_changing_rule(self):
        rule = '  **规则：** 保留限定。[出处](https://example.org/source)'
        catalog = CATALOG + '\n' + rule + '\n'
        (self.root / 'README.md').write_text('# Home\n', encoding='utf-8')
        (self.root / 'CATALOG.md').write_text(catalog, encoding='utf-8')
        self.save([{**self.row, 'note': '不要补事实。'}])
        rendered = task_views.render(self.root)['vendor/tasks/Writing.md']
        self.assertIn(rule, rendered)
        self.assertIn('**试用：**', rendered)
        self.assertIn('../../examples/sample.md#trial', rendered)
        self.assertIn('**注意：** 不要补事实。', rendered)
        self.assertEqual((self.root / 'CATALOG.md').read_text(encoding='utf-8'), catalog)

    def test_existing_rst_snapshot_is_linked_without_markdown_label(self):
        path = self.root / 'vendor/example/project/source/guide.rst'
        path.parent.mkdir(parents=True)
        path.write_text('Guide\n=====\n', encoding='utf-8')
        records = {'example/project': {'branch': 'main', 'copied_sha': 'a' * 40}}
        link = task_views.snapshot_link(self.root,
            'https://github.com/example/project/blob/main/source/guide.rst', records)
        self.assertEqual(link, '../example/project/source/guide.rst')

    def test_missing_trial_stops_before_replacing_generated_pages(self):
        (self.root / 'README.md').write_text('# Home\n', encoding='utf-8')
        (self.root / 'CATALOG.md').write_text(CATALOG +
            '\n  **规则：** 保留限定。[出处](https://example.org/source)\n', encoding='utf-8')
        directory = self.root / 'vendor/tasks'
        directory.mkdir(parents=True)
        saved = directory / 'Writing.md'
        saved.write_text(task_views.MARKER + '\nKeep the old output.\n', encoding='utf-8')
        before = saved.read_bytes()
        self.save([])
        with self.assertRaisesRegex(ValueError, 'coverage'):
            task_views.run(self.root, 'sync')
        self.assertEqual(saved.read_bytes(), before)
        self.assertEqual(list(directory.iterdir()), [saved])

    def test_load_is_read_only(self):
        self.save([self.row])
        before = {p: (p.read_bytes(), p.stat().st_mtime_ns) for p in self.root.rglob('*') if p.is_file()}
        practice.load(self.root, CATALOG)
        self.assertEqual(before, {p: (p.read_bytes(), p.stat().st_mtime_ns) for p in before})


class PublishedPracticeTests(unittest.TestCase):
    def test_all_examples_and_warnings_exist(self):
        data = json.loads((ROOT / 'examples/manifest.json').read_text(encoding='utf-8'))
        self.assertTrue(data['entries'])
        self.assertEqual(len({r['url'] for r in data['entries']}), len(data['entries']))
        for row in data['entries']:
            practice.reference(ROOT, row['example'])
            if 'errata' in row:
                practice.reference(ROOT, row['errata'])

    @unittest.skipUnless((ROOT / 'CATALOG.md').exists(), 'local fixture checkout lacks original catalog')
    def test_registry_matches_canonical_catalog(self):
        text = (ROOT / 'CATALOG.md').read_text(encoding='utf-8')
        self.assertEqual(len(practice.load(ROOT, text)), len(practice.ENTRY.findall(text)))

    @unittest.skipUnless((ROOT / 'CATALOG.md').exists(), 'local fixture checkout lacks original catalog')
    def test_known_entry_links_and_counts(self):
        text = (ROOT / 'CATALOG.md').read_text(encoding='utf-8')
        self.assertNotIn('#mermaid-invariants', text)
        self.assertIn('默认单文件 HTML 与手写 SVG', text)
        self.assertIn('[第一章节选](https://lithub.com/a-writing-lesson-from-ursula-k-leguin/)', text)
        self.assertEqual(len(practice.ENTRY.findall(text)), len(json.loads((ROOT / 'examples/manifest.json').read_text(encoding='utf-8'))['entries']))
        home = (ROOT / 'README.md').read_text(encoding='utf-8')
        self.assertLessEqual(len(home.encode('utf-8')), 1200)
        self.assertIn('examples/README.md', home)


if __name__ == '__main__':
    unittest.main()
