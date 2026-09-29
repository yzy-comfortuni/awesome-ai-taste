import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  API_CATALOG_PATH,
  API_CATALOG_PROFILE,
  apiCatalogContentType,
  buildApiCatalogDocument,
  buildDiscoveryLinkHeader,
} from "../src/lib/agent-discovery.ts";
import { GET as getApiCatalog, HEAD as headApiCatalog } from "../src/pages/.well-known/api-catalog.ts";

describe("agent discovery", () => {
  test("builds RFC 8288 Link header with registered relation types", () => {
    const link = buildDiscoveryLinkHeader("https://www.ui-skills.com");

    assert.match(link, /rel="api-catalog"/);
    assert.match(link, /rel="describedby"/);
    assert.match(link, /rel="service-doc"/);
    assert.match(link, /rel="service-desc"/);
    assert.match(link, /rel="sitemap"/);
    assert.match(
      link,
      /<https:\/\/www\.ui-skills\.com\/\.well-known\/api-catalog>/,
    );
    assert.match(link, /<https:\/\/www\.ui-skills\.com\/llms\.txt>/);
    assert.match(
      link,
      /<https:\/\/www\.ui-skills\.com\/\.well-known\/agent-skills\/index\.json>/,
    );
    assert.match(
      link,
      /<https:\/\/www\.ui-skills\.com\/\.well-known\/mcp\/server-card\.json>/,
    );
    assert.match(
      link,
      /<https:\/\/www\.ui-skills\.com\/\.well-known\/oauth-protected-resource>/,
    );
    assert.match(link, /<https:\/\/www\.ui-skills\.com\/auth\.md>/);
  });

  test("api catalog document is a linkset with profileable items", () => {
    const catalog = buildApiCatalogDocument("https://www.ui-skills.com");

    assert.equal(catalog.linkset.length, 1);
    assert.equal(
      catalog.linkset[0]?.anchor,
      `https://www.ui-skills.com${API_CATALOG_PATH}`,
    );
    assert.ok((catalog.linkset[0]?.item.length ?? 0) >= 4);
    assert.ok(
      catalog.linkset[0]?.item.some(
        (item) => item.href === "https://www.ui-skills.com/skills/registry.json",
      ),
    );
    assert.ok(
      catalog.linkset[0]?.item.some(
        (item) =>
          item.href ===
          "https://www.ui-skills.com/.well-known/agent-skills/index.json",
      ),
    );
    assert.ok(
      catalog.linkset[0]?.item.some(
        (item) => item.href === "https://www.ui-skills.com/mcp",
      ),
    );
    assert.ok(
      catalog.linkset[0]?.item.some(
        (item) => item.href === "https://www.ui-skills.com/auth.md",
      ),
    );
    assert.ok(
      catalog.linkset[0]?.item.some(
        (item) =>
          item.href ===
          "https://www.ui-skills.com/.well-known/oauth-authorization-server",
      ),
    );
  });

  test("GET /.well-known/api-catalog returns application/linkset+json", async () => {
    const response = await getApiCatalog({
      site: new URL("https://www.ui-skills.com"),
    } as never);
    const body = (await response.json()) as ReturnType<
      typeof buildApiCatalogDocument
    >;

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), apiCatalogContentType());
    assert.match(apiCatalogContentType(), new RegExp(API_CATALOG_PROFILE));
    assert.match(response.headers.get("link") ?? "", /rel="api-catalog"/);
    assert.ok(body.linkset[0]?.item.length);
  });

  test("HEAD /.well-known/api-catalog includes api-catalog Link relation", async () => {
    const response = await headApiCatalog({
      site: new URL("https://www.ui-skills.com"),
    } as never);

    assert.equal(response.status, 200);
    assert.equal(await response.text(), "");
    assert.match(
      response.headers.get("link") ?? "",
      /<https:\/\/www\.ui-skills\.com\/\.well-known\/api-catalog>; rel="api-catalog"/,
    );
  });
});
