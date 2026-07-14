import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow these paths through
  if (
    pathname === "/coming-soon" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/admin-uploads") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png"
  ) {
    return NextResponse.next();
  }

  // If coming soon mode is not enabled, show the real site to everyone
  // (trim/lowercase so a stray space or capitalization in the env var still works)
  const comingSoon = (process.env.COMING_SOON ?? "").trim().toLowerCase() === "true";
  if (!comingSoon) {
    return NextResponse.next();
  }

  // If the user has an admin session cookie, show them the real site
  const adminCookie = request.cookies.get("infra_admin_session");
  if (adminCookie?.value) {
    return NextResponse.next();
  }

  // Otherwise redirect public visitors to coming soon
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
