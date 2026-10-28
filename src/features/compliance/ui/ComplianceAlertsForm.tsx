"use client";

import { getCopy, type Locale } from "@/shared/i18n/locale";
import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { SMS_CONSENT_VERSION } from "@/shared/config/sms-consent";
import {
  COMPLIANCE_ALERTS_COPY,
  WATCH_KEYS,
  type WatchKey,
} from "@/features/compliance/data/compliance-alerts-copy";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { useTurnstile } from "@/shared/hooks/useTurnstile";
import { Button } from "@/shared/ui/Button";
import { CheckCard, ChoiceGroup } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { CheckIcon } from "@/shared/ui/icons";
import { Segmented } from "@/shared/ui/Segmented";
import { SmsConsent } from "@/shared/ui/SmsConsent";
import { Turnstile } from "@/shared/ui/Turnstile";

const DEFAULT_WATCH: Record<WatchKey, boolean> = {
  auth: true,
  ins: true,
  ucr: true,
  boc: true,
  oos: true,
  insp: false,
};

const LANGUAGE_LABELS = { EN: "English", RU: "Русский" } as const;
const LANGUAGE_OPTIONS = [LANGUAGE_LABELS.EN, LANGUAGE_LABELS.RU];

const SAMPLES: Record<Locale, string> = {
  EN: "Trucker HQ: Insurance cancellation filed for DOT 3412897, effective Oct 14. Call your agent to keep your authority active.",
  RU: "Trucker HQ: страховой полис DOT 3412897 будет отменён 14 окт. Позвоните агенту, чтобы избежать отзыва MC.",
};

const HEADING = "font-display text-xl font-extrabold uppercase";

/** `lang` is the page language; the person can still pick a different SMS language. */
export default function ComplianceAlertsForm({ lang = "EN" }: { lang?: Locale }) {
  const copy = getCopy(COMPLIANCE_ALERTS_COPY, lang);
  const [dot, setDot] = useState("");
  const [phone, setPhone] = useState("");
  const [textLang, setTextLang] = useState<Locale>(lang);
  const [consent, setConsent] = useState(false);
  const [watch, setWatch] = useState(DEFAULT_WATCH);
  const turnstile = useTurnstile();

  const { status, error, fieldErrors, clearFieldError, onSubmit, reset, successRef } = useFormSubmit({
    endpoint: "/api/compliance-alerts",
    buildBody: () => ({
      dot,
      phone,
      language: textLang,
      watch,
      smsConsent: consent,
      smsConsentVersion: SMS_CONSENT_VERSION,
    }),
    onSuccess: () => trackEvent("compliance_alert_signup"),
    turnstile,
    knownFields: ["dot", "phone"],
  });

  const count = Object.values(watch).filter(Boolean).length;

  function watchAnother() {
    reset();
    setDot("");
    setPhone("");
    setConsent(false);
    setWatch(DEFAULT_WATCH);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {status === "sent" ? (
        <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-white p-7">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green text-amber">
            <CheckIcon size={26} />
          </div>
          <h2
            ref={successRef}
            tabIndex={-1}
            className="font-display text-4xl font-extrabold uppercase leading-tight outline-none"
          >
            {copy.sentTitle}
          </h2>
          <p className="text-base leading-relaxed text-ink-3">
            {copy.sentBody.replace("{count}", String(count)).replace("{dot}", dot || "DOT 3412897")}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <Button href={copy.checklistHref} variant="outline">
              {copy.checklistLink}
            </Button>
            <button
              type="button"
              onClick={watchAnother}
              className="flex h-[52px] items-center px-2 font-sans text-[15px] font-semibold text-green underline"
            >
              {copy.watchAnother}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-[22px] rounded-lg border border-border bg-white p-[22px]"
        >
          <Honeypot />
          <Field
            label={copy.dotLabel}
            required
            error={fieldErrors.dot}
            labelClassName={HEADING}
          >
            <TextInput
              required
              value={dot}
              onChange={(e) => {
                setDot(e.target.value);
                clearFieldError("dot");
              }}
              placeholder="DOT 3412897"
              inputMode="numeric"
              autoComplete="off"
              className="text-lg font-semibold tabular-nums"
            />
          </Field>

          <ChoiceGroup legend={<span className={HEADING}>{copy.watchLegend}</span>}>
            {WATCH_KEYS.map((key) => (
              <CheckCard
                key={key}
                name={key}
                title={copy.watchItems[key].title}
                description={copy.watchItems[key].description}
                checked={watch[key]}
                onChange={(on) => setWatch((w) => ({ ...w, [key]: on }))}
              />
            ))}
          </ChoiceGroup>

          <div className="flex flex-col gap-2.5">
            <span className={HEADING}>{copy.contactHeading}</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={copy.phoneLabel} error={fieldErrors.phone}>
                <TextInput
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError("phone");
                  }}
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  autoComplete="tel"
                  inputMode="tel"
                  className="text-lg tabular-nums"
                />
              </Field>
              <Segmented
                options={LANGUAGE_OPTIONS}
                value={LANGUAGE_LABELS[textLang]}
                onChange={(v) => setTextLang(v === LANGUAGE_LABELS.RU ? "RU" : "EN")}
                label={copy.textLanguageLabel}
                containerClassName="grid grid-cols-2 gap-1.5 sm:self-end"
                buttonClassName="h-[52px] text-base font-semibold"
              />
            </div>
          </div>

          <span className="text-[13px] leading-relaxed text-grey">
            {copy.disclosure.before}{" "}
            <Link href="/sms-terms" className="underline hover:text-asphalt">
              {copy.disclosure.smsTerms}
            </Link>{" "}
            {copy.disclosure.and}{" "}
            <Link href="/privacy" className="underline hover:text-asphalt">
              {copy.disclosure.privacy}
            </Link>
            .
          </span>

          <SmsConsent required checked={consent} onChange={setConsent} locale={lang} />

          <Turnstile controller={turnstile} locale={lang} />

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting" || !consent || !turnstile.ready}
            className="w-full"
          >
            {status === "submitting" ? copy.submitting : copy.submit}
          </Button>
          <FormError message={error} />
        </form>
      )}

      <aside className="flex flex-col gap-4">
        <div className="flex flex-col gap-3.5 rounded-lg bg-asphalt p-6 text-offwhite">
          <span className="font-display text-[15px] font-bold tracking-[.1em] text-amber">
            {copy.sampleEyebrow}
          </span>
          <div className="max-w-[340px] rounded-2xl rounded-bl-md bg-[#2A2D32] p-4 text-[15px] leading-relaxed">
            {getCopy(SAMPLES, textLang)}
          </div>
          <span className="text-[13px] text-on-dark-muted">{copy.sampleStamp}</span>
        </div>
        <div className="flex flex-col gap-2.5 rounded-lg border border-border bg-white p-[22px]">
          <h2 className="font-display text-2xl font-extrabold">{copy.whyHeading}</h2>
          <p className="text-[15px] leading-relaxed text-ink-3">{copy.whyBody}</p>
        </div>
      </aside>
    </div>
  );
}
