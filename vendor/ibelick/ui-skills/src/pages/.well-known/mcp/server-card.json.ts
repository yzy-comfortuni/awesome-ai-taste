import type { APIRoute } from "astro";

export const prerender = true;

import {
  buildMcpServerCard,
  discoveryJsonHeaders,
} from "../../../lib/agent-skills-discovery";
import { getSiteOrigin } from "../../../lib/agent-discovery";

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  return new Response(JSON.stringify(buildMcpServerCard(origin), null, 2), {
    headers: discoveryJsonHeaders,
  });
};

export const HEAD: APIRoute = () =>
  new Response(null, { status: 200, headers: discoveryJsonHeaders });
