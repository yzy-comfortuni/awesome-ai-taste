# Changelog

All notable changes to taste-skill live here. The repo follows SemVer-ish discipline: experimental pre-releases iterate freely; stable releases lock the API.

---

## 2.0.0 - 2026-10-13

### Repo

- `taste-skill` (install name `design-taste-frontend`) is now **v2**, a new skill (see below). The install name did not change.
- The previous default, v2 (experimental), is preserved as `taste-skill-v2-experimental` (install name `design-taste-frontend-v2-experimental`).
- v1 is unchanged at `taste-skill-v1` (install name `design-taste-frontend-v1`).
- `CHANGELOG.md` (this file).
- Codex can install the collection as a plugin (`.codex-plugin/`, `.agents/plugins/`).
- Plugin manifests are at 2.0.0.
- `skill.sh` accepts install names as well as folder names.
- Removed: unused sponsor and README images, the one-off asset scripts in `scripts/`, and the old Copilot instructions, which contradicted v2.

---

## v2 - the new default for `taste-skill`

v2 is not an edit of the earlier files. It is a new skill built from a study of 247 curated sites (One Page Love and Awwwards Sites of the Day), and it is a folder, not a single `SKILL.md`: instructions, nine reference files, a library and four zero-dependency scripts.

### How it works

1. **Inventory.** Before any design, the agent lists what only this client has: the name and what it means, the street, the numbers, the one constraint.
2. **Draw.** `scripts/draw.mjs` deals three of 20 researched directions; the agent picks the one that can carry something from the inventory, and the script deals the rest from the library (48 hero compositions, 172 section compositions, 44 type systems of free fonts, 56 palettes, 420 photographs, 11 motions, 181 studied reference sites). Under every dealt blueprint it prints where that blueprint disagrees with the house rules.
3. **Idea and one live thing.** One sentence tying the client's own material to the direction's device, checked against the nearest competitor, plus one thing the visitor can do on the page.
4. **Build** with full content; when there are no photographs of its own, real pictures of the subject's world come from open collections (`scripts/assets.mjs`), and only what no honest picture exists of is drawn in code.
5. **Gate.** `scripts/lint.mjs` scans the source; `scripts/inspect.mjs` opens the page in a real browser at 1440 / 768 / 390, measures it and fails it on: eyebrow labels, monospace outside code, 01/02/03 numbering, hairlines and outlined boxes, gradients, resting shadows, cream-and-terracotta or violet palettes, headlines over two lines, text under 13px, no focal point on the first screen, near-empty screens, text covered or cut off, sideways overflow.
6. **Look.** The agent critiques its own screenshots with an Awwwards-weighted rubric and fixes the top three problems, up to three rounds.

### Real pictures from open collections

Agents with no photographs used to draw everything in SVG. `scripts/assets.mjs` searches Openverse, Wikimedia Commons, the Art Institute of Chicago and The Metropolitan Museum of Art without API keys and prints, for each find, a direct image URL, the source page, its size, creator, licence and a one-line credit. By default it keeps only licences that allow commercial use (CC0, public domain, CC BY, CC BY-SA) and checks that every image it prints loads; `--source`, `--license`, `--orientation` and `--min-width` narrow the search. `--get <ref>` downloads a picture into the project's `assets/` and records its credit in `assets/credits.json`; `--credits` prints the footer credit line and the list for the report.

The imagery order is now: the project's own; generated; **real pictures of the subject's world found in open collections** (its street in old postcards, old maps, its materials, engravings of its trade, museum objects of its kind); drawn in code, for what no honest picture exists of; the dealt atmosphere photographs; type and colour alone. A found picture is never presented as the client's own product, room, dish, person or team, and every one is credited on the page and listed in the report. The direction sheet suggests first queries built from the brief (`"ghent postcard"`, `"ghent old map"`), and `references/imagery.md` §3 covers what to search for, what makes a good find, creative uses and the licences.

### Pictures, footage and motion are required

Testing showed agents skip pictures and motion when nothing forces them: ten pages built with the first v2 carried no real pictures at all and almost no motion. The inspector now enforces both:

- `few-pictures` (fail): fewer than four real pictures on the page (photographs, archival images, footage, raster artwork; for software, cropped interface fragments). SVG drawings do not count. `no-real-pictures` and `no-footage` warn when a page has fewer than two real photographs or no video.
- `still-page` (fail under 8, warn under 16): counts the distinct elements that actually move while the page loads and is scrolled, from CSS animations, transitions, Web Animations and script-driven transforms.
- `assets.mjs --video` finds open-licence footage (Wikimedia Commons, the Internet Archive, NASA) for a muted looping clip.

The motion guidance changed with it: one loud signature move, plus a choreographed entrance for the parts of every section, feedback on every control, and one moving picture. The old "one moment and nothing else" budget is gone; identical fade-ups on every block are still banned.

### Requirements

Node 22+ and an installed Chrome, Edge or Chromium for the inspector (nothing is installed; it drives the browser over the DevTools protocol). `draw.mjs`, `lint.mjs` and `assets.mjs` run on Node 18+; `assets.mjs` needs network access and no API keys. Working files go to `.taste-skill/` in the project; the draw history lives in `~/.taste-skill/history.json`.

### How it was tested

Five rounds of blind comparisons on six briefs: a fresh agent built each page with no skill, with v2, and on three briefs with another design skill; a separate agent judged anonymous screenshots on the Awwwards weighting. Final round, three briefs: v2 7.7, no skill 7.8, other skill 7.2, with v2 ranked first on two of three. Under the inspector the v2 pages measured 0 failures each and the no-skill pages 8 to 13. Limits: one juror per brief per round (about half a point of noise), model jurors, and the final round's briefs had been used in the round before. The full record is in `skills/taste-skill/references/research.md` §11.

### Cost

A full run with the look-and-fix loop takes an agent roughly 30 to 45 minutes and a few hundred thousand tokens, most of it finding or drawing pictures when a project has no photographs.

---

## v2 (experimental) - the previous default, now `taste-skill-v2-experimental`

v2 (experimental) is a substantial rewrite of the original taste-skill. It keeps the dial-driven philosophy (`DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`) and adds structure, hard rules, and concrete implementation patterns the agent can actually follow.

**This was a pre-release.** It was the default install until v2 replaced it, and it is kept as `taste-skill-v2-experimental` for projects that depend on it. It is no longer iterated.

### What's new in v2 (experimental)

**New sections**

- **§0 Brief Inference** - before any code, the agent reads the room (page kind, vibe words, references, audience, constraints) and declares a one-line design read. Anti-default discipline.
- **§2 Brief → Design System Map** - when a brief reads as Material / Fluent / Carbon / Polaris / Atlassian / Primer / GOV.UK / USWDS / Bootstrap / Radix / shadcn / Tailwind, reach for the **official** package. When the brief is an aesthetic (glassmorphism, bento, brutalism, editorial, dark tech, aurora, kinetic typography), use web standards and label the implementation honestly. Apple Liquid Glass is documented as an approximation, not an official package.
- **§8 Dark Mode Protocol** - dual-mode by default, token strategy declared per project, contrast and hierarchy parity enforced.
- **§11 Redesign Protocol** - mode detection (Greenfield / Preserve / Overhaul), audit before touching, modernisation levers in priority order, what never changes silently (URL structure, nav labels, form field names, brand wordmark, legal copy).
- **§12 The Block Library (Contract)** - schema for iteratively adding real, source-backed block implementations (hero, feature, social-proof, pricing, cta, footer, portfolio, transition, navigation).
- **§13 Out of Scope** - explicit list of what taste-skill is NOT for (dashboards, data tables, multi-step forms, code editors, native mobile, realtime collab UIs).
- **§14 Final Pre-Flight Check** - hard checklist. Every box must honestly pass before shipping.

**Hardened bans (Section 9, "AI Tells")**

- **§9.G Em-Dash Ban (complete)** - zero em-dashes (`—`) anywhere on the page. Headlines, eyebrows, pills, body copy, quotes, attribution, captions, button text, alt text. Use a hyphen (`-`) or restructure the sentence. This was the single most-violated stylistic Tell in pre-v2 testing.
- Section numbering eyebrows (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`) banned outright.
- Version labels in hero (`V0.6`, `INVITE-ONLY PREVIEW`, `BETA`) banned unless the brief is explicitly a product launch.
- Photo-credit captions as decoration (`Field study no. 12 · Ines Caetano`) banned unless real attribution.
- Decoration text strips at hero bottom (`BRAND. MOTION. SPATIAL.`) banned.
- Pills / labels overlaid on images banned.
- Version footers (`v1.4.2`, `Build 0048`) banned on marketing pages.
- Locale / city-name / time / weather strips (`Lisbon, working with founders`) banned for 99% of briefs.
- Scroll cues (`Scroll`, `↓ scroll`, `Scroll to explore`) banned.
- Zero decorative status dots by default.
- `border-t` + `border-b` on every row of long lists banned (use a different UI component).
- Scoring / progress bars with filled background tracks banned as comparison visuals.
- Div-based fake product UI (fake task lists / dashboards / terminals built from styled divs) banned.
- Floating top-right sub-text in section headings banned.
- Hand-rolled SVG icons strongly discouraged; use Phosphor / HugeIcons / Radix / Tabler.

**Hardened design rules**

- **Color Consistency Lock** - one accent across the whole page; no random color swaps in section 7.
- **Shape Consistency Lock** - one corner-radius system per page.
- **Button Contrast Check** - every CTA passes WCAG AA contrast (no white-on-white).
- **Hero Discipline** - headline ≤ 2 lines, subtext ≤ 20 words and ≤ 4 lines, CTAs visible without scroll, font scale planned with image size.
- **Navigation** - single line at desktop, height ≤ 80px.
- **"Used by / Trusted by"** logo wall lives UNDER the hero, uses real SVG logos (Simple Icons / devicon), never plain text wordmarks.
- **Section-Layout-Repetition Ban** - across 8 sections, at least 4 different layout families.
- **Bento Cell Count Rule** - N items = exactly N cells; no empty middle or trailing cells.
- **Page Theme Lock** - one theme (light / dark / auto) for the whole page; no mid-page light/dark flips.
- **Italic Descender Clearance** - italic display words with `y g j p q` need `leading-[1.1]` minimum and `pb-1` reserve.
- **Long lists need a different UI component** - `<ul>` + `divide-y` for > 5 items is the lazy default; reach for cards / tabs / marquee / carousel / scroll-snap pills.
- **Long-list-divider-overuse banned** - no `border-t` + `border-b` on every row.

**Animation discipline**

- Motion library standardised on **Motion** (`motion/react`, the rebrand of Framer Motion). Legacy `framer-motion` package still works as alias.
- **§5.A GSAP Sticky-Stack** - canonical code skeleton (`start: "top top"`, `pin: true`, `scrub: true`, transform driven by NEXT card's trigger).
- **§5.B GSAP Horizontal-Pan** - canonical code skeleton (`start: "top top"`, `pin: true`, `end: "+=" + distance`, `scrub: 1`).
- **§5.C Scroll-Reveal Stagger** - lighter Motion-only pattern using `whileInView`. Use this for simple reveals; save GSAP for actual pinning/scrubbing.
- **§5.D Forbidden Animation Patterns** - `window.addEventListener('scroll')`, custom scroll calculations in React state, `requestAnimationFrame` loops touching React state. Banned outright.
- **Reduced motion mandatory** for anything `MOTION_INTENSITY > 3` - wrap in `useReducedMotion()` or `@media (prefers-reduced-motion: reduce)`.
- **"Motion claimed, motion shown"** - pages claiming `MOTION_INTENSITY > 4` must actually animate; otherwise drop the dial to 3 and ship clean static.

**Stack updates**

- Tailwind v4 default; v3 only when the existing project demands it.
- Motion replaces Framer Motion as the recommended import path.
- Icons: Phosphor / HugeIcons / Radix / Tabler (in priority order). Lucide discouraged. Hand-rolled SVG icons banned.

### What's the same

- Three dials (`DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`) - same spirit, expanded with preset matrix and inference rules.
- Anti-slop philosophy - same direction, harder enforcement.
- Performance guardrails - `transform`/`opacity` only, no `top/left/width/height` animation, hardware acceleration.

### Why we made v2 (experimental) the new default

Pre-v2, the original taste-skill set the right direction but was easy for agents to skim past. Production testing showed the same Tells emerging across builds (em-dash everywhere, section-number eyebrows, "Quietly in use at", decorative dots, fake screenshots out of styled divs, broken GSAP scroll triggers).

v2 closes those gaps with hard rules, canonical code skeletons, and a pre-flight checklist the agent must run. It is the version we now recommend.

### How to pin to v1 if you need it

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
```

This installs the original SKILL.md unchanged.

### Stability note

v2 (experimental) is the new default AND it is actively iterating. Refinements may land in any pre-release while we converge on v2.0.0 stable. Breaking changes (rename of install name, removal of sections) will be batched and called out clearly when v2.0.0 stable cuts.

---

## v1 - the original taste-skill

The original release. Dial-driven philosophy, anti-slop rules, reference vocabulary of pattern names. Preserved at `skills/taste-skill-v1/` and installable as `design-taste-frontend-v1`.
