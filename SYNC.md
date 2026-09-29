# 副本与更新

README 是唯一收录清单。同步脚本从每个条目的第一个链接识别 GitHub 仓库，按 `owner/repo` 去重；同一仓库下的多项技能只维护一份副本。非 GitHub 网站保留原链接，不抓取整站，也不虚构 Star 数。

## 使用副本

已经成功同步的条目会出现「副本」链接，也可在 [副本状态](vendor/README.md) 查看全部来源、Star 数、实际复制的 commit、同步范围和受阻原因。

普通克隆或下载本仓库的 ZIP 即可取得已经提交的副本，不需要初始化 submodule：

```bash
git clone --depth=1 https://github.com/yzy-comfortuni/awesome-ai-taste.git
cd awesome-ai-taste
# 源文件位于 vendor/<owner>/<repo>/
```

这里的 copy 是**不带上游 Git 历史的源码快照**，不是嵌套 `.git`，也不是完整软件安装包。常规小仓库按仓库范围复制；Anthropic、FT、K-Dense 和 Baoyu 等集合仓库只复制收录目录及其许可证/归属声明，准确范围见状态页。脚本从固定 commit 的归档读取内容，不会在读取期间混入不同版本。

上游文件保持原字节及可执行位，不改写正文；各来源保留自己的 LICENSE、NOTICE 等声明，并不被本仓库重新授权。Git 属性文件、字体、符号链接等非普通文件不复制；不递归下载子模块，LFS 仅保留指针，完整排除记录见锁定文件。因此图片、外部链接、字体或依赖仍可能需要原项目提供；读取 skill 不等于完成安装，更不等于已做安全审计。

## 更新机制

- **Stars**：README 的 Shields 徽章独立刷新，存在服务端/图片代理缓存，不保证秒级实时。锁定文件和状态页同时保存最近成功检查的数值。
- **源码**：GitHub Actions 每 6 小时检查一次（UTC 00:23 / 06:23 / 12:23 / 18:23）；README 新增条目和同步脚本/配置变更也会触发。可在 Actions → Sync source snapshots → Run workflow 手动运行。
- **增量**：比较默认分支 commit SHA；SHA、范围及本地内容均未变化时不重新下载。新快照校验后替换旧目录，删除上游已删除的文件；没有文件或元数据变化就不产生空提交。

定时任务可能被 GitHub 延迟；这是轮询，不是上游实时推送。上游同步不负责精选、不调用模型，也不会新增条目或改写介绍。原有 ChatGPT「每日精选」仍只负责每天选一条。

## 手动检查与同步

Python 3.11+，仅使用标准库，无需安装依赖：

```bash
# 只查询上游状态，不修改 README、锁定文件或副本
python3 scripts/sync_sources.py --check

# 更新副本、Star 数快照、徽章及状态页（不自动 git commit/push）
python3 scripts/sync_sources.py --sync

# 离线验证所有已记录副本的内容摘要
python3 scripts/sync_sources.py --verify

# 只补齐 README 徽章，无网络请求
python3 scripts/sync_sources.py --badges-only

python3 -m unittest discover -s tests -v
```

`--check` 退出码：`0` 无变化、`1` 有可更新来源、`2` 检查受阻。`--check` 发现新 commit 不代表它已通过许可/归档校验；实际复制时会再次检查。`--sync` 退出码 `2` 表示至少一项受阻，其他成功来源仍可保存。个人本地查询可能碰到 GitHub 的匿名 API 限流，可通过环境变量 `GH_TOKEN` 提供只读公共仓库访问凭据；不要提交令牌。Actions 使用仓库自带的短期 `GITHUB_TOKEN`，不另建 PAT。

## 维护文件与边界

`sources.config.json` 只维护少量范围与已核验的许可证例外，不必为每个新增资源手工登记。`sources.lock.json` 记录上游 SHA、实际复制 SHA、许可证 blob SHA、Star 数、内容 SHA-256、大小和排除项；它是状态，不是并发锁。`vendor/README.md` 是自动生成的状态页。

没有明确许可、未支持的许可、仓库转移、路径失效、限流、网络错误或超限时，标明受阻并保留上次成功副本，不创建假副本、不覆盖好版本。每个下载最多 32 MiB，解包声明量最多 128 MiB，每份副本最多 32 MiB，单文件最多 8 MiB；超限需人工缩小同步范围。归档路径经过校验，不运行上游脚本、hooks、安装器、CI 或 skill 指令。

许可证文本发生变化时暂停该来源。人工阅读确认后，可在 `sources.config.json` 的对应项填写 `license`（`path`、确切 blob `sha` 和已支持的 `spdx`）再运行；不要只为消除红灯盲目批准。自动识别不是法律意见，也不替代对文件内第三方权利和许可例外的检查。

不要直接修改 `vendor/` 文件：下次同步会恢复上游版本。删除 README 中某个仓库的最后一个条目，会删除该仓库的受管理副本。工作流使用单组并发控制，仅提交 README 的装饰信息、锁定文件和 vendor；不改动同步代码或工作流。推送只允许快进，并发冲突时失败退出，不强推、不丢弃他人修改。工作流会保存成功项和明确的失败状态，再将受阻标为失败；红色运行记录不等于所有副本都丢失。
