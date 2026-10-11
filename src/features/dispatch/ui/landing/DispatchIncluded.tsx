import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";

export function DispatchIncluded({ c }: { c: DispatchCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.includedHeading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.included.map((i) => (
          <div key={i.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
              <span className="font-display text-2xl font-extrabold uppercase leading-tight">{i.t}</span>
            </div>
            <div className="text-[15px] leading-relaxed text-[#4B5058]">{i.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
