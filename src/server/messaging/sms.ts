import "server-only";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

const mask = (phone: string) => `***${phone.slice(-4)}`;

/** Sends an SMS via Twilio; never throws, and no-ops when Twilio isn't configured. */
export async function sendSms(to: string, body: string): Promise<void> {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM } = serverEnv();
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
    console.log(`[sms] skipped (Twilio not configured): to=${mask(to)}`);
    return;
  }

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  await httpRequest(
    "sms",
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: TWILIO_FROM, To: to, Body: body }),
    },
  );
}
