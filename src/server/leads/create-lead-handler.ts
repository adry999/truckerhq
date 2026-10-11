import "server-only";
import { NextResponse, after } from "next/server";
import type { z } from "zod";
import { insertRow, type LeadTables } from "@/server/db/insert-row";
import { guardLeadRoute, isHoneypotTripped, readJsonBody, rejectResponse } from "@/server/http/api-guard";

type LeadDeps = {
  insertRow: typeof insertRow;
  after: (task: () => Promise<void>) => void;
};

type LeadHandlerConfig<S extends z.ZodType, T extends keyof LeadTables> = {
  schema: S;
  table: T;
  toRow: (input: z.output<S>) => LeadTables[T];
  notify?: (input: z.output<S>) => Promise<void>;
  saveError: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createLeadHandler<S extends z.ZodType, T extends keyof LeadTables>(
  config: LeadHandlerConfig<S, T>,
  deps: LeadDeps = { insertRow, after },
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
    const saved = await deps.insertRow(config.table, config.toRow(data));
    if (!saved) return rejectResponse(502, config.saveError);

    const { notify } = config;
    if (notify) deps.after(() => notify(data));
    return NextResponse.json({ ok: true });
  };
}
