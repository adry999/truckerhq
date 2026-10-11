import { FaqList } from "@/shared/ui/FaqList";
import { HIRE_FAQ } from "@/features/hire-drivers/data/hire-drivers";

export function HireDriversFaq() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">
        Hiring questions
      </h2>
      <FaqList items={HIRE_FAQ} />
    </section>
  );
}
