const SITE_ORIGIN = "https://www.ui-skills.com";

export const API_CATALOG_PATH = "/.well-known/api-catalog";
export const API_CATALOG_PROFILE = "https://www.rfc-editor.org/info/rfc9727";

export function getSiteOrigin(site?: URL | null): string {
  return site?.origin ?? SITE_ORIGIN;
}

/** RFC 8288 Link header values for agent discovery. */
export function buildDiscoveryLinkHeader(origin: string = SITE_ORIGIN): string {
  return [
    `<${origin}/llms.txt>; rel="describedby"; type="text/plain"; title="Site index for LLMs"`,
    `<${origin}${API_CATALOG_PATH}>; rel="api-catalog"; type="application/linkset+json"; title="API catalog"`,
    `<${origin}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"; title="Agent skills index"`,
    `<${origin}/.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"; title="MCP server card"`,
    `<${origin}/.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"; title="OAuth protected resource"`,
    `<${origin}/auth.md>; rel="service-doc"; type="text/markdown"; title="Agent auth"`,
    `<${origin}/design.md>; rel="service-doc"; type="text/markdown"; title="Design system"`,
    `<${origin}/skills/registry.json>; rel="service-desc"; type="application/json"; title="Skills registry"`,
    `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"; title="Sitemap"`,
  ].join(", ");
}

export type ApiCatalogDocument = {
  linkset: Array<{
    anchor: string;
    item: Array<{
      href: string;
      type?: string;
      title?: string;
    }>;
  }>;
};

export function buildApiCatalogDocument(
  origin: string = SITE_ORIGIN,
): ApiCatalogDocument {
  return {
    linkset: [
      {
        anchor: `${origin}${API_CATALOG_PATH}`,
        item: [
          {
            href: `${origin}/skills/registry.json`,
            type: "application/json",
            title: "Skills registry (JSON)",
          },
          {
            href: `${origin}/skills/registry.txt`,
            type: "text/plain",
            title: "Skills registry (text)",
          },
          {
            href: `${origin}/.well-known/agent-skills/index.json`,
            type: "application/json",
            title: "Agent skills discovery index",
          },
          {
            href: `${origin}/.well-known/mcp/server-card.json`,
            type: "application/json",
            title: "MCP server card",
          },
          {
            href: `${origin}/mcp`,
            type: "application/json",
            title: "MCP endpoint",
          },
          {
            href: `${origin}/mcp/docs`,
            type: "text/html",
            title: "MCP documentation",
          },
          {
            href: `${origin}/cli`,
            type: "text/html",
            title: "CLI documentation",
          },
          {
            href: `${origin}/.well-known/oauth-protected-resource`,
            type: "application/json",
            title: "OAuth protected resource metadata",
          },
          {
            href: `${origin}/.well-known/oauth-authorization-server`,
            type: "application/json",
            title: "OAuth authorization server metadata",
          },
          {
            href: `${origin}/.well-known/openid-configuration`,
            type: "application/json",
            title: "OpenID Connect discovery",
          },
          {
            href: `${origin}/auth.md`,
            type: "text/markdown",
            title: "Agent auth documentation",
          },
          {
            href: `${origin}/llms.txt`,
            type: "text/plain",
            title: "LLM site index",
          },
          {
            href: `${origin}/design.md`,
            type: "text/markdown",
            title: "Design system",
          },
          {
            href: `${origin}/api/github-stars`,
            type: "application/json",
            title: "GitHub stars",
          },
          {
            href: `${origin}/sitemap.xml`,
            type: "application/xml",
            title: "Sitemap",
          },
        ],
      },
    ],
  };
}

export function apiCatalogContentType(): string {
  return `application/linkset+json; profile="${API_CATALOG_PROFILE}"`;
}
