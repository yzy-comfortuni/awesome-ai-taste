"""Regression for the actual Digital Agency export's Shift-JIS byte prefix."""
import unittest
from unittest.mock import patch
from test_sync_pages import m

class CP932Tests(unittest.TestCase):
    def test_cp932_requires_explicit_encoding_and_decodes_exactly(self):
        prefix = bytes.fromhex('2320835f83628356')
        self.assertEqual(m.decode_text(prefix, 'cp932'), '# ダッシ')
        with self.assertRaises(m.ArchiveError):
            m.decode_text(prefix)
        with self.assertRaises(m.ArchiveError):
            m.decode_text(b'\x81', 'cp932')

    def test_official_text_uses_reviewed_encoding_and_content_marker(self):
        cfg = {'kind':'fulltext', 'converter':'official-text',
               'url':'https://www.digital.go.jp/resources/dashboard-guidebook',
               'license_evidence_url':'https://www.digital.go.jp/copyright-policy',
               'license_marker':'PDL1.0', 'min_chars':10,
               'text_encoding':'cp932', 'text_markers':['ダッシュボード']}
        html = '<a href="/assets/export.txt">代替テキスト</a>'
        with patch.object(m, 'get', side_effect=[html,'PDL1.0','ダッシュボードの説明。']) as get:
            body, sha, evidence = m.content_for(cfg)
            get.assert_called_with('https://www.digital.go.jp/assets/export.txt','cp932')
        self.assertIn('ダッシュボード', body)
        self.assertEqual(evidence['text_encoding'], 'cp932')
        with patch.object(m, 'get', side_effect=[html,'PDL1.0','garbled text which is long enough']), self.assertRaises(m.ArchiveError):
            m.content_for(cfg)

if __name__ == '__main__':
    unittest.main()
