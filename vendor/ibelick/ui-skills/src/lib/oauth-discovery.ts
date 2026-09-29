import { getSiteOrigin } from "./agent-discovery";
import { DISCOVERY_JSON_CACHE } from "./cache-headers";

export { getSiteOrigin };

export const PUBLIC_SCOPES = [
  "skills:read",
  "registry:read",
  "design:read",
] as const;

export function buildProtectedResourceMetadata(origin: string) {
  return {
    resource: `${origin}/`,
    resource_name: "UI Skills",
    authorization_servers: [origin],
    scopes_supported: [...PUBLIC_SCOPES],
    bearer_methods_supported: ["header"],
    resource_documentation: `${origin}/auth.md`,
  };
}

export function buildAuthorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/oauth/authorize`,
    token_endpoint: `${origin}/oauth/token`,
    registration_endpoint: `${origin}/oauth/register`,
    revocation_endpoint: `${origin}/oauth/revoke`,
    jwks_uri: `${origin}/.well-known/jwks.json`,
    // Agents use anonymous client_credentials; interactive code flow is not offered.
    response_types_supported: ["token"],
    grant_types_supported: ["client_credentials"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: [...PUBLIC_SCOPES],
    service_documentation: `${origin}/auth.md`,
    agent_auth: {
      skill: `${origin}/auth.md`,
      register_uri: `${origin}/oauth/register`,
      claim_uri: `${origin}/oauth/claim`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["access_token"],
        claim_uri: `${origin}/oauth/claim`,
      },
    },
  };
}

export function buildOpenIdConfiguration(origin: string) {
  const as = buildAuthorizationServerMetadata(origin);
  return {
    ...as,
    userinfo_endpoint: `${origin}/oauth/userinfo`,
    subject_types_supported: ["public"],
    // No ID tokens are issued today; keep discovery complete without claiming RS256 keys.
    id_token_signing_alg_values_supported: ["none"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat"],
  };
}

export function buildJwks() {
  // Public catalog APIs do not require bearer tokens today. Publish an empty
  // JWKS document so discovery has a stable jwks_uri target.
  return { keys: [] as unknown[] };
}

export function buildAuthMarkdown(origin: string): string {
  return `# auth.md

You are an agent. UI Skills publishes a public skill catalog and machine-readable
discovery surfaces. Most read APIs do not require authentication. Follow this
recipe when you need optional agent credentials for attribution or future
protected scopes.

## Audience

Agents that install or browse UI design-engineering skills from ${origin}.

## Step 1 — Discover

### 1a. Protected Resource Metadata

\`\`\`http
GET ${origin}/.well-known/oauth-protected-resource
\`\`\`

- \`resource\` — canonical API audience (\`${origin}/\`)
- \`authorization_servers\` — \`${origin}\`
- \`scopes_supported\` — \`skills:read\`, \`registry:read\`, \`design:read\`
- \`bearer_methods_supported\` — \`header\`

### 1b. Authorization Server Metadata

\`\`\`http
GET ${origin}/.well-known/oauth-authorization-server
\`\`\`

Also available as OpenID Connect discovery:

\`\`\`http
GET ${origin}/.well-known/openid-configuration
\`\`\`

## Step 2 — Register (optional)

Public catalog reads work without registration. To obtain an agent client
identity for optional scopes, POST to the register URI from \`agent_auth\`:

\`\`\`http
POST ${origin}/oauth/register
Content-Type: application/json

{
  "client_name": "example-agent",
  "token_endpoint_auth_method": "none",
  "grant_types": ["client_credentials"],
  "identity_type": "anonymous"
}
\`\`\`

## Step 3 — Claim / token (optional)

Anonymous agents may claim a short-lived access token:

\`\`\`http
POST ${origin}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=skills:read
\`\`\`

Or use the claim endpoint advertised in \`agent_auth.anonymous.claim_uri\`:

\`\`\`http
POST ${origin}/oauth/claim
\`\`\`

## Step 4 — Call APIs

Public endpoints (no token required):

- \`${origin}/skills/registry.json\`
- \`${origin}/llms.txt\`
- \`${origin}/design.md\`
- \`${origin}/.well-known/api-catalog\`
- \`${origin}/.well-known/agent-skills/index.json\`
- \`${origin}/.well-known/mcp/server-card.json\`
- \`${origin}/mcp\`

When you hold a token, send it as:

\`\`\`http
Authorization: Bearer <access_token>
\`\`\`

## Notes

Tokens are ephemeral public-read credentials for attribution. UI Skills does not
currently persist or revoke them server-side. Catalog reads remain available
without a token.
`;
}

export const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": DISCOVERY_JSON_CACHE,
  "Access-Control-Allow-Origin": "*",
} as const;

export const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": DISCOVERY_JSON_CACHE,
  "Access-Control-Allow-Origin": "*",
} as const;
