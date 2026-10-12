"""Offline checks for the reviewed article waiver and source registrations."""
import copy
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from scripts import sync_pages as pages

ROOT = Path(__file__).resolve().parents[1]


class ReviewedArticleRightsTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.cfg = dict(pages.REVIEWED_PUBLIC_DOMAIN, title='Documenting Architecture Decisions',
                        author='Michael Nygard', kind='fulltext', reviewed_on='2026-10-12',
                        scope_note='This fixture is not an archived original.',
                        markers=['Context', 'Consequences'], min_chars=20)
        self.cfg['catalog_urls'] = [self.cfg['url']]

    def load(self, cfg):
        (self.root / 'pages.config.json').write_text(
            json.dumps({'version': 1, 'pages': [cfg]}), encoding='utf-8')
        return pages.load(self.root)

    def test_exact_article_waiver_is_accepted(self):
        self.assertEqual(self.load(self.cfg), [self.cfg])

    def test_other_article_does_not_inherit_waiver(self):
        cfg = copy.deepcopy(self.cfg)
        cfg['url'] = 'https://cognitect.com/blog/another-article'
        cfg['catalog_urls'] = [cfg['url']]
        with self.assertRaisesRegex(pages.ArchiveError, 'license requires review'):
            self.load(cfg)

    def test_id_evidence_marker_and_license_are_pinned(self):
        for key, value in [('id', 'another-article'),
                           ('license_evidence_url', 'https://cognitect.com/'),
                           ('license_marker', 'copyright'),
                           ('license', 'CC0-1.0')]:
            with self.subTest(key=key):
                cfg = {**self.cfg, key: value}
                with self.assertRaisesRegex(pages.ArchiveError, 'license requires review'):
                    self.load(cfg)

    def test_actual_download_must_still_contain_waiver(self):
        html = '<article><h1>Context</h1><p>Consequences are explained here.</p></article>'
        with patch.object(pages, 'get', return_value=html):
            with self.assertRaisesRegex(pages.ArchiveError, 'license marker absent'):
                pages.content_for(self.cfg)

    def test_waiver_does_not_disable_content_checks(self):
        html = '<article><p>has waived all copyright</p><h1>Context</h1></article>'
        with patch.object(pages, 'get', return_value=html):
            with self.assertRaisesRegex(pages.ArchiveError, 'markers changed'):
                pages.content_for(self.cfg)

    def test_fixture_retains_entire_selected_body(self):
        html = ('<nav>Menu</nav><article><h1>Context</h1><p>First paragraph.</p>'
                '<h2>Consequences</h2><p>Last paragraph.</p>'
                '<p>has waived all copyright. This work is published from: United States.</p>'
                '</article><footer>Footer</footer>')
        with patch.object(pages, 'get', return_value=html):
            body, content_hash, evidence = pages.content_for(self.cfg)
        self.assertIn('First paragraph.', body)
        self.assertIn('Last paragraph.', body)
        self.assertIn('has waived all copyright', body)
        self.assertNotIn('Menu', body)
        self.assertEqual(content_hash, pages.digest(body))
        self.assertEqual(evidence['url'], self.cfg['url'])

    def test_unreviewed_hosts_and_credentials_remain_rejected(self):
        for url in ('https://unreviewed.example/article',
                    'https://user:secret@cognitect.com/blog/example',
                    'http://cognitect.com/blog/example'):
            with self.subTest(url=url), self.assertRaises(pages.ArchiveError):
                pages.url_ok(url)

    def test_summaries_do_not_download_or_claim_fulltext(self):
        cfg = {**self.cfg, 'kind': 'summary', 'license': 'No full-text permission',
               'summary': 'An original editorial summary, not copied text.'}
        self.load(cfg)
        with patch.object(pages, 'get') as network:
            body, content_hash, evidence = pages.content_for(cfg)
        network.assert_not_called()
        self.assertIsNone(content_hash)
        self.assertIsNone(evidence)
        self.assertIn('摘要 Markdown（非全文）', pages.document(cfg, body))


class PublishedArticleRegistrationTests(unittest.TestCase):
    def test_every_registered_source_has_a_reviewed_host(self):
        for cfg in pages.load(ROOT):
            with self.subTest(id=cfg['id']):
                pages.url_ok(cfg['url'])
                pages.url_ok(cfg['license_evidence_url'])

    def test_fulltexts_have_start_middle_and_end_checks(self):
        checked = {'response-to-reviewers', 'scientific-software-papers',
                   'effective-presentation-slides'}
        configs = {c['id']: c for c in pages.load(ROOT)}
        for key in checked:
            if key not in configs:
                continue  # The converter/test can be committed before registrations.
            cfg = configs[key]
            self.assertEqual(cfg['kind'], 'fulltext')
            for number in range(1, 11):
                self.assertIn(f'Rule {number}:', cfg['markers'])
            self.assertTrue(any(x.startswith('Reference') for x in cfg['markers']))
            self.assertGreaterEqual(cfg['min_chars'], 6000)

    def test_rights_limited_summaries_keep_type_and_body(self):
        for cfg in pages.load(ROOT):
            if cfg['kind'] == 'summary':
                with self.subTest(id=cfg['id']):
                    self.assertTrue(cfg['summary'].strip())
                    self.assertIn('非全文', pages.KINDS[cfg['kind']])
                    self.assertNotEqual(cfg['license'], 'LicenseRef-Public-Domain')


if __name__ == '__main__':
    unittest.main()
