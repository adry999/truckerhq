"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { Segmented } from "@/components/ui/Segmented";

const TOPICS = ["Dispatch", "Driver job", "Hiring drivers", "Something else"];
const LANGUAGES = ["EN", "RU"] as const;
const LANGUAGE_NAMES: Record<(typeof LANGUAGES)[number], string> = {
  EN: "English",
  RU: "Russian",
};

export default function AboutContactForm() {
  const [topic, setTopic] = useState("Dispatch");
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]>("EN");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const website = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, phone, message, language: lang, website }),
      });
      if (!res.ok) throw new Error("request failed");
      trackEvent("contact_message", { topic });
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
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <h3 className="font-display text-3xl font-extrabold uppercase">
        Ask us to call you
      </h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Topic</span>
        <Segmented options={TOPICS} value={topic} onChange={setTopic} label="Topic" uppercase />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Name (required)</span>
        <input
          required
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-[54px] rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white px-3.5 font-sans text-base outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Phone (required)</span>
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
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
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Truck, lanes, MC number"
          className="rounded-[10px] border-[1.5px] border-[#9CA0A8] bg-white p-3.5 font-sans text-base outline-none"
        />
      </label>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <Segmented
          options={LANGUAGES}
          value={lang}
          onChange={(v) => setLang(v as (typeof LANGUAGES)[number])}
          label="Call me in"
          uppercase
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Call me back"}
      </button>
      {error && (
        <span role="alert" className="text-[13px] font-semibold text-red">
          Something went wrong. Try again in a moment.
        </span>
      )}
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
