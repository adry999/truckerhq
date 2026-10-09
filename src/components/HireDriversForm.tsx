"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useFormSubmit } from "@/shared/hooks/useFormSubmit";
import { Button } from "@/shared/ui/Button";
import { Field, TextInput } from "@/shared/ui/Field";
import { FormError, Honeypot } from "@/shared/ui/form-bits";
import { Segmented } from "@/shared/ui/Segmented";

const POSITIONS = ["OTR", "Regional", "Local", "Team", "Owner-op"];
const EQUIPMENT = ["Dry van", "Reefer", "Flatbed", "Power only"];
const LANGUAGES = ["Any", "English", "Russian"];

const FIELDS = [
  { key: "companyName", label: "Company name", placeholder: "Your company", type: "text", autoComplete: "organization" },
  { key: "dotNumber", label: "DOT number", placeholder: "6–8 digits", type: "text", autoComplete: "off" },
  { key: "contactName", label: "Your name", placeholder: "Who we call", type: "text", autoComplete: "name" },
  { key: "phone", label: "Phone", placeholder: "(555) 555-5555", type: "tel", autoComplete: "tel" },
  { key: "pay", label: "Pay", placeholder: "e.g. $0.70/mi or $1,800/wk", type: "text", autoComplete: "off" },
  { key: "homeBase", label: "Home base", placeholder: "City, state", type: "text", autoComplete: "address-level2" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

export default function HireDriversForm() {
  const [fields, setFields] = useState<Record<FieldKey, string>>({
    companyName: "",
    dotNumber: "",
    contactName: "",
    phone: "",
    pay: "",
    homeBase: "",
  });
  const [pos, setPos] = useState("OTR");
  const [eq, setEq] = useState("Dry van");
  const [lang, setLang] = useState("Any");

  const { status, error, onSubmit } = useFormSubmit({
    endpoint: "/api/hire-drivers",
    buildBody: () => ({ ...fields, position: pos, equipment: eq, driverLanguage: lang }),
    onSuccess: () => trackEvent("hire_driver_post", { position: pos }),
  });

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-green bg-green-tint p-7">
        <span className="font-display text-3xl font-extrabold uppercase leading-tight text-green">
          Job received
        </span>
        <span className="text-base leading-relaxed">
          We will call you within one business day to confirm the details and
          put your job live.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <Field key={f.key} label={f.label} required>
            <TextInput
              required
              type={f.type}
              name={f.key}
              autoComplete={f.autoComplete}
              value={fields[f.key]}
              onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
            />
          </Field>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Position</span>
        <Segmented options={POSITIONS} value={pos} onChange={setPos} label="Position" uppercase />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Equipment</span>
        <Segmented options={EQUIPMENT} value={eq} onChange={setEq} label="Equipment" uppercase />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Driver language</span>
        <Segmented options={LANGUAGES} value={lang} onChange={setLang} label="Driver language" uppercase />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending..." : "Send job"}
      </Button>
      <FormError message={error} />
      <span className="text-[13px] text-grey">
        We check your DOT and call you to confirm before the job goes live.
        By submitting, you agree to receive a call and text about this job
        post at this number. Msg &amp; data rates may apply. Reply STOP to
        opt out. See{" "}
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
