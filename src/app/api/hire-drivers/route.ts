import { z } from "zod";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { driverLanguage, requiredText, text, usPhone, withChecks } from "@/server/leads/fields";

const schema = withChecks(
  z.object({
    companyName: requiredText(150),
    dotNumber: requiredText(20),
    contactName: requiredText(100),
    phone: requiredText(30),
    pay: text(100),
    homeBase: text(100),
    position: text(100),
    equipment: text(100),
    driverLanguage: driverLanguage(),
  }),
  { phone: usPhone() },
);

export const POST = createLeadHandler({
  schema,
  table: "hire_driver_requests",
  toRow: (h) => ({
    company_name: h.companyName,
    dot_number: h.dotNumber,
    contact_name: h.contactName,
    phone: h.phone,
    pay: h.pay,
    home_base: h.homeBase,
    position: h.position,
    equipment: h.equipment,
    driver_language: h.driverLanguage,
  }),
  saveError: "Could not save job",
  alertLabel: "Hire drivers",
});
