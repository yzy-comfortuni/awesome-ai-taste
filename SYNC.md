# 副本与更新

[仓库副本](vendor/README.md) · [网页 Markdown](vendor/articles/README.md)

克隆或下载本仓库即可取得已保存的文件，无需初始化 submodule：

```bash
git clone --depth=1 https://github.com/yzy-comfortuni/awesome-ai-taste.git
cd awesome-ai-taste
```

## 副本包含什么

根 README 是收录清单。GitHub 来源按 `owner/repo` 去重，存放在 `vendor/<owner>/<repo>/`。同一仓库的多个技能共用一份副本；具体范围和已复制的 commit 见状态页。

仓库副本不带上游 Git 历史，也不是安装包。原文件的字节、可执行位、许可证和署名保持不变。字体、Git 属性、符号链接等非普通文件不复制；子模块不递归下载，LFS 只保留指针。图片、依赖和外部链接可能仍需联网。完整性校验只检查文件，不能证明代码安全或使用效果。

网页来源登记在 `pages.config.json`，保存到 `vendor/articles/`，并在根 README 链接到对应文件。GitHub 已有的 Markdown 不重复归档。

| 类型 | 内容 |
| --- | --- |
| 正文 Markdown | 获准转载的正文或官方替代文本，保留作者、来源、许可和格式转换说明；图片、视频以外链保留。 |
| 摘要 Markdown | 本仓库编写的摘要，不是全文。取得适用转载许可后才能改存全文。 |
| 书籍阅读索引 | 多页书籍的章节入口，不含原书全文。 |

Google 条目仅保存 Highlights 单页；Le Guin 条目涵盖官方介绍和第一章节选的摘要；日本数字厅采用官方替代文本，不包含 PDF 版面和图片；WIPO 条目是原书阅读索引。

文件头记录作者、来源、类型、许可和审阅日期；`vendor/articles/manifest.json` 记录内容哈希、转换版本和保存时间。正文同步时重新检查页面和许可；摘要只随编辑修改。普通校验通过不表示摘要来源已有全文。

## 来源范围

Chartability 保存 README、工作簿、配图和 `includes/footer.html` 中的归属声明；许可为 CC BY-SA 3.0，按已审核的许可文件 SHA 核对。

huashu-art-motion 只保存 README、SKILL 和 `references/`。人物帧、示范视频、字体及另有授权的笔顺数据不在副本内，不能把这份文档快照当作动画引擎。

## 更新与检查

现有工作流只在本仓库相关内容 push 到 `main` 或手动触发时运行；没有 cron，也不监听上游仓库的推送。精选任务决定收录内容，同步脚本维护副本，不调用模型或执行上游代码。

脚本需要 Python 3.11+，仅使用标准库。手动命令不会自动提交或推送：

```bash
# 联网查更新，不写文件
python3 scripts/sync_library.py --check

# 更新副本、状态和 README 入口
python3 scripts/sync_library.py --sync

# 离线检查文件完整性和 Markdown 覆盖
python3 scripts/sync_library.py --verify

# 额外列出仍只有摘要的单页来源；有缺口即失败
python3 scripts/sync_library.py --verify --require-full

python3 -m unittest discover -s tests -v
```

退出码：`0` 成功；`1` 仅用于 `--check`，表示有更新；`2` 表示受阻、缺失或校验失败。启用 `--require-full` 后，摘要也算全文缺口，返回 `2`。

仓库的 commit、范围和本地内容未变时不重复下载；网页正文按内容和受管理元数据判断是否写入。Stars 徽章有独立缓存，不是实时数值。发现上游更新不等于许可审核通过，复制时仍须检查。

新正文首次下载失败时，不发布不完整的整批输出；已有副本更新失败时，保留旧版并报错。工作流只提交 README 装饰、锁定文件和 `vendor/` 输出；并发冲突时退出，不强推。

## 维护约束

`sources.config.json` 管理仓库范围与已审核许可；`pages.config.json` 管理网页入口、许可、提取条件和编辑摘要。修改这些来源后再同步，不直接改生成的 `vendor/` 文件。第三方内容仍按各自许可使用，收录不代表原作者背书。

新网站先核对来源、许可和正文结构，再补下载主机与测试；不安装网页提供的脚本。许可文件改变时重新审阅。正文、许可或大小校验失败时保留错误，不删除校验或把截断内容当全文。`git-tree` 模式按固定 commit 下载选定子树，并逐文件核对 Git blob SHA。

下载上限：仓库归档 32 MiB，声明解包量 128 MiB，单份副本 32 MiB，单文件 8 MiB，网页 4 MiB。超限时缩小范围并说明。

Actions 的短期 `GITHUB_TOKEN` 只发给 GitHub API，不随网页请求发送。手动查询可用环境变量 `GH_TOKEN` 提供正常只读凭据；不要将凭据写进仓库。

删除根 README 中某仓库的最后一个条目，会删除其受管理副本。移除网页条目时，同时撤销 `pages.config.json` 对应登记，并检查旧归档是否保留。
