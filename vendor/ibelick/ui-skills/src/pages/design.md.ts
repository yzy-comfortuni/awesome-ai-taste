import type { APIRoute } from "astro";

export const prerender = true;
import designDocument from "../../DESIGN.md?raw";

import { SEMI_STATIC_CACHE } from "../lib/cache-headers";

export const GET: APIRoute = () =>
  new Response(designDocument, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": SEMI_STATIC_CACHE,
    },
  });
