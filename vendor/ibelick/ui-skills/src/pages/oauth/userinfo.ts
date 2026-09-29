import type { APIRoute } from "astro";

import { jsonHeaders } from "../../lib/oauth-discovery";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      sub: "public",
      name: "UI Skills public agent",
    }),
    { headers: jsonHeaders },
  );
