"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { Button } from "@/shared/ui/Button";
import { CheckCard, ChoiceGroup } from "@/shared/ui/choices";
import { Field, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { CheckIcon } from "@/shared/ui/icons";
import { Segmented } from "@/shared/ui/Segmented";

const WATCH_ITEMS = [
  { key: "auth", title: "Operating authority", description: "Active, pending, revoked or inactive" },
  { key: "ins", title: "Insurance filing", description: "BIPD and cargo on file, cancellation notices" },
  { key: "ucr", title: "UCR registration", description: "Reminder before the yearly deadline" },
  { key: "boc", title: "BOC-3 process agent", description: "Filing missing or removed" },
  { key: "oos", title: "Out-of-service order", description: "Any new OOS order on your DOT" },
  { key: "insp", title: "New inspections and crashes", description: "Every roadside inspection that hits your record" },
] as const;

type WatchKey = (typeof WATCH_ITEMS)[number]["key"];

const DEFAULT_WATCH: Record<WatchKey, boolean> = {
  auth: true,
  ins: true,
  ucr: true,
  boc: true,
  oos: true,
  insp: false,
};

type Language = "EN" | "RU";
const LANGUAGE_LABELS = { EN: "English", RU: "Русский" } as const;
const LANGUAGE_OPTIONS = [LANGUAGE_LABELS.EN, LANGUAGE_LABELS.RU];

const SAMPLES: Record<Language, string> = {
  EN: "Trucker HQ: Insurance cancellation filed for DOT 3412897, effective Oct 14. Call your agent to keep your authority active.",
  RU: "Trucker HQ: страховой полис DOT 3412897 будет отменён 14 окт. Позвоните агенту, чтобы избежать отзыва MC.",
};

const HEADING = "font-display text-xl font-extrabold uppercase";

export default function ComplianceAlertsForm() {
  const [dot, setDot] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState<Language>("EN");
  const [consent, setConsent] = useState(false);
  const [watch, setWatch] = useState(DEFAULT_WATCH);

  const { status, error, onSubmit, reset } = useFormSubmit({
    endpoint: "/api/compliance-alerts",
    buildBody: () => ({ dot, phone, language: lang, watch, smsConsent: consent }),
    onSuccess: () => trackEvent("compliance_alert_signup"),
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
          <h2 className="font-display text-4xl font-extrabold uppercase leading-tight">
            Alerts are on
          </h2>
          <p className="text-base leading-relaxed text-ink-3">
            We&apos;re watching {count} items for {dot || "DOT 3412897"}. A
            confirmation text is on its way.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <Button href="/tools/new-mc-checklist" variant="outline">
              New MC Checklist
            </Button>
            <button
              type="button"
              onClick={watchAnother}
              className="flex h-[52px] items-center px-2 font-sans text-[15px] font-semibold text-green underline"
            >
              Watch another carrier
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-[22px] rounded-lg border border-border bg-white p-[22px]"
        >
          <Honeypot />
          <label className="flex flex-col gap-1.5">
            <span className={HEADING}>1. Your DOT or MC number (required)</span>
            <TextInput
              required
              value={dot}
              onChange={(e) => setDot(e.target.value)}
              placeholder="DOT 3412897"
              inputMode="numeric"
              autoComplete="off"
              className="text-lg font-semibold tabular-nums"
            />
          </label>

          <ChoiceGroup legend={<span className={HEADING}>2. What to watch</span>}>
            {WATCH_ITEMS.map((item) => (
              <CheckCard
                key={item.key}
                name={item.key}
                title={item.title}
                description={item.description}
                checked={watch[item.key]}
                onChange={(on) => setWatch((w) => ({ ...w, [item.key]: on }))}
              />
            ))}
          </ChoiceGroup>

          <div className="flex flex-col gap-2.5">
            <span className={HEADING}>3. Where to text you</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Mobile number">
                <TextInput
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  autoComplete="tel"
                  className="text-lg tabular-nums"
                />
              </Field>
              <Segmented
                options={LANGUAGE_OPTIONS}
                value={LANGUAGE_LABELS[lang]}
                onChange={(v) => setLang(v === LANGUAGE_LABELS.RU ? "RU" : "EN")}
                label="Text language"
                containerClassName="grid grid-cols-2 gap-1.5 sm:self-end"
                buttonClassName="h-[52px] text-base font-semibold"
              />
            </div>
          </div>

          <span className="text-[13px] leading-relaxed text-grey">
            Free, usually 1–3 texts a year. Msg &amp; data rates may apply.
            Reply STOP to cancel, HELP for help. See our{" "}
            <Link href="/sms-terms" className="underline hover:text-asphalt">
              SMS terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-asphalt">
              Privacy policy
            </Link>
            .
          </span>

          <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-grey">
            <input
              required
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            I agree to receive text alerts from Trucker HQ about this DOT
            number.
          </label>

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting" || !consent}
            className="w-full"
          >
            {status === "submitting" ? "Sending..." : "Turn on alerts"}
          </Button>
          <FormError message={error} />
        </form>
      )}

      <aside className="flex flex-col gap-4">
        <div className="flex flex-col gap-3.5 rounded-lg bg-asphalt p-6 text-offwhite">
          <span className="font-display text-[15px] font-bold tracking-[.1em] text-amber">
            WHAT A TEXT LOOKS LIKE
          </span>
          <div className="max-w-[340px] rounded-2xl rounded-bl-md bg-[#2A2D32] p-4 text-[15px] leading-relaxed">
            {SAMPLES[lang]}
          </div>
          <span className="text-[13px] text-on-dark-muted">Trucker HQ · today, 7:02 AM</span>
        </div>
        <div className="flex flex-col gap-2.5 rounded-lg border border-border bg-white p-[22px]">
          <h2 className="font-display text-2xl font-extrabold">Why this matters</h2>
          <p className="text-[15px] leading-relaxed text-ink-3">
            If your insurance filing lapses, FMCSA can revoke your authority,
            and brokers stop tendering loads. Most carriers find out when a
            load gets cancelled. A text the same day gives you time to call
            your agent.
          </p>
        </div>
      </aside>
    </div>
  );
}
