import type { APIRoute } from "astro";

export const prerender = true;

import type { RegistrySkill } from "../../data/registry";
import { registry } from "../../data/registry";

import { SEMI_STATIC_CACHE } from "../../lib/cache-headers";

export const GET: APIRoute = () => {
  const body = registry
    .map(
      (entry: RegistrySkill) =>
        `${entry.pathSlug}\t${entry.rawUrl}\t${entry.description ?? ""}`,
    )
    .join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": SEMI_STATIC_CACHE,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
