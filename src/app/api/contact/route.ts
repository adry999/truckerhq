import { z } from "zod";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const MISSING = "Missing name or phone";

const schema = withChecks(
  z.object({
    name: requiredText(100, MISSING),
    phone: requiredText(30, MISSING),
    topic: text(60),
    message: text(2000),
    language: text(20),
  }),
  { phone: usPhone() },
);

export const POST = createLeadHandler({
  schema,
  table: "contact_messages",
  toRow: (c) => ({
    topic: c.topic || "Something else",
    name: c.name,
    phone: c.phone,
    message: c.message,
    language: c.language || "EN",
  }),
  saveError: "Could not save message",
});
