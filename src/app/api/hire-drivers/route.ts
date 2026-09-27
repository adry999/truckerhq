import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { guardLeadRoute, str, isHoneypotTripped } from "@/lib/api-guard";

export async function POST(req: Request) {
  const guarded = guardLeadRoute(req);
  if (guarded) return guarded;

  const body = await req.json().catch(() => null);
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

  const companyName = str(body?.companyName, 150);
  const dotNumber = str(body?.dotNumber, 20);
  const contactName = str(body?.contactName, 100);
  const phone = str(body?.phone, 30);
  if (!companyName || !dotNumber || !contactName || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ok = await insertRow("hire_driver_requests", {
    company_name: companyName,
    dot_number: dotNumber,
    contact_name: contactName,
    phone,
    pay: str(body?.pay, 100),
    home_base: str(body?.homeBase, 100),
    position: str(body?.position, 100),
    equipment: str(body?.equipment, 100),
    driver_language: str(body?.driverLanguage, 50),
  });

  if (!ok) return NextResponse.json({ error: "Could not save job" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
