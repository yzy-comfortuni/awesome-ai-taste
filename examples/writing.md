# 文字表达：十个小练习

[返回练习入口](README.md)。全部输入为原创教学设定，不是真实发布、测量或用户资料。依据[文字体验报告](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/4)中的故障类型另写；不是其附件或首次运行日志。参考改稿不是唯一答案。

<a id="w1"></a>
## Stop Slop：保留限定与未知主体

输入：`A game-changing update. In a pilot with 12 reviewers, it probably reduced review time. We tested CSV only. The patch was approved on Tuesday; the approver was not recorded.`

参考输出：`In a pilot with 12 reviewers, the update probably reduced review time. We tested CSV only. The patch was approved on Tuesday; the approver was not recorded.`

只删赞美。12、probably、only、Tuesday 和批准人未知必须保留。`probably` 换成 `may` 也改变确定程度；`The team approved` 增加了没有依据的主体。不能因禁副词或被动句而接受这两种改法。[勘误](../ERRATA.md#facts)优先于文风偏好。

<a id="w2"></a>
## Humanizer：事实不是修辞材料

输入：`A breakthrough: the import supports CSV, TSV, and JSON. Six of eight editors said it felt faster; no timings were measured. Files over 10 MB still fail.`

参考输出：`The import supports CSV, TSV, and JSON. Six of eight editors said it felt faster; no timings were measured. Files over 10 MB still fail.`

三项是独立功能，末句是新限制，不能删。主观反馈不变成性能实测。另做范围反例：`over 3,000` 不能缩成 `3,000`。没有实现材料时，不把“改进查找”补写成哈希表与 O(1)。这些检查不能判断文章是否由 AI 撰写。

<a id="w3"></a>
## Humanizer-zh：区分报告者与原因判断者

输入：“我们正在对仅限 Windows 的版本进行测试。社区报告了闪退。该问题被认为可能与内存有关，原因尚未确认。示例命令是 `rebuild --dry-run`。”

参考输出：“我们正在测试仅限 Windows 的版本。社区报告了闪退。该问题被认为可能与内存有关，原因尚未确认。示例命令是 `rebuild --dry-run`。”

报告闪退的人不必就是判断原因的人。保留正在、仅限、可能、未确认和命令原字节；不要把被动归因强行改为“社区确认内存导致闪退”。代码、路径、JSON 与链接目标先划为不可改区域。

<a id="w4"></a>
## 中文技术文档：拆中心，不丢权限

输入：“工具仅支持 Windows 11，可离线导出 CSV，导出需要导出权限，查看权限不包含导出权限，单个文件不得超过 10 MB，失败任务保留 24 小时。”

参考输出：

> 工具仅支持 Windows 11，可离线导出 CSV。单个文件不得超过 10 MB。
>
> 用户需要导出权限。查看权限不包含导出权限。
>
> 失败任务保留 24 小时。

每段各讲环境与容量、权限、失败记录。不能为消灭否定句删掉查看/导出权限差异。屏幕物理行数随字号和宽度变化，不设统一四行、七行及格线。

<a id="w5"></a>
## 中文排版：只处理正文

输入：`请在github下载Windows版,大小20MB。CPU为15 %。豆瓣FM。`；另有代码块 `{"label":"Windows版","max_size":20}`。

参考正文：“请在 GitHub 下载 Windows 版，大小 20 MB。CPU 为 15%。豆瓣FM。”代码块不变。

先隔离代码、数据、标识符、链接目标与官方名称。本仓库中文正文采用中英文、中文数字间空格；其他项目已有约定时遵从该约定，不让两个排版指南反复覆盖。英文完整引文内部标点不随中文全角化。

<a id="w6"></a>
## Google Highlights：条件前置，不倒置条件

输入：`Select Rebuild. Use this procedure only for a sandbox with a saved snapshot. Confirming replaces preview files. A successful run ends with READY. Do not retry after SNAPSHOT_MISSING.`

参考输出：

> Use this procedure only for a sandbox with a saved snapshot. Confirming replaces preview files.
> 1. Select Rebuild.
> 2. Confirm.
>
> A successful run ends with READY. Do not retry after SNAPSHOT_MISSING.

`成功 → READY` 没有给出 `READY → 成功`。反例是失败任务也可能输出 READY：它不违反原句，却推翻逆命题。检查前后逻辑关系，不只是两边都含 READY。这里没有实际执行控制台操作。

<a id="w7"></a>
## 长文档：导语和正文互相兑现

输入提纲：“项目历史／运行检查／配置／术语／导出／使用条件”。事实：读者已会上传 CSV；本文只查重复 ID；不改数据；导出的是检查记录；配置文档未提供。

参考提纲：“准备 CSV／检查重复 ID／处理不确定项／导出检查记录”。导语：“本文供已会上传 CSV 的读者使用，介绍重复 ID 检查和记录导出，不讲管理员配置。检查不会改动数据。”

逐一对照正文是否完成这些任务。遇到要保留哪条重复记录无法判断的情况，写明交给数据负责人；没有配套文档就说未提供，不造一个链接。这是小提纲练习，不是几十页长文的查找时间实测。

<a id="w8"></a>
## ADR：状态比标题整齐更重要

输入：“两名维护者提出从 JSON 改为 SQLite。尚未批准，未压测；会增加迁移和备份工作；不实现跨设备同步。”

参考记录：“状态：提议中。决定：提议改用 SQLite。后果：需维护迁移和备份；跨设备同步仍未覆盖；性能未知。”

另做明确虚构的状态链：R1 proposed；获得审批记录后 R1 accepted；R2 取代它时，R1 标 superseded 并指向 R2，保留原理由。不能在没有审批或新记录时直接推进状态。收益可未知或中性，不必填满优点清单。

<a id="w9"></a>
## README Checklist：实际走一次入口

使用本仓库已有的[中文改稿示例](edit-zh.md)：读输入，按保留事实的规则写一版，然后与示例结果核对。第一次使用到此结束；更复杂的反例在本页其他节，不必全部塞回 README。

最小产出是改稿和一句未改变哪些事实的说明；不执行来源中的订阅、联系作者或定时提醒。检查链接是否真到文件，不把“说明写出来了”当成首次使用已验证。

<a id="w10"></a>
## Diátaxis：操作指南仍需分支和停止条件

输入事实：失败任务才可重试；权限不足须管理员处理；网络中断可重试；运行中的任务只能等待；其他错误未定义。重试创建新任务，旧任务保留。

参考输出：“先看任务状态，运行中则等待。失败后读日志：权限不足先恢复权限，网络中断可重试，其他错误停止并查明原因。重试会创建新任务；新任务完成后再下载结果。”

原理、所有参数可另页解释，但必要条件和风险不能移走。RST 选读没有全站图片及跨页内容；完整语境见[原站 how-to 章节](https://diataxis.fr/how-to-guides/)。本练习没有任务服务，不能声称重试成功。

## 如何检查

[fact-cases.json](fact-cases.json)保存可机械核对的保真反例；[checks.py](checks.py)只检查指定片段和明确给定的真假关系，不解析自然语言。关键词全部保留仍可能发生条件倒置，最终要逐句核对语义；通过夹具测试不代表所有改稿保真。
