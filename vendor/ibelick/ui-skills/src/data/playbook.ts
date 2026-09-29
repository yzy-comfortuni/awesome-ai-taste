import { skills } from "./skills.ts";
import { playbookDemoSlugs } from "./playbook-demos";

export type PlaybookEntry = {
  slug: string;
  skill: string;
  title: string;
  description: string;
  related: string[];
};

const rawPlaybook: PlaybookEntry[] = [
  {
    slug: "reserve-space-with-aspect-ratio",
    skill: "better-layout",
    title: "Prevent layout shifts with aspect ratio",
    description:
      "Set `aspect-ratio` so nearby content does not jump while an image loads.",
    related: ["improve-ui", "better-interface", "better-ui", "better-layout"],
  },
  {
    slug: "use-text-balance",
    skill: "baseline-ui",
    title: "Balance heading text for easier reading",
    description:
      "Use `text-balance` for headings and `text-pretty` for body copy.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "frontend-design",
    ],
  },
  {
    slug: "use-tabular-nums-for-data",
    skill: "baseline-ui",
    title: "Align numbers with tabular-nums",
    description:
      "Use `tabular-nums` to align numbers in tables and data-heavy UI.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "use-large-touch-targets",
    skill: "better-accessibility",
    title: "Use 44px touch targets for accessibility",
    description:
      "Give buttons and controls a touch target of at least 44 by 44px.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "use-concentric-border-radius",
    skill: "better-ui",
    title: "Match border radius on nested elements",
    description:
      "Set the nested element's radius to the parent's radius minus its padding.\n\nFormula: `inner radius = outer radius - padding`",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "emil-design-eng",
    ],
  },
  {
    slug: "add-scale-on-press",
    skill: "emil-design-eng",
    title: "Add scale feedback to pressed buttons",
    description:
      "Add subtle press feedback with `:active` and a scale near 0.96.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "anchor-popovers-to-triggers",
    skill: "emil-design-eng",
    title: "Animate popovers from their trigger",
    description: "Animate each popover from the control that opened it.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "interaction-design",
    ],
  },
  {
    slug: "group-with-space-not-lines",
    skill: "better-layout",
    title: "Group content with spacing, not dividers",
    description:
      "Use spacing to group related content before adding divider lines.",
    related: ["improve-ui", "better-interface", "baseline-ui", "better-ui"],
  },
  {
    slug: "peek-the-next-scroll-item",
    skill: "better-layout",
    title: "Preview the next item in scroll lists",
    description:
      "Show 16 to 32px of the next item to make horizontal scrolling clear.",
    related: [
      "improve-ui",
      "better-interface",
      "better-ui",
      "interaction-design",
    ],
  },
  {
    slug: "outline-images-neutrally",
    skill: "better-ui",
    title: "Use neutral borders around images",
    description: "Use a thin neutral outline instead of a tinted ring.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-colors",
      "better-interface",
    ],
  },
  {
    slug: "clamp-overflowing-titles",
    skill: "better-typography",
    title: "Truncate long titles in small spaces",
    description: "Use `line-clamp` or `truncate` when space is tight.",
    related: ["improve-ui", "baseline-ui", "better-interface", "better-ui"],
  },
  {
    slug: "keep-secondary-text-readable",
    skill: "better-accessibility",
    title: "Improve contrast for muted text",
    description: "Give muted text enough color contrast to stay easy to read.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-colors",
      "baseline-ui",
    ],
  },
  {
    slug: "avoid-entering-from-scale-zero",
    skill: "emil-design-eng",
    title: "Avoid scale-zero entrance animations",
    description:
      "Start entrance animations near 95% size instead of scaling up from zero.",
    related: [
      "improve-ui",
      "improve-animations",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-structural-skeletons",
    skill: "baseline-ui",
    title: "Match loading skeletons to real content",
    description:
      "Match loading skeletons to the content they replace, and skip spinners when possible.",
    related: ["improve-ui", "better-ui", "better-interface", "baseline-ui"],
  },
  {
    slug: "limit-accent-color-usage",
    skill: "baseline-ui",
    title: "Limit each view to one accent color",
    description: "Use one accent per view. Keep secondary actions neutral.",
    related: [
      "improve-ui",
      "better-colors",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "cap-line-length",
    skill: "better-typography",
    title: "Keep body text lines easy to read",
    description:
      "Keep text lines between 60 and 75 characters for easier reading.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-interface",
      "better-writing",
    ],
  },
  {
    slug: "use-shadow-for-elevation",
    skill: "better-ui",
    title: "Use shadows to show visual depth",
    description: "Use shadows to show depth. Use borders to show structure.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "beautiful-shadows",
    ],
  },
  {
    slug: "show-visible-focus-rings",
    skill: "better-accessibility",
    title: "Add visible keyboard focus rings",
    description:
      "Use `:focus-visible` to keep keyboard focus clear and visible.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "baseline-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "show-errors-beside-fields",
    skill: "baseline-ui",
    title: "Show form errors next to each field",
    description: "Put each validation error directly below its field.",
    related: [
      "improve-ui",
      "better-accessibility",
      "fixing-accessibility",
      "web-design-guidelines",
    ],
  },
  {
    slug: "label-every-form-field",
    skill: "fixing-accessibility",
    title: "Add visible labels to every form field",
    description:
      "Use a visible label. Do not use placeholder text as the only label.",
    related: [
      "improve-ui",
      "better-accessibility",
      "baseline-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "give-empty-states-one-action",
    skill: "baseline-ui",
    title: "Give empty states one clear action",
    description:
      "Give an empty state one clear action, not just an explanation.",
    related: ["improve-ui", "better-ui", "better-interface", "better-layout"],
  },
  {
    slug: "use-sentence-case-labels",
    skill: "better-typography",
    title: "Use sentence case for UI labels",
    description: "Write labels in sentence case, not all caps.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-interface",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "pair-status-with-labels",
    skill: "better-accessibility",
    title: "Never use color alone for status",
    description: "Add text or an icon so status is never shown by color alone.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "wcag-audit-patterns",
      "baseline-ui",
    ],
  },
  {
    slug: "use-ease-out-on-enter",
    skill: "emil-design-eng",
    title: "Use ease-out for entrance animations",
    description:
      "Use `ease-out` for entrances. `ease-in` feels slow when something opens.",
    related: ["improve-ui", "apple-design", "improve-animations", "better-ui"],
  },
  {
    slug: "align-icons-optically",
    skill: "better-ui",
    title: "Align icons by eye for better balance",
    description:
      "Nudge icons when geometric centering does not look visually balanced.",
    related: [
      "improve-ui",
      "emil-design-eng",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "match-icon-stroke-weight",
    skill: "better-ui",
    title: "Match icon stroke weight to text",
    description:
      "Use a 2px stroke beside semibold text and a 1.5px stroke beside regular text.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "use-outline-icons-by-default",
    skill: "better-ui",
    title: "Use outline icons for default states",
    description:
      "Use outline icons by default. Use a fill for the active state.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "apple-design",
    ],
  },
  {
    slug: "avoid-glow-primary-actions",
    skill: "baseline-ui",
    title: "Avoid glow effects on primary buttons",
    description:
      "Avoid glow effects on primary buttons; use contrast and spacing instead.",
    related: [
      "improve-ui",
      "better-ui",
      "make-interfaces-feel-better",
      "frontend-design",
    ],
  },
  {
    slug: "animate-icon-state-changes",
    skill: "better-ui",
    title: "Animate icon state changes smoothly",
    description:
      "Cross-fade changing icons with opacity, scale, and blur for smoother feedback.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "give-targets-breathing-room",
    skill: "better-layout",
    title: "Add space between nearby controls",
    description: "Leave about 12px between nearby bordered controls.",
    related: [
      "improve-ui",
      "better-accessibility",
      "better-interface",
      "baseline-ui",
    ],
  },
  {
    slug: "inset-primary-actions",
    skill: "better-layout",
    title: "Keep full-width buttons inside page margins",
    description:
      "Keep full-width buttons inside the page margins, not edge to edge.",
    related: ["improve-ui", "better-interface", "better-ui", "ui-ux-pro-max"],
  },
  {
    slug: "tighten-heading-line-height",
    skill: "better-typography",
    title: "Use tighter line height for headings",
    description: "Use a line height near 1.1 for short headings.",
    related: ["improve-ui", "baseline-ui", "apple-design", "better-interface"],
  },
  {
    slug: "tune-tracking-by-size",
    skill: "better-typography",
    title: "Adjust letter spacing for large text",
    description:
      "Large display text often needs slightly tighter letter spacing.",
    related: ["improve-ui", "apple-design", "baseline-ui", "better-interface"],
  },
  {
    slug: "confirm-destructive-actions",
    skill: "baseline-ui",
    title: "Confirm destructive actions before they run",
    description:
      "Ask for confirmation before deleting data or taking an irreversible action.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-accessibility",
      "interaction-design",
    ],
  },
  {
    slug: "fade-scroll-edges",
    skill: "apple-design",
    title: "Fade the edges of scrollable lists",
    description:
      "Use a `mask-image` fade to show where a scrollable list continues.",
    related: [
      "improve-ui",
      "better-layout",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "stagger-infrequent-entrances",
    skill: "better-ui",
    title: "Stagger hero animations on first load",
    description:
      "Stagger hero animations by about 100ms on first load, not during routine interactions.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "keep-exits-subtle",
    skill: "better-ui",
    title: "Keep exit animations short and subtle",
    description:
      "Keep exit animations short with a small `translateY` movement.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "fixing-motion-performance",
    ],
  },
  {
    slug: "warm-toolbar-tooltips",
    skill: "emil-design-eng",
    title: "Show nearby tooltips faster",
    description: "Show nearby tooltips faster after the first tooltip opens.",
    related: [
      "improve-ui",
      "better-ui",
      "interaction-design",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-interruptible-transitions",
    skill: "better-ui",
    title: "Use interruptible CSS transitions",
    description: "Use CSS transitions for interactive open and close states.",
    related: [
      "improve-ui",
      "emil-design-eng",
      "fixing-motion-performance",
      "improve-animations",
    ],
  },
  {
    slug: "restrain-high-frequency-motion",
    skill: "better-ui",
    title: "Avoid repeated animations in routine UI",
    description:
      "Animate first-load entrances, but keep repeated actions like tab switches instant.",
    related: [
      "improve-ui",
      "fixing-motion-performance",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "use-ease-not-spring-for-feedback",
    skill: "to-spring-or-not-to-spring",
    title: "Use ease-out instead of springs for feedback",
    description:
      "Use `ease-out` for toggles and toasts because springs can wobble.",
    related: [
      "improve-ui",
      "better-ui",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "fade-menus-out",
    skill: "mastering-animate-presence",
    title: "Fade menus out when they close",
    description:
      "Close menus with a short fade. Do not move them far off screen.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "emil-design-eng",
    ],
  },
  {
    slug: "reserve-brand-color-for-links",
    skill: "better-colors",
    title: "Reserve brand colors for links and actions",
    description:
      "Keep headings neutral. Use the brand color for links and actions.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-solid-modal-scrims",
    skill: "fixing-motion-performance",
    title: "Use solid modal backdrops instead of blur",
    description:
      "Use a solid modal backdrop instead of blur to avoid expensive full-screen rendering.",
    related: ["improve-ui", "60fps-animation", "better-ui", "apple-design"],
  },
  {
    slug: "fade-truncated-text",
    skill: "better-typography",
    title: "Fade overflowing text instead of clipping it",
    description:
      "Fade long labels instead of cutting them off with a hard ellipsis.",
    related: ["improve-ui", "baseline-ui", "better-ui", "apple-design"],
  },
  {
    slug: "enter-and-exit-on-the-same-path",
    skill: "apple-design",
    title: "Use matching enter and exit animations",
    description:
      "Use matching enter and exit animations so a surface feels connected.",
    related: [
      "improve-ui",
      "better-ui",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "blur-imperfect-label-morphs",
    skill: "emil-design-eng",
    title: "Soften label changes with a short blur",
    description:
      "Add a short blur when labels change to avoid a distracting visual flash.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "interaction-design",
    ],
  },
];

const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

const relatedSkillPool = [
  "impeccable",
  "layout",
  "harden",
  "web-quality-audit",
  "frontend-ui-engineering",
  "react-best-practices",
  "web-design-guidelines",
  "ui-ux-pro-max",
  "interaction-design",
  "frontend-design",
  "design-first-ui-prompting",
  "soft-skill",
  "minimalist-skill",
  "design-lab",
  "prototype",
  "better-interface",
  "better-layout",
  "better-accessibility",
  "better-typography",
  "better-colors",
  "better-writing",
  "fixing-accessibility",
  "fixing-motion-performance",
  "beautiful-shadows",
  "12-principles-of-animation",
  "apple-design",
  "improve-animations",
  "review-animations",
  "accessible-animation",
  "better-ui",
];

for (const skillSlug of relatedSkillPool) {
  if (!skillBySlug.has(skillSlug)) {
    throw new Error(`Unknown related skill pool slug: ${skillSlug}`);
  }
}

const playbook = rawPlaybook.map((entry) => {
  const sourceKeys = new Set<string>();
  const related: string[] = [];

  for (const skillSlug of [
    "improve-ui",
    ...entry.related,
    ...relatedSkillPool,
  ]) {
    const skill = skillBySlug.get(skillSlug);
    if (
      !skill ||
      related.includes(skillSlug) ||
      sourceKeys.has(skill.sourceKey ?? "")
    ) {
      continue;
    }

    related.push(skillSlug);
    sourceKeys.add(skill.sourceKey ?? "");
    if (related.length === 4) break;
  }

  return { ...entry, related };
});

const seenSlugs = new Set<string>();
for (const entry of rawPlaybook) {
  if (seenSlugs.has(entry.slug)) {
    throw new Error(`Duplicate playbook slug: ${entry.slug}`);
  }

  seenSlugs.add(entry.slug);

  if (!playbookDemoSlugs.includes(entry.slug)) {
    throw new Error(`Missing playbook demo for entry: ${entry.slug}`);
  }

  if (!skillBySlug.has(entry.skill)) {
    throw new Error(`Unknown skill slug for playbook entry: ${entry.skill}`);
  }

  for (const relatedSkillSlug of entry.related) {
    if (!skillBySlug.has(relatedSkillSlug)) {
      throw new Error(
        `Unknown related skill slug for playbook entry ${entry.slug}: ${relatedSkillSlug}`,
      );
    }
  }
}

for (const entry of playbook) {
  const authors = entry.related.map((slug) => skillBySlug.get(slug)?.sourceKey);
  if (
    entry.related.length !== 4 ||
    entry.related[0] !== "improve-ui" ||
    authors.some((sourceKey) => !sourceKey) ||
    new Set(authors).size !== 4
  ) {
    throw new Error(
      `Playbook entry ${entry.slug} must have 4 related skills from distinct authors with improve-ui first`,
    );
  }
}

export { playbook };

export const playbookBySlug = new Map(
  playbook.map((entry) => [entry.slug, entry]),
);

export const playbookBySkillSlug = new Map(
  skills.map((skill) => [
    skill.slug,
    playbook.filter((entry) => entry.skill === skill.slug),
  ]),
);
