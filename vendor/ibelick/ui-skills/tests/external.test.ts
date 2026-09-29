import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import { getGithubStars } from "../src/lib/github-stars.ts";
import { getRemoteSkill, RemoteSkillError } from "../src/lib/remote-skill.ts";

const originalFetch = globalThis.fetch;
const originalCaches = (globalThis as typeof globalThis & { caches?: unknown })
  .caches;

const setCache = (cache: unknown) => {
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: cache === undefined ? undefined : { default: cache },
  });
};

afterEach(() => {
  globalThis.fetch = originalFetch;
  setCache(originalCaches);
  delete process.env.GITHUB_TOKEN;
});

describe("remote skill content", () => {
  test("serves cached content without fetching upstream", async () => {
    let fetchCalls = 0;
    const cache = {
      match: async () =>
        new Response("cached skill", {
          headers: { "x-ui-skills-cached-at": String(Date.now()) },
        }),
      put: async () => undefined,
    };
    setCache(cache);
    globalThis.fetch = async () => {
      fetchCalls += 1;
      throw new Error("upstream should not be called");
    };

    const result = await getRemoteSkill("https://example.com/skill.md");

    assert.deepEqual(result, { content: "cached skill", stale: false });
    assert.equal(fetchCalls, 0);
  });

  test("refreshes stale cached content and falls back when upstream fails", async () => {
    let fetchCalls = 0;
    const cache = {
      match: async () =>
        new Response("stale skill", {
          headers: {
            "x-ui-skills-cached-at": String(
              Date.now() - 2 * 24 * 60 * 60 * 1000,
            ),
          },
        }),
      put: async () => undefined,
    };
    setCache(cache);
    globalThis.fetch = async () => {
      fetchCalls += 1;
      throw new Error("upstream unavailable");
    };

    const result = await getRemoteSkill("https://example.com/stale.md");

    assert.deepEqual(result, { content: "stale skill", stale: true });
    assert.equal(fetchCalls, 1);
  });

  test("preserves upstream 404 semantics on a cache miss", async () => {
    setCache({
      match: async () => undefined,
      put: async () => undefined,
    });
    globalThis.fetch = async () => new Response("missing", { status: 404 });

    await assert.rejects(
      getRemoteSkill("https://example.com/deleted.md"),
      (error: unknown) =>
        error instanceof RemoteSkillError && error.status === 404,
    );
  });

  test("rejects content larger than the configured bound", async () => {
    setCache({ match: async () => undefined, put: async () => undefined });
    globalThis.fetch = async () =>
      new Response("x".repeat(1024 * 1024 + 1), { status: 200 });

    await assert.rejects(
      getRemoteSkill("https://example.com/large.md"),
      (error: unknown) =>
        error instanceof RemoteSkillError && error.status === 502,
    );
  });

  test("continues when cache operations fail", async () => {
    setCache({
      match: async () => {
        throw new Error("cache unavailable");
      },
      put: async () => {
        throw new Error("cache unavailable");
      },
    });
    globalThis.fetch = async () => new Response("fresh skill", { status: 200 });

    const result = await getRemoteSkill("https://example.com/cache-error.md");

    assert.deepEqual(result, { content: "fresh skill", stale: false });
  });
});

describe("GitHub stars", () => {
  test("returns formatted stars from GitHub", async () => {
    globalThis.fetch = async (_input, init) => {
      assert.ok(init?.signal);
      return new Response(JSON.stringify({ stargazers_count: 1234 }), {
        status: 200,
      });
    };

    const result = await getGithubStars();

    assert.deepEqual(result, { stars: 1234, label: "1.2k+" });
  });

  test("degrades to null for malformed or failed GitHub responses", async () => {
    globalThis.fetch = async () => new Response("not json", { status: 200 });
    assert.equal(await getGithubStars(), null);

    globalThis.fetch = async () => {
      throw new Error("network unavailable");
    };
    assert.equal(await getGithubStars(), null);
  });

  test("renders normally when the GitHub cache is unavailable", async () => {
    setCache({
      match: async () => {
        throw new Error("cache unavailable");
      },
      put: async () => {
        throw new Error("cache unavailable");
      },
    });
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ stargazers_count: 5392 }), { status: 200 });

    const result = await getGithubStars();

    assert.deepEqual(result, { stars: 5392, label: "5.4k+" });
  });
});
