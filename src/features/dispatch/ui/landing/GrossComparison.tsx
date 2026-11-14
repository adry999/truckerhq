"use client";

import { getCopy, type Locale } from "@/shared/i18n/locale";
import { Fragment, useDeferredValue, useState } from "react";
import { GROSS_COMPARISON_COPY } from "@/features/dispatch/data/gross-comparison-copy";

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

const HEAD = "py-2.5 font-display text-sm font-bold tracking-[.12em] text-faint";
const NAME = "border-t border-white/14 py-3.5 text-[15px] leading-snug sm:text-base";
const NUMERIC = "pl-4 text-right sm:pl-6";
const VALUE = `${NUMERIC} border-t border-white/14 py-3.5 font-display text-2xl font-extrabold sm:text-[28px]`;
const MATRIX_HEAD = "whitespace-nowrap p-3 font-display text-[15px] font-extrabold tracking-[.04em] sm:p-4 sm:text-[17px] sm:tracking-[.06em]";
const MATRIX_CELL = "border-t border-divider p-3 text-[13px] leading-snug sm:p-4 sm:text-sm";

export function GrossComparison({ lang = "EN" }: { lang?: Locale }) {
  const [gross, setGross] = useState(8000);
  const deferredGross = useDeferredValue(gross);
  const c = getCopy(GROSS_COMPARISON_COPY, lang);

  const rows = [
    { name: c.tenPercent, week: money(deferredGross * 0.1), year: money(deferredGross * 0.1 * 50) },
    { name: c.eightPercent, week: money(deferredGross * 0.08), year: money(deferredGross * 0.08 * 50) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-[22px] rounded-[10px] bg-[#1F2226] p-6 shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
        <label className="flex flex-col gap-3">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-base font-semibold">
              {c.weeklyGross}
            </span>
            <span className="font-display text-4xl font-extrabold tabular-nums text-amber">
              {money(gross)}
            </span>
          </span>
          <input
            type="range"
            min={3000}
            max={16000}
            step={250}
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            className="h-11 w-full accent-amber [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7"
          />
          <span className="flex justify-between text-[13px] text-[#8A8F98]">
            <span>$3,000</span>
            <span>$16,000</span>
          </span>
        </label>
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] tabular-nums">
          <div className={HEAD}>{c.dispatcherHead}</div>
          <div className={`${HEAD} ${NUMERIC}`}>{c.perWeekHead}</div>
          <div className={`${HEAD} ${NUMERIC}`}>{c.perYearHead}</div>
          {rows.map((r) => (
            <Fragment key={r.name}>
              <div className={NAME}>{r.name}</div>
              <div className={VALUE}>{r.week}</div>
              <div className={VALUE}>{r.year}</div>
            </Fragment>
          ))}
          <div className={`${NAME} font-bold`}>{c.flat}</div>
          <div className={`${VALUE} text-amber`}>$XXX</div>
          <div className={`${VALUE} text-amber`}>$XX,XXX</div>
        </div>
        <div className="text-sm leading-relaxed text-[#AEB2B8]">
          {c.footnote}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] bg-white text-asphalt">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] md:h-full md:grid-rows-[auto] md:auto-rows-fr">
          <div className="bg-surface-muted p-3 sm:p-4" />
          <div className={`${MATRIX_HEAD} bg-surface-muted`}>{c.percentageHead}</div>
          <div className={`${MATRIX_HEAD} bg-green text-offwhite`}>TRUCKER HQ</div>
          {c.rows.map(([k, a, b]) => (
            <Fragment key={k}>
              <div className={`${MATRIX_CELL} font-semibold`}>{k}</div>
              <div className={`${MATRIX_CELL} text-ink-2`}>{a}</div>
              <div className={`${MATRIX_CELL} bg-green-wash font-semibold`}>{b}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
