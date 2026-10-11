import { AUDIT_STEPS } from "@/features/compliance/data/new-mc-checklist";

export function NewMcAudit() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
            YOUR FIRST 90 DAYS
          </div>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            The new entrant safety audit
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
            FMCSA monitors every new entrant for 18-24 months and typically
            schedules a safety audit within the first 12 months, often
            inside the first 60 to 90 days. This is the single most
            important thing a new MC needs to be ready for.
          </p>
        </div>
        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
          {AUDIT_STEPS.map((s) => (
            <div key={s.number} className="relative flex flex-col gap-3.5">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                {s.number}
              </div>
              <div className="font-display text-2xl font-extrabold uppercase">{s.title}</div>
              <div className="max-w-[300px] text-base leading-relaxed text-[#3F444B]">
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
