# Awesome AI Taste

让 AI 做出的页面、写出的文字，少一点模板味。

精选能影响成品的 prompts、skills 和经验规则。重点看它能纠正什么具体毛病，以及使用时有什么代价。不按星数排名，不收通用 agent 工作流。

[界面设计](#界面设计) · [文字表达](#文字表达) · [怎么用](#怎么用) · [参与收录](CONTRIBUTING.md)

> 首批 7 个条目；推荐内容核读于 **2026-09-24**。目前均为内容初选，**尚未完成本项目的统一对照实测**。下文的编辑意见不是效果排名，作者演示也不等于我们的测试结果。

## 界面设计

### [UI Skills](https://github.com/ibelick/ui-skills)

**先读：** [Playbook / Learn](https://www.ui-skills.com/playbook)。需要 agent 指令时，再看 [Baseline UI](https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md)。

把间距、配色、数字对齐、表单反馈等问题拆成短规则。例如先用间距分组、限制强调色、给空状态一个明确动作。适合普通产品界面的基础修整。

**编辑意见：** Playbook 接近一本随手查的经验手册。Baseline UI 则带有 React/Tailwind 等技术栈要求，并强硬限制渐变和动效；不要为了采用它更换现有技术栈，也不要把这些偏好当成所有产品的设计定律。

### [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)

**先读：** [SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)，重点是 `Design principles` 和 `More on writing in design`。

Anthropic 的前端设计技能。要求视觉选择来自具体主题和受众，编号、动效、按钮文案都应传递信息，而不是装饰页面。

**编辑意见：** 值得借鉴的是“为什么这样设计”的判断，不是某种固定风格。文件也包含计划、评审和自检步骤；只借鉴经验时，读相关段落即可。用户已经确定的品牌规范优先。

### [Impeccable](https://github.com/pbakaus/impeccable)

**先读：** [Slop 图鉴](https://impeccable.style/slop/)，按排版、布局、动效或文案问题查找。

用示例解释重复卡片、无意义装饰、冗余界面文案等常见毛病，也展示米色编辑风等替代套路可能如何变成新模板。适合拿着一个已有页面寻找问题。

**编辑意见：** 本条推荐的是图鉴。完整项目还包含命令、检测器和浏览器迭代工具，使用负担不同。图鉴中的模式是检查线索，不是字体、颜色或圆角的永久禁令。

### [Taste Skill](https://github.com/Leonxlnx/taste-skill)

**先读：** [默认技能的正文](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)，先看适用范围和 `THE THREE DIALS`。

面向落地页、作品集和网站改版，通过布局变化、动效强度、信息密度调整设计方向。默认版本目前标为 v2 experimental。

**编辑意见：** 它是一份长技能，不是几条轻量口诀。当前正文明确排除仪表盘、数据表格和多步骤产品界面，不适合直接拿来做后台系统。先选场景，再决定是否采用，不必安装整个技能集合。

## 文字表达

### [Stop Slop](https://github.com/hardikpandya/stop-slop)

**先读：** [SKILL.md 的 Core Rules](https://github.com/hardikpandya/stop-slop/blob/main/SKILL.md#core-rules)。

以短清单处理英文写作中的空泛开场、套路对比、模糊判断和格言式收尾；详细材料另放在 references 中。

**编辑意见：** 适合借鉴“删掉没有信息的部分”。但原文一律排除副词、被动句和破折号，还要求自评分；这些限制不宜照搬到中文、正式文体或已有作者风格中。短不代表每条都合理。

### [Humanizer](https://github.com/blader/humanizer)

**先读：** [SKILL.md](https://github.com/blader/humanizer/blob/main/SKILL.md)，重点是模式目录、`Voice` 和 `When not to act`。

把假对比、强凑三项、空泛拔高、装饰性格式等问题具体化，并允许用作者样本校准表达。适合已有英文稿件的编辑。

**编辑意见：** 比只列禁用词更值得参考，但正文较长。粘贴文本时，默认输出还包括中间稿和简评；只需要交稿时，应明确要求最终稿。不要把它的模式清单用作作者身份判断。

### [Humanizer-zh](https://github.com/op7418/Humanizer-zh)

**先读：** [SKILL.md](https://github.com/op7418/Humanizer-zh/blob/main/SKILL.md)，先看“编辑约束与优先级”，再按问题查模式。

面向中文文章、评论和文档，处理空话、重复、长定语和套话收尾。当前版本强调保留事实、确定程度和作者声音，默认交付最终稿。

**编辑意见：** 与英文 Humanizer 分开使用，不必叠加。它给出了不应修改的边界，但仍是一份较长的编辑指南。不会替稿件补充事实证据，也不应把所有文体都改成口语。

## 怎么用

挑一份与任务匹配的材料，把正文链接交给能读取它的 agent。无需为了浏览本目录安装任何工具。

```text
先阅读：[规则正文链接]
用于：[具体任务]
保留项目已有规范和技术栈，只采用适合这个任务的规则。
直接交付成品，不增加规则遵守报告，也不要自行安装插件。
```

不要把整个目录一次性塞进上下文。遇到冲突，以明确的任务要求和已有项目规范为准；“不像 AI”不值得牺牲可用性、无障碍或事实准确性。读取失败时说明失败，不假装已经采用。

## 收录标准

- 能指向具体的成品问题，有可直接阅读的规则或示例。
- 推荐到有用的文件或章节，不只链接项目首页；较重项目可以只收其中一部分。
- 写明局限，不用热度、作者宣传或模型自评分代替实测。
- 不以绕过 AI 检测为目标，不把所有成品推向同一种“反 AI 风”。

欢迎通过 [Issue](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/new) 或 PR 推荐、纠错和删减；格式见 [CONTRIBUTING.md](CONTRIBUTING.md)。本目录只整理链接与编辑点评，不打包第三方规则；原项目内容遵循各自许可。
