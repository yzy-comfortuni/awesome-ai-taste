# Awesome AI Taste

给 AI 用的设计、写作与可视化手册。

每项附一条可直接采用的规则；按条目所述场景使用，完整语境见出处。

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

- [Visual Design Foundations](https://github.com/wshobson/agents/tree/main/plugins/ui-design/skills/visual-design-foundations) — 用设计令牌约束字号比例、间距、颜色与图标尺寸，适合搭建设计系统或统一既有界面，不负责品牌视觉方向。[正文](https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/visual-design-foundations/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/wshobson/agents?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/wshobson/agents/stargazers) · [副本](vendor/wshobson/agents)<!-- /source-meta -->

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

## 专利写作

- [WIPO Patent Drafting Manual](https://www.wipo.int/publications/en/details.jsp?id=4706) — 世界知识产权组织的专利撰写手册，用实例讲权利要求层次、术语、说明书支持与附图；适合跨法域起草训练，具体申请仍须核对目标专利局现行规则。[权利要求设计](https://www.wipo.int/edocs/pubdocs/zh/wipo-pub-867-23-zh-wipo-patent-drafting-manual.pdf#page=106) <!-- article-copy --> · [Markdown 阅读索引](vendor/articles/wipo-patent-drafting-manual.md)<!-- /article-copy -->

  **规则：** 起草时逐项检查权利要求的概括范围是否有说明书依据，不把单个实施例扩写成未经支持的全部情形。[出处](https://www.wipo.int/edocs/pubdocs/zh/wipo-pub-867-23-zh-wipo-patent-drafting-manual.pdf#page=108)

## 学术论文

- [Ten Simple Rules for Structuring Papers](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619) — 科学论文的论证结构指南：先确定唯一中心贡献，再让标题、摘要、段落与结果围绕 Context–Content–Conclusion 展开；适合研究论文的组织与修改，不替代具体学科和期刊规范。[正文](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619) <!-- article-copy --> · [Markdown 正文](vendor/articles/ten-simple-rules-structuring-papers.md)<!-- /article-copy -->

  **规则：** 按逐步支持中心贡献的逻辑组织结果小节，为各项判断配数据和图表，而不是照实验日期排列。[出处](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619)

- [Organizing Literature Reviews: The Basics](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics) — 乔治梅森大学写作中心的文献综述组织指南，按研究问题综合不同文献，形成论点式提纲；用于综述的组织与修改，不替代系统综述的方法规范。[正文](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics) <!-- article-copy --> · [Markdown 摘要](vendor/articles/organizing-literature-reviews.md)<!-- /article-copy -->

  **规则：** 按研究问题把不同文献的观点归组，再把主题标签改写成由该组证据支持的判断句。[出处](https://writingcenter.gmu.edu/writing-resources/research-based-writing/organizing-literature-reviews-the-basics)

## 小说写作

- [Steering the Craft](https://www.ursulakleguin.com/steering-the-craft) — Ursula K. Le Guin 的叙事写作练习，从语言声音、句法、重复、视角到叙述距离训练 prose 的节奏与控制；主要基于英语小说与叙事散文，不是固定情节公式。[节选](https://www.ursulakleguin.com/steering-the-craft) <!-- article-copy --> · [Markdown 摘要](vendor/articles/steering-the-craft.md)<!-- /article-copy -->

  **规则：** 把叙事段落大声读出来，检查句子的声音和节奏是否推动阅读，再修改绊住耳朵的地方。[出处](https://lithub.com/a-writing-lesson-from-ursula-k-leguin/)

## 诗歌写作

- [Some Thoughts on the Integrity of the Single Line in Poetry](https://poets.org/text/some-thoughts-integrity-single-line-poetry) — Alberto Ríos 用分行对照讨论诗行的独立意味、停顿与跨行，检查断行是否只是拖延信息；适合英语抒情诗的写作与修改，是一种诗学立场而非所有诗歌的通则。[正文](https://poets.org/text/some-thoughts-integrity-single-line-poetry) <!-- article-copy --> · [Markdown 摘要](vendor/articles/integrity-of-the-poetic-line.md)<!-- /article-copy -->

  **规则：** 逐一比较断行前后：若只是拖延信息，没有必要的停顿或意义变化，就考虑合并诗行。[出处](https://poets.org/text/some-thoughts-integrity-single-line-poetry)

## 剧本写作

- [How to Write a Scene](https://johnaugust.com/2007/write-scene) — John August 的影视剧本场景写作指南，从删场测试、出场人物与地点，到开场备选和简稿，判断一场戏为何存在、如何展开；主要面向英语影视剧本，不是所有叙事的通用公式。[正文](https://johnaugust.com/2007/write-scene) <!-- article-copy --> · [Markdown 摘要](vendor/articles/how-to-write-a-scene.md)<!-- /article-copy -->

  **规则：** 先做删场测试：如果去掉这场戏，故事仍能成立，就重新审视它存在的必要。[出处](https://johnaugust.com/2007/write-scene)

## 图表与图解

- [FT Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) — 《金融时报》的图表选型手册，按偏差、相关、排序、分布等表达目的组织。[正文](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/Financial-Times/chart-doctor?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/Financial-Times/chart-doctor/stargazers) · [副本](vendor/financial-times/chart-doctor)<!-- /source-meta -->

  **规则：** 要表达高于或低于目标的偏差，先标出共同参考线，再用两侧延伸的条形呈现正负变化。[出处](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)

- [AntV Chart Visualization](https://github.com/antvis/chart-visualization-skills) — 基于 AntV API 的图表技能，按趋势、比较、占比与关系选择图形。[选型规则](https://github.com/antvis/chart-visualization-skills/blob/master/skills/chart-visualization/SKILL.md#图表选择指南) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/antvis/chart-visualization-skills/stargazers) · [副本](vendor/antvis/chart-visualization-skills)<!-- /source-meta -->

  **规则：** 先按表达任务选图：时间变化用折线、分类比较用条形，不以现成模板代替选型。[出处](https://github.com/antvis/chart-visualization-skills/blob/master/skills/chart-visualization/SKILL.md)

- [Scientific Visualization](https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/scientific-visualization) — 科研图表的坐标、误差线、配色和多面板布局规范，附 Python 绘图示例。[正文](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/skills/scientific-visualization/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) · [副本](vendor/k-dense-ai/scientific-agent-skills)<!-- /source-meta -->

  **规则：** 画误差线时写明它表示标准差、标准误还是置信区间，并交代样本量及独立重复单位。[出处](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/skills/scientific-visualization/SKILL.md)

- [Visual Explainer](https://github.com/nicobailon/visual-explainer) — 用 HTML 与 Mermaid 组织架构图、流程图和对照表，规定箭头含义与信息层级。[图解规则](https://github.com/nicobailon/visual-explainer/blob/main/plugins/visual-explainer/SKILL.md#mermaid-invariants) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/nicobailon/visual-explainer?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/nicobailon/visual-explainer/stargazers) · [副本](vendor/nicobailon/visual-explainer)<!-- /source-meta -->

  **规则：** 给图解箭头标明“写入、失效、轮询”等动作，让读者知道连线代表什么。[出处](https://github.com/nicobailon/visual-explainer/blob/main/plugins/visual-explainer/SKILL.md)

- [Baoyu Infographic](https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-infographic) — 信息图的结构与画风分开选择，覆盖时间线、对比、层级、循环等布局。[布局](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md#layout-gallery-21) · [风格](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md#style-gallery-22) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/JimLiu/baoyu-skills/stargazers) · [副本](vendor/jimliu/baoyu-skills)<!-- /source-meta -->

  **规则：** 先按信息关系选布局，再选画风；比较、层级、时间线等结构不因换画风而改变。[出处](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-infographic/SKILL.md)

- [Dashboard Design Guidebook](https://www.digital.go.jp/resources/dashboard-guidebook) — 日本数字厅的仪表盘设计手册，用 Do’s/Don’ts、网格与色板约束信息层级和图表表达；适合决策与概览型仪表盘，Power BI 模板只是配套实现。[正文](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/1948e3cd-736a-4378-9e31-039b08d11106/2a3a0ebc/20260331_resources_dashboard-guidebook_guidebook_02.pdf) <!-- article-copy --> · [Markdown 正文](vendor/articles/dashboard-design-guidebook.md)<!-- /article-copy -->

  **规则：** 把仪表盘图表对齐到统一布局网格，用共同的边线和间距组织整页，而不是逐块随意定位。[出处](https://www.digital.go.jp/resources/dashboard-guidebook)

- [Chartability](https://github.com/Chartability/POUR-CAF) — 数据可视化可访问性审核清单，用可测试的启发式检查对比度、颜色冗余编码、键盘操作和屏幕阅读器支持；适合图表与交互式数据界面，不替代合规审计。[工作簿](https://github.com/Chartability/POUR-CAF/blob/main/workbook.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/Chartability/POUR-CAF?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/Chartability/POUR-CAF/stargazers) · [副本](vendor/chartability/pour-caf)<!-- /source-meta -->

  **规则：** 分类图表不能只靠颜色区分，同时用纹理、形状或线型编码，让类别在不辨颜色时仍可识别。[出处](https://github.com/Chartability/POUR-CAF/blob/main/workbook.md)

## 动画与视频

- [huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) — 面向 coding agent 的艺术动画 skill：先设计关键帧，再用代码建立主动作、风格母题循环、签名转场和节拍，并以确定性渲染与独立审片验收；适合程序化艺术动画和解说片，人物示范素材另有使用限制。[正文](https://github.com/alchaincyf/huashu-art-motion/blob/main/SKILL.md) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/alchaincyf/huashu-art-motion?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/alchaincyf/huashu-art-motion/stargazers) · [副本](vendor/alchaincyf/huashu-art-motion)<!-- /source-meta -->

  **规则：** 在这套艺术动画做法中，每幕安排一个主动作和两个风格母题循环，让画面内部动起来。[出处](https://github.com/alchaincyf/huashu-art-motion/blob/main/SKILL.md)

## 演示文稿

- [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) — HTML 幻灯片的版式与视觉指南，区分演讲型和阅读型内容密度。[设计规则](https://github.com/zarazhangrui/frontend-slides/blob/main/SKILL.md#design-aesthetics) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/zarazhangrui/frontend-slides/stargazers) · [副本](vendor/zarazhangrui/frontend-slides)<!-- /source-meta -->

  **规则：** 先区分演讲型与阅读型；内容超过选定密度时拆页，不靠缩小字号把所有内容塞进一页。[出处](https://github.com/zarazhangrui/frontend-slides/blob/main/SKILL.md)

- [Baoyu Slide Deck](https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-slide-deck) — 面向阅读与分享的逐页图片演示稿，从背景材质、配色、字体和内容密度组合风格。[风格指南](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-slide-deck/SKILL.md#style-system) <!-- source-meta -->[![Stars](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&label=Stars&cacheSeconds=3600)](https://github.com/JimLiu/baoyu-skills/stargazers) · [副本](vendor/jimliu/baoyu-skills)<!-- /source-meta -->

  **规则：** 面向阅读与分享的幻灯片，要让每页脱离口头讲解也能说清主要信息。[出处](https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-slide-deck/SKILL.md)

- [Assertion-Evidence](https://www.assertion-evidence.com/) — 科研与技术演示的逐页表达方法：标题直接说结论，图形呈现证据，次要细节放入备注；适合现场讲解。[教程](https://www.craftscicom.org/ae_tutorial.html) <!-- article-copy --> · [Markdown 摘要](vendor/articles/assertion-evidence-tutorial.md)<!-- /article-copy -->

  **规则：** 每页标题写成完整结论句，用视觉证据支撑，把次要细节移到备注。[出处](https://www.craftscicom.org/ae_tutorial.html)

## 获取副本

[副本状态](vendor/README.md) · [网页 Markdown 状态](vendor/articles/README.md) · [使用与更新说明](SYNC.md)

GitHub 条目显示上游 Stars；已成功同步的来源另有「副本」入口。副本不带上游 Git 历史，保留原许可证，在本仓库相关内容推送或手动触发时检查更新。大集合仓库仅同步已收录目录，具体范围与受阻项见状态页。

---

[补充条目](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/new) · [参与整理](CONTRIBUTING.md)
