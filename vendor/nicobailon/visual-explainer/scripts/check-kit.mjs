import { readFileSync } from "node:fs";

// The template and the example carry a copy of the kit's SVG defs so they open as files; the renderer uses kit/defs.svg.
// Fails when a copy drifts, or when a page that links the kit also carries a copy of the kit's stylesheet.
const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const defs = read("plugins/visual-explainer/kit/defs.svg").trim();
const kitRules = new Set(read("plugins/visual-explainer/kit/kit.css").split("\n").map((l) => l.trim()).filter((l) => l.includes("{") && l.length > 30));
const pages = ["plugins/visual-explainer/templates/page.html", "examples/replay-job-queue.html"];

const problems = [];
for (const path of pages) {
  const page = read(path);
  const copy = page.match(/<svg width="0" height="0"[\s\S]*?<\/svg>/)?.[0].trim();
  if (copy !== defs) problems.push(`${path}: its shared <svg><defs> block differs from kit/defs.svg`);
  if (!/<link\b[^>]*\bdata-ve-kit\b/.test(page)) problems.push(`${path}: no <link rel="stylesheet" data-ve-kit>`);
  const copied = [...page.matchAll(/<style>([\s\S]*?)<\/style>/g)].flatMap((m) => m[1].split("\n")).map((l) => l.trim()).filter((l) => kitRules.has(l));
  if (copied.length) problems.push(`${path}: ${copied.length} rule(s) copied from kit/kit.css, for example: ${copied[0]}`);
}

if (problems.length) {
  console.error(`Kit check failed:\n${problems.map((p) => `- ${p}`).join("\n")}`);
  process.exit(1);
}
console.log(`Kit check passed: ${pages.length} pages`);
