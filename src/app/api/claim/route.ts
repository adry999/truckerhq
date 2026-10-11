import { z } from "zod";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { optionalUsPhone, requiredText, text, textList, withChecks } from "@/server/leads/fields";

const schema = withChecks(
  z.object({
    dot: requiredText(20, "Missing carrier"),
    carrierSlug: requiredText(100, "Missing carrier"),
    contactMethod: text(20),
    phone: text(30),
    equipment: textList(10, 40),
    lanes: textList(10, 40),
    alsoShow: textList(10, 60),
  }),
  { phone: optionalUsPhone() },
);

export const POST = createLeadHandler({
  schema,
  table: "claims",
  toRow: (c) => ({
    dot: c.dot,
    carrier_slug: c.carrierSlug,
    contact_method: c.contactMethod,
    phone: c.phone,
    equipment: c.equipment,
    lanes: c.lanes,
    also_show: c.alsoShow,
  }),
  saveError: "Could not save claim",
});
