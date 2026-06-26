export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin/auth";
import { readContentStore, writeContentStore, sanitizeStore } from "../../../../lib/admin/content-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readContentStore();
  return NextResponse.json(store, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const clean = sanitizeStore(body);
    await writeContentStore(clean, "Admin content update");

    // Revalidate all public pages so changes appear immediately
    const paths = ["/", "/about", "/sectors", "/projects", "/news", "/careers", "/contact"];
    for (const p of paths) {
      try { revalidatePath(p); } catch {}
    }
    try { revalidatePath("/", "layout"); } catch {}

    // Re-read to confirm saved correctly and return the fresh store
    const fresh = await readContentStore();
    return NextResponse.json({ ok: true, store: fresh });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Save failed" }, { status: 500 });
  }
}
