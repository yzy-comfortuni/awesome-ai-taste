## Mermaid

Only when the user asks for it or supplies its source. `theme:'base'` with `themeVariables` from `getComputedStyle`, re-rendered on a theme switch. Quote labels with punctuation; `<br/>`, not `\n`. Natural size in a scroll box. No page class named `.node`, `.label`, `.nodeLabel`, `.edgeLabel`, `.cluster`, `.marker`, `.note`, `.actor`, or `.commit`.

## Images

Optional, for a hero or concept art when `surf` or another image tool exists; never for data or structure. Never write base64 yourself: put `<img src="hero.png" alt="…">` in the source and, after each render, run:

```sh
node -e 'const fs=require("fs"),[f,i]=process.argv.slice(1);fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(`src="${i}"`,`src="data:image/png;base64,${fs.readFileSync(i,"base64")}"`))' <name>.html hero.png
```

## Older recipes

Fetch only for mechanics; keep this skill's look: `https://raw.githubusercontent.com/nicobailon/visual-explainer/v0.11.0/plugins/visual-explainer/` + `references/css-patterns.md` · `references/libraries.md` (Chart.js, anime.js) · `references/responsive-nav.md` (sticky TOC) · `references/slide-patterns.md` · `templates/architecture.html` · `templates/data-table.html` · `templates/mermaid-flowchart.html` (zoom and pan).
