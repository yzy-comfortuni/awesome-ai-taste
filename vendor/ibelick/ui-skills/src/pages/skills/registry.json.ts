import type { APIRoute } from "astro";

import { registry } from "../../data/registry";
import { topics } from "../../data/topics";

import { REGISTRY_JSON_CACHE } from "../../lib/cache-headers";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ registry, topics }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": REGISTRY_JSON_CACHE,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
