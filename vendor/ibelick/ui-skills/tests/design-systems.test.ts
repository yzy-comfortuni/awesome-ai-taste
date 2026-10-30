import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  designSystemCollections,
  designSystems,
} from "../src/data/design-systems.ts";

describe("design system directory data", () => {
  test("has entries for every published collection", () => {
    const collections = new Set(
      designSystems.map((system) => system.collection),
    );

    for (const collection of designSystemCollections) {
      assert.ok(collections.has(collection.slug), `Missing ${collection.slug}`);
    }
  });

  test("uses unique names and valid external URLs", () => {
    const names = new Set(designSystems.map((system) => system.name));

    assert.equal(designSystems.length, 176);
    assert.equal(names.size, designSystems.length);

    for (const system of designSystems) {
      assert.match(system.websiteUrl, /^https:\/\//);
      if (system.faviconUrl) {
        assert.match(system.faviconUrl, /^https:\/\//);
      }
      if (system.githubRepo) {
        assert.match(system.githubRepo, /^[^/]+\/[^/]+$/);
      }
    }
  });

  test("marks the intended editorial top picks", () => {
    const featuredNames = designSystems
      .filter((system) => system.featured)
      .map((system) => system.name);

    assert.deepEqual(featuredNames, [
      "Carbon Design System",
      "Material Design",
      "Radix UI",
      "shadcn/ui",
      "GOV.UK Design System",
    ]);
  });
});
