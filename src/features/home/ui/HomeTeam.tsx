import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeTeam({ c }: { c: HomeCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <div className="flex max-w-xl flex-col gap-2.5">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.teamHeading}</h2>
        <p className="text-lg leading-relaxed text-[#3F444B]">{c.teamBody}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {c.team.map((p) => (
          <div key={p.name + p.note} className="flex flex-col gap-3">
            <div className="aspect-[4/5] rounded-lg bg-border" />
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-bold">{p.name}</span>
              <span className="text-[15px] text-[#4B5058]">{p.role}</span>
              <span className="text-sm text-grey">{p.note}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
