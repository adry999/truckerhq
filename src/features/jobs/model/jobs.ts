import { JOBS } from "@/features/jobs/data/jobs";
import { CITY_CONTENT, CITY_SLUGS } from "@/features/jobs/data/city-content";
import type { CityContentEntry, Job, JobWithScore } from "@/features/jobs/model/jobs.types";

export const MIN_JOBS_TO_INDEX = 5;

export const DEFAULT_CARRIER_SCORE = 75;

export function findJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}

export function withCarrierScores(
  jobs: readonly Job[],
  carrierScore: (carrierSlug: string) => number | undefined,
): JobWithScore[] {
  return jobs.map((j) => ({ ...j, score: carrierScore(j.carrierSlug) ?? DEFAULT_CARRIER_SCORE }));
}

export type JobsSlug =
  | { kind: "city"; slug: string; city: CityContentEntry }
  | { kind: "job"; job: Job }
  | { kind: "none" };

export function resolveJobsSlug(slug: string): JobsSlug {
  const city = CITY_CONTENT[slug];
  if (city) return { kind: "city", slug, city };
  const job = findJob(slug);
  if (job) return { kind: "job", job };
  return { kind: "none" };
}

export function jobsStaticSlugs(): { slug: string }[] {
  return [...JOBS.map((j) => ({ slug: j.slug })), ...CITY_SLUGS.map((slug) => ({ slug }))];
}

export function jobFacts(job: Job) {
  return [
    ["PAY", job.pay, "text-green"],
    ["WEEKLY", job.payNote, ""],
    ["HOME TIME", job.home, ""],
    ["MILES / WEEK", job.milesPerWeek, ""],
    ["EXPERIENCE", job.experience, ""],
    ["CDL", "Class A", ""],
  ] as const;
}

export function jobSections(job: Job) {
  return [
    {
      t: "The job",
      items: [
        `${job.equipment} freight, ${
          job.type === "LOCAL"
            ? "local routes around " + job.loc
            : "no-touch, mostly drop and hook"
        }`,
        `${job.home}. Home time is in writing before you start.`,
        "Late-model trucks with APU and inverter",
        "Dispatch available 24/7" + (job.russian ? ", English and Russian" : ""),
      ],
    },
    {
      t: "You need",
      items: [
        "Valid Class A CDL",
        `${job.experience} of verifiable experience`,
        "Clean MVR: no major violations in 3 years",
        "Pass DOT drug test and Clearinghouse check",
      ],
    },
    {
      t: "You get",
      items: [
        "Weekly direct deposit",
        "Health, dental and vision after 60 days",
        "Paid orientation and detention pay",
        "Referral bonus $1,000",
      ],
    },
  ];
}
