import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (
    !body ||
    typeof body.companyName !== "string" ||
    typeof body.dotNumber !== "string" ||
    typeof body.contactName !== "string" ||
    typeof body.phone !== "string"
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!body.companyName.trim() || !body.dotNumber.trim() || !body.contactName.trim() || !body.phone.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ok = await insertRow("hire_driver_requests", {
    company_name: body.companyName.trim(),
    dot_number: body.dotNumber.trim(),
    contact_name: body.contactName.trim(),
    phone: body.phone.trim(),
    pay: String(body.pay ?? ""),
    home_base: String(body.homeBase ?? ""),
    position: String(body.position ?? ""),
    equipment: String(body.equipment ?? ""),
    driver_language: String(body.driverLanguage ?? ""),
  });

  if (!ok) return NextResponse.json({ error: "Could not save job" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
