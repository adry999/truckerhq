"use client";

import { useSearchParams } from "next/navigation";
import CityTypeChips from "@/components/CityTypeChips";
import CityJobsList, { type CityJob } from "@/components/CityJobsList";

export function CityTypeChipsFromUrl({ basePath }: { basePath: string }) {
  const params = useSearchParams();
  return <CityTypeChips basePath={basePath} type={params.get("type") ?? "All"} />;
}

export function CityJobsListFromUrl({ jobs, cityName }: { jobs: CityJob[]; cityName: string }) {
  const params = useSearchParams();
  return <CityJobsList jobs={jobs} cityName={cityName} type={params.get("type") ?? "All"} />;
}
