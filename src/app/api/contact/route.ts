import { z } from "zod";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { language, requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const schema = withChecks(
  z.object({
    name: requiredText(100),
    phone: requiredText(30),
    topic: text(60),
    message: text(2000),
    language: language(),
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
    language: c.language,
  }),
  saveError: "Could not save message",
  alertLabel: "Contact message",
});
