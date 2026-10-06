"use client";

import { useSearchParams } from "next/navigation";
import JobsResults, { type JobWithScore } from "@/components/JobsResults";
import JobsSearchForm from "@/components/JobsSearchForm";

export function JobsResultsFromUrl({ lang, jobs }: { lang: "EN" | "RU"; jobs: JobWithScore[] }) {
  const params = useSearchParams();
  return (
    <JobsResults
      lang={lang}
      jobs={jobs}
      type={params.get("type") ?? "All"}
      equip={params.get("equip") ?? "All"}
      q={(params.get("q") ?? "").trim().toLowerCase()}
    />
  );
}

export function JobsSearchFormFromUrl({ lang }: { lang: "EN" | "RU" }) {
  const params = useSearchParams();
  return <JobsSearchForm lang={lang} q={(params.get("q") ?? "").trim().toLowerCase()} />;
}
