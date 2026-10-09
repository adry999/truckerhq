"use client";

import { useState } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Field, SelectInput, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";

export default function ApplyForm({ jobSlug }: { jobSlug: string }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cdlClass, setCdlClass] = useState("A");
  const [experience, setExperience] = useState("1+ yr");
  const [language, setLanguage] = useState("EN");

  const { status, error, onSubmit } = useFormSubmit({
    endpoint: "/api/apply",
    buildBody: () => ({ jobSlug, fullName, phone, cdlClass, experience, language }),
    onSuccess: () => trackEvent("job_application", { job_slug: jobSlug }),
  });

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-3 p-6">
        <Badge>
          <span className="h-2 w-2 rounded-full bg-green" />
          SENT
        </Badge>
        <span className="font-display text-3xl font-extrabold uppercase leading-tight">
          Application sent
        </span>
        <span className="text-[15px] leading-relaxed text-ink-2">
          A Trucker HQ recruiter will call you within one business day. Keep your phone on.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5 p-5">
      <Honeypot />
      <Field label="Full name" required>
        <TextInput
          required
          name="fullName"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          placeholder="(555) 555-5555"
        />
      </Field>
      <Field label="CDL class">
        <SelectInput value={cdlClass} onChange={(e) => setCdlClass(e.target.value)}>
          <option>A</option>
          <option>B</option>
        </SelectInput>
      </Field>
      <Field label="Experience">
        <SelectInput value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option>&lt;1 yr</option>
          <option>1+ yr</option>
          <option>2+ yrs</option>
          <option>5+ yrs</option>
        </SelectInput>
      </Field>
      <Field label="Call me in">
        <SelectInput value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="EN">English</option>
          <option value="RU">Русский</option>
        </SelectInput>
      </Field>
      <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" ? "Sending..." : "Send application"}
      </Button>
      <FormError message={error} />
      <span className="text-[13px] leading-relaxed text-grey">
        A recruiter calls you back within one business day. By submitting,
        you agree to receive a call and text about your application at this
        number. Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
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
