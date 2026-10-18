import { defineMiddleware } from "astro:middleware";

import { buildDiscoveryLinkHeader, getSiteOrigin } from "./lib/agent-discovery";
import { getHtmlCacheControl } from "./lib/cache-headers";
import { maybeNegotiateMarkdown } from "./lib/markdown-negotiation";
import { isAuthPath } from "./lib/auth-config";
import { isLibraryPath } from "./lib/library-types";
import { setPrivateAuthHeaders } from "./lib/auth-response";

const localJobsApiSource = import.meta.env.DEV ? " http://localhost:8787" : "";

const securityHeaders = {
  "Content-Security-Policy": `default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://api.interfaceoffice.com https://collector.onedollarstats.com https://jobs-api.ui-skills.com https://challenges.cloudflare.com${localJobsApiSource}; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`,
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function applyResponseHeaders(
  response: Response,
  origin: string,
  pathname: string,
): Response {
  const headers = new Headers(response.headers);
  Object.entries(securityHeaders).forEach(([key, value]) =>
    headers.set(key, value),
  );
  // RFC 8288 discovery links for agents (isitagentready.com linkHeaders check).
  if (!headers.has("Link")) {
    headers.set("Link", buildDiscoveryLinkHeader(origin));
  }
  const cacheControl = getHtmlCacheControl(pathname);
  if (isAuthPath(pathname) || isLibraryPath(pathname)) {
    setPrivateAuthHeaders(headers);
  } else if (headers.has("Set-Cookie")) {
    headers.set("Cache-Control", "private, no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  } else if (cacheControl && !headers.has("Cache-Control")) {
    headers.set("Cache-Control", cacheControl);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const origin = getSiteOrigin(context.site);

  if (context.isPrerendered) {
    return next();
  }

  const url = new URL(context.request.url);

  // OAuth callbacks must reach Better Auth unchanged. Never negotiate private HTML.
  if (isAuthPath(url.pathname) || isLibraryPath(url.pathname)) {
    return applyResponseHeaders(await next(), origin, url.pathname);
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    const status =
      context.request.method === "GET" || context.request.method === "HEAD"
        ? 301
        : 308;
    const response = Response.redirect(url, status);
    return applyResponseHeaders(response, origin, url.pathname);
  }

  const response = await next();
  const withHeaders = applyResponseHeaders(response, origin, url.pathname);
  return maybeNegotiateMarkdown(context.request, withHeaders);
});
