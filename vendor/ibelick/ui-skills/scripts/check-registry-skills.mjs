/**
 * Verify registry skill sources are reachable and report digest gaps.
 * Read-only — does not write agent-skills-digests.json.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { registry } from "../src/data/registry.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIGESTS_PATH = join(ROOT, "src/data/agent-skills-digests.json");
const CONCURRENCY = 12;
const FETCH_TIMEOUT_MS = 8_000;

const readLocalSkill = (slug) => {
  const path = join(ROOT, "skills", slug, "SKILL.md");
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
};

const fetchRemote = async (rawUrl) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(rawUrl, {
      signal: controller.signal,
      headers: { Accept: "text/plain" },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
};

const loadContent = async (entry) => {
  if (entry.user.toLowerCase() === "ibelick" && entry.repo === "ui-skills") {
    const local = readLocalSkill(entry.slug);
    if (local) return local;
  }
  return fetchRemote(entry.rawUrl);
};

async function mapPool(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        results[index] = await mapper(items[index], index);
      }
    }),
  );
  return results;
}

const readDigests = () => {
  if (!existsSync(DIGESTS_PATH)) {
    return new Set();
  }
  try {
    const payload = JSON.parse(readFileSync(DIGESTS_PATH, "utf8"));
    return new Set(Object.keys(payload.digests ?? {}));
  } catch {
    return new Set();
  }
};

const results = await mapPool(registry, CONCURRENCY, async (entry) => {
  try {
    const content = await loadContent(entry);
    if (!content.trim()) {
      return { entry, ok: false, error: "empty content" };
    }
    return { entry, ok: true };
  } catch (error) {
    return {
      entry,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
});

const failed = results.filter((result) => !result.ok);
const digestSlugs = readDigests();
const missingDigests = registry.filter((entry) => !digestSlugs.has(entry.pathSlug));

console.log(
  `[check:skills] registry=${registry.length} ok=${registry.length - failed.length} failed=${failed.length} missingDigests=${missingDigests.length}`,
);

for (const result of failed) {
  console.log(
    `[check:skills] FAIL ${result.entry.pathSlug}: ${result.error}\n  ${result.entry.rawUrl}`,
  );
}

for (const entry of missingDigests) {
  const alsoFailed = failed.some(
    (result) => result.entry.pathSlug === entry.pathSlug,
  );
  if (!alsoFailed) {
    console.log(
      `[check:skills] WARN missing digest ${entry.pathSlug}\n  ${entry.rawUrl}`,
    );
  }
}

if (failed.length > 0) {
  process.exitCode = 1;
}
