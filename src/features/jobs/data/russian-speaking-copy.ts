export type RussianSpeakingSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export const RUSSIAN_SPEAKING_COPY = {
  h1Line1: "Russian-speaking",
  h1Line2: "truck driver jobs",
  heroBody:
    "CDL-A jobs where the recruiter and the dispatcher speak Russian. Read the pay and home time up front, apply in English or Russian, and get a call back in your language.",
  ruLinkLabel: "Читать на русском",
  allJobsLabel: "All CDL jobs",
  listingsHeading: "Jobs with Russian-speaking recruiters and dispatch",
  listingsNote: "sample listings",
  listingsEmpty: "No Russian-speaking openings are listed right now. Browse every open CDL job instead.",
  ruSpokenBadge: "RUSSIAN SPOKEN",
  viewJobLabel: "VIEW JOB",
  sections: [
    {
      heading: "Why a Russian-speaking dispatcher helps",
      paragraphs: [
        "Most of a driver's week is conversation: load details, appointment times, detention, a breakdown at 2 a.m., a question about a settlement line. A dispatcher who speaks your language lets you ask exactly what you mean and get a clear answer the first time.",
      ],
      bullets: [
        "Load details: pickup and delivery windows, lumper fees, reefer set points, and what is in the rate confirmation.",
        "Detention and layovers: how to document waiting time and when it gets paid.",
        "Breakdowns and roadside problems: who to call, what to photograph, how repair and tow costs are handled.",
        "Settlements: what each deduction is and how pay per mile or a percentage turns into your check.",
      ],
    },
    {
      // REVIEW: client to confirm the current FMCSA English-proficiency enforcement wording (out-of-service since 2025) before launch.
      heading: "What still has to be in English",
      paragraphs: [
        "A Russian-speaking company does not change federal rules. FMCSA requires a driver to read and speak English well enough to talk with the public, understand highway traffic signs and signals, respond to official inquiries and make entries on reports and records (49 CFR 391.11(b)(2)). Since 2025, enforcement treats a failed English-proficiency check at a roadside inspection as an out-of-service condition.",
        "In practice, you should be able to hold a short conversation with an inspector, read road signs and fill in logs and inspection reports in English. This is general information, not legal advice. Check the current rules with FMCSA or your carrier's safety department.",
        // REVIEW: client to confirm "most states" for CDL test language; no state-specific policy is claimed.
        "CDL knowledge and skills tests are given in English in most states. Ask your state licensing agency what is offered where you test.",
      ],
    },
    {
      heading: "Job types common for Russian-speaking drivers",
      paragraphs: [
        "The listings above use the same job types as the rest of the board. Which one fits depends on how long you want to be away from home and whether you own a truck.",
      ],
      bullets: [
        "OTR: long hauls across the country, the most miles and the longest stretches away from home.",
        "Regional: one part of the country, usually with home time every week or two.",
        "Team: two drivers share one truck, which keeps it moving most of the day.",
        "Owner-operator lease: you bring your own truck and keep a percentage of each load, and you cover your own costs.",
      ],
    },
    {
      heading: "How to apply",
      paragraphs: [
        "Open any job and fill in the short form. It works in English and in Russian. A recruiter calls you back in your language, usually to confirm your CDL, your experience and the kind of work you want.",
        "Pay, home time and the carrier Health Score are shown on every listing before you apply, so you can compare jobs without a phone call.",
      ],
    },
  ] satisfies RussianSpeakingSection[],
  dispatchHeading: "Own a truck?",
  dispatchBody: "Russian-speaking dispatch for owner-operators at a flat weekly price, not a cut of every load.",
  dispatchEn: "Dispatch for owner-operators",
  dispatchRu: "Диспетчер на русском",
  faqHeading: "Questions drivers ask",
  faq: [
    {
      q: "Are there CDL jobs where the dispatcher speaks Russian?",
      a: "Yes. The listings on this page are marked Russian spoken, which means the recruiter and dispatcher at that carrier speak Russian. Apply in English or Russian and a recruiter calls you back in your language.",
    },
    {
      q: "Do I need to speak English to work as a truck driver in the US?",
      a: "Yes, to a working level. FMCSA requires drivers to read and speak English well enough to talk with the public, understand highway signs, respond to officials and complete reports (49 CFR 391.11(b)(2)). Since 2025, failing an English-proficiency check at a roadside inspection is treated as an out-of-service condition. A Russian-speaking dispatcher helps with everyday questions but does not replace this requirement.",
    },
    {
      q: "Can I take the CDL test in Russian?",
      a: "In most states the CDL knowledge and skills tests are given in English. Check with your state licensing agency to see what is available where you test.",
    },
    {
      q: "Can I apply in Russian?",
      a: "Yes. Every application form works in English and Russian, and a recruiter calls you back in your language.",
    },
    {
      q: "Which job types are available?",
      a: "The board covers OTR, regional, local and team jobs for company drivers, plus owner-operator leases. Open a listing to see pay, home time and the carrier Health Score before you apply.",
    },
    {
      q: "I own my truck. Can I get a Russian-speaking dispatcher?",
      a: "Yes. TruckerHQ offers dispatch for owner-operators in English and Russian at a flat weekly price.",
    },
    {
      q: "Are these listings real openings?",
      a: "The listings on this page are sample listings that show what a posting looks like: pay, home time and carrier score. Open one to apply, and a recruiter will tell you what is open right now.",
    },
  ],
};
