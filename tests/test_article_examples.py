"""Regressions for omissions found by reading back the live Markdown files."""
import unittest
from unittest.mock import patch
from scripts import sync_pages as pages

GOOGLE = 'https://developers.google.com/tech-writing/two/large-docs'


class ArticleExampleTests(unittest.TestCase):
    def cfg(self, url):
        return {'url': url, 'license_evidence_url': url, 'kind': 'fulltext',
                'license_marker': 'reviewed-license', 'markers': ['Start', 'End'],
                'min_chars': 20}

    def html(self, count=9):
        examples = ''.join(f'<devsite-code><pre>Example {n}\n  Keep indentation.</pre>'
                           '<button>Copy code</button></devsite-code>' for n in range(count))
        return ('<article><p>Start reviewed-license</p>' + examples +
                '<div class="devsite-summary">Generated summary</div><p>End</p></article>')

    def test_nine_examples_and_answers_are_retained(self):
        with patch.object(pages, 'get', return_value=self.html()):
            body, content_hash, _ = pages.content_for(self.cfg(GOOGLE))
        for n in range(9):
            self.assertIn(f'Example {n}\n  Keep indentation.', body)
        self.assertEqual(body.count('```'), 18)
        self.assertNotIn('Copy code', body)
        self.assertNotIn('Generated summary', body)
        self.assertEqual(content_hash, pages.digest(body))

    def test_missing_example_blocks_publication(self):
        with patch.object(pages, 'get', return_value=self.html(8)):
            with self.assertRaisesRegex(pages.ArchiveError, 'example content missing'):
                pages.content_for(self.cfg(GOOGLE))

    def test_omitted_markdown_is_detected_even_when_html_has_examples(self):
        node = pages.extract(self.html(), ['Start', 'End'])
        with self.assertRaisesRegex(pages.ArchiveError, 'example content missing'):
            pages.check_reviewed_body(node, 'Start End', self.cfg(GOOGLE))

    def test_existing_google_source_is_not_changed_by_new_source_support(self):
        with patch.object(pages, 'get', return_value=self.html()):
            body, _, _ = pages.content_for(self.cfg('https://developers.google.com/style/highlights'))
        self.assertNotIn('Example 0', body)

    def test_full_waiver_is_retained_but_unrelated_links_are_not(self):
        cfg = self.cfg(pages.REVIEWED_PUBLIC_DOMAIN['url'])
        html = ('<article>Start reviewed-license<p>Original last paragraph. End</p>'
                '<p>Cognitect has waived all copyright and related rights. '
                'This work is published from:  United States.</p>'
                '<div>random recent unrelated-article</div></article>')
        with patch.object(pages, 'get', return_value=html):
            body, _, _ = pages.content_for(cfg)
        self.assertIn('Original last paragraph.', body)
        self.assertIn('has waived all copyright and related rights.', body)
        self.assertTrue(body.rstrip().endswith('United States.'))
        self.assertNotIn('unrelated-article', body)

    def test_changed_article_ending_is_not_silently_trimmed(self):
        cfg = self.cfg(pages.REVIEWED_PUBLIC_DOMAIN['url'])
        html = '<article>Start reviewed-license has waived all copyright End</article>'
        with patch.object(pages, 'get', return_value=html):
            with self.assertRaisesRegex(pages.ArchiveError, 'ending/waiver changed'):
                pages.content_for(cfg)


class ArticleTailTests(unittest.TestCase):
    URL = 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009554'

    def cfg(self):
        return {'url': self.URL, 'license_evidence_url': self.URL, 'kind': 'fulltext',
                'license_marker': 'reviewed-license',
                'markers': ['Rule 1:', 'Rule 10:', 'Conclusions', 'Acknowledgments', 'References'],
                'min_chars': 20}

    def html(self, tail):
        return ('<article><div><p>reviewed-license</p><h2>Rule 1: Start</h2>'
                '<p>Conclusions Acknowledgments References are mentioned here.</p>'
                '<h2>Rule 10: End</h2></div>' + tail + '</article>')

    def test_incidental_keywords_do_not_select_a_partial_article(self):
        tail = ('<h2>Conclusions</h2><p>Closing argument.</p><h2>Acknowledgments</h2>'
                '<p>I would like to thank the countless presenters and colleagues.</p>'
                '<h2>References</h2><p>Final reference. Annu Rev Biomed Data Sci.</p>')
        with patch.object(pages, 'get', return_value=self.html(tail)):
            body, _, _ = pages.content_for(self.cfg())
        self.assertIn('Closing argument.', body)
        self.assertIn('## Acknowledgments', body)
        self.assertIn('Final reference.', body)

    def test_missing_actual_tail_fails_despite_incidental_keywords(self):
        with patch.object(pages, 'get', return_value=self.html('')):
            with self.assertRaisesRegex(pages.ArchiveError, 'markers changed'):
                pages.content_for(self.cfg())

    def test_final_reference_is_required(self):
        tail = '<p>I would like to thank the countless presenters and colleagues.</p>'
        with patch.object(pages, 'get', return_value=self.html(tail)):
            with self.assertRaisesRegex(pages.ArchiveError, 'markers changed'):
                pages.content_for(self.cfg())


if __name__ == '__main__':
    unittest.main()
