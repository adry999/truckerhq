"use client";

import { LOCALES, type Locale } from "@/shared/i18n/locale";
import { useState } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { useTurnstile } from "@/shared/hooks/useTurnstile";
import { Button } from "@/shared/ui/Button";
import { Field, TextArea, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { CheckIcon } from "@/shared/ui/icons";
import { Segmented } from "@/shared/ui/Segmented";
import { Turnstile } from "@/shared/ui/Turnstile";

const TOPICS = ["Dispatch", "Driver job", "Hiring drivers", "Something else"];
const LANGUAGE_NAMES: Record<Locale, string> = {
  EN: "English",
  RU: "Russian",
};

export default function AboutContactForm() {
  const [topic, setTopic] = useState("Dispatch");
  const [lang, setLang] = useState<Locale>("EN");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const turnstile = useTurnstile();

  const { status, error, fieldErrors, clearFieldError, onSubmit, successRef } = useFormSubmit({
    endpoint: "/api/contact",
    buildBody: () => ({ topic, name, phone, message, language: lang }),
    onSuccess: () => trackEvent("contact_message", { topic }),
    turnstile,
    knownFields: ["name", "phone", "message"],
  });

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border-[1.5px] border-green bg-green-tint p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green text-offwhite">
          <CheckIcon size={24} />
        </span>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-display text-3xl font-extrabold uppercase leading-tight text-green outline-none"
        >
          Got it
        </h2>
        <span className="text-base leading-relaxed">
          Someone from the team will call you in {LANGUAGE_NAMES[lang]} shortly.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-[18px] rounded-lg border-[1.5px] border-border bg-offwhite p-6"
    >
      <Honeypot />
      <h3 className="font-display text-3xl font-extrabold uppercase">Ask us to call you</h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Topic</span>
        <Segmented options={TOPICS} value={topic} onChange={setTopic} label="Topic" uppercase />
      </div>

      <Field label="Name" required error={fieldErrors.name}>
        <TextInput
          required
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearFieldError("name");
          }}
          placeholder="Your name"
        />
      </Field>

      <Field label="Phone" required error={fieldErrors.phone}>
        <TextInput
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            clearFieldError("phone");
          }}
          placeholder="(XXX) XXX-XXXX"
        />
      </Field>

      <Field label="Anything we should know?" error={fieldErrors.message}>
        <TextArea
          rows={3}
          maxLength={2000}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearFieldError("message");
          }}
          placeholder="Truck, lanes, MC number"
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <Segmented
          options={LOCALES}
          value={lang}
          onChange={(v) => setLang(v as Locale)}
          label="Call me in"
          uppercase
        />
      </div>

      <Turnstile controller={turnstile} />
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting" || !turnstile.ready}
        className="w-full"
      >
        {status === "submitting" ? "Sending..." : "Call me back"}
      </Button>
      <FormError message={error} />
      <span className="text-[13px] text-grey">
        We call back within 15 minutes, day or night. By submitting, you
        agree to receive a call and text about your request at this number.
        Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
        <a href="/sms-terms" className="underline">
          SMS terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy
        </a>
        .
      </span>
    </form>
  );
}
