const SANITIZE_BASE = "https://security.local";

const HAS_SCHEME_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

type SafeUrlOptions = {
  allowedProtocols?: string[];
  allowRelative?: boolean;
};

const isSafeColorValue = (value: string) =>
  /^[#a-zA-Z0-9(),.%\s+-]+$/.test(value) &&
  !/url\s*\(|expression\s*\(|@import|['"]/i.test(value) &&
  !/[{};]/.test(value);

export const sanitizeCssValue = (value: string | undefined | null) => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || !isSafeColorValue(trimmed)) {
    return null;
  }

  return trimmed;
};

export const sanitizeCssIdentifier = (value: string | undefined | null) => {
  if (typeof value !== "string") {
    return null;
  }

  const sanitized = value.trim().replace(/[^a-zA-Z0-9_-]/g, "-");

  return sanitized || null;
};

export const sanitizeUrl = (
  value: string | undefined | null,
  options: SafeUrlOptions = {},
) => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("//")) {
    return null;
  }

  const allowRelative = options.allowRelative ?? true;
  const allowedProtocols = options.allowedProtocols ?? ["http:", "https:"];

  try {
    const parsed = new URL(trimmed, SANITIZE_BASE);
    const isRelative = !HAS_SCHEME_RE.test(trimmed);

    if (isRelative) {
      return allowRelative && parsed.origin === new URL(SANITIZE_BASE).origin
        ? trimmed
        : null;
    }

    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }

    return trimmed;
  } catch {
    return null;
  }
};

export const sanitizeInternalPath = (value: string | undefined | null) => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed, SANITIZE_BASE);

    if (parsed.origin !== new URL(SANITIZE_BASE).origin) {
      return null;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
  } catch {
    return null;
  }
};

export const sanitizeBookingReturnTo = (value: string | undefined | null) => {
  const normalized = sanitizeInternalPath(value);

  if (
    normalized === "/book" ||
    normalized === "/book?duration=15" ||
    normalized === "/book?duration=30"
  ) {
    return normalized;
  }

  return "/book";
};