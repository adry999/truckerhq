"use client";

import JobCard from "@/components/JobCard";
import { filterJobsByType } from "@/lib/job-filters";
import { useSearchParam } from "@/shared/hooks/useSearchParam";
import { EmptyState } from "@/shared/ui/EmptyState";

export type CityJob = {
  title: string;
  company: string;
  loc: string;
  type: "OTR" | "LOCAL" | "REGIONAL";
  equipment: string;
  pay: string;
  home: string;
  posted: string;
};

type CityJobsListProps = {
  jobs: CityJob[];
  cityName: string;
};

export function CityJobsListView({ jobs, cityName, type }: CityJobsListProps & { type: string }) {
  const filtered = filterJobsByType(jobs, type);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-grey">Sample listings</span>
      {filtered.map((j) => (
        <JobCard
          key={`${j.title}-${j.company}`}
          href="/jobs"
          title={j.title}
          meta={`${j.company} · ${j.loc} · ${j.home}`}
          pay={j.pay}
          posted={j.posted}
          tags={[
            { label: j.type, variant: "green" },
            { label: j.equipment, variant: "muted" },
          ]}
        />
      ))}
      {filtered.length === 0 && (
        <EmptyState>
          No {type} jobs in {cityName} right now. Try all jobs, or set up a job alert.
        </EmptyState>
      )}
    </div>
  );
}

export default function CityJobsList(props: CityJobsListProps) {
  return <CityJobsListView {...props} type={useSearchParam("type", "All")} />;
}
