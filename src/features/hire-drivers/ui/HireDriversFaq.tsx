import { HIRE_FAQ } from "@/features/hire-drivers/data/hire-drivers";

export function HireDriversFaq() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">
        Hiring questions
      </h2>
      <div className="flex flex-col border-t-2 border-asphalt">
        {HIRE_FAQ.map((f) => (
          <details key={f.q} className="group border-b border-border">
            <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
              {f.q}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
