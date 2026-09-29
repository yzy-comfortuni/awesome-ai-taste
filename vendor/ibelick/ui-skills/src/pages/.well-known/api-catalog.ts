import type { APIRoute } from "astro";

export const prerender = true;

import {
  API_CATALOG_PATH,
  apiCatalogContentType,
  buildApiCatalogDocument,
  buildDiscoveryLinkHeader,
  getSiteOrigin,
} from "../../lib/agent-discovery";
import { DISCOVERY_JSON_CACHE } from "../../lib/cache-headers";

const catalogHeaders = (origin: string): HeadersInit => ({
  "Content-Type": apiCatalogContentType(),
  Link: buildDiscoveryLinkHeader(origin),
  "Cache-Control": DISCOVERY_JSON_CACHE,
});

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(JSON.stringify(buildApiCatalogDocument(origin), null, 2), {
    headers: catalogHeaders(origin),
  });
};

export const HEAD: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(null, {
    status: 200,
    headers: {
      ...catalogHeaders(origin),
      // RFC 9727 §2: HEAD must include the api-catalog link relation.
      Link: `<${origin}${API_CATALOG_PATH}>; rel="api-catalog"; type="application/linkset+json"`,
    },
  });
};
