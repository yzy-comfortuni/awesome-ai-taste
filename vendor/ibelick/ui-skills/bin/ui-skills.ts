#!/usr/bin/env -S node --experimental-strip-types

export {};

type RemoteSkill = {
  slug: string;
  pathSlug: string;
  sourceKey: string;
  sourceLabel: string;
  name: string;
  description: string;
  topics?: string[];
};

type RemoteTopic = {
  slug: string;
  label: string;
};

type RegistryManifest = {
  registry: RemoteSkill[];
  topics: RemoteTopic[];
};

const argv = process.argv.slice(2);

const SITE_URL = process.env.UI_SKILLS_SITE_URL ?? "https://www.ui-skills.com";
const REGISTRY_URL = new URL("/skills/registry.json", SITE_URL);

const BANNER = [
  " ██╗   ██╗██╗      ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗",
  " ██║   ██║██║      ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝",
  " ██║   ██║██║█████╗███████╗█████╔╝ ██║██║     ██║     ███████╗",
  " ██║   ██║██║╚════╝╚════██║██╔═██╗ ██║██║     ██║     ╚════██║",
  " ╚██████╔╝██║      ███████║██║  ██╗██║███████╗███████╗███████║",
  "  ╚═════╝ ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝",
].join("\n");

const HELP = [
  BANNER,
  "",
  "Skills for Design Engineers",
  "",
  "Usage:",
  "  ui-skills [command]",
  "",
  "Commands:",
  "  start                     Print the routing skill",
  "  categories                List categories",
  "  list [--category <topic>] List skills",
  "  get <slug>                Print full skill markdown",
  "",
  "Examples:",
  "  ui-skills start",
  "  ui-skills list --category motion",
  "  ui-skills get baseline-ui",
].join("\n");

const normalize = (value: string) => value.trim().toLowerCase();

const print = (value: string) => {
  process.stdout.write(`${value}\n`);
};

const failExtraArgs = (command: string) => {
  fail(`Too many arguments for ${command}`, 1);
};

const fail = (message: string, code = 1) => {
  process.stderr.write(`${message}\n`);
  process.exitCode = code;
};

const fetchRegistryManifest = async () => {
  const response = await fetch(REGISTRY_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${REGISTRY_URL} (${response.status} ${response.statusText})`,
    );
  }

  return (await response.json()) as RegistryManifest;
};

const fetchSkillContent = async (pathSlug: string) => {
  const skillUrl = new URL(
    `/skills/${pathSlug.split("/").map(encodeURIComponent).join("/")}/llms.txt`,
    SITE_URL,
  );
  const response = await fetch(skillUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${skillUrl} (${response.status} ${response.statusText})`,
    );
  }

  return response.text();
};

const formatTopic = (topic: RemoteTopic) => topic.slug;

const formatSkill = (skill: RemoteSkill) => {
  const categories = (skill.topics ?? []).join(", ");
  const description = skill.description.replace(/\s+/g, " ").trim();
  return `${skill.pathSlug} — ${categories} — ${description}`;
};

const resolveSkillCandidates = (registry: RemoteSkill[], input: string) => {
  const normalizedInput = normalize(input);
  const exactPath = registry.find(
    (entry) => normalize(entry.pathSlug) === normalizedInput,
  );
  if (exactPath) {
    return [exactPath];
  }

  const bySlug = registry.filter(
    (entry) => normalize(entry.slug) === normalizedInput,
  );
  return bySlug;
};

const printList = async (category?: string) => {
  const { registry, topics } = await fetchRegistryManifest();
  const normalizedCategory = category ? normalize(category) : undefined;
  const topicSlugs = new Set(topics.map((topic) => topic.slug));
  const filtered = category
    ? registry.filter((skill) =>
        skill.topics?.includes(normalizedCategory ?? ""),
      )
    : registry;

  if (category && !topicSlugs.has(normalizedCategory ?? "")) {
    fail(`Unknown category: ${category}`, 3);
    return;
  }

  if (category && filtered.length === 0) {
    fail(`No skills found for category: ${category}`, 3);
    return;
  }

  print(filtered.map(formatSkill).join("\n"));
};

const printGet = async (input: string) => {
  const { registry } = await fetchRegistryManifest();
  const candidates = resolveSkillCandidates(registry, input);

  if (candidates.length === 0) {
    fail(`Skill not found: ${input}`, 3);
    return;
  }

  if (candidates.length > 1) {
    process.stderr.write(`Ambiguous skill slug: ${input}\n`);
    process.stderr.write("Candidates:\n");
    for (const candidate of candidates) {
      process.stderr.write(`- ${candidate.pathSlug}\n`);
    }
    process.exitCode = 3;
    return;
  }

  const skill = candidates[0];
  process.stdout.write(await fetchSkillContent(skill.pathSlug));
};

const main = async () => {
  const [command = ""] = argv;

  if (
    !command ||
    command === "--help" ||
    command === "-h" ||
    command === "help"
  ) {
    print(HELP);
    return;
  }

  if (command === "start") {
    if (argv.length > 1) {
      failExtraArgs("start");
      return;
    }

    const { registry } = await fetchRegistryManifest();
    const skill = resolveSkillCandidates(registry, "ui-skills-root")[0];
    if (!skill) {
      fail("Skill not found: ui-skills-root", 3);
      return;
    }

    process.stdout.write(await fetchSkillContent(skill.pathSlug));
    return;
  }

  if (command === "categories") {
    if (argv.length > 1) {
      failExtraArgs("categories");
      return;
    }

    const { topics } = await fetchRegistryManifest();
    print(topics.map(formatTopic).join("\n"));
    return;
  }

  if (command === "list") {
    const args = argv.slice(1);

    if (args.length === 0) {
      await printList();
      return;
    }

    if (args.length === 1 && args[0] === "--category") {
      fail("Missing value for --category", 1);
      return;
    }

    if (args.length === 2 && args[0] === "--category") {
      await printList(args[1]);
      return;
    }

    if (args.length > 0) {
      failExtraArgs("list");
      return;
    }

    await printList();
    return;
  }

  if (command === "get") {
    const args = argv.slice(1);

    if (args.length > 1) {
      failExtraArgs("get");
      return;
    }

    const target = args[0];
    if (!target) {
      fail("Missing skill slug", 1);
      return;
    }

    await printGet(target);
    return;
  }

  fail(`Unknown command: ${command}`, 2);
};

await main().catch((error) => {
  fail(
    `Error communicating with ui-skills.com: ${error instanceof Error ? error.message : String(error)}`,
    4,
  );
});
