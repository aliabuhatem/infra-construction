export const runtime = "nodejs";

import crypto from "crypto";
import { NextResponse } from "next/server";
import { createSessionToken, verifySessionToken, isAdminConfigured } from "@/lib/admin/auth";

// Constant-time string comparison to avoid leaking credential length/prefix
// through response timing.
function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export async function GET(request) {
  const token = request.cookies.get("infra_admin_session")?.value;
  return NextResponse.json({ loggedIn: verifySessionToken(token) });
}

export async function POST(request) {
  try {
    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "";

    // Fail closed until real credentials are configured via environment
    // variables. Never accept the in-repo default password, and never run with
    // the default/empty signing secret (that would allow session forgery).
    if (!isAdminConfigured() || !expectedPassword || expectedPassword === "admin12345") {
      return NextResponse.json(
        { error: "Admin login is not configured on the server." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const username = String(body.username || "");
    const password = String(body.password || "");

    const okUser = safeEqual(username, expectedUsername);
    const okPass = safeEqual(password, expectedPassword);
    if (!okUser || !okPass) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ ok: true });
    response.cookies.set("infra_admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
