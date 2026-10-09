import "server-only";
import { PHONE_DISPLAY, PHONE_IS_PLACEHOLDER } from "@/lib/contact";
import { sendSms } from "@/server/messaging/sms";
import { claimSmsSlot } from "@/server/messaging/sms-throttle";
import { findJob } from "@/features/jobs";

// English-only until the Russian SMS copy is approved.

async function send(phone: string, body: string): Promise<void> {
  if (!claimSmsSlot(phone)) {
    console.warn(`[sms] throttled: to=***${phone.slice(-4)}`);
    return;
  }
  await sendSms(phone, body);
}

export async function notifyDispatchStart(phone: string): Promise<void> {
  const from = PHONE_IS_PLACEHOLDER ? "" : ` from ${PHONE_DISPLAY}`;
  await send(
    phone,
    `Trucker HQ: got your dispatch request. A dispatcher will call you${from} within 15 min. Reply STOP to opt out.`,
  );
}

export async function notifyApplication(phone: string, jobSlug: string): Promise<void> {
  const jobTitle = findJob(jobSlug)?.title ?? "your job";
  await send(
    phone,
    `Trucker HQ: we got your application for ${jobTitle}. A recruiter will call you in 1-2 business days. Reply STOP to opt out.`,
  );
}

export async function notifyComplianceAlertsOn(phone: string, dot: string): Promise<void> {
  await send(
    phone,
    `Trucker HQ: alerts are on for DOT ${dot.replace(/\D/g, "")}. We text you the same day your FMCSA record changes. Msg&data rates may apply. Reply STOP to cancel, HELP for help.`,
  );
}
