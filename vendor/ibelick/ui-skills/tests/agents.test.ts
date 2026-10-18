import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { agentById, agents } from "../src/data/agents.ts";
import { GET as getSitemap } from "../src/pages/sitemap.xml.ts";

describe("agent directory", () => {
  test("uses unique route IDs and valid URLs", () => {
    assert.equal(new Set(agents.map((agent) => agent.id)).size, agents.length);
    for (const agent of agents) {
      assert.match(agent.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(agent.name && agent.description && agent.topics.length);
      for (const url of [
        agent.websiteUrl,
        agent.faviconUrl,
        agent.skills?.docsUrl,
      ]) {
        if (url) assert.equal(new URL(url).protocol, "https:");
      }
    }
  });

  test("new agents include documented project skill locations", () => {
    for (const id of [
      "augment",
      "junie",
      "warp",
      "devin-cli",
      "mistral-vibe",
      "qwen-code",
      "kimi-code-cli",
      "pi",
    ]) {
      const agent = agentById.get(id);
      assert.ok(agent, `Missing agent: ${id}`);
      assert.ok(agent.skills?.docsUrl, `Missing skill documentation: ${id}`);
      assert.match(agent.skills!.path, /^\.[a-z-]+\/skills\/$/);
    }
    assert.equal(agentById.get("devin-cli")?.name, "Devin CLI");
    assert.equal(
      agentById.get("kimi-code-cli")?.websiteUrl,
      "https://github.com/MoonshotAI/kimi-code",
    );
  });

  test("every agent page is included in the sitemap", async () => {
    const response = await getSitemap({
      site: new URL("https://www.ui-skills.com"),
    } as never);
    const body = await response.text();
    for (const agent of agents) {
      assert.ok(
        body.includes(`https://www.ui-skills.com/agents/${agent.id}</loc>`),
      );
    }
  });
});
