# Amplitude – Design System

<!--
        △     △
      ╭───────────╮
     ╱  ╭─╮   ╭─╮  ╲
    │   │●│   │●│   │
    │   ╰─╯   ╰─╯   │
    │     ‿‿‿‿‿     │
     ╲             ╱
     ─╯           ╰─

  Hi, I'm the Data Monster.
  I eat bad design tokens for breakfast.
  Don't hardcode hex values or I'll find you.
-->

Reference for developers, designers, and agents building on amplitude.com or with `@amplitude/core-ui`.
Sources: brand.amplitude.com · javascript-amplitude-storybook.vercel.app

---

## Colors

### Primary
Always lead with these three. Every layout starts here before reaching for secondaries.

| Name           | Hex       | Notes                                                        |
|----------------|-----------|--------------------------------------------------------------|
| Amplitude Blue | `#0052F2` | CTAs, links, interactive highlights. Use `#4083FF` on black. |
| Black          | `#000000` | Headings, primary text, dark backgrounds                     |
| White          | `#FFFFFF` | Page backgrounds, reversed text                              |

### Secondary
Use sparingly as intentional accents. Never lead a layout with these.

| Name      | Hex       |
|-----------|-----------|
| Dark Blue | `#001A4F` |
| Lilac     | `#6980FF` |
| Violet    | `#A373FF` |
| Pink      | `#FF7D78` |
| Red       | `#F23845` |

Pink and Red must be used minimally. Secondary colors must never be used in typography.

### Grays

| Name     | Hex       | Role                             |
|----------|-----------|----------------------------------|
| Gray 100 | `#13171A` | Darkest bg, near-black surfaces  |
| Gray 90  | `#242A2E` | Dark elevated surfaces           |
| Gray 80  | `#373D42` | Secondary text on dark           |
| Gray 70  | `#50565B` | Tertiary text                    |
| Gray 60  | `#697077` | Muted text                       |
| Gray 50  | `#868D95` | Placeholder, disabled text       |
| Gray 40  | `#9FA5AD` | Subtle borders                   |
| Gray 30  | `#B9BFC7` | Dividers                         |
| Gray 20  | `#D5D9E0` | Default borders, input strokes   |
| Gray 10  | `#F2F4F8` | Light surface bg, hover states   |

---

## Typography

**Font:** Gellix (custom geometric sans-serif). Always use `font-gellix` — never set font-family inline.

**Substitutions:** Poppins for Google environments · Helvetica as last resort only.

**Weights:** Regular (400) · Medium (500) · SemiBold (600) · Bold (700).
Bold is reserved for display headings only. Default to SemiBold for most titles.

### Type scale

| Style      | Weight   | Size | Line Height | Use                            |
|------------|----------|------|-------------|--------------------------------|
| Title XXL  | Bold     | 64px | 70px        | Hero / H1                      |
| Title XL   | SemiBold | 56px | 62px        | Section title / H2             |
| Title L    | SemiBold | 44px | 48px        | Sub-section / H3               |
| Title M    | SemiBold | 36px | 40px        | Card headline / H4             |
| Title S    | SemiBold | 28px | 31px        | Component heading / H5         |
| Title XS   | Medium   | 22px | 24px        | Small heading / H6             |
| Eyebrow M  | SemiBold | 14px | auto        | Section labels, eyebrows       |
| Eyebrow S  | SemiBold | 12px | auto        | Tags, small labels             |
| Text XL    | Regular  | 20px | 27px        | Large body / intro paragraphs  |
| Text L     | Regular  | 18px | 24px        | Default body / prose           |
| Text M     | Regular  | 16px | 22px        | Secondary body / UI copy       |
| Text S     | Medium   | 14px | 19px        | Captions, metadata, labels     |
| Text XS    | Medium   | 12px | 16px        | Fine print                     |
| Text XXS   | SemiBold | 10px | 13px        | Micro labels                   |

**Type color rules:**
- Default: black or white
- Hierarchy: Gray 60–80
- Links / CTAs / eyebrows: `#0052F2` (use `#4083FF` on black backgrounds)
- Never apply secondary palette colors to text

---

## Components (`@amplitude/core-ui`)

Full docs at javascript-amplitude-storybook.vercel.app. Always use library components before building custom ones.

### Button

Four variants, two sizes. Always `rounded-lg` (8px radius).

| Variant      | Background  | Text      | Border    | Use                      |
|--------------|-------------|-----------|-----------|--------------------------|
| primary      | `#0052F2`   | white     | `#0052F2` | Primary action           |
| secondary    | white       | `#1E2024` | `#DEDDE2` | Secondary action         |
| tertiary     | transparent | `#0052F2` | none      | Low-emphasis blue action |
| tertiary-alt | transparent | `#1E2024` | none      | Low-emphasis gray action |

Sizes: `medium` (32px height, 14px font) · `small` (24px height, 12px font)

Props: `isDanger` · `isLoading` · `iconOnly` · `disabled`

```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary" size="small">Cancel</Button>
<Button variant="primary" isDanger>Delete</Button>
<Button variant="primary" isLoading>Saving...</Button>
```

### Available components

Accordion, Alert, Autocomplete, Avatar, Badge, BaseDatepicker, BaseGroupedSelect, BrandIcon,
Button, ButtonGroup, Card, Carousel, Checkbox, Chip, Collapsible, Combobox, Datepicker,
Dialog, Drawer, Dropdown, Empty, FeatureBadge, FileUpload, Form, HighlightWords, HoverCard,
Icon, Input, InputGroup, Label, LoadingSpinner, Markdown, Multiselect, Popover, Progress,
PulseIndicator, RadioGroup, ScrollArea, ScrollShadow, Separator, ShrinkWrap, Skeleton,
Slider, Switch, Tabs, Text, Textarea, Timeline, Toast, Toggle, ToggleGroup, Tooltip, Truncate

---

## Logo

- Full logo (logomark + logotype): default in most cases
- Logomark alone: when space is limited
- Colors: black or white only — Amplitude Blue in special cases only
- Min size: 20px height digital · ¼ inch print
- Alignment: left or center only
- Never skew, rotate, recolor, recreate with AI, or use as a pattern

---

## Voice & Content

**Mission:** We help companies build better digital products and experiences.

**Tagline:** Amplitude. Your unfair advantage.

**Three voice principles:**
- **Magnetic** — Hook with curiosity gaps. "What if you could…" "Imagine if…" "Let's…"
- **Provocative** — Challenge assumptions, take a stance. Short sentences, no filler, no hedging.
- **Empowering** — Focus on what *they* can do. Plain language, no jargon.

**Writing principles:** Be brief · Be clear · Be conversational · Be relevant · 8th-grade level

**Avoid:** game-changing, cutting-edge, powerful, robust, seamless, leverage, synergy, unlock, revolutionary

**Use instead:** use, build, decide, make the most of, improve, ship

**Product name rules:**
- Full name on first reference: "Amplitude Analytics", then "Analytics" after
- Capitalize parent products, lowercase features: "Amplitude Experiment" / "holdout group"
- Exception for unique names: "Amplitude AI" / "Ask Amplitude"

---

## Do's and Don'ts

- **Do** lead every layout with Black, White, and Amplitude Blue
- **Do** use `font-gellix` — Poppins in Google environments
- **Do** reserve Bold weight for display headings only
- **Do** use `#4083FF` for blue text on black backgrounds
- **Do** use `@amplitude/core-ui` components before building custom ones
- **Don't** apply secondary colors to typography
- **Don't** use Red in large quantities or lead with secondary colors
- **Don't** skew, rotate, or recreate the Amplitude logo
- **Don't** use: powerful, seamless, game-changing, leverage
