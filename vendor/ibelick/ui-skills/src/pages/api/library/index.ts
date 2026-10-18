import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getAuth, getPageSession } from "../../../lib/auth";
import { handleLibraryRequest } from "../../../lib/library-http";
import { createLibraryStore } from "../../../lib/library-store";

export const prerender = false;

async function handle(request: Request) {
  const auth = getAuth(env);
  if (!auth || !env.AUTH_DB) {
    return Response.json(
      { error: "Sign-in is not configured yet." },
      { status: 503 },
    );
  }

  const responseHeaders = new Headers();
  const session = await getPageSession(auth, request.headers, responseHeaders);
  const response = await handleLibraryRequest(
    request,
    session?.user.id ?? null,
    createLibraryStore(env.AUTH_DB),
  );
  for (const cookie of responseHeaders.getSetCookie()) {
    response.headers.append("Set-Cookie", cookie);
  }
  return response;
}

export const ALL: APIRoute = ({ request }) => handle(request);
