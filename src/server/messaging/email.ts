import "server-only";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

const mask = (email: string) => `${email.slice(0, 1)}***@${email.split("@")[1] ?? ""}`;

type EmailOptions = { replyTo?: string };

/** Sends an email via Resend; never throws, and no-ops when unconfigured. */
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  { replyTo }: EmailOptions = {},
): Promise<void> {
  const { RESEND_API_KEY, RESEND_FROM } = serverEnv();
  if (!RESEND_API_KEY) {
    const masked = [to].flat().map(mask).join(",");
    console.log(`[email] skipped (Resend not configured): to=${masked} subject="${subject}"`);
    return;
  }

  await httpRequest("email", "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: RESEND_FROM, to, subject, html, ...(replyTo && { reply_to: replyTo }) }),
  });
}
