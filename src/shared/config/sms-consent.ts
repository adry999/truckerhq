import type { Locale } from "@/shared/i18n/locale";

// Bump the version whenever the wording changes: each lead stores the version
// it agreed to, which is the TCPA / 10DLC evidence of what the person saw.
export const SMS_CONSENT_VERSION = "2026-10-28";

export const SMS_CONSENT_TEXT: Record<Locale, string> = {
  EN: "I agree to receive text messages from Trucker HQ about my request at the number above. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of service.",
  RU: "Я согласен получать SMS от Trucker HQ по моей заявке на указанный номер. Частота сообщений может меняться. Может взиматься плата за сообщения и данные. Ответьте STOP, чтобы отписаться, HELP — для помощи. Согласие не является условием обслуживания.",
};
