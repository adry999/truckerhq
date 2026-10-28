import type { GuideBodyData } from "@/features/guides/data/guide-body";
import { body as whatToCheckOnABroker } from "@/features/guides/data/bodies/what-to-check-on-a-broker-before-you-book";
import { body as doubleBrokering } from "@/features/guides/data/bodies/double-brokering-the-warning-signs";
import { body as ratePerMileVsAllIn } from "@/features/guides/data/bodies/rate-per-mile-vs-all-in-rate-what-brokers-mean";
import { body as whenToTurnDown } from "@/features/guides/data/bodies/when-to-turn-down-a-load";
import { body as factoring } from "@/features/guides/data/bodies/factoring-for-a-new-mc-recourse-vs-non-recourse";
import { body as rateConfirmation } from "@/features/guides/data/bodies/how-to-read-a-rate-confirmation";
import { body as ifta } from "@/features/guides/data/bodies/ifta-quarterly-returns-step-by-step";
import { body as firstLoad } from "@/features/guides/data/bodies/getting-your-first-load-with-a-30-day-mc";
import { body as leasing } from "@/features/guides/data/bodies/leasing-on-vs-running-your-own-authority";
import { body as detention } from "@/features/guides/data/bodies/detention-pay-how-to-get-it-on-the-rate-con";

/** Bodies for the stub guides, keyed by slug. The featured guide has its own component. */
export const GUIDE_BODIES: Record<string, GuideBodyData> = {
  "what-to-check-on-a-broker-before-you-book": whatToCheckOnABroker,
  "double-brokering-the-warning-signs": doubleBrokering,
  "rate-per-mile-vs-all-in-rate-what-brokers-mean": ratePerMileVsAllIn,
  "when-to-turn-down-a-load": whenToTurnDown,
  "factoring-for-a-new-mc-recourse-vs-non-recourse": factoring,
  "how-to-read-a-rate-confirmation": rateConfirmation,
  "ifta-quarterly-returns-step-by-step": ifta,
  "getting-your-first-load-with-a-30-day-mc": firstLoad,
  "leasing-on-vs-running-your-own-authority": leasing,
  "detention-pay-how-to-get-it-on-the-rate-con": detention,
};
