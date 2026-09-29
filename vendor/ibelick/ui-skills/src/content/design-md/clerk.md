# Clerk Design

> Clerk's brand and design system for humans and AI agents. The signature color is purple `#6c47ff`. The marketing site runs on **Seed**, the dashboard on **Mosaic**, and embedded auth components on the **clerk-js appearance API**. This document covers the marketing brand system.

**Canonical sources**

| Surface | System | Source |
|---|---|---|
| Marketing site (clerk.com) | Seed 1.0 | `src/styles/globals.css` |
| Dashboard (dashboard.clerk.com) | Mosaic | `--font-mosaic`, system-UI fonts |
| Auth components (clerk-js) | Appearance API | `appearance.variables` + `appearance.elements` |
| Downloadable brand assets | — | [clerk.com/brand-assets](https://clerk.com/brand-assets) |
| Docs | — | [clerk.com/docs](https://clerk.com/docs) |

---

## Overview

Clerk is a user management platform. The design system reflects its product philosophy: give developers something they can drop in and ship, then get out of the way. Every decision — tight letter-spacing on headings, layered shadows, restrained motion — serves precision and trust, not decoration.

---

## Brand & Voice

### Philosophy

The brand addresses builders directly. Copy is concrete, not aspirational. Use numbers (`50,000 MRU`, `$20/mo`, `5 minutes`) instead of superlatives. Prefer specificity as a trust signal.

The mission: **"Clerk is on a mission to solve user management once and for all."**

### Voice & Tone

- **Direct.** Lead with the user's problem, follow with the benefit. "Subscription billing, without the headache."
- **Technical.** Assume the reader is a developer. Spell out MRU on first use; SSO and MFA need no expansion.
- **Grounded.** Avoid "powerful", "robust", "seamless". Use "drop-in", "purpose-built", "straightforward", "invisible".
- **Collegial.** First-person plural in changelogs and blog posts ("we're excited to announce"). Contractions are welcome everywhere.
- **Precise.** Tricolon negations: "No payment code, no webhooks, no sync logic." Em dash with spaces for asides: " — so you can launch faster."

### Content Rules

| Rule | Do | Don't |
|---|---|---|
| Case | Sentence case for all headings | All-caps headlines |
| Numerals | Always numerals for metrics: `50,000`, `7 minutes`, `$20/mo` | Spell-out style: "seven minutes" |
| Oxford comma | "invitations, RBAC, and SSO" | "invitations, RBAC and SSO" |
| Product names | Title case: `Clerk Dashboard`, `Clerk Billing`, `Clerk CLI` | Title-casing feature descriptions |
| Primary CTA | "Start building for free" (hero), "Start building" (interior) | "Sign up now!", "Get started today!" |
| "First Day Free" | Quoted proper noun in billing copy | lowercase variant |
| Exclamation marks | FAQ enthusiastic answers only | Main page copy |
| Billing unit | "Monthly Retained Users (MRU)" on first mention | "MAU" when referring to Clerk's metric |
| Legal name | "Clerk, Inc." | "Clerk Inc" or "Clerk" as legal entity |

---

## Color

### Brand Purple

The signature color is `#6c47ff` (purple-500). Use it for primary CTAs, the logomark fill, section eyebrow labels, and key accents.

| Token | Hex | Use |
|---|---|---|
| purple-50 | `#f4f2ff` | Subtle tint backgrounds |
| purple-100 | `#eae8ff` | Light tag/badge background |
| purple-200 | `#d7d4ff` | Borders on light surfaces |
| purple-300 | `#bab1ff` | Code syntax: keywords/functions (dark) |
| purple-400 | `#9785ff` | Hover state on light backgrounds |
| **purple-500** | **`#6c47ff`** | **Primary CTA, logomark, brand anchor** |
| purple-600 | `#6430f7` | Pressed state |
| purple-700 | `#561ee3` | Active/focus accent |
| purple-800 | `#4818bf` | Dark surface variant |
| purple-900 | `#3c169c` | Deep dark accent |
| purple-950 | `#230b6a` | Near-black purple |

### Neutral Gray

| Token | Hex | Common use |
|---|---|---|
| gray-25 | `#fafafb` | Page tint |
| gray-50 | `#f7f7f8` | Root background (light) |
| gray-100 | `#eeeef0` | Dividers, card tint |
| gray-150 | `#e3e3e7` | Subtle borders |
| gray-200 | `#d9d9de` | Default border (`border` utility baseline) |
| gray-300 | `#b7b8c2` | Muted icon strokes |
| gray-400 | `#9394a1` | Placeholder, comment text |
| gray-500 | `#747686` | Secondary body text |
| gray-600 | `#5e5f6e` | Supporting copy |
| gray-700 | `#42434d` | Icon fills |
| gray-750 | `#373840` | Dark surface mid |
| gray-800 | `#2f3037` | Dark card surface |
| gray-850 | `#27272d` | Dark sidebar |
| gray-900 | `#212126` | Dark background, dark button |
| gray-950 | `#131316` | Root background (dark), body text (light) |

### Semantic Accents

| Token | Hex | Use |
|---|---|---|
| sky-500 | `#00aee3` | Secondary accent, gradient endpoint |
| blue-500 | `#3b82f6` | Information |
| green-500 | `#22c543` | Success, active status |
| red-500 | `#ef4444` | Danger, error |
| orange-500 | `#f36b16` | Warning |
| yellow-500 | `#efd420` | Caution |

### Gradients

The primary brand gradient pairs purple with sky: `from-purple-500 to-sky-300` (`#6c47ff` → `#3ad4fd`). Use as glow halos beneath UI demo elements, timeline indicators, and decorative highlights — not as button fills.

The section shine is a radial overlay: `radial-gradient(74.05% 100% at 50% 0%, #fff 0%, transparent 100%)` on light; `#212126` on dark.

### Light / Dark

Dark mode uses class-based switching (a `.dark` ancestor). Root background: gray-50 (light) / gray-950 (dark). Apply color tokens with the `var(--light, …) var(--dark, …)` CSS pattern so a single declaration covers both schemes.

---

## Typography

### Font Families

| Role | Family | CSS variable |
|---|---|---|
| Primary sans | Suisse Intl + Geist (numbers) | `--font-sans` |
| Monospace | Söhne Mono | `--font-mono` |
| Product UI (Mosaic) | System UI stack | `--font-mosaic` |

Geist Variable is prepended to the sans stack solely to provide tabular numbers in mixed numeric/text contexts. Suisse Intl is the brand typeface for all running copy and headings.

### Weights

| Name | Value |
|---|---|
| Regular | 400 |
| Book | 450 (custom, `--font-weight-book`) |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |

### Seed 1.0 — Heading Scale

| Utility | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| `heading-1` | 4rem | 112.5% | 700 | -0.035em |
| `heading-2` | 3.5rem | 114.286% | 600 | -0.035em |
| `heading-3` | 3rem | 116.667% | 600 | -0.035em |
| `heading-4` | 2rem | 112.5% | 600 | -0.015em |
| `heading-5` | 1.25rem | 130% | 600 | — |
| `heading-6` | 1.125rem | 133.333% | 600 | — |

### Seed 1.0 — Body & Label Scale

| Utility | Size | Line height | Weight |
|---|---|---|---|
| `body-1` / `label-1` | 1.125rem | 155.556% | 400 / 500 |
| `body-2` / `label-2` | 0.9375rem | 160% | 400 / 500 |
| `body-3` / `label-3` | 0.8125rem | 153.846% | 400 / 500 |
| `body-4` / `label-4` | 0.6875rem | 163.636% | 400 / 500 |
| `body-5` / `label-5` | 0.625rem | 150% | 400 / 500 |

### Mono & Tag

| Utility | Size | Weight | Notes |
|---|---|---|---|
| `mono-1` | 0.875rem | 500 | Code snippets, inline code |
| `mono-2` | 0.75rem | 500 | Smaller code labels |
| `tag-1` | 0.6875rem | 500 | Eyebrow labels — mono font, `0.1em` tracking, uppercase |
| `tag-2` | 0.625rem | 500 | Smaller eyebrow variant |

Eyebrow / overline labels use `tag-1`: monospace, uppercase, `letter-spacing: 0.1em`. Examples: "React SDKs", "Bot and abuse protection", "UI Building Blocks".

### Mosaic & Ceramic

**Mosaic** (dashboard): system-UI fonts (`--font-mosaic`). Scale tops at `mosaic-heading-1` (1.5rem / 700) and bottoms at `mosaic-button-s` (0.75rem / 500). Use only inside dashboard product-UI surfaces.

**Ceramic** (dense UI): Suisse Intl / Geist fonts at compact sizes (`ceramic-heading-1` through `ceramic-body`/`ceramic-label`). Use only in dense embedded UI contexts.

### Code Syntax Colors

| Token | Light | Dark |
|---|---|---|
| Functions / keywords | purple-500 `#6c47ff` | purple-300 `#bab1ff` |
| Strings | sky-500 `#00aee3` | sky-300 `#5de3ff` |
| Constants / params | green-500 `#22c543` | green-300 `#86ef9b` |
| Comments | gray-400 `#9394a1` | gray-400 `#9394a1` |
| Punctuation | gray-300 `#b7b8c2` | gray-300 `#b7b8c2` |

---

## Layout & Spacing

All spacing is built on a 4px base unit. The Tailwind `spacing` scale maps directly: `space-1` = 4px, `space-4` = 16px, `space-8` = 32px.

### Container

Max-widths follow breakpoint boundaries: `px-6` base; `sm:max-w-[40rem]`; `md:max-w-[48rem] md:px-8`; `lg:max-w-[64rem]`; `xl:max-w-[80rem]`.

### Breakpoints

| Name | Em value | Px equivalent |
|---|---|---|
| sm | 40em | 640px |
| md | 48em | 768px |
| lg | 64em | 1024px |
| xl | 80em | 1280px |
| 2xl | 96em | 1536px |

### Section Anatomy

Every marketing section follows this pattern:
1. Eyebrow (`tag-1`, purple or gray-500, uppercase)
2. H2 (`heading-4` or `heading-3`, sentence case, `font-semibold`, tight tracking)
3. Body copy (`body-2`, `text-gray-600`, `max-w-2xl`)
4. Optional CTA

Section top border: `border-t-[0.5px] border-gray-950/12`.

### Touch Targets

Minimum tap target: 44×44px. Use the `.touch-hitbox` pseudo-element utility on small interactive elements.

---

## Radius & Shape

| Context | Class | Value |
|---|---|---|
| Buttons, inputs, small chips | `rounded-md` | 0.375rem (6px) |
| Popover lists, explore cards | `rounded-lg` | 0.5rem (8px) |
| Select dropdowns, modals, CLI hero | `rounded-xl` | 0.75rem (12px) |
| Bento cards, code blocks, drawers | `rounded-2xl` | 1rem (16px) |
| Avatars, FAB, pill badges, notch handle | `rounded-full` | 9999px |

---

## Elevation & Shadow

Shadows use multi-layer stacking. Avoid single-layer shadows.

| Level | Formula | Used on |
|---|---|---|
| Button (primary) | `0 1px white/7% inset, 0 1px 3px gray-900/20%` | Primary CTA buttons |
| Navigation button | `0 2px 3px -1px black/8%, 0 0 0 0.5px gray-950/18%, 0 1px 0 0 white/10% inset` | Nav pill buttons |
| Bento card | `0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)` | Marketing feature cards |
| Drawer / modal | `0 5px 15px rgba(0,0,0,0.08), 0 15px 35px -5px rgba(25,28,33,0.2)` | Drawers, select dropdowns |
| Support / large card | `0 10px 32px rgba(34,42,53,0.15), 0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.08), 0 24px 68px rgba(47,48,55,0.1)` | Popovers, testimonial hero cards |

Dark mode: replace outer shadows with inset borders (`inset 0 0 0 1px white/2.5%`). Avoid drop-shadow in dark contexts.

---

## Motion

Prefer motion that guides attention, not motion that decorates. Respect `prefers-reduced-motion` — gate animations behind reduced-motion checks.

### Durations

| Name | Value | Use |
|---|---|---|
| Instant | 100ms | Hover in (nav, ghost buttons) |
| Fast | 150ms | Default nav transition out |
| Standard | 200ms | Icon transforms, form feedback |
| Moderate | 300ms | Button shimmer, SupportPopover |
| Slow | 450ms | Theme color transition |

### Easings

| Name | Value | Use |
|---|---|---|
| `ease-out-cubic` | `cubic-bezier(0.33, 1, 0.68, 1)` | UI transitions, icon transforms, FAQ chevron |
| Button shimmer | `cubic-bezier(0.4, 0.36, 0, 1)` | Button overlay opacity |
| Bounce reveal | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Hover arrow reveal on cards |

### Spring Configs (motion/react)

| Context | Stiffness | Damping | Mass |
|---|---|---|---|
| Button content swap | 200 | 20 | 0.8 |
| Drawer | 300 | 30 | 0.5 |
| Nav indicator | 400 | 50 | — |

### Named Animations

| Name | Duration | Easing | Effect |
|---|---|---|---|
| `fade-in` | `var(--fade-in-duration, 0.3s)` | linear | Opacity fade, configurable from/to |
| `letter-reveal` | 0.3s | ease-out | Opacity + `blur(2px)` → `blur(0)` |
| `blink` | 1s | step-end | Cursor blink (opacity 1 → 0 → 1) |

---

## Components

### Buttons

Four variants, all use `rounded-md`.

**Primary** (filled): `bg-purple-500`, white text. Height `1.875rem` (base), `1.625rem` (xs), `1.5rem` (sm). Multi-layer shadow with a white inset highlight, a gradient sheen overlay (`from-white/20`), and an arrow icon that slides in on hover via `translate-x`.

**Navigation** (bordered pill): `h-[1.875rem]`, `px-2.5`, gradient background (near-transparent top-to-bottom), compound border/shadow ring. Used for "Sign in" and secondary nav actions.

**Secondary**: Text-only, `text-purple-500`, no border or shadow. Use for low-emphasis actions.

**Glass / Translucent**: `h-8`, semi-transparent white background, white text. Use on dark/purple section backgrounds.

Color variants: `purple` (primary CTA), `gray` (neutral), `white` (on dark), `sky` (accent), `neutral-inverted` (adapts to context).

### Cards (Bento)

`rounded-2xl`. Light: `bg-white` with the 4-layer bento shadow. Dark: `bg-gray-900` with inset white borders. Badges on cards use sky-100/sky-700 (light) or sky-500/20 + sky-300 (dark), `rounded-md`, `ring-inset`.

### Badges

| Type | Background | Text | Border |
|---|---|---|---|
| Beta | `bg-blue-50` | `text-blue-500` | Dashed SVG border |
| Coming soon | `bg-gray-100` | `text-gray-500` | Dashed SVG border |
| Sky accent | `bg-sky-100` | `text-sky-700` | `ring-1 ring-sky-200 ring-inset` |

### Inputs

`rounded-md`, `bg-white`, `px-3 py-1.5`, `ring-1 ring-black/10`. Focus ring: `0 0 0 1px color-mix(oklab, black 15%, transparent), 0 0 0 4px color-mix(oklab, black 8%, transparent)`. Error state: `ring-red-400`. Disabled: dashed border, `bg-gray-50`, no shadow. Dark inputs: `bg-[#26262B]` with an inset top highlight.

### Focus

Global focus ring: `outline: 2px solid gray-950` (light) / `white` (dark), `outline-offset: 2px`, applied via `.outline-focus` and `:focus-visible`. Never suppress focus outlines.

### Iconography

UI icons: 16×16 or 20×20 viewBox, `stroke-width` 1.25–1.5, `stroke-linecap="round"`, `stroke-linejoin="round"`. Arrow icons: 10×10 filled triangle path. Navigation icons are 24px bespoke SVG components using `fill="currentColor"`.

---

## Auth Components

Clerk's auth components (`<SignIn />`, `<SignUp />`, `<UserButton />`, etc.) are styled through the `appearance` prop, not Tailwind classes. All internal CSS variables use the `--clerk-` prefix.

### Variables API

Pass `appearance={{ variables: { … } }}` to any component. Key variables (defaults shown):

| Variable | Default (light) | Default (dark) |
|---|---|---|
| `colorPrimary` | `#2f3037` | `#ffffff` |
| `colorBackground` | `#ffffff` | `#212126` |
| `colorForeground` | `#212126` | `#ffffff` |
| `colorInput` | `#ffffff` | `#26262b` |
| `colorInputForeground` | `#131316` | `#ffffff` |
| `colorPrimaryForeground` | `#ffffff` | `#000000` |
| `colorDanger` | `#ef4444` | `#ef4444` |
| `colorSuccess` | `#22c543` | `#22c543` |
| `colorWarning` | `#f36b16` | `#f36b16` |
| `colorNeutral` | `#000000` | `#ffffff` |
| `colorMutedForeground` | `#747686` | — |
| `fontSize` | `0.8125rem` | — |
| `borderRadius` | `0.375rem` | — |
| `spacing` | `1rem` | — |

### Signature Look

The default Clerk component shell carries a four-layer card shadow: `0 0 0 1px rgb(0 0 0 / 0.06), 0 5px 15px rgb(0 0 0 / 0.08), 0 15px 35px -5px rgb(47 48 55 / 0.2), 0 4px 6px rgb(34 42 53 / 0.04)`. The inner card sits on white with a `0.5px` `#d9d9de` hairline and a soft 2px ambient shadow.

### Elements API

Use `appearance={{ elements: { … } }}` for surgical overrides. Map element keys (e.g. `cardBox`, `formField`, `socialButtonsBlockButton`, `userButtonPopoverCard`) to CSS objects or className strings. State suffixes: `__loading`, `__error`, `__open`, `__active`.

### Layout Options

| Option | Values |
|---|---|
| `elevation` | `raised` (default), `flush` (removes card border + shadow) |
| `logoPlacement` | `inside` (default), `outside`, `none` |
| `socialButtonsPlacement` | `top` (default), `bottom` |
| `socialButtonsVariant` | `auto` (default), `iconButton`, `blockButton` |

### Prebuilt Themes

Import from `@clerk/themes`: `dark`, `neobrutalism`, `shadcn`, `shadesOfPurple`.

```js
import { dark } from '@clerk/themes'

<ClerkProvider appearance={{ baseTheme: dark }} />
```

See [clerk.com/docs/customization/overview](https://clerk.com/docs/customization/overview) for the full Elements reference.

---

## Logo & Brand Assets

Download all assets at [clerk.com/brand-assets](https://clerk.com/brand-assets).

### Logomark Structure

The symbol is a three-arc form: an upper arc (`#bab1ff`, purple-300) and a center dot plus lower arc (`#6c47ff`, purple-500). The wordmark ("clerk") fills `#131316` on light backgrounds.

### Colorways

| Variant | Background | Use |
|---|---|---|
| Primary (logotype) | Light / white | Default |
| Light | Dark / purple | Reversed on dark sections |
| Dark (monotone) | White | All-black, reduced-opacity upper arc |
| Social avatar | purple-500 `#6c47ff` fill | Circle or square container |

### Usage Rules

- Keep the logomark at minimum 18px height.
- Maintain clear space equal to the height of the "k" letterform on all sides.
- Never recolor the logomark outside the provided variants.
- Never place the logomark on a background where contrast falls below 4.5:1.
- Never stretch, rotate, or add effects (shadow, gradient) to the logo SVG.
- Use the symbol-only mark on small surfaces (favicons, app icons); use the logotype when width permits.

---

## Do & Don't

| Do | Don't |
|---|---|
| Use `#6c47ff` as the primary brand anchor | Swap in purple-600/700 as the "primary" without purpose |
| Use sentence case for all headings | Use title case on regular section headings |
| Use layered multi-stop shadows | Use a single flat `box-shadow` |
| Use `cubic-bezier(0.33, 1, 0.68, 1)` for UI transitions | Use linear or `ease-in` for element entries |
| Use spring physics for content swaps and drawers | Use CSS `transition: all` |
| Keep purple for CTAs; gray-950 for body in light mode | Use purple for body text or decorative paragraph fills |
| Use `tag-1` (monospace, uppercase, 0.1em tracking) for eyebrow labels | Use heading styles for section overlines |
| Respect `prefers-reduced-motion` | Animate unconditionally |
| Use the `appearance` API to style auth components | Apply Tailwind classes directly to clerk-js DOM elements |
| Refer to users as "you" and address builders directly | Write in a third-person abstract persona voice |
| Use Oxford commas and numerals for quantities | Omit the serial comma or spell out numbers |

---

## More

- [Homepage](https://clerk.com/)
- [Documentation](https://clerk.com/docs)
- [Brand assets](https://clerk.com/brand-assets)
- [Blog](https://clerk.com/blog)
- [Changelog](https://clerk.com/changelog)
- [Site index for LLMs (llms.txt)](https://clerk.com/llms.txt)
