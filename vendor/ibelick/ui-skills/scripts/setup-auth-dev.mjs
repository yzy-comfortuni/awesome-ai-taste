import { randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import { chmod, lstat, readFile, writeFile } from "node:fs/promises";
import { parseEnv } from "node:util";

const path = ".dev.vars";
const localOrigin = "http://localhost:4321";

// Do not create credentials unless the destination is excluded from Git.
execFileSync("git", ["check-ignore", "--quiet", path]);

let content;
try {
  if (!(await lstat(path)).isFile()) {
    throw new Error(".dev.vars must be a regular file.");
  }
  content = await readFile(path, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  content = await readFile(".dev.vars.example", "utf8");
}

const values = parseEnv(content);
if (values.BETTER_AUTH_URL && values.BETTER_AUTH_URL !== localOrigin) {
  throw new Error(
    ".dev.vars has a different auth origin. Review it before configuring local auth.",
  );
}
if (values.BETTER_AUTH_SECRET && values.BETTER_AUTH_SECRET.length < 32) {
  throw new Error(
    "Existing auth secret is too short. Review it before replacing it.",
  );
}

function setValue(key, value) {
  const line = new RegExp(`^(?:export\\s+)?${key}\\s*=.*$`, "gm");
  if (line.test(content)) content = content.replace(line, `${key}=${value}`);
  else content = `${content.trimEnd()}\n${key}=${value}\n`;
}

setValue("BETTER_AUTH_URL", localOrigin);
if (!values.BETTER_AUTH_SECRET) {
  setValue("BETTER_AUTH_SECRET", randomBytes(32).toString("hex"));
}
for (const key of [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
]) {
  if (!(key in values)) setValue(key, "");
}

await writeFile(path, content, { mode: 0o600 });
await chmod(path, 0o600);
console.log(
  "Local auth configured in ignored .dev.vars; existing credentials preserved.",
);
const missing = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
].filter((key) => !parseEnv(content)[key]);
if (missing.length)
  console.log(
    `Still needed from your development OAuth apps: ${missing.join(", ")}`,
  );
