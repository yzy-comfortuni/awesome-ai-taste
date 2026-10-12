"""Small, explicit fixture checks. Not a semantic-equivalence or WCAG auditor."""
from __future__ import annotations
import math


def contrast_ratio(foreground: str, background: str) -> float:
    def luminance(value: str) -> float:
        if len(value) != 7 or not value.startswith('#'):
            raise ValueError('use opaque #RRGGBB sRGB colors')
        try:
            channels = [int(value[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        except ValueError as exc:
            raise ValueError('invalid sRGB color') from exc
        linear = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in channels]
        return sum(a * b for a, b in zip(linear, (0.2126, 0.7152, 0.0722)))
    a, b = sorted((luminance(foreground), luminance(background)))
    return (b + 0.05) / (a + 0.05)


def text_threshold(css_px: float, bold: bool = False) -> float:
    """WCAG 2.2 SC 1.4.3 size thresholds; no inactive/logo exceptions modeled.

    Use final displayed CSS size, not the size before a scaling transform.
    This fixture uses the Latin-font point-size thresholds. Equivalent sizes
    in other scripts and unusual/thin faces need the normative definition.
    """
    if isinstance(css_px, bool) or not isinstance(css_px, (int, float)) or not math.isfinite(css_px) or css_px <= 0:
        raise ValueError('positive finite CSS size required')
    if not isinstance(bold, bool):
        raise ValueError('bold must be explicit')
    return 3.0 if css_px >= (14 * 96 / 72 if bold else 18 * 96 / 72) else 4.5


def missing_fragments(text: str, required: list[str]) -> list[str]:
    """Only a literal alarm. Passing does not establish meaning preservation."""
    return [item for item in required if item not in text]


def implication(a: bool, b: bool) -> bool:
    """Truth-table helper; meanings are assigned by the fixture, not parsed."""
    return not a or b
