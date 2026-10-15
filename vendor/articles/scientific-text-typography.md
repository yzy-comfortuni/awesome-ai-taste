---
title: "Ten simple rules for typographically appealing scientific texts"
author: "Lars Ole Schwen"
source_url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458"
copy_kind: "fulltext"
license: "CC-BY-4.0"
reviewed_on: "2026-10-15"
---

# Ten simple rules for typographically appealing scientific texts

> 正文 Markdown。正文按所列许可转换为 Markdown；删除网站导航和广告，保留正文及链接，未翻译。图片/视频为远程链接，不是完整离线媒体包。

作者／机构：Lars Ole Schwen。

[原文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458) · [许可依据](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458)

© 2020 Lars Ole Schwen。PLOS Computational Biology 16(12): e1008458，DOI: 10.1371/journal.pcbi.1008458。依据 CC BY 4.0 转换本篇英文全文，保留十条规则、图注、致谢与参考文献；图片仅保留原链接，不是离线媒体包，不复制字体或运行示例。Markdown 格式转换由 awesome-ai-taste 完成，不代表作者背书。建议主要面向美式英语，排版须服从目标期刊规范，不能用格式掩盖证据不足。许可：https://creativecommons.org/licenses/by/4.0/ 。

---

**Citation:**Schwen LO (2020) Ten simple rules for typographically appealing scientific texts. PLoS Comput Biol 16(12): e1008458. https://doi.org/10.1371/journal.pcbi.1008458

**Editor:**Scott Markel, Dassault Systemes BIOVIA, UNITED STATES

**Published:** December 31, 2020

**Copyright:** © 2020 Lars Ole Schwen. This is an open access article distributed under the terms of the [Creative Commons Attribution License](http://creativecommons.org/licenses/by/4.0/), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.

**Funding:**The author did not receive funding for preparing this manuscript.

**Competing interests:** The author has declared that no competing interests exist.

## Introduction

Text is ubiquitous in everyday scientific work—when was the last time you spent 5 minutes working without writing, reading, or interacting with any kind of equipment that had text (scales, labels, brand name, etc.) on it? Most forms of communicating ideas and findings in science are based on text, e.g., BSc/MSc/PhD theses, manuscript drafts, grant proposals, reports, or job applications. In addition, text appears in figures, (electronic) slides for presentations, and posters, i.e., in formats focused more strongly on a graphical presentation.

All these documents are usually written to convince the audience of the quality of your ideas or results, ultimately with the goal of a positive evaluation (grading, decision on funding/hiring, etc.). A good visual appearance of the text and graphical elements is key for making a good first impression on the audience. When sustaining this impression by clearly structured and well-written text, professional layout is again important because less-than-optimally typeset texts distract the audience from fully appreciating the high-quality content [[1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref001)]. Even though single visual inconsistencies cost the readers only a fraction of a second, these interruptions to the flow of reading add up and subconsciously frustrate the readers, possibly undermining your credibility. Poor visual appearance and language can be spotted at first glance in [Fig 1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g001), and incorrect content (or a confusing structure, not shown in [Fig 1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g001)) take much longer to notice. Properly formatting text is particularly challenging in interdisciplinary fields like Computational Biology, where authors are faced with a variety of text elements, e.g., Greek characters, mathematical formulas, chemical formulas, and source code listings. Similar to inconsistent writing style, inconsistent formatting may indicate plagiarism, e.g., stray dashes resulting from copying and pasting hyphenated text, garbled characters, and fonts/formatting copied from the source.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g001)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g001)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g001)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g001)

Fig 1.  What jumps out to you first?

Poor formatting, incorrect language, or wrong contents?

[https://doi.org/10.1371/journal.pcbi.1008458.g001](https://doi.org/10.1371/journal.pcbi.1008458.g001)

Scientists frequently need to produce final document layout themselves, either from scratch or based on a template—where some templates are well designed and others are, well, “designed.” If a template is given, fewer decisions need to be made, but some typographical knowledge is still helpful to understand the template and to deal with issues unforeseen therein. Ideally, the actual typesetting is subsequently done by trained professionals, e.g., working with publishers, who know what they are doing [[2](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref002)]. Submissions should, in this case, follow the publishers’ guidelines and templates, but still be prepared carefully, as “reviewers’ opinion about a manuscript can be skewed by careless formatting” [[3](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref003)]. Typography is thus one of the tools of the trade for scientists.

This article is meant as a practical guide for typesetting scientific texts, including motivation for the recommendations. While focusing on the intended layout, the rules also provide hints on how these results can be obtained in common text processing/typesetting tools (such as Microsoft Word/LibreOffice Writer, Google Docs, and LaTeX). These rules are meant to complement

- detailed typography textbooks or reference books [[4](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref004)–[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref007)] by providing hands-on recommendations for everyday scientific writing;
- software manuals (typically focused on features and how to achieve specific formatting) by explaining which formatting makes sense in which case;
- style manuals [[8](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref008)–[10](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref010)];
- tips for scientific writing [[11](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref011)–[17](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref017)] and collaboration tools [[18](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref018)–[21](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref021)]; and
- specialized recommendations for slides [[22](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref022),[23](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref023)] and posters [[24](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref024),[25](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref025)].

The rules primarily apply to English (specifically American English), and many of them also apply to other languages using the Latin alphabet and beyond. However, ligatures and diacritics (Rule 2), punctuation and its spacing (Rule 2), hyphenation (Rule 3), and number formatting (Rule 8) vary between languages.

## Rule 1: Fonts—Choose a suitable (type)face for your work

Fonts should be chosen according to the intended function. Documents primarily consisting of text are usually typeset in serif fonts where letters end in horizontal lines (see [Fig 2A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g002)) guiding the readers’ eyes through the lines like a “railroad track” [[26](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref026)]. Moreover, serifs provide distinctive shapes of words ([Fig 2B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g002)). This allows more easily reading text by fixing a few points in each line (saccades, [[27](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref027)]) rather than continuously reading each individual letter. These properties generally make serif fonts easily readable.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g002)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g002)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g002)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g002)

Fig 2.

(A) Terminology to describe the “anatomy” of glyphs. (B, C) Samples of serif (B) and sans serif fonts (C), all of them nominally of the same size (but notice the differences in width, x versus ascender/descender height and overall apparent size). (D) Confusing use of fonts for a purpose they were not designed for.

[https://doi.org/10.1371/journal.pcbi.1008458.g002](https://doi.org/10.1371/journal.pcbi.1008458.g002)

In contrast, posters, slides, and figure annotations containing only little text and incomplete sentences require each word to be clearly legible. In this case, sans serif fonts are more suitable ([Fig 2C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g002)). Nonproportional (typewriter-like) fonts where each glyph has the same width have a technical appearance and are used, e.g., for source code listings. Calligraphic, handwritten, or otherwise creative fonts may lack a serious appearance and should be used with care in scientific content, e.g., if a handwritten/sketched look is intended [[28](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref028)]. Besides the function, fonts can convey characteristics like elegant, modern, or traditional (see [Fig 2D](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g002)) [[29](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref029)].

In 1 document, only as many fonts as necessary should be mixed. Fonts should be combined to complement each other with the intended level of contrast and with matching x height and length of ascenders/descenders. The main font for the text should include all required diacritics (e.g., for proper names), non-Latin characters (e.g., Greek), and symbols (e.g., arrows or for mathematical formulas), cf. Rule 2.

## Rule 2: Individual characters and words—Get the details right

Text is composed of single characters including (uppercase and lowercase) letters, numbers, punctuation, characters with diacritics, and symbols. Typographically, however, text is composed of glyphs, representations of characters in a specific shape and design.

Certain combinations of letters appear differently when combined, forming so-called ligatures (e.g., the “fi” in the word fish in [Fig 2A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g002)). Ligatures enhance readability by avoiding visual gaps inside words and are examples of 1 glyph representing multiple characters.

Punctuation is used to structure sentences and should use correct glyphs (cf. [Fig 3A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g003)).

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g003)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g003)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g003)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g003)

Fig 3.

(A) Typographically correct symbols make a difference between sloppily written and conveniently readable texts. (B) Many language use the Latin alphabet combined with different types of diacritics and additional characters.

[https://doi.org/10.1371/journal.pcbi.1008458.g003](https://doi.org/10.1371/journal.pcbi.1008458.g003)

Quotation marks exist in 2 forms: straight/dumb (as typed on the keyboard) and typographic form. In English, raised 6/66 and 9/99 forms as shown in [Fig 3A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g003) are used as opening and closing quotation marks, respectively, depending on whether you follow a style using single or double quotes. Punctuation is placed before or after closing quotation marks depending on whether it is part of the quote, except for periods and commas always placed before the closing quotation mark [[10](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref010)]. Apostrophes have the raised-9 form of a closing single quotation mark. Prime and double prime symbols are used, e.g., for feet/inches, arcminutes/arcseconds in geographic latitude and longitude (cf. [Fig 3B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g003)), and derivatives in mathematics and to indicate positions of carbon on ribose rings in molecular biology. Neither of these symbols should be confused with accents (see below).

Dashes come in 3 flavors. For hyphenation (see also Rule 3) and compound words, a standard dash (-) is used. The slightly longer en dash (–) is used for ranges (e.g., pages 24–33), sometimes as the symbol in bullet lists (see Rule 6), and to indicate naming after separate persons (e.g., the Michaelis–Menten reaction) as opposed to hyphenated names (e.g., 2008 Nobel laureate Françoise Barré-Sinoussi). The minus sign is typically similar to the en dash. The em dash—as shown here—is used as a phrase marker—or for adding afterthoughts. However, besides unspaced em dashes, spaced en dashes are also recommended for these purposes [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref007)].

Accents and other diacritics (cf. [Fig 3B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g003)) may be complicated, in particular outside one’s native language. Still, they are worth getting right—imagine what a picky reviewer will think about your scientific work if you cited them, but did not even manage to spell their name correctly.

Correct symbols that cannot directly be typed can be selected/copied from a character table or entered via their respective Unicode code points. Both these options are tedious. Using defined macros or auto-correction features of the text processing software can be more convenient, but do not always work as intended and should be checked.

## Rule 3: Lines and paragraphs—Keep the text flowing

Paragraphs consist of lines of text (see Rule 5 for a discussion of line width). Paragraphs can be typeset left-aligned, centered, right-aligned, or fully justified; cf. [Fig 4A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g004). Justifying text requires aligning both the left and right ends of lines, and this is commonly achieved by stretching the spacing between words. Paragraphs in continuous text are usually typeset justified. This is most convenient to read as paragraph breaks can be spotted easily, and there is no random graphical emphasis on words at the beginning or end of lines which are longer than the surrounding lines. Shorter pieces of text can also be typeset left-aligned, e.g., on posters and slides. Centered and right-aligned text is sometimes used for headings, displayed equations, or tables (cf. Rule 7). Such alignment is not suitable for longer texts as it makes finding the next line inconvenient ([Fig 4A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g004)).

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g004)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g004)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g004)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g004)

Fig 4.

(A) Left-aligned text randomly emphasizes words appearing at the end of the line (indicated in orange); right-aligned text makes finding the next line unnecessarily difficult for the readers (indicated in blue); centered text combines both disadvantages; and justified text avoids these issues and has the calmest appearance. (B) Examples where hyphenation or line breaks interrupt the flow of reading (hyphenation examples from p. 115 in [[30](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref030)]). (C) Indenting the first line of paragraphs (except after headings) clearly indicates where a new paragraph starts, and this may be unclear at the top of a page otherwise.

[https://doi.org/10.1371/journal.pcbi.1008458.g004](https://doi.org/10.1371/journal.pcbi.1008458.g004)

Line breaks in paragraphs should not interrupt the flow of reading. To prevent undesired line breaks, e.g., between numbers and their unit ([Fig 4B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g004)), non-breaking spaces should be used.

Words may need to be hyphenated to avoid large gaps in lines in justified text. Text should be hyphenated by the respective feature of the text processing/typesetting software. Automatic hyphenation usually works well if language settings are correct, but should be checked for misleading hyphenations ([Fig 4B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g004)). Enforcing hyphenation by manually entering dashes and spaces/line breaks may lead to stray dashes when fur-ther editing the text.

The first line of paragraphs is frequently indented ([Fig 4C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g004)) to clearly indicate that a new paragraph has started (except immediately after headings where indentation would be redundant). In contrast to vertically spacing paragraphs, indenting is also visible after a page break, below a figure, and after lists.

Alignment, indentation, and other formatting of paragraphs should not be applied manually for each paragraph, but via suitably defined paragraph or document styles. Ideally, this is provided by the document template.

## Rule 4: Emphasize what is important, and only that

Not all words in a text are equally important, and some need to be distinguished visually. Visual emphasis, however, should not happen by accident (e.g., because a word happens to appear at the end of a line or because a symbol needs to be used from a different font). Instead, emphasis should result from a conscious decision, and a suitable and consistent way of formatting different types of importance should be used. The main purposes of increased visibility of words are.

- structuring (providing “entry points” on the page where one could start reading),
- emphasis (where stressing something only makes sense within the context), and
- markup (e.g., in bibliographies or for syntax highlighting in source code).

Typographically, there are different variants of highlighting ([Fig 5A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g005)), ranging from subtle to highly prominent. The prominence of emphasis can be characterized by the change of “color” [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref007)] (or “type color” [[31](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref031)]), i.e., how dark the page appears at some location when viewed out of focus. Larger changes of type color are more prominent highlighting and easier to spot when just glancing at the page/poster/slide. Italic (no change in type color) is usually the formatting of choice for emphasis within context. In contrast, bold (notable change in type color) is useful, e.g., for headings or terms defined in a glossary. Small caps (no change in type color) are sometimes used to distinguish family names from given names or real-world from model entities. Underlining used to be one of the few possibilities of emphasis using a typewriter (see [Fig 5B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g005)), but is neither particularly nice nor useful nowadays.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g005)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g005)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g005)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g005)

Fig 5.

(A) Text in italics, small caps, or a matching alternative font does not change the type color of the page and emphasizes words within the context while reading. Bold text, uppercase letters, and different colors are more prominent and serve as “entry points” to the text. Using a contrasting alternative font, letter spacing, and underlining words forms an even stronger visual contrast, but is challenging to get looking good. (B) In the era of typewriters, authors were much more limited in using emphasis in their texts. (C) Italic, bold, and small caps should be used as properly designed font variants and not be faked by slanting (making the text look unnatural), making lines thicker (leading to, e.g., shrunken eyes and unbalanced spacing), or scaling capitals (making glyphs skinny). (Disclosure of image manipulation: text typed using a mechanical typewriter was digitized and edited for clarity, and color channels of the RGB image were manipulated to imitate red text from a 2-color ink ribbon).

[https://doi.org/10.1371/journal.pcbi.1008458.g005](https://doi.org/10.1371/journal.pcbi.1008458.g005)

Emphasis in continuous texts should be used sparingly. If 80% of a text is emphasized, actually the remaining 20% of the text are most visible. In contrast, text not meant to be read as a whole may profit from extensively combining different ways of highlighting, e.g., markup in bibliographies or syntax highlighting in source code listings.

Pitfalls of highlighting are shown in [Fig 5C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g005). Italic, bold, and small caps of a font should only be used if available as properly designed variants. Automatically created variants (slanting glyphs, using thicker lines, or shrinking uppercase letters) are of lower quality (“Frankensteinian manipulation” [[32](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref032)]) and best avoided.

To achieve consistent visual emphasis throughout a document, suitable styles or macros should be defined and used. Naming these by purpose rather than appearance makes it easy to consistently change formatting when editing and revising a document (cf. Rule 9).

## Rule 5: Pages—Visually distribute your story

Unlike information on web pages, printed material and presentation slides are arranged on separate pages of fixed size. Contents thus need to be distributed with page breaks at useful locations (unless, of course, only a single page or a poster is needed). Besides text, also non-text material (figures, tables, and footnotes) needs to be positioned on pages.

For good readability, lines should not be longer than 75 to 80 characters [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref007)] or require additional line spacing; otherwise, the readers’ eyes cannot easily jump from 1 line to the next. Reducing the margin width is thus not a good way to squeeze more content into a given number of pages. Also, margins are needed for the readers simply to hold the document without fingers covering part of the content and to take notes. Only little text such as page numbers should be placed in the margin (top outside, bottom outside, or bottom center). Two-column layout allows more readable text per page, but makes placing wide elements like figures or tables more complex. One-sided layout with page numbers at the bottom center is more robust if readers will likely print the document themselves and might not use duplexing or might print 2-on-1 (swapping left and right pages).

If not defined by a template, one easy way [[33](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref033)] to define page margins (cf. [Fig 6A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g006)) is to first determine how wide the text block needs to be to fit about 70 characters on average. The page is then divided into an *n*×*n* grid such that using 2 stripes of cells each as the left and right margins leaves the desired text width. One and 2 horizontal stripes are then used as the top and bottom margins, respectively. For 2-sided layout, each page should have only 1 stripe as the inner margin. In both cases, additional space for binding may need to be considered. For 12-point Cambria text on an A4-sized page, this construction results in *n* = 12 and margins of 35 mm, 25 mm, and 50 mm on the left/right, top, and bottom, respectively. In contrast, using a default setting of 1-inch margins for a letter-sized page containing 10-point Times New Roman text results in about 115 characters per line, too much for convenient reading.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g006)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g006)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g006)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g006)

Fig 6.

(A) One way to construct page margins for 1-sided and 2-sided layouts, also considering the type of binding used (here: spiral binding with narrower inner margin—glue or sewn binding requires enlarging the inner margin). (B) Figures (or tables) are commonly placed at the top of a page (or on figure-only pages), but not in between the text. (C) Orphans and widows, single lines of text separated from the rest of their paragraph, should be avoided.

[https://doi.org/10.1371/journal.pcbi.1008458.g006](https://doi.org/10.1371/journal.pcbi.1008458.g006)

Besides the running text, documents contain “floating” objects like figures or tables. These also need to be placed on the pages, typically at the top or bottom or on figure-only pages, ideally close to where they are referenced; see [Fig 6B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g006). Placing figures inside the running text would interrupt reading and may cause distracting page breaks. Instead, presenting figures in a separate “thread” outside the continuous text also permits readers to just browse through the figures and quickly find what interests them.

Footnotes, as the name suggests, are placed at the bottom of the page where they are referenced (which, clearly, should be done automatically). Footnotes are useful for relevant information complementing the main text without interrupting its flow (e.g., translations), see below for an example. Sometimes (e.g., to make presentation slides self-contained), footnotes are also used for literature references.

When optimizing page breaks, no single lines should be separated from the rest of a paragraph; see [Fig 6C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g006). Such single lines at the bottom and top of a page are denoted as widows (“have no future”) and orphans (“have no past”), respectively [[33](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref033)]. (The previous sentence is an example where a footnote would make sense: This vivid terminology is also used in other languages, e.g., the German terms for widow and orphan are “Hurenkind” [politically correct translation: offspring of a person working in the world’s oldest profession] and “Schusterjunge” [shoemaker’s apprentice].)

Text processing/typesetting software can places figures and partially prevent orphans and widows automatically, but this may require additional fine-tuning. Tricks for optimizing page breaks include rephrasing the text to make a paragraph on the affected page 1 line longer or shorter; enlarging the page vertically or breaking the page a line earlier; and moving, enlarging, or shrinking figures.

## Rule 6: Lists—Present some content in structured form

Not all textual information is best presented as complete sentences in continuous text. In particular, as few text as possible should be used on slides [[22](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref022),[23](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref023)] and posters [[24](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref024),[25](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref025)]. Also in longer written texts, some information is best presented in (sub-)structured lists, either unsorted (itemized/bulleted) or sorted (numbered) lists; see [Fig 7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g007). The readability of lists may profit from manually optimizing line breaks, in particular on slides and posters.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g007)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g007)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g007)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g007)

Fig 7.

(A) Hard-to-recognize list, (B) properly formatted unsorted list, and (C) properly formatted numbered list.

[https://doi.org/10.1371/journal.pcbi.1008458.g007](https://doi.org/10.1371/journal.pcbi.1008458.g007)

Numbered lists are most useful for step-by-step instructions or if some of the entries are referenced from elsewhere (“item 5c” is more convenient than “the third sub-item of the fifth item”). Other common types of structured lists are glossaries (alphabetically sorted definition of terms where readers should quickly find the term they are looking for) and bibliographies (which additionally require cross-referencing from the main text). Itemized and numbered lists should be formatted consistently, i.e., they should be entered as the appropriate type of list and not by manually entering bullets/numbers and indentation; see [Fig 7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g007).

Particularly in bibliographies, it makes sense to conceptually distinguish content and layout. Here, the same information (author, title, journal, volume, year, etc.) should be printed in 1 consistent style (format, referencing from the text, and sorting). Using suitable reference management integrated with the text processing avoids manually formatting bibliographies.

## Rule 7: Figures, plots, and tables—Do not neglect the text outside the continuous text

Typography is relevant not only for the continuous text, but also for text in figures, plots, and tables. Figures convey content in easy-to-grasp graphical form, and plots present data in visual form, whereas tables provide precise numbers. Creating high-quality and well-readable figures [[28](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref028),[34](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref034)–[39](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref039)] can be challenging, but is worth spending effort; well-designed figures with self-contained captions telling the main story are a useful way of reaching hurried readers just browsing through your work [[15](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref015)] or starting reading by looking at figures [[40](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref040)]. In particular, a good graphical abstract [[41](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref041)] or concept figure [[42](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref042)] can attract readers (even though the impact on citations is unclear [[43](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref043)]).

Figures may contain different amounts of text that should be consistent with the main text not only in terminology, but also in terms of fonts and symbols. Figures are often created in separate software, so consistency may be challenging. However, the limited capability of software is not a convincing excuse for low-quality figures (cf. [Fig 8A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g008) versus [Fig 8B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g008)), and malicious readers could interpret it as limited capability of the author.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g008)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g008)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g008)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g008)

Fig 8.

(A) Poor-quality plot: numbers are hard to read, symbols are not displayed properly, and color provides no additional information (except that automatic spell checking marked part of the axis labels as wrong). (B) Same data, better plot quality. (C) Poor-quality table: excessive lines and hard-to-read numbers, even in the right-aligned column due to the footnote symbol and numerals of different width. (D) Same information, better table layout.

[https://doi.org/10.1371/journal.pcbi.1008458.g008](https://doi.org/10.1371/journal.pcbi.1008458.g008)

Table formatting includes proper column alignment. While text should be left-aligned in columns, numbers in columns can only be compared conveniently if printed right-aligned and written in numerals that are all of the same width (table figures). Tables should not include too many prominent lines to prevent the impression of a “prison cell” (cf. [Fig 8C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g008) versus [Fig 8D](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g008)). Instead, tables can be structured optically by moderate spacing, light shading of every other row, or light lines. Whitespace is useful for structuring contents [[44](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref044),[45](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref045)], elsewhere as well, e.g., in figures and lists (cf. Rule 6).

## Rule 8: Mathematical and chemical formulas—Do not let doubt enter the equation

Numbers should not only be correct, but should also be formatted appropriately. Numbers with more than 4 digits are grouped using commas between each group of 3 digits: 31,556,952. For decimal numbers, a period (“point”) is used as the decimal separator: 3.14. Following [[10](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref010)], ordinal numbers should be written as 1st, 2nd, 3rd, 4th, … without superscript letters. When reporting computer-generated results, notation like 5·10−9 is easier to read than pasting 5e−9 verbatim (and shows that you know what the “e” stands for).

Formulas provide precise information in a very condensed form. They are difficult to get right in the first place, and incorrect typesetting can alter the meaning: consider, e.g., 23 = 8 versus 23, or the isotope 14C versus 14 carbon atoms. Formulas are a particular example where correct typesetting is indispensable to show you understood what you have written. Shorter and simpler formulas can be included “inline” in the text ([Fig 9A and 9B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g009)). In this case, font, font size, and the base line should match the surrounding text. More complex formulas, those to be cross-referenced by number or formulas too high to fit in the text without modified line spacing, are better written as displayed formulas ([Fig 9C and 9D](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g009)). From a grammar and punctuation perspective, also displayed formulas should be considered part of the sentences in the containing text. Depending on the text processing software used, formulas can be entered via math syntax or equation editors or (e.g., in case of complex chemical formulas) may need to be created in external software and imported as images.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g009)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g009)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g009)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g009)

Fig 9.

(A versus B) Formulas in the text should use a font matching the text and match the baseline of the text. Mathematical variables should be typeset in italic, unlike text parts of formulas or certain functions. (C versus D) Similarly, displayed formulas should match the surrounding text and are easier to understand if properly aligned. (E) Chemical formulas include subscript and superscript indices around symbols for chemical elements.

[https://doi.org/10.1371/journal.pcbi.1008458.g009](https://doi.org/10.1371/journal.pcbi.1008458.g009)

In formulas, mathematical variables are commonly typeset in italic. However, mathematical functions like sin (sine), text (including, e.g., abbreviations in indices), units, chemical elements, and certain constants should not appear in italic ([Fig 9B, 9D, and 9E](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g009)). To make longer formulas easier to read, proper alignment and grouped brackets of matching size are helpful ([Fig 9D](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g009)).

## Rule 9: Use templates and styles for automatic and consistent formatting

When writing texts, unfinished layout may distract from content and structure. However, these topics should be addressed and concentrated on first, see Rule 10. Using software like Microsoft Word, LibreOffice Writer, or Google Docs that uses the “what you see is what you get” principle, layout needs to be ignored actively, unless a structure view, disabled page preview, or similar is used. Writing text in markup languages (e.g., Markdown or LaTeX using “what you see is what you mean”) makes the separation of content/structure and format/layout easier, but requires more technological affinity.

Structure in texts should be defined by styles/macros declaring, e.g., a section heading as a “level 1 heading” rather than manually numbering it, formatting it to a specific font size in bold with additional line spacing, making sure it is not followed by a page break, etc.; see [Fig 10](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi-1008458-g010). Properly structuring in this way also permits automatically creating a table of contents, cross-referencing to section numbers without keeping them up to date manually, automatically using the same style, or conveniently switching the style if the template is changed. Similarly, figures and tables with captions should be included as such objects so that they can be positioned automatically at the top/bottom or on separate pages, again with the side effect of automatic numbering and cross-referencing.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1008458.g010)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1008458.g010)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1008458.g010)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1008458.g010)

Fig 10.

(A versus B) Marking headings as the appropriate level of headings (instead of manually formatting it bold and larger) ensures consistent layout (Google Docs example). (C) Using automatically numbered headings and proper cross-references (rather than manually entering it) allows keeping them up to date automatically (Microsoft Word example). (D) Using a macro name indicating its purpose (rather than having to remember the formatting for a specific purpose) makes writing easier (LaTeX example).

[https://doi.org/10.1371/journal.pcbi.1008458.g010](https://doi.org/10.1371/journal.pcbi.1008458.g010)

## Rule 10: Iterative writing and typesetting—Do first things first and last things last

Formatting manuscripts is an iterative process, just like writing the contents [[12](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref012),[16](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref016)]. When drafting contents at an early stage of the writing process, it only makes sense to pay attention to typographic issues that will likely be missed or cause problems/increased efforts later. This includes proper structuring, cross-referencing, and using template styles/macros. When editing the text later on, effort should be invested in those parts to be kept in the final manuscript. Issues relevant at this stage include, e.g., the contents of proper formulas, tables, and figures. Only when the contents have been finalized, it makes sense to polish the layout by optimizing line or page breaks and figure placement. Prematurely polishing either language or layout of parts of text that are deleted later is wasted effort.

Solitary and collaborative [[18](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref018),[20](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458#pcbi.1008458.ref020)] writing may use a different format/platform than the one used for formatting and finalizing the submission, e.g., one may collaborate via a Google Doc or via Markdown files in a Git repository followed by finalizing the layout in LibreOffice Writer or LaTeX. Moreover, input from one or different authors needs to be unified also on a technical level, regardless of the technical platform used. Enough time should be planned for the work needed to turn finalized content into a formatted document ready for submission.

## Acknowledgments

The author would like to thank the organizers of CdE-SommerAkademie 2017 and the participants of the “Getting Things Finished” workshop for providing an inspiring environment where he wrote a substantial part of this manuscript. Moreover, the author would like to acknowledge Simon Kempny for fruitful discussions about a draft of this manuscript.

## References

1. 1. Reynolds L. Legibility Studies: Their Relevance to Present-Day Documentation Methods. J Doc. 1979;35 (9):307–40. 
   
   - [View Article](https://doi.org/10.1108/eb026686)
   - [Google Scholar](http://scholar.google.com/scholar?q=Legibility+Studies%3A+Their+Relevance+to+Present-Day+Documentation+Methods+Reynolds+1979)
2. 2. Krause K. The design decisions behind *Nature*’s new look. Nature. 2019;594:476–7. pmid:31664261 
   
   - [View Article](https://doi.org/10.1038/d41586-019-03083-5)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/31664261)
   - [Google Scholar](http://scholar.google.com/scholar?q=The+design+decisions+behind+Nature%E2%80%99s+new+look+Krause+2019)
3. 3. The American Naturalist. Instructions for Authors; 2019. Available from: [https://www.journals.uchicago.edu/journals/an/instruct](https://www.journals.uchicago.edu/journals/an/instruct) [cited 2019-08-30].
4. 4. Tschichold J. The New Typography. University of California Press; 1995.
5. 5. Lupton E. Thinking with type: a critical guide for designers, writers, editors, & students. Princeton Architectural Press; 2004. ISBN 1-56898-448-0.
6. 6. Ambrose G, Harris P. The Fundamentals of Typography. Lausanne: AVA Publishing; 2006. ISBN 978-2-940373-45-1.
7. 7. Bringhurst R. The Elements of Typographic Style. 4th ed. Seattle/Vancouver: Hartley & Marks; 2016. ISBN 978-0-88179-212-6.
8. 8. Strunk O. The Elements of Style. Strunk Jr W, Tenney EA, editors; 2000. ISBN 978-0-205-31342-6.
9. 9. Stevens ML. Subtleties of Scientific Style. Thornleigh: ScienceScape Editing; 2007. ISBN 0-9578877-3-6.
10. 10. The Chicago Manual of Style. 16th ed. Chicago/London: University of Chicago Press; 2010. ISBN 978-0-226-10420-1.
11. 11. Rubens P, Southard S. Solving Writing Issues Related to Non-native Writers of English. Proceedings of IEEE International Professional Communication Conference IPCC. 2004;2004:42–6. 
   
   - [View Article](https://doi.org/10.1109/IPCC.2004.1375272)
   - [Google Scholar](http://scholar.google.com/scholar?q=Solving+Writing+Issues+Related+to+Non-native+Writers+of+English+Rubens+2004)
12. 12. Belcher WL. Writing Your Journal Article in 12 Weeks: A Guide to Academic Publishing Success. SAGE; 2009. ISBN 978-1-4129-5701-4.
13. 13. Ten ZW. Simple Rules for Writing Research Papers. PLoS Comput Biol. 2014;10 (1):e1003453. pmid:24499936 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1003453)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/24499936)
   - [Google Scholar](http://scholar.google.com/scholar?q=Simple+Rules+for+Writing+Research+Papers+Ten+2014)
14. 14. Weinberger CJ, Evans JA, Allesina S. Ten Simple (Empirical) Rules for Writing Science. PLoS Comput Biol. 2015;11 (4):e1004205. pmid:25928031 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1004205)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/25928031)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+%28Empirical%29+Rules+for+Writing+Science+Weinberger+2015)
15. 15. Mensh B, Kording K. Ten simple rules for structuring papers. PLoS Comput Biol. 2017;13 (9):e1005619. pmid:28957311 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1005619)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/28957311)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+simple+rules+for+structuring+papers+Mensh+2017)
16. 16. Horkoff T. Writing for Success 1st Canadian Edition. BCcampus OpenEd; 2018. Available from: [https://opentextbc.ca/writingforsuccess/](https://opentextbc.ca/writingforsuccess/) [cited 2020-08-30].
17. 17. Mack CA. How to Write a Good Scientific Paper. Bellingham, WA, USA: SPIE Press; 2018. ISBN 9781510619135. [https://doi.org/10.1117/3.2317707.sup](https://doi.org/10.1117/3.2317707.sup)
18. 18. Knauff M, Nejasmic J. An Efficiency Comparison of Document Preparation Systems Used in Academic Research and Development. PLoS One. 2014;9 (12):e115069. pmid:25526083 
   
   - [View Article](https://doi.org/10.1371/journal.pone.0115069)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/25526083)
   - [Google Scholar](http://scholar.google.com/scholar?q=An+Efficiency+Comparison+of+Document+Preparation+Systems+Used+in+Academic+Research+and+Development+Knauff+2014)
19. 19. Perez-Riverol Y, Gatto L, Wang R, Sachsenberg T, Uszkoreit J, FdV L, et al. Ten Simple Rules for Taking Advantage of Git and GitHub. PLoS Comput Biol. 2016;12 (7):e1004947. pmid:27415786 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1004947)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/27415786)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+Rules+for+Taking+Advantage+of+Git+and+GitHub.+Perez-Riverol+2016)
20. 20. Frassl MA, Hamilton DP, Denfeld BA, de Eyto E, Hampton SE, Keller PS, et al. Ten Simple Rules for Collaboratively Writing a Multi-Authored Paper. PLoS Comput Biol. 2018;14 (11):e1006508. pmid:30439938 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1006508)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/30439938)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+Rules+for+Collaboratively+Writing+a+Multi-Authored+Paper+Frassl+2018)
21. 21. Himmelstein DS, Rubinetti V, Slochower DR, Hu D, Malladi VS, Greene CS, et al. Open collaborative writing with Manubot. PLoS Comput Biol. 2019;15 (6):e1007128. pmid:31233491 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1007128)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/31233491)
   - [Google Scholar](http://scholar.google.com/scholar?q=Open+collaborative+writing+with+Manubot+Himmelstein+2019)
22. 22. Bourne PE. Ten Simple Rules for Making Good Oral Presentations. PLoS Comput Biol. 2007;3 (4):e77. pmid:17500596 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.0030077)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/17500596)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+Rules+for+Making+Good+Oral+Presentations+Bourne+2007)
23. 23. Lortie CJ. Ten simple rules for short and swift presentations. PLoS Comput Biol. 2017;13 (3):e1005373. pmid:28358832 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1005373)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/28358832)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+simple+rules+for+short+and+swift+presentations+Lortie+2017)
24. 24. Erren TC, Bourne PE. Ten Simple Rules for a Good Poster Presentation. PLoS Comput Biol. 2007;3 (5):e102. pmid:17530921 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.0030102)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/17530921)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+Rules+for+a+Good+Poster+Presentation+Erren+2007)
25. 25. Everson K. 10 simple rules for designing a scientific poster; 2016. Available from: [https://www.molecularecologist.com/2016/06/10-simple-rules-for-designing-a-scientific-poster/](https://www.molecularecologist.com/2016/06/10-simple-rules-for-designing-a-scientific-poster/) [cited 2020-08-30].
26. 26. Degani A. On the typography of flight-deck documentation. San José State University/Ames Research Center: National Aeronautics and Space Administration; 1992. NASA Contractor Report 177605. Available from: [https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19930010781.pdf](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19930010781.pdf) [cited 2020-08-30].
27. 27. Josephson S. Keeping your readers’ eyes on the screen: an eye-tracking study comparing sans serif and serif typefaces. Vis Commun Q. 2008;15 (1–2):67–79. 
   
   - [View Article](https://doi.org/10.1080/15551390801914595)
   - [Google Scholar](http://scholar.google.com/scholar?q=Keeping+your+readers%E2%80%99+eyes+on+the+screen%3A+an+eye-tracking+study+comparing+sans+serif+and+serif+typefaces+Josephson+2008)
28. 28. Rougier NP, Droettboom M, Bourne PE. Ten Simple Rules for Better Figures. PLoS Comput Biol. 2014;10 (9):e1003833. pmid:25210732 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1003833)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/25210732)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+Simple+Rules+for+Better+Figures+Rougier+2014)
29. 29. Garfield S. Just my Type: A Book About Fonts. London: Profile Books; 2011. ISBN 978–1846683022.
30. 30. Lederer R, Shore J. Comma Sense: A Fundamental Guide to Punctuation. New York: St. Martin’s Griffin; 2005. ISBN 978-0-312-34255-5.
31. 31. Strizver I. Type Rules: The Designer’s Guide to Professional Typography. 4th ed. Hoboken: Wiley; 2014. ISBN 978-1-118-45045-3.
32. 32. Kiernan-Johnson DH. Telling Through Type: Typography and Narrative in Legal Briefs. Journal of the Association of Legal Writing Directors. 2010;7(1):87–122. Available from: [https://ssrn.com/abstract=1649875](https://ssrn.com/abstract=1649875) [cited 2020-08-30]. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458)
   - [Google Scholar](http://scholar.google.com/scholar?q=Telling+Through+Type%3A+Typography+and+Narrative+in+Legal+Briefs+Kiernan-Johnson+2010)
33. 33. Kohm M. KOMA-Script 3.28 Manual; 2020. Available from: [http://mirrors.ctan.org/macros/latex/contrib/koma-script/doc/scrguien.pdf](http://mirrors.ctan.org/macros/latex/contrib/koma-script/doc/scrguien.pdf) [cited 2020-08-30].
34. 34. Tufte ER. The Visual Display of Quantitative Information. 2nd ed. Graphics Press; 2001. ISBN 9781930824133.
35. 35. Few S. Show Me the Numbers: Designing Tables and Graphs to Enlighten. 2nd ed. Burlingame: Analytics Press; 2012. ISBN 9780970601971.
36. 36. Evanko D. Data visualization: A view of every Points of View column; 2013. Available from: [http://blogs.nature.com/methagora/2013/07/data-visualization-points-of-view.html?WT.mc-id=TWT-NatureMethods](http://blogs.nature.com/methagora/2013/07/data-visualization-points-of-view.html?WT.mc-id=TWT-NatureMethods) [cited 2020-09-27].
37. 37. Yau N. Data Points: Visualization That Means Something. 1st ed. Wiley; 2013. ISBN 978-1-118-46219-5.
38. 38. Healy K. Data Visualization: A Practical Introduction. Princeton University Press; 2019. ISBN 978-0-691-18162-2.
39. 39. Wilke CO. Fundamentals of Data Visualization. O’Reilly; 2019. ISBN 978-1-492-03108-6.
40. 40. Carey MA, Steiner KL, Petri WA Jr. Ten simple rules for reading a scientific paper. PLoS Comput Biol. 2020;16 (7):e1008032. pmid:32730251 
   
   - [View Article](https://doi.org/10.1371/journal.pcbi.1008032)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/32730251)
   - [Google Scholar](http://scholar.google.com/scholar?q=Ten+simple+rules+for+reading+a+scientific+paper+Carey+2020)
41. 41. User Mind the Graph. How to plan and design a graphical abstract in three steps; 2019. Available from: [https://medium.com/the-science-educator/how-to-plan-and-design-a-graphical-abstract-in-three-steps-eb270eda9ecf](https://medium.com/the-science-educator/how-to-plan-and-design-a-graphical-abstract-in-three-steps-eb270eda9ecf) [cited 2020-08-30].
42. 42. User jbiogeography. Figures: the Art of Science; 2020. Available from: [https://journalofbiogeographynews.org/2020/07/15/figures-the-art-of-science/](https://journalofbiogeographynews.org/2020/07/15/figures-the-art-of-science/) [cited 2020-08-30].
43. 43. Pferschy-Wenzig EM, Pferschy U, Wang D, Mocan A, Atanasov AG. Does a Graphical Abstract Bring More Visibility to Your Paper? Molecules. 2016;21 (9). pmid:27649137 
   
   - [View Article](https://doi.org/10.3390/molecules21091247)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/27649137)
   - [Google Scholar](http://scholar.google.com/scholar?q=Does+a+Graphical+Abstract+Bring+More+Visibility+to+Your+Paper%3F+Pferschy-Wenzig+2016)
44. 44. Wong B. Negative space. Nat Methods. 2011;8 (1):1. 
   
   - [View Article](https://doi.org/10.1038/nmeth0111-5)
   - [Google Scholar](http://scholar.google.com/scholar?q=Negative+space+Wong+2011)
45. 45. Wong B. Points of view: Typography. Nat Methods. 2011;8 (4):277. pmid:21574271 
   
   - [View Article](https://doi.org/10.1038/nmeth0411-277)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/21574271)
   - [Google Scholar](http://scholar.google.com/scholar?q=Points+of+view%3A+Typography+Wong+2011)
