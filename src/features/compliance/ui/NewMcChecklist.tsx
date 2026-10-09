import Link from "next/link";
import { BEFORE_YOU_HAUL, SHUTDOWN_REASONS } from "@/features/compliance/data/new-mc-checklist";
import { NewMcAudit } from "@/features/compliance/ui/NewMcAudit";
import { NewMcCardGrid } from "@/features/compliance/ui/NewMcCardGrid";
import { NewMcCta } from "@/features/compliance/ui/NewMcCta";
import { NewMcFaq } from "@/features/compliance/ui/NewMcFaq";

export function NewMcChecklist() {
  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href="/tools" className="text-offwhite">Tools</Link>
            <span>/</span>
            <span>New MC Checklist</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            New MC checklist
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Every step for your first 6 months, from getting your USDOT and MC
            number to passing the FMCSA new entrant safety audit.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Before you haul
        </h2>
        <NewMcCardGrid items={BEFORE_YOU_HAUL} dotClassName="bg-amber" />
      </section>

      <NewMcAudit />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Common reasons new MCs get shut down
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
            Most authorities do not lose their MC over a crash. They lose it
            over a missed filing.
          </p>
        </div>
        <NewMcCardGrid items={SHUTDOWN_REASONS} dotClassName="bg-red" />
      </section>

      <NewMcFaq />
      <NewMcCta />
    </>
  );
}
