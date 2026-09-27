import "server-only";

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || "Trucker HQ <hello@truckerhq.com>";

/**
 * Sends an email via Resend. No-ops (logs and returns) when RESEND_API_KEY
 * isn't configured, so callers can fire-and-forget without breaking the
 * form they're attached to.
 *
 * Note: none of the site's lead forms currently collect an email address
 * (phone-only, by design — see sms-terms). This is wired up and ready, but
 * has no caller yet until a form adds an email field.
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!API_KEY) {
    console.log(`[email] skipped (Resend not configured): to=${to} subject="${subject}"`);
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
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[email] Resend send failed: ${res.status} ${detail.slice(0, 500)}`);
    }
  } catch (err) {
    console.error("[email] Resend send threw:", err);
  }
}
