import { PUBLIC_SCOPES } from "./oauth-discovery";

export const MAX_OAUTH_BODY_BYTES = 16 * 1024;

export function parseJsonObject(raw: string): Record<string, unknown> | null {
  if (new TextEncoder().encode(raw).byteLength > MAX_OAUTH_BODY_BYTES) {
    return null;
  }

  try {
    const value: unknown = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export function parseRequestedScopes(value: unknown): string[] | null {
  if (typeof value !== "string") return null;
  const scopes = [...new Set(value.trim().split(/\s+/).filter(Boolean))];
  return scopes.every((scope) => PUBLIC_SCOPES.includes(scope as never))
    ? scopes
    : null;
}
