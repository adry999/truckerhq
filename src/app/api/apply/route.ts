import { NextResponse, after } from "next/server";
import { insertRow } from "@/server/db/insert-row";
import { toUsE164 } from "@/lib/phone";
import { guardLeadRoute, str, isHoneypotTripped } from "@/server/http/api-guard";
import { notifyApplication } from "@/lib/notifications";

export async function POST(req: Request) {
  const guarded = guardLeadRoute(req);
  if (guarded) return guarded;

  const body = await req.json().catch(() => null);
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

  const fullName = str(body?.fullName, 100);
  const phone = str(body?.phone, 30);
  const jobSlug = str(body?.jobSlug, 100);
  if (!fullName || !phone || !jobSlug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const e164 = toUsE164(phone);
  if (!e164) return NextResponse.json({ error: "Enter a valid US phone number" }, { status: 400 });

  const ok = await insertRow("job_applications", {
    job_slug: jobSlug,
    full_name: fullName,
    phone: e164,
    cdl_class: str(body?.cdlClass, 50),
    experience: str(body?.experience, 50),
    language: str(body?.language, 20) || "EN",
  });

  if (!ok) return NextResponse.json({ error: "Could not save application" }, { status: 502 });
  after(() => notifyApplication(e164, jobSlug));
  return NextResponse.json({ ok: true });
}
