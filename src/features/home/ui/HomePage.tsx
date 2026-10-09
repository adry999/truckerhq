import { getCopy, type Locale } from "@/shared/i18n/locale";
import { HOME_COPY } from "@/features/home/data/home-copy";
import type { HomeJobRow } from "@/features/home/model/home-job-rows";
import { HomeHero } from "./HomeHero";
import { HomeFacts } from "./HomeFacts";
import { HomeDispatch } from "./HomeDispatch";
import { HomeTools } from "./HomeTools";
import { HomeSteps } from "./HomeSteps";
import { HomePricing } from "./HomePricing";
import { HomeJobs } from "./HomeJobs";
import { HomeTeam } from "./HomeTeam";
import { HomeQuotes } from "./HomeQuotes";
import { HomeFaq } from "./HomeFaq";

export function HomePage({ lang, jobRows }: { lang: Locale; jobRows: readonly HomeJobRow[] }) {
  const c = getCopy(HOME_COPY, lang);

  return (
    <>
      <HomeHero c={c} />
      <HomeFacts c={c} />
      <HomeDispatch c={c} ru={lang === "RU"} />
      <HomeTools c={c} />
      <HomeSteps c={c} />
      <HomePricing c={c} />
      <HomeJobs c={c} rows={jobRows} />
      <HomeTeam c={c} />
      <HomeQuotes c={c} />
      <HomeFaq c={c} />
    </>
  );
}
