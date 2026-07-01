import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "infra_admin_session";
const INSECURE_DEFAULT_SECRET = "change-this-admin-secret";

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
}

// Admin is only usable when a real signing secret is configured via env vars.
// Otherwise the HMAC secret would be empty or a value that is public in the
// repo, letting anyone forge a valid session cookie. Fail closed instead.
export function isAdminConfigured() {
  const secret = getSecret();
  return Boolean(secret) && secret !== INSECURE_DEFAULT_SECRET;
}

function sign(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(username) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  try {
    // Fail closed when no real secret is configured — never validate a token
    // signed with the empty/known-default secret.
    if (!isAdminConfigured()) return false;
    if (!token || !token.includes(".")) return false;
    const [payload, signature] = token.split(".");
    const expected = sign(payload);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number(decoded.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
