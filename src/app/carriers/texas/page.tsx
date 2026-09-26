import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  TEXAS_CARRIERS,
  STATUS_COLORS,
  healthColor,
  healthTextColor,
  healthLabel,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Texas Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Texas, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "48,210", small: "Active for-hire carriers" },
  { big: "1,284", small: "New MCs in the last 30 days" },
  { big: "76", small: "Average Health Score" },
  { big: "3.1", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 41 },
  { t: "Reefer", pct: 19 },
  { t: "Flatbed", pct: 16 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Houston", count: "9,820" },
  { t: "Dallas", count: "7,415" },
  { t: "San Antonio", count: "4,960" },
  { t: "Laredo", count: "3,705" },
  { t: "Fort Worth", count: "3,188" },
  { t: "El Paso", count: "2,634" },
];

export default async function TexasCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  const params = await searchParams;
  const equip = params.equip ?? "All";

  const shown = TEXAS_CARRIERS.filter(
    (c) => equip === "All" || c.equipment === equip,
  );

  const chipHref = (e: string) => {
    const sp = new URLSearchParams();
    if (e !== "All") sp.set("equip", e);
    const qs = sp.toString();
    return qs ? `/carriers/texas?${qs}` : "/carriers/texas";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt="Texas highway with a semi truck at dusk"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.95)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.4)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-[88px]">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href="/tools/carrier-lookup" className="text-offwhite">
              Carrier Lookup
            </Link>
            <span>/</span>
            <span>States</span>
            <span>/</span>
            <span className="text-amber">Texas</span>
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="flex h-14 min-w-[72px] items-center justify-center rounded-[10px] border-2 border-offwhite bg-green px-3 font-display text-[34px] font-extrabold">
              TX
            </span>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              Texas carriers
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Every for-hire interstate carrier based in Texas, from public
            FMCSA data. Search, filter and check any Health Score.
          </p>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 px-4 py-7 sm:px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.small} className="flex flex-col gap-1">
              <div className="font-display text-[44px] font-extrabold leading-none tabular-nums text-green">
                {s.big}
              </div>
              <div className="text-[15px] leading-snug text-[#3F444B]">
                {s.small}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-4 rounded-lg border-[1.5px] border-border bg-white p-6">
          <h2 className="font-display text-3xl font-extrabold uppercase">
            Top equipment types
          </h2>
          <div className="flex flex-col gap-3">
            {EQUIP_STATS.map((e, i) => (
              <div
                key={e.t}
                className="grid grid-cols-[110px_minmax(0,1fr)_48px] items-center gap-3 text-[15px]"
              >
                <span className="font-semibold">{e.t}</span>
                <span className="h-3.5 overflow-hidden rounded bg-[#ECEDEA]">
                  <span
                    className="block h-full rounded"
                    style={{
                      width: `${(e.pct / 41) * 100}%`,
                      background:
                        i === 0 ? "#0E5C3A" : i < 3 ? "#3F7D5E" : "#9CA0A8",
                    }}
                  />
                </span>
                <span className="text-right font-semibold tabular-nums">
                  {e.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border-[1.5px] border-border bg-white">
          <div className="px-6 pb-3 pt-6">
            <h2 className="font-display text-3xl font-extrabold uppercase">
              Top cities
            </h2>
          </div>
          <div className="flex flex-col">
            {TOP_CITIES.map((c, i) => (
              <div
                key={c.t}
                className="flex items-center justify-between gap-3 border-t border-[#ECEDEA] px-6 py-[13px] text-[15px] tabular-nums"
              >
                <span className="flex items-center gap-3">
                  <span className="w-[26px] font-display text-lg font-extrabold text-grey">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{c.t}</span>
                </span>
                <span>
                  <b>{c.count}</b> <span className="text-grey">carriers</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-[18px] px-4 py-8 sm:px-6 md:pb-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
            Texas carrier list
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {EQUIPMENT.map((e) => (
              <Link
                key={e}
                href={chipHref(e)}
                className={`flex h-11 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                  equip === e
                    ? "border-[1.5px] border-asphalt bg-asphalt text-offwhite"
                    : "border-[1.5px] border-border bg-white text-asphalt"
                }`}
              >
                {e.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="hidden grid-cols-[2.2fr_1fr_1.2fr_80px_130px_110px] gap-4 bg-asphalt px-5 py-3.5 font-display text-[15px] font-bold tracking-[.1em] text-offwhite md:grid">
            <span>CARRIER</span>
            <span>DOT</span>
            <span>EQUIPMENT</span>
            <span>TRUCKS</span>
            <span>AUTHORITY</span>
            <span className="text-right">HEALTH</span>
          </div>
          {shown.map((c, i) => {
            const sc = STATUS_COLORS[c.status];
            return (
              <Link
                key={c.dot}
                href="/tools/carrier-lookup"
                className={`grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-[18px] tabular-nums hover:bg-offwhite md:grid-cols-[2.2fr_1fr_1.2fr_80px_130px_110px] md:gap-4 ${
                  i ? "border-t border-[#ECEDEA]" : ""
                }`}
              >
                <span className="col-span-2 flex flex-col gap-0.5 md:col-span-1">
                  <span className="text-[17px] font-bold">{c.name}</span>
                  <span className="text-sm text-grey">
                    {c.city}, TX
                    <span className="md:hidden">
                      {" "}
                      · {c.equipment} · {c.trucks} truck
                      {c.trucks === 1 ? "" : "s"}
                    </span>
                  </span>
                </span>
                <span className="hidden text-[15px] md:block">{c.dot}</span>
                <span className="hidden text-[15px] md:block">
                  {c.equipment}
                </span>
                <span className="hidden text-[15px] md:block">
                  {c.trucks}
                </span>
                <span>
                  <span
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em]"
                    style={{ background: sc.bg, color: sc.fg }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: sc.dot }}
                    />
                    {c.status}
                  </span>
                </span>
                <span className="flex justify-end">
                  <span className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-border py-0.5 pl-1 pr-1.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full font-display text-base font-extrabold"
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
                    <span
                      className="pr-1 font-display text-sm font-extrabold tracking-[.06em]"
                      style={{ color: healthTextColor(c.score) }}
                    >
                      {healthLabel(c.score)}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
          {shown.length === 0 && (
            <div className="p-10 text-center text-base text-[#4B5058]">
              No Texas carriers match this filter. Try a different equipment
              type.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-grey">
            Showing {shown.length} of 48,210 · sample data
          </span>
          <Link
            href="/tools/carrier-lookup"
            className="flex h-12 items-center rounded-[10px] border-2 border-asphalt px-5 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-asphalt hover:text-offwhite"
          >
            Search all Texas carriers
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[10px] bg-green p-1.5">
            <div className="flex h-full flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6 text-offwhite">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                TEXAS OWNER-OPERATOR?
              </div>
              <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
                Flat dispatch out of Texas
              </div>
              <div className="flex-1 text-base leading-relaxed text-[#E3EAE6]">
                We know the Texas triangle, the border freight out of Laredo
                and the reefer lanes to the Southeast. One flat price per
                week.
              </div>
              <Link
                href="/dispatch"
                className="flex h-14 w-fit items-center rounded-xl bg-amber px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                See dispatch
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3.5 rounded-[10px] bg-asphalt p-6 text-offwhite shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
              HIRING IN TEXAS?
            </div>
            <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
              Find CDL drivers near you
            </div>
            <div className="flex-1 text-base leading-relaxed text-[#C9CBCF]">
              Post a job and reach drivers in Houston, Dallas and San
              Antonio. We check CDL and MVR before you call.
            </div>
            <Link
              href="/hire-drivers"
              className="flex h-14 w-fit items-center rounded-xl border-2 border-offwhite px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              Hire drivers
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
