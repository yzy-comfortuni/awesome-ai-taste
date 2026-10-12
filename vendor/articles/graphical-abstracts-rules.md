---
title: "Ten simple rules for designing graphical abstracts"
author: "Helena Klara Jambor; Martin Bornhäuser"
source_url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789"
copy_kind: "fulltext"
license: "CC-BY-4.0"
reviewed_on: "2026-10-13"
---

# Ten simple rules for designing graphical abstracts

> 正文 Markdown。正文按所列许可转换为 Markdown；删除网站导航和广告，保留正文及链接，未翻译。图片/视频为远程链接，不是完整离线媒体包。

作者／机构：Helena Klara Jambor; Martin Bornhäuser。

[原文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789) · [许可依据](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)

© 2024 Jambor、Bornhäuser。PLOS Computational Biology 20(2): e1011789，DOI: 10.1371/journal.pcbi.1011789。依据 CC BY 4.0 转换本篇英文正文、图注和参考文献；图像作为外链保留，不是离线媒体包。Markdown 格式转换由 awesome-ai-taste 完成，不代表原作者背书。许可：https://creativecommons.org/licenses/by/4.0/ 。

---

**Citation:**Jambor HK, Bornhäuser M (2024) Ten simple rules for designing graphical abstracts. PLoS Comput Biol 20(2): e1011789. https://doi.org/10.1371/journal.pcbi.1011789

**Editor:**Scott Markel, Dassault Systemes BIOVIA, UNITED STATES

**Published:** February 1, 2024

**Copyright:** © 2024 Jambor, Bornhäuser. This is an open access article distributed under the terms of the [Creative Commons Attribution License](http://creativecommons.org/licenses/by/4.0/), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.

**Funding:**HKJ received a salary from an habilitation award of the Medical Faculty of the Technische Universität Dresden. HKJ and MB received project funding from the Hochschulstiftung Medizin Dresden. MB received funding from the MSNZ program of the Deutsche Krebshilfe. The funders had no role in study design, data collection and analysis, decision to publish, or preparation of the manuscript.

**Competing interests:** The authors have declared that no competing interests exist.

## Introduction

Explanatory graphics that summarize knowledge are common in science communication. These graphics integrate new insights with the existing body of knowledge in a particular field of research. Explanatory graphics have been widely used in chemistry for many years to depict structures [[1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref001)], and they have now gained popularity across various scientific disciplines as graphical abstracts [[2](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref002)]. Scientific journals are increasingly asking authors to provide graphical abstracts along with a paper to attract audiences online and on social media. These graphical abstracts are prominently displayed on the journals websites, embellishing the table of contents, and serving as a visual pendant to the written abstract. Due to this usage, graphical abstracts are also referred to as “TOC” image or “thumbnail views.”

Graphical abstracts are not intended to provide a complete understanding of a research article, even though they are often presented online with just the title of the work. A study confirmed graphical abstracts by themselves are insufficient to comprehend the key message of a paper [[3](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref003)]. Instead these visuals serve to attract attention and are meant to be read in conjunction with the written abstract. According to Cell press guidelines, graphical abstracts should inspire audiences to browse, stimulate their interdisciplinary curiosity, and allow them to rapidly screen for papers in journals [[4](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref004)]. As graphical abstracts are a relatively recent addition to the publishing landscape, quantitative data on their usage and usefulness are still limited. However, early analyses indicate that while graphical abstracts do not necessarily increase full-text reads or citations, they do enhance the abstract views [[5](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref005)] and boost altimetric attention scores of articles [[6](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref006)].

Like other explanatory visualizations, graphical abstracts have common features such as a central visual element, often icons, diagrams or photos, explanatory text, and use clear layout and color schemes to increase readability. These elements are often structured using arrows and lines and enhanced with color. The design elements of graphical abstracts were recently quantified in a research study that classified graphical abstracts based on their overall organization [[2](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref002)]. In their work, Hullman and Bach revealed the diversity of graphical abstracts in the current literature, and in particular, the many possibilities to use layout for readability. They also pinpointed common problems associated with graphical abstracts, such as inconsistent visual styles, unclear relationships between pictures, and missing annotations. These challenges were also identified in a complementary qualitative study of graphical abstracts [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref007)].

Training of scientists, especially early career researchers, in the art of crafting comprehensible and attractive graphical abstract has been somewhat lagging. A brief guide for graphical abstract design is available for medical writers [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref007)] and for creating overview figures [[8](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref008)]. However, most scientist are not trained in data visualizations or visual communication [[9](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref009),[10](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref010)], and even less so in creating explanatory visuals of their research. It’s important to note that visual design is a nontrivial endeavor. Publishing houses, journals, and major research institutes often employ visual teams to create attractive explanatory figures for scientific data.

Here, we present 10 simple rules for designing graphical abstracts. The 10 rules are informed by our experience teaching biologists, clinicians, students, and established scientists, and from jointly preparing graphical abstracts for publications and grants ([Fig 1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g001)). The article discusses all aspects of graphical abstract preparation, from foundational decisions about the message and the key visuals (1 to 3), to designing the layout (4 to 6), and complementing the design with text (7) and color (8). We also provide an overview of tools and software commonly used for making graphical abstracts (9) and highlight the benefit of feedback in the process (10). The order of the 10 rules reflects our “design pipeline” from starting with a draft to implementing the draft electronically; however, as with all creative processes, you are encouraged to adapt the process to your own style.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g001)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g001)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g001)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g001)

Fig 1.

The evolution of a graphical abstract, from sketch (A) to a rapid Biorender draft (B) and final implementation in a graphical software program (C). All drawings by HKJ, licensed under CC0, [https://doi.org/10.6084/m9.figshare.24486061.v1](https://doi.org/10.6084/m9.figshare.24486061.v1).

[https://doi.org/10.1371/journal.pcbi.1011789.g001](https://doi.org/10.1371/journal.pcbi.1011789.g001)

## Rule 1: Key message for audience

Before embarking on the design of a graphical abstract, it is essential to know your message. This tip is not specific to graphical abstracts, but also essential for producing an understandable and clear visualization. The process of defining a key message varies. Some start with doodling on a post-it, some with key visuals, and some by iteratively shortening the abstract to 1 or 2 punchy sentences. Ideally already at this stage co-authors are involved and provide feedback (see #10). Recent tools, such as chatGPT, may be helpful in facilitating a dynamic exchange and the concise distillation of the core message. Whichever route is yours, without a clear central message, it will be impossible to design a clear graphical abstract and reach the goal of visually summarizing your research paper.

## Rule 2: Pictures and pictograms

The key components of every graphical abstract are the visual elements. Most often, graphical abstracts include pictograms or symbols and, less commonly, iconic microscope ([Fig 1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g001)) or photographic images, or data (see #5). Pictograms may also be hand-drawn, but mostly biologists use simple shapes, circles, ellipses, and rectangles, when creating pictograms from scratch. In recent years, numerous icon collections have become available, many of which are free to re-use and do not always need attribution. In most icon repositories pictograms can be downloaded as PNG (Portable Network Graphic), a raster-graphics format for lossless data compression. PNGs are ready to use in graphic software but not adaptable. Alternatively, icons are provided as SVG (Scalable Vector Graphics), an image format that can also be used interactively on the web and is fully adaptable in appearance with graphic software.

For general icons, many repositories exist for simple icons:

- PowerPoint offers inbuild image and icon libraries and many pre-drawn shapes that are free to use.
- Fontawesome ([https://fontawesome.com](https://fontawesome.com/)) is a Unicode-based icon library that can be installed locally as a font for graphic programs, downloaded as full icon library, or downloaded as individual SVG images.
- Nounproject ([https://thenounproject.com](https://thenounproject.com/)) is a large repository sourcing icons from various designers. Hence, the available icons are vast, but also not matched in style. These icons can be used for free with attribution as SVG or PNG.
- SVGrepo ([https://www.svgrepo.com](https://www.svgrepo.com/)) is the largest SVG icon library, which additionally provides search functions for icon style and appearances such as color, rounded or sharp icons.

Biology and Medicine require specific icons which are available in the following repositories:

- Phylopic ([https://www.phylopic.org/](https://www.phylopic.org/)) offers shapes of numerous animals, plants, and further model organisms, e.g., for phylogenetic trees.
- The EBI ([https://www.ebi.ac.uk/style-lab/general/fonts/v1.3/](https://www.ebi.ac.uk/style-lab/general/fonts/v1.3/)) provides some general scientific icons.
- Reactome ([https://reactome.org/icon-lib](https://reactome.org/icon-lib)) provides scientific pictograms and chemical drawings for free re-use and encourages the upload of user-designed pictograms for sharing with the scientific community.
- Smart ([https://smart.servier.com/](https://smart.servier.com/)) is a free collection of medical drawings from Servier Medical Art and can be downloaded as a full slide-deck and used with attribution.
- Bioicons ([https://bioicons.com/](https://bioicons.com/)) is an expanding set of biology and laboratory icons from Petri dishes to model organisms available under free licenses (CC0). Initially by Servier, the drawings are expanded with user provided samples.
- Health Icons ([https://healthicons.org/](https://healthicons.org/)) is a global volunteer effort to create common icons for many specialized medical scenarios available under creative commons license (CC0).

In a graphical abstract, all icons should have a similar overall appearance, meaning the same line-width, color scheme, and level of detail. Icons from the same source and/or the same designer usually have such a similar look. [Fig 2A and 2B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g002) shows 2 versions of a graphical abstract with a poor and improved icon combination. If icons from several sources are combined, you could match their style by adapting the SVG-pictograms in graphic software.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g002)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g002)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g002)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g002)

Fig 2.

(A) All pictograms used have similar overall appearance (color, size, design, modified from [[11](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref011)]). (B) Poor combination of pictogram for the same workflow: pictograms have different overall appearance. Icons in A: Fontawesome, Fonticons, Inc. Icons in B: Microscope: Bioicons DBCLS [https://togotv.dbcls.jp/en/pics.html](https://togotv.dbcls.jp/en/pics.html) is licensed under CC-BY 4.0; Laptop: Icon by Simon Dürr [https://twitter.com/simonduerr](https://twitter.com/simonduerr) is licensed under CC0 [https://creativecommons.org/publicdomain/zero/1.0/](https://creativecommons.org/publicdomain/zero/1.0/); Image/slider: see A; Colors and people: drawn by HKJ; Newspaper: [https://www.svgrepo.com/svg/301104/newspaper-news](https://www.svgrepo.com/svg/301104/newspaper-news), CC0.

[https://doi.org/10.1371/journal.pcbi.1011789.g002](https://doi.org/10.1371/journal.pcbi.1011789.g002)

For inspiration, you may wish to explore one of the earliest icon libraries, the ISOTYPE. The ISOTYPE system was developed by Otto Neurath in the 1920ies in Vienna as a visual communication tool for low-literate populations. The designs are from Gerd Arntz and were later continued by Marie Neurath ([http://gerdarntz.org/isotype.html](http://gerdarntz.org/isotype.html)).

## Rule 3: Data and charts as key visual

At times pictograms cannot sufficiently represent a key message. You then may wish to include data or charts in your graphical abstracts. When your data are medical, microscopy, or photo images they may be self-explanatory in graphical abstracts. When you want to instead include data plots, you should aim for chart types that are understandable even in the short view time of graphical abstracts. Most of us are familiar with bar charts, which are the most common chart type in scientific publications [[12](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref012),[13](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref013)], and with pie and line charts, plot types we usually learn in school ([Fig 3](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g003)). These charts employ core principles of visual perception: in bar charts we almost intuitively compare lengths, in pie charts the slice areas, and in line charts we look for up- or downward trends [[14](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref014)].

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g003)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g003)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g003)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g003)

Fig 3.  Common chart types with few data categories/points each that convey high level information.

Note that the core message (increases, is most, one third…) is communicated without axis details, labels, and legends.

[https://doi.org/10.1371/journal.pcbi.1011789.g003](https://doi.org/10.1371/journal.pcbi.1011789.g003)

When it is necessary to signify the use of a specific method in graphical abstracts, sometimes method-specific charts are employed as visual placeholders. For example, t-SNE plots may represent single-cell data, red/green heatmaps can denote microarray data, and circoid plots are indicative of genomic approaches. However, it’s important to note that readers of your graphical abstract are unlikely to delve into the details in these advanced graphics. In such instances, a simple version of that charts should be used, featuring only a handful of data points or categories. Details like tick marks, axis label, and legends can be omitted. For a comprehensive understanding of different chart types and their appropriate use a valuable resources is the Data Visualization Catalogue ([https://datavizcatalogue.com/](https://datavizcatalogue.com/)).

## Rule 4: Layout: The dimensions

Layout describes the organization of visual elements on the page ([Fig 4](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g004)). First, consider the space that you have available to fill. A graphical abstract for a journal website is typically shown as a square and rarely in rectangle format ([Fig 4A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g004)). On many websites and applications, the graphical abstract has a final size not much larger than a postage stamp. When a graphical abstract is the first figure of an article, poster, or grant application, you may also opt for a landscape rectangle format. Whenever choosing a layout, you should consider how to fill the area best. In grant applications space is very limited, filling the entire width of a line may then be a best choice to not waste precious space ([Fig 4B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g004)).

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g004)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g004)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g004)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g004)

Fig 4.

Different dimensions (A) and how they merge with text on a page (B).

[https://doi.org/10.1371/journal.pcbi.1011789.g004](https://doi.org/10.1371/journal.pcbi.1011789.g004)

## Rule 5: Layout: Reading direction

The layout should provide a clear entry point into your graphical abstract. Typically, we read from left to right, and top to bottom in either columns or rows. You should therefore arrange all elements of the graphical abstract along your chosen reading direction [[15](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref015)].

For depiction of linear processes that have a clear beginning and end, an organization from left to right is most suitable: time is usually shown as the independent variable on the x-axis in graphs. Linear processes are workflows, experimental pipelines, embryonic development, cellular differentiation, or disease progression. Alternatively, you can consider a circular layout for cyclic events such as daily or annual events, metabolic cycles, or processes like cell division. For static observations, e.g., contrasting 2 scenarios or providing 2 levels of details for 1 scenario, you could consider 2 parallel or nested organization [[2](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref002)]. [Fig 5](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g005) summarizes the most common organizational layouts of graphical abstracts.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g005)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g005)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g005)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g005)

Fig 5.  Different layouts for graphical abstracts with clear start and end.

[https://doi.org/10.1371/journal.pcbi.1011789.g005](https://doi.org/10.1371/journal.pcbi.1011789.g005)

## Rule 6: Connecting the elements: Arrows and arrangement

Arrows are a key element for all explanatory graphs and visual abstracts. With arrows, we connect text, pictograms, images, and charts into a sequential narrative or “storyline” and consequently they are the most common graphical element in explanatory life science figures [[16](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref016)]. Arrows can reinforce your chosen reading direction but arrows can also signal any exception from this reading direction. A clear layout supported by arrows helps to quickly orient your audiences in a visualization.

In graphical abstracts, arrows have several distinct appearances and also distinct functions. Arrows also include arrowheads, lines with rounded tips or other end-marks ([Fig 6A](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g006)), and lines without any marks [[17](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref017)]. Remarkably, a single arrow type may convey distinct semantic meanings: an upward arrow may signify an upward movement, an increase, or a positive connotation, while a circular arrow can symbolize various temporal scales, from a day, to year, or an entire life cycle [[17](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref017)]. In many academic domains, arrows have also specialized applications, such as a corner/bent arrow that in molecular genetics illustrates transcription start sites [[16](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref016)]. Arrows can also depict various movements, representing phenomena like the passage of a molecule through a membrane, the migration of cells within a tissue, or the collective herd movement of animals. And finally, arrows and lines are also commonly used for labeling and directing attention to specific structures or regions of interest.

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g006)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g006)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g006)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g006)

Fig 6.

Common arrow types (A) and arrows in context (B).

[https://doi.org/10.1371/journal.pcbi.1011789.g006](https://doi.org/10.1371/journal.pcbi.1011789.g006)

It is crucial that you clearly communicate the purpose of your arrows to your audience. When combining 2 different arrow types in a single graphical abstract, you should ensure they are visually distinct and explained. Moreover, the context in which an arrow is presented has substantial influence on how it’s perceived ([Fig 6B](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g006)).

Even with a clear layout and arrows, graphical abstracts can appear overwhelming. This feeling is rooted in the limitations of our visual system. Miller postulated the “Magical number 7,” suggesting that human sensory perception can effectively process only about 7 elements (plus or minus 2) at a time [[18](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref018)]. Of course, graphical abstracts typically comprise more than 7 elements. To address this challenge, design principles, often referred to as “Gestalt principles,” come into play, aiding in the organization of elements into interconnected units, or “chunks,” which enhances the information conveyed and reduces cognitive load [[19](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref019)].

Some of the design principles are especially helpful for graphical abstract design. “Proximity” suggests that elements can be grouped by minimizing their physical distance on the page. “Similarity” describes that elements form groups when they share common visual attributes. Such visual attributes, e.g., a shared color, pattern, or shape [[20](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref020)], may even lead to grouping when elements are not in close physical proximity. Grouping by similar appearance is helpful, e.g., in scatterplots, but can cause confusion if applied erroneously to non-grouped elements (see #8). “Closure” stipulates that elements within the same boundary are grouped, which explains the frequent use of boxes in design templates. However, it’s worth noting that boxes can often be replaced with white space to achieve a similar effect. The principle of “continuity” asserts that elements arranged along an invisible axis visually form a group, an idea that inspired Tufte to experiment with omitting x-axes in bar plots altogether [[21](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref021)]. And last, “similarity” suggests that elements arranged symmetrically appear grouped. These design principles are helpful for graphical abstracts but also valuable for improving your further designs such as scientific figures, as exemplified by Bang Wong [[22](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref022),[23](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref023)].

## Rule 7: Text

The most effective way to ensure audiences comprehend complex insights with graphical abstracts is by seamlessly integrating text and visuals [[24](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref024),[25](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref025)]. To captivate your audience, consider incorporating well-known keywords and phrases [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref007)]. Text can also serve as a substitution when suitable images or pictograms are unavailable, particularly for specialized names or terminology, e.g., “acetylcholine.” Text is also important for labeling ambiguous or unusual visuals, icons, or arrows. For example, a circle you use could represent a molecule, an area, or a cell. While text offers additional clarifications, be sure to keep your titles and annotations concise, devoid of jargon, and limited to common abbreviations, all of which in general enhance readability and citations of scientific articles in general [[26](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref026)]. Lastly, text can play a dual role as a legend when the annotation mirrors the encoding style of associated visual elements. You may color a key word in the title in the same hue as the associated data in the abstract (see [Fig 3](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g003)).

## Rule 8: Colors

A key function of appealing colors in graphical abstracts is to engage your audience. Beyond that colors have further roles, color highlights, contrasts, encodes quantities, or represents the natural appearance of the depicted objects ([Fig 7A–7C](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g007)). When colors encode quantitative information, sequential or continuous data should be encoded with varying saturations of a single color, diverging data with e.g., two-color scheme, and for qualitative data you may vary the hue [[27](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref027),[28](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref028)].

[![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1011789.g007)](https://journals.plos.org/ploscompbiol/article/figure/image?size=medium&id=10.1371/journal.pcbi.1011789.g007)

Download: 

- [PNG

   larger image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=large&id=10.1371/journal.pcbi.1011789.g007)
- [TIFF

   original image](https://journals.plos.org/ploscompbiol/article/figure/image?download&size=original&id=10.1371/journal.pcbi.1011789.g007)

Fig 7.

Color can highlight (A), encode numbers (B), or show natural appearance (C) in graphical abstracts. Be careful with your color choice when using a colored background. Image: Albrecht Dürer, Public domain, via Wikimedia Commons ([https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Hare,_1502_-_Google_Art_Project.jpg](https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Hare,_1502_-_Google_Art_Project.jpg)).

[https://doi.org/10.1371/journal.pcbi.1011789.g007](https://doi.org/10.1371/journal.pcbi.1011789.g007)

Several tools are available that may be helpful when selecting your color schemes. Colorbrewer by Cynthia Brewer ([https://colorbrewer2.org/](https://colorbrewer2.org/)) is useful for choosing colors to encode numerical data, while Paletton ([https://paletton.com/](https://paletton.com/)) enables the selection of attractive color combinations using a color wheel. These tools can assist in achieving harmonious appearances through adjacent colors or creating striking contrasts by employing complementary colors.

Consistency in color usage is important (see #6, principle of similarity). It is vital that you maintain the same color code and scheme within the abstract, and between the abstract and the main manuscript. A change in color is not merely a shift in aesthetics, it signifies a change in meaning. Colors, being instantly perceptible, should be used sparingly to prevent overwhelming the audiences and diverting their attention from the primary message. Hence, make your color choices with utmost care.

When selecting colors, you should ensure that they are accessible to your color blind audiences [[29](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref029)]. But more generally, you should consider possible limitations to visually impaired audiences. A comprehensive study provides an overview of accessibility in visualizations for different target groups (i.e., color-blind, visually impaired, and blind individuals) and various visual tasks [[30](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref030)]. A few steps help to improve accessibility: all figures, including graphical abstracts, must always be described with accompanying text. You may also be able to provide Alt-text descriptions for screen reader software. Additionally, also visually able audiences differ in their perception of color and contrast and therefore color should be avoided as the sole channel for key information (see also #7, labeling visuals). Beyond avoiding certain color combinations, like red-green for individuals with Deuteranopia, also low-contrast color combinations and many background colors may reduce visibility and thus accessibility. You can use numerous web-based tools (e.g., [https://www.color-blindness.com/coblis-color-blindness-simulator/](https://www.color-blindness.com/coblis-color-blindness-simulator/)) or render your monitor display settings to assess legibility. WebAIM suggests a minimum contrast ratio of 4.5 to 1 for foreground and background colors and provides a tool for assessing color combinations ([https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)). Finally, maintaining a sufficiently high resolution is vital for ensuring accessibility, allowing your audiences to print or zoom in to your visualizations as needed.

## Rule 9: Tools for graphical abstracts

Graphical abstracts are typically prepared with the same software as posters and figures. Suitable are commercial (e.g., Adobe Illustrator, CorelDraw, Affinity Designer) or open-source (e.g., Inkscape) vector-design software. Vector-based graphics programs are particularly useful as they allow for zooming in and out of visualizations without quality loss. For most graphical abstracts PowerPoint will also produce sufficient results, especially when the canvas size is adjusted and slides are exported as vector graphics such as PDF. When saving your graphical abstract make sure that your images are not compressed to prevent pixelation artifacts.

A comprehensive article reviews many common software used for illustrations as well as their advantages, disadvantages and pricing is available [[31](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref031)]. If you wish to use the free vector graphic software Inkscape, you may consult a practical guide for biologists [[32](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref032)]. Inkscape is rapidly developing and now allows direct import of icons from icon libraries, as well as processing of images and data with scripts inside the software. The proprietary alternative to Inkscape is Adobe Illustrator, which is widely adopted by scientists and for which tutorials are available [[33](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref033)]. Another commercial software is CorelDraw which can, like Inkscape, incorporate icons from many web-based icon libraries.

In recent years, several web-based drawing softwares have become available, such as Canva or Figma. BioRender is a proprietary web-based software powered by a large biomedical icon library, which is an attractive feature to its users; however, their appearance, shape, color, and detail cannot be changed. A drawback to many labs is also BioRender’s continuous adaptation of licenses, while an advantage is its interface with public databases, such as the Protein Data Bank. Another web-based tool is Mindthegraph, which also offers in addition design consulting. A summary of tools is available [[7](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref007)].

Pictograms and icons can be imported in all programs, including the web-based tools, as SVG or PNG (see #2) and Inkscape even allows the direct, web-based import from icon libraries such as Bioicons or Reactome.

## Rule 10: Before, during, after: Feedback

Visual design is a dynamic and iterative process. Consequently, graphical abstracts should undergo several rounds of assessment and adjustment to avoid common pitfalls such as unclear reading directions [[2](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref002)] and inconsistencies in elements and style within the visualization.

Feedback can be actively sought and integrated at various stages: during the formulating of your key message, the drafting of your prototype, or the final polishing phase. As a best practice, the book Storytelling With Data in fact recommends allocating dedicated time for discussing the visualizations in every meeting [[34](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref034)]. As in every design of a human–computer interaction, also for graphical abstracts you may seek expert feedback, e.g., from a scientists or designers that regularly prepare graphical abstracts, as well as user feedback, e.g., from scientists or students who may read your paper.

General feedback principles [[35](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref035)] also apply to visual work. This means that feedback should be specific, tangible, and task-oriented and those seeking feedback should be clear in their request. In graphical abstracts, the audience must decode the visual representations. You can get feedback by observing how an expert or user is interacting with your graphical abstract, or by asking for their opinions. Ask what they see at first glance to see if the visual weight aligns with the key message. Ask about clarity of the layout and reading direction, including the meaning of arrows, and the comprehensibility of visual elements and colors. Alli Torban from Tableau, a visual design company, imparts additional guidance on the intricacies of soliciting and receiving feedback for visual designs [[36](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref036)].

When designing graphical abstracts in a team, we usually exchange rapid drafts or sketches of the graphical abstract several times before a solid idea emerges ([Fig 1](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi-1011789-g001)) and is then prepared for publication [[37](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref037)]. In our experience, the process of preparing a graphical abstract also serves as a valuable exercise to assess whether our key message is succinct. It also aids writing teams and grant writers in aligning toward a shared vision or objective. The graphical abstract thus serves as a valuable tool for bridging communication or knowledge gaps in transdisciplinary teams such as consortia of clinicians, engineers, and biologists.

## Conclusion

While initially graphical abstracts may seem like extra work for little reward, we hope that our 10 rules encourage you to start creating understandable and gorgeous graphical abstracts. A useful resource for educators wishing to teach graphical abstract preparation in a classroom setting is available from Agrawal and Ulrich, who provide templates for exercises and downloadable sample materials [[9](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref009)]. A quick guide, along with a PowerPoint template, is also available from Elsevier [[38](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref038)]. And for inspiration the British Medical Journal hosts a collection of infographics ([https://www.bmj.com/infographics](https://www.bmj.com/infographics)). Once you become familiar with the format of graphical abstracts, you may also wish to experiment with styles and forms. Usually, journals do not limit their authors: we have seen artistic, comic-style [[39](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789#pcbi.1011789.ref039)], and even hand-drawn (Fabio di Belvis: [https://www.sciencedirect.com/science/article/pii/S0378517319307975?via%3Dihub](https://www.sciencedirect.com/science/article/pii/S0378517319307975?via%3Dihub)) graphical abstracts.

## Acknowledgments

HKJ would like to acknowledge James P. Saenz for feedback on the draft version.

## References

1. 1. Lane S, Karatsolis A, Bui L. Graphical abstracts: a taxonomy and critique of an emerging genre. In: Proceedings of the 33rd Annual International Conference on the Design of Communication [Internet]. New York, NY, USA: Association for Computing Machinery; 2015 [cited 2023 Jun 4]. p. 1–9. (SIGDOC ‘15). [https://doi.org/10.1145/2775441.2775465](https://doi.org/10.1145/2775441.2775465)
2. 2. Hullman J, Bach B. Picturing Science: Design Patterns in Graphical Abstracts. In: Chapman P, Stapleton G, Moktefi A, Perez-Kriz S, Bellucci F, editors. Diagrammatic Representation and Inference. Cham: Springer International Publishing; 2018. p. 183–200. (Lecture Notes in Computer Science).
3. 3. Bredbenner K, Simon SM. Video abstracts and plain language summaries are more effective than graphical abstracts and published abstracts. PLoS ONE. 2019 Nov 19;14(11):e0224697. pmid:31743342 
   
   - [View Article](https://doi.org/10.1371/journal.pone.0224697)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/31743342)
   - [Google Scholar](http://scholar.google.com/scholar?q=Video+abstracts+and+plain+language+summaries+are+more+effective+than+graphical+abstracts+and+published+abstracts.+Bredbenner+2019)
4. 4. Cell Press Graphical Abstract Guidelines. Cell Press [Internet]. Available from: [https://www.cell.com/pb/assets/raw/shared/figureguidelines/GA_guide-1537202744020.pdf](https://www.cell.com/pb/assets/raw/shared/figureguidelines/GA_guide-1537202744020.pdf).
5. 5. Zong Q, Huang Z, Deng Z. Do graphical abstracts on a publisher’s official website have an effect on articles’ usage and citations? A propensity score matching analysis. Learn Publ. 2023;36 (2):266–274. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Do+graphical+abstracts+on+a+publisher%E2%80%99s+official+website+have+an+effect+on+articles%E2%80%99+usage+and+citations%3F+A+propensity+score+matching+analysis+Zong+2023)
6. 6. Bennett H, Slattery F. Graphical abstracts are associated with greater Altmetric attention scores, but not citations, in sport science. Scientometrics. 2023 Jun 1;128(6):3793–804. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Graphical+abstracts+are+associated+with+greater+Altmetric+attention+scores%2C+but+not+citations%2C+in+sport+science+Bennett+2023)
7. 7. Martin K. A picture is worth a thousand words. Med Writ. 2020 Mar 1;29:28–34. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=A+picture+is+worth+a+thousand+words+Martin+2020)
8. 8. Wong B. Points of view: The overview figure. Nat Methods. 2011 May 1;8(5):365–365. pmid:21678616 
   
   - [View Article](https://doi.org/10.1038/nmeth0511-365)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/21678616)
   - [Google Scholar](http://scholar.google.com/scholar?q=Points+of+view%3A+The+overview+figure+Wong+2011)
9. 9. Agrawal S, Ulrich P. A Picture is Worth 1000 Words: Teaching Science Communication with Graphical Abstract Assignments. J Microbiol Biol Educ. 2023 Mar 15;24(1):e00208–22. pmid:37089241 
   
   - [View Article](https://doi.org/10.1128/jmbe.00208-22)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/37089241)
   - [Google Scholar](http://scholar.google.com/scholar?q=A+Picture+is+Worth+1000+Words%3A+Teaching+Science+Communication+with+Graphical+Abstract+Assignments+Agrawal+2023)
10. 10. Jambor HK. Insights on poster preparation practices in life sciences. Front Bioinforma. 2023;3:1216139. pmid:38025399 
   
   - [View Article](https://doi.org/10.3389/fbinf.2023.1216139)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/38025399)
   - [Google Scholar](http://scholar.google.com/scholar?q=Insights+on+poster+preparation+practices+in+life+sciences+Jambor+2023)
11. 11. Schmied C, Jambor HK. Effective image visualization for publications—a workflow using open access tools and concepts. F1000Res. 2020;9:1373. pmid:33708381 
   
   - [View Article](https://doi.org/10.12688/f1000research.27140.2)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/33708381)
   - [Google Scholar](http://scholar.google.com/scholar?q=Effective+image+visualization+for+publications%E2%80%94a+workflow+using+open+access+tools+and+concepts.+Schmied+2020)
12. 12. Ariga K, Tashiro M. Change in the graphics of journal articles in the life sciences field: analysis of figures and tables in the journal “Cell.” Hist Philos Life Sci. 2022 Aug 2;44(3):33. pmid:35918565 
   
   - [View Article](https://doi.org/10.1007/s40656-022-00516-9)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/35918565)
   - [Google Scholar](http://scholar.google.com/scholar?q=Change+in+the+graphics+of+journal+articles+in+the+life+sciences+field%3A+analysis+of+figures+and+tables+in+the+journal+%E2%80%9CCell+Ariga+2022)
13. 13. Weissgerber TL, Milic NM, Winham SJ, Garovic VD. Beyond bar and line graphs: time for a new data presentation paradigm. PLoS Biol. 2015 Apr;13(4):e1002128. pmid:25901488 
   
   - [View Article](https://doi.org/10.1371/journal.pbio.1002128)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/25901488)
   - [Google Scholar](http://scholar.google.com/scholar?q=Beyond+bar+and+line+graphs%3A+time+for+a+new+data+presentation+paradigm+Weissgerber+2015)
14. 14. Cairo A. Truthful Art, The: Data, Charts, and Maps for Communication. New Riders; 2012. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Truthful+Art%2C+The%3A+Data%2C+Charts%2C+and+Maps+for+Communication.+Cairo+2012)
15. 15. Wong B. Layout. Nat Methods. 2011 Jan 1;8(10):783. pmid:22053339 
   
   - [View Article](https://doi.org/10.1038/nmeth.1711)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/22053339)
   - [Google Scholar](http://scholar.google.com/scholar?q=Layout+Wong+2011)
16. 16. Wong B. Arrows. Nat Methods. 2011 Sep 1;8(9):701–701. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Arrows+Wong+2011)
17. 17. Tversky B, Zacks J, Lee P, Heiser J. Lines, Blobs, Crosses and Arrows: Diagrammatic Communication with Schematic Figures. In 2000. p. 221–30. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Lines%2C+Blobs%2C+Crosses+and+Arrows%3A+Diagrammatic+Communication+with+Schematic+Figures+Tversky+2000)
18. 18. Miller GA. The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychol Rev. 1956;63(2):81–97. pmid:13310704 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/13310704)
   - [Google Scholar](http://scholar.google.com/scholar?q=The+magical+number+seven%2C+plus+or+minus+two%3A+Some+limits+on+our+capacity+for+processing+information+Miller+1956)
19. 19. Patterson RE, Blaha LM, Grinstein GG, Liggett KK, Kaveney DE, Sheldon KC, et al. A human cognition framework for information visualization. Comput Graph. 2014 Aug 1;42:42–58. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=A+human+cognition+framework+for+information+visualization.+Patterson+2014)
20. 20. Bertin J. Sémiologie graphique | Le Comptoir Des Presses d’Universités [Internet]. 1967 [cited 2023 Oct 23]. Available from: [https://www.lcdpu.fr/livre/?GCOI=27000100651580](https://www.lcdpu.fr/livre/?GCOI=27000100651580). 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=S%C3%A9miologie+graphique+%7C+Le+Comptoir+Des+Presses+d%E2%80%99Universit%C3%A9s+%5BInternet%5D.+Bertin+1967)
21. 21. Tufte ER. The Visual Display of Quantitative Information [Internet]. Cheshire, Connecticut: Graphics Press; 2011 [cited 2023 Oct 23]. Available from: [https://www.edwardtufte.com/tufte/books_vdqi?msclkid=d049a142816d107459dec4741f4dfaa5](https://www.edwardtufte.com/tufte/books_vdqi?msclkid=d049a142816d107459dec4741f4dfaa5).
22. 22. Wong B. Points of view: Points of review (part 2). Nat Methods. 2011 Mar 1;8(3):189–189. pmid:21473014 
   
   - [View Article](https://doi.org/10.1038/nmeth0311-189)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/21473014)
   - [Google Scholar](http://scholar.google.com/scholar?q=Points+of+view%3A+Points+of+review+%28part+2%29.+Wong+2011)
23. 23. Wong B. Points of view: gestalt principles (part 1). Nat Methods. 2010 Nov 1;7(11):863. pmid:21049588 
   
   - [View Article](https://doi.org/10.1038/nmeth1110-863)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/21049588)
   - [Google Scholar](http://scholar.google.com/scholar?q=Points+of+view%3A+gestalt+principles+%28part+1%29.+Wong+2010)
24. 24. Canham M, Hegarty M. Effects of knowledge and display design on comprehension of complex graphics. Learn Instr. 2010 Apr 1;20(2):155–66. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Effects+of+knowledge+and+display+design+on+comprehension+of+complex+graphics+Canham+2010)
25. 25. Hegarty M, Just MA. Constructing mental models of machines from text and diagrams. J Mem Lang. 1993;32:717–742. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Constructing+mental+models+of+machines+from+text+and+diagrams.+Hegarty+1993)
26. 26. Letchford A, Moat HS, Preis T. The advantage of short paper titles. R Soc Open Sci. 2015 Aug;2(8):150266. pmid:26361556 
   
   - [View Article](https://doi.org/10.1098/rsos.150266)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/26361556)
   - [Google Scholar](http://scholar.google.com/scholar?q=The+advantage+of+short+paper+titles+Letchford+2015)
27. 27. Szafir DA. Modeling Color Difference for Visualization Design. IEEE Trans Vis Comput Graph. 2018 Jan;24(1):392–401. pmid:28866544 
   
   - [View Article](https://doi.org/10.1109/TVCG.2017.2744359)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/28866544)
   - [Google Scholar](http://scholar.google.com/scholar?q=Modeling+Color+Difference+for+Visualization+Design+Szafir+2018)
28. 28. Wong B. Color coding. Nat Methods. 2010 Aug 1;7(8):573–573. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Color+coding.+Wong+2010)
29. 29. Jambor H, Antonietti A, Alicea B, Audisio TL, Auer S, Bhardwaj V, et al. Creating clear and informative image-based figures for scientific publications. PLoS Biol. 2021 Mar;19(3):e3001161. pmid:33788834 
   
   - [View Article](https://doi.org/10.1371/journal.pbio.3001161)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/33788834)
   - [Google Scholar](http://scholar.google.com/scholar?q=Creating+clear+and+informative+image-based+figures+for+scientific+publications+Jambor+2021)
30. 30. Kim NW, Joyner SC, Riegelhuth A, Kim Y. Accessible Visualization: Design Space, Opportunities, and Challenges. Comput Graph Forum. 2021;40(3):173–188. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Accessible+Visualization%3A+Design+Space%2C+Opportunities%2C+and+Challenges.+Kim+2021)
31. 31. Perkel JM. The software that powers scientific illustration. Nature. 2020 Jun;582(7810):137–8. pmid:32385367 
   
   - [View Article](https://doi.org/10.1038/d41586-020-01404-7)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/32385367)
   - [Google Scholar](http://scholar.google.com/scholar?q=The+software+that+powers+scientific+illustration+Perkel+2020)
32. 32. Cvrčková F. From Data to Illustrations: Common (Free) Tools for Proper Image Data Handling and Processing. Methods Mol Biol Clifton NJ. 2019;1992:121–133. pmid:31148035 
   
   - [View Article](https://doi.org/10.1007/978-1-4939-9469-4_8)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/31148035)
   - [Google Scholar](http://scholar.google.com/scholar?q=From+Data+to+Illustrations%3A+Common+%28Free%29+Tools+for+Proper+Image+Data+Handling+and+Processing.+Cvr%C4%8Dkov%C3%A1+2019)
33. 33. Culley J. Creating a digital medical illustration. J Vis Commun Med. 2016;39(1–2):77–84. pmid:27243925 
   
   - [View Article](https://doi.org/10.1080/17453054.2016.1182424)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/27243925)
   - [Google Scholar](http://scholar.google.com/scholar?q=Creating+a+digital+medical+illustration+Culley+2016)
34. 34. Nussbaumer Knaflic C. Storytelling with Data: A Data Visualization Guide for Business Professionals. Wiley; 2015.
35. 35. Hattie J, Timperley H. The Power of Feedback. Rev Educ Res. 2007 Mar 1;77(1):81–112. 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=The+Power+of+Feedback.+Hattie+2007)
36. 36. Torban A. Critiquing data visualizations: A discussion on channeling empathy and productivity [Internet]. 2019 [cited 2023 Oct 23]. Available from: [https://www.tableau.com/blog/critiquing-data-visualizations-channel-empathy-and-be-productive](https://www.tableau.com/blog/critiquing-data-visualizations-channel-empathy-and-be-productive). 
   
   - [View Article](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)
   - [Google Scholar](http://scholar.google.com/scholar?q=Critiquing+data+visualizations%3A+A+discussion+on+channeling+empathy+and+productivity+%5BInternet%5D.+Torban+2019)
37. 37. Bornhäuser M. T cells reloaded after allogeneic HCT. Blood. 2023 Apr 6;141(14):1652–3. pmid:37022734 
   
   - [View Article](https://doi.org/10.1182/blood.2022019106)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/37022734)
   - [Google Scholar](http://scholar.google.com/scholar?q=T+cells+reloaded+after+allogeneic+HCT+Bornh%C3%A4user+2023)
38. 38. Graphical Abstract Template [Internet]. Available from: [https://www.elsevier.com/journals/cellular-and-molecular-gastroenterology-and-hepatology/2352-345x/graphical-abstracts](https://www.elsevier.com/journals/cellular-and-molecular-gastroenterology-and-hepatology/2352-345x/graphical-abstracts).
39. 39. Wang Z, Ritchie J, Zhou J, Chevalier F, Bach B. Data Comics for Reporting Controlled User Studies in Human-Computer Interaction. IEEE Trans Vis Comput Graph. 2021 Feb;27(2):967–77. pmid:33048732 
   
   - [View Article](https://doi.org/10.1109/TVCG.2020.3030433)
   - [PubMed/NCBI](http://www.ncbi.nlm.nih.gov/pubmed/33048732)
   - [Google Scholar](http://scholar.google.com/scholar?q=Data+Comics+for+Reporting+Controlled+User+Studies+in+Human-Computer+Interaction+Wang+2021)
