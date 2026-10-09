import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { JOBS, CARRIERS } from "@/lib/data";
import { CITY_DIRECTORY } from "@/lib/cities";
import { JOBS_COPY } from "@/lib/jobs-copy";
import JobsResults, { JobsResultsView } from "@/components/JobsResults";
import JobsSearchForm, { JobsSearchFormView } from "@/components/JobsSearchForm";
import { Button } from "@/shared/ui/Button";

function scoreFor(carrierSlug: string) {
  return CARRIERS.find((c) => c.slug === carrierSlug)?.score ?? 75;
}

export default function JobsPageContent({ lang }: { lang: "EN" | "RU" }) {
  const c = JOBS_COPY[lang];
  const ru = lang === "RU";
  const jobs = JOBS.map((j) => ({ ...j, score: scoreFor(j.carrierSlug) }));

  return (
    <div className="flex min-h-screen flex-col">
      {ru ? <SiteHeader lang="RU" enHref="/jobs" ruHref="/ru/jobs" /> : <SiteHeader />}

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            {c.h1Line1}
            <br />
            <span className="text-amber">{c.h1Line2}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-dark">{c.heroBody}</p>
          <Suspense fallback={<JobsSearchFormView lang={lang} q="" />}>
            <JobsSearchForm lang={lang} />
          </Suspense>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-20">
        <Suspense fallback={<JobsResultsView lang={lang} jobs={jobs} type="All" equip="All" q="" />}>
          <JobsResults lang={lang} jobs={jobs} />
        </Suspense>

        <div className="mt-4 flex flex-col gap-3.5">
          <h3 className="font-display text-2xl font-extrabold uppercase">{c.browseByCityHeading}</h3>
          <div className="flex flex-wrap gap-2">
            {CITY_DIRECTORY.map((city) => (
              <Link
                key={city.slug}
                href={`/jobs/${city.slug}`}
                className="flex h-11 items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[15px] font-semibold hover:border-green"
              >
                {city.name}
                <span className="text-[13px] font-medium text-grey">{city.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-green">
          <div className="flex flex-wrap items-center justify-between gap-[18px] p-6 text-offwhite">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
                {c.carriersEyebrow}
              </span>
              <span className="font-display text-[32px] font-extrabold uppercase leading-none">
                {c.carriersHeading}
              </span>
            </div>
            <Button href="/hire-drivers" size="lg">
              {c.hireDriversCta}
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
