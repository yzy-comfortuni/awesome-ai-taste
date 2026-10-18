import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { getAuthConfig, type AuthEnv } from "./auth-config";

/** Server-rendered pages must forward renewed cookies, not just read the session. */
export async function getPageSession(
  auth: NonNullable<ReturnType<typeof getAuth>>,
  requestHeaders: Headers,
  responseHeaders: Headers,
) {
  const { response: session, headers } = await auth.api.getSession({
    headers: requestHeaders,
    returnHeaders: true,
  });
  for (const cookie of headers.getSetCookie()) {
    responseHeaders.append("Set-Cookie", cookie);
  }
  return session;
}

/** Request scoped: never retain a D1 binding between Worker requests. */
export function getAuth(env: AuthEnv) {
  const config = getAuthConfig(env);
  if (!config || !env.AUTH_DB) return null;

  return betterAuth({
    appName: "UI Skills",
    baseURL: config.baseURL,
    basePath: "/api/auth",
    secret: config.secret,
    trustedOrigins: [config.baseURL],
    logger: {
      level: "warn",
      // Upstream diagnostics can contain OAuth state or callback URLs. Retain
      // severity for monitoring without persisting credentials or user data.
      log(level, _message, ..._args: unknown[]) {
        const entry = JSON.stringify({ component: "auth", level });
        if (level === "error") console.error(entry);
        else console.warn(entry);
      },
    },
    database: drizzleAdapter(drizzle(env.AUTH_DB, { schema }), {
      provider: "sqlite",
      schema,
      // D1 supports batched statements, not interactive transactions.
      transaction: false,
    }),
    socialProviders: config.socialProviders,
    emailAndPassword: { enabled: false },
    account: {
      encryptOAuthTokens: true,
      storeStateStrategy: "database",
      storeAccountCookie: false,
      accountLinking: { enabled: true, disableImplicitLinking: true },
    },
    // Keep unused account mutations and provider tokens off the public API.
    // Hiding controls in the UI alone does not disable Better Auth endpoints.
    disabledPaths: [
      "/unlink-account",
      "/get-access-token",
      "/refresh-token",
      "/account-info",
      "/update-user",
    ],
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      // A signed cookie serves the session for five minutes, so catalog pages
      // do not read D1 on every view. Sign-out clears the cookie immediately.
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
        strategy: "compact",
      },
    },
    advanced: {
      useSecureCookies: config.secureCookies,
      defaultCookieAttributes: { httpOnly: true, sameSite: "lax", path: "/" },
      // Only Cloudflare's edge-provided address is trusted, not X-Forwarded-For.
      ipAddress: { ipAddressHeaders: ["cf-connecting-ip"] },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/social": { window: 60, max: 10 },
        "/link-social": { window: 60, max: 10 },
      },
    },
  });
}
