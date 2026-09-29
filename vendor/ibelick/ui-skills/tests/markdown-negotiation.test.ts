import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  estimateTokenCount,
  htmlToAgentMarkdown,
  isHtmlResponse,
  maybeNegotiateMarkdown,
  prefersMarkdown,
} from "../src/lib/markdown-negotiation.ts";

describe("markdown negotiation", () => {
  test("prefers markdown when Accept asks for it", () => {
    assert.equal(prefersMarkdown("text/markdown"), true);
    assert.equal(prefersMarkdown("text/markdown, text/html"), true);
    assert.equal(prefersMarkdown("text/html;q=0.8, text/markdown"), true);
    assert.equal(prefersMarkdown("text/html, text/markdown;q=0.9"), false);
    assert.equal(prefersMarkdown("text/html, text/markdown"), false);
    assert.equal(prefersMarkdown("text/html"), false);
    assert.equal(prefersMarkdown("*/*"), false);
    assert.equal(prefersMarkdown(null), false);
  });

  test("detects HTML responses", () => {
    assert.equal(
      isHtmlResponse(
        new Response("<html></html>", {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      ),
      true,
    );
    assert.equal(
      isHtmlResponse(
        new Response("{}", {
          headers: { "content-type": "application/json" },
        }),
      ),
      false,
    );
  });

  test("converts HTML pages into markdown with token counts", () => {
    const html = `<!doctype html>
<html>
  <head>
    <title>UI Skills</title>
    <meta name="description" content="Skills for Design Engineers." />
  </head>
  <body>
    <nav>Navigation</nav>
    <main>
      <h1>Hello</h1>
      <p>World</p>
    </main>
    <footer>Footer</footer>
  </body>
</html>`;

    const result = htmlToAgentMarkdown(html);
    assert.match(result.markdown, /^---\n/);
    assert.match(result.markdown, /title: UI Skills/);
    assert.match(result.markdown, /# Hello/);
    assert.match(result.markdown, /World/);
    assert.doesNotMatch(result.markdown, /Navigation|Footer/);
    assert.ok(result.markdownTokens > 0);
    assert.ok(result.originalTokens >= result.markdownTokens);
    assert.equal(estimateTokenCount(result.markdown), result.markdownTokens);
  });

  test("returns markdown when Accept prefers it", async () => {
    const request = new Request("https://www.ui-skills.com/", {
      headers: { Accept: "text/markdown" },
    });
    const htmlResponse = new Response(
      `<!doctype html><html><head><title>Home</title></head><body><h1>UI Skills</h1></body></html>`,
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
          etag: '"abc"',
        },
      },
    );

    const response = await maybeNegotiateMarkdown(request, htmlResponse);

    assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
    assert.ok(Number(response.headers.get("x-markdown-tokens")) > 0);
    assert.ok(Number(response.headers.get("x-original-tokens")) > 0);
    assert.match(response.headers.get("vary") ?? "", /Accept/i);
    assert.equal(response.headers.get("etag"), null);
    assert.match(await response.text(), /UI Skills/);
  });

  test("leaves HTML alone for normal browser requests", async () => {
    const request = new Request("https://www.ui-skills.com/", {
      headers: { Accept: "text/html" },
    });
    const html = `<!doctype html><html><body><h1>UI Skills</h1></body></html>`;
    const htmlResponse = new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });

    const response = await maybeNegotiateMarkdown(request, htmlResponse);
    assert.equal(
      response.headers.get("content-type"),
      "text/html; charset=utf-8",
    );
    assert.equal(await response.text(), html);
  });

  test("does not convert non-HTML responses", async () => {
    const request = new Request("https://www.ui-skills.com/skills/registry.json", {
      headers: { Accept: "text/markdown" },
    });
    const json = new Response('{"ok":true}', {
      headers: { "content-type": "application/json" },
    });

    const response = await maybeNegotiateMarkdown(request, json);
    assert.equal(response.headers.get("content-type"), "application/json");
    assert.equal(await response.text(), '{"ok":true}');
  });
});
