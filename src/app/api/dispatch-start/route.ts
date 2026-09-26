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

  const ok = await insertRow("dispatch_requests", {
    trailer_type: String(body.trailerType ?? ""),
    trucks: Number(body.trucks) || 1,
    driver_type: String(body.driverType ?? ""),
    home_base: String(body.homeBase ?? ""),
    lanes: Array.isArray(body.lanes) ? body.lanes.map(String) : [],
    home_time: String(body.homeTime ?? ""),
    authority: String(body.authority ?? ""),
    mc_number: String(body.mcNumber ?? ""),
    name: body.name.trim(),
    phone: body.phone.trim(),
    best_time: String(body.bestTime ?? ""),
    language: String(body.language ?? "English"),
  });

  if (!ok) return NextResponse.json({ error: "Could not save request" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
