#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "ui-skills.ts",
);

const require = createRequire(import.meta.url);
const tsxPath = pathToFileURL(require.resolve("tsx")).href;

const child = spawn(
  process.execPath,
  ["--import", tsxPath, scriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
