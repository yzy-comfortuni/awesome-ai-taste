import { writeFile } from "node:fs/promises";
import { githubResources } from "../src/data/github-resources.ts";

const metadataFile = new URL(
  "../src/data/github-metadata.json",
  import.meta.url,
);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "ui-skills-github-metadata",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const repositories = new Map();
for (const resource of githubResources) {
  const normalizedRepo = resource.githubRepo.toLowerCase();
  if (!repositories.has(normalizedRepo)) {
    repositories.set(normalizedRepo, resource.githubRepo);
  }
}

const metadata = {};
for (const githubRepo of repositories.values()) {
  const response = await fetch(`https://api.github.com/repos/${githubRepo}`, {
    headers,
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${githubRepo}`);
  }

  const repository = await response.json();
  if (
    !Number.isInteger(repository.stargazers_count) ||
    !Number.isInteger(repository.forks_count)
  ) {
    throw new Error(`GitHub returned invalid counts for ${githubRepo}`);
  }

  const license = repository.license?.spdx_id;
  metadata[githubRepo.toLowerCase()] = {
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    license: license && license !== "NOASSERTION" ? license : null,
    pushedAt: repository.pushed_at,
    updatedAt: repository.updated_at,
    archived: Boolean(repository.archived),
  };
}

const sortedRepositories = Object.fromEntries(
  Object.entries(metadata).sort(([a], [b]) => a.localeCompare(b)),
);

await writeFile(
  metadataFile,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      repositories: sortedRepositories,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  `Updated GitHub metadata for ${Object.keys(sortedRepositories).length} repositories.`,
);
