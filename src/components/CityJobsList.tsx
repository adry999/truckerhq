import Link from "next/link";

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

export default function CityJobsList({
  jobs,
  cityName,
  type,
}: {
  jobs: CityJob[];
  cityName: string;
  type: string;
}) {
  const filtered = jobs.filter((j) => {
    if (type === "All") return true;
    return j.type === type.toUpperCase();
  });

  return (
    <>
    <div className="flex flex-col gap-4">
      {filtered.map((j) => (
        <Link
          key={`${j.title}-${j.company}`}
          href="/jobs"
          className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green"
        >
          <div className="flex flex-col gap-1">
            <span className="font-display text-[26px] font-extrabold uppercase leading-tight">
              {j.title}
            </span>
            <span className="text-sm text-[#4B5058]">
              {j.company} · {j.loc} · {j.home}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex h-7 items-center rounded-md bg-[#E2F0E8] px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
              {j.type}
            </span>
            <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
              {j.equipment}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[#ECEDEA] pt-3">
            <span className="font-display text-2xl font-extrabold tabular-nums text-green">
              {j.pay}
            </span>
            <span className="text-[13px] text-grey">{j.posted}</span>
          </div>
        </Link>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-lg border border-border bg-white p-10 text-center text-base text-[#4B5058]">
          No {type} jobs in {cityName} right now. Try all jobs, or
          set up a job alert.
        </div>
      )}
    </div>
    </>
  );
}
