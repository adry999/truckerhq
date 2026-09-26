import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { healthColor } from "@/lib/data";

const MIN_JOBS_TO_INDEX = 5;

const STATS = [
  { big: "148", small: "Open jobs" },
  { big: "41", small: "Local jobs" },
  { big: "$0.62–0.74/mi", small: "Typical OTR pay" },
  { big: "$26–32/hr", small: "Typical local pay" },
];

const TYPE_FILTERS = ["All", "Local", "Regional", "OTR"] as const;

type ChicagoJob = {
  title: string;
  company: string;
  loc: string;
  type: "OTR" | "LOCAL" | "REGIONAL";
  equipment: string;
  pay: string;
  home: string;
  posted: string;
};

const CHICAGO_JOBS: ChicagoJob[] = [
  {
    title: "OTR Company Driver",
    company: "Carpathian Freight",
    loc: "Des Plaines, IL",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.68–0.72/mi",
    home: "Home every 2 weeks",
    posted: "Today",
  },
  {
    title: "Local Intermodal Driver",
    company: "Lakeshore Drayage",
    loc: "Chicago, IL",
    type: "LOCAL",
    equipment: "CONTAINER",
    pay: "$1,500/wk",
    home: "Home daily",
    posted: "Today",
  },
  {
    title: "Regional Reefer Driver",
    company: "Volga Line Transport",
    loc: "Joliet, IL",
    type: "REGIONAL",
    equipment: "REEFER",
    pay: "$1,750/wk",
    home: "Home weekly",
    posted: "1 day ago",
  },
  {
    title: "Team Drivers, Coast to Coast",
    company: "Iron Horse Hauling",
    loc: "Elk Grove Village, IL",
    type: "OTR",
    equipment: "DRY VAN",
    pay: "$0.90/mi split",
    home: "Out 3 weeks",
    posted: "1 day ago",
  },
  {
    title: "Local Flatbed, Steel Coils",
    company: "Prairie Steel Logistics",
    loc: "Gary, IN",
    type: "LOCAL",
    equipment: "FLATBED",
    pay: "$30/hr",
    home: "Home daily",
    posted: "2 days ago",
  },
  {
    title: "Regional Dry Van, Midwest",
    company: "Danube Road Corp",
    loc: "Bolingbrook, IL",
    type: "REGIONAL",
    equipment: "DRY VAN",
    pay: "$0.66/mi",
    home: "Home weekends",
    posted: "3 days ago",
  },
];

export const metadata: Metadata = {
  title: "CDL Jobs in Chicago, IL: 148 Openings",
  description:
    "Truck driving jobs near Chicago. Pay and home time on every listing. Updated daily.",
  robots:
    CHICAGO_JOBS.length >= MIN_JOBS_TO_INDEX
      ? undefined
      : { index: false, follow: true },
};

const HIRING_CARRIERS = [
  { name: "Carpathian Freight", score: 86, jobs: 12 },
  { name: "Lakeshore Drayage", score: 81, jobs: 9 },
  { name: "Volga Line Transport", score: 74, jobs: 7 },
  { name: "Iron Horse Hauling", score: 68, jobs: 5 },
];

const NEARBY_CITIES = [
  { name: "Joliet", count: 34 },
  { name: "Aurora", count: 22 },
  { name: "Naperville", count: 18 },
  { name: "Elgin", count: 15 },
  { name: "Gary, IN", count: 19 },
  { name: "Rockford", count: 21 },
  { name: "Milwaukee, WI", count: 57 },
];

const FAQS = [
  {
    q: "How much do truck drivers make in Chicago?",
    a: "On current Trucker HQ listings, OTR company drivers out of Chicago are offered $0.62 to $0.74 per mile, and local drivers $26 to $32 per hour. Team and specialized jobs pay more.",
  },
  {
    q: "Are there local CDL jobs with home time every night?",
    a: "Yes. Most local work around Chicago is intermodal drayage from the rail yards, flatbed out of Northwest Indiana, and food distribution. Filter by Local to see only those.",
  },
  {
    q: "Can I apply in Russian?",
    a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
  },
];

export default async function ChicagoJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = params.type ?? "All";

  const filtered = CHICAGO_JOBS.filter((j) => {
    if (type === "All") return true;
    return j.type === type.toUpperCase();
  });

  const chipHref = (t: string) => {
    const sp = new URLSearchParams();
    if (t !== "All") sp.set("type", t);
    const qs = sp.toString();
    return qs ? `/jobs/chicago-il?${qs}` : "/jobs/chicago-il";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href="/jobs" className="text-offwhite">
              CDL jobs
            </Link>
            <span>/</span>
            <span>Illinois</span>
            <span>/</span>
            <span className="text-amber">Chicago</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            CDL jobs in Chicago, IL
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            148 truck driving jobs within 50 miles of Chicago, updated today.
            Chicago is one of the largest freight hubs in the US, with steady
            dry van and intermodal work out of the I-55 and I-80 corridors.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.small} className="flex flex-col gap-1">
                <div className="font-display text-3xl font-extrabold leading-none tabular-nums text-amber sm:text-4xl">
                  {s.big}
                </div>
                <div className="text-[15px] leading-snug text-[#D4D6DA]">
                  {s.small}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {TYPE_FILTERS.map((t) => (
            <Link
              key={t}
              href={chipHref(t)}
              className={`flex h-11 shrink-0 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                type === t
                  ? "bg-asphalt text-offwhite"
                  : "border-[1.5px] border-border bg-white text-asphalt"
              }`}
            >
              {t.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-8 md:col-span-2">
            <div className="flex flex-col gap-4">
              {filtered.map((j) => (
                <Link
                  key={`${j.title}-${j.company}`}
                  href="/jobs"
                  className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[26px] font-extrabold uppercase leading-tight">
                      {j.title}
                    </span>
                    <span className="text-sm text-[#4B5058]">
                      {j.company} · {j.loc} · {j.home}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="flex h-7 items-center rounded-md bg-[#E2F0E8] px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                      {j.type}
                    </span>
                    <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
                      {j.equipment}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[#ECEDEA] pt-3">
                    <span className="font-display text-2xl font-extrabold tabular-nums text-green">
                      {j.pay}
                    </span>
                    <span className="text-[13px] text-grey">{j.posted}</span>
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div className="rounded-lg border border-border bg-white p-10 text-center text-base text-[#4B5058]">
                  No {type} jobs in Chicago right now. Try all jobs, or set up
                  a job alert.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">
                Driving jobs in Chicago: what to know
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {FAQS.map((f) => (
                  <div
                    key={f.q}
                    className="flex flex-col gap-2 rounded-lg border-[1.5px] border-border bg-white p-5"
                  >
                    <h3 className="font-display text-lg font-extrabold leading-tight">
                      {f.q}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5058]">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <h2 className="font-display text-xl font-extrabold uppercase">
                Hiring in Chicago
              </h2>
              <div className="flex flex-col gap-3">
                {HIRING_CARRIERS.map((c) => (
                  <Link
                    key={c.name}
                    href="/tools/carrier-lookup"
                    className="flex items-center justify-between gap-3 border-t border-[#ECEDEA] pt-3 first:border-t-0 first:pt-0 hover:opacity-80"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-extrabold"
                        style={{
                          background: healthColor(c.score),
                          color:
                            c.score >= 60 && c.score < 80
                              ? "#16181B"
                              : "#F7F7F5",
                        }}
                      >
                        {c.score}
                      </span>
                      <span className="text-[15px] font-semibold">
                        {c.name}
                      </span>
                    </span>
                    <span className="text-sm text-grey">{c.jobs} jobs</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <h2 className="font-display text-xl font-extrabold uppercase">
                Nearby cities
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {NEARBY_CITIES.map((c) => (
                  <Link
                    key={c.name}
                    href="#"
                    className="flex h-9 items-center rounded-[10px] border-[1.5px] border-border bg-white px-3 text-sm font-semibold text-asphalt hover:border-green"
                  >
                    {c.name} ({c.count})
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-green">
              <div className="flex flex-col gap-3.5 p-6 text-offwhite">
                <span className="font-display text-2xl font-extrabold uppercase leading-none">
                  Hiring drivers in Chicago?
                </span>
                <span className="text-[15px] leading-relaxed text-[#E3EAE6]">
                  Post a job and reach local CDL drivers.
                </span>
                <Link
                  href="/hire-drivers"
                  className="flex h-12 w-fit items-center rounded-xl bg-amber px-5 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
                >
                  Post a job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
