---
version: alpha
name: UNICEF Brand Book 4.0
description: A DESIGN.md interpretation of the UNICEF Brand Book 4.0 with direct brand guidance from the PDF and inferred interface tokens for modern digital work.
colors:
  primary: "#00AEEF"
  brand-primary: "#00AEEF"
  action-primary: "#0047BB"
  link: "#0047BB"
  secondary: "#FFFFFF"
  tertiary: "#000000"
  neutral: "#D7D2CB"
  on-primary: "#FFFFFF"
  on-action-primary: "#FFFFFF"
  on-secondary: "#000000"
  on-tertiary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-alt: "#B3E7FA"
  ink: "#000000"
  neutral-dark: "#6E6968"
  neutral-mid: "#BEBAB6"
  primary-80: "#40C2F3"
  primary-60: "#6DCFF6"
  primary-40: "#B3E7FA"
  accent-blue: "#0047BB"
  accent-teal: "#004C45"
  accent-orange: "#FF7100"
  accent-orange-bright: "#FF8200"
  accent-gold: "#FFB500"
  accent-light-cyan: "#9ADBE8"
  status-success: "#004C45"
  status-warning: "#FFB500"
  status-danger: "#E2231A"
  on-status-success: "#FFFFFF"
  on-status-danger: "#FFFFFF"
  emergency: "#E2231A"
  on-emergency: "#FFFFFF"
typography:
  display-xl:
    fontFamily: Noto Sans
    fontSize: 72px
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.2
  body-lg:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  statement-regular:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  statement-bold:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  serif-emphasis:
    fontFamily: Aleo
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
  lower-third-name:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
  lower-third-title:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.2
  subtitle-video:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.action-primary}"
    textColor: "{colors.on-action-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  link-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  button-emergency:
    backgroundColor: "{colors.emergency}"
    textColor: "{colors.on-emergency}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  card-story:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  card-callout:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  alert-success:
    backgroundColor: "{colors.status-success}"
    textColor: "{colors.on-status-success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  alert-warning:
    backgroundColor: "{colors.status-warning}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  alert-danger:
    backgroundColor: "{colors.status-danger}"
    textColor: "{colors.on-status-danger}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  card-fact:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  stat-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  stat-secondary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  stat-accent:
    backgroundColor: "{colors.accent-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  panel-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  panel-inverse:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  panel-neutral:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  chart-series-primary-80:
    backgroundColor: "{colors.primary-80}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-primary-60:
    backgroundColor: "{colors.primary-60}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-primary-40:
    backgroundColor: "{colors.primary-40}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-teal:
    backgroundColor: "{colors.accent-teal}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-orange-bright:
    backgroundColor: "{colors.accent-orange-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-gold:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  chart-series-light-cyan:
    backgroundColor: "{colors.accent-light-cyan}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  panel-neutral-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  panel-neutral-mid:
    backgroundColor: "{colors.neutral-mid}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
---

# UNICEF

### Usage Fit

Use this file as the default UNICEF `DESIGN.md` when a project needs broad UNICEF brand guidance across communication, publishing, and light digital surfaces. For enterprise apps, prefer `DESIGN.web-app.md`. For Quarto websites, reports, listings, and long-form publishing, prefer `DESIGN.quarto.md`.

### Agent Priority Rules

- Preserve UNICEF Blue as the core brand signal, but use `action-primary` for app-like primary actions.
- Treat `brand-primary`, `action-primary`, `link`, and `status-*` as semantic roles, not decorative palette options.
- Follow official logo rules before making layout or styling decisions.
- Preserve child dignity, accessibility, and legibility over visual mimicry.
- Use clear labels, descriptive links, and explicit status text.
- Keep accents restrained and meaningful.

### Source Conflict Policy

- Brand Book 4.0 governs identity, logo usage, photography, and core brand expression.
- UNICEF UX/UI design guidelines govern enterprise interaction patterns, labels, forms, tables, and status semantics.
- Accessibility, dignity, and legibility override visual mimicry when sources are in tension.
- Quarto documentation governs implementation primitives only for the `site/` example.

## Overview

UNICEF's visual identity is a global public-interest system built around optimism, trust, dignity, and clarity. The brand should feel child-centered, hopeful, authoritative, and universal rather than ornamental, luxury-driven, or trend-led.

The visual atmosphere is spare and confident. Use UNICEF Blue as the dominant signal of the organization, then let photography of children provide the emotional warmth. Interfaces, layouts, and communication assets should avoid clutter, prioritize legibility, and leave enough quiet space for a single strong image, a brand statement, or a concise factual message to lead.

The most important emotional cues are:

- Hopeful rather than bleak
- Compassionate rather than distant
- Direct rather than clever
- Authoritative rather than corporate
- Inclusive and global rather than region-specific

When a design decision is not explicitly covered by tokens, choose the option that makes UNICEF feel like a trusted, field-based organization acting for every child in more than 190 countries and territories.

## Colors

The core UNICEF palette is intentionally tight. UNICEF Blue is the brand's primary identifier and should appear in every communication as a dominant or clearly present color. White and black support it as neutrals, while a restrained set of accent colors is available for emphasis, campaign variety, and data visualization.

- **Primary (`#00AEEF`)**: UNICEF Blue. The defining brand color for logos, bars, panels, and the most recognizable background fields.
- **Secondary (`#FFFFFF`)**: White. The default page surface and the clearest pairing for UNICEF Blue and photography.
- **Tertiary (`#000000`)**: Black. Used for core body text and sober expressions, but it should not dominate unless the communication needs gravity or emergency framing.
- **Neutral (`#D7D2CB`)**: Warm light neutral for supporting surfaces, publication interiors, and softer structured layouts.

In digital products, treat UNICEF Blue primarily as the institutional brand signal. For productivity and enterprise interfaces, a darker blue may be more suitable for primary actions and interactive controls because it preserves contrast while leaving bright UNICEF Blue available for header and brand emphasis.

Supporting colors should be used with discipline.

- **Accent blue (`#0047BB`)** and **accent teal (`#004C45`)** support data and secondary emphasis.
- **Accent orange (`#FF7100`)**, **bright orange (`#FF8200`)**, and **gold (`#FFB500`)** add contrast in charts, highlights, and campaign systems.
- **Emergency red (`#E2231A`)** is reserved for urgent emergency communication and should always be paired with UNICEF Blue to preserve brand association.
- **Primary tints** such as `#40C2F3`, `#6DCFF6`, and `#B3E7FA` can be used for data visualization and inside publication pages.

For status semantics, use supporting colors intentionally rather than decoratively.

- Use teal or green for success and positive completion states.
- Use orange and gold for warnings, cautions, and attention states.
- Use red only for error, danger, or destructive actions.

Color handling rules are strict.

- Do not alter UNICEF Blue by darkening, lightening, or adding transparency for general brand use.
- Keep UNICEF Blue visibly present in all brand-forward work.
- Let black serve structure and seriousness, not dominance.
- Let accent colors support, never replace, UNICEF Blue.

## Typography

Typography must be accessible, multilingual, and easy to deploy globally. Noto Sans is the primary typeface and should dominate the system because it supports a very broad language set and keeps UNICEF communication consistent across geographies and channels.

- **Display and headlines**: Noto Sans in light or regular weights. Headlines are large, clean, and understated rather than compressed or decorative.
- **Body copy**: Noto Sans Regular. Long-form content should be crisp, neutral, and highly legible.
- **Labels and emphasis**: Noto Sans Bold for concise emphasis, metadata, key statistics, and UI labels.
- **Serif emphasis**: Aleo may be used sparingly where a serif note helps highlight a word or phrase, especially in Roman scripts. It should never displace Noto Sans as the dominant voice.
- **Brand statement**: The phrase `for every child,` is set in Noto Sans Regular and the keyword that follows is set in Noto Sans Bold, both in lowercase and at the same size.

In digital interfaces, headings should generally remain dark rather than bright cyan so they do not read like links. In bandwidth-constrained environments, efficient font delivery and sensible system-font fallbacks are appropriate as long as the overall typographic tone stays aligned with Noto Sans.

Handwritten typography is an exception style, not a default style. If used, it must be large, legible, high-contrast, and emotionally justified. Do not use handwritten fonts for body text, dense informational text, or all-caps settings.

## Layout

Layout should feel open, simple, and image-led. UNICEF communication often pairs generous white space with a single hero photograph, a concise headline, and a compact zone for logo placement or factual supporting copy.

Use a straightforward rhythm based on small increments with visibly larger jumps for campaign panels, covers, and social graphics. A practical digital interpretation of the brand uses a 4px and 8px-based scale with room for 24px, 32px, 48px, and 64px spacing in more editorial compositions.

Layout behavior should follow these principles:

- Put one main idea first. Avoid crowded multi-message canvases.
- Let photography carry warmth and narrative weight.
- Use bars, panels, or simple blocks of UNICEF Blue or white to restore legibility over photography.
- Favor asymmetry and clear edge alignment over ornate grid systems.
- Preserve safe space around the logo and around children's faces.
- In web contexts, use large hero imagery and strong accessibility controls rather than decorative density.

## Elevation & Depth

UNICEF's brand language is predominantly flat. Hierarchy should come from scale, photography, color blocking, and typographic contrast rather than deep shadows, glass effects, or skeuomorphic depth.

Use elevation sparingly.

- Prefer flat white, black, or UNICEF Blue fields.
- Separate content zones with spacing, color changes, and simple rules before introducing shadows.
- If a digital product needs depth for usability, use very soft separation that stays visually secondary to color and content.
- Avoid glossy, beveled, embossed, or highly animated surfaces.

## Shapes

The shape language is mostly square and architectural. Rectangular frames, straight edges, and unrounded panels reinforce the clarity and seriousness of the brand. Circular shapes do appear in certain logo containers and signage applications, but they are exceptions tied to logo usage rather than the default interface style.

For digital interpretation:

- Default to square corners for containers, cards, fields, bars, and buttons.
- Allow only minimal corner rounding where platform conventions require it.
- Treat circles as special-purpose graphic forms, not as a universal UI motif.

## Components

UNICEF's brand book is heavier on communications systems than product UI, so component styling should borrow from publication, social, web, and video guidance rather than from consumer app conventions.

- **Primary actions** should use UNICEF Blue with white text and a flat rectangular silhouette.
- **Primary actions** in brand-forward communications can use UNICEF Blue, but productivity interfaces may prefer darker blue actions for stronger contrast and clearer distinction between brand chrome and interaction.
- **Secondary actions** should use white surfaces with black text and clear outlining in implementation, keeping the visual language quiet next to the primary action.
- **Cards and fact panels** should be flat, image-friendly, and editorial. Use white or pale tinted surfaces for structured information.
- **Statistics and data callouts** may use UNICEF Blue or a restrained accent color, but the chart system should remain legible and ordered.
- **Brand statements** should appear as short, memorable headline units rather than dense promotional copy.
- **Video lower thirds and subtitles** should prioritize mobile readability and use Noto Sans with strong contrast.
- **Publication covers and social graphics** should allow the logo, message, and hero image to remain legible at small scales.

When inventing a new component family, make it feel like a communication asset first and a product flourish second.

## Do's and Don'ts

- Do keep UNICEF Blue present and recognizable.
- Do use photography of children with dignity, directness, and emotional clarity.
- Do favor clear hierarchy, legibility, and uncluttered messaging.
- Do keep the brand statement in lowercase with regular-plus-bold contrast.
- Do choose Noto Sans as the default across platforms and languages.
- Do use accent colors sparingly and purposefully.
- Do pair status colors with text, icons, or other cues so meaning does not depend on color alone.
- Don't create a separate sub-brand look and feel for campaigns or teams.
- Don't distort, recolor, outline, reassemble, or crowd the logo.
- Don't place the logo over a child's face or over low-contrast backgrounds.
- Don't let black dominate unless the message genuinely needs a sombre tone.
- Don't use synthetic or AI-generated imagery in place of real photography.
- Don't use decorative handwritten styles for dense information or body text.

## Content & Labeling

Digital UNICEF work should use clear, direct, and consistent language.

- Use sentence case for labels, buttons, and interface text.
- Keep labels short, precise, and univocal.
- Prefer explicit labels like `Save`, `Edit`, `Delete`, `Continue`, and `Upload` over vague verbs such as `Submit` when a more precise action is available.
- Avoid unexplained acronyms in labels. If one is necessary, expand it the first time.
- Avoid link text such as `click here`; link text should describe the destination or action.
- Prefer short paragraphs, bullet lists, and structurally clear headings for on-screen reading.

## Status & Semantics

Use color semantically, not decoratively.

- Success states should feel calm and affirmative.
- Warning states should ask for attention without creating unnecessary alarm.
- Danger states should indicate blockers, destructive actions, or severe errors.
- Color should reinforce meaning, but the message should still be understandable without the color itself.

## Logo

The logo is the organization's most valuable graphic asset and should be treated as protected brand property rather than as a flexible mark.

Use the logo variants in this order of preference:

- **Logo with container**: The primary choice. Use it whenever space and contrast allow. It reinforces UNICEF Blue and strengthens recall.
- **Logo without container**: Use when the primary logo would lose legibility, when layouts are compact, or when the logo sits on cyan backgrounds.
- **Logo without tagline**: Exceptional-use fallback only when even the without-container version is too small or visually weak.

Logo placement guidance from the brand book should remain authoritative.

- Stacked logo with container: typically top right.
- Stacked logo without container: typically top right.
- Horizontal logo without container: typically bottom right.

Maintain generous clear space. Do not add country names into the logo itself. Localization should happen through approved translated logo and tagline assets, not through custom logo construction.

## Imagery

Photography is central to the brand. UNICEF should look like an organization in real contact with children, families, and field conditions.

Preferred imagery characteristics:

- Child-focused and emotionally direct
- Respectful, dignified, and non-exploitative
- Often centered on one child or one clear human moment
- Sometimes showing a parent or caregiver lifting a child, echoing the emblem
- Sometimes showing UNICEF in action through staff, supplies, or field delivery

Imagery selection must account for diversity, stereotype avoidance, global perception, and subject dignity. Protect identities when disclosure could put children at risk. Do not manipulate photographs in ways that change meaning, and do not use synthetic imagery.

## Data Visualization

UNICEF is positioned as a leading authority on children's issues, so data graphics should look factual, structured, and immediately readable.

Use the brand palette in a restrained hierarchy:

- Base the chart system on UNICEF Blue and its tints.
- Add accent blue, teal, orange, and gold only where separation between series is necessary.
- Use neutral grays for secondary axes, grid lines, and background structure.
- Keep chart forms simple: bars, lines, pies, surface area charts, and clear iconography.

The visual message should remain analytical, not playful.

## Accessibility

Accessibility is not a secondary layer. The brand book explicitly favors a more accessible font system and calls out high-contrast behavior on the web.

Design for:

- High contrast between text and backgrounds
- Mobile-legible type in video and social contexts
- Strong text support over photography through bars, overlays, or clean background fields
- Multilingual typography that holds up across scripts
- Sufficient clear space for logos and text blocks

When digital implementation requires a choice between strict visual mimicry and legibility, choose legibility.

## Localization

UNICEF is a global and local brand at the same time. Localization should come through translated taglines, approved language-specific logo assets, and typographic choices that respect the target script.

Noto Sans is the default localization engine for the system because of its broad language support. Aleo is optional and should be avoided when it compromises script support or consistency.

## Partnerships

Partnership materials are more constrained than internal UNICEF materials.

- Reserve UNICEF Blue, Noto Sans dominance, and brand-statement styling for UNICEF-owned materials.
- In partner materials, prefer brand-neutral composition around the participating organizations.
- Use the approved UNICEF logo variant based on legibility and role in the partnership.
- Keep UNICEF secondary in equal logo partnerships when required by the brand guidance.
- Include the non-endorsement disclaimer where required for private-sector partnership materials.

## Publications, Social, and Video

The same identity must hold across channels, but each channel has its own application logic.

- **Publications**: Favor a single full-bleed photograph, the container logo, Noto Sans cover titling, and UNICEF Blue on the back cover.
- **Social media**: Favor the logo without container, maintain minimum legibility, preserve clear space, and keep faces unobstructed.
- **Video**: Use Noto Sans for lower thirds and subtitles, underline names with UNICEF Blue, and end with a standard UNICEF end tag.
- **Web**: Favor large hero photography, accessible contrast options, and simple top-level navigation structure.
