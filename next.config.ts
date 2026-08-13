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
  // NOTE: the `blob:` token below is the blob: URI *scheme* — it has nothing to
  // do with Vercel Blob. Admin uploads are served from the Vercel Blob CDN on
  // *.public.blob.vercel-storage.com, so that host must be allowed explicitly
  // or every uploaded image is blocked by CSP and renders as a broken icon.
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
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
  images: {
    // Serve images as-is (no optimizer) so that PNG, WebP, AVIF, and other
    // formats uploaded via the admin panel display correctly everywhere,
    // including inside next/image <Image> components on the sectors, services,
    // and expertise pages.
    unoptimized: true,
    // Admin uploads live on the Vercel Blob CDN. Declared so that any
    // next/image <Image> pointed at an uploaded URL keeps working if the
    // optimizer is ever switched back on.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
