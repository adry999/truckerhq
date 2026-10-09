"use client";

import { type JOBS } from "@/lib/data";
import { filterJobsByType } from "@/lib/job-filters";
import { JOBS_COPY } from "@/lib/jobs-copy";
import { useSearchParam } from "@/shared/hooks/useSearchParam";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChips } from "@/shared/ui/FilterChips";
import JobCard from "@/components/JobCard";

const TYPES = ["All", "OTR", "REGIONAL", "LOCAL", "TEAM", "OWNER-OP"] as const;
const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

export type JobWithScore = (typeof JOBS)[number] & { score: number };

type JobsResultsProps = {
  lang: "EN" | "RU";
  jobs: JobWithScore[];
};

export function JobsResultsView({
  lang,
  jobs,
  type,
  equip,
  q,
}: JobsResultsProps & { type: string; equip: string; q: string }) {
  const c = JOBS_COPY[lang];

  const filtered = filterJobsByType(jobs, type).filter((j) => {
    if (equip !== "All" && j.equipment !== equip) return false;
    if (q && !(j.company + j.loc + j.title).toLowerCase().includes(q)) return false;
    return true;
  });

  const current: Record<string, string> = {};
  if (type !== "All") current.type = type;
  if (equip !== "All") current.equip = equip;
  if (q) current.q = q;

  return (
    <>
      <div className="flex flex-col gap-3">
        <FilterChips
          param="type"
          options={TYPES}
          current={current}
          basePath={c.basePath}
          label={c.jobTypeLabel}
          showLabel
        />
        <FilterChips
          param="equip"
          options={EQUIPMENT}
          current={current}
          basePath={c.basePath}
          label={c.equipmentLabel}
          showLabel
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">{c.countLabel(filtered.length)}</h2>
        <span className="text-sm text-grey">
          {c.newestFirst} · {lang === "RU" ? "примеры вакансий" : "sample listings"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((j) => (
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
              ...(j.russian ? [{ label: c.ruSpokenBadge, variant: "outline" as const }] : []),
            ]}
          />
        ))}
      </div>

      {filtered.length === 0 && <EmptyState>{c.noResultsText}</EmptyState>}
    </>
  );
}

export default function JobsResults(props: JobsResultsProps) {
  const type = useSearchParam("type", "All");
  const equip = useSearchParam("equip", "All");
  const q = useSearchParam("q", "").trim().toLowerCase();
  return <JobsResultsView {...props} type={type} equip={equip} q={q} />;
}
