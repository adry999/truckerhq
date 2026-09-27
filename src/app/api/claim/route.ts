import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { guardLeadRoute, str, isHoneypotTripped } from "@/lib/api-guard";

function sanitizeList(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((v) => str(v, maxLen)).filter(Boolean);
}

export async function POST(req: Request) {
  const guarded = guardLeadRoute(req);
  if (guarded) return guarded;

  const body = await req.json().catch(() => null);
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

  const dot = str(body?.dot, 20);
  const carrierSlug = str(body?.carrierSlug, 100);
  if (!dot || !carrierSlug) {
    return NextResponse.json({ error: "Missing carrier" }, { status: 400 });
  }

  const ok = await insertRow("claims", {
    dot,
    carrier_slug: carrierSlug,
    contact_method: str(body?.contactMethod, 20),
    phone: str(body?.phone, 30),
    equipment: sanitizeList(body?.equipment, 10, 40),
    lanes: sanitizeList(body?.lanes, 10, 40),
    also_show: sanitizeList(body?.alsoShow, 10, 60),
  });

  if (!ok) return NextResponse.json({ error: "Could not save claim" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
