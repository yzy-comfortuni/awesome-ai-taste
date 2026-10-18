# Security

## Reporting a vulnerability

Please do not post vulnerabilities, credentials, session cookies, or personal
data in public issues. Use [GitHub private vulnerability reporting](https://github.com/ibelick/ui-skills/security/advisories/new)
if available; otherwise contact a maintainer privately before sharing details.
Include the affected revision, reproduction steps, and expected impact. Test
against your own local instance and accounts, not other people's data.

## Authentication boundaries

- Public browsing does not require an account. Website sessions are separate
  from the public agent OAuth and MCP endpoints.
- Better Auth handles OAuth state, provider verification, cookie signing, and
  CSRF/origin checks. Do not bypass these checks or add wildcard trusted origins.
- The configured auth origin is explicit. HTTP is permitted only on loopback
  hosts for development. Production cookies are secure, HTTP-only, host-only,
  and SameSite=Lax.
- Sessions are checked against D1; cookie-based session caching is disabled so
  revocation takes effect on the next check. Private responses bypass browser
  and CDN caching and do not send referrers.
- Matching emails do not automatically merge accounts. Linking requires an
  authenticated session. Unlinking, profile updates, and provider-token API
  endpoints are disabled until deliberately supported.
- Provider tokens are encrypted at rest with the auth secret. Keep secrets out
  of Git, logs, issues, and client bundles. Restrict D1 and deployment access.
  Auth diagnostics log severity only, not upstream messages or payloads. Also
  ensure infrastructure/access logs do not retain OAuth callback query strings.
- Rate limits use D1 and trust only Cloudflare's `CF-Connecting-IP` header.
  These application limits are not a replacement for edge abuse/DDoS controls.

## Before deployment

Use Node.js 22.19 or newer and `npm ci`. Run `npm test`, `npm run typecheck`,
`npm run build`, and `npm audit`. Review dependency advisories rather than
blindly forcing upgrades or adding incompatible overrides.

Use separate local and production OAuth apps, secrets, and databases. Register
exact callback URLs, request only identity/email scopes, and apply migrations
before enabling sign-in. Do not override private cache headers with Cloudflare
cache rules. Validate sign-in, linking, sign-out, and rejected callbacks with
real provider apps before launch; local tests cannot verify provider settings.

Do not blindly replace `BETTER_AUTH_SECRET`: it signs sessions and encrypts
stored provider tokens. Follow Better Auth's versioned secret-rotation guidance
and retain required old decryption keys. If credentials are exposed, revoke
them with the provider and invalidate affected sessions as appropriate.

Automated tests and dependency scans reduce risk; they do not certify that a
deployment is free of vulnerabilities. The site's current CSP permits inline
scripts/styles; this is not a strict-CSP guarantee against XSS.
