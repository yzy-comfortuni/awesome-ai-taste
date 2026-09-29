import type { APIRoute } from "astro";

import {
  buildAgentSkillsIndex,
  discoveryJsonHeaders,
  toPublicAgentSkillsIndex,
} from "../../../lib/agent-skills-discovery";
import { getSiteOrigin } from "../../../lib/agent-discovery";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const origin = getSiteOrigin(site);
  const index = toPublicAgentSkillsIndex(await buildAgentSkillsIndex(origin));
  return new Response(JSON.stringify(index, null, 2), {
    headers: discoveryJsonHeaders,
  });
};

export const HEAD: APIRoute = async (context) => {
  const response = await GET(context);
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
};
