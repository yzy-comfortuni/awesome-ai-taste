import type { APIRoute } from "astro";

import { jsonHeaders, PUBLIC_SCOPES } from "../../lib/oauth-discovery";
import { parseJsonObject } from "../../lib/oauth-validation";

const corsHeaders = {
  ...jsonHeaders,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown> = {};
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const parsed = parseJsonObject(await request.text());
    if (!parsed) {
      return new Response(JSON.stringify({ error: "invalid_request" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
    body = parsed;
  }

  const clientName =
    typeof body.client_name === "string" && body.client_name.trim()
      ? body.client_name.trim().slice(0, 128)
      : "anonymous-agent";

  const clientId = `agent_${crypto.randomUUID().replaceAll("-", "").slice(0, 16)}`;

  return new Response(
    JSON.stringify(
      {
        client_id: clientId,
        client_name: clientName,
        client_id_issued_at: Math.floor(Date.now() / 1000),
        token_endpoint_auth_method: "none",
        grant_types: ["client_credentials"],
        response_types: ["token"],
        scope: PUBLIC_SCOPES.join(" "),
        identity_type: "anonymous",
      },
      null,
      2,
    ),
    { status: 201, headers: corsHeaders },
  );
};
