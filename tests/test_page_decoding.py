"""Unicode text exports are not necessarily UTF-8, even on UTF-8 websites."""
import unittest
from test_sync_pages import m

class DecodingTests(unittest.TestCase):
    def test_unicode_boms_decoded_without_corruption(self):
        text = 'ダッシュボードデザインの実践ガイドブック\n資料'
        for encoding in ('utf-8-sig', 'utf-16', 'utf-32'):
            with self.subTest(encoding=encoding):
                self.assertEqual(m.decode_text(text.encode(encoding), 'utf-8'), text)
        self.assertEqual(m.decode_text(b'\xfe\xff'+text.encode('utf-16-be')), text)

    def test_unknown_encoding_fails_instead_of_replacing_bytes(self):
        with self.assertRaises(m.ArchiveError):
            m.decode_text(b'\x82\xa0\x82\xa2')

if __name__ == '__main__':
    unittest.main()
