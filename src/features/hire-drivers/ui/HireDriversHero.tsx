import Image from "next/image";
import { buttonClass, Button } from "@/shared/ui/Button";
import { ButtonRow } from "@/shared/ui/ButtonRow";
import { PHONE_DISPLAY, PHONE_HREF } from "@/shared/config/contact";
import { HERO_IMAGE } from "@/features/hire-drivers/data/hire-drivers";

export function HireDriversHero() {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-[22px] px-4 py-16 sm:px-6 md:py-28">
        <h1 className="max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          Hire CDL drivers.
          <br />
          <span className="text-amber">A parked truck makes no money.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-on-dark md:text-xl">
          Post a driver job and get checked CDL drivers calling you. English
          and Russian-speaking drivers, solo and team.
        </p>
        <ButtonRow>
          <Button href="#post" size="lg">
            Post a driver job
          </Button>
          <a href={PHONE_HREF} className={buttonClass({ variant: "outlineLight", size: "lg" })}>
            Call {PHONE_DISPLAY}
          </a>
        </ButtonRow>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
