import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildSkillsInstallCommand,
  formatUiSkillsAgentStartCopy,
  UI_SKILLS_AGENT_START_COPY,
} from "../src/lib/ui-skills-cli.ts";

describe("ui-skills cli", () => {
  test("formats agent start commands from structured definitions", () => {
    assert.equal(
      formatUiSkillsAgentStartCopy(),
      [
        "npx ui-skills start",
        "npx ui-skills categories",
        "npx ui-skills list --category <category>",
        "npx ui-skills get <skill>",
      ].join("\n"),
    );
    assert.equal(UI_SKILLS_AGENT_START_COPY, formatUiSkillsAgentStartCopy());
  });

  test("builds install commands", () => {
    assert.equal(
      buildSkillsInstallCommand(
        "https://github.com/ibelick/ui-skills",
        "ui-skills-root",
      ),
      "npx skills add https://github.com/ibelick/ui-skills --skill ui-skills-root",
    );
  });
});
