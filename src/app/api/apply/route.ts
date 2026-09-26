import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.fullName !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
  }
  if (!body.fullName.trim() || !body.phone.trim() || typeof body.jobSlug !== "string") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ok = await insertRow("job_applications", {
    job_slug: body.jobSlug,
    full_name: body.fullName.trim(),
    phone: body.phone.trim(),
    cdl_class: String(body.cdlClass ?? ""),
    experience: String(body.experience ?? ""),
    language: String(body.language ?? "EN"),
  });

  if (!ok) return NextResponse.json({ error: "Could not save application" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
