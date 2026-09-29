# 来源副本状态

由 `scripts/sync_sources.py --sync` 生成。Star 数为最近一次成功检查的快照；README 徽章独立缓存刷新。

目录中的文件保持各自的原始许可证，不由本仓库重新授权。这里只同步源码，不安装或执行上游代码。
“current”表示记录的上游 commit 已复制并通过本地内容校验，不代表安全审计或效果验证。错误时保留上次成功副本。

| 仓库 | Stars | 状态 | 已复制 commit | 范围 |
| --- | ---: | --- | --- | --- |
| [ibelick/ui-skills](https://github.com/ibelick/ui-skills) | 9213 | current | [`dc7ab32`](https://github.com/ibelick/ui-skills/commit/dc7ab3209341b2075c495983899b11f6d204e41b) · [文件](ibelick/ui-skills/) | `.` |
| [anthropics/skills](https://github.com/anthropics/skills) | 178826 | current | [`3337550`](https://github.com/anthropics/skills/commit/33375500bcea98d610eb30ce10ac4e59b89c390d) · [文件](anthropics/skills/) | `skills/frontend-design` |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 72135 | blocked | — | `.` |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 90938 | current | [`ce26fc2`](https://github.com/Leonxlnx/taste-skill/commit/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b) · [文件](leonxlnx/taste-skill/) | `.` |
| [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) | 912 | current | [`e3d624b`](https://github.com/vercel-labs/web-interface-guidelines/commit/e3d624baaf29dc1fc645aff3e38f03e564d2d6b1) · [文件](vercel-labs/web-interface-guidelines/) | `.` |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 7304 | current | [`267330e`](https://github.com/jakubkrehel/skills/commit/267330e1adfc66a718fb65fa6918c1f06d0a689e) · [文件](jakubkrehel/skills/) | `.` |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | 41668 | current | [`d16ebe6`](https://github.com/emilkowalski/skills/commit/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128) · [文件](emilkowalski/skills/) | `.` |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | 17634 | current | [`8da1f03`](https://github.com/hardikpandya/stop-slop/commit/8da1f030185bdfe8471220585162991eaeb970e9) · [文件](hardikpandya/stop-slop/) | `.` |
| [blader/humanizer](https://github.com/blader/humanizer) | 52665 | current | [`225a6f3`](https://github.com/blader/humanizer/commit/225a6f39ac85f76ee48dbad772ea4abe4ed6c9d8) · [文件](blader/humanizer/) | `.` |
| [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) | 18665 | current | [`f4518a8`](https://github.com/op7418/Humanizer-zh/commit/f4518a8eab97b8bfebc66a89d34320a89bef6930) · [文件](op7418/humanizer-zh/) | `.` |
| [ruanyf/document-style-guide](https://github.com/ruanyf/document-style-guide) | 12949 | blocked | — | `.` |
| [sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines) | 15718 | current | [`9a5fbeb`](https://github.com/sparanoid/chinese-copywriting-guidelines/commit/9a5fbeb842f39644352fd79b5d8c6764718105cc) · [文件](sparanoid/chinese-copywriting-guidelines/) | `.` |
| [Financial-Times/chart-doctor](https://github.com/Financial-Times/chart-doctor) | 3352 | blocked | — | `visual-vocabulary` |
| [antvis/chart-visualization-skills](https://github.com/antvis/chart-visualization-skills) | 503 | current | [`a105fa1`](https://github.com/antvis/chart-visualization-skills/commit/a105fa12a9fa41fccccc2eba7f4b34973628f5d3) · [文件](antvis/chart-visualization-skills/) | `.` |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | 47001 | blocked | — | `skills/scientific-visualization` |
| [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer) | 9942 | current | [`7163c3e`](https://github.com/nicobailon/visual-explainer/commit/7163c3e10660912e0b89e1af465db9f387282b88) · [文件](nicobailon/visual-explainer/) | `.` |
| [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills) | 26205 | current | [`1567581`](https://github.com/JimLiu/baoyu-skills/commit/1567581c26ec29f4216c6e6835415bf30343b0e3) · [文件](jimliu/baoyu-skills/) | `skills/baoyu-infographic, skills/baoyu-slide-deck` |
| [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | 29934 | current | [`9906a34`](https://github.com/zarazhangrui/frontend-slides/commit/9906a34d640d2111f724544cbc50f7f130569ae1) · [文件](zarazhangrui/frontend-slides/) | `.` |

## 边界与待处理项

`.` 表示仓库范围，其他路径表示仅收录目录，不是完整安装包。Git 历史和子模块不会递归复制；Git 属性文件、字体和非普通文件不复制，LFS 只保留指针。完整排除清单、许可证、SHA 和内容摘要见 [`sources.lock.json`](../sources.lock.json)。

- **ibelick/ui-skills**：有 1 项排除或 LFS 提示，见锁定文件。
- **pbakaus/impeccable**：snapshot exceeds 32 MiB; narrow the scope。暂未生成副本。
- **jakubkrehel/skills**：有 1 项排除或 LFS 提示，见锁定文件。
- **emilkowalski/skills**：有 1 项排除或 LFS 提示，见锁定文件。
- **ruanyf/document-style-guide**：GitHub HTTP 404; rate limits/permissions may apply。暂未生成副本。
- **financial-times/chart-doctor**：selected file exceeds 8 MiB; narrow the scope。暂未生成副本。
- **k-dense-ai/scientific-agent-skills**：download exceeds 32 MiB。暂未生成副本。
