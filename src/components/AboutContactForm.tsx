"use client";

import { useState } from "react";

const TOPICS = ["Dispatch", "Driver job", "Hiring drivers", "Something else"];
const LANGUAGES = ["EN", "RU"] as const;
const LANGUAGE_NAMES: Record<(typeof LANGUAGES)[number], string> = {
  EN: "English",
  RU: "Russian",
};

function Segmented({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
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

export default function AboutContactForm() {
  const [topic, setTopic] = useState("Dispatch");
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]>("EN");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border-[1.5px] border-green bg-[#E2F0E8] p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green text-offwhite">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span className="font-display text-3xl font-extrabold uppercase leading-tight text-green">
          Got it
        </span>
        <span className="text-base leading-relaxed">
          Someone from the team will call you in {LANGUAGE_NAMES[lang]}{" "}
          shortly.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-[18px] rounded-lg border-[1.5px] border-border bg-offwhite p-6"
    >
      <h3 className="font-display text-3xl font-extrabold uppercase">
        Ask us to call you
      </h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Topic</span>
        <Segmented options={TOPICS} value={topic} onChange={setTopic} />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Name</span>
        <input
          required
          type="text"
          placeholder="Your name"
          className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white px-3.5 font-sans text-base outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Phone</span>
        <input
          required
          type="tel"
          placeholder="(XXX) XXX-XXXX"
          className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white px-3.5 font-sans text-base outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Anything we should know?</span>
        <textarea
          rows={3}
          placeholder="Truck, lanes, MC number"
          className="rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white p-3.5 font-sans text-base outline-none"
        />
      </label>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <Segmented options={LANGUAGES} value={lang} onChange={(v) => setLang(v as (typeof LANGUAGES)[number])} />
      </div>

      <button
        type="submit"
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
      >
        Call me back
      </button>
      <span className="text-[13px] text-grey">
        We call back within 15 minutes, day or night.
      </span>
    </form>
  );
}
