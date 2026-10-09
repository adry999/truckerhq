import { z } from "zod";
import { notifyDispatchStart } from "@/lib/notifications";
import { createLeadHandler } from "@/server/leads/create-lead-handler";
import { anyInput, requiredText, text, textList, usPhone, withChecks } from "@/server/leads/fields";

const MISSING = "Missing name or phone";

const trucks = anyInput.transform((value) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), 500) : 1;
});

const schema = withChecks(
  z.object({
    name: requiredText(100, MISSING),
    phone: requiredText(30, MISSING),
    trailerType: text(60),
    trucks,
    driverType: text(60),
    homeBase: text(100),
    lanes: textList(10, 60),
    homeTime: text(60),
    authority: text(60),
    mcNumber: text(20),
    bestTime: text(60),
    language: text(20),
  }),
  { phone: usPhone() },
);

export const POST = createLeadHandler({
  schema,
  table: "dispatch_requests",
  toRow: (d) => ({
    trailer_type: d.trailerType,
    trucks: d.trucks,
    driver_type: d.driverType,
    home_base: d.homeBase,
    lanes: d.lanes,
    home_time: d.homeTime,
    authority: d.authority,
    mc_number: d.mcNumber,
    name: d.name,
    phone: d.phone,
    best_time: d.bestTime,
    language: d.language || "English",
  }),
  notify: (d) => notifyDispatchStart(d.phone),
  saveError: "Could not save request",
});
