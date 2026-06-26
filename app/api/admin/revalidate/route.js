export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin/auth";
import { revalidatePath } from "next/cache";

export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Revalidate all pages that consume content
    const paths = ["/", "/about", "/sectors", "/projects", "/news", "/careers", "/contact"];
    for (const p of paths) revalidatePath(p);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, revalidated: paths });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
