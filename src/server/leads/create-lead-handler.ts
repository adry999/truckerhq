import "server-only";
import { NextResponse, after } from "next/server";
import type { z } from "zod";
import { insertRow, type LeadTables } from "@/server/db/insert-row";
import { sendLeadAlert } from "@/server/leads/lead-alert";
import {
  getClientIp,
  guardLeadRoute,
  isHoneypotTripped,
  readJsonBody,
  rejectResponse,
} from "@/server/http/api-guard";
import { verifyTurnstile } from "@/server/http/turnstile";

const MAX_CONSENT_VERSION = 32;
const MAX_USER_AGENT = 300;

type LeadDeps = {
  insertRow: typeof insertRow;
  after: (task: () => Promise<void>) => void;
  alert: typeof sendLeadAlert;
};

type LeadHandlerConfig<S extends z.ZodType, T extends keyof LeadTables> = {
  schema: S;
  table: T;
  toRow: (input: z.output<S>) => LeadTables[T];
  notify?: (input: z.output<S>) => Promise<void>;
  saveError: string;
  /** Names the lead type in the team alert email. */
  alertLabel: string;
  /** SMS route: stores consent evidence in the row and sends `notify` only with consent. */
  smsConsent?: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function consentEvidence(body: Record<string, unknown>, req: Request, consented: boolean) {
  const version = body["smsConsentVersion"];
  return {
    sms_consent: consented,
    sms_consent_version:
      consented && typeof version === "string" ? version.slice(0, MAX_CONSENT_VERSION) : null,
    sms_consent_at: consented ? new Date().toISOString() : null,
    consent_ip: consented ? getClientIp(req) : null,
    consent_user_agent: consented
      ? (req.headers.get("user-agent")?.slice(0, MAX_USER_AGENT) ?? null)
      : null,
  };
}

export function createLeadHandler<S extends z.ZodType, T extends keyof LeadTables>(
  config: LeadHandlerConfig<S, T>,
  deps: LeadDeps = { insertRow, after, alert: sendLeadAlert },
): (req: Request) => Promise<Response> {
  return async function handle(req) {
    const guarded = guardLeadRoute(req);
    if (guarded) return guarded;

    const parsedBody = await readJsonBody(req);
    if (!parsedBody.ok) {
      return rejectResponse(
        parsedBody.status,
        parsedBody.status === 413 ? "Payload too large" : "Invalid request body",
      );
    }

    // Non-object JSON is treated as an empty form so the schema reports the missing fields.
    const body = isRecord(parsedBody.body) ? parsedBody.body : {};
    if (isHoneypotTripped(body)) return NextResponse.json({ ok: true });

    const { turnstileToken, ...fields } = body;
    if (!(await verifyTurnstile(turnstileToken, getClientIp(req)))) {
      return rejectResponse(403, "Verification failed");
    }

    const parsed = config.schema.safeParse(fields);
    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message ?? "Invalid request body";
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) fieldErrors[key] = issue.message;
      }
      return NextResponse.json({ error, fields: fieldErrors }, { status: 400 });
    }

    const data = parsed.data as z.output<S>;
    const consented = config.smsConsent === true && fields["smsConsent"] === true;
    const row = config.smsConsent
      ? ({ ...config.toRow(data), ...consentEvidence(fields, req, consented) } as LeadTables[T])
      : config.toRow(data);
    const saved = await deps.insertRow(config.table, row);
    if (!saved) return rejectResponse(502, config.saveError);

    const { notify, alertLabel } = config;
    deps.after(async () => {
      try {
        await deps.alert(alertLabel, row);
      } catch {
        console.error(`[lead-alert] failed: label="${alertLabel}"`);
      }
    });
    if (notify && (!config.smsConsent || consented)) deps.after(() => notify(data));
    return NextResponse.json({ ok: true });
  };
}
