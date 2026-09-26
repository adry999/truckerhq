"use client";

import { useState, type FormEvent } from "react";

const POSITIONS = ["OTR", "Regional", "Local", "Team", "Owner-op"];
const EQUIPMENT = ["Dry van", "Reefer", "Flatbed", "Power only"];
const LANGUAGES = ["Any", "English", "Russian"];

const FIELDS = [
  ["companyName", "Company name", "Your company", "text"],
  ["dotNumber", "DOT number", "6–8 digits", "text"],
  ["contactName", "Your name", "Who we call", "text"],
  ["phone", "Phone", "(555) 555-5555", "tel"],
  ["pay", "Pay", "e.g. $0.70/mi or $1,800/wk", "text"],
  ["homeBase", "Home base", "City, state", "text"],
] as const;

type FieldKey = (typeof FIELDS)[number][0];

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`h-[50px] flex-1 basis-[110px] rounded-[10px] font-display text-[17px] font-extrabold tracking-[.05em] ${
            value === o
              ? "border-[1.5px] border-green bg-green text-offwhite"
              : "border-[1.5px] border-[#9CA0A8] bg-white text-asphalt"
          }`}
        >
          {o.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/hire-drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          position: pos,
          equipment: eq,
          driverLanguage: lang,
        }),
      });
      if (!res.ok) throw new Error("request failed");
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
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(([key, label, ph, type]) => (
          <label key={key} className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{label}</span>
            <input
              required
              type={type}
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
        <Segmented options={POSITIONS} value={pos} onChange={setPos} />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Equipment</span>
        <Segmented options={EQUIPMENT} value={eq} onChange={setEq} />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Driver language</span>
        <Segmented options={LANGUAGES} value={lang} onChange={setLang} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send job"}
      </button>
      {error && (
        <span className="text-[13px] font-semibold text-red">
          Something went wrong. Try again in a moment.
        </span>
      )}
      <span className="text-[13px] text-grey">
        We check your DOT and call you to confirm before the job goes live.
      </span>
    </form>
  );
}
