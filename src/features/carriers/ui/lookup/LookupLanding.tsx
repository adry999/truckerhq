import Link from "next/link";
import { STATE_DIRECTORY } from "@/features/carriers/model/states";
import {
  LOOKUP_PATH,
  MODES,
  RECENT_SEARCHES,
  SCORE_FACTORS,
  modeHref,
  searchPlaceholder,
} from "@/features/carriers/model/lookup";

export function LookupLanding({ mode }: { mode: string }) {
  const placeholder = searchPlaceholder(mode);

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-4xl flex-col gap-[22px] px-4 py-14 sm:px-6 md:py-24">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 items-center rounded-lg bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
              FREE
            </span>
            <span className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              TRUCKER HQ TOOLS · CARRIER LOOKUP
            </span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Check any carrier
            <br />
            in 10 seconds.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Authority, insurance, inspections and crashes from public FMCSA
            data, summed up in one Health Score.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MODES.map((m) => (
              <Link
                key={m}
                href={modeHref(m)}
                className={`flex h-11 items-center rounded-[10px] px-4 font-display text-[17px] font-extrabold tracking-[.06em] ${
                  mode === m ? "bg-amber text-asphalt" : "border border-white/30 text-offwhite"
                }`}
              >
                {m === "Name" ? "NAME" : m.toUpperCase()}
              </Link>
            ))}
          </div>
          <form
            action={LOOKUP_PATH}
            className="flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row"
          >
            <input type="hidden" name="mode" value={mode} />
            <div className="flex min-h-[60px] flex-1 items-center gap-3 px-3.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-asphalt">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                name="q"
                aria-label="Search carriers"
                placeholder={placeholder}
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
          <div className="flex flex-wrap items-center gap-2 gap-y-2 text-sm text-[#AEB2B8]">
            <span>Recent:</span>
            {RECENT_SEARCHES.map(([label, v]) => (
              <Link
                key={label}
                href={`${LOOKUP_PATH}?q=${v}`}
                className="text-offwhite underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-20">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          What the score looks at
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCORE_FACTORS.map((f) => (
            <div key={f.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl font-extrabold uppercase">{f.t}</span>
                <span className="font-display text-xl font-extrabold text-green">{f.w}</span>
              </div>
              <div className="text-[15px] leading-relaxed text-[#4B5058]">{f.d}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-green" />
            <b>80–100</b> Good
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-amber" />
            <b>60–79</b> Watch
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-red" />
            <b>0–59</b> Risk
          </span>
        </div>
        <div className="my-3 h-1 bg-[repeating-linear-gradient(90deg,#16181B_0_28px,transparent_28px_48px)] opacity-15" />
        <div className="flex flex-col gap-3.5">
          <h3 className="font-display text-2xl font-extrabold uppercase">
            Browse carriers by state
          </h3>
          <div className="flex flex-wrap gap-2">
            {STATE_DIRECTORY.map((s) => (
              <Link
                key={s.slug}
                href={`/carriers/${s.slug}`}
                className="flex h-11 items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[15px] font-semibold hover:border-green"
              >
                {s.name}
                <span className="text-[13px] font-medium text-grey">{s.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
