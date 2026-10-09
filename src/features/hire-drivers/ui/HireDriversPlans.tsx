import { FULL_RECRUITING_FEATURES, JOB_POST_FEATURES } from "@/features/hire-drivers/data/hire-drivers";

export function HireDriversPlans() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">
        Two ways to hire
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3.5 rounded-[10px] border-[1.5px] border-border bg-white p-6">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-grey">
            DO IT YOURSELF
          </div>
          <div className="font-display text-4xl font-extrabold uppercase">Job post</div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-5xl font-extrabold">$XXX</span>
            <span className="text-[15px] text-[#4B5058]">/ 30 days</span>
          </div>
          <ul className="flex flex-1 flex-col gap-2.5">
            {JOB_POST_FEATURES.map((it) => (
              <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                {it}
              </li>
            ))}
          </ul>
          <a
            href="#post"
            className="flex h-14 items-center justify-center rounded-xl border-2 border-asphalt font-display text-xl font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
          >
            Post a job
          </a>
        </div>
        <div className="flex rounded-[10px] bg-green p-1.5">
          <div className="flex flex-1 flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6 text-offwhite">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
              WE DO IT FOR YOU
            </div>
            <div className="font-display text-4xl font-extrabold uppercase">Full recruiting</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-extrabold">$XXX</span>
              <span className="text-[15px] text-[#DCE6E0]">per driver hired</span>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {FULL_RECRUITING_FEATURES.map((it) => (
                <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                  {it}
                </li>
              ))}
            </ul>
            <a
              href="#post"
              className="flex h-14 items-center justify-center rounded-xl bg-amber font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              Start recruiting
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
