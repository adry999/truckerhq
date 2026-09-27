import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { guardLeadRoute, str, isHoneypotTripped } from "@/lib/api-guard";
import { notifyComplianceAlertsOn } from "@/lib/notifications";

function sanitizeWatch(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== "object") return {};
  const entries = Object.entries(value as Record<string, unknown>).slice(0, 10);
  const out: Record<string, boolean> = {};
  for (const [key, v] of entries) {
    if (typeof key === "string" && key.length <= 40) out[key] = Boolean(v);
  }
  return out;
}

export async function POST(req: Request) {
  const guarded = guardLeadRoute(req);
  if (guarded) return guarded;

  const body = await req.json().catch(() => null);
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

  const dot = str(body?.dot, 20);
  const phone = str(body?.phone, 30);
  if (!dot || !phone) {
    return NextResponse.json({ error: "Missing DOT or phone" }, { status: 400 });
  }

  const ok = await insertRow("compliance_alert_signups", {
    dot,
    phone,
    language: str(body?.language, 20) || "EN",
    watch: sanitizeWatch(body?.watch),
  });

  if (!ok) return NextResponse.json({ error: "Could not save signup" }, { status: 502 });
  await notifyComplianceAlertsOn(phone, dot);
  return NextResponse.json({ ok: true });
}
