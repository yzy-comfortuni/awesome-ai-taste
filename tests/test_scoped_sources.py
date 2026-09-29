"""Scoped downloads use synthetic pinned trees/raw files; no network or upstream code."""
import base64
import contextlib
import hashlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from test_sync_sources import sync, HEAD, LICENSE


def blob(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def file_entry(name, data, mode='100644'):
    return {'path': name, 'sha': blob(data), 'size': len(data), 'mode': mode, 'type': 'blob'}


class ScopedTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.dest = self.root / 'snapshot'
        self.dest.mkdir()
        self.child = 'b' * 40
        self.trees = {
            HEAD: {'tree': [file_entry('LICENSE', LICENSE),
                           {'path': 'skill', 'type': 'tree', 'sha': self.child, 'mode': '040000'},
                           {'path': 'unused', 'type': 'tree', 'sha': 'c'*40, 'mode': '040000'}]},
            self.child: {'tree': [file_entry('SKILL.md', b'rules', '100755')]},
        }
        self.raw = {'LICENSE': LICENSE, 'skill/SKILL.md': b'rules'}
        self.requested = []

    def api(self, path):
        self.requested.append(path)
        if '/git/trees/' in path:
            return self.trees[path.rsplit('/', 1)[1]]
        if path == 'Owner/Demo':
            return {'full_name': 'Owner/Demo', 'private': False, 'default_branch': 'main', 'stargazers_count': 12}
        if '/branches/' in path:
            return {'commit': {'sha': HEAD}}
        if '/license?' in path:
            return {'path': 'LICENSE', 'sha': blob(LICENSE), 'content': base64.b64encode(LICENSE).decode(), 'license': {'spdx_id': 'MIT'}}
        raise AssertionError('unexpected request: ' + path)

    def get(self, url, limit):
        prefix = f'https://raw.githubusercontent.com/Owner/Demo/{HEAD}/'
        self.assertTrue(url.startswith(prefix))
        self.assertEqual(limit, sync.MAX_FILE)
        return self.raw[url[len(prefix):]]

    def download(self, scopes=None):
        with patch.object(sync, 'api', side_effect=self.api), patch.object(sync, 'get', side_effect=self.get):
            return sync.download_scoped('Owner/Demo', HEAD, self.dest, scopes or ['skill'], 'LICENSE')

    def test_download_only_selected_subtree_and_preserve_license(self):
        self.assertEqual(self.download(), [])
        self.assertEqual((self.dest/'LICENSE').read_bytes(), LICENSE)
        self.assertEqual((self.dest/'skill/SKILL.md').read_bytes(), b'rules')
        self.assertTrue((self.dest/'skill/SKILL.md').stat().st_mode & 0o111)
        self.assertEqual(len(self.requested), 2)

    def test_blob_mismatch_rejected(self):
        self.raw['skill/SKILL.md'] = b'wrong'
        with self.assertRaises(sync.SyncError):
            self.download()

    def test_truncated_tree_is_not_partial_success(self):
        self.trees[self.child]['truncated'] = True
        with self.assertRaises(sync.SyncError):
            self.download()
        self.assertEqual(list(self.dest.iterdir()), [])

    def test_missing_scope_is_error(self):
        with self.assertRaises(sync.SyncError):
            self.download(['missing'])

    def test_size_limit_checked_before_raw_download(self):
        self.trees[self.child]['tree'][0]['size'] = sync.MAX_FILE + 1
        with self.assertRaises(sync.SyncError):
            self.download()
        self.assertEqual(list(self.dest.iterdir()), [])

    def test_path_traversal_is_rejected(self):
        self.trees[self.child]['tree'][0]['path'] = '../escape'
        with self.assertRaises(sync.SyncError):
            self.download()

    def test_links_and_fonts_are_skipped(self):
        self.trees[self.child]['tree'] += [file_entry('link', b'anything', '120000'), file_entry('font.woff2', b'font')]
        self.assertEqual(len(self.download()), 2)
        self.assertFalse((self.dest/'skill/link').exists())
        self.assertFalse((self.dest/'skill/font.woff2').exists())

    def test_duplicate_path_is_error(self):
        self.trees[self.child]['tree'].append(file_entry('SKILL.md', b'rules'))
        with self.assertRaises(sync.SyncError):
            self.download()

    def test_parent_notice_is_kept(self):
        self.trees[HEAD]['tree'].append(file_entry('NOTICE', b'credit'))
        self.raw['NOTICE'] = b'credit'
        self.download()
        self.assertEqual((self.dest/'NOTICE').read_bytes(), b'credit')

    def test_integration_sync_records_tree_mode_not_archive_hash(self):
        (self.root/'README.md').write_text('- [Demo](https://github.com/Owner/Demo)\n')
        (self.root/'sources.config.json').write_text(json.dumps({'owner/demo': {'paths': ['skill'], 'fetch': 'git-tree'}}))
        with patch.object(sync, 'api', side_effect=self.api), patch.object(sync, 'get', side_effect=self.get), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync.run(self.root, 'sync'), 0)
            self.assertEqual(sync.run(self.root, 'verify'), 0)
        r = json.loads((self.root/'sources.lock.json').read_text())['sources']['owner/demo']
        self.assertEqual(r['fetch_mode'], 'git-tree')
        self.assertIsNone(r['archive_sha256'])
        self.assertEqual(r['copied_sha'], HEAD)

    def test_public_domain_is_not_misrepresented_as_cc0(self):
        cfg = {'license': {'path': 'README.md', 'sha': blob(LICENSE), 'spdx': 'LicenseRef-Public-Domain'}}
        response = {'sha': blob(LICENSE), 'content': base64.b64encode(LICENSE).decode()}
        with patch.object(sync, 'api', return_value=response):
            self.assertEqual(sync.licensed('Owner/Demo', HEAD, cfg, {})['spdx'], 'LicenseRef-Public-Domain')


if __name__ == '__main__':
    unittest.main()
