import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "IFTA returns are due four times a year: April 30, July 31, October 31 and January 31, covering the quarter that just ended. For each quarter you total your miles and fuel by jurisdiction, work out how much fuel tax you owe each jurisdiction, subtract the fuel tax you already paid at the pump, and file one return with your base jurisdiction. File even if you drove zero miles.",
  sections: [
    {
      heading: "Who needs IFTA and when is it due?",
      blocks: [
        {
          type: "p",
          text: "The International Fuel Tax Agreement (IFTA) lets a carrier with a qualified vehicle file one fuel tax return with its base jurisdiction instead of one with every state or province it drives through. A qualified motor vehicle, in general, is one with two axles and a gross or registered weight over 26,000 pounds, or three or more axles, or a combination over 26,000 pounds. Check the exact definition with your base jurisdiction.",
        },
        // REVIEW: Qualified-vehicle definition is from IFTA Articles of Agreement (R202). Confirm current wording on iftach.org.
        {
          type: "table",
          head: ["Quarter", "Months covered", "Return due"],
          rows: [
            ["Q1", "January to March", "April 30"],
            ["Q2", "April to June", "July 31"],
            ["Q3", "July to September", "October 31"],
            ["Q4", "October to December", "January 31"],
          ],
        },
        {
          type: "p",
          text: "When a due date falls on a weekend or holiday, many jurisdictions move it to the next business day. Confirm with your base jurisdiction. Late returns can bring penalties and interest, and the amounts vary by jurisdiction.",
        },
        // REVIEW: Weekend/holiday rollover and penalty detail are per-jurisdiction. Confirm wording; consider linking the client's base state if known.
      ],
    },
    {
      heading: "Step 1: Keep the right records all quarter",
      blocks: [
        {
          type: "list",
          items: [
            "Miles driven in each jurisdiction, for every qualified vehicle. An ELD or GPS trip report makes this easier.",
            "Gallons of fuel purchased in each jurisdiction, with receipts. Receipts should show the date, seller, gallons, fuel type, price, and your vehicle or unit.",
            "Total miles and total gallons for the quarter.",
            "Your IFTA license number and the decals on each truck.",
          ],
        },
        {
          type: "p",
          text: "Keep your records for several years. Your base jurisdiction can audit them, and the required retention period is set by the agreement, so ask your jurisdiction. Four years is common.",
        },
        // REVIEW: Confirm IFTA record-retention period (believed to be 4 years from filing/due date).
      ],
    },
    {
      heading: "Step 2: Calculate your fleet MPG",
      blocks: [
        {
          type: "p",
          text: "Divide total miles for all jurisdictions by total gallons purchased for the quarter. This is your fleet miles per gallon. It is used to turn miles driven in each jurisdiction into gallons used there.",
        },
      ],
    },
    {
      heading: "Step 3: Work out each jurisdiction",
      blocks: [
        {
          type: "p",
          text: "For each jurisdiction: taxable gallons = miles in that jurisdiction ÷ fleet MPG. Then net taxable gallons = taxable gallons minus gallons you bought there. Multiply by that jurisdiction's tax rate. A negative result is a credit; a positive result is tax owed. The example below uses made-up tax rates for illustration only. Use the current rates published for your quarter.",
        },
        {
          type: "table",
          head: ["Item", "Jurisdiction A", "Jurisdiction B", "Total"],
          rows: [
            ["Miles driven", "10,000", "14,000", "24,000"],
            ["Gallons purchased", "2,000", "2,000", "4,000"],
            ["Fleet MPG", "", "", "24,000 ÷ 4,000 = 6.0"],
            ["Taxable gallons", "10,000 ÷ 6.0 = 1,666.7", "14,000 ÷ 6.0 = 2,333.3", "4,000"],
            ["Net taxable gallons", "1,666.7 − 2,000 = −333.3", "2,333.3 − 2,000 = +333.3", "0"],
            ["Example tax rate per gallon", "$0.30", "$0.40", ""],
            ["Tax due or credit", "−$100.00", "+$133.33", "$33.33 due"],
          ],
        },
        {
          type: "p",
          text: "You bought more fuel than you used in Jurisdiction A, so you have a credit there. You bought less than you used in B, so you owe tax there. The net goes on your return as one payment or refund.",
        },
      ],
    },
    {
      heading: "Step 4: File and pay",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Log in to your base jurisdiction's IFTA portal or use its paper form.",
            "Enter miles and gallons by jurisdiction. Many ELD and fuel-card systems export this.",
            "Check the totals match your quarter's mileage and fuel records.",
            "Pay the balance. If you are owed a net credit, ask your jurisdiction how it handles refunds and credits.",
            "Save the confirmation and your supporting records.",
          ],
        },
        {
          type: "callout",
          text: "No miles or no fuel this quarter? File a return anyway, showing zero.",
        },
        {
          type: "p",
          text: "Track deadlines like these with [compliance alerts](/tools/compliance-alerts), and put IFTA in your cost per mile so you know what a load really nets. See the [profit per mile calculator](/tools/profit-per-mile).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "When are IFTA quarterly returns due?",
      a: "April 30 for January to March, July 31 for April to June, October 31 for July to September, and January 31 for October to December. If a date falls on a weekend or holiday, many jurisdictions move it to the next business day.",
    },
    {
      q: "Do I have to file IFTA if I did not drive?",
      a: "Yes. IFTA licensees file a return for every quarter, including quarters with no miles or no fuel purchased. Report zeros.",
    },
    {
      q: "Where do I file my IFTA return?",
      a: "With your base jurisdiction, the state or province where your IFTA license was issued. You file one return, and the base jurisdiction distributes tax to the other jurisdictions.",
    },
    {
      q: "What happens if I file IFTA late?",
      a: "Your base jurisdiction can charge penalties and interest, and repeated problems can affect your license. The amounts differ by jurisdiction, so check your jurisdiction's current fee schedule.",
    },
    {
      q: "Is IFTA the same as the Heavy Vehicle Use Tax?",
      a: "No. IFTA is a fuel tax filed quarterly with your base jurisdiction. The federal Heavy Highway Vehicle Use Tax (Form 2290) is a separate annual IRS tax for heavy vehicles.",
    },
  ],
  sources: [
    { label: "IFTA, Inc.: official site, Articles of Agreement and Procedures Manual", url: "https://www.iftach.org/" },
    { label: "IFTA, Inc.: Tax rate matrix", url: "https://www.iftach.org/taxmatrix/" },
    { label: "IRS: Heavy Highway Vehicle Use Tax (Form 2290)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/heavy-highway-vehicle-use-tax" },
  ],
};
