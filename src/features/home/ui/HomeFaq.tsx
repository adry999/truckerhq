import type { HomeCopy } from "@/features/home/data/home-copy";
import { FaqList } from "@/shared/ui/FaqList";

export function HomeFaq({ c }: { c: HomeCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.faqHeading}</h2>
      <FaqList items={c.faq} />
    </section>
  );
}
