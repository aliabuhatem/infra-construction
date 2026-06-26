export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin/auth";
import {
  readContentStore,
  writeContentStore,
  uploadMediaFile,
  deleteUploadedMedia,
} from "../../../../lib/admin/content-store";

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

    const url = await uploadMediaFile(file.name || "image.png", buffer, file.type || "image/png");
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
