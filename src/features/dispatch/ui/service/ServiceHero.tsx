import { PHONE_HREF } from "@/shared/config/contact";
import { Button, buttonClass } from "@/shared/ui/Button";
import { ButtonRow } from "@/shared/ui/ButtonRow";
import type { ServicePage } from "@/features/dispatch/data/service-pages";

export function ServiceHero({ page }: { page: ServicePage }) {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-14 sm:px-6 md:py-24">
        <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{page.eyebrow}</div>
        <h1 className="max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl md:text-7xl">
          {page.h1}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#D4D6DA] md:text-xl">{page.intro}</p>
        <ButtonRow>
          <Button href="/dispatch/start" size="lg">
            Start dispatch
          </Button>
          <a href={PHONE_HREF} className={buttonClass({ variant: "outlineLight", size: "lg" })}>
            Call us
          </a>
        </ButtonRow>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
