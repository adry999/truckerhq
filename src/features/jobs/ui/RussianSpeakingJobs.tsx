import Link from "next/link";
import { JOBS } from "@/features/jobs/data/jobs";
import { RUSSIAN_SPEAKING_COPY as c } from "@/features/jobs/data/russian-speaking-copy";
import { withCarrierScores } from "@/features/jobs/model/jobs";
import { russianSpeakingJobs } from "@/features/jobs/model/russian-speaking";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FaqList } from "@/shared/ui/FaqList";
import JobCard from "./JobCard";

export function RussianSpeakingJobs({
  carrierScore,
}: {
  carrierScore: (carrierSlug: string) => number | undefined;
}) {
  const jobs = withCarrierScores(russianSpeakingJobs(JOBS), carrierScore);

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-on-dark">
            <Link href="/jobs" className="text-offwhite">
              Jobs
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-amber" aria-current="page">
              Russian-speaking
            </span>
          </nav>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            {c.h1Line1}
            <br />
            <span className="text-amber">{c.h1Line2}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-dark">{c.heroBody}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/ru/jobs" lang="ru" size="lg">
              {c.ruLinkLabel}
            </Button>
            <Button href="/jobs" variant="outlineLight" size="lg">
              {c.allJobsLabel}
            </Button>
          </div>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">{c.listingsHeading}</h2>
          <span className="text-sm text-grey">{c.listingsNote}</span>
        </div>
        {jobs.length === 0 ? (
          <EmptyState>
            {c.listingsEmpty}{" "}
            <Link href="/jobs" className="font-semibold text-green underline underline-offset-4">
              {c.allJobsLabel}
            </Link>
          </EmptyState>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((j) => (
              <JobCard
                key={j.slug}
                href={`/jobs/${j.slug}`}
                title={j.title}
                meta={`${j.company} · ${j.loc}`}
                pay={j.pay}
                payNote={j.payNote}
                posted={`${j.posted} · ${j.experience}`}
                score={j.score}
                healthLabel="Health"
                ctaLabel={c.viewJobLabel}
                tags={[
                  { label: j.type, variant: "green" },
                  { label: j.equipment.toUpperCase(), variant: "muted" },
                  { label: j.home.toUpperCase(), variant: "muted" },
                  { label: c.ruSpokenBadge, variant: "outline" },
                ]}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 pb-10 sm:px-6">
        {c.sections.map((s) => (
          <div key={s.heading} className="flex flex-col gap-3">
            <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
            {"bullets" in s && s.bullets && (
              <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-ink-2">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="rounded-lg bg-green">
          <div className="flex flex-col gap-3.5 p-6 text-offwhite">
            <span className="font-display text-2xl font-extrabold uppercase leading-none">
              {c.dispatchHeading}
            </span>
            <span className="text-[15px] leading-relaxed">{c.dispatchBody}</span>
            <div className="flex flex-wrap gap-3">
              <Button href="/dispatch">{c.dispatchEn}</Button>
              <Button href="/ru/dispatch" lang="ru" variant="outlineLight">
                {c.dispatchRu}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 pb-20 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">{c.faqHeading}</h2>
        <FaqList items={c.faq} />
      </section>
    </>
  );
}
