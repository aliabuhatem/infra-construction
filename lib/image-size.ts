/* ────────────────────────────────────────────────────────────────────────
   Intrinsic image dimensions, read straight from the file header.

   The sector/service hero gives its container the image's own aspect ratio so
   that `object-cover` has nothing left to crop. That needs the real pixel size,
   and the paths come from the admin store at render time, so a static import
   (which would carry the size with it) isn't available.

   Only the three formats the media library actually holds are parsed — PNG,
   JPEG and WebP. Anything else, or anything malformed, returns null and the
   caller falls back to a default ratio rather than throwing.
──────────────────────────────────────────────────────────────────────────── */

import { readFileSync } from "node:fs";
import path from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

/* Header reads are identical for every render of the same page, and the same
   photo is reused across cards, so results are memoised for the process. A null
   result is cached too — a missing file shouldn't be re-stat'd on every hit. */
const cache = new Map<string, ImageSize | null>();

function parsePng(buf: Buffer): ImageSize | null {
  // 8-byte signature, then a length + "IHDR" tag, then width/height as uint32.
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function parseJpeg(buf: Buffer): ImageSize | null {
  // Walk the segment chain to the start-of-frame marker, which carries the
  // dimensions. Everything before it (EXIF, quantisation tables, thumbnails)
  // is length-prefixed, so it can be skipped without interpreting it.
  let offset = 2; // skip SOI
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return null;
    const marker = buf[offset + 1];
    // SOF0–SOF15 hold the frame size, except DHT (c4), JPG (c8) and DAC (cc).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return null;
}

function parseWebp(buf: Buffer): ImageSize | null {
  if (buf.length < 30 || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buf.toString("ascii", 12, 16);

  if (chunk === "VP8X") {
    // Extended format: canvas size is stored minus one, 24-bit little-endian.
    return {
      width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }
  if (chunk === "VP8 ") {
    // Lossy: 14 significant bits each, after the 3-byte start code.
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L") {
    // Lossless: 14-bit width then 14-bit height, packed across four bytes.
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

/** Pixel size of an image served from /public, or null if it can't be read. */
export function imageSize(src: string | undefined): ImageSize | null {
  if (!src || !src.startsWith("/")) return null;
  if (cache.has(src)) return cache.get(src)!;

  let result: ImageSize | null = null;
  try {
    // Strip any query string, and decode "%20" etc. — several media filenames
    // contain spaces.
    const clean = decodeURIComponent(src.split("?")[0]);
    // Resolve inside /public and confirm it stayed there, so a crafted path
    // can't read files elsewhere on the box.
    const root = path.join(process.cwd(), "public");
    const file = path.join(root, clean);
    if (file.startsWith(root)) {
      // 64 KB is far more than any of these headers need, EXIF included.
      const buf = readFileSync(file).subarray(0, 65536);
      const sig = buf.toString("ascii", 0, 4);
      if (sig === "\x89PNG") result = parsePng(buf);
      else if (buf[0] === 0xff && buf[1] === 0xd8) result = parseJpeg(buf);
      else if (sig === "RIFF") result = parseWebp(buf);
    }
  } catch {
    result = null; // missing or unreadable file — caller uses its fallback
  }

  if (result && (!result.width || !result.height)) result = null;
  cache.set(src, result);
  return result;
}
