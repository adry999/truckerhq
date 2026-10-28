import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "Leasing on means your truck runs under another carrier's authority, and that carrier handles authority, insurance filings and freight, usually in exchange for a share of the revenue or a set rate. Running your own authority means you pick freight and keep the margin, but you carry the paperwork, insurance, compliance and cash-flow risk. Choose based on your numbers and how much of the business side you want to run.",
  sections: [
    {
      heading: "What is the difference?",
      blocks: [
        {
          type: "table",
          head: ["Topic", "Lease on to a carrier", "Own authority"],
          rows: [
            ["Whose authority", "The carrier's MC and USDOT number", "Yours"],
            ["Who finds freight", "The carrier or its dispatch, usually", "You or your dispatcher"],
            ["Who pays for liability insurance", "Set in the lease; often the carrier, with deductions to you", "You"],
            ["How you are paid", "Percentage of revenue, per-mile rate or another stated method", "You collect from brokers or shippers, or your factor does"],
            ["Compliance paperwork", "Carrier handles authority-level filings; you handle truck and driver items it assigns you", "You handle all of it"],
            ["Upside", "Lower startup burden, faster to start", "Keep the margin, choose your freight and customers"],
            ["Downside", "Less control; deductions; the carrier's rules", "More paperwork and cash risk; slower start"],
          ],
        },
        // REVIEW: Table rows are generalizations; actual terms vary by carrier and lease. Confirm that "Carrier handles authority-level filings" is stated carefully enough.
      ],
    },
    {
      heading: "What the federal leasing rules require",
      blocks: [
        {
          type: "p",
          text: "When a carrier leases your equipment, the federal Truth-in-Leasing rules in 49 CFR Part 376 require a written lease. Section 376.12 sets minimums. The ones that most affect owner-operators:",
        },
        {
          type: "list",
          items: [
            "The lease must be in writing, signed by both parties, and state its start and end.",
            "The carrier has exclusive possession, control and use of the equipment for the lease term and takes responsibility for operating it.",
            "Your compensation must be stated in the lease or an addendum before any trip, whether it is a percentage of revenue, per-mile or another method.",
            "The lease must say who pays for items such as fuel and fuel taxes, empty mileage, permits, tolls, detention, licenses and loading or unloading.",
            "You must be paid within 15 days of submitting the required delivery documents. The carrier cannot make payment depend on documents beyond those in the lease.",
            "If you are paid a percentage of revenue, the carrier must give you a copy of the rated freight bill, or equivalent, before or at settlement.",
            "Charge-backs to your pay must be listed in the lease, with how they are computed, and you are entitled to copies of supporting documents.",
            "Escrow, if required, must be described in the lease, earn interest, and be returned within 45 days of termination.",
            "You cannot be forced to buy products, equipment or services from the carrier. If you choose to, the terms must be disclosed.",
          ],
        },
        {
          type: "p",
          text: "These rules apply to leased equipment under a lease with an authorized carrier. Read your lease against the list. Anything missing is something to ask about before you sign.",
        },
      ],
    },
    {
      heading: "What running your own authority takes",
      blocks: [
        {
          type: "p",
          text: "You will need a USDOT number and operating authority (an MC number), a process-agent filing, an insurance filing from your insurer, and at least $750,000 of public liability coverage for non-hazardous general freight in vehicles over 10,001 pounds. You also take on fuel tax filings, annual heavy vehicle use tax with the IRS, state registration and permits, drug and alcohol program requirements and a safety record. The [new MC checklist](/tools/new-mc-checklist) lists the items, and [IFTA quarterly returns](/guides/ifta-quarterly-returns-step-by-step) explains one you will do every quarter.",
        },
        {
          type: "p",
          text: "Cash flow matters. Brokers pay on terms, and a new authority may wait 30 days or more for pay. See [factoring for a new MC](/guides/factoring-for-a-new-mc-recourse-vs-non-recourse) and [getting your first load with a 30-day MC](/guides/getting-your-first-load-with-a-30-day-mc).",
        },
      ],
    },
    {
      heading: "How to compare them with your own numbers",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Work out your cost per mile on your own authority, including insurance, IFTA, compliance and the time you spend on paperwork.",
            "Ask the carrier for a sample settlement sheet from a real month: gross, deductions, fuel, escrow, net.",
            "Compare net per mile and net per week, not the headline percentage.",
            "Add a margin for risk: a slow-paying broker month, a breakdown, an insurance renewal.",
            "Decide how much of the business side you want to do or pay someone to do.",
          ],
        },
        {
          type: "p",
          text: "The [profit per mile calculator](/tools/profit-per-mile) handles the per-mile math. If you run your own authority and want help with freight, see [dispatch](/dispatch): a flat weekly rate, not a cut of each load.",
        },
      ],
    },
    {
      heading: "Questions to ask before you lease on",
      blocks: [
        {
          type: "list",
          items: [
            "How is pay calculated, and can I see a sample settlement?",
            "Which charge-backs and deductions apply, and how are they calculated?",
            "Is escrow required, and when is it returned?",
            "Who pays for liability, cargo and bobtail insurance, and what is deducted from me?",
            "How long is the lease, and what are the notice and termination terms?",
            "Who pays detention, tolls, permits and empty miles?",
            "Can I haul for others while leased, or am I exclusive?",
          ],
        },
        // REVIEW: Last question is about exclusivity; 376.12(c) gives the carrier exclusive possession during the lease term. Confirm phrasing.
      ],
    },
  ],
  faqs: [
    {
      q: "Is it better to lease on or get your own MC?",
      a: "Neither is better for everyone. Leasing on has a lower startup burden but less control and deductions from your pay. Your own authority has higher margin potential but means you carry insurance, compliance and cash-flow risk. Compare net per mile from real settlement sheets and your own cost per mile.",
    },
    {
      q: "What does the federal lease agreement have to include?",
      a: "Under 49 CFR 376.12 the lease must be in writing and signed, state its term, give the carrier exclusive possession and control, state your compensation, list charge-backs, set out insurance and escrow terms, and provide payment within 15 days of delivery documents.",
    },
    {
      q: "How quickly must a carrier pay a leased owner-operator?",
      a: "Within 15 days after you submit the delivery documents the lease requires, under 49 CFR 376.12(f). The carrier cannot make payment contingent on documents beyond those specified in the lease.",
    },
    {
      q: "How much insurance do I need on my own authority?",
      a: "For-hire interstate carriers of non-hazardous property in vehicles of 10,001 pounds or more need at least $750,000 of public liability coverage. Cargo and other coverage is a business and customer requirement rather than a federal minimum for general freight.",
    },
  ],
  sources: [
    { label: "49 CFR 376.12: Written lease requirements (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376/section-376.12" },
    { label: "49 CFR 387.9: Financial responsibility, minimum levels (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-A/section-387.9" },
    { label: "FMCSA: Registration and operating authority", url: "https://www.fmcsa.dot.gov/registration" },
    { label: "IRS: Heavy Highway Vehicle Use Tax (Form 2290)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/heavy-highway-vehicle-use-tax" },
  ],
};
