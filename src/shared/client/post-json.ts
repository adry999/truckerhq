export type PostJsonResult =
  | { ok: true }
  | { ok: false; status: number | null; message: string | null };

const USER_FACING = new Set([400, 413, 429]);

export async function postJson(url: string, body: unknown): Promise<PostJsonResult> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, status: null, message: null };
  }
  if (res.ok) return { ok: true };
  let message: string | null = null;
  if (USER_FACING.has(res.status)) {
    const data: unknown = await res.json().catch(() => null);
    const error = (data as { error?: unknown } | null)?.error;
    if (typeof error === "string" && error) message = error;
  }
  return { ok: false, status: res.status, message };
}
