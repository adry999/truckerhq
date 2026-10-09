import { z } from "zod";
import { notifyApplication } from "@/lib/notifications";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const MISSING = "Missing required fields";

const schema = withChecks(
  z.object({
    fullName: requiredText(100, MISSING),
    phone: requiredText(30, MISSING),
    jobSlug: requiredText(100, MISSING),
    cdlClass: text(50),
    experience: text(50),
    language: text(20),
  }),
  { phone: usPhone() },
);

export const POST = createLeadHandler({
  schema,
  table: "job_applications",
  toRow: (a) => ({
    job_slug: a.jobSlug,
    full_name: a.fullName,
    phone: a.phone,
    cdl_class: a.cdlClass,
    experience: a.experience,
    language: a.language || "EN",
  }),
  notify: (a) => notifyApplication(a.phone, a.jobSlug),
  saveError: "Could not save application",
});
