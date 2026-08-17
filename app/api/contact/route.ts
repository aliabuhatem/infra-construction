/* ────────────────────────────────────────────────────────────────────────
   Contact form delivery.

   The form used to be a `mailto:` link, which only works when the visitor's
   device has a mail client configured — everyone on webmail or a phone
   without one silently dropped their message. This route sends it server-side
   through Resend (provisioned via the Vercel Marketplace) so it lands in the
   INFRA inbox regardless of what the visitor has installed.

   Nothing is persisted: the message is relayed and forgotten.
──────────────────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getContent } from "../../../lib/getContent";

/** Who receives the mail. Read from the same `footer.email` field the footer
    and the contact page's own links use, so changing the address in the admin
    panel moves the delivery too and the page can never advertise one address
    while mail goes to another. */
const FALLBACK_TO = "info@ic-gp.com";

/** The envelope sender. Must be an address on a domain verified in Resend —
    it is *not* the visitor's address (sending as them would fail SPF/DKIM and
    land in spam). The visitor's address goes in `reply_to`, so hitting Reply
    in the inbox answers them directly. */
const FROM = process.env.CONTACT_FROM_EMAIL || "INFRA Construction <website@ic-gp.com>";

const MAX = { name: 100, email: 200, company: 200, subject: 200, message: 5000 };

/* Per-IP throttle. In-memory, so it resets on a cold start and isn't shared
   across instances — this is a speed bump against a script hammering the form,
   not a security control. Anything stronger belongs in the WAF. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) for (const [k, v] of hits) if (v[v.length - 1] < now - WINDOW_MS) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/* Deliberately loose: the point is to catch a typo or an empty box, not to
   adjudicate RFC 5322. A wrong-but-plausible address is the sender's problem,
   and rejecting a valid unusual one would lose a real enquiry. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string
  );

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  /* Honeypot: a field hidden from people but filled in by naive bots. Answered
     with the same 200 a real send gets, so a bot learns nothing from the
     response and doesn't retry. */
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const firstName = clean(body.firstName, MAX.name);
  const lastName  = clean(body.lastName, MAX.name);
  const email     = clean(body.email, MAX.email);
  const company   = clean(body.company, MAX.company);
  const subject   = clean(body.subject, MAX.subject) || "Website enquiry";
  const message   = clean(body.message, MAX.message);

  if (!firstName || !message || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  /* No key configured — tell the client so it can fall back to the mail-client
     handoff rather than swallowing the message. 503, not 500: the request was
     fine, the service just isn't wired up on this deployment. */
  if (!apiKey) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const store = await getContent();
  const to = store.content?.footer?.email?.trim() || FALLBACK_TO;

  const name = [firstName, lastName].filter(Boolean).join(" ");
  const lines = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Subject", subject],
  ].filter(([, v]) => v);

  const text =
    lines.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}`;
  const html =
    `<table style="font:14px/1.6 system-ui,sans-serif;color:#213B4D">` +
    lines
      .map(
        ([k, v]) =>
          `<tr><td style="padding:2px 12px 2px 0;color:#5E5E5E">${k}</td><td>${escapeHtml(v)}</td></tr>`
      )
      .join("") +
    `</table><p style="font:14px/1.6 system-ui,sans-serif;color:#213B4D;white-space:pre-wrap;border-top:1px solid #213B4D22;padding-top:12px;margin-top:12px">${escapeHtml(message)}</p>`;

  /* Resend's REST API directly rather than the `resend` package — one fetch,
     no dependency to keep in step with the rest of the tree. */
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email,
      subject: `[Website] ${subject} — ${name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    // Body carries Resend's reason (unverified domain, bad key). Logged for
    // the Vercel runtime logs; the client only ever sees a generic failure.
    console.error("[contact] Resend rejected the send:", res.status, await res.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
