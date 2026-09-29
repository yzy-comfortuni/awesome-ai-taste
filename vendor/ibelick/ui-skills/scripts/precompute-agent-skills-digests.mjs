/**
 * Prefetch skill bodies and write SHA-256 digests for the discovery index.
 * Run explicitly before a release so production never fans out to GitHub on cold requests.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { registry } from "../src/data/registry.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_PATH = join(ROOT, "src/data/agent-skills-digests.json");
const CONCURRENCY = 10;
const FETCH_TIMEOUT_MS = 8_000;

const sha256Digest = (content) =>
  `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;

const readPrevious = () => {
  if (!existsSync(OUT_PATH)) {
    return { digests: {}, generatedAt: null, skillCount: 0 };
  }
  try {
    return JSON.parse(readFileSync(OUT_PATH, "utf8"));
  } catch {
    return { digests: {}, generatedAt: null, skillCount: 0 };
  }
};

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

const previous = readPrevious();
const digests = { ...previous.digests };
let refreshed = 0;
let reused = 0;
let failed = 0;

await mapPool(registry, CONCURRENCY, async (entry) => {
  try {
    const content = await loadContent(entry);
    digests[entry.pathSlug] = sha256Digest(content);
    refreshed += 1;
  } catch (error) {
    if (digests[entry.pathSlug]) {
      reused += 1;
      return;
    }
    failed += 1;
    console.warn(
      `[digests] skip ${entry.pathSlug}: ${error instanceof Error ? error.message : error}`,
    );
  }
});

const payload = {
  generatedAt: new Date().toISOString(),
  skillCount: Object.keys(digests).length,
  digests,
};

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(
  `[digests] wrote ${OUT_PATH} (refreshed=${refreshed}, reused=${reused}, failed=${failed}, total=${payload.skillCount})`,
);

// Some registry URLs 404 upstream; keep going as long as the catalog is mostly intact.
if (payload.skillCount < Math.max(1, Math.floor(registry.length * 0.75))) {
  console.error(
    `[digests] too many missing digests (${payload.skillCount}/${registry.length})`,
  );
  process.exitCode = 1;
}
