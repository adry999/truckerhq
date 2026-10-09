import Link from "next/link";
import { healthColor } from "@/shared/lib/health-score";
import { Notice } from "@/shared/ui/Notice";
import { DEFAULT_CARRIER_SCORE, jobFacts, jobSections } from "@/features/jobs/model/jobs";
import type { Job, JobCarrier } from "@/features/jobs/model/jobs.types";
import ApplyForm from "./ApplyForm";

export function JobDetail({ job, carrier }: { job: Job; carrier?: JobCarrier }) {
  const score = carrier?.score ?? DEFAULT_CARRIER_SCORE;
  const facts = jobFacts(job);
  const sections = jobSections(job);

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:pb-10">
          <Link
            href="/jobs"
            className="flex min-h-11 w-fit items-center font-display text-[17px] font-bold uppercase tracking-[.04em] text-amber"
          >
            ← All jobs
          </Link>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex h-[30px] items-center rounded-lg bg-amber px-3 font-display text-base font-extrabold tracking-[.08em] text-asphalt">
              {job.type}
            </span>
            <span className="flex h-[30px] items-center rounded-lg border border-white/35 px-3 font-display text-base font-bold tracking-[.08em]">
              {job.equipment.toUpperCase()}
            </span>
            {job.russian && (
              <span className="flex h-[30px] items-center rounded-lg border border-white/35 px-3 font-display text-base font-bold tracking-[.08em]">
                RU SPOKEN
              </span>
            )}
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl md:text-7xl">
            {job.title}
          </h1>
          <div className="text-[17px] text-[#D4D6DA]">
            {job.company} · {job.loc} · Posted {job.posted.toLowerCase()}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-7 sm:px-6 md:grid-cols-[2fr_1fr] md:py-10">
        <div className="flex min-w-0 flex-col gap-5">
          <Notice>
            Sample listing. This job and employer are illustrative. Apply and a
            Trucker HQ recruiter will call you about real openings like it.
          </Notice>
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-white sm:grid-cols-3">
            {facts.map(([k, v, c]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-r border-[#ECEDEA] p-5">
                <span className="font-display text-sm font-bold tracking-[.12em] text-grey">
                  {k}
                </span>
                <span className={`font-display text-[26px] font-extrabold tabular-nums leading-tight ${c}`}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {sections.map((s) => (
            <div key={s.t} className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6">
              <h2 className="font-display text-2xl font-extrabold uppercase">{s.t}</h2>
              <ul className="flex flex-col gap-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-base leading-relaxed">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {carrier && (
            <Link
              href={`/tools/carrier-lookup/${carrier.slug}`}
              className="flex items-center gap-[18px] rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green"
            >
              <div
                className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(${healthColor(score)} ${score}%, #E3E4E0 0)`,
                }}
              >
                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white font-display text-3xl font-extrabold">
                  {score}
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-display text-sm font-bold tracking-[.12em] text-grey">
                  ABOUT THE CARRIER
                </span>
                <span className="text-lg font-bold">{carrier.name}</span>
                <span className="text-sm text-[#4B5058]">
                  DOT {carrier.dot} · {carrier.trucks} trucks · Health Score {score}
                </span>
              </div>
              <span className="font-display text-[17px] font-bold tracking-[.05em] text-green">
                PROFILE →
              </span>
            </Link>
          )}
        </div>

        <aside className="h-fit overflow-hidden rounded-[10px] border-2 border-asphalt bg-white md:sticky md:top-24">
          <div className="flex items-baseline justify-between gap-3 bg-asphalt px-5 py-[18px] text-offwhite">
            <span className="font-display text-2xl font-extrabold uppercase">Apply now</span>
            <span className="text-[13px] text-[#AEB2B8]">2 minutes</span>
          </div>
          <ApplyForm jobSlug={job.slug} />
        </aside>
      </section>
    </>
  );
}
