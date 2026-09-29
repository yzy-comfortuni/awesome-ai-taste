import type { APIRoute } from "astro";

import { jsonHeaders } from "../../lib/oauth-discovery";

export const POST: APIRoute = async () =>
  new Response(
    JSON.stringify({
      revoked: true,
      note: "UI Skills currently issues ephemeral public-read tokens with no server-side revocation store.",
    }),
    { headers: jsonHeaders },
  );
