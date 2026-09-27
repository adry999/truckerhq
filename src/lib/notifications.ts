import "server-only";
import { sendSms } from "@/lib/sms";
import { findJob } from "@/lib/data";

// SMS copy per docs/design/Notifications.dc.html (N1, N2, N4). English only
// for now — the design doc's Russian versions aren't ready yet ("la
// traducere"), so every message goes out in English regardless of the
// language the user picked, per the fixes brief.
//
// N3 (new applicant, to the carrier) and N5/N6 (FMCSA change alerts, claim
// verification code) are not wired here: N3 needs a carrier contact email
// that no form collects yet, N5 needs a new FMCSA-change monitoring job,
// and N6 needs a real code-issue/verify flow. All three are separate scope.

/** N1 — dispatch-start request received. */
export async function notifyDispatchStart(phone: string): Promise<void> {
  await sendSms(
    phone,
    "Trucker HQ: got your dispatch request. A dispatcher will call you from (XXX) XXX-XXXX within 15 min. Reply STOP to opt out.",
  );
}

/** N2 — job application sent, to the driver. */
export async function notifyApplication(phone: string, jobSlug: string): Promise<void> {
  const job = findJob(jobSlug);
  const jobTitle = job?.title ?? "your job";
  const company = job?.company ?? "the employer";
  await sendSms(
    phone,
    `Trucker HQ: your application for ${jobTitle} went to ${company}. Expect a call in 1-2 business days. Reply STOP to opt out.`,
  );
}

/** N4 — compliance alerts turned on. */
export async function notifyComplianceAlertsOn(phone: string, dot: string): Promise<void> {
  await sendSms(
    phone,
    `Trucker HQ: alerts are on for DOT ${dot}. We text you the same day your FMCSA record changes. Msg&data rates may apply. Reply STOP to cancel, HELP for help.`,
  );
}
