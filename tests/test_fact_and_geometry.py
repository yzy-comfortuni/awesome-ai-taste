"""Narrow deterministic checks, not automatic semantic or accessibility approval."""
import importlib.util
import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('taste_checks', ROOT / 'examples/checks.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


class FactTests(unittest.TestCase):
    def test_explicit_fragments_accept_reference_and_reject_counterexample(self):
        data = json.loads((ROOT / 'examples/fact-cases.json').read_text(encoding='utf-8'))
        for row in data['cases']:
            with self.subTest(id=row['id']):
                self.assertEqual(checks.missing_fragments(row['after'], row['required']), [])
                self.assertTrue(checks.missing_fragments(row['invalid'], row['required']))

    def test_condition_converse_is_not_equivalent(self):
        self.assertTrue(checks.implication(False, True))
        self.assertFalse(checks.implication(True, False))
        self.assertNotEqual([(a,b) for a in (False,True) for b in (False,True) if checks.implication(a,b)],
                            [(a,b) for a in (False,True) for b in (False,True) if checks.implication(b,a)])

    def test_keyword_check_alone_cannot_establish_meaning(self):
        original = 'A successful run ends with READY.'
        converse = 'READY means the run is successful.'
        self.assertEqual(checks.missing_fragments(original, ['successful','READY']), [])
        self.assertEqual(checks.missing_fragments(converse, ['successful','READY']), [])
        # Same fragments pass, yet the counterexample above separates the claims.

    def test_three_real_formats_are_not_a_stylistic_count(self):
        data = json.loads((ROOT / 'examples/fact-cases.json').read_text(encoding='utf-8'))
        case = next(c for c in data['cases'] if c['id'] == 'three-real-features')
        for item in ('CSV','TSV','JSON'):
            self.assertIn(item, case['after'])


class GeometryTests(unittest.TestCase):
    def test_normal_18px_does_not_get_large_text_threshold(self):
        self.assertEqual(checks.text_threshold(18), 4.5)
        self.assertEqual(checks.text_threshold(23.999), 4.5)
        self.assertEqual(checks.text_threshold(24), 3)

    def test_bold_point_conversion_without_rounded_boundary(self):
        self.assertEqual(checks.text_threshold(18, True), 4.5)
        self.assertEqual(checks.text_threshold(18.66, True), 4.5)
        self.assertEqual(checks.text_threshold(14 * 96 / 72, True), 3)

    def test_no_rounding_of_contrast_pass(self):
        self.assertFalse(4.499 >= checks.text_threshold(18))
        self.assertTrue(4.5 >= checks.text_threshold(18))

    def test_srgb_limits_and_symmetry(self):
        self.assertEqual(checks.contrast_ratio('#000000','#ffffff'), 21)
        self.assertEqual(checks.contrast_ratio('#777777','#777777'), 1)
        self.assertEqual(checks.contrast_ratio('#123456','#abcdef'), checks.contrast_ratio('#abcdef','#123456'))
        self.assertLess(checks.contrast_ratio('#777777','#ffffff'), 4.5)

    def test_invalid_sizes_and_colors(self):
        for value in (0, -1, float('nan'), float('inf'), True, '24'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                checks.text_threshold(value)
        for value in ('red','#fff','#gggggg','#ffffff00'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                checks.contrast_ratio(value, '#ffffff')

    def test_scaled_stage_is_not_readability_proof(self):
        displayed = 28 * 390 / 1920
        self.assertAlmostEqual(displayed, 5.6875)
        self.assertEqual(checks.text_threshold(displayed), 4.5)

    def test_demo_preserves_zoom_and_does_not_send_inputs(self):
        text = (ROOT / 'examples/review-demo.html').read_text(encoding='utf-8')
        self.assertNotIn('maximum-scale', text)
        self.assertNotIn('user-scalable=no', text)
        self.assertIn('aria-describedby', text)
        self.assertIn('aria-invalid', text)
        self.assertIn('.focus()', text)
        for forbidden in ('fetch(', 'XMLHttpRequest', 'localStorage', 'sendBeacon'):
            self.assertNotIn(forbidden, text)

    def test_demo_script_parses_in_node(self):
        import shutil, subprocess
        node = shutil.which('node')
        if node is None:
            self.skipTest('Node unavailable; JavaScript syntax not checked')
        text = (ROOT / 'examples/review-demo.html').read_text(encoding='utf-8')
        scripts = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', text, re.S)
        completed = subprocess.run([node, '--check'], input='\n'.join(scripts), text=True, capture_output=True)
        self.assertEqual(completed.returncode, 0, completed.stderr)


if __name__ == '__main__':
    unittest.main()
