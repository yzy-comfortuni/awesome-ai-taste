import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getAuth } from "../../../lib/auth";

export const prerender = false;

export const ALL: APIRoute = async ({ request, url }) => {
  const auth = getAuth(env);
  if (!auth) {
    // Public pages can render their signed-out header without configured OAuth.
    if (request.method === "GET" && url.pathname === "/api/auth/get-session") {
      return Response.json(null);
    }
    return Response.json(
      { error: "Sign-in is not configured yet." },
      { status: 503 },
    );
  }
  return auth.handler(request);
};
