import type { APIRoute } from "astro";

import { jsonHeaders } from "../../lib/oauth-discovery";

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const redirectUri = url.searchParams.get("redirect_uri");
  const state = url.searchParams.get("state");

  if (!redirectUri) {
    return new Response(
      JSON.stringify({
        error: "invalid_request",
        error_description:
          "Authorization code flow is optional. Prefer client_credentials for agents, or omit auth for public catalog reads.",
      }),
      { status: 400, headers: jsonHeaders },
    );
  }

  const target = new URL(redirectUri);
  target.searchParams.set("error", "unauthorized_client");
  target.searchParams.set(
    "error_description",
    "Interactive authorization is not required for public UI Skills catalog APIs.",
  );
  if (state) target.searchParams.set("state", state);

  return Response.redirect(target, 302);
};
