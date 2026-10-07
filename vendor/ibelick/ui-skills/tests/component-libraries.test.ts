import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  componentCollections,
  componentLibraries,
} from "../src/data/component-libraries.ts";

describe("component library directory data", () => {
  test("has entries for every published collection", () => {
    const collections = new Set(
      componentLibraries.map((library) => library.collection),
    );

    for (const collection of componentCollections) {
      assert.ok(collections.has(collection.slug), `Missing ${collection.slug}`);
    }
  });

  test("uses unique names and valid external URLs", () => {
    const names = new Set(componentLibraries.map((library) => library.name));

    assert.equal(names.size, componentLibraries.length);

    for (const library of componentLibraries) {
      assert.match(library.websiteUrl, /^https:\/\//);
      if (library.githubRepo) {
        assert.match(library.githubRepo, /^[^/]+\/[^/]+$/);
      }
    }
  });

  test("marks the intended editorial top picks", () => {
    const featuredNames = componentLibraries
      .filter((library) => library.featured)
      .map((library) => library.name);

    assert.deepEqual(featuredNames, [
      "Base UI",
      "Radix UI",
      "shadcn/ui",
      "Motion Primitives",
      "Aceternity UI",
      "prompt-kit",
    ]);
  });
});
