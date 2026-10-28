import { GOOD_PER_MILE } from "../model/profit";
import { PROFIT_FAQ, PROFIT_GUIDE_UPDATED, usd, workedExample } from "../model/example";

export function ProfitGuide() {
  const { inputs, weeklyFixed, result } = workedExample();
  const perMile = (n: number) => `${usd(n)}/mi`;

  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-14 sm:px-6 md:py-20">
        <p className="text-sm text-grey">Updated {PROFIT_GUIDE_UPDATED}</p>
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          How to calculate profit per mile
        </h2>
        <p className="text-lg leading-relaxed text-[#4B5058]">
          Profit per mile is what a load leaves you after every cost, divided by
          all the miles you drove for it, loaded and empty.
        </p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          <li>Total miles = loaded miles + deadhead miles.</li>
          <li>Fuel = total miles ÷ mpg × diesel price.</li>
          <li>Maintenance = maintenance cost per mile × total miles.</li>
          <li>
            Fixed share = (truck payment + trailer payment + insurance + other
            weekly costs + dispatch fee) ÷ miles per week × total miles.
          </li>
          <li>Total cost = fuel + maintenance + tolls + fixed share.</li>
          <li>Profit = load pay − total cost.</li>
          <li>Profit per mile = profit ÷ total miles.</li>
        </ol>

        <h3 className="mt-4 font-display text-3xl font-extrabold">Worked example</h3>
        <p className="text-[17px] leading-relaxed text-[#4B5058]">
          A load pays {usd(inputs.loadPay)} for {inputs.loadedMiles.toLocaleString("en-US")} loaded
          miles, with {inputs.deadheadMiles} miles of deadhead to the pickup. Diesel is{" "}
          {usd(inputs.fuelPrice)} a gallon at {inputs.mpg} mpg, maintenance is{" "}
          {usd(inputs.maintenancePerMile)} a mile, tolls are {usd(inputs.tolls)}, weekly fixed
          costs are {usd(weeklyFixed)} and you run {inputs.weekMiles.toLocaleString("en-US")} miles a week.
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          <li>Total miles: {result.totalMiles.toLocaleString("en-US")}</li>
          <li>Fuel: {usd(result.fuel)}</li>
          <li>Maintenance: {usd(result.maintenance)}</li>
          <li>Tolls: {usd(result.tolls)}</li>
          <li>Fixed share: {usd(result.fixed)}</li>
          <li>Total cost: {usd(result.totalCost)}</li>
          <li>Profit: {usd(result.profit)}</li>
          <li>
            <b>Profit per mile: {perMile(result.perMile)}</b>
          </li>
          <li>
            Rate per loaded mile: {perMile(result.ratePerLoadedMile)}; break-even per loaded
            mile: {perMile(result.breakEvenPerLoadedMile)}
          </li>
        </ul>

        <h3 className="mt-4 font-display text-3xl font-extrabold">
          What&apos;s a good profit per mile?
        </h3>
        <p className="text-[17px] leading-relaxed text-[#4B5058]">
          This calculator rates a load <b>Good</b> at {usd(GOOD_PER_MILE)} or more profit per
          mile, <b>Thin Margin</b> below {usd(GOOD_PER_MILE)}, and <b>Losing Money</b> when the
          load profit is below zero. The cutoff is a rule of thumb. Your own number depends on
          your equipment, lane and what you want to take home.
        </p>

        <h3 className="mt-4 font-display text-3xl font-extrabold">Profit per mile FAQ</h3>
        <dl className="flex flex-col gap-5">
          {PROFIT_FAQ.map((f) => (
            <div key={f.q}>
              <dt className="text-lg font-bold">{f.q}</dt>
              <dd className="mt-1 text-[17px] leading-relaxed text-[#4B5058]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
