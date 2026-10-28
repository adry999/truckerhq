import { FaqList } from "@/shared/ui/FaqList";
import type { ServicePage } from "@/features/dispatch/data/service-pages";

export function ServiceFaq({ faq, name }: { faq: ServicePage["faq"]; name: string }) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-20">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{name} dispatch questions</h2>
      <FaqList items={faq} />
    </section>
  );
}
