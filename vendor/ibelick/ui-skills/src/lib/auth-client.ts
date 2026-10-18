import { createAuthClient } from "better-auth/react";

// Same-origin requests; provider credentials stay exclusively on the server.
export const authClient = createAuthClient();
