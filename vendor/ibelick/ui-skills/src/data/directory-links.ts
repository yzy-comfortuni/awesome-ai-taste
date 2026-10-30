export type DirectoryLink = {
  label: string;
  href: string;
  description: string;
};

export const componentDirectoryLinks: DirectoryLink[] = [
  {
    label: "All component libraries",
    href: "/components",
    description:
      "Browse every curated component library and UI system in one directory.",
  },
  {
    label: "Design systems",
    href: "/design-systems",
    description:
      "Browse public design systems from product companies, component libraries, and government services.",
  },
  {
    label: "Icon libraries",
    href: "/icons",
    description:
      "Browse open-source icon libraries for product interfaces and web apps.",
  },
];

export const designSystemDirectoryLinks: DirectoryLink[] = [
  {
    label: "All design systems",
    href: "/design-systems",
    description: "Browse every curated design system in one directory.",
  },
  {
    label: "Component libraries",
    href: "/components",
    description:
      "Compare React libraries, primitives, shadcn components, and UI systems.",
  },
];
