import type { APIRoute } from "astro";

import { jsonHeaders, PUBLIC_SCOPES } from "../../lib/oauth-discovery";
import {
  MAX_OAUTH_BODY_BYTES,
  parseJsonObject,
  parseRequestedScopes,
} from "../../lib/oauth-validation";

const corsHeaders = {
  ...jsonHeaders,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function parseFormBody(raw: string): Record<string, string> {
  const params = new URLSearchParams(raw);
  const out: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    out[key] = value;
  }
  return out;
}

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";
  let grantType = "client_credentials";
  let scope = PUBLIC_SCOPES.join(" ");

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_OAUTH_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "invalid_request" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
    const form = parseFormBody(raw);
    grantType = form.grant_type || grantType;
    scope = form.scope || scope;
  } else if (contentType.includes("application/json")) {
    const body = parseJsonObject(await request.text());
    if (!body) {
      return new Response(JSON.stringify({ error: "invalid_request" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
    if (typeof body.grant_type === "string") grantType = body.grant_type;
    if (typeof body.scope === "string") scope = body.scope;
  }

  if (grantType !== "client_credentials") {
    return new Response(
      JSON.stringify({
        error: "unsupported_grant_type",
        error_description:
          "UI Skills currently issues public-read tokens via client_credentials.",
      }),
      { status: 400, headers: corsHeaders },
    );
  }

  const requestedScopes = parseRequestedScopes(scope);
  if (!requestedScopes) {
    return new Response(
      JSON.stringify({
        error: "invalid_scope",
        error_description: `Supported scopes: ${PUBLIC_SCOPES.join(" ")}`,
      }),
      { status: 400, headers: corsHeaders },
    );
  }

  const accessToken = `uis_${crypto.randomUUID().replaceAll("-", "")}`;

  return new Response(
    JSON.stringify({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 3600,
      scope: requestedScopes.join(" "),
    }),
    { headers: corsHeaders },
  );
};
