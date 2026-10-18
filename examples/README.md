# 规则应用示例

需要对照改稿时再读这里；使用清单不必先做练习。示例包含虚构或合成输入、参考输出和反例，不能当作真实业务、研究结果或统一审美标准。早期案例源于[体验反馈](https://github.com/yzy-comfortuni/awesome-ai-taste/issues/7)，不是体验者原始附件。

[专利与论文](professional.md) · [小说、诗歌、剧本](creative.md) · [界面](ui.md) · [文字](writing.md) · [图表](charts.md) · [动画与演示](motion.md)

分类页的“示例”链接直接到对应段落。原作者的正文与示例仍在各自副本中，这里是本仓库编写的补充材料。

## 复查具体问题

```bash
# 重新计算排行跳变与位置转场；需要 Node.js，不联网
node examples/rank-transition.js

# 检查现有示例链接、事实反例、对比度及排行逻辑
python3 -m unittest discover -s tests -v

# 从目录生成分类页，并检查生成结果
python3 scripts/task_views.py --sync
python3 scripts/task_views.py --verify
```

[交互示例](review-demo.html)包含表单首错焦点、允许缩放和排行转场。它是待在具体浏览器中检查的页面，不是浏览器验收报告。[事实反例](fact-cases.json)用于发现部分信息遗漏；字符串断言不能证明语义等价，READY 的逆命题另用真假表说明。

`manifest.json` 只登记已经提供的示例与必要提醒，不要求覆盖每项收录。存在的登记仍须通过文件、锚点和重复检查；没有示例不代表资源不可用。完整收录以 [CATALOG.md](../CATALOG.md) 为准。
