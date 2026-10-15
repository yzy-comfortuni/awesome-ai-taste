# 资源目录

[返回首页](README.md)。按任务查阅；每项包含用途、具体规则和原文出处。先读[使用边界](USAGE.md)与[已知勘误](ERRATA.md)；逐项输入输出和环境见首页分类页，[练习集中在这里](examples/README.md)。

[界面设计](#界面设计) · [文字表达](#文字表达) · [专利写作](#专利写作) · [学术论文](#学术论文) · [小说写作](#小说写作) · [诗歌写作](#诗歌写作) · [剧本写作](#剧本写作) · [图表与图解](#图表与图解) · [动画与视频](#动画与视频) · [演示文稿](#演示文稿)

## 界面设计

- [UI Skills](https://github.com/ibelick/ui-skills) — 产品界面的排版、间距、配色与交互规则。[手册](https://www.ui-skills.com/playbook) · [React / Tailwind 技能](https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/ibelick/ui-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/ibelick/ui-skills/stargazers) · [副本](vendor/ibelick/ui-skills)<!-- /source-meta -->

  **规则：** 空状态要给出一个明确的下一步操作，不只显示“暂无数据”。[出处](https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md)

- [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — Anthropic 的前端设计指南，从主题与受众确定视觉方向。[正文](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/anthropics/skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/anthropics/skills/stargazers) · [副本](vendor/anthropics/skills)<!-- /source-meta -->

  **规则：** 只有内容确有先后顺序时才加 01／02／03 编号，不把编号当装饰。[出处](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

- [Impeccable](https://github.com/pbakaus/impeccable) — 界面设计反例图鉴，拆解卡片堆叠、装饰过量和模板文案。[图鉴](https://impeccable.style/slop/) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/pbakaus/impeccable?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/pbakaus/impeccable/stargazers) · [副本](vendor/pbakaus/impeccable)<!-- /source-meta -->

  **规则：** 检查页面换成无关产品后是否仍能原样成立；若能，重新考虑构图和视觉语言与产品的关系。[出处](https://github.com/pbakaus/impeccable/blob/main/skill/reference/critique.md)

- [Taste Skill](https://github.com/Leonxlnx/taste-skill) — 落地页与作品集的设计技能，调整布局变化、动效强度和信息密度。[正文](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/Leonxlnx/taste-skill?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/Leonxlnx/taste-skill/stargazers) · [副本](vendor/leonxlnx/taste-skill)<!-- /source-meta -->

  **规则：** 设计落地页时，先按受众分别确定布局变化、动效强度与信息密度，不直接套默认风格。[出处](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)

- [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) — Vercel 的网页细节清单，涵盖键盘操作、焦点、表单反馈和视觉对齐。[规则](https://github.com/vercel-labs/web-interface-guidelines/blob/main/README.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/vercel-labs/web-interface-guidelines?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/vercel-labs/web-interface-guidelines/stargazers) · [副本](vendor/vercel-labs/web-interface-guidelines)<!-- /source-meta -->

  **规则：** 表单报错就贴着对应字段显示，提交失败后把焦点移到第一个错误处。[出处](https://github.com/vercel-labs/web-interface-guidelines/blob/main/README.md)

- [Interfaces](https://github.com/jakubkrehel/skills) — Jakub Krehel 的界面修整规则，处理圆角嵌套、光学对齐、字体层级与文本换行。[界面](https://github.com/jakubkrehel/skills/blob/main/skills/better-ui/SKILL.md) · [排版](https://github.com/jakubkrehel/skills/blob/main/skills/better-typography/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/jakubkrehel/skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/jakubkrehel/skills/stargazers) · [副本](vendor/jakubkrehel/skills)<!-- /source-meta -->

  **规则：** 圆角容器等距嵌套且内边距不超过 24 px 时，按“外圆角＝内圆角＋内边距＋边框宽度”对齐曲线。[出处](https://github.com/jakubkrehel/skills/blob/main/skills/better-ui/SKILL.md)

- [Emil Design Engineering](https://github.com/emilkowalski/skills) — 按使用频率选择动效，细化按钮、弹窗和抽屉的缓动、时长与反馈。[动效规则](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md#the-animation-decision-framework) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/emilkowalski/skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/emilkowalski/skills/stargazers) · [副本](vendor/emilkowalski/skills)<!-- /source-meta -->

  **规则：** 高频操作优先即时反馈，减少或取消反复出现的动效，把明显动效留给低频场景。[出处](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)

- [Visual Design Foundations](https://github.com/wshobson/agents/tree/main/plugins/ui-design/skills/visual-design-foundations) — 用设计变量统一字号、间距、颜色和图标尺寸；适合设计系统与既有界面，不负责品牌风格。[正文](https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/visual-design-foundations/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/wshobson/agents?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/wshobson/agents/stargazers) · [副本](vendor/wshobson/agents)<!-- /source-meta -->

  **规则：** 把字号、间距和状态颜色定义为可复用的设计变量，同类组件引用同一套值，不逐处随手取数。[出处](https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/visual-design-foundations/SKILL.md)

## 文字表达

- [Stop Slop](https://github.com/hardikpandya/stop-slop) — 英文写作短清单，处理空泛开场、冗余修饰和格言式收尾。[规则](https://github.com/hardikpandya/stop-slop/blob/main/SKILL.md#core-rules) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/hardikpandya/stop-slop?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/hardikpandya/stop-slop/stargazers) · [副本](vendor/hardikpandya/stop-slop)<!-- /source-meta -->

  **规则：** 遇到“影响深远”这类空泛判断，改写为具体影响；没有事实可补时就删去空话。[出处](https://github.com/hardikpandya/stop-slop/blob/main/SKILL.md)

- [Humanizer](https://github.com/blader/humanizer) — 英文稿件的句式、节奏与语气校订，附修改示例。[正文](https://github.com/blader/humanizer/blob/main/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/blader/humanizer?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/blader/humanizer/stargazers) · [副本](vendor/blader/humanizer)<!-- /source-meta -->

  **规则：** 删掉只重复上一段的格言式收尾；收尾短句若带来新事实或新后果，再予以保留。[出处](https://github.com/blader/humanizer/blob/main/SKILL.md)

- [Humanizer-zh](https://github.com/op7418/Humanizer-zh) — 中文文章与文档的编辑指南，删套话、理长句，保留原意和作者语气。[正文](https://github.com/op7418/Humanizer-zh/blob/main/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/op7418/Humanizer-zh?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/op7418/Humanizer-zh/stargazers) · [副本](vendor/op7418/humanizer-zh)<!-- /source-meta -->

  **规则：** 润色时保留“可能、仅、计划”等限定，不把相关改成因果，也不把尚未完成改成已经完成。[出处](https://github.com/op7418/Humanizer-zh/blob/main/SKILL.md)

- [中文技术文档写作规范](https://github.com/ruanyf/document-style-guide) — 中文技术文档的标题、文本、段落、数值与标点规范。[文本](https://github.com/ruanyf/document-style-guide/blob/master/docs/text.md) · [段落](https://github.com/ruanyf/document-style-guide/blob/master/docs/paragraph.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/ruanyf/document-style-guide?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/ruanyf/document-style-guide/stargazers) · [副本](vendor/ruanyf/document-style-guide)<!-- /source-meta -->

  **规则：** 一个段落只讲一个中心，把中心句放在段首，其余句子解释或支持它。[出处](https://github.com/ruanyf/document-style-guide/blob/master/docs/paragraph.md)

- [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines) — 中英文混排中的空格、标点、全半角与专有名词写法。[正文](https://github.com/sparanoid/chinese-copywriting-guidelines/blob/master/README.zh-Hans.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/sparanoid/chinese-copywriting-guidelines?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/sparanoid/chinese-copywriting-guidelines/stargazers) · [副本](vendor/sparanoid/chinese-copywriting-guidelines)<!-- /source-meta -->

  **规则：** 中文与英文单词之间加空格；“豆瓣FM”等官方固定名称保持原写法。[出处](https://github.com/sparanoid/chinese-copywriting-guidelines/blob/master/README.zh-Hans.md)

- [Google Developer Documentation Style Guide](https://developers.google.com/style/) — 英文技术文档的语气、操作步骤、链接与格式规范。[要点](https://developers.google.com/style/highlights) <!-- article-copy --> · [Markdown 正文](vendor/articles/google-style-highlights.md)<!-- /article-copy -->

  **规则：** 操作说明先写适用条件，再写动作，避免读者执行后才看到限制。[出处](https://developers.google.com/style/highlights)

- [Organizing Large Documents](https://developers.google.com/tech-writing/two/large-docs) — Google 的长技术文档组织课程，附提纲、导语和标题的修改练习；适合教程与概念说明，不是通用报告格式。[正文](https://developers.google.com/tech-writing/two/large-docs) <!-- article-copy --> · [Markdown 正文](vendor/articles/organizing-large-documents.md)<!-- /article-copy -->

  **规则：** 在长文档开头交代读者需要的前提、本文覆盖什么及不覆盖什么，再对照成稿检查是否兑现。[出处](https://developers.google.com/tech-writing/two/large-docs)

- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — 用简短记录说明架构选择的背景、决定、状态和后果；适合技术决策记录，不代替完整设计文档或验证报告。[正文](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) <!-- article-copy --> · [Markdown 正文](vendor/articles/documenting-architecture-decisions.md)<!-- /article-copy -->

  **规则：** 在决策记录的后果部分同时写收益、代价和新增约束，不只列支持所选方案的理由。[出处](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

- [README Checklist](https://github.com/ddbeck/readme-checklist) — Daniel D. Beck 的 README 检查表，帮助读者判断用途并完成首次使用；不是固定栏目模板，进阶文档不必挤进首页。[正文](https://github.com/ddbeck/readme-checklist/blob/main/checklist.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/ddbeck/readme-checklist?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/ddbeck/readme-checklist/stargazers) · [副本](vendor/ddbeck/readme-checklist)<!-- /source-meta -->

  **规则：** README 的上手说明写到读者能完成第一次使用就停，进阶用法移到专门文档。[出处](https://github.com/ddbeck/readme-checklist/blob/main/checklist.md)

- [Diátaxis](https://github.com/evildmp/diataxis-documentation-framework) — 按读者任务区分教程、操作指南、参考与解释；这里选读操作指南章节，适合技术产品文档，不是统一文风模板。[正文](https://github.com/evildmp/diataxis-documentation-framework/blob/main/source/how-to-guides.rst) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/evildmp/diataxis-documentation-framework?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/evildmp/diataxis-documentation-framework/stargazers) · [副本](vendor/evildmp/diataxis-documentation-framework)<!-- /source-meta -->

  **规则：** 面向熟练用户的操作指南只保留完成目标所需的动作；原理说明和完整参数另页链接，不夹进步骤。[出处](https://github.com/evildmp/diataxis-documentation-framework/blob/main/source/how-to-guides.rst)

## 专利写作

- [WIPO Patent Drafting Manual](https://www.wipo.int/publications/en/details.jsp?id=4706) — 世界知识产权组织的专利撰写手册，用实例讲权利要求层次、术语、说明书支持与附图；适合跨法域起草训练，具体申请仍须核对目标专利局现行规则。[说明书支持（第六单元第 10 节）](https://www.wipo.int/edocs/pubdocs/zh/wipo-pub-867-23-zh-wipo-patent-drafting-manual.pdf#page=108) <!-- article-copy --> · [Markdown 阅读索引](vendor/articles/wipo-patent-drafting-manual.md)<!-- /article-copy -->

  **规则：** 起草时逐项检查权利要求的概括范围是否有说明书依据，不把单个实施例扩写成未经支持的全部情形。[出处](https://www.wipo.int/edocs/pubdocs/zh/wipo-pub-867-23-zh-wipo-patent-drafting-manual.pdf#page=108)

- [EPO Guidelines F-IV, 3.4 — Independent and Dependent Claims](https://www.epo.org/en/legal/guidelines-epc/2026/f_iv_3_4.html) — 欧洲专利局 2026 年审查指南中的独立与从属权利要求；适用 EPC 审查，不构成其他法域的法律意见或授权保证。[正文](https://www.epo.org/en/legal/guidelines-epc/2026/f_iv_3_4.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/epo-dependent-claims.md)<!-- /article-copy -->

  **规则：** 把从属权利要求的引用链展开，确认它保留被引用权利要求的全部特征，再加入进一步限定。[出处](https://www.epo.org/en/legal/guidelines-epc/2026/f_iv_3_4.html)

- [MPEP 2173.05(e) — Lack of Antecedent Basis](https://www.uspto.gov/web/offices/pac/mpep/s2173.html) — 美国 MPEP 2173.05(e) 的术语指代审查，节内标为 R-01.2024；缺少显式先行词不当然等于不清楚。[正文](https://www.uspto.gov/web/offices/pac/mpep/s2173.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/uspto-antecedent-basis.md)<!-- /article-copy -->

  **规则：** 逐个核对“该／所述”的指代；前文有两个同名部件时，把后续指称写到能唯一确定对象。[出处](https://www.uspto.gov/web/offices/pac/mpep/s2173.html)

- [中国专利.skill — 申请文件对照](https://github.com/handsomestWei/patent-disclosure-skill) — 中国发明／实用新型申请稿的权利要求、说明书与附图对照；仅选读起草检查，不代替专业审查。[正文](https://github.com/handsomestWei/patent-disclosure-skill/blob/main/skills/patent-application/prompts/consistency.md) · [专利法（2020 修正）](https://www.cnipa.gov.cn/art/2020/11/23/art_97_155167.html) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/handsomestWei/patent-disclosure-skill?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/handsomestWei/patent-disclosure-skill/stargazers) · [副本](vendor/handsomestwei/patent-disclosure-skill)<!-- /source-meta -->

  **规则：** 给每项权利要求列出对应的说明书内容、实施方式和必要附图；对不上时先修文稿，不把脚本通过当作充分公开。[出处](https://github.com/handsomestWei/patent-disclosure-skill/blob/main/skills/patent-application/prompts/consistency.md)

- [CN Patent Disclosure — 技术方案展开](https://github.com/cycloneha/cn-patent-disclosure-writing-skill) — 中文技术交底书的步骤、公式与实施例表达；用于中国发明专利起草，须按现行指南复核，不保证授权。[正文](https://github.com/cycloneha/cn-patent-disclosure-writing-skill/blob/main/skills/cn-patent-disclosure-docx/references/03-technical-solution.md) · [2026 施行修订说明](https://www.cnipa.gov.cn/art/2025/11/13/art_66_202561.html) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/cycloneha/cn-patent-disclosure-writing-skill?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/cycloneha/cn-patent-disclosure-writing-skill/stargazers) · [副本](vendor/cycloneha/cn-patent-disclosure-writing-skill)<!-- /source-meta -->

  **规则：** 写完每个核心步骤，说明产出的中间量是什么意思、如何进入下一步，不只列公式和定义。[出处](https://github.com/cycloneha/cn-patent-disclosure-writing-skill/blob/main/skills/cn-patent-disclosure-docx/references/03-technical-solution.md)

## 学术论文

- [Ten Simple Rules for Structuring Papers](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619) — 围绕中心贡献，用“背景—内容—结论”组织科学论文；适合研究论文的结构修改，仍须遵守学科和期刊规范。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619) <!-- article-copy --> · [Markdown 正文](vendor/articles/ten-simple-rules-structuring-papers.md)<!-- /article-copy -->

  **规则：** 按逐步支持中心贡献的逻辑组织结果小节，为各项判断配数据和图表，而不是照实验日期排列。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619)

- [Organizing Literature Reviews: The Basics](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics) — 乔治梅森大学写作中心的综述指南：围绕研究问题比较文献，把提纲写成有证据支持的判断；不替代系统综述的方法规范。[正文](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics) <!-- article-copy --> · [Markdown 摘要](vendor/articles/organizing-literature-reviews.md)<!-- /article-copy -->

  **规则：** 按研究问题把不同文献的观点归组，再把主题标签改写成由该组证据支持的判断句。[出处](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics)

- [Ten Simple Rules for Writing a Response to Reviewers](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005730) — 英文期刊返修的逐点回复指南，区分审稿意见、回应和稿件改动；仍须遵守目标期刊要求，不得虚构补做的实验。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005730) <!-- article-copy --> · [Markdown 正文](vendor/articles/response-to-reviewers.md)<!-- /article-copy -->

  **规则：** 保留审稿意见原文，逐点回应；一条意见含两个独立问题时，拆开分别回答。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005730)

- [Ten Simple Rules for Writing a Paper about Scientific Software](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008390) — 科学软件论文的写作指南，区分研究贡献、使用教程和版本文档；主要面向计算研究，不替代软件评测或复现证据。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008390) <!-- article-copy --> · [Markdown 正文](vendor/articles/scientific-software-papers.md)<!-- /article-copy -->

  **规则：** 论文正文写研究问题、算法创新和结果；超过几句的使用教程移到附录或与论文版本对应的文档。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008390)

- [Reviewing Academic Papers](https://github.com/jtleek/reviews) — Jeff Leek 的审稿写作指南，区分主要问题、次要问题和笔误；源于研究组惯例，评审标准仍以目标期刊为准。[正文](https://github.com/jtleek/reviews/blob/master/README.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/jtleek/reviews?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/jtleek/reviews/stargazers) · [副本](vendor/jtleek/reviews)<!-- /source-meta -->

  **规则：** 每条主要批评都指向具体图表、段落或结果，写清问题所在，不只说“论证不充分”。[出处](https://github.com/jtleek/reviews/blob/master/README.md)

- [Ten Simple Rules for Designing Graphical Abstracts](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789) — 以科研图形摘要为对象，说明图符、阅读方向和箭头语义，附对照图；主要用于论文的视觉概览，不能替代正文摘要与结果证据。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)

  **规则：** 同一张图形摘要若用箭头分别表示处理流程和指标上升，应把两种箭头画成明显不同的样式，并标明各自含义。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011789)

- [Ten Simple Rules for Typographically Appealing Scientific Texts](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458) — 科研文本的字体、公式和表格排版指南，附正反例；主要面向美式英语，须服从目标期刊规范。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458) <!-- article-copy --> · [Markdown 正文](vendor/articles/scientific-text-typography.md)<!-- /article-copy -->

  **规则：** 科研结果表的文字列左对齐，数值列右对齐并使用等宽数字，让不同位数的结果便于比较。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008458)

## 小说写作

- [Steering the Craft](https://www.ursulakleguin.com/steering-the-craft) — Le Guin 的英语叙事写作练习，训练句子节奏、视角和叙述距离；适合小说与叙事散文，不套固定情节公式。[第一章节选](https://lithub.com/a-writing-lesson-from-ursula-k-leguin/) <!-- article-copy --> · [Markdown 摘要](vendor/articles/steering-the-craft.md)<!-- /article-copy -->

  **规则：** 把叙事段落大声读出来，检查句子的声音和节奏是否推动阅读，再修改绊住耳朵的地方。[出处](https://lithub.com/a-writing-lesson-from-ursula-k-leguin/)

- [Fiction Writing Basics](https://owl.purdue.edu/owl/subject_specific_writing/creative_writing/writers/fiction_writing_basics/index.html) — 小说入门讲义，从人物行动、对白和因果关系组织故事；以英语叙事为主，保留概述与实验性写法的空间。[正文](https://owl.purdue.edu/owl/subject_specific_writing/creative_writing/writers/fiction_writing_basics/index.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/fiction-writing-basics.md)<!-- /article-copy -->

  **规则：** 把人物标签落实为场景里的选择、行动或对白，让读者据此判断性格；必要的概述仍可保留。[出处](https://owl.purdue.edu/owl/subject_specific_writing/creative_writing/writers/fiction_writing_basics/index.html)

- [Ping-Pong Dialogue](https://emmadarwin.substack.com/p/ping-pong-dialogue) — 用改写示例把轮流报台词的对白放回小说场景；主要面向英语叙事，不要求每句台词都配动作。[正文](https://emmadarwin.substack.com/p/ping-pong-dialogue) <!-- article-copy --> · [Markdown 摘要](vendor/articles/ping-pong-dialogue.md)<!-- /article-copy -->

  **规则：** 对话像轮流报台词时，把无关寒暄压成叙述，把有作用的动作、目光或未说出的想法放回场景。[出处](https://emmadarwin.substack.com/p/ping-pong-dialogue)

- [Creative Writing Skills — 限知视角与修订](https://github.com/haowjy/creative-writing-skills) — 选读人物视角与修订规则及反例；主要面向英语小说，不采用整套多代理流程或把作者的标点偏好当通则。[正文](https://github.com/haowjy/creative-writing-skills/blob/main/skills/writing-principles/SKILL.md) · [反例](https://github.com/haowjy/creative-writing-skills/blob/main/skills/writing-principles/resources/failure-modes.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/haowjy/creative-writing-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/haowjy/creative-writing-skills/stargazers) · [副本](vendor/haowjy/creative-writing-skills)<!-- /source-meta -->

  **规则：** 采用人物限知视角时，逐句核对人物此刻实际知道什么，不把大纲中的真相直接写进人物的认知。[出处](https://github.com/haowjy/creative-writing-skills/blob/main/skills/writing-principles/SKILL.md)

- [Chinese Novelist — 对话指南](https://github.com/PenglongHuang/chinese-novelist-skill) — 中文小说对白的潜台词、节奏和角色区分，附正反例；仅选读对话指南，不把章数、字数或章末钩子当通用要求。[正文](https://github.com/PenglongHuang/chinese-novelist-skill/blob/master/references/guides/dialogue-writing.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/PenglongHuang/chinese-novelist-skill?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/PenglongHuang/chinese-novelist-skill/stargazers) · [副本](vendor/penglonghuang/chinese-novelist-skill)<!-- /source-meta -->

  **规则：** 暂时遮住说话人标签，检查能否从用词、句式和语气识别人物；无法区分时，先改各自的说话方式。[出处](https://github.com/PenglongHuang/chinese-novelist-skill/blob/master/references/guides/dialogue-writing.md)

## 诗歌写作

- [Some Thoughts on the Integrity of the Single Line in Poetry](https://poets.org/text/some-thoughts-integrity-single-line-poetry) — Alberto Ríos 用分行对照讨论停顿、跨行和诗行的独立意味；主要谈英语抒情诗，代表作者的一种诗学观点。[正文](https://poets.org/text/some-thoughts-integrity-single-line-poetry) <!-- article-copy --> · [Markdown 摘要](vendor/articles/integrity-of-the-poetic-line.md)<!-- /article-copy -->

  **规则：** 逐一比较断行前后：若只是拖延信息，没有必要的停顿或意义变化，就考虑合并诗行。[出处](https://poets.org/text/some-thoughts-integrity-single-line-poetry)

- [Image in Poetry — Exercises](https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/image_in_poetry/exercises.html) — 从具体观察练习诗歌意象，让物象与观察者的情绪发生联系；以英语诗歌教学为主，不代替中文格律规范。[正文](https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/image_in_poetry/exercises.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/poetic-image-exercises.md)<!-- /article-copy -->

  **规则：** 从一个物体的具体观察出发，让细节带出观察者的想法或情绪，检查写下的是意象而不只是物品说明。[出处](https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/image_in_poetry/exercises.html)

- [Flying Revision’s Flag](https://poets.org/text/flying-revisions-flag) — 诗人 Donald Hall 谈修改如何改变诗的结构、声音和内容；是英语诗人的创作经验，不是固定修改次数或形式要求。[正文](https://poets.org/text/flying-revisions-flag) <!-- article-copy --> · [Markdown 摘要](vendor/articles/flying-revisions-flag.md)<!-- /article-copy -->

  **规则：** 修改卡住时，试把同一首诗改成另一种分节或节律安排，再比较新形式带出的内容，不只替换同义词。[出处](https://poets.org/text/flying-revisions-flag)

## 剧本写作

- [How to Write a Scene](https://johnaugust.com/2007/write-scene) — John August 的英语影视剧本指南，帮助判断一场戏是否必要，以及如何安排人物、地点和开场。[正文](https://johnaugust.com/2007/write-scene) <!-- article-copy --> · [Markdown 摘要](vendor/articles/how-to-write-a-scene.md)<!-- /article-copy -->

  **规则：** 先做删场测试：如果去掉这场戏，故事仍能成立，就重新审视它存在的必要。[出处](https://johnaugust.com/2007/write-scene)

- [How to Write Dialogue](https://johnaugust.com/2007/how-to-write-dialogue) — 影视对白的动机和回应方式，附同一信息的台词对照；主要面向英语剧本，不以自然闲聊代替戏剧目的。[正文](https://johnaugust.com/2007/how-to-write-dialogue) <!-- article-copy --> · [Markdown 摘要](vendor/articles/writing-screen-dialogue.md)<!-- /article-copy -->

  **规则：** 写解释背景的台词前，先明确说话人想让对方怎样反应，再按这个目的安排信息，而不是直接向观众报事实。[出处](https://johnaugust.com/2007/how-to-write-dialogue)

- [Writing Fight Scenes](https://johnaugust.com/2011/writing-fight-scenes) — 通过剧本片段讨论动作场面的取舍，让人物、场地和利害关系进入动作；不把剧本写成逐招编排表。[正文](https://johnaugust.com/2011/writing-fight-scenes) <!-- article-copy --> · [Markdown 摘要](vendor/articles/writing-fight-scenes.md)<!-- /article-copy -->

  **规则：** 挑出由人物、场地和利害关系决定的关键动作，让打斗属于这场戏，不逐拳记录流水账。[出处](https://johnaugust.com/2011/writing-fight-scenes)

## 图表与图解

- [FT Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) — 《金融时报》的图表选型手册，按偏差、相关、排序、分布等表达目的组织。[正文](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/Financial-Times/chart-doctor?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/Financial-Times/chart-doctor/stargazers) · [副本](vendor/financial-times/chart-doctor)<!-- /source-meta -->

  **规则：** 要表达高于或低于目标的偏差，先标出共同参考线，再用两侧延伸的条形呈现正负变化。[出处](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)

- [AntV Chart Visualization](https://github.com/antvis/chart-visualization-skills) — 按趋势、比较、占比与关系选图；完整流程会将输入数据发送至远程 AntV API。[选型规则](https://github.com/antvis/chart-visualization-skills/blob/master/skills/chart-visualization/SKILL.md#图表选择指南) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/antvis/chart-visualization-skills/stargazers) · [副本](vendor/antvis/chart-visualization-skills)<!-- /source-meta -->

  **规则：** 先按表达任务选图：时间变化用折线、分类比较用条形，不以现成模板代替选型。[出处](https://github.com/antvis/chart-visualization-skills/blob/master/skills/chart-visualization/SKILL.md)

- [Scientific Visualization](https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/scientific-visualization) — 科研图表的坐标、误差线、配色和多面板布局规范，附 Python 绘图示例。[正文](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/skills/scientific-visualization/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) · [副本](vendor/k-dense-ai/scientific-agent-skills)<!-- /source-meta -->

  **规则：** 画误差线时写明它表示标准差、标准误还是置信区间，并交代样本量及独立重复单位。[出处](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/skills/scientific-visualization/SKILL.md)

- [Visual Explainer](https://github.com/nicobailon/visual-explainer) — 所选 v0.12.0 默认单文件 HTML 与手写 SVG，Mermaid 按需使用；组织机制图并标明箭头动作，须在浏览器检查。[图解规则](https://github.com/nicobailon/visual-explainer/blob/main/plugins/visual-explainer/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/nicobailon/visual-explainer?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/nicobailon/visual-explainer/stargazers) · [副本](vendor/nicobailon/visual-explainer)<!-- /source-meta -->

  **规则：** 给图解箭头标明“写入、失效、轮询”等动作，让读者知道连线代表什么。[出处](https://github.com/nicobailon/visual-explainer/blob/main/plugins/visual-explainer/SKILL.md)

- [Baoyu Infographic](https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-infographic) — 信息图的结构与画风分开选择，覆盖时间线、对比、层级、循环等布局。[布局](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md#layout-gallery-21) · [风格](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md#style-gallery-22) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/JimLiu/baoyu-skills/stargazers) · [副本](vendor/jimliu/baoyu-skills)<!-- /source-meta -->

  **规则：** 先按信息关系选布局，再选画风；比较、层级、时间线等结构不因换画风而改变。[出处](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md)

- [Dashboard Design Guidebook](https://www.digital.go.jp/resources/dashboard-guidebook) — 日本数字厅的仪表盘设计指南，用正反例说明布局、配色和图表；面向决策与概览页面，Power BI 模板是配套工具。[正文](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/1948e3cd-736a-4378-9e31-039b08d11106/2a3a0ebc/20260331_resources_dashboard-guidebook_guidebook_02.pdf) <!-- article-copy --> · [Markdown 正文](vendor/articles/dashboard-design-guidebook.md)<!-- /article-copy -->

  **规则：** 把仪表盘图表对齐到统一布局网格，用共同的边线和间距组织整页，而不是逐块随意定位。[出处](https://www.digital.go.jp/resources/dashboard-guidebook)

- [Chartability](https://github.com/Chartability/POUR-CAF) — 图表无障碍检查清单，检查对比度、脱离颜色能否辨认类别、键盘操作和屏幕阅读器支持；适合图表与交互界面，不等同于合规审计。[工作簿](https://github.com/Chartability/POUR-CAF/blob/main/workbook.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/Chartability/POUR-CAF?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/Chartability/POUR-CAF/stargazers) · [副本](vendor/chartability/pour-caf)<!-- /source-meta -->

  **规则：** 分类图表不能只靠颜色区分，同时用纹理、形状或线型编码，让类别在不辨颜色时仍可识别。[出处](https://github.com/Chartability/POUR-CAF/blob/main/workbook.md)

## 动画与视频

- [huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) — 给编程助手的艺术动画指南：先画关键帧，再安排动作、转场和节拍；适合代码生成的动画与解说片，人物示范素材另有使用限制。[正文](https://github.com/alchaincyf/huashu-art-motion/blob/main/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/alchaincyf/huashu-art-motion?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/alchaincyf/huashu-art-motion/stargazers) · [副本](vendor/alchaincyf/huashu-art-motion)<!-- /source-meta -->

  **规则：** 按作者的方法，每幕至少安排一个主要动作和两个体现画风的循环动作，不只切换静态画面。[出处](https://github.com/alchaincyf/huashu-art-motion/blob/main/SKILL.md)

- [Staging — The 12 Basic Principles of Animation](https://www.animationmentor.com/blog/staging-the-12-basic-principles-of-animation/) — 叙事动画的注意力安排与镜头空间关系，附场面调度示例；用于分镜检查，不是不可打破的摄影定律。[正文](https://www.animationmentor.com/blog/staging-the-12-basic-principles-of-animation/) <!-- article-copy --> · [Markdown 摘要](vendor/articles/animation-staging.md)<!-- /article-copy -->

  **规则：** 连续对话镜头中保持人物的画面左右关系，切到近景也不无故对调，让观众能跟住空间关系。[出处](https://www.animationmentor.com/blog/staging-the-12-basic-principles-of-animation/)

- [Anticipation — The 12 Basic Principles of Animation](https://www.animationmentor.com/blog/anticipation-the-12-basic-principles-of-animation/) — 角色动画的预备动作与力度检查，附跳跃、步行和表情示例；预备动作不只限于先向反方向移动。[正文](https://www.animationmentor.com/blog/anticipation-the-12-basic-principles-of-animation/) <!-- article-copy --> · [Markdown 摘要](vendor/articles/animation-anticipation.md)<!-- /article-copy -->

  **规则：** 让预备动作的幅度和时长配合紧随其后的主动作；跳跃前的下蹲不能与跳跃力度脱节。[出处](https://www.animationmentor.com/blog/anticipation-the-12-basic-principles-of-animation/)

- [Manim Composer](https://github.com/adithya-s-k/manim_skill) — 数学与科学解说动画的分镜、视觉连续性与节奏；选读规划方法，ManimCE 与 ManimGL 示例须分别核对。[正文](https://github.com/adithya-s-k/manim_skill/blob/main/skills/manim-composer/references/visual-techniques.md) · [分镜示例](https://github.com/adithya-s-k/manim_skill/blob/main/skills/manim-composer/references/scene-examples.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/adithya-s-k/manim_skill?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/adithya-s-k/manim_skill/stargazers) · [副本](vendor/adithya-s-k/manim_skill)<!-- /source-meta -->

  **规则：** 演示公式变形时，尽量让对应符号连续变换到下一式，而不是整式淡出后换一张，保留两步的视觉关系。[出处](https://github.com/adithya-s-k/manim_skill/blob/main/skills/manim-composer/references/visual-techniques.md)

- [Motion Design Skills — 动效主次](https://github.com/iart-ai/motion-design-skills) — 品牌动画与解说片的动效层级，附逐镜头示例；仅选读艺术指导，预设时长和风格不是通则。[正文](https://github.com/iart-ai/motion-design-skills/blob/main/skills/motion-art-direction/SKILL.md) · [镜头示例](https://github.com/iart-ai/motion-design-skills/blob/main/skills/motion-art-direction/references/direction-playbook.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/iart-ai/motion-design-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/iart-ai/motion-design-skills/stargazers) · [副本](vendor/iart-ai/motion-design-skills)<!-- /source-meta -->

  **规则：** 同一镜头先指定主要运动对象，让辅助动作更小、背景更弱，避免多个元素同时争夺注意力。[出处](https://github.com/iart-ai/motion-design-skills/blob/main/skills/motion-art-direction/SKILL.md)

- [Data Animation Skills — 动态图表](https://github.com/iart-ai/data-animation-skills) — Remotion 动态排行与数值动画的读数节奏、标签和逐帧检查；时长按数据密度调整，平滑插值不等于新增观测。[正文](https://github.com/iart-ai/data-animation-skills/blob/main/skills/chart-animation/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/iart-ai/data-animation-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/iart-ai/data-animation-skills/stargazers) · [副本](vendor/iart-ai/data-animation-skills)<!-- /source-meta -->

  **规则：** 数据开始变化前，先停留让观众读清坐标与单位；结尾定格最终状态，不让结果一闪而过。[出处](https://github.com/iart-ai/data-animation-skills/blob/main/skills/chart-animation/SKILL.md)

## 演示文稿

- [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) — HTML 幻灯片的版式与视觉指南，区分演讲型和阅读型内容密度。[设计规则](https://github.com/zarazhangrui/frontend-slides/blob/main/SKILL.md#design-aesthetics) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/zarazhangrui/frontend-slides/stargazers) · [副本](vendor/zarazhangrui/frontend-slides)<!-- /source-meta -->

  **规则：** 先区分演讲型与阅读型；内容超过选定密度时拆页，不靠缩小字号把所有内容塞进一页。[出处](https://github.com/zarazhangrui/frontend-slides/blob/main/SKILL.md)

- [Baoyu Slide Deck](https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-slide-deck) — 面向阅读与分享的逐页图片演示稿，从背景材质、配色、字体和内容密度组合风格。[风格指南](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-slide-deck/SKILL.md#style-system) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/JimLiu/baoyu-skills/stargazers) · [副本](vendor/jimliu/baoyu-skills)<!-- /source-meta -->

  **规则：** 面向阅读与分享的幻灯片，要让每页脱离口头讲解也能说清主要信息。[出处](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-slide-deck/SKILL.md)

- [Assertion-Evidence](https://www.assertion-evidence.com/) — 科研与技术演示的逐页表达方法：标题直接说结论，图形呈现证据，次要细节放入备注；适合现场讲解。[教程](https://www.craftscicom.org/ae_tutorial.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/assertion-evidence-tutorial.md)<!-- /article-copy -->

  **规则：** 每页标题写成完整结论句，用视觉证据支撑，把次要细节移到备注。[出处](https://www.craftscicom.org/ae_tutorial.html)

- [Ten Simple Rules for Effective Presentation Slides](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009554) — 科研演讲的逐页信息安排与排练检查，附复杂图形的拆解示例；偏向现场讲解，不套用到所有阅读型报告。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009554) <!-- article-copy --> · [Markdown 正文](vendor/articles/effective-presentation-slides.md)<!-- /article-copy -->

  **规则：** 把复杂流程图拆成逐步增加信息的连续页，最后给出全图，不在开头一次展示所有细节。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009554)

## 获取副本

[副本状态](vendor/README.md) · [网页 Markdown 状态](vendor/articles/README.md) · [使用与更新说明](SYNC.md)

副本保留原许可，集合仓库只复制选定范围。同步状态、Stars 数和文件入口见上方状态页。

---

[补充条目](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/new) · [参与整理](CONTRIBUTING.md)
