import { getClientIp, isRateLimited, readJsonBody } from "@/server/http/api-guard";

const MAX_REPORT_BYTES = 16_000;
const MAX_REPORTS = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

/** Origin of a blocked URL, or the keyword itself ("inline", "eval", ...). Never a path or query. */
function originOf(value: string | undefined): string {
  if (!value) return "-";
  try {
    const url = new URL(value);
    return url.origin === "null" ? url.protocol.slice(0, -1) : url.origin;
  } catch {
    return value.slice(0, 40).replace(/[^\w:.*'-]/g, "");
  }
}

function pathOf(value: string | undefined): string {
  if (!value) return "-";
  try {
    return new URL(value).pathname.slice(0, 200);
  } catch {
    return "-";
  }
}

/** Accepts legacy {"csp-report": {...}} and Reporting API [{type, body}] payloads. */
function extractReports(body: unknown): Record<string, unknown>[] {
  if (Array.isArray(body)) {
    const reports: Record<string, unknown>[] = [];
    for (const entry of body) {
      if (isRecord(entry) && entry["type"] === "csp-violation" && isRecord(entry["body"])) {
        reports.push(entry["body"]);
      }
    }
    return reports;
  }
  if (isRecord(body) && isRecord(body["csp-report"])) return [body["csp-report"]];
  return [];
}

function formatReport(report: Record<string, unknown>): string {
  // The Reporting API uses camelCase keys, the legacy format uses dashed ones.
  const directive =
    str(report["effectiveDirective"]) ??
    str(report["effective-directive"]) ??
    str(report["violatedDirective"]) ??
    str(report["violated-directive"]);
  const blocked = str(report["blockedURL"]) ?? str(report["blocked-uri"]);
  const document = str(report["documentURL"]) ?? str(report["document-uri"]);
  return `[csp-report] directive="${(directive ?? "-").slice(0, 60)}" blocked="${originOf(blocked)}" path="${pathOf(document)}"`;
}

export async function POST(req: Request): Promise<Response> {
  const noContent = new Response(null, { status: 204 });
  // No Origin check: browsers send violation reports without one.
  if (isRateLimited(`csp-report:${getClientIp(req)}`)) return noContent;

  const parsed = await readJsonBody(req, MAX_REPORT_BYTES);
  if (!parsed.ok) return noContent;

  for (const report of extractReports(parsed.body).slice(0, MAX_REPORTS)) {
    console.warn(formatReport(report));
  }
  return noContent;
}
