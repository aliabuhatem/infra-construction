import type { NextConfig } from "next";

// Baseline security headers applied to every response.
// CSP allows 'unsafe-inline' for scripts/styles because Next.js injects inline
// hydration scripts and inline styles; it still blocks framing, plugins, and
// restricts sources to same-origin (+ data/blob images and self-hosted fonts).
//
// In development, Next.js/React (Turbopack RSC client, Fast Refresh, callstack
// reconstruction) requires eval(), so 'unsafe-eval' is added for dev only.
// Production never uses eval() and stays strict.
const isDev = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev-tools logo/indicator in development.
  devIndicators: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
