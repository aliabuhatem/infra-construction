import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the coming-soon page and Next.js internals through
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
  return NextResponse.next();
  //return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
