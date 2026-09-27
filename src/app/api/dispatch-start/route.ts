import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { guardLeadRoute, str, isHoneypotTripped } from "@/lib/api-guard";
import { notifyDispatchStart } from "@/lib/notifications";

function sanitizeLanes(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 10).map((v) => str(v, 60)).filter(Boolean);
}

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

  const trucksRaw = Number(body?.trucks);
  const trucks = Number.isFinite(trucksRaw) ? Math.min(Math.max(trucksRaw, 1), 500) : 1;

  const ok = await insertRow("dispatch_requests", {
    trailer_type: str(body?.trailerType, 60),
    trucks,
    driver_type: str(body?.driverType, 60),
    home_base: str(body?.homeBase, 100),
    lanes: sanitizeLanes(body?.lanes),
    home_time: str(body?.homeTime, 60),
    authority: str(body?.authority, 60),
    mc_number: str(body?.mcNumber, 20),
    name,
    phone,
    best_time: str(body?.bestTime, 60),
    language: str(body?.language, 20) || "English",
  });

  if (!ok) return NextResponse.json({ error: "Could not save request" }, { status: 502 });
  await notifyDispatchStart(phone);
  return NextResponse.json({ ok: true });
}
