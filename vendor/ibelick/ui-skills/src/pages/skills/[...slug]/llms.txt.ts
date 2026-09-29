import type { APIRoute } from "astro";
import {
  getCanonicalSkillPaths,
  getRegistryByPath,
  getSkillByPath,
} from "../../../lib/skill-catalog";
import { defaultSkillContentLoader } from "../../../lib/agent-skills-discovery";

export const prerender = true;

export function getStaticPaths() {
  return getCanonicalSkillPaths();
}

export const GET: APIRoute = async ({ params }) => {
  const routeSlug = params.slug ?? "";
  const pathSlug = Array.isArray(routeSlug) ? routeSlug.join("/") : routeSlug;
  const skillEntry = getSkillByPath(pathSlug);

  if (!skillEntry) {
    return new Response("Skill not found", { status: 404 });
  }

  const registrySkill = getRegistryByPath(pathSlug);
  if (!registrySkill) {
    return new Response("Skill not found", { status: 404 });
  }

  try {
    const content = await defaultSkillContentLoader(registrySkill);
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Skill source unavailable", { status: 502 });
  }
};
