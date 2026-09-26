"use client";

import { useState, type FormEvent } from "react";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, phone, message, language: lang }),
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
      onSubmit={handleSubmit}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white px-3.5 font-sans text-base outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Phone</span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(XXX) XXX-XXXX"
          className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white px-3.5 font-sans text-base outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Anything we should know?</span>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
        disabled={submitting}
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Call me back"}
      </button>
      {error && (
        <span className="text-[13px] font-semibold text-red">
          Something went wrong. Try again in a moment.
        </span>
      )}
      <span className="text-[13px] text-grey">
        We call back within 15 minutes, day or night.
      </span>
    </form>
  );
}
