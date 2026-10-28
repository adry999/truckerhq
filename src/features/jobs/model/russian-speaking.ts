import { JOBS } from "@/features/jobs/data/jobs";
import type { Job } from "@/features/jobs/model/jobs.types";

/** Jobs whose recruiter and dispatcher speak Russian, in the same order as the /jobs board. */
export function russianSpeakingJobs(jobs: readonly Job[] = JOBS): Job[] {
  return jobs.filter((j) => j.russian);
}
