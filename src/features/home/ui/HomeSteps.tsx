import type { HomeCopy } from "@/features/home/data/home-copy";
import { Steps } from "@/shared/ui/Steps";

export function HomeSteps({ c }: { c: HomeCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
      <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.stepsHeading}</h2>
      <Steps items={c.steps.map((s) => ({ number: s.n, title: s.title, description: s.desc }))} />
    </section>
  );
}
