import { FACTS } from "@/features/contact/data/about";

export function AboutHero() {
  return (
    <section className="bg-asphalt text-offwhite">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-[18px]">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
            A small team that knows trucking
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA]">
            Trucker HQ started in 20XX in City, ST. [Two or three sentences
            in your own words: who started it, why, and who you work with
            today.]
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-white/16 pt-5">
            {FACTS.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#AEB2B8]">{f.label}</span>
                <span className="text-base font-semibold">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-border" />
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
