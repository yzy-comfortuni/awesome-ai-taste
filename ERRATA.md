# 已知勘误与选读边界

根据 [体验报告 #1–#7](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/7) 整改，2026-10-13 核对。下列判断针对本仓库保存的 `6df9dd3c71478122db67ad9554ba4e8f83afba88` 版本；不是对整个上游产品的测评。第三方副本保持原样，本页的纠正和练习由本仓库维护。

<a id="facts"></a>
## 文风不能覆盖事实

Stop Slop 的全部删除副词、每句补人类主语等要求，可能删掉 only/probably 或补出未知批准人。保留承载信息的限定、被动句和真实列举。Humanizer 示例中“超过 3000”不能改成“3000”；没有实现依据的原句也不能改出哈希表或 O(1) 查找。

这些纠正不表示两份资源毫无价值，也不验证其对模型训练或作者身份的解释。参见 [固定版 Stop Slop](https://github.com/yzy-comfortuni/awesome-ai-taste/blob/6df9dd3c71478122db67ad9554ba4e8f83afba88/vendor/hardikpandya/stop-slop/SKILL.md)、[固定版 Humanizer](https://github.com/yzy-comfortuni/awesome-ai-taste/blob/6df9dd3c71478122db67ad9554ba4e8f83afba88/vendor/blader/humanizer/SKILL.md) 和 [保真练习](examples/writing.md#w1)。

Google 的条件前置不允许倒置条件；Diátaxis 的“只写动作”不允许删掉停止、等待、权限分支和风险。排版前排除代码、数据、URL 与固定名称；中文数字空格按本项目约定，不在两套指南间来回改。

<a id="contrast"></a>
## 普通 18 px 不是 18 pt 大字

Visual Design Foundations 保存版本中的 `Large text (18px+)` 门槛有误。按 [W3C WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)，一般文字至少 4.5:1；大字可为 3:1。常规字号门槛为普通 18 pt（24 CSS px）或粗体 14 pt（约 18.67 CSS px），非拉丁字体的等效大小按规范定义判断。不能把比值四舍五入后判通过，例如 4.499:1 仍低于 4.5:1。

应采用最终显示字号，不是整体缩放前的设计字号。这里没有覆盖所有字体、透明度、背景图、状态或规范例外；单组颜色计算不等于整页合规。[算术检查](examples/checks.py)只处理明确的纯色色对。

<a id="zoom"></a>
## 手机输入不以禁止缩放解决

Web Interface Guidelines 的手机输入段落出现 `maximum-scale=1` 备选，与保留缩放的要求冲突。本仓库练习保留缩放，输入字号至少 16 CSS px；这不是对所有设备行为的保证。键盘、错误焦点和屏幕阅读器仍需分别实测。参见 [W3C Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)。

<a id="visual-explainer"></a>
## Visual Explainer 的当前选读入口

保存的 v0.12.0 正文没有 `mermaid-invariants` 标题。所选版本默认单文件 HTML 和内联手写 SVG，Mermaid 在用户要求或提供源码时使用。目录直接到实际 [SKILL.md](https://github.com/nicobailon/visual-explainer/blob/main/plugins/visual-explainer/SKILL.md)，不保留猜测锚点。箭头表达动作的规则仍有原文依据。

静态 SVG、另画的 PNG 和浏览器截图是不同证据。箭头穿过标签、窄屏布局或交互表现必须在实际产物中检查；成功路径图不自动证明失败重试或事务保证。

<a id="rank"></a>
## 排名数值平滑，不代表位置平滑

Data Animation Skills 保存的最小片段先按数值排序，再令 `y = rank * 行距`；整数排名改变时仍会跳行。见 [固定源文件](https://github.com/yzy-comfortuni/awesome-ai-taste/blob/6df9dd3c71478122db67ad9554ba4e8f83afba88/vendor/iart-ai/data-animation-skills/skills/chart-animation/SKILL.md)。

[原创修订示例](examples/rank-transition.js)分开处理数值和位置，用稳定 ID 打破平局，按帧计算位置；支持相同成员集合的多个项目。它在两个观测端点的排名之间作转场：中间纵坐标不是精确名次，不适合标成实时排名；标签显示插值数值并注明非观测。系列增删、密集多次交叉、碰撞布局需另做，不能直接称为成熟排行组件。

复现 `A:100→80、B:80→100`，20 fps、50 px 行距、10 帧位置转场：原逻辑单帧最大位移 50 px，修订约 7.4 px，首尾数值保持不变。运行 `node examples/rank-transition.js` 可重新计算。这是本轮新复现，不是体验者原始日志；未执行上游 Remotion 管线。

<a id="slides"></a>
## 等比缩小不等于手机可读

1920 px 舞台上的 28 px 正文缩到 390 px 宽时，等效字号为 `28×390/1920≈5.69 px`。Frontend Slides 的等比适配不能单独证明可读。先区分现场演讲与异步阅读；移动阅读可另排可重流版本，或明确横屏、放大阅读条件，并在目标尺寸验收。不得禁用用户缩放来掩盖问题。

Assertion-Evidence 中影响结论的限定必须仍可见，不因“细节放备注”而藏掉。huashu 的艺术场景母题不应成为文字页、高频 UI 或所有镜头的动效配额。[演示练习](examples/motion.md#d1)分别检查这两种用途。

<a id="external"></a>
## 服务、素材与未执行的步骤

AntV 所选正文使用 `antv-studio.alipay.com/api/gpt-vis` 远程接口，输入会发至该服务；未核验的数据保留安排不作保证。只有选型或本地参考图时，记录“API 未执行”。Baoyu 完整生成依赖图像后端；Dashboard 的官方替代文本不包含 PDF 视觉版面；Diátaxis 的 RST 选读不包含整站图片与跨页材料，完整阅读仍需 [原站](https://diataxis.fr/how-to-guides/)。

小说的朗读、诗歌的观察与声音、剧本的表演不能仅用文本检查替代。每项练习都列明哪些结果可核、哪些还需要人或环境。
