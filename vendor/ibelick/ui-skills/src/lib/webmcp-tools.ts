type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
  annotations?: Record<string, unknown>;
};

type ModelContext = {
  registerTool: (tool: WebMcpTool) => void;
  unregisterTool?: (name: string) => void;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

type SkillSummary = {
  slug: string;
  pathSlug: string;
  label: string;
  description?: string;
};

function getModelContext(): ModelContext | null {
  if (typeof navigator === "undefined") return null;
  if (!("modelContext" in navigator) || !navigator.modelContext) return null;
  return navigator.modelContext;
}

async function fetchRegistry(): Promise<{
  registry: Array<{
    slug: string;
    pathSlug: string;
    name: string;
    description?: string;
  }>;
}> {
  const response = await fetch("/skills/registry.json");
  if (!response.ok) {
    throw new Error(`Registry request failed (${response.status})`);
  }
  return (await response.json()) as {
    registry: Array<{
      slug: string;
      pathSlug: string;
      name: string;
      description?: string;
    }>;
  };
}

function toSummaries(
  registry: Array<{
    slug: string;
    pathSlug: string;
    name: string;
    description?: string;
  }>,
): SkillSummary[] {
  return registry.map((skill) => ({
    slug: skill.slug,
    pathSlug: skill.pathSlug,
    label: skill.name,
    description: skill.description,
  }));
}

export function registerWebMcpTools(signal?: AbortSignal): void {
  const modelContext = getModelContext();
  if (!modelContext) return;

  const tools: WebMcpTool[] = [
    {
      name: "list_ui_skills",
      description:
        "List UI Skills from the public catalog with slug, path, and description.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Optional case-insensitive filter over name/description.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async (args) => {
        const query =
          typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
        const { registry } = await fetchRegistry();
        let skills = toSummaries(registry);
        if (query) {
          skills = skills.filter((skill) => {
            const haystack = `${skill.label} ${skill.slug} ${skill.description ?? ""}`.toLowerCase();
            return haystack.includes(query);
          });
        }
        return {
          count: skills.length,
          skills: skills.slice(0, 50),
        };
      },
    },
    {
      name: "open_ui_skill",
      description:
        "Navigate the browser to a UI skill page by slug or pathSlug.",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "Skill slug such as baseline-ui or improve-ui.",
          },
          pathSlug: {
            type: "string",
            description: "Optional owner/slug path such as ibelick/baseline-ui.",
          },
        },
        additionalProperties: false,
      },
      execute: async (args) => {
        const { registry } = await fetchRegistry();
        const slug = typeof args.slug === "string" ? args.slug : "";
        const pathSlug = typeof args.pathSlug === "string" ? args.pathSlug : "";
        const match = registry.find(
          (skill) =>
            skill.slug === slug ||
            skill.pathSlug === pathSlug ||
            skill.pathSlug === slug ||
            skill.pathSlug.endsWith(`/${slug}`),
        );
        if (!match) {
          return { error: `Skill not found for slug="${slug}" pathSlug="${pathSlug}"` };
        }
        const href = `/skills/${match.pathSlug}`;
        window.location.assign(href);
        return { ok: true, href, skill: match.name };
      },
    },
    {
      name: "get_ui_skills_overview",
      description:
        "Fetch the site llms.txt overview for agents (navigation + skill catalog summary).",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const response = await fetch("/llms.txt");
        if (!response.ok) {
          return { error: `llms.txt request failed (${response.status})` };
        }
        const text = await response.text();
        return { contentType: "text/plain", text };
      },
    },
  ];

  for (const tool of tools) {
    modelContext.registerTool(tool);
  }

  const cleanup = () => {
    for (const tool of tools) {
      modelContext.unregisterTool?.(tool.name);
    }
  };

  signal?.addEventListener("abort", cleanup, { once: true });
}
