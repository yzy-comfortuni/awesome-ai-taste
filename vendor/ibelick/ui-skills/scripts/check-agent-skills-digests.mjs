import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { registry } from "../src/data/registry.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const digestPath = join(root, "src/data/agent-skills-digests.json");

if (!existsSync(digestPath)) {
  console.error(
    "[digests] missing src/data/agent-skills-digests.json; run npm run digests",
  );
  process.exit(1);
}

const payload = JSON.parse(readFileSync(digestPath, "utf8"));
const missing = registry
  .map((entry) => entry.pathSlug)
  .filter((pathSlug) => typeof payload.digests?.[pathSlug] !== "string");

const minimumExpected = Math.max(1, Math.floor(registry.length * 0.75));
if (
  typeof payload.skillCount !== "number" ||
  payload.skillCount < minimumExpected
) {
  console.error(
    `[digests] only ${payload.skillCount ?? 0}/${registry.length} registry digests are available; run npm run digests`,
  );
  process.exit(1);
}

if (missing.length > 0) {
  console.warn(
    `[digests] ${missing.length} registry entries have no upstream digest (likely removed sources)`,
  );
}

console.log(`[digests] valid for ${registry.length} registry entries`);
