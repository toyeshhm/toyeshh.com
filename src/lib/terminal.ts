import { sanitizeUrl } from "@/lib/security";

type TerminalFileMeta = {
  title?: string;
  url?: string;
  description?: string;
  alias?: string;
  hidden?: boolean;
};

type TerminalNodeBase = {
  name: string;
  path: string;
  hidden: boolean;
};

type TerminalFileNode = TerminalNodeBase & {
  kind: "file";
  content: string;
  body: string;
  meta: TerminalFileMeta;
};

type TerminalDirectoryNode = TerminalNodeBase & {
  kind: "directory";
  children: Map<string, TerminalNode>;
};

export type TerminalNode = TerminalFileNode | TerminalDirectoryNode;

export type TerminalCommandResult =
  | { kind: "noop"; output?: string; nextPath?: string }
  | { kind: "text"; output: string; nextPath?: string }
  | { kind: "stream"; output: string; nextPath?: string }
  | { kind: "open"; output: string; url: string; nextPath?: string }
  | { kind: "agent"; output: string; nextPath?: string }
  | { kind: "clear"; nextPath?: string };

export type TerminalFilesystem = {
  root: TerminalDirectoryNode;
  files: Map<string, TerminalFileNode>;
};

const terminalMarkdownFiles = import.meta.glob(
  "../../content/terminal/**/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
) as Record<string, string>;

const COMMANDS = [
  "agent",
  "cat",
  "cd",
  "claude",
  "clear",
  "codex",
  "help",
  "ll",
  "ls",
  "man",
  "open",
  "pwd",
  "whoami",
];

const MANUAL = {
  ls: "ls, ll\n  list files in the current directory",
  cd: "cd <path>\n  change directory (supports .. and absolute paths)",
  pwd: "pwd\n  print current working directory",
  cat: "cat <file>\n  print file contents",
  open: "open <file>\n  open the mapped url for a file",
  agent:
    "agent | claude | codex\n  enter agent chat mode. use 'exit' to leave chat mode",
  whoami: "whoami\n  print a quick profile summary",
  clear: "clear\n  clear terminal output",
};

const normalizePath = (path: string) => {
  if (!path || path === "/") {
    return "/";
  }

  const segments = path.split("/").filter(Boolean);
  const normalized: string[] = [];

  for (const segment of segments) {
    if (segment === ".") {
      continue;
    }

    if (segment === "..") {
      normalized.pop();
      continue;
    }

    normalized.push(segment);
  }

  return `/${normalized.join("/")}`;
};

const joinPath = (basePath: string, targetPath: string) => {
  if (!targetPath || targetPath === ".") {
    return normalizePath(basePath);
  }

  if (targetPath.startsWith("/")) {
    return normalizePath(targetPath);
  }

  return normalizePath(`${basePath.replace(/\/$/, "")}/${targetPath}`);
};

const parseFrontmatter = (content: string) => {
  const normalizedContent = content.replace(/\r\n/g, "\n");

  if (!normalizedContent.startsWith("---\n")) {
    return { meta: {}, body: normalizedContent.trim() };
  }

  const frontmatterMatch = normalizedContent.match(
    /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/,
  );

  if (!frontmatterMatch) {
    return { meta: {}, body: normalizedContent.trim() };
  }

  const meta: TerminalFileMeta = {};

  for (const line of frontmatterMatch[1].split("\n")) {
    const [rawKey, ...rawValueParts] = line.split(":");
    const key = rawKey.trim();
    const value = rawValueParts
      .join(":")
      .trim()
      .replace(/^['"]|['"]$/g, "");

    if (!key || !value) {
      continue;
    }

    if (key === "title") {
      meta.title = value;
    }

    if (key === "url") {
      meta.url =
        sanitizeUrl(value, { allowedProtocols: ["http:", "https:"] }) ??
        undefined;
    }

    if (key === "description") {
      meta.description = value;
    }

    if (key === "alias") {
      meta.alias = value;
    }

    if (key === "hidden") {
      meta.hidden = value === "true";
    }
  }

  return {
    meta,
    body: frontmatterMatch[2].trim(),
  };
};

const buildNodePath = (segments: string[]) => `/${segments.join("/")}`;

export const buildTerminalFilesystem = (): TerminalFilesystem => {
  const root: TerminalDirectoryNode = {
    kind: "directory",
    name: "/",
    path: "/",
    hidden: false,
    children: new Map(),
  };
  const files = new Map<string, TerminalFileNode>();

  for (const [filePath, rawContent] of Object.entries(terminalMarkdownFiles)) {
    const relativePath = filePath.replace("../../content/terminal/", "");
    const segments = relativePath.split("/").filter(Boolean);
    const rawFileName = segments.pop() ?? relativePath;
    const directorySegments = segments;
    const { meta, body } = parseFrontmatter(rawContent);
    const fileName = meta.alias ?? rawFileName;
    const hidden = Boolean(meta.hidden) || fileName.startsWith(".");
    let currentDirectory = root;

    for (let index = 0; index < directorySegments.length; index += 1) {
      const segment = directorySegments[index];
      const currentPath = buildNodePath(directorySegments.slice(0, index + 1));
      const existingNode = currentDirectory.children.get(segment);

      if (existingNode && existingNode.kind === "directory") {
        currentDirectory = existingNode;
        continue;
      }

      const newDirectory: TerminalDirectoryNode = {
        kind: "directory",
        name: segment,
        path: currentPath,
        hidden: segment.startsWith("."),
        children: new Map(),
      };

      currentDirectory.children.set(segment, newDirectory);
      currentDirectory = newDirectory;
    }

    const fileNode: TerminalFileNode = {
      kind: "file",
      name: fileName,
      path: buildNodePath([...directorySegments, fileName]),
      hidden,
      content: rawContent.trim(),
      body,
      meta,
    };

    currentDirectory.children.set(fileName, fileNode);
    files.set(fileNode.path, fileNode);
  }

  return { root, files };
};

const filesystem = buildTerminalFilesystem();

const getDirectory = (path: string) => {
  if (path === "/") {
    return filesystem.root;
  }

  const segments = path.split("/").filter(Boolean);
  let currentNode: TerminalDirectoryNode = filesystem.root;

  for (const segment of segments) {
    const nextNode = currentNode.children.get(segment);

    if (!nextNode || nextNode.kind !== "directory") {
      return null;
    }

    currentNode = nextNode;
  }

  return currentNode;
};

const getNode = (path: string) => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === "/") {
    return filesystem.root;
  }

  const fileNode = filesystem.files.get(normalizedPath);

  if (fileNode) {
    return fileNode;
  }

  return getDirectory(normalizedPath);
};

const listEntries = (path: string, includeHidden = false) => {
  const directory = getDirectory(path);

  if (!directory) {
    return null;
  }

  return Array.from(directory.children.values())
    .filter((entry) => includeHidden || !entry.hidden)
    .sort((first, second) => {
      if (first.kind !== second.kind) {
        return first.kind === "directory" ? -1 : 1;
      }

      return first.name.localeCompare(second.name);
    });
};

const formatPathForPrompt = (path: string) => {
  if (path === "/") {
    return "~";
  }

  return `~${path}`;
};

const formatEntryLabel = (entry: TerminalNode) => {
  if (entry.kind === "directory") {
    return `${entry.name}/`;
  }

  return entry.name;
};

export const getFilesystemListing = (path: string, includeHidden = false) => {
  const entries = listEntries(normalizePath(path), includeHidden);

  if (!entries) {
    return null;
  }

  return entries.map(formatEntryLabel);
};

export const resolveTerminalPath = (cwd: string, targetPath: string) =>
  joinPath(cwd, targetPath);

export const getTerminalFile = (path: string) =>
  filesystem.files.get(normalizePath(path)) ?? null;

export const getTerminalDirectory = (path: string) =>
  getDirectory(normalizePath(path));

export const formatTerminalPromptPath = (path: string) =>
  formatPathForPrompt(normalizePath(path));

export const getTerminalCompletions = (cwd: string, input: string) => {
  const trimmedInput = input.trimStart();
  const parts = trimmedInput.split(/\s+/);

  if (parts.length <= 1) {
    const commandPrefix = parts[0] ?? "";
    return COMMANDS.filter((command) => command.startsWith(commandPrefix));
  }

  const command = parts[0];
  const argumentPrefix = parts.slice(1).join(" ");

  if (!["cat", "cd", "open", "ls", "ll"].includes(command)) {
    return [];
  }

  const directory = getDirectory(normalizePath(cwd));

  if (!directory) {
    return [];
  }

  const visibleEntries = Array.from(directory.children.values())
    .filter((entry) => !entry.hidden)
    .map((entry) => formatEntryLabel(entry));

  return visibleEntries.filter((entry) => entry.startsWith(argumentPrefix));
};

export const executeTerminalCommand = (
  cwd: string,
  commandInput: string,
): TerminalCommandResult => {
  const trimmedInput = commandInput.trim();

  if (!trimmedInput) {
    return { kind: "noop", nextPath: cwd };
  }

  const [command, ...rawArguments] = trimmedInput.split(/\s+/);
  const argument = rawArguments.join(" ");

  if (command === "clear") {
    return { kind: "clear", nextPath: cwd };
  }

  if (command === "help") {
    return {
      kind: "text",
      output: [
        "available commands:",
        "ls, ll, cd, pwd, cat, open, agent, man, whoami, clear",
        "use `man <command>` for details",
      ].join("\n"),
      nextPath: cwd,
    };
  }

  if (command === "man") {
    const topic = argument || "help";

    if (topic === "help") {
      return {
        kind: "text",
        output:
          "man <command>\navailable: ls, cd, pwd, cat, open, agent, whoami, clear",
        nextPath: cwd,
      };
    }

    const manualEntry = MANUAL[topic as keyof typeof MANUAL];

    if (!manualEntry) {
      return {
        kind: "text",
        output: `man: no manual entry for ${topic}`,
        nextPath: cwd,
      };
    }

    return {
      kind: "text",
      output: manualEntry,
      nextPath: cwd,
    };
  }

  if (command === "whoami") {
    return {
      kind: "text",
      output: [
        "toyeshh medikonda",
        "incoming ut austin turing scholar (cs honors)",
        "focus: ai/ml, quant, and full-stack engineering",
      ].join("\n"),
      nextPath: cwd,
    };
  }

  if (command === "agent" || command === "claude" || command === "codex") {
    return {
      kind: "agent",
      output: "agent mode enabled. ask anything or type `exit` to leave.",
      nextPath: cwd,
    };
  }

  if (command === "pwd") {
    return { kind: "text", output: formatPathForPrompt(cwd), nextPath: cwd };
  }

  if (command === "ls" || command === "ll") {
    const entries = getFilesystemListing(cwd);

    return {
      kind: "text",
      output:
        entries?.join("  ") ?? `ls: cannot access '${cwd}': no such directory`,
      nextPath: cwd,
    };
  }

  if (command === "cd") {
    const nextPath = argument ? resolveTerminalPath(cwd, argument) : "/";
    const node = getNode(nextPath);

    if (!node || node.kind !== "directory") {
      return {
        kind: "text",
        output: `cd: no such file or directory: ${argument || "/"}`,
        nextPath: cwd,
      };
    }

    return {
      kind: "noop",
      nextPath: node.path,
    };
  }

  if (command === "cat") {
    const filePath = resolveTerminalPath(cwd, argument);
    const fileNode = getTerminalFile(filePath);

    if (!fileNode) {
      return {
        kind: "text",
        output: `cat: ${argument}: No such file`,
        nextPath: cwd,
      };
    }

    return {
      kind: "stream",
      output: fileNode.body,
      nextPath: cwd,
    };
  }

  if (command === "open") {
    const filePath = resolveTerminalPath(cwd, argument);
    const fileNode = getTerminalFile(filePath);

    if (!fileNode) {
      return {
        kind: "text",
        output: `open: ${argument}: No such file`,
        nextPath: cwd,
      };
    }

    if (!fileNode.meta.url) {
      return {
        kind: "text",
        output: `open: ${argument}: no url mapped`,
        nextPath: cwd,
      };
    }

    return {
      kind: "open",
      output: `opening ${fileNode.meta.url}`,
      url: fileNode.meta.url,
      nextPath: cwd,
    };
  }

  return {
    kind: "text",
    output: `${command}: command not found`,
    nextPath: cwd,
  };
};

export const terminalHelpText = [
  "available commands:",
  "ls, ll, cd, pwd, cat, open, agent, man, whoami, clear",
  "use `man <command>` for details",
].join("\n");
