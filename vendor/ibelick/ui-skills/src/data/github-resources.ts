import { iconLibraries } from "./icon-libraries";

export type GithubResource = {
  source: "site" | "icons" | "components" | "tools" | "mcp";
  key: string;
  githubRepo: string;
};

export const githubResources: GithubResource[] = [
  {
    source: "site",
    key: "UI Skills",
    githubRepo: "ibelick/ui-skills",
  },
  ...iconLibraries.map((library) => ({
    source: "icons" as const,
    key: library.name,
    githubRepo: library.githubRepo,
  })),
];
