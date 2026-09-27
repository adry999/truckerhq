import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { guardLeadRoute, str, isHoneypotTripped } from "@/lib/api-guard";

export async function POST(req: Request) {
  const guarded = guardLeadRoute(req);
  if (guarded) return guarded;

  const body = await req.json().catch(() => null);
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

  const name = str(body?.name, 100);
  const phone = str(body?.phone, 30);
  if (!name || !phone) {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }

  const ok = await insertRow("contact_messages", {
    topic: str(body?.topic, 60) || "Something else",
    name,
    phone,
    message: str(body?.message, 2000),
    language: str(body?.language, 20) || "EN",
  });

  if (!ok) return NextResponse.json({ error: "Could not save message" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
