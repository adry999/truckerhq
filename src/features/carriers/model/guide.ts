export const LOOKUP_GUIDE_UPDATED = "October 2026";

/** Matches the scoring in `server/fmcsa.ts` and `SCORE_FACTORS`. */
export const LOOKUP_FAQ = [
  {
    q: "What is the Health Score?",
    a: "A 0 to 100 rollup Trucker HQ calculates from public FMCSA data: up to 30 points for authority, 25 for insurance, 30 for inspections and 15 for crashes. It is our own summary, not a score published by FMCSA.",
  },
  {
    q: "Where does the carrier data come from?",
    a: "From FMCSA public records, queried through the FMCSA QCMobile API: operating status, insurance on file, out-of-service rates, crashes and safety rating. When live data is unavailable the page says it is showing sample data.",
  },
  {
    q: "What score counts as good?",
    a: "80 to 100 is Good, 60 to 79 is Watch and 0 to 59 is Risk. A carrier whose authority is not active shows as Inactive, and an active carrier scoring under 70 shows as Warning.",
  },
  {
    q: "Does an unsatisfactory or conditional safety rating change the score?",
    a: "Yes. A carrier with an Unsatisfactory FMCSA safety rating is capped at 40, and one with a Conditional rating is capped at 70, however well it scores on the other factors.",
  },
  {
    q: "Can I search by MC number, DOT number or company name?",
    a: "Yes. Type a DOT number, an MC number (with or without the MC prefix) or part of the company name. Results can be filtered by authority status.",
  },
  {
    q: "Is the Health Score enough to decide whether to book a broker load?",
    a: "No. It is a fast first screen. Before you book, also confirm the MC and DOT numbers on the rate confirmation match the public record, check the insurance expiry date and get the payment terms in writing.",
  },
] as const;
