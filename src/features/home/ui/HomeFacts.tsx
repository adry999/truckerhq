import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeFacts({ c }: { c: HomeCopy }) {
  return (
    <section className="border-b border-border bg-offwhite">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-4 px-4 py-5 sm:px-6 md:grid-cols-4">
        {c.facts.map((f) => (
          <div key={f.k} className="flex flex-col gap-0.5">
            <span className="text-[13px] text-grey">{f.k}</span>
            <span className="text-base font-semibold">{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
