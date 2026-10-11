export function StateBreakdowns({
  equipmentBreakdown,
  topCities,
}: {
  equipmentBreakdown: { t: string; pct: number }[];
  topCities: { t: string; count: string }[];
}) {
  const maxPct = Math.max(...equipmentBreakdown.map((e) => e.pct));

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
      <div className="flex flex-col gap-4 rounded-lg border-[1.5px] border-border bg-white p-6">
        <h2 className="font-display text-3xl font-extrabold uppercase">
          Top equipment types
        </h2>
        <div className="flex flex-col gap-3">
          {equipmentBreakdown.map((e, i) => (
            <div
              key={e.t}
              className="grid grid-cols-[110px_minmax(0,1fr)_48px] items-center gap-3 text-[15px]"
            >
              <span className="font-semibold">{e.t}</span>
              <span className="h-3.5 overflow-hidden rounded bg-[#ECEDEA]">
                <span
                  className="block h-full rounded"
                  style={{
                    width: `${(e.pct / maxPct) * 100}%`,
                    background:
                      i === 0 ? "#0E5C3A" : i < 3 ? "#3F7D5E" : "#9CA0A8",
                  }}
                />
              </span>
              <span className="text-right font-semibold tabular-nums">
                {e.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border-[1.5px] border-border bg-white">
        <div className="px-6 pb-3 pt-6">
          <h2 className="font-display text-3xl font-extrabold uppercase">
            Top cities
          </h2>
        </div>
        <div className="flex flex-col">
          {topCities.map((c, i) => (
            <div
              key={c.t}
              className="flex items-center justify-between gap-3 border-t border-[#ECEDEA] px-6 py-[13px] text-[15px] tabular-nums"
            >
              <span className="flex items-center gap-3">
                <span className="w-[26px] font-display text-lg font-extrabold text-grey">
                  {i + 1}
                </span>
                <span className="font-semibold">{c.t}</span>
              </span>
              <span>
                <b>{c.count}</b> <span className="text-grey">carriers</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
