import { CHECKS, STATS, STEPS } from "@/features/hire-drivers/data/hire-drivers";

export function HireDriversStats() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 px-4 py-7 sm:px-6 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <div className="font-display text-4xl font-extrabold text-green">{s.value}</div>
            <div className="text-[15px] leading-snug text-[#3F444B]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HireDriversSteps() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">
        From job post to driver in the seat
      </h2>
      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
        {STEPS.map((s) => (
          <div key={s.number} className="relative flex flex-col gap-3.5">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
              {s.number}
            </div>
            <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
            <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">
              {s.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HireDriversChecks() {
  return (
    <section className="bg-asphalt text-offwhite">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-start md:py-24">
        <div className="flex flex-col gap-[18px]">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
            WHAT WE CHECK
          </div>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            You only talk to drivers who pass
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-[#C9CBCF]">
            Every driver we send has been screened. You still make the final
            call.
          </p>
        </div>
        <div className="overflow-hidden rounded-[10px] bg-white text-asphalt">
          {CHECKS.map((c, i) => (
            <div
              key={c.name}
              className={`flex items-center gap-3.5 px-5 py-4 ${i ? "border-t border-[#ECEDEA]" : ""}`}
            >
              <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#E2F0E8] px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                <span className="h-2 w-2 rounded-full bg-green" />
                CHECKED
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-bold">{c.name}</span>
                <span className="text-sm text-grey">{c.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
