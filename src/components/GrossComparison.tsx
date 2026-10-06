"use client";

import { Fragment, useDeferredValue, useState } from "react";

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function GrossComparison({ lang = "EN" }: { lang?: "EN" | "RU" }) {
  const [gross, setGross] = useState(8000);
  const deferredGross = useDeferredValue(gross);
  const ru = lang === "RU";

  const rows = [
    { name: ru ? "Диспетчер за 10%" : "10% dispatcher", week: money(deferredGross * 0.1), year: money(deferredGross * 0.1 * 50) },
    { name: ru ? "Диспетчер за 8%" : "8% dispatcher", week: money(deferredGross * 0.08), year: money(deferredGross * 0.08 * 50) },
  ];

  const tableRows: [string, string, string][] = ru
    ? [
        ["Сколько платите", "8–10% с каждого груза", "Одна цена каждую неделю"],
        ["Хорошая неделя", "Платите больше", "Вы оставляете себе больше"],
        ["Цель диспетчера", "Больше выручки, любые мили", "Грузы, которые приносят вам деньги"],
        ["Контракт", "Часто 3–12 месяцев", "Неделя за неделей"],
        ["Проверка брокера", "Иногда", "На каждый груз"],
        ["Язык", "Английский", "Английский и русский"],
      ]
    : [
        ["What you pay", "8–10% of every load", "Same price every week"],
        ["Good week", "You pay more", "You keep more"],
        ["Dispatcher goal", "Bigger gross, any miles", "Loads that make you money"],
        ["Contract", "Often 3–12 months", "Week to week"],
        ["Broker checks", "Sometimes", "Every load"],
        ["Language", "English", "English and Russian"],
      ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-[22px] rounded-[10px] bg-[#1F2226] p-6 shadow-[inset_0_0_0_1.5px_rgba(247,247,245,.14)]">
        <label className="flex flex-col gap-3">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-base font-semibold">
              {ru ? "Ваша выручка в неделю" : "Your weekly gross"}
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
        <div className="grid grid-cols-[1.3fr_1fr_1fr] tabular-nums">
          <div className="py-2.5 font-display text-sm font-bold tracking-[.12em] text-[#8A8F98]">
            {ru ? "ДИСПЕТЧЕР" : "DISPATCHER"}
          </div>
          <div className="py-2.5 text-right font-display text-sm font-bold tracking-[.12em] text-[#8A8F98]">
            {ru ? "В НЕДЕЛЮ" : "PER WEEK"}
          </div>
          <div className="py-2.5 text-right font-display text-sm font-bold tracking-[.12em] text-[#8A8F98]">
            {ru ? "В ГОД" : "PER YEAR"}
          </div>
          {rows.map((r) => (
            <Fragment key={r.name}>
              <div className="border-t border-white/14 py-3.5 text-base">
                {r.name}
              </div>
              <div className="border-t border-white/14 py-3.5 text-right font-display text-[28px] font-extrabold">
                {r.week}
              </div>
              <div className="border-t border-white/14 py-3.5 text-right font-display text-[28px] font-extrabold">
                {r.year}
              </div>
            </Fragment>
          ))}
          <div className="border-t border-white/14 py-3.5 text-base font-bold">
            {ru ? "Trucker HQ фикс" : "Trucker HQ flat"}
          </div>
          <div className="border-t border-white/14 py-3.5 text-right font-display text-[28px] font-extrabold text-amber">
            $XXX
          </div>
          <div className="border-t border-white/14 py-3.5 text-right font-display text-[28px] font-extrabold text-amber">
            $XX,XXX
          </div>
        </div>
        <div className="text-sm leading-relaxed text-[#AEB2B8]">
          {ru
            ? "В году = 50 рабочих недель. Фиксированная цена не меняется — ни в хорошую неделю, ни в плохую."
            : "Per year = 50 working weeks. The flat price stays the same on a good week and a bad week."}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] bg-white text-asphalt">
        <div className="grid grid-cols-[1.1fr_1fr_1fr]">
          <div className="bg-[#EEEFEC] p-4" />
          <div className="bg-[#EEEFEC] p-4 font-display text-[17px] font-extrabold tracking-[.06em]">
            {ru ? "ПРОЦЕНТ" : "PERCENTAGE"}
          </div>
          <div className="bg-green p-4 font-display text-[17px] font-extrabold tracking-[.06em] text-offwhite">
            TRUCKER HQ
          </div>
          {tableRows.map(([k, a, b]) => (
            <Fragment key={k}>
              <div className="border-t border-[#ECEDEA] p-4 text-sm font-semibold">
                {k}
              </div>
              <div className="border-t border-[#ECEDEA] p-4 text-sm leading-snug text-[#4B5058]">
                {a}
              </div>
              <div className="border-t border-[#ECEDEA] bg-[#F2F7F4] p-4 text-sm font-semibold leading-snug">
                {b}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
