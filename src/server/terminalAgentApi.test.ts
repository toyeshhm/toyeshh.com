import { afterEach, describe, expect, it, vi } from "vitest";
import { createTerminalAgentResponse, handleTerminalAgentApi } from "./terminalAgentApi";

describe("terminal agent api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects empty messages", async () => {
    const request = new Request("http://localhost/api/terminal-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "   ", history: [] }),
    });

    const response = await handleTerminalAgentApi(request, {});
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Message is required.");
  });

  it("falls back to mistral when gemini fails", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response("bad gateway", { status: 502 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            choices: [{ message: { content: "fallback worked" } }],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

    const content = await createTerminalAgentResponse(
      { message: "hey", history: [] },
      {
        GEMINI_API_KEY: "gemini-key",
        MISTRAL_API_KEY: "mistral-key",
      },
    );

    expect(content).toBe("fallback worked");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
