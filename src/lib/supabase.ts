import "server-only";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

/**
 * Server-only insert into a Supabase table via PostgREST. Each table only
 * has an "insert" RLS policy for anon/authenticated — this can write leads
 * but can never read them back, by design.
 */
export async function insertRow(table: string, row: Record<string, unknown>): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`insertRow(${table}) failed: ${res.status} ${detail.slice(0, 500)}`);
    }
    return res.ok;
  } catch (err) {
    console.error(`insertRow(${table}) threw:`, err);
    return false;
  }
}
