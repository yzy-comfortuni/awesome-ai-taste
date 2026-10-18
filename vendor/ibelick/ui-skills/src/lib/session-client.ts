import { authClient } from "./auth-client";

type SessionResult = Awaited<ReturnType<typeof authClient.getSession>>;

const sessionKey = "__uiSkillsSession";

/** One session request per page, shared by the header and every island. */
export function getCachedSession() {
  const scope = window as Window & { [sessionKey]?: Promise<SessionResult> };
  if (!scope[sessionKey]) {
    scope[sessionKey] = authClient.getSession().catch((error: unknown) => {
      delete scope[sessionKey];
      throw error;
    });
  }
  return scope[sessionKey];
}
