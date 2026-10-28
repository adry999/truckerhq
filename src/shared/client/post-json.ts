export type PostJsonResult =
  | { ok: true }
  | {
      ok: false;
      status: number | null;
      message: string | null;
      /** Per-field messages from a 400, keyed by request body key. Empty otherwise. */
      fields: Record<string, string>;
    };

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
    return { ok: false, status: null, message: null, fields: {} };
  }
  if (res.ok) return { ok: true };
  let message: string | null = null;
  const fields: Record<string, string> = {};
  if (USER_FACING.has(res.status)) {
    const data = (await res.json().catch(() => null)) as { error?: unknown; fields?: unknown } | null;
    if (typeof data?.error === "string" && data.error) message = data.error;
    if (res.status === 400 && data?.fields && typeof data.fields === "object") {
      for (const [key, value] of Object.entries(data.fields)) {
        if (typeof value === "string" && value) fields[key] = value;
      }
    }
  }
  return { ok: false, status: res.status, message, fields };
}
