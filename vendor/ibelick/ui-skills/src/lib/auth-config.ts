import type { D1Database } from "@cloudflare/workers-types";

export type AuthEnv = {
  AUTH_DB?: D1Database;
  BETTER_AUTH_URL?: string;
  BETTER_AUTH_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
};

export const authProviders = [
  { id: "google", name: "Google" },
  { id: "github", name: "GitHub" },
] as const;

export function getAuthConfig(env: AuthEnv) {
  const {
    BETTER_AUTH_URL,
    BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
  } = env;
  if (
    !env.AUTH_DB ||
    !BETTER_AUTH_URL ||
    !BETTER_AUTH_SECRET ||
    BETTER_AUTH_SECRET.length < 32
  ) {
    return null;
  }

  // A provider is enabled only when both credentials are present.
  const socialProviders = {
    ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  };
  if (Object.keys(socialProviders).length === 0) return null;

  try {
    const url = new URL(BETTER_AUTH_URL);
    const isLocal = ["localhost", "127.0.0.1"].includes(url.hostname);
    if (
      (url.protocol !== "https:" && !(isLocal && url.protocol === "http:")) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return {
      baseURL: url.origin,
      secret: BETTER_AUTH_SECRET,
      secureCookies: url.protocol === "https:",
      socialProviders,
    };
  } catch {
    return null;
  }
}

/** Login/account responses must bypass shared caching and content negotiation. */
export function isAuthPath(pathname: string) {
  return (
    pathname === "/api/auth" ||
    pathname.startsWith("/api/auth/") ||
    pathname === "/login" ||
    pathname === "/login/" ||
    pathname === "/account" ||
    pathname.startsWith("/account/")
  );
}

/** Restrict post-login navigation to paths on this origin. */
export function safeReturnTo(value: string | null): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\s%\u0000-\u001f\u007f]/.test(value)
  )
    return "/account";
  const url = new URL(value, "https://www.ui-skills.com");
  if (url.origin !== "https://www.ui-skills.com" || isAuthPath(url.pathname))
    return "/account";
  return `${url.pathname}${url.search}${url.hash}`;
}
