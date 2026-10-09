import Link from "next/link";
import type { ProfileCta } from "@/features/carriers/model/profile";

export function ProfileSidebar({ cta }: { cta: ProfileCta }) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg bg-green">
        <div className="flex flex-col gap-3.5 p-6 text-offwhite">
          <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
            {cta.eyebrow}
          </div>
          <div className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">
            {cta.title}
          </div>
          <div className="text-[15px] leading-relaxed text-[#E3EAE6]">{cta.body}</div>
          <Link
            href={cta.href}
            className="flex h-14 items-center justify-center rounded-xl bg-amber font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            {cta.btn}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-5">
        <div className="font-display text-xl font-extrabold uppercase">
          Watch this carrier
        </div>
        <div className="text-sm leading-relaxed text-[#4B5058]">
          Get a text if authority, insurance or safety status changes.
        </div>
        <Link
          href="/tools/compliance-alerts"
          className="flex h-12 items-center justify-center rounded-[10px] border-2 border-asphalt font-display text-lg font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
        >
          Set alert
        </Link>
      </div>
    </aside>
  );
}
