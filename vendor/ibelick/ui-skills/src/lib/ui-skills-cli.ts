const UI_SKILLS_BIN = "ui-skills";
const SKILLS_BIN = "skills";

type CliPlaceholder = { kind: "placeholder"; name: string };
type CliLiteral = { kind: "literal"; value: string };
type CliArg = CliPlaceholder | CliLiteral;

type UiSkillsCommand = {
  command: string;
  args?: CliArg[];
};

const AGENT_START_COMMANDS: UiSkillsCommand[] = [
  { command: "start" },
  { command: "categories" },
  {
    command: "list",
    args: [
      { kind: "literal", value: "--category" },
      { kind: "placeholder", name: "category" },
    ],
  },
  {
    command: "get",
    args: [{ kind: "placeholder", name: "skill" }],
  },
];

function formatArg(arg: CliArg): string {
  return arg.kind === "placeholder" ? `<${arg.name}>` : arg.value;
}

function formatShellCommand(bin: string, command: UiSkillsCommand): string {
  return [
    "npx",
    bin,
    command.command,
    ...(command.args ?? []).map(formatArg),
  ].join(" ");
}

export function formatUiSkillsAgentStartCopy(): string {
  return AGENT_START_COMMANDS.map((command) =>
    formatShellCommand(UI_SKILLS_BIN, command),
  ).join("\n");
}

export const UI_SKILLS_AGENT_START_COPY = formatUiSkillsAgentStartCopy();

export function buildSkillsInstallCommand(
  repoUrl: string,
  skillName: string,
): string {
  return formatShellCommand(SKILLS_BIN, {
    command: "add",
    args: [
      { kind: "literal", value: repoUrl },
      { kind: "literal", value: "--skill" },
      { kind: "literal", value: skillName },
    ],
  });
}
