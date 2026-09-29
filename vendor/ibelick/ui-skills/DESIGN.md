---
version: alpha
name: UI Skills
description: Design language for UI Skills.
colors:
  page-default: "#FFFFFF"
  surface-default: "#FFFFFF"
  surface-subtle: "#F5F5F5"
  fill-default: "#FFFFFF"
  fill-subtle: "#FAFAFA"
  fill-strong: "#F5F5F5"
  fill-inverse: "#151515"
  fill-accent: "#E5F0FF"
  content-primary: "#151515"
  content-secondary: "#757575"
  content-muted: "#A5A5A5"
  content-extra-muted: "#E5E5E5"
  content-inverse: "#FFFFFF"
  content-accent: "#1F78FF"
  color-line-default: "#EDEDED"
typography:
  mono:
    fontFamily: JetBrains Mono
  sans:
    fontFamily: Inter Variable
  h1:
    className: type-h1
    fontFamily: Inter Variable
    fontSize: text-4xl
    fontWeight: 450
    lineHeight: leading-tight
    letterSpacing: tracking-tight
  h2:
    className: type-h2
    fontFamily: Inter Variable
    fontSize: text-xl
    fontWeight: 450
    lineHeight: leading-tight
    letterSpacing: tracking-tight
  bodyMd:
    className: type-body-md
    fontFamily: Inter Variable
    fontSize: text-sm
    fontWeight: 400
    lineHeight: leading-normal
    letterSpacing: tracking-normal
  bodySm:
    className: type-body-sm
    fontFamily: Inter Variable
    fontSize: text-xs
    fontWeight: 400
    lineHeight: leading-normal
    letterSpacing: tracking-normal
  code:
    className: type-code
    fontFamily: JetBrains Mono
    fontSize: text-xs
    fontWeight: 400
    lineHeight: leading-normal
    letterSpacing: tracking-normal
---

## Overview

Quiet, editorial, and code-first. UI Skills should feel like a precise developer tool, not a marketing site.

## Colors

- Use `page-default` for the page background and `surface-default` for standard surfaces.
- Use `surface-subtle`, `fill-subtle`, and `fill-strong` for restrained surface contrast.
- Use `content-primary`, `content-secondary`, `content-muted`, and `content-extra-muted` for text hierarchy.
- Use `color-line-default` for borders and dividers.
- Use `fill-inverse` and `content-inverse` for inverse controls and surfaces.
- Use `fill-accent` and `content-accent` for accent states.

## Typography

- Use Inter Variable for interface copy.
- Use JetBrains Mono for commands, code, and technical identifiers.
- Use `text-4xl`, weight 450, `leading-tight`, and `tracking-tight` for H1.
- Use `text-xl`, weight 450, `leading-tight`, and `tracking-tight` for H2.
- Use `text-sm`, weight 400, `leading-normal`, and `tracking-normal` for body md.
- Use `text-xs`, weight 400, `leading-normal`, and `tracking-normal` for body sm.
- Use `text-xs`, weight 400, `leading-normal`, and `tracking-normal` for code.
- Use sentence case for labels and links.

## Layout

- Use `container-7xl` for large page layouts and `container-3xl` for small page layouts.
- Both layout utilities center their content, fill the available width, and apply `px-5` horizontal padding.
- Use generous vertical spacing and light section boundaries.
- Use responsive grids for collections.
- Keep mobile padding consistent.
- Let long technical strings wrap or scroll.

## Elevation & Depth

- Use white surfaces with `shadow-2xs`.
- On larger screens, use `ring-1 ring-line-default` instead of visible borders.
- On mobile, use thin top and bottom borders for full-width surfaces.
- Keep elevation subtle.

## Shapes

- Use restrained rounded corners for cards, controls, dialogs, and code blocks.
- Keep long-form content rectangular.
- Use `fill-subtle` and `fill-strong` for hover states.

## Components

- Skill cards show the identifier, description, then source.
- Website buttons use three sizes: lg (`h-10 px-5 gap-2 rounded-xl`), md (`h-8 px-3 gap-1.5 rounded-lg`), and sm (`h-7 px-2 gap-1 rounded-lg`), all with `text-sm` and zero vertical padding.
- Website buttons use primary, secondary, and ghost variants. Primary uses `fill-inverse` with `content-inverse`; secondary uses `fill-default`, `line-default`, and `fill-subtle` on hover; ghost uses `fill-strong` and switches from `content-secondary` to `content-primary` on hover.
- Buttons use square corners by default and a full-radius rounded shape when requested.
- Code blocks use monospace text, clear surfaces, scrolling, and copy support.
- Search uses a focused dialog with keyboard navigation and a clear empty state.

## Do's and Don'ts

- Provide visible focus states.
- Respect reduced motion.
- Give empty states one clear action.
- Do not use glow, gradients, or decorative color when neutral styling is sufficient.
