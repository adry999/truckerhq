"use client";

import Link from "next/link";
import { useState } from "react";

const DEFAULTS = {
  rate: 2400,
  loaded: 1000,
  dead: 120,
  fuel: 3.85,
  mpg: 6.8,
  maint: 0.18,
  tolls: 40,
  truck: 650,
  trailer: 200,
  ins: 450,
  other: 150,
  dispatch: 0,
  weekMiles: 2500,
};

type Key = keyof typeof DEFAULTS;

function money(v: number, d = 0) {
  return (v < 0 ? "−$" : "$") + Math.abs(v).toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

export default function ProfitCalculator() {
  const [values, setValues] = useState<typeof DEFAULTS>(DEFAULTS);

  const n = (k: Key) => Math.max(0, values[k] || 0);
  const set = (k: Key) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: Number(e.target.value) }));

  const total = n("loaded") + n("dead");
  const rate = n("rate");
  const fuel = n("mpg") ? (total / n("mpg")) * n("fuel") : 0;
  const maint = n("maint") * total;
  const tolls = n("tolls");
  const weekly = n("truck") + n("trailer") + n("ins") + n("other") + n("dispatch");
  const fixed = n("weekMiles") ? (weekly / n("weekMiles")) * total : 0;
  const cost = fuel + maint + tolls + fixed;
  const profit = rate - cost;
  const ppm = total ? profit / total : 0;

  const tone = ppm >= 0.5 ? "#5FD39B" : ppm >= 0 ? "#F2A900" : "#FF7A6B";
  const verdict =
    ppm >= 0.5
      ? { label: "GOOD LOAD", bg: "#E2F0E8", fg: "#0E5C3A", dot: "#0E5C3A" }
      : ppm >= 0
        ? { label: "THIN MARGIN", bg: "#FFF1CC", fg: "#7A5300", dot: "#F2A900" }
        : { label: "LOSING MONEY", bg: "#FBE9E7", fg: "#B42318", dot: "#B42318" };

  const pc = (x: number) => (rate ? Math.max(0, (x / rate) * 100).toFixed(1) + "%" : "0%");
  const bar = [
    ["Fuel", fuel, "#9CA0A8"],
    ["Maintenance", maint, "#6B7280"],
    ["Tolls", tolls, "#4B5058"],
    ["Fixed", fixed, "#C9CBCF"],
    ["Profit", Math.max(0, profit), "#F2A900"],
  ] as const;

  const groups: { t: string; hint: string; fields: [Key, string, string, string, number, string?][] }[] = [
    {
      t: "The load",
      hint: "From the rate con",
      fields: [
        ["rate", "Load pay", "$", "", 50],
        ["loaded", "Loaded miles", "", "mi", 10],
        ["dead", "Deadhead miles", "", "mi", 10, "Empty miles to pickup"],
      ],
    },
    {
      t: "Running costs",
      hint: "Change with every mile",
      fields: [
        ["fuel", "Diesel price", "$", "/ gal", 0.01],
        ["mpg", "Fuel economy", "", "mpg", 0.1],
        ["maint", "Tires & maintenance", "$", "/ mi", 0.01],
        ["tolls", "Tolls & scales", "$", "this load", 5],
      ],
    },
    {
      t: "Fixed weekly costs",
      hint: "Paid even when parked",
      fields: [
        ["truck", "Truck payment", "$", "/ wk", 25],
        ["trailer", "Trailer", "$", "/ wk", 25],
        ["ins", "Insurance", "$", "/ wk", 25],
        ["other", "ELD, permits, phone", "$", "/ wk", 25],
        ["dispatch", "Dispatch fee", "$", "/ wk", 25, "Trucker HQ flat: $XXX / wk"],
        ["weekMiles", "Miles per week", "", "mi", 50, "Spreads fixed costs per mile"],
      ],
    },
  ];

  const lines: { k: string; v: string; strong?: boolean }[] = [
    { k: "Load pay", v: money(rate) },
    { k: "Rate per loaded mile", v: "$" + (n("loaded") ? rate / n("loaded") : 0).toFixed(2) },
    { k: "Fuel", v: "−" + money(fuel) },
    { k: "Tires & maintenance", v: "−" + money(maint) },
    { k: "Tolls & scales", v: "−" + money(tolls) },
    { k: `Fixed costs (${total.toLocaleString()} mi)`, v: "−" + money(fixed) },
    { k: "Profit on this load", v: money(profit), strong: true },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="flex min-w-0 flex-col gap-5">
        {groups.map((g) => (
          <div key={g.t} className="flex flex-col gap-4 rounded-lg border border-border bg-white p-[22px]">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold uppercase">{g.t}</h2>
              <span className="text-[13px] text-grey">{g.hint}</span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {g.fields.map(([key, label, pre, suf, step, note]) => (
                <label key={key} className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="flex h-14 items-center overflow-hidden rounded-[10px] border-[1.5px] border-[#9CA0A8] focus-within:border-green">
                    <span className="pl-3.5 text-[17px] text-grey">{pre}</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={values[key]}
                      onChange={set(key)}
                      step={step}
                      className="h-full min-w-0 flex-1 border-0 px-2 font-sans text-lg font-semibold tabular-nums outline-none"
                    />
                    <span className="whitespace-nowrap pr-3.5 text-sm text-grey">{suf}</span>
                  </span>
                  {note && <span className="text-[13px] text-grey">{note}</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setValues(DEFAULTS)}
          className="flex h-12 w-fit items-center rounded-[10px] border-2 border-asphalt px-5 font-display text-lg font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
        >
          Reset to example
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[10px] bg-asphalt text-offwhite">
          <div className="flex flex-col gap-1.5 px-6 pt-6 pb-5">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-[#AEB2B8]">
              PROFIT PER MILE · ALL MILES
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-8xl font-extrabold tabular-nums" style={{ color: tone }}>
                {money(ppm, 2)}
              </span>
              <span className="font-display text-3xl font-extrabold" style={{ color: tone }}>
                / mi
              </span>
            </div>
            <div
              className="flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 font-display text-[17px] font-extrabold tracking-[.08em]"
              style={{ background: verdict.bg, color: verdict.fg }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: verdict.dot }} />
              {verdict.label}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-6 pb-5">
            <div className="flex h-4 overflow-hidden rounded-md bg-[#33373D]">
              {bar.map(([t, x, c]) => (
                <div key={t} style={{ width: pc(x), background: c }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-[#C9CBCF]">
              {bar.map(([t, , c]) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t border-white/14">
            {lines.map((l, i) => (
              <div
                key={l.k}
                className={`flex justify-between gap-3 px-6 py-3 text-[15px] tabular-nums ${i ? "border-t border-white/8" : ""}`}
              >
                <span className="text-[#C9CBCF]">{l.k}</span>
                <span className="font-semibold" style={{ color: l.strong ? tone : "#F7F7F5" }}>
                  {l.v}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 bg-green px-6 py-5">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
              BREAK-EVEN RATE
            </div>
            <div className="flex flex-wrap items-baseline gap-2.5 tabular-nums">
              <span className="font-display text-4xl font-extrabold">{money(cost)}</span>
              <span className="text-[15px] text-[#DCE6E0]">
                ${(n("loaded") ? cost / n("loaded") : 0).toFixed(2)} per loaded mile
              </span>
            </div>
            <div className="text-sm leading-relaxed text-[#DCE6E0]">
              Below this, the load costs you money.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
          <div className="font-display text-xl font-extrabold uppercase">
            Paying a percentage?
          </div>
          <div className="text-sm leading-relaxed text-[#4B5058]">
            A 10% dispatcher takes <b className="text-asphalt">{money(rate * 0.1)}</b> of this
            load. Our flat weekly price does not change with the rate.
          </div>
          <Link
            href="/dispatch"
            className="flex h-12 items-center justify-center rounded-[10px] bg-amber font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            See flat dispatch
          </Link>
        </div>
      </div>
    </div>
  );
}
