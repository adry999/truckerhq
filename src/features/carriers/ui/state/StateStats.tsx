export function StateStats({ stats }: { stats: { big: string; small: string }[] }) {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 px-4 py-7 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.small} className="flex flex-col gap-1">
            <div className="font-display text-[44px] font-extrabold leading-none tabular-nums text-green">
              {s.big}
            </div>
            <div className="text-[15px] leading-snug text-[#3F444B]">
              {s.small}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
