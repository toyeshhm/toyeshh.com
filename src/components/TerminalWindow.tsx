import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  executeTerminalCommand,
  formatTerminalPromptPath,
  getTerminalCompletions,
  getTerminalFile,
} from "@/lib/terminal";
import { AgentMessage, sendTerminalAgentMessage } from "@/lib/terminalAgent";

type TerminalHistoryEntry = {
  id: number;
  kind: "command" | "output" | "error";
  text: string;
  cwd: string;
};

type IntroState = {
  typedCommand: string;
  streamedOutput: string;
};

type TerminalTheme = {
  id: "site" | "light" | "dark-blue" | "dark-gray" | "warm" | "midnight";
  label: string;
  surface: string;
  header: string;
  input: string;
  border: string;
  foreground: string;
  muted: string;
  prompt: string;
};

type TerminalWindowMode = "normal" | "minimized" | "maximized" | "closed";

const INTRO_COMMAND = "cat welcome.md";
const INTRO_COMMAND_SPEED = 42;
const INTRO_OUTPUT_SPEED = 9;
const COMMAND_SPEED = 14;
const AGENT_DAILY_LIMIT = 100;
const AGENT_CONVERSATION_LIMIT = 30;
const AGENT_MESSAGE_CHAR_LIMIT = 1000;
let hasBootstrappedIntro = false;

const TERMINAL_THEMES: TerminalTheme[] = [
  {
    id: "site",
    label: "site",
    surface:
      "linear-gradient(180deg, rgba(250, 243, 234, 0.98), rgba(239, 226, 212, 0.98))",
    header: "rgba(244, 234, 223, 0.92)",
    input: "rgba(255, 250, 244, 0.96)",
    border: "rgba(155, 123, 92, 0.26)",
    foreground: "#3a271d",
    muted: "#7d614d",
    prompt: "#a95b31",
  },
  {
    id: "light",
    label: "light",
    surface:
      "linear-gradient(180deg, rgba(250, 250, 250, 0.98), rgba(242, 242, 242, 0.98))",
    header: "rgba(240, 240, 240, 0.95)",
    input: "rgba(230, 230, 230, 0.9)",
    border: "rgba(194, 194, 194, 0.9)",
    foreground: "#222222",
    muted: "#595959",
    prompt: "#9d5f02",
  },
  {
    id: "dark-blue",
    label: "dark-blue",
    surface:
      "linear-gradient(180deg, rgba(11, 23, 40, 0.98), rgba(6, 15, 28, 0.98))",
    header: "rgba(23, 39, 63, 0.72)",
    input: "rgba(8, 22, 40, 0.88)",
    border: "rgba(66, 103, 143, 0.52)",
    foreground: "#e5eefc",
    muted: "#9fb2d2",
    prompt: "#57b5ff",
  },
  {
    id: "dark-gray",
    label: "dark-gray",
    surface:
      "linear-gradient(180deg, rgba(27, 27, 28, 0.98), rgba(18, 18, 19, 0.98))",
    header: "rgba(42, 42, 44, 0.7)",
    input: "rgba(19, 19, 20, 0.9)",
    border: "rgba(82, 82, 86, 0.52)",
    foreground: "#ececec",
    muted: "#ababab",
    prompt: "#f29e44",
  },
  {
    id: "warm",
    label: "warm",
    surface:
      "linear-gradient(180deg, rgba(49, 29, 16, 0.96), rgba(28, 18, 11, 0.98))",
    header: "rgba(81, 47, 28, 0.65)",
    input: "rgba(32, 20, 12, 0.92)",
    border: "rgba(138, 92, 57, 0.48)",
    foreground: "#f2e5d8",
    muted: "#cab099",
    prompt: "#f8b36c",
  },
  {
    id: "midnight",
    label: "midnight",
    surface:
      "linear-gradient(180deg, rgba(8, 6, 17, 0.98), rgba(3, 2, 8, 0.99))",
    header: "rgba(19, 14, 36, 0.74)",
    input: "rgba(8, 6, 17, 0.92)",
    border: "rgba(69, 55, 125, 0.55)",
    foreground: "#eae6ff",
    muted: "#ada5d7",
    prompt: "#9e8dff",
  },
];

const getCommonPrefix = (values: string[]) => {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  let prefix = values[0];

  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix) && prefix.length > 0) {
      prefix = prefix.slice(0, -1);
    }
  }

  return prefix;
};

const TerminalWindow = ({ className = "" }: { className?: string }) => {
  const reducedMotion = true;
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(0);
  const cwdRef = useRef("/");
  const processingRef = useRef(false);
  const queueRef = useRef<string[]>([]);
  const commandHistoryRef = useRef<string[]>([]);
  const commandHistoryIndexRef = useRef(-1);
  const mountedRef = useRef(true);
  const [agentMode, setAgentMode] = useState(false);
  const [agentHistory, setAgentHistory] = useState<AgentMessage[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [cwd, setCwd] = useState("/");
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([]);
  const [intro, setIntro] = useState<IntroState | null>(null);
  const [windowMode, setWindowMode] = useState<TerminalWindowMode>("normal");
  const theme = TERMINAL_THEMES[0];

  useEffect(() => {
    cwdRef.current = cwd;
  }, [cwd]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const scrollNode = scrollRef.current;

    if (!scrollNode) {
      return;
    }

    scrollNode.scrollTo({
      top: scrollNode.scrollHeight,
      behavior: "auto",
    });
  }, [history, intro, cwd, inputValue]);

  useEffect(() => {
    if (windowMode !== "maximized") {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setWindowMode("normal");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [windowMode]);

  const handleCloseWindow = () => {
    setWindowMode("closed");
  };

  const handleMinimizeWindow = () => {
    setWindowMode((currentMode) => {
      if (currentMode === "minimized") {
        return "normal";
      }

      if (currentMode === "closed") {
        return "minimized";
      }

      return "minimized";
    });
  };

  const handleZoomWindow = () => {
    setWindowMode((currentMode) => {
      if (currentMode === "maximized") {
        return "normal";
      }

      return "maximized";
    });
  };

  const handleReopenWindow = () => {
    setWindowMode("normal");
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const addHistoryEntry = (entry: Omit<TerminalHistoryEntry, "id">): number => {
    const id = nextIdRef.current + 1;
    nextIdRef.current = id;

    setHistory((currentHistory) => [...currentHistory, { id, ...entry }]);

    return id;
  };

  const updateHistoryEntry = (id: number, text: string) => {
    setHistory((currentHistory) =>
      currentHistory.map((entry) =>
        entry.id === id ? { ...entry, text } : entry,
      ),
    );
  };

  const streamText = async (
    entryId: number,
    text: string,
    speed = COMMAND_SPEED,
  ) => {
    if (reducedMotion) {
      updateHistoryEntry(entryId, text);
      return;
    }

    let typedText = "";

    for (const character of text) {
      if (!mountedRef.current) {
        return;
      }

      typedText += character;
      updateHistoryEntry(entryId, typedText);

      await new Promise((resolve) => {
        window.setTimeout(resolve, speed);
      });
    }
  };

  const getAgentUsage = () => {
    const today = new Date().toISOString().slice(0, 10);

    try {
      const raw = window.localStorage.getItem("terminal-agent-usage");

      if (!raw) {
        return { date: today, count: 0 };
      }

      const parsed = JSON.parse(raw) as { date?: string; count?: number };

      if (parsed.date !== today) {
        return { date: today, count: 0 };
      }

      return {
        date: today,
        count: Math.max(0, Number(parsed.count) || 0),
      };
    } catch {
      return { date: today, count: 0 };
    }
  };

  const setAgentUsage = (count: number) => {
    const today = new Date().toISOString().slice(0, 10);

    try {
      window.localStorage.setItem(
        "terminal-agent-usage",
        JSON.stringify({ date: today, count }),
      );
    } catch {
      // Ignore storage failures; terminal still works without persistence.
    }
  };

  const pushOutput = (text: string, cwdPath = cwdRef.current) => {
    addHistoryEntry({
      kind: "output",
      text,
      cwd: cwdPath,
    });
  };

  useEffect(() => {
    let cancelled = false;

    const runIntro = async () => {
      const welcomeFile = getTerminalFile("/welcome.md");
      const welcomeText = welcomeFile?.body ?? "";

      if (hasBootstrappedIntro) {
        setHistory([
          {
            id: 1,
            kind: "command",
            text: INTRO_COMMAND,
            cwd: "/",
          },
          {
            id: 2,
            kind: "output",
            text: welcomeText,
            cwd: "/",
          },
        ]);
        nextIdRef.current = 2;
        setIntro(null);
        return;
      }

      hasBootstrappedIntro = true;

      if (reducedMotion) {
        if (cancelled) {
          return;
        }

        setHistory([
          {
            id: nextIdRef.current + 1,
            kind: "command",
            text: INTRO_COMMAND,
            cwd: "/",
          },
          {
            id: nextIdRef.current + 2,
            kind: "output",
            text: welcomeText,
            cwd: "/",
          },
        ]);
        nextIdRef.current += 2;
        return;
      }

      setIntro({ typedCommand: "", streamedOutput: "" });

      let typedCommand = "";

      for (const character of INTRO_COMMAND) {
        if (cancelled || !mountedRef.current) {
          return;
        }

        typedCommand += character;
        setIntro({ typedCommand, streamedOutput: "" });

        await new Promise((resolve) => {
          window.setTimeout(resolve, INTRO_COMMAND_SPEED);
        });
      }

      if (cancelled || !mountedRef.current) {
        return;
      }

      let streamedOutput = "";

      for (const character of welcomeText) {
        if (cancelled || !mountedRef.current) {
          return;
        }

        streamedOutput += character;
        setIntro({ typedCommand, streamedOutput });

        await new Promise((resolve) => {
          window.setTimeout(resolve, INTRO_OUTPUT_SPEED);
        });
      }

      if (cancelled || !mountedRef.current) {
        return;
      }

      setIntro(null);
      setHistory([
        {
          id: 1,
          kind: "command",
          text: INTRO_COMMAND,
          cwd: "/",
        },
        {
          id: 2,
          kind: "output",
          text: streamedOutput,
          cwd: "/",
        },
      ]);
      nextIdRef.current = 2;
    };

    void runIntro();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  const processNextCommand = async () => {
    if (processingRef.current) {
      return;
    }

    const nextCommand = queueRef.current.shift();

    if (!nextCommand) {
      return;
    }

    processingRef.current = true;
    setIsBusy(true);

    const result = executeTerminalCommand(cwdRef.current, nextCommand);
    addHistoryEntry({
      kind: "command",
      text: nextCommand,
      cwd: cwdRef.current,
    });

    if (result.kind === "clear") {
      setHistory([]);
      setCwd(result.nextPath ?? cwdRef.current);
      processingRef.current = false;
      setIsBusy(false);
      void processNextCommand();
      return;
    }

    if (result.nextPath && result.nextPath !== cwdRef.current) {
      setCwd(result.nextPath);
    }

    if (result.kind === "noop") {
      processingRef.current = false;
      setIsBusy(false);
      void processNextCommand();
      return;
    }

    if (result.kind === "open") {
      window.open(result.url, "_blank", "noopener,noreferrer");
      pushOutput(result.output);
      processingRef.current = false;
      setIsBusy(false);
      void processNextCommand();
      return;
    }

    if (result.kind === "agent") {
      setAgentMode(true);
      pushOutput(result.output);
      processingRef.current = false;
      setIsBusy(false);
      void processNextCommand();
      return;
    }

    if (result.kind === "text") {
      pushOutput(result.output);
      processingRef.current = false;
      setIsBusy(false);
      void processNextCommand();
      return;
    }

    const outputEntryId = addHistoryEntry({
      kind: "output",
      text: "",
      cwd: cwdRef.current,
    });

    await streamText(outputEntryId, result.output, COMMAND_SPEED);

    processingRef.current = false;
    setIsBusy(false);
    void processNextCommand();
  };

  const processAgentMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    addHistoryEntry({
      kind: "command",
      text: trimmedMessage,
      cwd: cwdRef.current,
    });

    if (trimmedMessage === "exit" || trimmedMessage === "quit") {
      setAgentMode(false);
      pushOutput("agent mode disabled. back to shell.");
      return;
    }

    if (trimmedMessage === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedMessage.length > AGENT_MESSAGE_CHAR_LIMIT) {
      pushOutput(
        `agent: message too long. max ${AGENT_MESSAGE_CHAR_LIMIT} characters.`,
      );
      return;
    }

    const userMessagesInConversation = agentHistory.filter(
      (entry) => entry.role === "user",
    ).length;

    if (userMessagesInConversation >= AGENT_CONVERSATION_LIMIT) {
      pushOutput(
        `agent: conversation cap reached (${AGENT_CONVERSATION_LIMIT} messages). type exit then agent to start fresh.`,
      );
      return;
    }

    const usage = getAgentUsage();

    if (usage.count >= AGENT_DAILY_LIMIT) {
      pushOutput(
        `agent: daily limit reached (${AGENT_DAILY_LIMIT} messages per 24h).`,
      );
      return;
    }

    const thinkingEntryId = addHistoryEntry({
      kind: "output",
      text: "agent is thinking...",
      cwd: cwdRef.current,
    });
    setIsBusy(true);

    try {
      const response = await sendTerminalAgentMessage(
        trimmedMessage,
        agentHistory,
      );
      setAgentUsage(usage.count + 1);
      setAgentHistory((currentHistory) => [
        ...currentHistory,
        { role: "user", content: trimmedMessage },
        { role: "assistant", content: response },
      ]);
      updateHistoryEntry(thinkingEntryId, "");
      await streamText(thinkingEntryId, response, 12);
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "unknown agent error";
      updateHistoryEntry(thinkingEntryId, `agent error: ${messageText}`);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBusy || intro || windowMode === "closed") {
      return;
    }

    const command = inputValue.trim();

    if (!command) {
      return;
    }

    commandHistoryRef.current = [...commandHistoryRef.current, command];
    commandHistoryIndexRef.current = commandHistoryRef.current.length;
    setInputValue("");

    if (agentMode) {
      void processAgentMessage(command);
    } else {
      queueRef.current = [...queueRef.current, command];
      void processNextCommand();
    }

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const completeInput = () => {
    const completions = getTerminalCompletions(cwdRef.current, inputValue);

    if (completions.length === 0) {
      return;
    }

    const trimmedInput = inputValue.trimStart();
    const leadingWhitespace = inputValue.slice(
      0,
      inputValue.length - trimmedInput.length,
    );
    const parts = trimmedInput.split(/\s+/);

    if (parts.length <= 1) {
      const commonPrefix = getCommonPrefix(completions);
      setInputValue(`${leadingWhitespace}${commonPrefix}`);
      return;
    }

    const command = parts[0];
    const prefix = getCommonPrefix(completions);
    setInputValue(`${leadingWhitespace}${command} ${prefix}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      completeInput();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (commandHistoryRef.current.length === 0) {
        return;
      }

      const nextIndex = Math.max(commandHistoryIndexRef.current - 1, 0);
      commandHistoryIndexRef.current = nextIndex;
      setInputValue(commandHistoryRef.current[nextIndex] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (commandHistoryRef.current.length === 0) {
        return;
      }

      const nextIndex = Math.min(
        commandHistoryIndexRef.current + 1,
        commandHistoryRef.current.length,
      );

      commandHistoryIndexRef.current = nextIndex;
      setInputValue(commandHistoryRef.current[nextIndex] ?? "");
    }
  };

  const focusInput = () => {
    if (windowMode === "closed") {
      return;
    }

    inputRef.current?.focus();
  };

  const isClosed = windowMode === "closed";
  const isMinimized = windowMode === "minimized";
  const isMaximized = windowMode === "maximized";

  return (
    <div
      className={cn(
        "terminal-rounded-scope terminal-rounded-shell relative overflow-hidden rounded-[1.5rem] border shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]",
        isMaximized ? "fixed inset-4 z-[90] md:inset-8" : "",
        className,
      )}
      style={{
        background: theme.surface,
        borderColor: theme.border,
      }}
      onClick={focusInput}
    >
      <div
        className={cn(
          "flex h-full flex-col",
          isMinimized ? "min-h-0" : "min-h-[420px]",
        )}
      >
        <div
          className="flex items-center justify-between gap-4 border-b px-4 py-3 md:px-5"
          style={{
            background: theme.header,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCloseWindow}
              title="Close"
              aria-label="Close terminal"
              className="terminal-traffic-light h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_1px_rgba(0,0,0,0.25)_inset] transition-transform duration-150 hover:scale-110"
            />
            <button
              type="button"
              onClick={handleMinimizeWindow}
              title={isMinimized ? "Restore" : "Minimize"}
              aria-label={
                isMinimized ? "Restore terminal" : "Minimize terminal"
              }
              className="terminal-traffic-light h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_0_1px_rgba(0,0,0,0.25)_inset] transition-transform duration-150 hover:scale-110"
            />
            <button
              type="button"
              onClick={handleZoomWindow}
              title={isMaximized ? "Exit zoom" : "Zoom"}
              aria-label={isMaximized ? "Exit terminal zoom" : "Zoom terminal"}
              className="terminal-traffic-light h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_0_1px_rgba(0,0,0,0.25)_inset] transition-transform duration-150 hover:scale-110"
            />
          </div>

          <div
            className="min-w-0 text-center text-[11px] md:text-xs font-detail tracking-[0.18em] uppercase truncate"
            style={{ color: theme.muted }}
          >
            toyeshh@about · {formatTerminalPromptPath(cwd)}
          </div>

          <div
            className="hidden md:block text-[10px] uppercase tracking-[0.24em]"
            style={{ color: theme.muted }}
          >
            {isClosed
              ? "closed"
              : isMinimized
                ? "minimized"
                : isMaximized
                  ? "terminal · zoomed"
                  : "terminal"}
          </div>
        </div>

        {!isMinimized ? (
          <>
            {!isClosed ? (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5 font-mono text-[13px] leading-6"
                  style={{ color: theme.foreground }}
                >
                  <div className="space-y-3">
                    {intro ? (
                      <div className="space-y-2">
                        <div className="flex gap-2 whitespace-pre-wrap break-words">
                          <span
                            className="shrink-0"
                            style={{ color: theme.prompt }}
                          >
                            {formatTerminalPromptPath("/")}%
                          </span>
                          <span>{intro.typedCommand}</span>
                          <span
                            className="animate-pulse"
                            style={{ color: theme.prompt }}
                          >
                            ▍
                          </span>
                        </div>
                        <pre
                          className="whitespace-pre-wrap break-words"
                          style={{ color: theme.muted }}
                        >
                          {intro.streamedOutput}
                          <span
                            className="inline-block w-2 animate-pulse"
                            style={{ color: theme.prompt }}
                          >
                            ▍
                          </span>
                        </pre>
                      </div>
                    ) : null}

                    {history.map((entry) => (
                      <div key={entry.id} className="space-y-2">
                        {entry.kind === "command" ? (
                          <div className="flex gap-2 whitespace-pre-wrap break-words">
                            <span
                              className="shrink-0"
                              style={{ color: theme.prompt }}
                            >
                              {agentMode
                                ? "agent"
                                : formatTerminalPromptPath(entry.cwd)}
                              %
                            </span>
                            <span>{entry.text}</span>
                          </div>
                        ) : (
                          <pre
                            className={cn(
                              "whitespace-pre-wrap break-words",
                              entry.kind === "error" ? "text-[#ff8a7a]" : "",
                            )}
                            style={
                              entry.kind === "error"
                                ? undefined
                                : { color: theme.muted }
                            }
                          >
                            {entry.text}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="border-t px-4 py-4 md:px-5"
                  style={{
                    borderColor: theme.border,
                    background: theme.input,
                  }}
                >
                  <label
                    className="flex items-center gap-2 font-mono text-[13px] leading-6"
                    style={{ color: theme.foreground }}
                  >
                    <span className="shrink-0" style={{ color: theme.prompt }}>
                      {agentMode
                        ? "agent%"
                        : `${formatTerminalPromptPath(cwd)}%`}
                    </span>
                    <input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      spellCheck={false}
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isBusy || Boolean(intro)}
                      className="min-w-0 flex-1 bg-transparent outline-none"
                      style={{
                        color: theme.foreground,
                        caretColor: theme.prompt,
                      }}
                      placeholder={
                        isBusy
                          ? "processing..."
                          : intro
                            ? "booting terminal..."
                            : agentMode
                              ? "ask the agent anything"
                              : "type a command"
                      }
                    />
                  </label>
                </form>
              </>
            ) : (
              <div
                className="flex flex-1 items-center justify-center px-6 py-10"
                style={{ color: theme.muted }}
              >
                <div className="text-center">
                  <p className="font-mono text-sm">window closed</p>
                  <button
                    type="button"
                    onClick={handleReopenWindow}
                    className="terminal-rounded-md mt-4 rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-white/10"
                    style={{
                      borderColor: theme.border,
                      color: theme.foreground,
                    }}
                  >
                    reopen terminal
                  </button>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TerminalWindow;
