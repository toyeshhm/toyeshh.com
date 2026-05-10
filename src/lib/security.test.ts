import { describe, expect, it } from "vitest";
import {
  sanitizeBookingReturnTo,
  sanitizeUrl,
} from "./security";

describe("security helpers", () => {
  it("rejects dangerous urls and keeps safe ones", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeUrl("//evil.example")).toBeNull();
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
    expect(sanitizeUrl("/assets/logo.png")).toBe("/assets/logo.png");
    expect(
      sanitizeUrl("mailto:toyeshhm@gmail.com", {
        allowedProtocols: ["mailto:"],
        allowRelative: false,
      }),
    ).toBe("mailto:toyeshhm@gmail.com");
  });

  it("normalizes booking return targets to in-app routes", () => {
    expect(sanitizeBookingReturnTo("/book?duration=30")).toBe(
      "/book?duration=30",
    );
    expect(sanitizeBookingReturnTo("https://evil.example")).toBe("/book");
    expect(sanitizeBookingReturnTo("/admin")).toBe("/book");
  });
});