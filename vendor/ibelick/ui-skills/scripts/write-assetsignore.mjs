import { mkdir, readFile, writeFile } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await writeFile("dist/.assetsignore", "_worker.js\n");

const wranglerPath = "dist/server/wrangler.json";
try {
  const config = JSON.parse(await readFile(wranglerPath, "utf8"));
  if (config.no_bundle === true) {
    config.no_bundle = false;
    await writeFile(wranglerPath, `${JSON.stringify(config, null, 2)}\n`);
  }
} catch {
  // Static builds do not emit a server Wrangler config.
}
