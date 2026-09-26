export type GuideCategory =
  | "Rates"
  | "Brokers"
  | "Paperwork"
  | "Money"
  | "Starting out";

export type Guide = {
  slug: string;
  title: string;
  category: GuideCategory;
  minutes: number;
  author: string;
  date: string; // ISO date e.g. "2026-10-01"
};

export const GUIDES: Guide[] = [
  { slug: "how-to-tell-if-a-load-pays-enough", title: "How to tell if a load pays enough", category: "Rates", minutes: 6, author: "Dispatcher Name", date: "2026-10-01" },
  { slug: "what-to-check-on-a-broker-before-you-book", title: "What to check on a broker before you book", category: "Brokers", minutes: 4, author: "Dispatcher Name", date: "2026-09-20" },
  { slug: "double-brokering-the-warning-signs", title: "Double brokering: the warning signs", category: "Brokers", minutes: 5, author: "Dispatcher Name", date: "2026-09-15" },
  { slug: "rate-per-mile-vs-all-in-rate-what-brokers-mean", title: "Rate per mile vs. all-in rate: what brokers mean", category: "Rates", minutes: 3, author: "Dispatcher Name", date: "2026-09-10" },
  { slug: "when-to-turn-down-a-load", title: "When to turn down a load", category: "Rates", minutes: 4, author: "Dispatcher Name", date: "2026-09-05" },
  { slug: "factoring-for-a-new-mc-recourse-vs-non-recourse", title: "Factoring for a new MC: recourse vs. non-recourse", category: "Money", minutes: 6, author: "Dispatcher Name", date: "2026-08-28" },
  { slug: "how-to-read-a-rate-confirmation", title: "How to read a rate confirmation", category: "Paperwork", minutes: 5, author: "Dispatcher Name", date: "2026-08-20" },
  { slug: "ifta-quarterly-returns-step-by-step", title: "IFTA quarterly returns, step by step", category: "Paperwork", minutes: 7, author: "Dispatcher Name", date: "2026-08-12" },
  { slug: "getting-your-first-load-with-a-30-day-mc", title: "Getting your first load with a 30-day MC", category: "Starting out", minutes: 6, author: "Dispatcher Name", date: "2026-08-05" },
  { slug: "leasing-on-vs-running-your-own-authority", title: "Leasing on vs. running your own authority", category: "Starting out", minutes: 8, author: "Dispatcher Name", date: "2026-07-28" },
  { slug: "detention-pay-how-to-get-it-on-the-rate-con", title: "Detention pay: how to get it on the rate con", category: "Rates", minutes: 4, author: "Dispatcher Name", date: "2026-07-20" },
];

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
