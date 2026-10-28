import { NextResponse } from "next/server";
import { integrationStatus } from "@/server/integrations";

export const dynamic = "force-dynamic";

// Public, so it only says whether leads can be saved. Which integrations are
// missing (e.g. Turnstile) is logged at startup instead, not exposed to bots.
export function GET() {
  const { supabase } = integrationStatus();
  return NextResponse.json(
    { ok: true, leads: supabase },
    { headers: { "Cache-Control": "no-store" } },
  );
}
