import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";

export function DispatchSteps({ c }: { c: DispatchCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.stepsHeading}</h2>
      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
        {c.steps.map((s) => (
          <div key={s.n} className="relative flex flex-col gap-3.5">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
              {s.n}
            </div>
            <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
            <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
