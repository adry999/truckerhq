import "server-only";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_FROM;

const mask = (phone: string) => `***${phone.slice(-4)}`;

/** Sends an SMS via Twilio; never throws, and no-ops when Twilio isn't configured. */
export async function sendSms(to: string, body: string): Promise<void> {
  if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM) {
    console.log(`[sms] skipped (Twilio not configured): to=${mask(to)}`);
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
        signal: AbortSignal.timeout(5000),
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
