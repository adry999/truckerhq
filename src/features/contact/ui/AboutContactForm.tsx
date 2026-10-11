"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { Button } from "@/shared/ui/Button";
import { Field, TextArea, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { CheckIcon } from "@/shared/ui/icons";
import { Segmented } from "@/shared/ui/Segmented";

const TOPICS = ["Dispatch", "Driver job", "Hiring drivers", "Something else"];
const LANGUAGES = ["EN", "RU"] as const;
type Language = (typeof LANGUAGES)[number];
const LANGUAGE_NAMES: Record<Language, string> = {
  EN: "English",
  RU: "Russian",
};

export default function AboutContactForm() {
  const [topic, setTopic] = useState("Dispatch");
  const [lang, setLang] = useState<Language>("EN");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { status, error, onSubmit } = useFormSubmit({
    endpoint: "/api/contact",
    buildBody: () => ({ topic, name, phone, message, language: lang }),
    onSuccess: () => trackEvent("contact_message", { topic }),
  });

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border-[1.5px] border-green bg-green-tint p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green text-offwhite">
          <CheckIcon size={24} />
        </span>
        <span className="font-display text-3xl font-extrabold uppercase leading-tight text-green">
          Got it
        </span>
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

      <Field label="Name" required>
        <TextInput
          required
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </Field>

      <Field label="Phone" required>
        <TextInput
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(XXX) XXX-XXXX"
        />
      </Field>

      <Field label="Anything we should know?">
        <TextArea
          rows={3}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Truck, lanes, MC number"
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <Segmented
          options={LANGUAGES}
          value={lang}
          onChange={(v) => setLang(v as Language)}
          label="Call me in"
          uppercase
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
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
