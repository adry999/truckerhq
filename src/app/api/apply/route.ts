import { z } from "zod";
import { notifyApplication } from "@/server/leads/notifications";
import { findJob } from "@/features/jobs";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { language, requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const schema = withChecks(
  z.object({
    fullName: requiredText(100),
    phone: requiredText(30),
    jobSlug: requiredText(100),
    cdlClass: text(50),
    experience: text(50),
    language: language(),
    smsConsent: z.boolean().optional(),
    smsConsentVersion: z.string().max(32).optional(),
  }),
  { phone: usPhone() },
);

export const POST = createLeadHandler({
  schema,
  smsConsent: true,
  table: "job_applications",
  toRow: (a) => ({
    job_slug: a.jobSlug,
    full_name: a.fullName,
    phone: a.phone,
    cdl_class: a.cdlClass,
    experience: a.experience,
    language: a.language,
  }),
  notify: (a) => notifyApplication(a.phone, findJob(a.jobSlug)?.title, a.language),
  saveError: "Could not save application",
  alertLabel: "Job application",
});
