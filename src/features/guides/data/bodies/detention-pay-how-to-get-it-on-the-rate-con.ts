import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "No federal rule guarantees detention pay to an owner-operator hauling for a broker, so you only get it if the rate confirmation says so. Before you sign, make sure it states the free time, the hourly rate, any daily cap, when the clock starts, and what proof you must send. Then record your own arrival and departure times at every stop.",
  sections: [
    {
      heading: "What is detention pay?",
      blocks: [
        {
          type: "p",
          text: "Detention is extra pay for time your truck waits at a shipper or receiver beyond an agreed free period. It is a contract term between you and the broker or carrier, so the rate confirmation or carrier agreement is where it lives. Brokers often pay it only after the shipper or receiver confirms the delay, and many have time limits for claiming.",
        },
        {
          type: "p",
          text: "Waiting costs you hours of driving time and income. FMCSA has studied driver detention, and its work shows industry-wide data on it is limited, which is part of why it comes down to what you negotiate and document.",
        },
        // REVIEW: Do not add detention statistics unless a current FMCSA/OIG figure is confirmed. The FMCSA research page is cited as background only.
      ],
    },
    {
      heading: "What must the rate con say?",
      blocks: [
        {
          type: "table",
          head: ["Term", "What to get in writing", "Example wording to ask for"],
          rows: [
            ["Free time", "How many hours are free at each stop", "\"Two hours free at each stop\" (commonly two, but negotiable)"],
            ["Start of the clock", "From your arrival, or from the appointment time, whichever is later", "\"Detention starts at appointment time or arrival, whichever is later\""],
            ["Hourly rate", "Dollars per hour after free time", "A set dollar amount per hour"],
            ["Daily cap", "Maximum hours or dollars per day or per load", "State it, or ask for no cap"],
            ["Billing increments", "Hourly, half-hour or by the minute", "\"Prorated by the quarter hour\""],
            ["Proof required", "ELD logs, check-in sheet, timestamps, signed BOL times", "List which documents count"],
            ["Claim deadline", "How many days after delivery to submit", "A reasonable window, not a few hours"],
            ["Approval", "Who must confirm the delay", "\"Carrier-supplied documentation is sufficient\""],
          ],
        },
        {
          type: "callout",
          text: "If detention is described as \"per carrier agreement\" or \"per shipper\", ask for the numbers on the rate con.",
        },
      ],
    },
    {
      heading: "How to document it",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Arrive on time and record the time you arrived with a photo or message to the broker.",
            "Check in with the shipper and get your check-in time on the paperwork.",
            "Message the broker as soon as free time runs out, with the load number and the time.",
            "Keep your ELD record and take a photo of the bill of lading showing in and out times.",
            "Ask the shipper or receiver to sign or stamp the actual out time.",
            "Send your detention claim with the invoice, along with proof of delivery.",
          ],
        },
        {
          type: "p",
          text: "Late arrival can void a detention claim. If you are going to be late, tell the broker in writing before the appointment.",
        },
      ],
    },
    {
      heading: "If you are leased on",
      blocks: [
        {
          type: "p",
          text: "Under the federal leasing rules, a lease with an owner-operator must say who is responsible for detention along with other items such as tolls, permits and empty mileage. Check that your lease states it and see [leasing on vs. running your own authority](/guides/leasing-on-vs-running-your-own-authority).",
        },
      ],
    },
    {
      heading: "Getting the broker to pay",
      blocks: [
        {
          type: "list",
          items: [
            "Send the claim in writing, with a clear total and proof.",
            "Refer to the exact clause in the rate confirmation.",
            "Follow the broker's deadline and format, even if you disagree with it.",
            "If a broker refuses without a reason, keep the documents. Some carriers decide not to haul for that broker again.",
            "If the amount is large and the contract supports you, consider speaking to a transportation attorney.",
          ],
        },
        {
          type: "p",
          text: "Think about detention before you accept, not after. Waiting at the dock affects your hours of service and the rest of your week. Factor likely waits into your numbers with the [profit per mile calculator](/tools/profit-per-mile), and see [when to turn down a load](/guides/when-to-turn-down-a-load).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How much free time is standard before detention starts?",
      a: "Two hours is a common free period, but it is set by the contract, not by federal law. Check your rate confirmation and negotiate it before you accept the load.",
    },
    {
      q: "Is detention pay required by law?",
      a: "There is no federal rule that guarantees detention pay for an owner-operator hauling for a broker. You get it if your rate confirmation or carrier agreement provides for it. For leased owner-operators, the lease must say who bears detention costs.",
    },
    {
      q: "How do I prove detention?",
      a: "Use time-stamped records: ELD data, your check-in message to the broker, the shipper's check-in sheet and the bill of lading with in and out times. Send them with your claim and follow the broker's deadline.",
    },
    {
      q: "What if the rate confirmation has no detention terms?",
      a: "Ask the broker to add them in writing before you sign. If the broker will not, plan for unpaid waiting time in your rate, or decline the load.",
    },
  ],
  sources: [
    { label: "49 CFR 376.12: Written lease requirements (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376/section-376.12" },
    { label: "FMCSA: Impact of Driver Detention Time on Safety and Operations", url: "https://www.fmcsa.dot.gov/research-and-analysis/impact-driver-detention-time-safety-and-operations" },
  ],
};
