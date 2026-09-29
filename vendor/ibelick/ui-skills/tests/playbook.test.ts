import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { skills } from "../src/data/skills.ts";
import { playbook } from "../src/data/playbook.ts";
import { playbookDemoSlugs as declaredDemoSlugs } from "../src/data/playbook-demos.ts";
import {
  registeredDemoSlugs,
  demos,
} from "../src/ui/playbook/demo-registry.tsx";

describe("playbook metadata", () => {
  test("has one demo for every playbook entry", () => {
    const demoSlugs = new Set(registeredDemoSlugs);
    assert.equal(demoSlugs.size, playbook.length);

    for (const entry of playbook) {
      assert.ok(demoSlugs.has(entry.slug), `Missing demo for ${entry.slug}`);
    }
  });

  test("declared and registered demo slugs stay in sync", () => {
    assert.deepEqual([...declaredDemoSlugs], [...registeredDemoSlugs]);
    assert.equal(Object.keys(demos).length, registeredDemoSlugs.length);
  });

  test("uses valid, diverse related skills", () => {
    const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

    for (const entry of playbook) {
      assert.equal(entry.related[0], "improve-ui");
      assert.equal(new Set(entry.related).size, 4, entry.slug);

      const authors = entry.related.map(
        (slug) => skillBySlug.get(slug)?.sourceKey,
      );
      assert.ok(
        authors.every(Boolean),
        `Missing related skill in ${entry.slug}`,
      );
      assert.equal(
        new Set(authors).size,
        4,
        `Repeated author in ${entry.slug}`,
      );
    }
  });

  test("has stable playbook route content", () => {
    for (const entry of playbook) {
      assert.match(entry.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(entry.title.length > 0, entry.slug);
      assert.ok(entry.description.length > 0, entry.slug);
    }
  });
});
