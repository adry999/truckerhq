import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }
  if (!body.name.trim() || !body.phone.trim()) {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }

  const ok = await insertRow("contact_messages", {
    topic: String(body.topic ?? "Something else"),
    name: body.name.trim(),
    phone: body.phone.trim(),
    message: String(body.message ?? ""),
    language: String(body.language ?? "EN"),
  });

  if (!ok) return NextResponse.json({ error: "Could not save message" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
