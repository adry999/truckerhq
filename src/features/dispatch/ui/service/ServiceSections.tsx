import type { ServiceSection } from "@/features/dispatch/data/service-pages";

export function ServiceSections({ sections }: { sections: ServiceSection[] }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-14 sm:px-6 md:py-20">
      {sections.map((s) => (
        <section key={s.heading} className="flex flex-col gap-4">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-[#3F444B]">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="flex flex-col gap-2.5">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-lg leading-snug text-[#3F444B]">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
