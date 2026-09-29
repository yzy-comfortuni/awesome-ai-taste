import type { APIRoute } from "astro";

import { jsonHeaders, PUBLIC_SCOPES } from "../../lib/oauth-discovery";

const corsHeaders = {
  ...jsonHeaders,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

/** Anonymous agent claim ceremony — issues a public-read access token. */
export const POST: APIRoute = async () => {
  const accessToken = `uis_${crypto.randomUUID().replaceAll("-", "")}`;

  return new Response(
    JSON.stringify({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 3600,
      scope: PUBLIC_SCOPES.join(" "),
      identity_type: "anonymous",
    }),
    { headers: corsHeaders },
  );
};
