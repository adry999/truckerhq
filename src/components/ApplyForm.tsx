"use client";

import { useState, type FormEvent } from "react";

export default function ApplyForm({ company, jobSlug }: { company: string; jobSlug: string }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cdlClass, setCdlClass] = useState("A");
  const [experience, setExperience] = useState("1+ yr");
  const [language, setLanguage] = useState("EN");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobSlug, fullName, phone, cdlClass, experience, language }),
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
      <div className="flex flex-col gap-3 p-6">
        <span className="flex w-fit items-center gap-1.5 rounded-lg bg-[#E2F0E8] px-3 py-1 font-display text-base font-extrabold tracking-[.08em] text-green">
          <span className="h-2 w-2 rounded-full bg-green" />
          SENT
        </span>
        <span className="font-display text-3xl font-extrabold uppercase leading-tight">
          Application sent
        </span>
        <span className="text-[15px] leading-relaxed text-[#4B5058]">
          {company} will call you within one business day. Keep your phone on.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 p-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Full name</span>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          className="h-[52px] rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Phone</span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 555-5555"
          className="h-[52px] rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">CDL class</span>
        <select
          value={cdlClass}
          onChange={(e) => setCdlClass(e.target.value)}
          className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        >
          <option>A</option>
          <option>B</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Experience</span>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        >
          <option>&lt;1 yr</option>
          <option>1+ yr</option>
          <option>2+ yrs</option>
          <option>5+ yrs</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        >
          <option value="EN">English</option>
          <option value="RU">Русский</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-[58px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send application"}
      </button>
      {error && (
        <span className="text-[13px] font-semibold text-red">
          Something went wrong. Try again in a moment.
        </span>
      )}
      <span className="text-[13px] leading-relaxed text-grey">
        A recruiter calls you back within one business day. We never share
        your number without asking.
      </span>
    </form>
  );
}
