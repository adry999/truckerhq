import { FaqList } from "@/shared/ui/FaqList";
import { NEW_MC_FAQ } from "@/features/compliance/data/new-mc-checklist";

export function NewMcFaq() {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          New MC questions
        </h2>
        <FaqList items={NEW_MC_FAQ} />
      </div>
    </section>
  );
}
