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
    label: "Icon libraries",
    href: "/icons",
    description:
      "Browse open-source icon libraries for product interfaces and web apps.",
  },
];
