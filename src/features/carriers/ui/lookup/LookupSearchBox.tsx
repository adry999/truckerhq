"use client";

import { useState } from "react";
import { MODES, SEARCH_PATH, searchPlaceholder } from "@/features/carriers/model/lookup";

// The mode only changes the placeholder, so it lives in client state: the
// landing page stays static and never reads the URL.
export function LookupSearchBox() {
  const [mode, setMode] = useState<string>("All");

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`flex h-11 items-center rounded-[10px] px-4 font-display text-[17px] font-extrabold tracking-[.06em] ${
              mode === m ? "bg-amber text-asphalt" : "border border-white/30 text-offwhite"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      <form
        action={SEARCH_PATH}
        className="flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row"
      >
        <div className="flex min-h-[60px] flex-1 items-center gap-3 px-3.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-asphalt">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            name="q"
            aria-label="Search carriers"
            placeholder={searchPlaceholder(mode)}
            className="min-w-0 flex-1 border-0 bg-transparent font-sans text-lg text-asphalt outline-none"
          />
        </div>
        <button
          type="submit"
          className="min-h-[60px] rounded px-8 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt"
          style={{ background: "var(--color-amber)" }}
        >
          Search
        </button>
      </form>
    </>
  );
}
