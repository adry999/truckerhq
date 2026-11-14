import { TEAM } from "@/features/contact/data/about";

export function AboutTeam() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Who you&apos;ll talk to
        </h2>
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-4">
          {TEAM.map((p) => (
            <div key={p.name + p.note} className="flex items-center gap-4 sm:flex-col sm:items-stretch sm:gap-3">
              <div className="aspect-[4/5] w-20 shrink-0 rounded-lg bg-border sm:w-auto" />
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold">{p.name}</span>
                <span className="text-[15px] text-[#4B5058]">{p.role}</span>
                <span className="text-sm text-grey">{p.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
