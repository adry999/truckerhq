import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeQuotes({ c }: { c: HomeCopy }) {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.quotesHeading}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.quotes.map((q) => (
            <figure key={q.name} className="flex flex-col gap-5 rounded-lg border-[1.5px] border-border bg-offwhite p-6">
              <div className="h-1.5 w-10 rounded-sm bg-amber" />
              <blockquote className="flex-1 text-lg leading-relaxed">
                {c.quoteOpen}
                {q.text}
                {c.quoteClose}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-border" />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-bold">{q.name}</span>
                  <span className="text-sm text-grey">{q.role}</span>
                </div>
                <span className="flex h-[26px] items-center rounded-md border border-[#9CA0A8] px-2 font-display text-sm font-extrabold tracking-[.06em] text-[#3F444B]">
                  {q.lang}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
