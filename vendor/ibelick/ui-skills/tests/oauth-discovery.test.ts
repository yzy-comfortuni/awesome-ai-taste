import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildAuthMarkdown,
  buildAuthorizationServerMetadata,
  buildOpenIdConfiguration,
  buildProtectedResourceMetadata,
} from "../src/lib/oauth-discovery.ts";
import { GET as getAuthMd } from "../src/pages/auth.md.ts";
import { GET as getAs } from "../src/pages/.well-known/oauth-authorization-server.ts";
import { GET as getOidc } from "../src/pages/.well-known/openid-configuration.ts";
import { GET as getPrm } from "../src/pages/.well-known/oauth-protected-resource.ts";
import { POST as postRegister } from "../src/pages/oauth/register.ts";
import { POST as postToken } from "../src/pages/oauth/token.ts";
import { POST as postClaim } from "../src/pages/oauth/claim.ts";

const origin = "https://www.ui-skills.com";
const siteCtx = { site: new URL(origin) } as never;

describe("oauth auth discovery", () => {
  test("authorization server metadata includes required fields and agent_auth", () => {
    const metadata = buildAuthorizationServerMetadata(origin);
    assert.equal(metadata.issuer, origin);
    assert.ok(metadata.authorization_endpoint);
    assert.ok(metadata.token_endpoint);
    assert.ok(metadata.jwks_uri);
    assert.deepEqual(metadata.grant_types_supported, ["client_credentials"]);
    assert.deepEqual(metadata.response_types_supported, ["token"]);
    assert.deepEqual(metadata.token_endpoint_auth_methods_supported, ["none"]);
    assert.equal(metadata.agent_auth.skill, `${origin}/auth.md`);
    assert.ok(metadata.agent_auth.register_uri);
    assert.ok(metadata.agent_auth.identity_types_supported.includes("anonymous"));
  });

  test("protected resource metadata lists authorization servers and scopes", () => {
    const metadata = buildProtectedResourceMetadata(origin);
    assert.equal(metadata.resource, `${origin}/`);
    assert.deepEqual(metadata.authorization_servers, [origin]);
    assert.ok(metadata.scopes_supported.includes("skills:read"));
    assert.deepEqual(metadata.bearer_methods_supported, ["header"]);
  });

  test("openid configuration reuses authorization server issuer", () => {
    const oidc = buildOpenIdConfiguration(origin);
    assert.equal(oidc.issuer, origin);
    assert.ok(oidc.userinfo_endpoint);
    assert.deepEqual(oidc.id_token_signing_alg_values_supported, ["none"]);
  });

  test("auth.md uses the required heading", () => {
    assert.match(buildAuthMarkdown(origin), /^# auth\.md\n/);
  });

  test("well-known routes return JSON/markdown", async () => {
    const as = await getAs(siteCtx);
    const oidc = await getOidc(siteCtx);
    const prm = await getPrm(siteCtx);
    const authMd = await getAuthMd(siteCtx);

    assert.equal(as.status, 200);
    assert.match(as.headers.get("content-type") ?? "", /application\/json/);
    assert.equal((await as.json()).issuer, origin);

    assert.equal(oidc.status, 200);
    assert.equal((await oidc.json()).issuer, origin);

    assert.equal(prm.status, 200);
    assert.equal((await prm.json()).resource, `${origin}/`);

    assert.equal(authMd.status, 200);
    assert.match(authMd.headers.get("content-type") ?? "", /text\/markdown/);
    assert.match(await authMd.text(), /^# auth\.md\n/);
  });

  test("anonymous register/token/claim endpoints issue public-read credentials", async () => {
    const registered = await postRegister({
      request: new Request(`${origin}/oauth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_name: "test-agent" }),
      }),
    } as never);
    assert.equal(registered.status, 201);
    const client = (await registered.json()) as { client_id: string };
    assert.match(client.client_id, /^agent_/);

    const token = await postToken({
      request: new Request(`${origin}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials&scope=skills:read",
      }),
    } as never);
    assert.equal(token.status, 200);
    const tokenBody = (await token.json()) as {
      access_token: string;
      token_type: string;
    };
    assert.match(tokenBody.access_token, /^uis_/);
    assert.equal(tokenBody.token_type, "Bearer");

    const claim = await postClaim({} as never);
    assert.equal(claim.status, 200);
    assert.match(
      ((await claim.json()) as { access_token: string }).access_token,
      /^uis_/,
    );
  });
});
