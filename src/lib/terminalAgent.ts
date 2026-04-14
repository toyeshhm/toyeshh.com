import { CONTACT } from "@/lib/contact";
import { projects } from "@/lib/projects";

type AgentRole = "user" | "assistant";

export type AgentMessage = {
  role: AgentRole;
  content: string;
};

const agentMarkdownFiles = import.meta.glob("../../content/agent/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const blogMarkdownFiles = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const getBaseName = (filePath: string) => {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const fileName = normalizedPath.split("/").pop() ?? filePath;
  return fileName.replace(/\.[^.]+$/, "");
};

const getAgentFileContent = (name: string) => {
  const match = Object.entries(agentMarkdownFiles).find(
    ([filePath]) => getBaseName(filePath) === name,
  );

  return match?.[1]?.trim() ?? "";
};

const getBlogSummaries = () => {
  const summaries = Object.entries(blogMarkdownFiles)
    .map(([filePath, rawContent]) => {
      const title = getBaseName(filePath).replace(/-/g, " ");
      const firstParagraph = rawContent
        .replace(/\r\n/g, "\n")
        .split("\n\n")
        .map((block) => block.trim())
        .find(
          (block) =>
            block.length > 0 &&
            !block.startsWith("---") &&
            !block.startsWith("import "),
        );

      if (!firstParagraph) {
        return null;
      }

      return `- ${title}: ${firstParagraph.slice(0, 240)}`;
    })
    .filter(Boolean);

  return summaries.join("\n");
};

const FALLBACK_SYSTEM_PROMPT = [
  "you are toyeshh's digital bouncer, hype man, and resident smartass.",
  "voice: witty, bold, lowercase, minimal punctuation.",
  "be entertaining but factual. never fabricate achievements, jobs, dates, links, or credentials.",
  "if uncertain, say you are not fully sure and suggest checking resume/work entries.",
].join(" ");

const SYSTEM_PROMPT =
  getAgentFileContent("system-prompt") || FALLBACK_SYSTEM_PROMPT;

const CONTEXT = [
  `name: toyeshh medikonda`,
  `location: ${CONTACT.location}`,
  `email: ${CONTACT.email}`,
  `github: ${CONTACT.github}`,
  `linkedin: ${CONTACT.linkedin}`,
  "work highlights:",
  ...projects.map(
    (project) => `- ${project.title} (${project.year}): ${project.desc}`,
  ),
  "",
  "agent profile files:",
  getAgentFileContent("identity"),
  getAgentFileContent("linkedin"),
  getAgentFileContent("resume"),
  getAgentFileContent("yc-addon"),
  "",
  "blog summaries:",
  getBlogSummaries() || "- no blog posts loaded yet",
].join("\n");

export const sendTerminalAgentMessage = async (
  message: string,
  history: AgentMessage[],
) => {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_MISTRAL_API_KEY in environment.");
  }

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      temperature: 0.7,
      max_tokens: 450,
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\ncontext:\n${CONTEXT}`,
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
    throw new Error(`Agent request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content || typeof content !== "string") {
    throw new Error("Agent returned an empty response.");
  }

  return content.trim();
};
