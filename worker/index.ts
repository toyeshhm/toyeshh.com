import { handleTerminalAgentApi } from "../src/server/terminalAgentApi";
import {
  type BookingDuration,
  parseBookingDuration,
} from "../src/lib/booking";

const BOOKING_REDIRECTS: Record<BookingDuration, string> = {
  "15": "https://cal.com/toyeshh-medikonda-imd7i7/15min?overlayCalendar=true",
  "30": "https://cal.com/toyeshh-medikonda-imd7i7/30min?overlayCalendar=true",
};

const BOOKING_SESSION_COOKIE = "booking_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const OAUTH_SCOPE = "openid email profile";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

type SignedState = {
  returnTo: string;
  nonce: string;
  issuedAt: number;
};

type WorkerEnv = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  GEMINI_API_KEY?: string;
  MISTRAL_API_KEY?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  BOOKING_SESSION_SECRET?: string;
  SITE_URL?: string;
};

const textEncoder = new TextEncoder();

const base64UrlEncode = (input: ArrayBuffer | Uint8Array | string) => {
  const bytes =
    typeof input === "string"
      ? textEncoder.encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input);

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const base64UrlDecode = (value: string) => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = padded.padEnd(Math.ceil(padded.length / 4) * 4, "=");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const getAppOrigin = (request: Request, env: WorkerEnv) => {
  const siteUrl = env.SITE_URL?.trim();
  return siteUrl ? new URL(siteUrl).origin : new URL(request.url).origin;
};

const getBookingUrl = (duration: BookingDuration) => BOOKING_REDIRECTS[duration];

const createRedirectResponse = (location: string, cookie?: string) => {
  const headers = new Headers({ Location: location });
  if (cookie) {
    headers.append("Set-Cookie", cookie);
  }
  return new Response(null, { status: 302, headers });
};

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const signPayload = async (payload: string, secret: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(payload),
  );
  return base64UrlEncode(signature);
};

const createSignedToken = async <T extends Record<string, unknown>>(
  payload: T,
  secret: string,
) => {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await signPayload(body, secret);
  return `${body}.${signature}`;
};

const verifySignedToken = async <T extends Record<string, unknown>>(
  token: string | undefined,
  secret: string,
) => {
  if (!token) {
    return null;
  }

  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expectedSignature = await signPayload(body, secret);
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const json = new TextDecoder().decode(base64UrlDecode(body));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

const getCookieValue = (cookieHeader: string | null, name: string) => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const cookie = cookies.find((entry) => entry.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
};

const buildCookie = (
  name: string,
  value: string,
  maxAgeSeconds: number,
  secure: boolean,
) =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly;${secure ? " Secure;" : ""} SameSite=Lax; Max-Age=${maxAgeSeconds}`;

const buildRedirectUrl = (origin: string, returnTo: string) => {
  const normalizedReturnTo = returnTo.startsWith("/") ? returnTo : "/book";
  return new URL(normalizedReturnTo, origin).toString();
};

const readSession = async (request: Request, env: WorkerEnv) => {
  const secret = env.BOOKING_SESSION_SECRET?.trim();
  if (!secret) {
    return null;
  }

  const sessionToken = getCookieValue(
    request.headers.get("Cookie"),
    BOOKING_SESSION_COOKIE,
  );

  const session = await verifySignedToken<{
    email: string;
    name?: string;
    issuedAt: number;
  }>(sessionToken ?? undefined, secret);

  if (!session) {
    return null;
  }

  if (Date.now() - session.issuedAt > SESSION_MAX_AGE_SECONDS * 1000) {
    return null;
  }

  return { authenticated: true, email: session.email, name: session.name };
};

const createState = async (origin: string, returnTo: string, secret: string) =>
  createSignedToken(
    {
      returnTo: buildRedirectUrl(origin, returnTo),
      nonce: crypto.randomUUID(),
      issuedAt: Date.now(),
    } satisfies SignedState,
    secret,
  );

const readState = async (state: string, secret: string) => {
  const payload = await verifySignedToken<SignedState>(state, secret);
  if (!payload) {
    return null;
  }

  if (Date.now() - payload.issuedAt > 10 * 60 * 1000) {
    return null;
  }

  return payload;
};

const handleGoogleLoginStart = async (
  request: Request,
  env: WorkerEnv,
  url: URL,
) => {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  const sessionSecret = env.BOOKING_SESSION_SECRET?.trim();

  if (!clientId || !sessionSecret) {
    return jsonResponse(
      {
        error:
          "Google booking auth is not configured. Set GOOGLE_CLIENT_ID and BOOKING_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const origin = getAppOrigin(request, env);
  const returnTo = url.searchParams.get("returnTo") ?? "/book";
  const state = await createState(origin, returnTo, sessionSecret);
  const redirectUri = `${origin}/api/auth/google/callback`;
  const authUrl = new URL(GOOGLE_AUTH_URL);

  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", OAUTH_SCOPE);
  authUrl.searchParams.set("prompt", "select_account");
  authUrl.searchParams.set("access_type", "online");
  authUrl.searchParams.set("state", state);

  return createRedirectResponse(authUrl.toString());
};

const handleGoogleLoginCallback = async (
  request: Request,
  env: WorkerEnv,
  url: URL,
) => {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = env.GOOGLE_CLIENT_SECRET?.trim();
  const sessionSecret = env.BOOKING_SESSION_SECRET?.trim();

  if (!clientId || !clientSecret || !sessionSecret) {
    return jsonResponse(
      {
        error:
          "Google booking auth is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and BOOKING_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return jsonResponse(
      { error: "Missing OAuth callback parameters." },
      { status: 400 },
    );
  }

  const statePayload = await readState(state, sessionSecret);
  if (!statePayload) {
    return jsonResponse(
      { error: "Invalid or expired OAuth state." },
      { status: 400 },
    );
  }

  const origin = getAppOrigin(request, env);
  const redirectUri = `${origin}/api/auth/google/callback`;
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    return jsonResponse(
      { error: "Unable to complete Google sign-in." },
      { status: 502 },
    );
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    return jsonResponse(
      { error: "Google did not return an access token." },
      { status: 502 },
    );
  }

  const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userInfoResponse.ok) {
    return jsonResponse(
      { error: "Unable to load Google profile." },
      { status: 502 },
    );
  }

  const userInfo = (await userInfoResponse.json()) as {
    email?: string;
    name?: string;
    email_verified?: boolean;
  };

  if (!userInfo.email || userInfo.email_verified === false) {
    return jsonResponse(
      { error: "Google account email is missing or unverified." },
      { status: 400 },
    );
  }

  const session = await createSignedToken(
    {
      email: userInfo.email,
      name: userInfo.name,
      issuedAt: Date.now(),
    },
    sessionSecret,
  );

  return createRedirectResponse(
    statePayload.returnTo,
    buildCookie(
      BOOKING_SESSION_COOKIE,
      session,
      SESSION_MAX_AGE_SECONDS,
      origin.startsWith("https://"),
    ),
  );
};

const handleBookingSession = async (request: Request, env: WorkerEnv) => {
  const session = await readSession(request, env);
  return jsonResponse(session ?? { authenticated: false });
};

const handleBookingRedirect = async (
  request: Request,
  env: WorkerEnv,
  url: URL,
) => {
  const session = await readSession(request, env);
  const duration = parseBookingDuration(url.searchParams.get("duration"));

  if (!session?.authenticated) {
    return jsonResponse({ error: "Authentication required." }, { status: 401 });
  }

  return createRedirectResponse(getBookingUrl(duration));
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    const url = new URL(request.url);

    if (url.pathname === "/api/terminal-agent") {
      return handleTerminalAgentApi(request, env);
    }

    if (url.pathname === "/api/auth/google/start") {
      return handleGoogleLoginStart(request, env, url);
    }

    if (url.pathname === "/api/auth/google/callback") {
      return handleGoogleLoginCallback(request, env, url);
    }

    if (url.pathname === "/api/auth/session") {
      return handleBookingSession(request, env);
    }

    if (url.pathname === "/api/bookings/redirect") {
      return handleBookingRedirect(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
};
