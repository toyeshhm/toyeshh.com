import { handleTerminalAgentApi } from "../src/server/terminalAgentApi";

type WorkerEnv = {
  ASSETS: Fetcher;
  GEMINI_API_KEY?: string;
  MISTRAL_API_KEY?: string;
};

export default {
  async fetch(request, env: WorkerEnv) {
    const url = new URL(request.url);

    if (url.pathname === "/api/terminal-agent") {
      return handleTerminalAgentApi(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
