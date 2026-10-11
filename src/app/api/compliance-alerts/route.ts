import { z } from "zod";
import { notifyComplianceAlertsOn } from "@/server/leads/notifications";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { anyInput, dotNumber, requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const MISSING = "Missing DOT or phone";

const watch = anyInput.transform((value) => {
  const out: Record<string, boolean> = {};
  if (!value || typeof value !== "object") return out;
  for (const [key, v] of Object.entries(value).slice(0, 10)) {
    if (key.length <= 40) out[key] = Boolean(v);
  }
  return out;
});

const schema = withChecks(
  z.object({
    dot: requiredText(20, MISSING),
    phone: requiredText(30, MISSING),
    smsConsent: z.literal(true, { error: "SMS consent required" }),
    language: text(20),
    watch,
  }),
  { phone: usPhone(), dot: dotNumber() },
);

export const POST = createLeadHandler({
  schema,
  table: "compliance_alert_signups",
  toRow: (s) => ({
    dot: s.dot,
    phone: s.phone,
    language: s.language || "EN",
    watch: s.watch,
  }),
  notify: (s) => notifyComplianceAlertsOn(s.phone, s.dot),
  saveError: "Could not save signup",
});
