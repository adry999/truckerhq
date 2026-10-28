import Link from "next/link";
import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";

export function DispatchEquipment({ c }: { c: DispatchCopy }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">{c.equipmentHeading}</h2>
        <p className="max-w-2xl text-[17px] leading-relaxed text-[#4B5058]">{c.equipmentSub}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {c.equipment.map((e) => (
          <li key={e.href}>
            <Link
              href={e.href}
              className="flex min-h-14 items-center gap-3 rounded-lg border-[1.5px] border-border bg-white px-5 py-3 font-display text-xl font-extrabold uppercase hover:border-asphalt"
            >
              <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
              {e.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
