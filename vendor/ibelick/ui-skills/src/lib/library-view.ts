import { getSkillByPath } from "./skill-catalog";

export type LibrarySkillView = {
  path: string;
  href: string;
  slug: string;
  name: string;
  description?: string;
  ownerLabel?: string;
  avatarUrl?: string;
  available: boolean;
};

export function toLibrarySkill(path: string): LibrarySkillView {
  const skill = getSkillByPath(path);
  if (!skill) {
    return {
      path,
      href: "/skills",
      slug: path,
      name: path,
      available: false,
    };
  }
  return {
    path: skill.pathSlug,
    href: `/skills/${skill.pathSlug}`,
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    ownerLabel: skill.sourceLabel,
    avatarUrl: skill.sourceKey
      ? `https://github.com/${skill.sourceKey}.png?size=80`
      : undefined,
    available: true,
  };
}
