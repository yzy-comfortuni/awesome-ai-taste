# 带一份输入，用一条规则

这一轮的 56 个小练习对应体验报告中的全部资源，不新增资源。案例根据 [issues #1–#6](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/7) 的问题重新编写，含输入、参考输出和反例边界；不是体验者原始附件、历史运行日志或新的真实业务数据，也不是文学评分标准。

[专利与论文（10）](professional.md) · [小说、诗歌、剧本（11）](creative.md) · [界面（8）](ui.md) · [文字（10）](writing.md) · [图表（7）](charts.md) · [动画与演示（10）](motion.md)

先看对应分类页的用途、输入输出和环境，再打开一个练习。只需改一段文字时，不安装整套上游工具。已获许可的原文仍放在原副本位置；这里不重新复制原作者示例。

## 可运行的回归

```bash
# 纯函数排行复现，需要 Node.js；不联网
node examples/rank-transition.js

# 包括练习覆盖、事实夹具、条件反例、对比度和排行检查
python3 -m unittest discover -s tests -v

# 生成分类页并检查它们与目录、练习入口一致
python3 scripts/task_views.py --sync
python3 scripts/task_views.py --verify
```

[交互练习页面](review-demo.html)演示首错焦点、允许缩放与两种排行位置，可在允许的本地浏览器环境打开；它不是截图或已通过的浏览器验收报告。本轮浏览器导航被 `ERR_BLOCKED_BY_ADMINISTRATOR` 拦截，未换通道重试。

[事实夹具](fact-cases.json)保留可接受改稿和故意的错误输出。字符串断言只会发现部分遗漏；READY 逆命题用显式真假表展示，未实现自然语言语义判定器。源码测试、浏览器检查、上游完整运行与真人体验分别记录，不能互相替代。

`manifest.json` 仅维护这些练习的用途、入口与环境，不是另一份收录目录。收录与规则仍以根目录 `CATALOG.md` 为准。
