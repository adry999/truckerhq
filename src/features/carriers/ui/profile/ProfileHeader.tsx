import Link from "next/link";
import { healthColor } from "@/shared/lib/health-score";
import { STATUS_COLORS } from "@/features/carriers/ui/status-colors";
import { isNewMc } from "@/features/carriers/model/profile";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export function ProfileHeader({ carrier: c }: { carrier: Carrier }) {
  const sc = STATUS_COLORS[c.status];

  return (
    <section className="bg-asphalt text-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 md:pb-10">
        <Link
          href="/tools/carrier-lookup"
          className="flex min-h-11 w-fit items-center font-display text-[17px] font-bold uppercase tracking-[.04em] text-amber"
        >
          ← Back to results
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-7">
          <div className="flex min-w-0 flex-1 basis-[420px] flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span
                className="flex h-[30px] items-center gap-1.5 rounded-lg px-3 font-display text-base font-extrabold tracking-[.08em]"
                style={{ background: sc.bg, color: sc.fg }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: sc.dot }} />
                {c.status}
              </span>
              <span className="flex h-[30px] items-center rounded-lg border border-white/35 px-3 font-display text-base font-bold tracking-[.08em]">
                INTERSTATE · FOR-HIRE
              </span>
              {isNewMc(c) && (
                <span className="flex h-[30px] items-center rounded-lg bg-amber px-3 font-display text-base font-extrabold tracking-[.08em] text-asphalt">
                  NEW MC
                </span>
              )}
            </div>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl md:text-7xl">
              {c.name}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-base tabular-nums text-[#D4D6DA]">
              <span>
                DOT <b className="text-offwhite">{c.dot}</b>
              </span>
              <span>
                <b className="text-offwhite">{c.mc}</b>
              </span>
              <span>
                {c.city}, {c.st}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[18px] rounded-[10px] bg-[#1F2226] p-[22px] shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
            <div
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(${healthColor(c.score)} ${c.score}%, #33373D 0)` }}
            >
              <div className="flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full bg-[#1F2226]">
                <span className="font-display text-4xl font-extrabold">{c.score}</span>
                <span className="text-[11px] font-semibold tracking-[.08em] text-[#AEB2B8]">/100</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-sm font-bold tracking-[.14em] text-[#AEB2B8]">
                HEALTH SCORE
              </span>
              <span
                className="font-display text-[30px] font-extrabold leading-none"
                style={{ color: c.score >= 80 ? "#5FD39B" : c.score >= 60 ? "#F2A900" : "#FF7A6B" }}
              >
                {c.score >= 80 ? "GOOD" : c.score >= 60 ? "WATCH" : "RISK"}
              </span>
              <span className="text-[13px] text-[#AEB2B8]">Updated today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
