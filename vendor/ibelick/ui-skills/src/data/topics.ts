import type { TopicSlug } from "./registry.ts";

export type Topic = {
  slug: TopicSlug;
  label: string;
  description: string;
  isDesignCore: boolean;
};

export const topicsBySlug = {
  accessibility: {
    slug: "accessibility",
    label: "Accessibility",
    description:
      "Inclusive UI patterns, WCAG audits, and remediation workflows.",
    isDesignCore: true,
  },
  motion: {
    slug: "motion",
    label: "Motion",
    description: "Animation systems, transitions, and interaction timing.",
    isDesignCore: true,
  },
  systems: {
    slug: "systems",
    label: "Systems",
    description:
      "Design systems, component architecture, and scalable UI foundations.",
    isDesignCore: true,
  },
  visual: {
    slug: "visual",
    label: "Visual",
    description:
      "Visual polish, hierarchy, and intentional interface direction.",
    isDesignCore: true,
  },
  interaction: {
    slug: "interaction",
    label: "Interaction",
    description: "Microinteractions, feedback loops, and UX behavior patterns.",
    isDesignCore: true,
  },
  performance: {
    slug: "performance",
    label: "Performance",
    description: "Rendering, bundle, and runtime optimization for smooth UIs.",
    isDesignCore: true,
  },
  craft: {
    slug: "craft",
    label: "Craft",
    description:
      "Execution quality, spacing, polish, and production readiness.",
    isDesignCore: true,
  },
  taste: {
    slug: "taste",
    label: "Taste",
    description:
      "Aesthetic judgment, style direction, and anti-generic UI quality.",
    isDesignCore: true,
  },
  typography: {
    slug: "typography",
    label: "Typography",
    description: "Type systems, readability, and hierarchy refinement.",
    isDesignCore: true,
  },
  color: {
    slug: "color",
    label: "Color",
    description: "Color systems, contrast, and palette strategy.",
    isDesignCore: true,
  },
  "3d": {
    slug: "3d",
    label: "3D",
    description:
      "Spatial interfaces, real-time graphics, and immersive UI scenes.",
    isDesignCore: true,
  },
  frontend: {
    slug: "frontend",
    label: "Frontend",
    description: "General frontend implementation guidance and patterns.",
    isDesignCore: false,
  },
  architecture: {
    slug: "architecture",
    label: "Architecture",
    description:
      "Project structure, composition patterns, and scalable code design.",
    isDesignCore: false,
  },
  testing: {
    slug: "testing",
    label: "Testing",
    description: "Reliability checks, QA flows, and regression prevention.",
    isDesignCore: false,
  },
  debugging: {
    slug: "debugging",
    label: "Debugging",
    description:
      "Root-cause analysis, instrumentation, and bug-fixing workflows.",
    isDesignCore: false,
  },
  "code-quality": {
    slug: "code-quality",
    label: "Code quality",
    description:
      "Maintainability reviews, abstraction cleanup, and deep code health work.",
    isDesignCore: false,
  },
  tooling: {
    slug: "tooling",
    label: "Tooling",
    description:
      "Build systems, CLI workflows, and developer productivity tools.",
    isDesignCore: false,
  },
  video: {
    slug: "video",
    label: "Video",
    description:
      "Video composition, storytelling, and timeline-based UI content.",
    isDesignCore: false,
  },
  nextjs: {
    slug: "nextjs",
    label: "Next.js",
    description:
      "Next.js conventions, performance, caching, and upgrade guidance.",
    isDesignCore: false,
  },
  nuxt: {
    slug: "nuxt",
    label: "Nuxt",
    description: "Nuxt workflows for Vue full-stack and SSR architectures.",
    isDesignCore: false,
  },
  vue: {
    slug: "vue",
    label: "Vue",
    description:
      "Vue component patterns, reactivity, and ecosystem best practices.",
    isDesignCore: false,
  },
  "react-native": {
    slug: "react-native",
    label: "React Native",
    description:
      "Mobile app performance, profiling, and React Native optimization.",
    isDesignCore: false,
  },
  threejs: {
    slug: "threejs",
    label: "Three.js",
    description:
      "Three.js workflows for rendering, materials, interaction, and shaders.",
    isDesignCore: false,
  },
  remotion: {
    slug: "remotion",
    label: "Remotion",
    description:
      "React-driven video generation, animation, and composition workflows.",
    isDesignCore: false,
  },
  swiftui: {
    slug: "swiftui",
    label: "SwiftUI",
    description:
      "SwiftUI interface patterns, composition, and architecture guidance.",
    isDesignCore: false,
  },
  frameworks: {
    slug: "frameworks",
    label: "Frameworks",
    description: "Framework-level practices across modern frontend stacks.",
    isDesignCore: false,
  },
} satisfies Record<TopicSlug, Topic>;

export const topics: Topic[] = Object.values(topicsBySlug);

export const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export const primaryDesignTopicSlugs: TopicSlug[] = [
  "accessibility",
  "motion",
  "systems",
  "visual",
  "interaction",
  "performance",
  "craft",
  "taste",
];

export const relatedTopicSlugs: Record<TopicSlug, TopicSlug[]> = {
  accessibility: ["testing", "color", "interaction", "frontend"],
  motion: ["interaction", "performance", "visual", "remotion"],
  systems: ["architecture", "frontend", "tooling", "craft"],
  visual: ["color", "typography", "craft", "taste"],
  interaction: ["motion", "visual", "accessibility", "frontend"],
  performance: ["tooling", "frontend", "testing", "motion", "debugging"],
  craft: ["visual", "systems", "typography", "taste"],
  taste: ["visual", "craft", "interaction", "motion"],
  typography: ["visual", "craft", "systems", "accessibility"],
  color: ["visual", "accessibility", "systems", "craft"],
  "3d": ["threejs", "visual", "interaction", "performance"],
  frontend: ["architecture", "tooling", "performance", "testing", "debugging", "code-quality"],
  architecture: ["systems", "frontend", "tooling", "testing", "code-quality"],
  testing: ["accessibility", "frontend", "performance", "tooling", "debugging", "code-quality"],
  debugging: ["testing", "performance", "frontend", "tooling", "code-quality"],
  "code-quality": ["architecture", "testing", "debugging", "tooling", "frontend"],
  tooling: ["frontend", "performance", "architecture", "testing", "code-quality"],
  video: ["motion", "remotion", "visual", "frontend"],
  nextjs: ["frontend", "performance", "tooling", "architecture"],
  nuxt: ["vue", "frontend", "performance", "tooling"],
  vue: ["nuxt", "frontend", "tooling", "performance"],
  "react-native": ["frontend", "performance", "interaction", "testing"],
  threejs: ["3d", "visual", "interaction", "performance"],
  remotion: ["video", "motion", "frontend", "visual"],
  swiftui: ["interaction", "systems", "performance", "frontend"],
  frameworks: ["frontend", "architecture", "tooling", "performance"],
};
