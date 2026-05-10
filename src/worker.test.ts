import { describe, expect, it } from "vitest";
import worker from "../worker/index";

const decodeState = (state: string) => {
  const [body] = state.split(".");
  const padded = body
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(body.length / 4) * 4, "=");
  const json = atob(padded);
  return JSON.parse(json) as { returnTo: string };
};

describe("worker security", () => {
  it("normalizes auth return targets before signing state", async () => {
    const response = await worker.fetch(
      new Request(
        "https://toyeshh.com/api/auth/google/start?returnTo=https://evil.example",
      ),
      {
        ASSETS: {
          fetch: async () => new Response("ok"),
        },
        GOOGLE_CLIENT_ID: "client-id",
        BOOKING_SESSION_SECRET: "session-secret",
      },
    );

    expect(response.status).toBe(302);
    expect(response.headers.get("Content-Security-Policy")).toContain(
      "frame-ancestors 'none'",
    );
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");

    const location = response.headers.get("Location");
    expect(location).toContain("accounts.google.com");

    const state = new URL(location as string).searchParams.get("state");
    expect(state).toBeTruthy();
    expect(decodeState(state as string).returnTo).toBe("/book");
  });

  it("adds security headers to static responses", async () => {
    const response = await worker.fetch(new Request("https://toyeshh.com/"), {
      ASSETS: {
        fetch: async () =>
          new Response("<!doctype html><html><body>site</body></html>", {
            headers: { "Content-Type": "text/html" },
          }),
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Security-Policy")).toContain(
      "default-src 'self'",
    );
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });
});