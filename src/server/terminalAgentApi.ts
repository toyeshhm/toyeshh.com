import {
  AgentMessage,
  buildAgentSystemPrompt,
} from "../lib/agentProfile";

const GEMINI_MODEL = "gemini-2.5-flash";
const MISTRAL_MODEL = "mistral-small-latest";
const JSON_HEADERS = { "Content-Type": "application/json" };

export type TerminalAgentEnv = {
  GEMINI_API_KEY?: string;
  MISTRAL_API_KEY?: string;
};

type TerminalAgentBody = {
  message: string;
  history: AgentMessage[];
};

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init?.headers ?? {}),
    },
  });

const parseBody = async (request: Request): Promise<TerminalAgentBody> => {
  const body = (await request.json()) as Partial<TerminalAgentBody>;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body.history)
    ? body.history.filter(
        (entry): entry is AgentMessage =>
          Boolean(entry) &&
          typeof entry === "object" &&
          (entry.role === "user" || entry.role === "assistant") &&
          typeof entry.content === "string",
      )
    : [];

  if (!message) {
    throw new Error("Message is required.");
  }

  return {
    message: message.slice(0, 1000),
    history: history.slice(-30).map((entry) => ({
      role: entry.role,
      content: entry.content.slice(0, 4000),
    })),
  };
};

const extractGeminiText = (data: unknown) => {
  if (!data || typeof data !== "object") {
    return "";
  }

  const candidates = (data as { candidates?: unknown }).candidates;

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return "";
  }

  const firstCandidate = candidates[0];

  if (!firstCandidate || typeof firstCandidate !== "object") {
    return "";
  }

  const content = (firstCandidate as { content?: unknown }).content;

  if (!content || typeof content !== "object") {
    return "";
  }

  const parts = (content as { parts?: unknown }).parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => {
      if (!part || typeof part !== "object") {
        return "";
      }

      const text = (part as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("")
    .trim();
};

const sendGeminiMessage = async (
  message: string,
  history: AgentMessage[],
  apiKey: string,
) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: buildAgentSystemPrompt() }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 450,
        },
        contents: [
          ...history.map((entry) => ({
            role: entry.role === "assistant" ? "model" : "user",
            parts: [{ text: entry.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const content = extractGeminiText(data);

  if (!content) {
    throw new Error("Gemini returned an empty response.");
  }

  return content;
};

const sendMistralMessage = async (
  message: string,
  history: AgentMessage[],
  apiKey: string,
) => {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MISTRAL_MODEL,
      temperature: 0.7,
      max_tokens: 450,
      messages: [
        {
          role: "system",
          content: buildAgentSystemPrompt(),
        },
        ...history.map((entry) => ({
          role: entry.role,
          content: entry.content,
        })),
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Mistral request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content || typeof content !== "string") {
    throw new Error("Mistral returned an empty response.");
  }

  return content.trim();
};

export const createTerminalAgentResponse = async (
  body: TerminalAgentBody,
  env: TerminalAgentEnv,
) => {
  const geminiKey = env.GEMINI_API_KEY?.trim();
  const mistralKey = env.MISTRAL_API_KEY?.trim();

  if (!geminiKey && !mistralKey) {
    throw new Error(
      "Missing chatbot API key. Configure GEMINI_API_KEY or MISTRAL_API_KEY on the server.",
    );
  }

  if (geminiKey) {
    try {
      return await sendGeminiMessage(body.message, body.history, geminiKey);
    } catch (geminiError) {
      if (!mistralKey) {
        throw geminiError;
      }
    }
  }

  if (!mistralKey) {
    throw new Error("Gemini failed and no Mistral fallback key is configured.");
  }

  return sendMistralMessage(body.message, body.history, mistralKey);
};

export const handleTerminalAgentApi = async (
  request: Request,
  env: TerminalAgentEnv,
) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, { status: 405 });
  }

  try {
    const body = await parseBody(request);
    const content = await createTerminalAgentResponse(body, env);
    return jsonResponse({ content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown terminal agent error.";
    const status =
      message === "Message is required." ? 400 : 500;

    return jsonResponse({ error: message }, { status });
  }
};
