import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getAuthTables } from "@better-auth/core/db";
import { getTableConfig } from "drizzle-orm/sqlite-core";
import {
  getAuthConfig,
  isAuthPath,
  safeReturnTo,
  type AuthEnv,
} from "../src/lib/auth-config.ts";
import { getAuth } from "../src/lib/auth.ts";
import * as schema from "../src/db/schema.ts";
import { setPrivateAuthHeaders } from "../src/lib/auth-response.ts";

const testEnv: AuthEnv = {
  AUTH_DB: {} as NonNullable<AuthEnv["AUTH_DB"]>,
  BETTER_AUTH_URL: "http://localhost:4321",
  BETTER_AUTH_SECRET: "test-only-secret-that-is-at-least-32-characters",
  GOOGLE_CLIENT_ID: "test-google-id",
  GOOGLE_CLIENT_SECRET: "test-google-secret",
  GITHUB_CLIENT_ID: "test-github-id",
  GITHUB_CLIENT_SECRET: "test-github-secret",
};

describe("website authentication", () => {
  test("leaves public development usable without credentials", () => {
    assert.equal(getAuthConfig({}), null);
    assert.equal(getAuth({}), null);
    assert.equal(
      getAuthConfig({ ...testEnv, BETTER_AUTH_SECRET: "short" }),
      null,
    );
    assert.equal(
      getAuthConfig({
        ...testEnv,
        GOOGLE_CLIENT_SECRET: undefined,
        GITHUB_CLIENT_SECRET: undefined,
      }),
      null,
    );
  });

  test("supports GitHub alone and ignores incomplete Google credentials", () => {
    for (const GOOGLE_CLIENT_ID of [undefined, "incomplete-google-id"]) {
      const env = {
        ...testEnv,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: undefined,
      };
      const config = getAuthConfig(env);
      assert.ok(config);
      assert.deepEqual(Object.keys(config.socialProviders), ["github"]);
      assert.deepEqual(Object.keys(getAuth(env)!.options.socialProviders), [
        "github",
      ]);
    }
  });

  test("supports Google alone and ignores incomplete GitHub credentials", () => {
    const env = { ...testEnv, GITHUB_CLIENT_SECRET: undefined };
    assert.deepEqual(Object.keys(getAuthConfig(env)!.socialProviders), [
      "google",
    ]);
    assert.deepEqual(Object.keys(getAuth(env)!.options.socialProviders), [
      "google",
    ]);
  });

  test("requires an explicit safe auth origin", () => {
    assert.equal(getAuthConfig(testEnv)?.baseURL, "http://localhost:4321");
    assert.equal(getAuthConfig(testEnv)?.secureCookies, false);
    assert.equal(
      getAuthConfig({
        ...testEnv,
        BETTER_AUTH_URL: "https://www.ui-skills.com",
      })?.secureCookies,
      true,
    );
    for (const url of [
      "http://www.ui-skills.com",
      "https://user:password@example.com",
      "https://example.com/path",
      "not-a-url",
    ]) {
      assert.equal(getAuthConfig({ ...testEnv, BETTER_AUTH_URL: url }), null);
    }
  });

  test("separates private website routes from public agent OAuth", () => {
    for (const path of [
      "/api/auth",
      "/api/auth/callback/google",
      "/login",
      "/login/",
      "/account",
      "/account/settings",
    ])
      assert.ok(isAuthPath(path));
    for (const path of [
      "/",
      "/skills",
      "/oauth/token",
      "/auth.md",
      "/mcp",
      "/.well-known/oauth-authorization-server",
    ])
      assert.ok(!isAuthPath(path));
  });

  test("rejects external, encoded, and auth-loop return URLs", () => {
    for (const value of [
      null,
      "https://evil.example",
      "//evil.example",
      "/\\evil.example",
      "/%2f%2fevil.example",
      "/\u0000evil",
      "/\u007fevil",
      "/skills/../login",
      "/login",
      "/api/auth/sign-out",
      "/account?next=bad",
    ])
      assert.equal(safeReturnTo(value), "/account");
    assert.equal(safeReturnTo("/skills/new"), "/skills/new");
    assert.equal(safeReturnTo("/skills?topic=motion"), "/skills?topic=motion");
  });

  test("private responses override public cache policies without losing cookies", () => {
    const headers = new Headers({ "Cache-Control": "public, max-age=3600" });
    headers.append("Set-Cookie", "session=one; HttpOnly; Path=/");
    headers.append("Set-Cookie", "state=two; HttpOnly; Path=/");
    setPrivateAuthHeaders(headers);
    assert.equal(headers.get("Cache-Control"), "private, no-store");
    assert.equal(headers.get("CDN-Cache-Control"), "no-store");
    assert.equal(headers.get("Cloudflare-CDN-Cache-Control"), "no-store");
    assert.equal(headers.get("Referrer-Policy"), "no-referrer");
    assert.equal(headers.get("X-Robots-Tag"), "noindex, nofollow");
    assert.equal(headers.getSetCookie().length, 2);
  });

  test("schema contains every field required by the installed Better Auth version", () => {
    const tables = getAuthTables({ rateLimit: { storage: "database" } });
    for (const [name, table] of Object.entries(tables)) {
      const columns = schema[name as keyof typeof schema];
      assert.ok(columns, `Missing table: ${name}`);
      assert.ok(
        getTableConfig(columns).columns.some((column) => column.primary),
      );
      for (const field of Object.keys(table.fields))
        assert.ok(field in columns, `Missing ${name}.${field}`);
    }
  });

  test("configures only Google/GitHub with encrypted tokens and explicit linking", () => {
    const auth = getAuth(testEnv)!;
    assert.deepEqual(Object.keys(auth.options.socialProviders!), [
      "google",
      "github",
    ]);
    assert.equal(auth.options.emailAndPassword?.enabled, false);
    assert.equal(
      auth.options.account?.accountLinking?.disableImplicitLinking,
      true,
    );
    assert.equal(auth.options.account?.encryptOAuthTokens, true);
    assert.equal(auth.options.rateLimit?.storage, "database");
    assert.equal(auth.options.session?.cookieCache?.enabled, true);
    assert.equal(auth.options.session?.cookieCache?.maxAge, 300);
  });

  test("HTTPS session cookies are secure, HTTP-only, host-only, and SameSite=Lax", async () => {
    const auth = getAuth({
      ...testEnv,
      BETTER_AUTH_URL: "https://www.ui-skills.com",
    })!;
    const context = await auth.$context;
    const cookie = context.authCookies.sessionToken;
    assert.equal(cookie.attributes.secure, true);
    assert.equal(cookie.attributes.httpOnly, true);
    assert.equal(cookie.attributes.sameSite, "lax");
    assert.equal(cookie.attributes.path, "/");
    assert.equal(cookie.attributes.domain, undefined);
    assert.deepEqual(
      [...new Set(context.trustedOrigins)],
      ["https://www.ui-skills.com"],
    );
  });

  test("does not log provider payloads or sensitive diagnostic messages", (t) => {
    const log = t.mock.method(console, "warn", () => {});
    const auth = getAuth(testEnv)!;
    auth.options.logger?.log?.("warn", "callback?state=sensitive-state", {
      token: "sensitive-token",
    });
    assert.equal(log.mock.callCount(), 1);
    assert.equal(
      log.mock.calls[0].arguments[0],
      JSON.stringify({ component: "auth", level: "warn" }),
    );
  });
});
