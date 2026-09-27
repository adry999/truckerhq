import "server-only";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_FROM;

/**
 * Sends an SMS via Twilio. No-ops (logs and returns) when Twilio env vars
 * aren't configured, so callers can fire-and-forget without breaking the
 * form they're attached to.
 */
export async function sendSms(to: string, body: string): Promise<void> {
  if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM) {
    console.log(`[sms] skipped (Twilio not configured): to=${to}`);
    return;
  }

  try {
    const auth = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64");
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: FROM, To: to, Body: body }),
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[sms] Twilio send failed: ${res.status} ${detail.slice(0, 500)}`);
    }
  } catch (err) {
    console.error("[sms] Twilio send threw:", err);
  }
}
