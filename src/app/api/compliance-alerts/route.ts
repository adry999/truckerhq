import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.dot !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "Missing DOT or phone" }, { status: 400 });
  }
  if (!body.dot.trim() || !body.phone.trim()) {
    return NextResponse.json({ error: "Missing DOT or phone" }, { status: 400 });
  }

  const ok = await insertRow("compliance_alert_signups", {
    dot: body.dot.trim(),
    phone: body.phone.trim(),
    language: String(body.language ?? "EN"),
    watch: body.watch && typeof body.watch === "object" ? body.watch : {},
  });

  if (!ok) return NextResponse.json({ error: "Could not save signup" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
