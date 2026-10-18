export type Agent = {
  id: string;
  name: string;
  description: string;
  topics: string[];
  sourceUrl: string;
  faviconUrl: string;
  websiteUrl?: string;
  skills?: { path: string; docsUrl: string };
};

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

export const agents: Agent[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description:
      "Anthropic's official terminal agent. Skills installed via the skills CLI become available as procedural knowledge across every Claude Code session in the project.",
    topics: ["Terminal", "CLI", "Repo context"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("anthropic.com"),
    websiteUrl: "https://www.anthropic.com/claude-code",
    skills: { path: ".claude/skills/", docsUrl: "https://code.claude.com/docs/en/skills" },
  },
  {
    id: "cursor",
    name: "Cursor",
    description:
      "AI-first code editor with deep agent integration. The skills CLI installs SKILL.md files so Cursor can reference them automatically across repo sessions.",
    topics: ["Editor", "Inline edits", "Context"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("cursor.com"),
    websiteUrl: "https://cursor.com/agents",
    skills: { path: ".cursor/skills/", docsUrl: "https://cursor.com/docs/context/skills" },
  },
  {
    id: "codex",
    name: "Codex",
    description:
      "OpenAI's coding agent. Compatible with the skills CLI for installing reusable procedural knowledge - performance rules, design systems, and workflow patterns.",
    topics: ["Terminal", "Refactors", "Automation"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("openai.com"),
    websiteUrl: "https://openai.com/codex",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description:
      "GitHub's AI coding assistant. Skills installed via the skills CLI augment Copilot's project context with structured guidance the model uses across edits and chats.",
    topics: ["IDE", "Chat", "Completion"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("github.com"),
    websiteUrl: "https://github.com/features/copilot",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description:
      "Codeium's agentic IDE. Skills give Windsurf project-specific procedural knowledge that persists across sessions without manual re-prompting.",
    topics: ["Editor", "Workflow", "Iteration"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("windsurf.com"),
    websiteUrl: "https://windsurf.com",
  },
  {
    id: "gemini",
    name: "Gemini",
    description:
      "Google's Gemini family of agents. Compatible with the skills CLI for repo-scoped skill installation - including the Gemini CLI for terminal workflows.",
    topics: ["Terminal", "Context", "Search"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("gemini.google.com"),
    websiteUrl: "https://gemini.google.com",
    skills: { path: ".gemini/skills/", docsUrl: "https://geminicli.com/docs/cli/skills/" },
  },
  {
    id: "cline",
    name: "Cline",
    description:
      "Open-source autonomous coding agent for VS Code. Reads SKILL.md files installed via the skills CLI to apply project-specific patterns automatically.",
    topics: ["VS Code", "Automation", "Tasks"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("cline.bot"),
    websiteUrl: "https://cline.bot",
  },
  {
    id: "amp",
    name: "AMP",
    description:
      "AMP is a research agent that uses the skills CLI to load procedural knowledge for engineering, design, and operational tasks.",
    topics: ["Research", "Design", "Ops"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("ampcode.com"),
    websiteUrl: "https://ampcode.com",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    description:
      "Google's developer agent platform. Skills installed via the skills CLI extend Antigravity sessions with reusable, project-scoped guidance.",
    topics: ["Platform", "Guidance", "Sessions"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("google.com"),
    websiteUrl: "https://antigravity.google.com",
    skills: { path: ".agent/skills/", docsUrl: "https://codelabs.developers.google.com/getting-started-with-antigravity-skills" },
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    description:
      "OpenClaw supports the skills CLI for installing reusable procedural knowledge across agent sessions.",
    topics: ["Sessions", "Knowledge", "Automation"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("openclaw.ai"),
    websiteUrl: "https://openclaw.ai/",
  },
  {
    id: "droid",
    name: "Droid",
    description:
      "Factory's autonomous engineering agent. Compatible with the skills CLI for installing skills that Droid loads into its project context.",
    topics: ["Autonomy", "Repo context", "Engineering"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("factory.ai"),
    websiteUrl: "https://factory.ai/droid",
  },
  {
    id: "goose",
    name: "Goose",
    description:
      "Block's open-source on-machine agent. Skills installed via the skills CLI extend Goose with reusable extensions and procedural guidance.",
    topics: ["Open source", "On-machine", "Guidance"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("github.com"),
    websiteUrl: "https://github.com/block/goose",
    skills: { path: ".agents/skills/", docsUrl: "https://goose-docs.ai/docs/guides/context-engineering/using-skills" },
  },
  {
    id: "kilo",
    name: "Kilo",
    description:
      "Kilo is an AI coding agent that supports the skills CLI for installing reusable, project-scoped capabilities.",
    topics: ["IDE", "Capabilities", "Projects"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("kilo.dev"),
    websiteUrl: "https://kilo.dev",
  },
  {
    id: "kiro-cli",
    name: "Kiro CLI",
    description:
      "Kiro's terminal agent. Compatible with the skills CLI for installing SKILL.md-based knowledge across sessions.",
    topics: ["Terminal", "SKILL.md", "Sessions"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("kiro.dev"),
    websiteUrl: "https://kiro.dev",
    skills: { path: ".kiro/skills/", docsUrl: "https://kiro.dev/docs/cli/skills/" },
  },
  {
    id: "nous-research",
    name: "Nous Research",
    description:
      "Nous Research builds and ships open agents. Their tooling supports the skills CLI for installing reusable procedural knowledge.",
    topics: ["Open agents", "Research", "Knowledge"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("nousresearch.com"),
    websiteUrl: "https://nousresearch.com",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description:
      "OpenCode is an open-source AI coding agent that integrates with the skills CLI for repo-scoped skill installation.",
    topics: ["Open source", "Repo-scoped", "Coding"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("opencode.ai"),
    websiteUrl: "https://opencode.ai",
    skills: { path: ".opencode/skills/", docsUrl: "https://opencode.ai/docs/skills" },
  },
  {
    id: "roo",
    name: "Roo",
    description:
      "Roo Code is an autonomous coding agent with skills CLI compatibility for project-scoped guidance.",
    topics: ["Autonomy", "Guidance", "Projects"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("roocode.com"),
    websiteUrl: "https://roocode.com",
    skills: { path: ".roo/skills/", docsUrl: "https://docs.roocode.com/features/skills" },
  },
  {
    id: "trae",
    name: "Trae",
    description:
      "Trae is an AI coding agent that supports the skills CLI for installing reusable knowledge across sessions.",
    topics: ["Sessions", "Knowledge", "Workflow"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("trae.ai"),
    websiteUrl: "https://trae.ai",
  },
  {
    id: "vscode",
    name: "VS Code",
    description:
      "Visual Studio Code's GitHub Copilot Chat and agent features support the skills CLI for installing project-scoped procedural knowledge.",
    topics: ["Editor", "Chat", "Project context"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("code.visualstudio.com"),
    websiteUrl: "https://code.visualstudio.com",
  },
  {
    id: "zed",
    name: "Zed",
    description:
      "Rust-based code editor with a built-in agent panel and native parallel agents. The skills CLI installs SKILL.md files that Zed references automatically when working on the repo.",
    topics: ["Editor", "Parallel agents", "Speed"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("zed.dev"),
    websiteUrl: "https://zed.dev",
    skills: { path: ".agents/skills/", docsUrl: "https://zed.dev/docs/ai/skills" },
  },
  {
    id: "augment",
    name: "Augment",
    description:
      "Augment Code's coding agent, available through Auggie CLI and editor integrations. Auggie supports Agent Skills for reusable project guidance, code reviews, and development workflows.",
    topics: ["CLI", "Codebase context", "Editor"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("augmentcode.com"),
    websiteUrl: "https://www.augmentcode.com/",
    skills: {
      path: ".augment/skills/",
      docsUrl: "https://docs.augmentcode.com/cli/skills",
    },
  },
  {
    id: "junie",
    name: "Junie",
    description:
      "JetBrains' coding agent for terminal and IDE workflows. Junie CLI loads project and personal skills to apply reusable instructions, team conventions, and task-specific procedures.",
    topics: ["JetBrains", "CLI", "Project context"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("jetbrains.com"),
    websiteUrl: "https://junie.jetbrains.com/",
    skills: {
      path: ".junie/skills/",
      docsUrl: "https://junie.jetbrains.com/docs/agent-skills.html",
    },
  },
  {
    id: "warp",
    name: "Warp",
    description:
      "An agentic development environment with terminal, CLI, and cloud agents. Warp discovers reusable skills for coding tasks, reviews, and team workflows from project and global skill directories.",
    topics: ["Terminal", "CLI", "Cloud agents"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("warp.dev"),
    websiteUrl: "https://www.warp.dev/",
    skills: {
      path: ".agents/skills/",
      docsUrl: "https://docs.warp.dev/agents/capabilities/skills/",
    },
  },
  {
    id: "devin-cli",
    name: "Devin CLI",
    description:
      "Cognition's local coding agent for terminal workflows, with handoff to cloud Devin. Skills package reusable prompts and procedures that you or the agent can invoke during development.",
    topics: ["Terminal", "Local development", "Cloud handoff"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("devin.ai"),
    websiteUrl: "https://docs.devin.ai/work-with-devin/devin-cli",
    skills: {
      path: ".devin/skills/",
      docsUrl: "https://docs.devin.ai/cli/extensibility/skills/overview",
    },
  },
  {
    id: "mistral-vibe",
    name: "Mistral Vibe",
    description:
      "Mistral's open-source command-line coding assistant. It reads and edits code, runs commands, and follows the Agent Skills specification for reusable instructions and custom slash commands.",
    topics: ["Terminal", "Open source", "Mistral"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("mistral.ai"),
    websiteUrl: "https://github.com/mistralai/mistral-vibe",
    skills: {
      path: ".vibe/skills/",
      docsUrl: "https://github.com/mistralai/mistral-vibe#skills-system",
    },
  },
  {
    id: "qwen-code",
    name: "Qwen Code",
    description:
      "An open-source coding agent with terminal and editor integrations. Qwen Code discovers SKILL.md instructions for project conventions, development workflows, and specialized tasks.",
    topics: ["Terminal", "Open source", "Editor"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("qwen.ai"),
    websiteUrl: "https://github.com/QwenLM/qwen-code",
    skills: {
      path: ".qwen/skills/",
      docsUrl: "https://qwenlm.github.io/qwen-code-docs/en/users/features/skills/",
    },
  },
  {
    id: "kimi-code-cli",
    name: "Kimi Code CLI",
    description:
      "Moonshot AI's open-source terminal coding agent. It reads and edits files, runs commands, and loads project or personal skills automatically or through explicit skill commands.",
    topics: ["Terminal", "Open source", "Editor integration"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("kimi.com"),
    websiteUrl: "https://github.com/MoonshotAI/kimi-code",
    skills: {
      path: ".kimi-code/skills/",
      docsUrl: "https://moonshotai.github.io/kimi-code/en/customization/skills.html",
    },
  },
  {
    id: "pi",
    name: "Pi",
    description:
      "An open-source terminal coding agent that supports the Agent Skills specification. Pi discovers skill descriptions at startup and loads their full instructions when relevant, or through explicit skill commands.",
    topics: ["Terminal", "Open source", "Extensible"],
    sourceUrl: "https://www.ui-skills.com/?source=ui-skills.com",
    faviconUrl: favicon("pi.dev"),
    websiteUrl: "https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent",
    skills: {
      path: ".agents/skills/",
      docsUrl: "https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md",
    },
  },
];

export const agentById = new Map(agents.map((agent) => [agent.id, agent]));
