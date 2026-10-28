import { SMS_CONSENT_TEXT } from "@/shared/config/sms-consent";
import type { Locale } from "@/shared/i18n/locale";

/** Unchecked by default. Optional unless the form's whole purpose is SMS (`required`). */
export function SmsConsent({
  checked,
  onChange,
  required,
  locale = "EN",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  locale?: Locale;
}) {
  return (
    <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-grey">
      <input
        type="checkbox"
        name="smsConsent"
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0"
      />
      {SMS_CONSENT_TEXT[locale]}
    </label>
  );
}
