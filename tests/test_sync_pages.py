"""Offline regression tests; network responses are synthetic fixtures."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('sync_pages', Path(__file__).resolve().parents[1]/'scripts/sync_pages.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class PageTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.cfg = {'id':'sample','title':'Sample','author':'Fixture Author',
                    'url':'https://developers.google.com/style/highlights',
                    'catalog_urls':['https://developers.google.com/style/'],
                    'kind':'fulltext','license':'CC-BY-4.0',
                    'license_evidence_url':'https://developers.google.com/style/highlights',
                    'license_marker':'creativecommons.org/licenses/by/4.0',
                    'markers':['First rule','Last rule'],'min_chars':30,
                    'reviewed_on':'2026-10-10','scope_note':'Synthetic test fixture, not an upstream article.'}
        self.html = '<html><body><nav>Navigation</nav><main><h2>First rule</h2><p>Useful body.</p><h2>Last rule</h2><ul><li>A</li><li>B</li></ul><script>malicious()</script></main><footer>https://creativecommons.org/licenses/by/4.0/</footer></body></html>'
        self.readme = '# Catalog\n\n- [Sample](https://developers.google.com/style/) — Original description.\n\n  **规则：** Keep this rule. [出处](https://example.com/rule)\n'
        (self.root/'README.md').write_text(self.readme)
        self.save_config()

    def save_config(self):
        (self.root/'pages.config.json').write_text(json.dumps({'version':1,'pages':[self.cfg]}))

    def run_mode(self, mode):
        with patch.object(m,'get',return_value=self.html), contextlib.redirect_stdout(io.StringIO()):
            return m.run(self.root,mode)

    def files(self):
        return {str(p.relative_to(self.root)):p.read_bytes() for p in self.root.rglob('*') if p.is_file()}

    def test_body_excludes_scripts_and_navigation(self):
        body = m.md(m.extract(self.html,self.cfg['markers']),self.cfg['url'])
        self.assertNotIn('malicious',body)
        self.assertNotIn('Navigation',body)
        self.assertIn('Useful body.',body)

    def test_relative_links_absolute_and_bad_schemes_removed(self):
        text = m.md(m.Document('<p><a href="/guide">Good</a> <a href="javascript:bad()">Bad</a></p>').root,self.cfg['url'])
        self.assertIn('https://developers.google.com/guide',text)
        self.assertNotIn('javascript:',text)

    def test_list_and_table_conversion(self):
        text = m.md(m.Document('<ol><li>A</li><li>B</li></ol><table><tr><th>X</th><th>Y</th></tr><tr><td>1</td><td>2</td></tr></table>').root,self.cfg['url'])
        self.assertIn('1. A\n2. B',text)
        self.assertIn('| --- | --- |',text)

    def test_full_sync_then_verify(self):
        self.assertEqual(self.run_mode('sync'),0)
        self.assertEqual(self.run_mode('verify'),0)
        body = (self.root/'vendor/articles/sample.md').read_text()
        self.assertIn('copy_kind: "fulltext"',body)
        self.assertIn('Fixture Author',body)

    def test_noop_sync_does_not_rewrite(self):
        self.run_mode('sync')
        before = self.files()
        self.run_mode('sync')
        self.assertEqual(before,self.files())

    def test_check_is_read_only(self):
        before = self.files()
        self.assertEqual(self.run_mode('check'),1)
        self.assertEqual(before,self.files())

    def test_root_rule_and_description_preserved(self):
        self.run_mode('sync')
        now = (self.root/'README.md').read_text()
        self.assertEqual(m.DECORATION.sub('',now),self.readme)
        self.assertIn('Markdown 正文',now)

    def test_summary_not_fulltext_and_no_network(self):
        self.cfg.update(kind='summary',license='Not granted',summary='Editorial summary only.')
        self.save_config()
        with patch.object(m,'get',side_effect=AssertionError('network')),contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(m.run(self.root,'sync'),0)
        self.assertIn('Markdown 摘要',(self.root/'README.md').read_text())
        self.assertIn('不是原文全文',(self.root/'vendor/articles/sample.md').read_text())
        self.assertNotIn('Useful body.',(self.root/'vendor/articles/sample.md').read_text())

    def test_missing_license_prevents_copy(self):
        self.html = self.html.replace('creativecommons.org/licenses/by/4.0','not-a-license')
        self.assertEqual(self.run_mode('sync'),2)
        self.assertFalse((self.root/'vendor/articles/sample.md').exists())

    def test_changed_license_keeps_good_copy(self):
        self.run_mode('sync')
        old = (self.root/'vendor/articles/sample.md').read_bytes()
        self.html = self.html.replace('creativecommons.org/licenses/by/4.0','not-a-license')
        self.assertEqual(self.run_mode('sync'),2)
        self.assertEqual((self.root/'vendor/articles/sample.md').read_bytes(),old)

    def test_missing_article_marker_is_error(self):
        self.html = self.html.replace('Last rule','Removed')
        self.assertEqual(self.run_mode('sync'),2)

    def test_network_error_keeps_good_copy(self):
        self.run_mode('sync')
        old = (self.root/'vendor/articles/sample.md').read_bytes()
        with patch.object(m,'get',side_effect=m.ArchiveError('HTTP 403')),contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(m.run(self.root,'sync'),2)
        self.assertEqual((self.root/'vendor/articles/sample.md').read_bytes(),old)

    def test_tamper_detected(self):
        self.run_mode('sync')
        (self.root/'vendor/articles/sample.md').write_text('tampered')
        with self.assertRaises(m.ArchiveError):
            self.run_mode('verify')

    def test_missing_copy_detected(self):
        self.run_mode('sync')
        (self.root/'vendor/articles/sample.md').unlink()
        with self.assertRaises(m.ArchiveError):
            self.run_mode('verify')
        self.assertEqual(self.run_mode('check'),1)

    def test_unregistered_article_detected(self):
        with (self.root/'README.md').open('a') as f:
            f.write('- [New](https://example.org/new)\n')
        self.assertEqual(self.run_mode('sync'),2)
        with self.assertRaises(m.ArchiveError):
            self.run_mode('verify')

    def test_unlicensed_fulltext_config_rejected(self):
        self.cfg['license'] = 'All rights reserved'
        self.save_config()
        with self.assertRaises(m.ArchiveError):
            self.run_mode('sync')

    def test_empty_summary_rejected(self):
        self.cfg.update(kind='summary',summary='')
        self.save_config()
        with self.assertRaises(m.ArchiveError):
            self.run_mode('sync')

    def test_unsafe_hosts_and_credentials_rejected(self):
        for url in ['http://developers.google.com/','https://127.0.0.1/x','https://example.com/x','https://user:pass@developers.google.com/x']:
            with self.subTest(url=url), self.assertRaises(m.ArchiveError):
                m.url_ok(url)

    def test_symlink_output_rejected(self):
        outside = self.root/'outside'
        outside.mkdir()
        (self.root/'vendor').symlink_to(outside,target_is_directory=True)
        with self.assertRaises(m.ArchiveError):
            self.run_mode('sync')
        self.assertEqual(list(outside.iterdir()),[])

    def test_unsafe_id_rejected(self):
        self.cfg['id'] = '../escape'
        self.save_config()
        with self.assertRaises(m.ArchiveError):
            self.run_mode('sync')

    def test_official_text_link_resolved_and_not_pdf(self):
        self.cfg.update(converter='official-text',url='https://www.digital.go.jp/resources/dashboard-guidebook',
                        license='LicenseRef-PDL-1.0',license_marker='PDL1.0',license_evidence_url='https://www.digital.go.jp/copyright-policy')
        bodies = ['<a href="/assets/a.txt">代替テキスト</a>','PDL1.0','Official accessible text.\n'*10]
        with patch.object(m,'get',side_effect=bodies):
            body,sha,evidence = m.content_for(self.cfg)
        self.assertIn('Official accessible text',body)
        self.assertEqual(evidence['url'],'https://www.digital.go.jp/assets/a.txt')

    def test_document_index_does_not_claim_book_fulltext(self):
        self.cfg.update(kind='document-index',summary='Reading index only.')
        self.save_config()
        self.run_mode('sync')
        self.assertIn('Markdown 阅读索引',(self.root/'README.md').read_text())
        self.assertIn('非全文',(self.root/'vendor/articles/README.md').read_text())

if __name__ == '__main__':
    unittest.main()
