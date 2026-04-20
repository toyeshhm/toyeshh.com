import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { Buffer } from "node:buffer";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { handleTerminalAgentApi } from "./src/server/terminalAgentApi";

const normalizeHeaders = (headers: IncomingMessage["headers"]) =>
  Object.entries(headers).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === "string") {
      acc[key] = value;
    } else if (Array.isArray(value)) {
      acc[key] = value.join(", ");
    }

    return acc;
  }, {});

const readRequestBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });

const sendFetchResponse = async (response: Response, res: ServerResponse) => {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = Buffer.from(await response.arrayBuffer());
  res.end(body);
};

const terminalAgentDevPlugin = (env: Record<string, string>): Plugin => ({
  name: "terminal-agent-dev-proxy",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (
        req.url !== "/api/terminal-agent" ||
        req.method !== "POST"
      ) {
        next();
        return;
      }

      const body = await readRequestBody(req);
      const request = new Request("http://localhost/api/terminal-agent", {
        method: "POST",
        headers: normalizeHeaders(req.headers),
        body,
      });

      const response = await handleTerminalAgentApi(request, {
        GEMINI_API_KEY: env.GEMINI_API_KEY,
        MISTRAL_API_KEY: env.MISTRAL_API_KEY,
      });

      await sendFetchResponse(response, res);
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), terminalAgentDevPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
