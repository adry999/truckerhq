"use client";

import { useState } from "react";

export default function ApplyForm({ company }: { company: string }) {
  const [sent, setSent] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-3.5 p-5"
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Full name</span>
        <input
          required
          placeholder="Your name"
          className="h-[52px] rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Phone</span>
        <input
          required
          type="tel"
          placeholder="(555) 555-5555"
          className="h-[52px] rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">CDL class</span>
        <select className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none">
          <option>A</option>
          <option>B</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Experience</span>
        <select className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none">
          <option>&lt;1 yr</option>
          <option>1+ yr</option>
          <option>2+ yrs</option>
          <option>5+ yrs</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Call me in</span>
        <select className="h-12 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none">
          <option value="EN">English</option>
          <option value="RU">Русский</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-1 h-[58px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
      >
        Send application
      </button>
      <span className="text-[13px] leading-relaxed text-grey">
        A recruiter calls you back within one business day. We never share
        your number without asking.
      </span>
    </form>
  );
}
