import "server-only";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

const mask = (email: string) => `${email.slice(0, 1)}***@${email.split("@")[1] ?? ""}`;

/** Sends an email via Resend; never throws, and no-ops when unconfigured. No caller yet. */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const { RESEND_API_KEY, RESEND_FROM } = serverEnv();
  if (!RESEND_API_KEY) {
    console.log(`[email] skipped (Resend not configured): to=${mask(to)} subject="${subject}"`);
    return;
  }

  await httpRequest("email", "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: RESEND_FROM, to, subject, html }),
  });
}
