import { AgentMessage } from "@/lib/agentProfile";

export const sendTerminalAgentMessage = async (
  message: string,
  history: AgentMessage[],
) => {
  const response = await fetch("/api/terminal-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  const data = (await response.json()) as { content?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error || "Agent request failed.");
  }

  if (!data.content) {
    throw new Error("Agent returned an empty response.");
  }

  return data.content.trim();
};
