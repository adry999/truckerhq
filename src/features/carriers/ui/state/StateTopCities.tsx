export function StateTopCities({
  stateName,
  topCities,
}: {
  stateName: string;
  topCities: { t: string; count: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <div className="overflow-hidden rounded-lg border-[1.5px] border-border bg-white">
        <div className="px-6 pb-3 pt-6">
          <h2 className="font-display text-3xl font-extrabold uppercase">
            Top {stateName} cities by carriers
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
