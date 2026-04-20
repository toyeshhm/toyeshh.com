import { describe, expect, it } from "vitest";
import {
  executeTerminalCommand,
  formatTerminalPromptPath,
  getFilesystemListing,
  getTerminalCompletions,
  getTerminalFile,
  resolveTerminalPath,
} from "./terminal";

describe("terminal filesystem", () => {
  it("builds a visible root listing and hides dotfiles", () => {
    expect(getFilesystemListing("/")).toEqual([
      "blog/",
      "projects/",
      "work/",
      "about.md",
      "cursor.md",
      "welcome.md",
    ]);
    expect(getFilesystemListing("/", true)).toContain(".secret");
  });

  it("resolves relative paths and reads hidden files", () => {
    expect(resolveTerminalPath("/projects", "../welcome.md")).toBe(
      "/welcome.md",
    );
    expect(getTerminalFile("/.secret")).toBeTruthy();
    expect(getTerminalFile("/.secret")?.body).toContain("best interface");
  });

  it("supports completion for commands and entries", () => {
    expect(getTerminalCompletions("/", "ag")).toEqual(["agent"]);
    expect(getTerminalCompletions("/", "c")).toEqual([
      "cat",
      "cd",
      "claude",
      "clear",
      "codex",
    ]);
    expect(getTerminalCompletions("/", "cat c")).toEqual(["cursor.md"]);
  });
});

describe("terminal commands", () => {
  it("streams welcome content, changes directories, and opens mapped urls", () => {
    const catResult = executeTerminalCommand("/", "cat welcome.md");
    expect(catResult.kind).toBe("stream");
    if (catResult.kind === "stream") {
      expect(catResult.output).toContain("# Toyeshh Terminal");
    }

    const cdResult = executeTerminalCommand("/", "cd projects");
    expect(cdResult.kind).toBe("noop");
    expect(cdResult.nextPath).toBe("/projects");

    const openResult = executeTerminalCommand("/", "open cursor.md");
    expect(openResult.kind).toBe("open");
    if (openResult.kind === "open") {
      expect(openResult.url).toBe("https://www.cursor.com/");
    }
  });

  it("formats the prompt path for the root and nested directories", () => {
    expect(formatTerminalPromptPath("/")).toBe("~");
    expect(formatTerminalPromptPath("/projects")).toBe("~/projects");
  });

  it("supports theme, agent aliases, manual pages, and whoami", () => {
    const themeResult = executeTerminalCommand("/", "theme midnight");
    expect(themeResult.kind).toBe("theme");
    if (themeResult.kind === "theme") {
      expect(themeResult.themeArg).toBe("midnight");
    }

    const agentResult = executeTerminalCommand("/", "codex");
    expect(agentResult.kind).toBe("agent");

    const manResult = executeTerminalCommand("/", "man open");
    expect(manResult.kind).toBe("text");
    if (manResult.kind === "text") {
      expect(manResult.output).toContain("open <file>");
    }

    const whoamiResult = executeTerminalCommand("/", "whoami");
    expect(whoamiResult.kind).toBe("text");
    if (whoamiResult.kind === "text") {
      expect(whoamiResult.output).toContain("toyeshh medikonda");
    }
  });
});
