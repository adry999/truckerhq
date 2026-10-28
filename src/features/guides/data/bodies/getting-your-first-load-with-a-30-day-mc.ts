import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "A brand-new MC is harder to book on because many brokers want a track record, but you can get your first loads by having every document ready before you call, starting with brokers and shippers that accept new authorities, and keeping your first rates sensible instead of desperate. Your authority must be active, with insurance and your process-agent filing in place, before you can legally haul for hire.",
  sections: [
    {
      heading: "What has to be done before your first load?",
      blocks: [
        {
          type: "p",
          text: "FMCSA only activates operating authority after the application is processed, the required insurance filing is on record, and you have designated process agents (the BOC-3 filing). For general freight in vehicles over 10,001 pounds, the federal minimum public liability coverage is $750,000. Run through the [new MC checklist](/tools/new-mc-checklist) to confirm each item, and watch your deadlines with [compliance alerts](/tools/compliance-alerts).",
        },
        // REVIEW: FMCSA's registration process changed in recent years (single application form, protest period length). Confirm the current steps, waiting period and fee on fmcsa.dot.gov/registration before publishing; do not state a day count until confirmed.
        {
          type: "table",
          head: ["Item", "Why brokers ask", "Ready when"],
          rows: [
            ["Active MC and USDOT number", "They verify authority on FMCSA before they set you up", "Authority shows active on the FMCSA L&I search"],
            ["Insurance certificate (COI)", "Proof of liability and cargo coverage", "Your agent can email a certificate in minutes"],
            ["W-9", "Needed to pay you", "Signed, with your legal name and tax ID"],
            ["Carrier packet or onboarding forms", "Each broker has its own", "You have a template with the same details ready to paste"],
            ["Payment details", "Where to send money", "Bank info, or factoring notice of assignment"],
            ["Safety and equipment info", "Some shippers screen for it", "Truck and trailer details, ELD, and driver qualification file if you have employees"],
          ],
        },
        // REVIEW: Cargo coverage amounts are set by brokers and shippers, not federal rules for general freight. Confirm and do not state a number.
      ],
    },
    {
      heading: "Why is a new authority harder to book on?",
      blocks: [
        {
          type: "p",
          text: "Brokers carry the risk of a carrier failing to show, being unsafe, or being fraudulent. A new MC has no history, so many brokers set a minimum authority age, commonly measured in days or months, and some also ask for a minimum of insurance or safety data. Policies vary by broker, so there is no single rule you can plan around. The practical answer is to call the brokers that accept new authorities and keep the list of requirements for each.",
        },
        // REVIEW: "Minimum authority age" is a common broker practice, not a regulation. No numbers stated on purpose.
      ],
    },
    {
      heading: "Where to find your first loads",
      blocks: [
        {
          type: "list",
          items: [
            "Load boards. Filter for brokers that list as accepting new MCs and verify each one before you book. See [what to check on a broker before you book](/guides/what-to-check-on-a-broker-before-you-book).",
            "Direct shippers and local freight. Smaller shippers near your base often care more about showing up than authority age.",
            "Smaller brokers and regional freight companies. Ask what their new carrier requirements are.",
            "Other carriers with overflow freight, if your contract and authority allow it.",
            "A dispatcher who already has broker relationships. Trucker HQ dispatch works on a flat weekly rate, with no percentage of your load. See [dispatch](/dispatch).",
          ],
        },
      ],
    },
    {
      heading: "Keep your first rates sensible",
      blocks: [
        {
          type: "p",
          text: "A new authority is tempted to take any load at any price. A load that does not cover your costs does not build a business. Know your cost per mile first and work out a walk-away number. The [profit per mile calculator](/tools/profit-per-mile) and [how to tell if a load pays enough](/guides/how-to-tell-if-a-load-pays-enough) cover this.",
        },
        {
          type: "p",
          text: "Cash flow matters just as much. Waiting 30 days for a first payment can hurt, so decide in advance how you will cover fuel and fees. Some new carriers use factoring; read [factoring for a new MC](/guides/factoring-for-a-new-mc-recourse-vs-non-recourse) before you sign anything.",
        },
      ],
    },
    {
      heading: "Plan for the first months",
      blocks: [
        {
          type: "list",
          items: [
            "Expect a safety review. FMCSA monitors new entrants and schedules a safety audit for them. Keep your records current from day one.",
            "File quarterly fuel tax returns on time. See [IFTA quarterly returns, step by step](/guides/ifta-quarterly-returns-step-by-step).",
            "Keep every rate confirmation, bill of lading and proof of delivery. See [how to read a rate confirmation](/guides/how-to-read-a-rate-confirmation).",
            "Build repeat customers. A broker that pays on time and has regular freight is worth more than a one-time high rate.",
          ],
        },
        // REVIEW: New-entrant safety audit timing (months) not verified; 49 CFR 385.308 says "as soon as practicable". Do not state months unless confirmed against Part 385 Subpart D.
      ],
    },
  ],
  faqs: [
    {
      q: "Can I haul loads right after getting my MC number?",
      a: "Only once your authority is active, which requires the application to be processed, the required insurance filing on record, and your process-agent (BOC-3) filing. Check the status on FMCSA's Licensing and Insurance search before you accept any load.",
    },
    {
      q: "How much insurance does a new MC need?",
      a: "For-hire interstate carriers of non-hazardous general freight in vehicles of 10,001 pounds or more need at least $750,000 of public liability coverage under federal rules. Brokers and shippers often ask for more, and for cargo coverage, but those amounts are set by them.",
    },
    {
      q: "Why won't brokers work with my new MC?",
      a: "Many brokers set their own minimum authority age or insurance requirements to manage risk. It is a business policy, not a legal rule, and it varies, so ask each broker for its requirements.",
    },
    {
      q: "Do I need a dispatcher as a new owner-operator?",
      a: "You don't need one, but a dispatcher with broker relationships can save time on finding and negotiating loads. Compare costs carefully and make sure the terms are in writing.",
    },
  ],
  sources: [
    { label: "FMCSA: Registration and operating authority", url: "https://www.fmcsa.dot.gov/registration" },
    { label: "49 CFR 387.9: Financial responsibility, minimum levels (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-A/section-387.9" },
    { label: "49 CFR 385.308: New entrant safety audits (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-385/subpart-D/section-385.308" },
    { label: "FMCSA Licensing and Insurance (L&I) public search", url: "https://li-public.fmcsa.dot.gov/" },
  ],
};
