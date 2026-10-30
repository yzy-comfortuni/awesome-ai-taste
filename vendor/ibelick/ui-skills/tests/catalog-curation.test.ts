import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { collections } from "../src/data/collections.ts";
import { registry } from "../src/data/registry.ts";
import { topics, topicsBySlug } from "../src/data/topics.ts";
import { componentCollections } from "../src/data/component-libraries.ts";
import { designSystemCollections } from "../src/data/design-systems.ts";
import {
  componentDirectoryLinks,
  designSystemDirectoryLinks,
} from "../src/data/directory-links.ts";
import {
  getCollectionBySlug,
  getCollectionRoutePaths,
} from "../src/lib/collection-catalog.ts";
import {
  getSkillByPath,
  getSkillRoutePaths,
  getSkillsBySource,
  getSkillsByTopic,
} from "../src/lib/skill-catalog.ts";
import { GET as getSitemap } from "../src/pages/sitemap.xml.ts";

describe("curated topic and collection expansion", () => {
  test("keeps the shadcn/ui topic separate from author and skill routes", () => {
    const slug = "shadcn-ui-development";
    assert.equal(topicsBySlug[slug].label, "shadcn/ui");
    assert.equal(getSkillsBySource(slug).length, 0);
    assert.equal(getSkillByPath(slug), undefined);
    assert.ok(getSkillRoutePaths().some((route) => route.params.slug === slug));
    assert.deepEqual(
      getSkillsByTopic(slug)
        .map((skill) => skill.pathSlug)
        .sort(),
      [
        "shadcn-ui/shadcn",
        "shadcn-ui/migrate-radix-to-base",
        "nextlevelbuilder/ui-styling",
        "millionco/paper-to-code-components",
      ].sort(),
    );
    assert.ok(getSkillsBySource("shadcn-ui").length > 0);
    assert.ok(getSkillsBySource("shadcn").length > 0);
  });

  test("includes framework-specific implementations in the existing topic", () => {
    assert.equal(topicsBySlug.frameworks.label, "Frontend frameworks");
    const paths = new Set(
      getSkillsByTopic("frameworks").map((skill) => skill.pathSlug),
    );
    for (const path of [
      "sveltejs/svelte-code-writer",
      "vercel-labs/react-best-practices",
      "vercel/next-cache-components",
      "vercel/next-cache-components-optimizer",
      "remix-run/react-router-framework-mode",
      "antfu/nuxt",
    ]) {
      assert.ok(paths.has(path), `Missing framework skill: ${path}`);
    }
  });

  test("all registry topic references resolve", () => {
    for (const skill of registry) {
      for (const topic of skill.topics ?? []) {
        assert.ok(
          topicsBySlug[topic],
          `Unknown topic ${topic}: ${skill.pathSlug}`,
        );
      }
    }
  });

  test("supporting skills resolve without duplicating a topic's primary skills", () => {
    for (const topic of topics) {
      const primaryPaths = new Set(
        getSkillsByTopic(topic.slug).map((skill) => skill.pathSlug),
      );
      const supportingPaths = topic.supportingSkillPaths ?? [];
      assert.equal(new Set(supportingPaths).size, supportingPaths.length);
      for (const path of supportingPaths) {
        assert.ok(getSkillByPath(path), `Unknown supporting skill: ${path}`);
        assert.ok(!primaryPaths.has(path), `Duplicate primary skill: ${path}`);
      }
    }
    assert.ok(
      topicsBySlug["shadcn-ui-development"].supportingSkillPaths.length >= 4,
    );
  });

  test("data-defined directory links point to published routes", () => {
    const routes = new Set([
      "/components",
      "/design-systems",
      "/icons",
      "/collections",
      "/skills",
      ...componentCollections.map(
        (collection) => `/components/${collection.routeSlug}`,
      ),
      ...designSystemCollections.map(
        (collection) => `/design-systems/${collection.routeSlug}`,
      ),
      ...getCollectionRoutePaths().map(
        (route) => `/collections/${route.params.slug}`,
      ),
      ...getSkillRoutePaths().map((route) => `/skills/${route.params.slug}`),
    ]);
    const links = [
      ...componentDirectoryLinks,
      ...designSystemDirectoryLinks,
      ...componentCollections.flatMap(
        (collection) => collection.relatedLinks ?? [],
      ),
      ...designSystemCollections.flatMap(
        (collection) => collection.relatedLinks ?? [],
      ),
      ...topics.flatMap((topic) => topic.relatedLinks ?? []),
    ];
    for (const link of links) {
      assert.ok(routes.has(link.href), `Unknown directory route: ${link.href}`);
      assert.ok(link.label && link.description);
    }
  });

  test("new collections have workflows, explicit skill selections, and valid related collections", () => {
    for (const slug of [
      "web-development-best-practices",
      "design-engineering",
      "deslop",
    ]) {
      const collection = getCollectionBySlug(slug);
      assert.ok(collection);
      assert.ok(collection.workflow && collection.workflow.length >= 3);
      assert.ok(collection.skills.length >= 10);
      const paths = collection.skills.map((entry) => entry.pathSlug);
      assert.equal(new Set(paths).size, paths.length);
      const authors = new Set(
        paths.map((path) => getSkillByPath(path!)?.sourceKey),
      );
      assert.ok(authors.size >= 6, `Not enough author variety in ${slug}`);
      for (const entry of collection.skills) {
        assert.ok(entry.pathSlug);
        assert.equal(getSkillByPath(entry.pathSlug)?.slug, entry.slug);
        assert.ok(entry.role.length > 0);
      }
      for (const related of collection.relatedSlugs) {
        assert.ok(
          getCollectionBySlug(related),
          `Unknown related collection: ${related}`,
        );
      }
      assert.ok(
        getCollectionRoutePaths().some((route) => route.params.slug === slug),
      );
    }
    assert.equal(
      new Set(collections.map((collection) => collection.slug)).size,
      collections.length,
    );
  });

  test("design engineering excludes Emil's skills and spans at least ten authors", () => {
    const collection = getCollectionBySlug("design-engineering")!;
    const authors = collection.skills.map(
      (entry) => getSkillByPath(entry.pathSlug!)!.sourceKey,
    );
    assert.ok(!authors.includes("emilkowalski"));
    assert.ok(new Set(authors).size >= 10);
  });

  test("the sitemap includes the new topic and collections", async () => {
    const response = await getSitemap({
      site: new URL("https://www.ui-skills.com"),
    } as never);
    const body = await response.text();
    for (const path of [
      "/skills/shadcn-ui-development",
      "/collections/web-development-best-practices",
      "/collections/design-engineering",
      "/collections/deslop",
    ]) {
      assert.ok(
        body.includes(`https://www.ui-skills.com${path}</loc>`),
        `Missing sitemap route: ${path}`,
      );
    }
  });
});
