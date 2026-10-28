import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "With recourse factoring, you must buy back an invoice your customer does not pay. With non-recourse factoring, the factor takes the loss when a customer cannot pay, but usually only in narrow cases such as the customer's insolvency, and it still charges you for that protection. Neither one protects you from disputes about damage, shortages or missing paperwork. Read the contract definitions, not the label.",
  sections: [
    {
      heading: "What is the difference?",
      blocks: [
        {
          type: "p",
          text: "Factoring means selling your freight invoices to a company, the factor, for a cash advance now and the rest later, minus the factor's fee. The recourse question is simply: who takes the loss if the broker never pays?",
        },
        {
          type: "table",
          head: ["Situation", "Recourse", "Non-recourse"],
          rows: [
            ["If the customer does not pay", "You repay the advance or swap the invoice", "The factor absorbs the loss, if the reason is covered"],
            ["Typical cost", "Usually lower fee", "Usually higher fee"],
            ["What counts as covered", "Not applicable", "Defined in the contract, often limited to customer insolvency or bankruptcy"],
            ["Disputes, claims, missing paperwork", "You are responsible", "You are still responsible"],
            ["Credit checks on brokers", "Common, but varies", "Typically required before the factor buys an invoice"],
          ],
        },
        // REVIEW: "Usually lower fee / higher fee" and "typically limited to insolvency" are general industry patterns, not sourced. Confirm with the client or a factor.
      ],
    },
    {
      heading: "Why non-recourse is not a free pass",
      blocks: [
        {
          type: "p",
          text: "The word non-recourse sounds like you are fully protected. In practice, contracts often limit coverage to credit loss: the customer is financially unable to pay. If the broker refuses to pay because of a claimed cargo problem, a late delivery or a missing document, the factor can usually charge the invoice back to you. Ask for the factor's definition of non-payment, and how long they wait before treating an invoice as a credit loss.",
        },
      ],
    },
    {
      heading: "What to check in a factoring contract",
      blocks: [
        {
          type: "list",
          items: [
            "Fee structure: a flat percentage, or a rate that climbs the longer an invoice is outstanding.",
            "Advance and reserve: what share of the invoice you receive up front and when the rest is released.",
            "Term and minimums: whether you must factor all invoices or a minimum volume, and what happens if you do not.",
            "Termination: notice period, early termination fees and who pays to release the notice of assignment.",
            "Chargebacks: when and how the factor can take back an advance from you.",
            "Extra fees: ACH or wire fees, fuel advance fees, same-day funding fees, fees for sending invoices.",
            "Broker approval: how quickly they approve a broker, and what happens if a broker you already hauled for is declined.",
            "Liens: factors usually file a UCC-1 financing statement. Ask what it covers and when it is removed.",
          ],
        },
        // REVIEW: UCC-1 / Article 9 reference is general; confirm wording with a lawyer or the factor before publishing.
      ],
    },
    {
      heading: "What changes for a new MC?",
      blocks: [
        {
          type: "p",
          text: "A new authority has no payment history, and some brokers pay slowly or want long terms. Factoring turns a 30-day invoice into cash in a day or two, which helps with fuel, tolls and insurance. Two practical points:",
        },
        {
          type: "list",
          items: [
            "Some factors will only buy invoices from brokers they approve. Ask which brokers they have approved on your lanes before you sign.",
            "Some factors are willing to fund new authorities, others are not, and some work per-invoice (spot factoring) rather than requiring a long contract. Ask whether the first load needs a long-term contract.",
          ],
        },
        {
          type: "p",
          text: "If you are just starting out, read [getting your first load with a 30-day MC](/guides/getting-your-first-load-with-a-30-day-mc) and use the [new MC checklist](/tools/new-mc-checklist) so your paperwork is ready before you apply.",
        },
      ],
    },
    {
      heading: "Do the math before you sign",
      blocks: [
        {
          type: "p",
          text: "Factoring fees come out of your margin. On a load that barely clears your walk-away number, a few percent can turn a good load into a break-even one. Add the fee to your cost per mile in the [profit per mile calculator](/tools/profit-per-mile), then decide whether recourse or non-recourse makes sense for how you run.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What does recourse mean in factoring?",
      a: "Recourse means you remain responsible for an invoice the customer fails to pay. The factor can require you to repay the advance or replace the invoice with another one.",
    },
    {
      q: "What does non-recourse factoring cover?",
      a: "It covers the non-payment risks written in the contract, which is often limited to the customer's insolvency or bankruptcy. It usually does not cover disputes, damage claims or invoices with missing paperwork. Ask for the exact definition and read it.",
    },
    {
      q: "Can I factor with a new MC number?",
      a: "Some factors work with new authorities and some do not. Many only buy invoices from brokers they approve, so ask how they approve brokers and whether they offer per-invoice funding without a long-term contract.",
    },
    {
      q: "Is factoring the same as a loan?",
      a: "No. In factoring you sell invoices, and the factor collects from your customer. The terms and your liability depend on the contract, so read the recourse, fee and termination sections carefully.",
    },
  ],
  sources: [
    { label: "Uniform Commercial Code, Article 9: Secured Transactions (Cornell LII)", url: "https://www.law.cornell.edu/ucc/9" },
    { label: "FMCSA Licensing and Insurance (L&I) public search", url: "https://li-public.fmcsa.dot.gov/" },
  ],
};
