import fs from "fs/promises";
import path from "path";
import { defaultContentStore } from "./default-content";

/**
 * Storage strategy (tried in order on write, read falls back in same order):
 *  1. GitHub  — if GITHUB_TOKEN + GITHUB_REPO env vars are set
 *  2. data/site-content.json — primary persistent storage (works on VPS / Railway / local)
 *  3. /tmp    — fallback for read-only filesystems (Vercel, etc.)
 *  4. defaults — last resort, never persisted
 */

const DATA_DIR      = path.join(process.cwd(), "data");
const DATA_FILE     = path.join(DATA_DIR, "site-content.json");
const TMP_DATA_FILE = "/tmp/infra-site-content.json";
const UPLOAD_DIR    = path.join(process.cwd(), "public", "admin-uploads");
const MEDIA_DIR     = path.join(process.cwd(), "public", "media");
const IMAGE_EXT     = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".bmp", ".tiff"]);

// ── in-memory cache (survives within the same Node.js process) ───────────────
let memoryCache = null;

// ── github config ─────────────────────────────────────────────────────────────
function githubConfig() {
  return {
    token:       process.env.GITHUB_TOKEN,
    repo:        process.env.GITHUB_REPO,
    branch:      process.env.GITHUB_BRANCH || "main",
    contentPath: process.env.GITHUB_CONTENT_PATH || "data/site-content.json",
  };
}
function hasGithubConfig() {
  const c = githubConfig();
  return Boolean(c.token && c.repo);
}

// ── helpers ───────────────────────────────────────────────────────────────────
function cleanFileName(name) {
  return String(name || "image.png")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function titleize(filename) {
  return filename
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categorize(filename) {
  const n = filename.toLowerCase();
  if (n.includes("hero"))                                                        return "hero";
  if (n.startsWith("water") || n.includes("dam"))                               return "water";
  if (n.includes("airport"))                                                     return "airports";
  if (n.includes("port") || n.includes("marine"))                               return "ports-marine";
  if (n.includes("energy") || n.includes("power"))                              return "energy";
  if (n.includes("housing") || n.includes("ministry") || n.startsWith("buildings")) return "buildings";
  if (n.includes("highway") || n.includes("causeway") || n.startsWith("infrastructure")) return "infrastructure";
  if (n.includes("plant") || n.startsWith("industrial"))                        return "industrial";
  if (n.includes("hotel") || n.startsWith("fm"))                                return "facilities";
  if (n.includes("logo") || n.includes("favicon"))                              return "branding";
  if (n.includes("photo") || n.includes("user"))                                return "people";
  return "gallery";
}

/** User-saved content WINS over defaults at the section level */
function mergeWithDefaults(saved) {
  const defaultContent = defaultContentStore.content || {};
  const userContent    = saved?.content || {};
  const merged         = { ...defaultContent };
  for (const [k, v] of Object.entries(userContent)) {
    merged[k] = v;
  }
  return {
    content: merged,
    media:   Array.isArray(saved?.media) ? saved.media : [],
  };
}

// ── sanitize (preserves camelCase keys) ──────────────────────────────────────
export function sanitizeStore(input) {
  const content = {};
  for (const [sec, fields] of Object.entries(input?.content || {})) {
    const safeSec = String(sec).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
    if (!safeSec) continue;
    content[safeSec] = {};
    for (const [field, value] of Object.entries(fields || {})) {
      const safeField = String(field).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
      if (!safeField) continue;
      content[safeSec][safeField] = String(value ?? "").slice(0, 5000);
    }
  }
  const media = Array.isArray(input?.media)
    ? input.media.slice(0, 1000).map((m) => ({
        id:        String(m.id || Date.now()),
        title:     String(m.title || "Media").slice(0, 160),
        alt:       String(m.alt || m.title || "Media").slice(0, 200),
        category:  String(m.category || "gallery").slice(0, 60),
        url:       String(m.url || "").slice(0, 1000),
        source:    String(m.source || "upload").slice(0, 30),
        createdAt: String(m.createdAt || new Date().toISOString()),
      })).filter((m) => m.url)
    : [];
  return { content, media };
}

// ── data/site-content.json I/O (primary persistent storage) ──────────────────
async function readFromDataFile() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeToDataFile(store) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// ── /tmp I/O (fallback for read-only filesystems) ────────────────────────────
async function readFromTmp() {
  try {
    const raw = await fs.readFile(TMP_DATA_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeToTmp(store) {
  try {
    await fs.writeFile(TMP_DATA_FILE, JSON.stringify(store, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// ── GitHub I/O ────────────────────────────────────────────────────────────────
async function githubRequest(url, options = {}) {
  const cfg = githubConfig();
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept:                "application/vnd.github+json",
      Authorization:         `Bearer ${cfg.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
  if (!res.ok && res.status !== 404) {
    const txt = await res.text();
    throw new Error(`GitHub ${res.status}: ${txt}`);
  }
  return res;
}

async function readFromGithub() {
  const cfg = githubConfig();
  const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}?ref=${cfg.branch}`;
  const res = await githubRequest(url);
  if (res.status === 404) return mergeWithDefaults(defaultContentStore);
  const data = await res.json();
  return mergeWithDefaults(
    JSON.parse(Buffer.from(data.content || "", "base64").toString("utf8"))
  );
}

async function writeToGithub(store, message) {
  const cfg    = githubConfig();
  const shaRes = await githubRequest(
    `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}?ref=${cfg.branch}`
  );
  const sha = shaRes.status === 404 ? undefined : (await shaRes.json()).sha;
  const res = await githubRequest(
    `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}`,
    {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        message: message || "Update website content",
        content: Buffer.from(JSON.stringify(store, null, 2)).toString("base64"),
        branch:  cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) throw new Error("GitHub write failed");
}

// ── media scan (always fresh, never cached) ───────────────────────────────────
async function scanLocalMedia() {
  const items = [];
  async function walk(dir, prefix) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      const url  = `${prefix}/${e.name}`;
      if (e.isDirectory()) { await walk(full, url); continue; }
      const ext = path.extname(e.name).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      items.push({
        id:        `local-${Buffer.from(url).toString("base64url")}`,
        title:     titleize(e.name),
        alt:       titleize(e.name),
        category:  categorize(e.name),
        url,
        source:    "site",
        createdAt: new Date(0).toISOString(),
      });
    }
  }
  await walk(MEDIA_DIR,  "/media");
  await walk(UPLOAD_DIR, "/admin-uploads");
  return items;
}

async function withSiteMedia(store) {
  const scanned = await scanLocalMedia();
  const seen    = new Set();
  const merged  = [];
  // user-uploaded items take precedence; site items fill in gaps
  for (const m of [...(store.media || []), ...scanned]) {
    if (!m?.url || seen.has(m.url)) continue;
    seen.add(m.url);
    merged.push(m);
  }
  return { ...store, media: merged };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function readContentStore({ includeSiteMedia = true } = {}) {
  let base;

  if (hasGithubConfig()) {
    base = await readFromGithub();
  } else if (memoryCache) {
    base = memoryCache;
  } else {
    // Try persistent file first, then /tmp fallback, then shipped defaults
    base =
      (await readFromDataFile()) ??
      (await readFromTmp()) ??
      mergeWithDefaults(defaultContentStore);
    memoryCache = base;
  }

  return includeSiteMedia ? withSiteMedia(base) : base;
}

export async function writeContentStore(store, message) {
  // Strip auto-scanned site media before persisting — they are always re-scanned
  const userMedia = (store.media || []).filter((m) => m.source !== "site");
  const clean     = sanitizeStore({ ...store, media: userMedia });

  if (hasGithubConfig()) {
    await writeToGithub(clean, message);
  } else {
    // Try data/site-content.json first (persistent); fall back to /tmp
    const wroteToFile = await writeToDataFile(clean);
    if (!wroteToFile) {
      await writeToTmp(clean);
    }
    // Update in-process cache immediately so the next read sees fresh data
    memoryCache = mergeWithDefaults(clean);
  }
  return true;
}

export async function uploadMediaFile(originalName, buffer) {
  const fileName   = `${Date.now()}-${cleanFileName(originalName)}`;
  const publicPath = `/admin-uploads/${fileName}`;

  if (hasGithubConfig()) {
    const cfg = githubConfig();
    const res = await githubRequest(
      `https://api.github.com/repos/${cfg.repo}/contents/public/admin-uploads/${fileName}`,
      {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          message: `Upload ${fileName}`,
          content: buffer.toString("base64"),
          branch:  cfg.branch,
        }),
      }
    );
    if (!res.ok) throw new Error("GitHub upload failed");
    return publicPath;
  }

  // Ensure upload directory exists, then write the file
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return publicPath;
}

export async function deleteUploadedMedia(url) {
  if (!url?.startsWith("/admin-uploads/")) return false;
  const fileName = url.replace(/^\/admin-uploads\//, "");
  if (!fileName || fileName.includes("..") || fileName.includes("/")) return false;
  try { await fs.unlink(path.join(UPLOAD_DIR, fileName)); } catch {}
  return true;
}
