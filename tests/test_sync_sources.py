"""Offline tests: all GitHub responses/archives are synthetic fixtures, never network calls."""
import base64
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'sync_sources.py'
spec = importlib.util.spec_from_file_location('sync_sources', SCRIPT)
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)
LICENSE = b'Test fixture license content, not a real upstream license.\n'
LSHA = hashlib.sha1(b'blob ' + str(len(LICENSE)).encode() + b'\0' + LICENSE).hexdigest()
HEAD = 'a' * 40


def archive(files, extra=()):
    out = io.BytesIO()
    with tarfile.open(fileobj=out, mode='w:gz') as tar:
        root = tarfile.TarInfo('repo-root')
        root.type = tarfile.DIRTYPE
        tar.addfile(root)
        for name, data in files.items():
            item = tarfile.TarInfo('repo-root/' + name)
            item.size = len(data)
            item.mode = 0o644
            tar.addfile(item, io.BytesIO(data))
        for name, kind, target in extra:
            item = tarfile.TarInfo('repo-root/' + name)
            item.type, item.linkname = kind, target
            tar.addfile(item)
    return out.getvalue()


class SyncTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'README.md').write_text('- [Demo](https://github.com/Owner/Demo) — Meaning.\n', encoding='utf-8')
        self.head = HEAD
        self.files = {'LICENSE': LICENSE, 'SKILL.md': b'first version\n'}
        self.license_content = LICENSE
        self.spdx = 'MIT'
        self.stars = 123

    def api(self, path):
        if path == 'Owner/Demo':
            return {'full_name': 'Owner/Demo', 'private': False, 'default_branch': 'main', 'stargazers_count': self.stars}
        if '/branches/' in path:
            return {'commit': {'sha': self.head}}
        if '/license?' in path or '/contents/' in path:
            data = self.license_content
            sha = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
            return {'path': 'LICENSE', 'sha': sha, 'content': base64.b64encode(data).decode(), 'license': {'spdx_id': self.spdx}}
        raise AssertionError('unexpected API request: ' + path)

    def run_mode(self, mode):
        with patch.object(sync, 'api', side_effect=self.api), patch.object(sync, 'get', return_value=archive(self.files)), contextlib.redirect_stdout(io.StringIO()):
            return sync.run(self.root, mode)

    def lock(self):
        return json.loads((self.root / 'sources.lock.json').read_text())['sources']['owner/demo']

    def bytes(self):
        return {str(p.relative_to(self.root)): p.read_bytes() for p in self.root.rglob('*') if p.is_file()}

    def test_discover_deduplicates_case_and_tree_links(self):
        text = '- [A](https://github.com/Owner/Repo) x\n- [B](https://github.com/owner/repo/tree/main/skill) y\n'
        self.assertEqual(sync.discover(text), {'owner/repo': 'Owner/Repo'})

    def test_only_catalog_primary_links_are_sources(self):
        text = '## https://github.com/no/one\n- [Web](https://example.com) [Also](https://github.com/no/two)\n'
        self.assertEqual(sync.discover(text), {})

    def test_badges_idempotent_and_description_unchanged(self):
        text = (self.root / 'README.md').read_text()
        decorated = sync.decorate(text, {})
        self.assertEqual(sync.decorate(decorated, {}), decorated)
        self.assertEqual(sync.DECORATION.sub('', decorated), text)
        self.assertNotIn('[副本]', decorated)

    def test_badges_mode_no_network(self):
        with patch.object(sync, 'api', side_effect=AssertionError('network')):
            self.assertEqual(sync.run(self.root, 'badges'), 0)
        self.assertFalse((self.root / 'sources.lock.json').exists())

    def test_first_sync_and_offline_verification(self):
        self.assertEqual(self.run_mode('sync'), 0)
        r = self.lock()
        self.assertEqual(r['copied_sha'], HEAD)
        self.assertEqual(r['files'], 2)
        self.assertEqual(r['stars'], 123)
        self.assertEqual((self.root / 'vendor/owner/demo/LICENSE').read_bytes(), LICENSE)
        self.assertEqual(self.run_mode('verify'), 0)
        self.assertIn('[副本]', (self.root / 'README.md').read_text())

    def test_noop_sync_does_not_rewrite_or_download(self):
        self.run_mode('sync')
        before = self.bytes()
        with patch.object(sync, 'api', side_effect=self.api), patch.object(sync, 'get', side_effect=AssertionError('archive refetched')), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync.run(self.root, 'sync'), 0)
        self.assertEqual(self.bytes(), before)

    def test_check_update_is_read_only(self):
        self.run_mode('sync')
        self.head = 'b' * 40
        before = self.bytes()
        self.assertEqual(self.run_mode('check'), 1)
        self.assertEqual(self.bytes(), before)

    def test_check_unchanged_returns_zero(self):
        self.run_mode('sync')
        self.assertEqual(self.run_mode('check'), 0)

    def test_update_replaces_and_removes_deleted_files(self):
        self.files['old.txt'] = b'old'
        self.run_mode('sync')
        self.head = 'b' * 40
        del self.files['old.txt']
        self.files['SKILL.md'] = b'new'
        self.assertEqual(self.run_mode('sync'), 0)
        self.assertFalse((self.root / 'vendor/owner/demo/old.txt').exists())
        self.assertEqual((self.root / 'vendor/owner/demo/SKILL.md').read_bytes(), b'new')
        self.assertEqual(self.lock()['copied_sha'], self.head)

    def test_missing_license_blocks_new_copy_but_preserves_stars(self):
        self.spdx = 'NOASSERTION'
        self.assertEqual(self.run_mode('sync'), 2)
        self.assertFalse((self.root / 'vendor/owner/demo').exists())
        self.assertEqual(self.lock()['stars'], 123)
        self.assertNotIn('copied_sha', self.lock())

    def test_license_change_keeps_previous_copy(self):
        self.run_mode('sync')
        self.head = 'b' * 40
        self.license_content = b'changed license'
        self.files['LICENSE'] = self.license_content
        self.assertEqual(self.run_mode('sync'), 2)
        self.assertEqual(self.lock()['copied_sha'], HEAD)
        self.assertEqual(self.lock()['upstream_sha'], self.head)
        self.assertEqual((self.root / 'vendor/owner/demo/LICENSE').read_bytes(), LICENSE)

    def test_network_failure_keeps_previous_copy(self):
        self.run_mode('sync')
        with patch.object(sync, 'api', side_effect=sync.SyncError('network unavailable')), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync.run(self.root, 'sync'), 2)
        self.assertEqual(self.lock()['copied_sha'], HEAD)
        self.assertEqual(self.lock()['status'], 'blocked')

    def test_corrupt_archive_keeps_previous_copy(self):
        self.run_mode('sync')
        self.head = 'b' * 40
        with patch.object(sync, 'api', side_effect=self.api), patch.object(sync, 'get', return_value=b'broken'), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(sync.run(self.root, 'sync'), 2)
        self.assertEqual(self.lock()['copied_sha'], HEAD)
        self.assertEqual((self.root / 'vendor/owner/demo/SKILL.md').read_bytes(), b'first version\n')

    def test_scoped_copy_keeps_license_and_notice(self):
        self.files = {'LICENSE': LICENSE, 'NOTICE': b'credit', 'skills/a/SKILL.md': b'a', 'skills/b/SKILL.md': b'b'}
        (self.root / 'sources.config.json').write_text(json.dumps({'owner/demo': {'paths': ['skills/a']}}))
        self.assertEqual(self.run_mode('sync'), 0)
        dest = self.root / 'vendor/owner/demo'
        self.assertTrue((dest / 'NOTICE').exists())
        self.assertTrue((dest / 'skills/a/SKILL.md').exists())
        self.assertFalse((dest / 'skills/b').exists())

    def test_missing_scope_preserves_previous_copy(self):
        self.run_mode('sync')
        (self.root / 'sources.config.json').write_text(json.dumps({'owner/demo': {'paths': ['missing']}}))
        self.assertEqual(self.run_mode('sync'), 2)
        self.assertEqual(self.lock()['copied_sha'], HEAD)
        self.assertTrue((self.root / 'vendor/owner/demo/SKILL.md').exists())

    def test_manual_license_requires_exact_hash(self):
        (self.root / 'sources.config.json').write_text(json.dumps({'owner/demo': {'license': {'path': 'LICENSE', 'sha': 'c' * 40, 'spdx': 'MIT'}}}))
        self.assertEqual(self.run_mode('sync'), 2)
        self.assertNotIn('copied_sha', self.lock())

    def test_removed_catalog_source_is_not_reintroduced(self):
        self.run_mode('sync')
        (self.root / 'README.md').write_text('# Empty catalog\n')
        self.assertEqual(self.run_mode('sync'), 0)
        self.assertFalse((self.root / 'vendor/owner/demo').exists())

    def test_verify_detects_tampering(self):
        self.run_mode('sync')
        (self.root / 'vendor/owner/demo/SKILL.md').write_text('changed locally')
        with self.assertRaises(sync.SyncError):
            self.run_mode('verify')

    def test_symlink_vendor_root_is_rejected(self):
        outside = self.root / 'outside'
        outside.mkdir()
        (self.root / 'vendor').symlink_to(outside, target_is_directory=True)
        with self.assertRaises(sync.SyncError):
            self.run_mode('sync')
        self.assertEqual(list(outside.iterdir()), [])

    def test_archive_path_traversal_rejected_before_write(self):
        for path in ['../escape', '/absolute', 'a/../../escape', 'a\\escape', '.git/config', 'bad\nname']:
            with self.subTest(path=path), self.assertRaises(sync.SyncError):
                sync.safe_path(path)

    def test_symlinks_not_followed_fonts_and_attributes_excluded(self):
        data = archive({'LICENSE': LICENSE, 'font.woff2': b'font', '.gitattributes': b'filter=bad', 'SKILL.md': b'hi'}, [('link', tarfile.SYMTYPE, '/etc/passwd')])
        dest = self.root / 'out'
        dest.mkdir()
        skipped = sync.unpack(data, dest, ['.'], 'LICENSE')
        self.assertEqual(len(skipped), 3)
        self.assertFalse((dest / 'link').exists())
        self.assertFalse((dest / 'font.woff2').exists())
        self.assertTrue((dest / 'SKILL.md').exists())

    def test_size_limits_preserve_old_copy(self):
        self.run_mode('sync')
        self.head = 'b' * 40
        with patch.object(sync, 'MAX_FILE', 1):
            self.assertEqual(self.run_mode('sync'), 2)
        self.assertEqual(self.lock()['copied_sha'], HEAD)

    def test_empty_archive_rejected(self):
        with self.assertRaises(sync.SyncError):
            sync.unpack(archive({}), self.root / 'out', ['.'], 'LICENSE')

    def test_hash_mismatch_in_license_rejected(self):
        bad = self.api('Owner/Demo/license?ref=' + HEAD)
        bad['sha'] = 'c' * 40
        with patch.object(sync, 'api', return_value=bad), self.assertRaises(sync.SyncError):
            sync.licensed('Owner/Demo', HEAD, {}, {})

    def test_license_bytes_must_match_archive(self):
        self.files['LICENSE'] = b'unapproved substitute'
        self.assertEqual(self.run_mode('sync'), 2)
        self.assertFalse((self.root / 'vendor/owner/demo').exists())

    def test_config_changes_are_not_hidden_by_same_commit(self):
        self.run_mode('sync')
        (self.root / 'sources.config.json').write_text(json.dumps({'owner/demo': {'license': {'path': 'LICENSE', 'sha': 'c' * 40, 'spdx': 'MIT'}}}))
        self.assertEqual(self.run_mode('sync'), 2)

    def test_malformed_lock_is_not_overwritten(self):
        (self.root / 'sources.lock.json').write_text('{broken')
        with self.assertRaises(ValueError):
            self.run_mode('sync')
        self.assertEqual((self.root / 'sources.lock.json').read_text(), '{broken')

    def test_checked_in_catalog_roundtrip_preserves_text(self):
        text = (SCRIPT.parents[1] / 'README.md').read_text(encoding='utf-8')
        self.assertTrue(sync.discover(text))
        clean = sync.DECORATION.sub('', text)
        self.assertEqual(sync.DECORATION.sub('', sync.decorate(clean, {})), clean)


if __name__ == '__main__':
    unittest.main()
