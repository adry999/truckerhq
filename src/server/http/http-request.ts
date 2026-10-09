import "server-only";

export type HttpFailure = { ok: false; kind: "timeout" | "network" | "http"; status?: number };
export type HttpResult = { ok: true; status: number; text: string } | HttpFailure;

const DEFAULT_TIMEOUT_MS = 5000;
const LOG_BODY_CHARS = 200;

// Provider error bodies can echo phone numbers; never log long digit runs.
const redact = (s: string) => s.replace(/\d{7,}/g, "[redacted]");

/**
 * Never throws. Logs one line per failure without the URL, which can carry
 * secrets (e.g. the FMCSA webKey).
 */
export async function httpRequest(
  service: string,
  url: string,
  init: RequestInit & { timeoutMs?: number },
): Promise<HttpResult> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = init;
  const fail = (failure: HttpFailure, body = ""): HttpFailure => {
    const status = failure.status === undefined ? "" : ` ${failure.status}`;
    const detail = body ? ` ${redact(body.slice(0, LOG_BODY_CHARS))}` : "";
    console.error(`[${service}] ${failure.kind}${status}${detail}`);
    return failure;
  };

  let res: Response;
  try {
    res = await fetch(url, { ...rest, signal: AbortSignal.timeout(timeoutMs) });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return fail({ ok: false, kind: timedOut ? "timeout" : "network" });
  }

  const text = await res.text().catch(() => "");
  if (!res.ok) return fail({ ok: false, kind: "http", status: res.status }, text);
  return { ok: true, status: res.status, text };
}
