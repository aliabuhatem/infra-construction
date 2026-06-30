export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin/auth";
import { revalidatePath } from "next/cache";
import { CONTENT_PATHS, revalidateAllContent } from "../../../../lib/admin/revalidate-paths";

export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Revalidate every content-driven page, including sector sub-pages.
    revalidateAllContent(revalidatePath);
    return NextResponse.json({ ok: true, revalidated: CONTENT_PATHS });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
