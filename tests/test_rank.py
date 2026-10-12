"""Run the original rank fixture tests without loading any upstream package."""
import json
from pathlib import Path
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


class RankTests(unittest.TestCase):
    def test_node_rank_regressions(self):
        node = shutil.which('node')
        if node is None:
            self.skipTest('Node unavailable; ranking behavior not verified')
        result = subprocess.run([node, str(ROOT / 'tests/rank.test.js')], text=True,
                                capture_output=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual(report['tests'], 10)
        self.assertEqual(report['status'], 'passed')

    def test_demo_logic_with_explicit_stub(self):
        node = shutil.which('node')
        if node is None:
            self.skipTest('Node unavailable; demo logic not verified')
        result = subprocess.run([node, str(ROOT / 'tests/demo.test.js')], text=True,
                                capture_output=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['cases'], 14)
