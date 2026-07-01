export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin/auth";
import {
  readContentStore,
  writeContentStore,
  uploadMediaFile,
  deleteUploadedMedia,
} from "../../../../lib/admin/content-store";

// Detect a real raster-image type from the file's magic bytes and return a safe
// extension. Returns null for anything we can't positively identify as a raster
// image — notably SVG (which can carry <script> and cause stored XSS) and any
// text/HTML masquerading as an image via a spoofed Content-Type. Never trust the
// client-supplied MIME type or filename for this decision.
function sniffImageExt(b) {
  if (!b || b.length < 12) return null;
  // JPEG  FF D8 FF
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  // PNG   89 50 4E 47 0D 0A 1A 0A
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
      b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return "png";
  // GIF   "GIF8"
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return "gif";
  // WEBP  "RIFF"...."WEBP"
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "webp";
  // AVIF/HEIF  ...."ftyp"<brand>
  if (b.toString("ascii", 4, 8) === "ftyp" &&
      ["avif", "avis", "heic", "heix", "mif1", "msf1"].includes(b.toString("ascii", 8, 12))) return "avif";
  // BMP   "BM"
  if (b[0] === 0x42 && b[1] === 0x4d) return "bmp";
  // TIFF  II*. or MM.*
  if ((b[0] === 0x49 && b[1] === 0x49 && b[2] === 0x2a && b[3] === 0x00) ||
      (b[0] === 0x4d && b[1] === 0x4d && b[2] === 0x00 && b[3] === 0x2a)) return "tiff";
  return null;
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const title = String(form.get("title") || file?.name || "Media").slice(0, 160);
    const alt = String(form.get("alt") || title).slice(0, 200);
    const category = String(form.get("category") || "gallery").slice(0, 60);

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Please select a file" }, { status: 400 });
    }
    if (!String(file.type || "").startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 8MB" }, { status: 400 });
    }

    // Verify the actual file content is a real raster image (not SVG or a
    // spoofed-MIME text/HTML file), and force the extension to the detected
    // type so nothing is ever served as active content from our origin.
    const detectedExt = sniffImageExt(buffer);
    if (!detectedExt) {
      return NextResponse.json(
        { error: "Unsupported or unsafe file. Allowed: JPG, PNG, WebP, AVIF, GIF, BMP, TIFF (SVG is not allowed)." },
        { status: 400 }
      );
    }
    const baseName = String(file.name || "image").replace(/\.[^./\\]+$/, "").slice(0, 100) || "image";
    const safeName = `${baseName}.${detectedExt}`;

    const url = await uploadMediaFile(safeName, buffer, `image/${detectedExt}`);
    const store = await readContentStore({ includeSiteMedia: false });
    const item = {
      id: String(Date.now()),
      title,
      alt,
      category,
      url,
      source: "upload",
      createdAt: new Date().toISOString(),
    };

    store.media = [item, ...(store.media || [])];
    await writeContentStore(store, "Admin media upload");
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const url = String(body.url || "");
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    await deleteUploadedMedia(url);
    const store = await readContentStore({ includeSiteMedia: false });
    store.media = (store.media || []).filter((m) => m.url !== url);
    await writeContentStore(store, "Admin media delete");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Delete failed" }, { status: 500 });
  }
}
