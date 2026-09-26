import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  CARRIERS,
  STATUS_COLORS,
  healthColor,
  healthTextColor,
  healthLabel,
} from "@/lib/data";
import { searchFmcsaCarriers, fmcsaEnabled } from "@/lib/fmcsa";

export const metadata: Metadata = {
  title: "Carrier Lookup by DOT or MC Number",
  description:
    "Check any carrier or broker: authority, insurance, inspections and crashes, summed up in one Health Score.",
};

const MODES = ["All", "DOT", "MC", "Name"] as const;
const STATUSES = ["All", "ACTIVE", "WARNING", "INACTIVE"] as const;

const FACTORS = [
  { t: "Authority", w: "30 pts", d: "Is the MC active, and how long has it been active?" },
  { t: "Insurance", w: "25 pts", d: "Liability and cargo on file, and how soon it expires." },
  { t: "Inspections", w: "30 pts", d: "Out-of-service rates compared to the national average." },
  { t: "Crashes", w: "15 pts", d: "Reportable crashes in the last 24 months." },
];

const STATES = [
  ["Texas", "48,210", "/carriers/texas"],
  ["California", "71,400", "/carriers/california"],
  ["Florida", "38,900", "/carriers/florida"],
  ["Illinois", "34,600", "/carriers/illinois"],
  ["Georgia", "29,800", "/carriers/georgia"],
  ["New Jersey", "19,300", "/carriers/new-jersey"],
  ["Ohio", "27,500", "/carriers/ohio"],
  ["Pennsylvania", "26,100", "/carriers/pennsylvania"],
];

export default async function CarrierLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const rawQ = params.q ?? "";
  const q = rawQ.trim().toLowerCase().replace(/^(dot|mc)\s*/, "");
  const status = params.status ?? "All";
  const mode = params.mode ?? "All";
  const isSearching = params.q !== undefined;

  const liveResults = isSearching ? await searchFmcsaCarriers(rawQ) : null;
  const usingLiveData = liveResults !== null;

  const matched = usingLiveData
    ? liveResults
    : CARRIERS.filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.dot.includes(q) ||
          c.mc.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q),
      );
  const shown = matched.filter((c) => status === "All" || c.status === status);

  const modeHref = (m: string) => {
    const sp = new URLSearchParams();
    if (m !== "All") sp.set("mode", m);
    const qs = sp.toString();
    return qs ? `/tools/carrier-lookup?${qs}` : "/tools/carrier-lookup";
  };

  const statusHref = (s: string) => {
    const sp = new URLSearchParams({ q: params.q ?? "" });
    if (s !== "All") sp.set("status", s);
    return `/tools/carrier-lookup?${sp.toString()}`;
  };

  const placeholder =
    mode === "DOT"
      ? "DOT number, e.g. 3412897"
      : mode === "MC"
        ? "MC number, e.g. 1182044"
        : mode === "Name"
          ? "Company name"
          : "Search any carrier by DOT, MC or name";

  if (!isSearching) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
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
              action="/tools/carrier-lookup"
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
              {[
                ["DOT 3412897", "3412897"],
                ["MC 1420876", "1420876"],
                ["Freight", "freight"],
              ].map(([label, v]) => (
                <Link
                  key={label}
                  href={`/tools/carrier-lookup?q=${v}`}
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
            {FACTORS.map((f) => (
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
              {STATES.map(([name, count, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="flex h-11 items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[15px] font-semibold hover:border-green"
                >
                  {name}
                  <span className="text-[13px] font-medium text-grey">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <form
            action="/tools/carrier-lookup"
            className="flex max-w-2xl gap-1.5 rounded-lg border-2 border-amber bg-white p-1.5"
          >
            <input
              name="q"
              defaultValue={params.q}
              aria-label="Search carriers"
              placeholder="DOT, MC or name"
              className="min-h-[50px] flex-1 border-0 bg-transparent px-3.5 font-sans text-[17px] text-asphalt outline-none"
            />
            <button
              type="submit"
              className="min-h-[50px] rounded-[10px] bg-amber px-[22px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/tools/carrier-lookup"
              className="flex min-h-9 w-fit items-center font-display text-[17px] font-bold uppercase tracking-[.04em] text-green"
            >
              ← New search
            </Link>
            <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
              {shown.length} carrier{shown.length === 1 ? "" : "s"}
              {params.q ? ` for "${params.q}"` : ""}
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <Link
                key={s}
                href={statusHref(s)}
                className={`flex h-11 items-center gap-2 rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                  status === s
                    ? "border-[1.5px] border-asphalt bg-asphalt text-offwhite"
                    : "border-[1.5px] border-border bg-white text-asphalt"
                }`}
              >
                {s}
                <span className="font-sans text-[13px] font-semibold opacity-75">
                  {matched.filter((c) => s === "All" || c.status === s).length}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="hidden grid-cols-[2.4fr_1fr_1fr_80px_130px_110px] gap-4 bg-asphalt px-5 py-3.5 font-display text-[15px] font-bold tracking-[.1em] text-offwhite md:grid">
            <span>CARRIER</span>
            <span>DOT</span>
            <span>MC</span>
            <span>TRUCKS</span>
            <span>AUTHORITY</span>
            <span className="text-right">HEALTH</span>
          </div>
          {shown.map((c, i) => {
            const sc = STATUS_COLORS[c.status];
            const rowClassName = `grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-[18px] tabular-nums md:grid-cols-[2.4fr_1fr_1fr_80px_130px_110px] md:gap-4 ${
              usingLiveData ? "" : "hover:bg-offwhite"
            } ${i ? "border-t border-[#ECEDEA]" : ""}`;
            const rowContent = (
              <>
                <span className="col-span-2 flex flex-col gap-0.5 md:col-span-1">
                  <span className="text-[17px] font-bold">{c.name}</span>
                  <span className="text-sm text-grey">
                    {c.city}, {c.st}
                  </span>
                </span>
                <span className="hidden text-[15px] md:block">{c.dot}</span>
                <span className="hidden text-[15px] md:block">{c.mc}</span>
                <span className="hidden text-[15px] md:block">{c.trucks || "—"}</span>
                <span>
                  <span
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em]"
                    style={{ background: sc.bg, color: sc.fg }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: sc.dot }} />
                    {c.status}
                  </span>
                </span>
                <span className="flex justify-end">
                  <span className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-border py-0.5 pl-1 pr-1.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full font-display text-base font-extrabold"
                      style={{
                        background: healthColor(c.score),
                        color: c.score >= 60 && c.score < 80 ? "#16181B" : "#F7F7F5",
                      }}
                    >
                      {c.score}
                    </span>
                    <span
                      className="pr-1 font-display text-sm font-extrabold tracking-[.06em]"
                      style={{ color: healthTextColor(c.score) }}
                    >
                      {healthLabel(c.score)}
                    </span>
                  </span>
                </span>
              </>
            );
            // Live FMCSA rows don't have a detail page behind them (only
            // the sample-data profiles do), so they render as plain rows.
            return usingLiveData ? (
              <div key={c.dot || c.slug} className={rowClassName}>
                {rowContent}
              </div>
            ) : (
              <Link key={c.slug} href={`/tools/carrier-lookup/${c.slug}`} className={rowClassName}>
                {rowContent}
              </Link>
            );
          })}
          {shown.length === 0 && (
            <div className="p-10 text-center text-base text-[#4B5058]">
              No carriers found. Try a DOT number, MC number or part of the
              company name.
            </div>
          )}
        </div>
        <div className="text-[13px] text-grey">
          {usingLiveData
            ? "Live data from FMCSA public records."
            : isSearching && fmcsaEnabled()
              ? "No live FMCSA match. Showing sample data instead."
              : "Sample data. Real results come from FMCSA records, updated every 24 hours."}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
