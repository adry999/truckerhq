import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  STATUS_COLORS,
  healthColor,
  healthTextColor,
  healthLabel,
  type StateCarrierRow,
} from "@/lib/data";

export type { StateCarrierRow };

export type StateCarriersPageProps = {
  stateAbbr: string;
  stateName: string;
  heroImage: string;
  heroAlt: string;
  heroDescription: string;
  stats: { big: string; small: string }[];
  equipmentBreakdown: { t: string; pct: number }[];
  topCities: { t: string; count: string }[];
  equipmentOptions: readonly string[];
  carriers: StateCarrierRow[];
  totalCount: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
  basePath: string;
  searchParams: Promise<{ equip?: string }>;
};

export default async function StateCarriersPage({
  stateAbbr,
  stateName,
  heroImage,
  heroAlt,
  heroDescription,
  stats,
  equipmentBreakdown,
  topCities,
  equipmentOptions,
  carriers,
  totalCount,
  dispatchCtaEyebrow,
  dispatchCtaTitle,
  dispatchCtaBody,
  hireCtaBody,
  basePath,
  searchParams,
}: StateCarriersPageProps) {
  const params = await searchParams;
  const equip = params.equip ?? "All";
  const maxPct = Math.max(...equipmentBreakdown.map((e) => e.pct));

  const shown = carriers.filter((c) => equip === "All" || c.equipment === equip);

  const chipHref = (e: string) => {
    const sp = new URLSearchParams();
    if (e !== "All") sp.set("equip", e);
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            loading="eager"
            fetchPriority="high"
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
            <Link href="/carriers" className="text-offwhite">
              States
            </Link>
            <span>/</span>
            <span className="text-amber">{stateName}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="flex h-14 min-w-[72px] items-center justify-center rounded-[10px] border-2 border-offwhite bg-green px-3 font-display text-[34px] font-extrabold">
              {stateAbbr}
            </span>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              {stateName} carriers
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            {heroDescription}
          </p>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 px-4 py-7 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
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
            {equipmentBreakdown.map((e, i) => (
              <div
                key={e.t}
                className="grid grid-cols-[110px_minmax(0,1fr)_48px] items-center gap-3 text-[15px]"
              >
                <span className="font-semibold">{e.t}</span>
                <span className="h-3.5 overflow-hidden rounded bg-[#ECEDEA]">
                  <span
                    className="block h-full rounded"
                    style={{
                      width: `${(e.pct / maxPct) * 100}%`,
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
            {topCities.map((c, i) => (
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
            {stateName} carrier list
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {equipmentOptions.map((e) => (
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
                href={`/tools/carrier-lookup?q=${c.dot}&mode=DOT`}
                className={`grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-[18px] tabular-nums hover:bg-offwhite md:grid-cols-[2.2fr_1fr_1.2fr_80px_130px_110px] md:gap-4 ${
                  i ? "border-t border-[#ECEDEA]" : ""
                }`}
              >
                <span className="col-span-2 flex flex-col gap-0.5 md:col-span-1">
                  <span className="text-[17px] font-bold">{c.name}</span>
                  <span className="text-sm text-grey">
                    {c.city}, {stateAbbr}
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
              No {stateName} carriers match this filter. Try a different
              equipment type.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-grey">
            Showing {shown.length} of {totalCount} · sample data
          </span>
          <Link
            href="/tools/carrier-lookup"
            className="flex h-12 items-center rounded-[10px] border-2 border-asphalt px-5 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-asphalt hover:text-offwhite"
          >
            Search all {stateName} carriers
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[10px] bg-green p-1.5">
            <div className="flex h-full flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6 text-offwhite">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                {dispatchCtaEyebrow}
              </div>
              <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
                {dispatchCtaTitle}
              </div>
              <div className="flex-1 text-base leading-relaxed text-[#E3EAE6]">
                {dispatchCtaBody}
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
              HIRING IN {stateName.toUpperCase()}?
            </div>
            <div className="font-display text-4xl font-extrabold uppercase leading-[0.95]">
              Find CDL drivers near you
            </div>
            <div className="flex-1 text-base leading-relaxed text-[#C9CBCF]">
              {hireCtaBody}
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
