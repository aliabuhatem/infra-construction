export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { readContentStore } from "../../../lib/admin/content-store";

export async function GET() {
  const store = await readContentStore();
  return NextResponse.json(store, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
