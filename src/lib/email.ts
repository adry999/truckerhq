import "server-only";

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || "Trucker HQ <hello@truckerhq.com>";

const mask = (email: string) => `${email.slice(0, 1)}***@${email.split("@")[1] ?? ""}`;

/** Sends an email via Resend; never throws, and no-ops when unconfigured. No caller yet. */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!API_KEY) {
    console.log(`[email] skipped (Resend not configured): to=${mask(to)} subject="${subject}"`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[email] Resend send failed: ${res.status} ${detail.slice(0, 500)}`);
    }
  } catch (err) {
    console.error("[email] Resend send threw:", err);
  }
}
