import HireDriversForm from "@/features/hire-drivers/ui/HireDriversForm";
import { HireDriversFaq } from "@/features/hire-drivers/ui/HireDriversFaq";
import { HireDriversHero } from "@/features/hire-drivers/ui/HireDriversHero";
import { HireDriversPlans } from "@/features/hire-drivers/ui/HireDriversPlans";
import {
  HireDriversChecks,
  HireDriversStats,
  HireDriversSteps,
} from "@/features/hire-drivers/ui/HireDriversProcess";

export function HireDrivers() {
  return (
    <>
      <HireDriversHero />
      <HireDriversStats />
      <HireDriversSteps />
      <HireDriversChecks />
      <HireDriversPlans />

      <section id="post" className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Tell us who you need
          </h2>
          <HireDriversForm />
        </div>
      </section>

      <HireDriversFaq />
    </>
  );
}
