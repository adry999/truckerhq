import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "A rate confirmation is the written agreement for one load. Before you sign, check that the parties and MC numbers are right, the pickup and delivery details match what you were told, the rate says what it includes, and detention, layover and payment terms are written down. Anything promised on the phone but missing from the rate con is not agreed.",
  sections: [
    {
      heading: "What is a rate confirmation?",
      blocks: [
        {
          type: "p",
          text: "A rate confirmation, or rate con, is the document a broker sends after you agree on a load. It states the price, the stops, and the terms for that shipment. It often refers to a separate carrier agreement you signed earlier, so the rate con and that agreement together make the deal. Read both, but the rate con is the one you must read every time.",
        },
      ],
    },
    {
      heading: "Field-by-field checklist",
      blocks: [
        {
          type: "table",
          head: ["Section", "What to check", "Problem if"],
          rows: [
            ["Parties", "Broker name, MC number, your company name and MC/DOT number", "Names or MC numbers differ from the caller, or from what you verified"],
            ["Load number and references", "Load ID, PO, pickup number", "Missing, or different from the shipper's paperwork"],
            ["Pickup", "Address, date, appointment or window, contact, instructions", "Window too tight for your hours, or no contact number"],
            ["Delivery", "Address, appointment, contact, instructions", "Delivery before you can legally get there"],
            ["Commodity and weight", "Description, pieces, weight, temperature, hazmat flag", "Weight or commodity differs from what you were told"],
            ["Equipment", "Trailer type and length, special equipment, tarps or straps", "Needs equipment you do not have"],
            ["Rate", "Total dollars, whether linehaul and fuel are included, miles", "Rate lower than agreed, or fuel not stated"],
            ["Accessorials", "Detention free time and hourly rate, layover, truck-ordered-not-used, extra stops, lumper", "Blank, or \"as per carrier agreement\" with no numbers"],
            ["Payment terms", "Days to pay, what starts the clock, quick pay options and fee", "Terms are different from what you agreed"],
            ["Paperwork and billing", "Where to send the invoice, required documents, deadline", "Short deadlines to send the bill of lading"],
            ["Tracking and check calls", "App or phone requirements, frequency", "Fines for missed check calls"],
            ["Special terms", "Re-brokering ban, cargo claims, cancellation, deductions", "Fees or penalties you did not agree to"],
          ],
        },
      ],
    },
    {
      heading: "Clauses worth reading twice",
      blocks: [
        {
          type: "list",
          items: [
            "Re-brokering. Most rate cons ban it. If you subcontract, you may be in breach and risk non-payment. See [double brokering: the warning signs](/guides/double-brokering-the-warning-signs).",
            "Payment terms and the document trigger. \"Net 30 from receipt of a clean bill of lading\" starts later than \"Net 30 from delivery\".",
            "Deductions. Look for fees for quick pay, payment methods, or tracking, and make sure the amounts are stated.",
            "Late delivery and cancellation. See what you owe if you are late, and what the broker owes if it cancels after you are on the way.",
            "Detention. Look for free time, the hourly rate, a daily cap and how you must prove the time. More on that in [detention pay: how to get it on the rate con](/guides/detention-pay-how-to-get-it-on-the-rate-con).",
            "Anything that says the rate con overrides what was said on the phone. It does, so check the numbers.",
          ],
        },
      ],
    },
    {
      heading: "What should you do if something is wrong?",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Do not sign. Reply in writing with the specific line you want changed.",
            "Ask for a corrected rate confirmation with a new revision or version date.",
            "If the broker says it is a typo, wait for the corrected document before you move the truck.",
            "If the broker will not change it, decide whether the load still passes your numbers. If not, decline it.",
            "Keep a copy of the signed version and every revision.",
          ],
        },
        {
          type: "callout",
          text: "Do the math on the rate with the miles you will actually drive. The [profit per mile calculator](/tools/profit-per-mile) takes under a minute.",
        },
      ],
    },
    {
      heading: "After delivery",
      blocks: [
        {
          type: "p",
          text: "Keep the signed rate con, the bill of lading and proof of delivery together. Most payment disputes come down to missing documents or a mismatch between them. Send the invoice with all of them the same day, using the billing instructions on the rate con. If a broker later disputes what you agreed to, federal rules give each party to a brokered transaction the right to review the broker's record of that transaction.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is a rate confirmation in trucking?",
      a: "It is the broker's written agreement for a single load, stating the price, pickup and delivery details, equipment, payment terms and extra charges. You normally sign it before you pick up the load.",
    },
    {
      q: "Is a rate confirmation a legally binding contract?",
      a: "Once both sides sign it, it is a written agreement for that load, often together with a carrier agreement. The specifics depend on the wording and the law that applies, so read it before you sign and ask a transportation attorney if a large amount is at stake.",
    },
    {
      q: "What should be on a rate confirmation?",
      a: "At a minimum: the parties and MC numbers, load number, stops and times, commodity and weight, equipment, total rate and what it includes, detention and other extra charges, payment terms and billing instructions.",
    },
    {
      q: "Can a broker change the rate after I sign?",
      a: "Not unilaterally if the signed version states a price, but a broker can send a revised rate confirmation that you may accept or reject. Do not accept a revision that lowers the rate or removes terms you agreed to, and keep every version.",
    },
  ],
  sources: [
    { label: "49 CFR 371.3: Records of brokers (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-371/section-371.3" },
    { label: "FMCSA Licensing and Insurance (L&I) public search", url: "https://li-public.fmcsa.dot.gov/" },
  ],
  // REVIEW: No federal rule prescribes rate-confirmation content; the field list reflects common industry practice. Legal-binding FAQ answer should be checked by counsel.
};
