import "server-only";
import { NextResponse, after } from "next/server";
import type { z } from "zod";
import { insertRow, type LeadTables } from "@/server/db/insert-row";
import { sendLeadAlert } from "@/server/leads/lead-alert";
import { guardLeadRoute, isHoneypotTripped, readJsonBody, rejectResponse } from "@/server/http/api-guard";

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
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

    const parsed = config.schema.safeParse(body);
    if (!parsed.success) {
      return rejectResponse(400, parsed.error.issues[0]?.message ?? "Invalid request body");
    }

    const data = parsed.data as z.output<S>;
    const row = config.toRow(data);
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
    if (notify) deps.after(() => notify(data));
    return NextResponse.json({ ok: true });
  };
}
