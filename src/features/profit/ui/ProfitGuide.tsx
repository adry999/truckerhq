import { getCopy, type Locale } from "@/shared/i18n/locale";
import { PROFIT_COPY } from "../data/profit-copy";
import { GOOD_PER_MILE } from "../model/profit";
import { usd, workedExample } from "../model/example";

export function ProfitGuide({ lang = "EN" }: { lang?: Locale }) {
  const { guide: t, faq } = getCopy(PROFIT_COPY, lang);
  const { inputs, weeklyFixed, result } = workedExample();
  const perMile = (n: number) => `${usd(n)}/mi`;
  const miles = (n: number) => n.toLocaleString("en-US");

  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-14 sm:px-6 md:py-20">
        <p className="text-sm text-grey">{t.updated(t.updatedDate)}</p>
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{t.heading}</h2>
        <p className="text-lg leading-relaxed text-[#4B5058]">{t.intro}</p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          {t.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h3 className="mt-4 font-display text-3xl font-extrabold">{t.exampleHeading}</h3>
        <p className="text-[17px] leading-relaxed text-[#4B5058]">
          {t.exampleText({
            loadPay: usd(inputs.loadPay),
            loadedMiles: miles(inputs.loadedMiles),
            deadheadMiles: String(inputs.deadheadMiles),
            fuelPrice: usd(inputs.fuelPrice),
            mpg: String(inputs.mpg),
            maintenance: usd(inputs.maintenancePerMile),
            tolls: usd(inputs.tolls),
            weeklyFixed: usd(weeklyFixed),
            weekMiles: miles(inputs.weekMiles),
          })}
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          <li>{`${t.totalMiles}: ${miles(result.totalMiles)}`}</li>
          <li>{`${t.fuel}: ${usd(result.fuel)}`}</li>
          <li>{`${t.maintenance}: ${usd(result.maintenance)}`}</li>
          <li>{`${t.tolls}: ${usd(result.tolls)}`}</li>
          <li>{`${t.fixedShare}: ${usd(result.fixed)}`}</li>
          <li>{`${t.totalCost}: ${usd(result.totalCost)}`}</li>
          <li>{`${t.profit}: ${usd(result.profit)}`}</li>
          <li>
            <b>{`${t.perMile}: ${perMile(result.perMile)}`}</b>
          </li>
          <li>{t.rateLine(perMile(result.ratePerLoadedMile), perMile(result.breakEvenPerLoadedMile))}</li>
        </ul>

        <h3 className="mt-4 font-display text-3xl font-extrabold">{t.goodHeading}</h3>
        <p className="text-[17px] leading-relaxed text-[#4B5058]">
          {t.goodBefore}
          <b>{t.goodWord}</b>
          {t.goodMid1(usd(GOOD_PER_MILE))}
          <b>{t.thinWord}</b>
          {t.goodMid2(usd(GOOD_PER_MILE))}
          <b>{t.losingWord}</b>
          {t.goodAfter}
        </p>

        <h3 className="mt-4 font-display text-3xl font-extrabold">{t.faqHeading}</h3>
        <dl className="flex flex-col gap-5">
          {faq.map((f) => (
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
