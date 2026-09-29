import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { POST as tokenPost } from "../src/pages/oauth/token.ts";
import {
  parseJsonObject,
  parseRequestedScopes,
} from "../src/lib/oauth-validation.ts";

describe("OAuth request validation", () => {
  test("accepts only public scopes", () => {
    assert.deepEqual(parseRequestedScopes("skills:read registry:read"), [
      "skills:read",
      "registry:read",
    ]);
    assert.equal(parseRequestedScopes("admin"), null);
  });

  test("rejects malformed or oversized JSON objects", () => {
    assert.equal(parseJsonObject("[]"), null);
    assert.equal(parseJsonObject("not json"), null);
    assert.equal(parseJsonObject("x".repeat(16 * 1024 + 1)), null);
  });

  test("rejects unsupported token scopes", async () => {
    const response = await tokenPost({
      request: new Request("https://www.ui-skills.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials&scope=admin",
      }),
    } as never);

    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, "invalid_scope");
  });
});
