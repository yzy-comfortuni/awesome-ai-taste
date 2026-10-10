# 网页文章的 Markdown 版本

正文副本、摘要和书籍索引分别统计。摘要不是全文副本；没有转载许可的原文仍是全文归档缺口。

| 来源 | Markdown 类型 | 状态 | 文件 |
| --- | --- | --- | --- |
| Google Developer Documentation Style Guide — Highlights | 正文 Markdown | current | [google-style-highlights.md](google-style-highlights.md) |
| WIPO Patent Drafting Manual — 阅读索引 | 书籍阅读索引（非全文） | index-only | [wipo-patent-drafting-manual.md](wipo-patent-drafting-manual.md) |
| Ten simple rules for structuring papers | 正文 Markdown | current | [ten-simple-rules-structuring-papers.md](ten-simple-rules-structuring-papers.md) |
| Organizing Literature Reviews: The Basics | 摘要 Markdown（非全文） | summary-only | [organizing-literature-reviews.md](organizing-literature-reviews.md) |
| Steering the Craft — 官方介绍与第一章节选 | 摘要 Markdown（非全文） | summary-only | [steering-the-craft.md](steering-the-craft.md) |
| Some Thoughts on the Integrity of the Single Line in Poetry | 摘要 Markdown（非全文） | summary-only | [integrity-of-the-poetic-line.md](integrity-of-the-poetic-line.md) |
| How to write a scene | 摘要 Markdown（非全文） | summary-only | [how-to-write-a-scene.md](how-to-write-a-scene.md) |
| ダッシュボードデザインの実践ガイドブック — 官方替代文本 | 正文 Markdown | current | [dashboard-design-guidebook.md](dashboard-design-guidebook.md) |
| Tutorial: Creating an Assertion-Evidence Presentation | 摘要 Markdown（非全文） | summary-only | [assertion-evidence-tutorial.md](assertion-evidence-tutorial.md) |

## 全文与更新边界

摘要只随编辑明确修改而更新；自动同步不会抓取受版权保护的全文代替摘要。正文转换在每次本仓库相关 push 或手动触发时检查来源和许可，失败时保留已验证版本。书籍不冒充单页文章。

文件头保存作者、来源、类型、许可和审阅日期；`manifest.json` 保存内容 SHA-256、正文来源摘要、转换版本和实际抓取记录。哈希只校验保存完整性，不代表内容权威性。

GitHub 原生 Markdown 文档在上级各仓库副本目录中，不在这里重复复制。

