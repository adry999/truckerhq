"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { Segmented } from "@/shared/ui/Segmented";

const POSITIONS = ["OTR", "Regional", "Local", "Team", "Owner-op"];
const EQUIPMENT = ["Dry van", "Reefer", "Flatbed", "Power only"];
const LANGUAGES = ["Any", "English", "Russian"];

const FIELDS = [
  ["companyName", "Company name", "Your company", "text", "organization"],
  ["dotNumber", "DOT number", "6–8 digits", "text", "off"],
  ["contactName", "Your name", "Who we call", "text", "name"],
  ["phone", "Phone", "(555) 555-5555", "tel", "tel"],
  ["pay", "Pay", "e.g. $0.70/mi or $1,800/wk", "text", "off"],
  ["homeBase", "Home base", "City, state", "text", "address-level2"],
] as const;

type FieldKey = (typeof FIELDS)[number][0];

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
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const website = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/hire-drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          position: pos,
          equipment: eq,
          driverLanguage: lang,
          website,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      trackEvent("hire_driver_post", { position: pos });
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-green bg-[#E2F0E8] p-7">
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(([key, label, ph, type, autoComplete]) => (
          <label key={key} className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{label} (required)</span>
            <input
              required
              type={type}
              name={key}
              autoComplete={autoComplete}
              value={fields[key]}
              onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={ph}
              className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
            />
          </label>
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

      <button
        type="submit"
        disabled={submitting}
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send job"}
      </button>
      {error && (
        <span role="alert" className="text-[13px] font-semibold text-red">
          Something went wrong. Try again in a moment.
        </span>
      )}
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
