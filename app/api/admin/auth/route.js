export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "@/lib/admin/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("infra_admin_session")?.value;
  return NextResponse.json({ loggedIn: verifySessionToken(token) });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const username = String(body.username || "");
    const password = String(body.password || "");

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin12345";

    if (username !== expectedUsername || password !== expectedPassword) {
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
