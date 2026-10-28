import "server-only";
import { PHONE_DISPLAY, PHONE_IS_PLACEHOLDER } from "@/shared/config/contact";
import { sendSms } from "@/server/messaging/sms";
import { claimSmsSlot } from "@/server/messaging/sms-throttle";

// The Russian SMS copy below is written but still pending client approval.
// Until RU_SMS_APPROVED is flipped to true every message goes out in English.
export const RU_SMS_APPROVED = false;

/** Maps the language values leads carry ("EN", "RU", "Русский", "Russian") to a message language. */
export function smsLanguage(language: string | undefined): "EN" | "RU" {
  if (!RU_SMS_APPROVED || !language) return "EN";
  return /^(ru|рус)/i.test(language.trim()) ? "RU" : "EN";
}

async function send(phone: string, body: string): Promise<void> {
  if (!claimSmsSlot(phone)) {
    console.warn(`[sms] throttled: to=***${phone.slice(-4)}`);
    return;
  }
  await sendSms(phone, body);
}

export async function notifyDispatchStart(phone: string, language?: string): Promise<void> {
  const ru = smsLanguage(language) === "RU";
  const from = PHONE_IS_PLACEHOLDER ? "" : ru ? ` с номера ${PHONE_DISPLAY}` : ` from ${PHONE_DISPLAY}`;
  await send(
    phone,
    ru
      ? `Trucker HQ: мы получили вашу заявку на диспетчерское сопровождение. Диспетчер позвонит вам${from} в течение 15 минут. Чтобы отписаться, ответьте STOP.`
      : `Trucker HQ: got your dispatch request. A dispatcher will call you${from} within 15 min. Reply STOP to opt out.`,
  );
}

export async function notifyApplication(
  phone: string,
  jobTitle: string | undefined,
  language?: string,
): Promise<void> {
  const ru = smsLanguage(language) === "RU";
  await send(
    phone,
    ru
      ? `Trucker HQ: мы получили вашу заявку на вакансию ${jobTitle ?? "(без названия)"}. Рекрутер позвонит вам в течение 1-2 рабочих дней. Чтобы отписаться, ответьте STOP.`
      : `Trucker HQ: we got your application for ${jobTitle ?? "your job"}. A recruiter will call you in 1-2 business days. Reply STOP to opt out.`,
  );
}

export async function notifyComplianceAlertsOn(
  phone: string,
  dot: string,
  language?: string,
): Promise<void> {
  const ru = smsLanguage(language) === "RU";
  const digits = dot.replace(/\D/g, "");
  await send(
    phone,
    ru
      ? `Trucker HQ: оповещения включены для DOT ${digits}. Мы отправим SMS в тот же день, когда изменится ваша запись в FMCSA. Возможна плата за сообщения и данные. STOP - отключить, HELP - помощь.`
      : `Trucker HQ: alerts are on for DOT ${digits}. We text you the same day your FMCSA record changes. Msg&data rates may apply. Reply STOP to cancel, HELP for help.`,
  );
}
