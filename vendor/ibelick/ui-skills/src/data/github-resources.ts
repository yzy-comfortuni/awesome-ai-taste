import { componentLibraries } from "./component-libraries";
import { designSystems } from "./design-systems";
import { iconLibraries } from "./icon-libraries";

export type GithubResource = {
  source: "site" | "icons" | "components" | "design-systems" | "tools" | "mcp";
  key: string;
  githubRepo?: string;
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
  ...componentLibraries
    .filter((library): library is typeof library & { githubRepo: string } =>
      Boolean(library.githubRepo),
    )
    .map((library) => ({
      source: "components" as const,
      key: library.name,
      githubRepo: library.githubRepo,
    })),
  ...designSystems
    .filter((system): system is typeof system & { githubRepo: string } =>
      Boolean(system.githubRepo),
    )
    .map((system) => ({
      source: "design-systems" as const,
      key: system.name,
      githubRepo: system.githubRepo,
    })),
];
