import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { betterAuth } from "better-auth";
import { testUtils } from "better-auth/plugins";
import { getPlatformProxy } from "wrangler";
import { getAuth, getPageSession } from "../src/lib/auth.ts";
import type { AuthEnv } from "../src/lib/auth-config.ts";

test("Better Auth sessions and OAuth state work against local D1", async (t) => {
  const platform = await getPlatformProxy<AuthEnv>({
    configPath: "tests/fixtures/auth.wrangler.jsonc",
    persist: false,
    remoteBindings: false,
    envFiles: [],
  });
  try {
    const db = platform.env.AUTH_DB!;
    const migration = await readFile(
      new URL("../migrations/0001_auth.sql", import.meta.url),
      "utf8",
    );
    const statements = migration
      .split(";")
      .map((statement) => statement.trim())
      .filter(Boolean);
    await db.batch(statements.map((statement) => db.prepare(statement)));

    const configured = getAuth({
      AUTH_DB: db,
      BETTER_AUTH_URL: "http://localhost:4321",
      BETTER_AUTH_SECRET: "test-only-secret-for-local-d1-integration-tests",
      GOOGLE_CLIENT_ID: "test-google-id",
      GOOGLE_CLIENT_SECRET: "test-google-secret",
      GITHUB_CLIENT_ID: "test-github-id",
      GITHUB_CLIENT_SECRET: "test-github-secret",
    })!;
    // Privileged test helpers never appear in the production auth instance.
    const auth = betterAuth({ ...configured.options, plugins: [testUtils()] });
    const context = await auth.$context;
    const user = await context.test.saveUser(
      context.test.createUser({
        email: "auth-test@example.com",
        name: "Auth test",
      }),
    );
    const { headers } = await context.test.login({ userId: user.id });
    const session = await auth.api.getSession({ headers });
    assert.equal(session?.user.id, user.id);
    assert.equal(session?.user.email, "auth-test@example.com");
    assert.equal(await auth.api.getSession({ headers: new Headers() }), null);

    await t.test(
      "page session reads forward the renewed browser cookie",
      async () => {
        const login = await context.test.login({ userId: user.id });
        const original = await auth.api.getSession({ headers: login.headers });
        assert.ok(original);
        const day = 24 * 60 * 60 * 1000;
        const oldExpiry = Date.now() + 5 * day;
        await db
          .prepare(
            "UPDATE auth_session SET expires_at = ?, updated_at = ? WHERE id = ?",
          )
          .bind(oldExpiry, Date.now() - 2 * day, original.session.id)
          .run();

        const pageHeaders = new Headers({
          "Cache-Control": "private, no-store",
        });
        const renewed = await getPageSession(
          configured,
          login.headers,
          pageHeaders,
        );
        assert.ok(renewed);
        assert.equal(renewed.user.id, user.id);
        assert.ok(renewed.session.expiresAt.getTime() > oldExpiry);
        const cookies = pageHeaders.getSetCookie();
        assert.ok(
          cookies.some((cookie) =>
            cookie.startsWith(`${context.authCookies.sessionToken.name}=`),
          ),
        );
        assert.ok(cookies.some((cookie) => /max-age=604800/i.test(cookie)));
        assert.equal(pageHeaders.get("Cache-Control"), "private, no-store");

        const stored = await db
          .prepare("SELECT expires_at FROM auth_session WHERE id = ?")
          .bind(original.session.id)
          .first<{ expires_at: number }>();
        assert.equal(stored?.expires_at, renewed.session.expiresAt.getTime());
      },
    );

    await t.test("rejects tampered and expired sessions", async () => {
      const tampered = new Headers(headers);
      tampered.set("cookie", `${headers.get("cookie")}tampered`);
      assert.equal(await auth.api.getSession({ headers: tampered }), null);

      const expired = await context.test.login({ userId: user.id });
      const expiredSession = await auth.api.getSession({
        headers: expired.headers,
      });
      assert.ok(expiredSession);
      await db
        .prepare("UPDATE auth_session SET expires_at = ? WHERE id = ?")
        .bind(Date.now() - 1000, expiredSession.session.id)
        .run();
      assert.equal(
        await auth.api.getSession({ headers: expired.headers }),
        null,
      );
    });

    await t.test(
      "requires authentication to list or link accounts",
      async () => {
        for (const [path, method, body] of [
          ["/list-accounts", "GET", undefined],
          [
            "/link-social",
            "POST",
            JSON.stringify({ provider: "google", callbackURL: "/account" }),
          ],
        ] as const) {
          const response = await auth.handler(
            new Request(`http://localhost:4321/api/auth${path}`, {
              method,
              headers: {
                Origin: "http://localhost:4321",
                "Content-Type": "application/json",
                "cf-connecting-ip": "127.0.0.1",
              },
              body,
            }),
          );
          assert.equal(response.status, 401, path);
        }
      },
    );

    await t.test(
      "rejects cross-origin sign-out without destroying the session",
      async () => {
        const response = await auth.handler(
          new Request("http://localhost:4321/api/auth/sign-out", {
            method: "POST",
            headers: {
              cookie: headers.get("cookie")!,
              Origin: "https://evil.example",
              "Content-Type": "application/json",
            },
            body: "{}",
          }),
        );
        assert.equal(response.status, 403);
        assert.equal(
          (await auth.api.getSession({ headers }))?.user.id,
          user.id,
        );
      },
    );

    await t.test(
      "does not expose unused mutations or provider token endpoints",
      async () => {
        for (const path of configured.options.disabledPaths!) {
          const response = await auth.handler(
            new Request(`http://localhost:4321/api/auth${path}`, {
              method: "POST",
              headers: {
                cookie: headers.get("cookie")!,
                Origin: "http://localhost:4321",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ providerId: "google", name: "Changed" }),
            }),
          );
          assert.equal(response.status, 404, path);
        }
      },
    );

    const stateResponse = await auth.handler(
      new Request("http://localhost:4321/api/auth/sign-in/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:4321",
          "cf-connecting-ip": "127.0.0.1",
        },
        body: JSON.stringify({
          provider: "google",
          callbackURL: "/account",
          errorCallbackURL: "/login",
        }),
      }),
    );
    assert.equal(stateResponse.status, 200);
    const oauth = (await stateResponse.json()) as { url: string };
    assert.equal(new URL(oauth.url).hostname, "accounts.google.com");
    assert.ok(stateResponse.headers.get("set-cookie"));

    await t.test(
      "OAuth callbacks require the matching browser state cookie",
      async () => {
        const state = new URL(oauth.url).searchParams.get("state");
        assert.ok(state);
        const response = await auth.handler(
          new Request(
            `http://localhost:4321/api/auth/callback/google?state=${encodeURIComponent(state)}&code=test-code`,
          ),
        );
        assert.equal(response.status, 302);
        assert.match(response.headers.get("location")!, /error=state/);
      },
    );

    await t.test(
      "OAuth errors reach login with a single actionable error code",
      async () => {
        const state = new URL(oauth.url).searchParams.get("state");
        assert.ok(state);
        const cookie = stateResponse.headers
          .getSetCookie()
          .map((value) => value.split(";")[0])
          .join("; ");
        const callback = new URL(
          "http://localhost:4321/api/auth/callback/google",
        );
        callback.searchParams.set("state", state);
        callback.searchParams.set("error", "account_not_linked");
        const response = await auth.handler(
          new Request(callback, {
            headers: { cookie, "cf-connecting-ip": "127.0.0.1" },
          }),
        );
        assert.equal(response.status, 302);
        const location = new URL(
          response.headers.get("location")!,
          callback.origin,
        );
        assert.equal(location.pathname, "/login");
        assert.deepEqual(location.searchParams.getAll("error"), [
          "account_not_linked",
        ]);
      },
    );

    await t.test(
      "rate limits repeated OAuth starts using database storage",
      async () => {
        for (let attempt = 0; attempt < 11; attempt++) {
          const response = await auth.handler(
            new Request("http://localhost:4321/api/auth/sign-in/social", {
              method: "POST",
              headers: {
                Origin: "http://localhost:4321",
                "Content-Type": "application/json",
                "cf-connecting-ip": "198.51.100.1",
              },
              body: JSON.stringify({
                provider: "github",
                callbackURL: "/account",
              }),
            }),
          );
          assert.equal(response.status, attempt < 10 ? 200 : 429);
        }
      },
    );

    const rejected = await auth.handler(
      new Request("http://localhost:4321/api/auth/sign-in/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://evil.example",
        },
        body: JSON.stringify({
          provider: "google",
          callbackURL: "https://evil.example",
        }),
      }),
    );
    assert.equal(rejected.status, 403);

    const signOutHeaders = new Headers(headers);
    signOutHeaders.set("Origin", "http://localhost:4321");
    signOutHeaders.set("Content-Type", "application/json");
    const signedOut = await auth.handler(
      new Request("http://localhost:4321/api/auth/sign-out", {
        method: "POST",
        headers: signOutHeaders,
        body: "{}",
      }),
    );
    assert.equal(signedOut.status, 200);
    assert.ok(signedOut.headers.get("set-cookie"));
    assert.equal(await auth.api.getSession({ headers }), null);
  } finally {
    await platform.dispose();
  }
});
