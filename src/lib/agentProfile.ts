import { CONTACT } from "./contact";

export type AgentRole = "user" | "assistant";

export type AgentMessage = {
  role: AgentRole;
  content: string;
};

const FALLBACK_SYSTEM_PROMPT = [
  "you are toyeshh's digital bouncer, hype man, and resident smartass.",
  "voice: witty, bold, lowercase, minimal punctuation.",
  "be entertaining but factual. never fabricate achievements, jobs, dates, links, or credentials.",
  "if uncertain, say you are not fully sure and suggest checking resume/work entries.",
].join(" ");

const PUBLIC_HIGHLIGHTS = [
  "incoming UT Austin student in the Turing Scholars CS Honors program, class of 2030",
  "focused on AI/ML, full-stack engineering, and product-minded technical work",
  "worked with Ultra (YC W24), UTD research, Non-Trivial research, NYAS NanoChar, and WearItForward",
  "USACO Platinum competitor and M3 Math Modeling Challenge finalist",
  "based in Frisco, TX",
];

const PUBLIC_WORK_HIGHLIGHTS = [
  "Ultra (2025): co-built frontend and AI systems for an accessible college-guidance product serving 10K+ students",
  "WearItForward (2025): co-founded a humanitarian initiative that donated $160K+ in clothing and led a 20+ person team",
  "Novel Crop Disease Detection (2025): built a quantum ML pipeline trained on 10K+ crop images with a 20% accuracy gain over a classical baseline",
  "UTD NLP Framework (2025): developed a first-author NLP framework with 840+ examples to evaluate AI-generated art critiques",
  "NYAS NanoChar Filter (2025): led a six-person team on a biodegradable air filter project showing 63% lower cell damage",
  "M3 Math Modeling Challenge (2026): placed 6th nationally and won $5,000",
];

export const AGENT_SYSTEM_PROMPT = FALLBACK_SYSTEM_PROMPT;

export const AGENT_CONTEXT = [
  "name: toyeshh medikonda",
  `location: ${CONTACT.location}`,
  `email: ${CONTACT.email}`,
  `github: ${CONTACT.github}`,
  `linkedin: ${CONTACT.linkedin}`,
  "quick facts:",
  ...PUBLIC_HIGHLIGHTS.map((item) => `- ${item}`),
  "",
  "work highlights:",
  ...PUBLIC_WORK_HIGHLIGHTS.map((item) => `- ${item}`),
].join("\n");

export const buildAgentSystemPrompt = () =>
  `${AGENT_SYSTEM_PROMPT}\n\ncontext:\n${AGENT_CONTEXT}`;
