import type { APIRoute } from "astro";

export const prerender = true;

import {
  buildOpenIdConfiguration,
  getSiteOrigin,
  jsonHeaders,
} from "../../lib/oauth-discovery";

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(JSON.stringify(buildOpenIdConfiguration(origin), null, 2), {
    headers: jsonHeaders,
  });
};

export const HEAD: APIRoute = () =>
  new Response(null, { status: 200, headers: jsonHeaders });
