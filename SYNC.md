# 副本与更新

根 README 是收录清单。GitHub 来源按 `owner/repo` 去重，保存在 `vendor/<owner>/<repo>/`；网页来源登记在 `pages.config.json`，Markdown 保存在 `vendor/articles/`。同一仓库的不同技能共用一份副本，不给普通网站虚构 Stars。

[仓库副本状态](vendor/README.md) · [网页 Markdown 状态](vendor/articles/README.md)

## 取得文件

普通克隆或下载本仓库 ZIP，就能取得已经提交的副本，不需要初始化 submodule。

```bash
git clone --depth=1 https://github.com/yzy-comfortuni/awesome-ai-taste.git
cd awesome-ai-taste
```

GitHub 副本是不带上游 Git 历史的源码快照，不是完整安装包。集合仓库按选定范围复制，具体目录和已复制 commit 见状态页。`git-tree` 模式只下载固定 commit 下的选定子树，并逐文件核对 Git blob SHA。

上游文件保留原字节、可执行位和许可证／归属声明，不由本仓库重新授权。字体、Git 属性、符号链接等非普通文件不复制；子模块不递归下载，LFS 只保留指针。图片、外部链接与依赖仍可能需要原项目提供。副本完整性校验不等于代码安全审计。

## 网页文章

每个非 GitHub 的主条目都应登记一个 Markdown 版本，并在根 README 放直达入口。登记表区分以下状态，不能混称“已完整归档”：

- **正文 Markdown**：有明确转载许可，从实际正文或官方替代文本转换，保留作者、来源、许可和格式修改说明。仅去除导航等非正文内容，不用摘要冒充正文。图片、视频保留外链，不是完整离线媒体包。
- **摘要 Markdown**：原文未获得全文转载许可时，保存有来源的编辑摘要，明确标为非全文。它仍是全文归档缺口，只有取得适用授权后才能升级为正文副本。
- **书籍阅读索引**：多页书籍不冒充单页文章。索引与全文转换分开记录。

当前首次登记覆盖根 README 的 9 个非 GitHub 主条目，按其实际正文入口处理：Google 取 Highlights；Le Guin 同时列官方介绍和第一章节选来源；日本数字厅使用官方可访问替代文本，不重新解释 PDF 图片；WIPO 为多页原书阅读索引。GitHub 自带的 Markdown 规则已在对应仓库副本中，不重复复制。

文件头标明作者、来源、类型、许可和人工审阅日期；`vendor/articles/manifest.json` 保存正文与文件摘要、转换版本和保存时间。日期不伪装为实时状态：正文同步会重新检查页面和许可；摘要只随编辑修改，不自动抓取受版权保护的全文。未登记的新网页条目、缺失文件和内容哈希不符会报错。

## 本次修复的两个来源

Chartability 的许可写在 `includes/footer.html`，不是根目录 LICENSE。经核对，保留其 CC BY-SA 3.0、确切许可文件 SHA 以及完整归属声明；没有将其改成 CC BY-SA 4.0。副本范围是 README、工作簿、归属页脚及配图。

huashu-art-motion 改为 README、SKILL 和 `references/` 的局部文档快照，避免下载整个媒体仓库。该副本不是可直接运行的动画引擎，不包含受独立限制的人物帧、示范视频、字体或单独授权的笔顺数据。

## 更新机制

沿用一个 GitHub Actions 工作流，只在本仓库相关内容 push 到 `main` 或手动触发时检查。没有 cron，也不监听其他仓库的推送。没有发生这两类触发时，副本不会自行更新。

GitHub 源码比较上游默认分支 commit、同步范围和本地内容，未变就不重复下载。网页正文检查实际内容；只有内容或受管理元数据改变才写入，不产生空提交。README 的 Stars 徽章另有图片服务缓存，不保证秒级实时。

精选任务负责决定收录什么，同步脚本负责维护已经登记的副本，不调用模型、不执行上游代码、不新增精选条目。

## 检查命令

Python 3.11+，仅使用标准库。统一入口会同时检查仓库和网页，并启用已核实的 Chartability 3.0 许可支持：

```bash
# 联网检查更新，不修改本地文件
python3 scripts/sync_library.py --check

# 更新副本、状态和首页入口；本命令不自动提交或推送
python3 scripts/sync_library.py --sync

# 离线核对已登记副本完整性及 Markdown 覆盖
python3 scripts/sync_library.py --verify

# 同时要求单页来源均为全文；存在摘要时返回失败并逐项列出
python3 scripts/sync_library.py --verify --require-full

python3 -m unittest discover -s tests -v
```

退出码：`0` 检查成功，`1`（仅 check）有更新，`2` 技术受阻／缺失；启用 `--require-full` 时也将摘要缺口记为 `2`。普通 verify 成功只表示已经登记的文件完整，不表示版权受限文章也有全文。新正文首次下载失败时不会提交不完整的整批输出；已有合格副本的来源失败时保留旧版本并报错。

`--check` 的新版本提示不等于许可证审核通过，复制时仍会检查。Actions 使用短期 `GITHUB_TOKEN`，只向 GitHub API 发送；网页下载不携带此令牌。当地手动查询遭遇匿名 API 限流时，可通过环境变量 `GH_TOKEN` 提供正常只读公共仓库凭据，切勿提交凭据。

## 维护

`sources.config.json` 记录仓库范围与已审核许可例外；`pages.config.json` 记录网页范围、许可依据、正文提取条件，或有明确标识的编辑摘要。新网站需先核对来源、许可、正文结构，再登记下载主机和测试，不安装网页提供的脚本。正文标记、许可标记或大小检查失败时保持错误，不能删除校验来伪造成功。

每个仓库归档下载最多 32 MiB、声明解包量最多 128 MiB、每份源码副本最多 32 MiB、单文件最多 8 MiB；网页下载最多 4 MiB。超限时缩小范围并如实注明，不把被截断内容当完整副本。许可文件变化需要重新阅读核验，不能只为消除红灯批准新 SHA。

不要直接修改生成的 `vendor/` 文件：在来源或登记配置中改正，再同步。删除根 README 中某个 GitHub 仓库的最后一个条目，会删除其受管理仓库副本；网页条目的移除还须同时撤销 `pages.config.json` 对应登记，并审查旧归档的去留。

工作流只提交 README 装饰信息、锁定文件和 vendor 输出，不自改代码或权限。只允许正常快进推送，并发冲突时失败退出，不强推覆盖别人的修改。不同来源保留不同许可；复制行为不构成作者对本仓库或生成结果的背书。
