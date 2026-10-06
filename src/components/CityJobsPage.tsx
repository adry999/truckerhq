import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { healthColor } from "@/lib/data";
import { CITY_NAME_TO_SLUG } from "@/lib/city-slugs";
import CityTypeChips from "@/components/CityTypeChips";
import CityJobsList, { type CityJob } from "@/components/CityJobsList";
import { CityTypeChipsFromUrl, CityJobsListFromUrl } from "@/components/CityJobsFromUrl";

export type { CityJob };

export type CityJobsPageProps = {
  cityName: string;
  stateName: string;
  heroIntro: string;
  stats: { big: string; small: string }[];
  jobs: CityJob[];
  faqs: { q: string; a: string }[];
  hiringCarriers: { name: string; score: number; jobs: number }[];
  nearbyCities: { name: string; count: number }[];
  basePath: string;
};

export default function CityJobsPage({
  cityName,
  stateName,
  heroIntro,
  stats,
  jobs,
  faqs,
  hiringCarriers,
  nearbyCities,
  basePath,
}: CityJobsPageProps) {
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
            <span>{stateName}</span>
            <span>/</span>
            <span className="text-amber">{cityName}</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            CDL jobs in {cityName}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            {heroIntro}
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4 md:grid-cols-4">
            {stats.map((s) => (
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
        <Suspense fallback={<CityTypeChips basePath={basePath} type="All" />}>
          <CityTypeChipsFromUrl basePath={basePath} />
        </Suspense>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-8 md:col-span-2">
            <Suspense fallback={<CityJobsList jobs={jobs} cityName={cityName} type="All" />}>
              <CityJobsListFromUrl jobs={jobs} cityName={cityName} />
            </Suspense>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">
                Driving jobs in {cityName}: what to know
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {faqs.map((f) => (
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
                Hiring in {cityName}
              </h2>
              <div className="flex flex-col gap-3">
                {hiringCarriers.map((c) => (
                  <Link
                    key={c.name}
                    href={`/tools/carrier-lookup?q=${encodeURIComponent(c.name)}&mode=Name`}
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
                {nearbyCities.map((c) => {
                  const slug = CITY_NAME_TO_SLUG[c.name];
                  const label = `${c.name} (${c.count})`;
                  const className =
                    "flex h-11 items-center rounded-[10px] border-[1.5px] border-border bg-white px-3 text-sm font-semibold text-asphalt";
                  return slug ? (
                    <Link
                      key={c.name}
                      href={`/jobs/${slug}`}
                      className={`${className} hover:border-green`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span key={c.name} className={className}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg bg-green">
              <div className="flex flex-col gap-3.5 p-6 text-offwhite">
                <span className="font-display text-2xl font-extrabold uppercase leading-none">
                  Hiring drivers in {cityName}?
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
