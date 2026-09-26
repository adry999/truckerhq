"use client";

import { useState } from "react";

const POSITIONS = ["OTR", "Regional", "Local", "Team", "Owner-op"];
const EQUIPMENT = ["Dry van", "Reefer", "Flatbed", "Power only"];
const LANGUAGES = ["Any", "English", "Russian"];

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
  const [pos, setPos] = useState("OTR");
  const [eq, setEq] = useState("Dry van");
  const [lang, setLang] = useState("Any");
  const [sent, setSent] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-[18px]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["Company name", "Your company", "text"],
          ["DOT number", "6–8 digits", "text"],
          ["Your name", "Who we call", "text"],
          ["Phone", "(555) 555-5555", "tel"],
          ["Pay", "e.g. $0.70/mi or $1,800/wk", "text"],
          ["Home base", "City, state", "text"],
        ].map(([label, ph, type]) => (
          <label key={label} className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{label}</span>
            <input
              required
              type={type}
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
        className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
      >
        Send job
      </button>
      <span className="text-[13px] text-grey">
        We check your DOT and call you to confirm before the job goes live.
      </span>
    </form>
  );
}
