import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "Double brokering is when someone who is not the real broker or carrier on a load sells it on to another carrier, often without the original broker or shipper knowing. The usual warning signs are a mismatch between who you talked to and who is on the paperwork, a rate that is too good, and pressure to move fast. The risk to you is real: the shipper pays the middleman, the middleman disappears, and you do not get paid.",
  sections: [
    {
      heading: "What is double brokering?",
      blocks: [
        {
          type: "p",
          text: "A broker arranges freight between a shipper and a carrier. Double brokering happens when a party that took the load, often a carrier or a fake broker, hands it to a different carrier without authority or without telling the other parties. Now there are two layers of margin and no one is accountable for payment. Often the party at the top pays the first intermediary, who keeps the money.",
        },
        {
          type: "p",
          text: "Not all subcontracting is illegal. Federal rules say a motor carrier is not a broker when it arranges transportation of shipments it is authorized to haul and has legally bound itself to haul. What causes trouble is acting as a broker without broker registration and financial security, or breaking a contract that forbids re-brokering. Whether a specific arrangement breaks the law depends on the authority and contracts involved.",
        },
        // REVIEW: Legal characterization of "double brokering" varies; 49 CFR 371.2 carve-out for carriers is real, but confirm wording with counsel before publishing.
      ],
    },
    {
      heading: "Warning signs before you accept the load",
      blocks: [
        {
          type: "table",
          head: ["Warning sign", "Why it matters", "What to do"],
          rows: [
            ["Rate far above the lane average", "Scammers overpay to get a truck committed quickly", "Compare with other postings. Verify before you commit"],
            ["Email from a free address or look-alike domain", "Real brokers usually use a company domain", "Search the company and call the number on FMCSA"],
            ["MC number on the rate con does not match the caller", "You may be dealing with an impersonator", "Check the MC on FMCSA and compare names, address and phone"],
            ["Brand-new authority, no references", "Fraudulent companies often use fresh or hijacked authority", "Ask for references and keep payment terms short"],
            ["Rush to book, no time to verify", "Pressure is a standard fraud tactic", "Slow down. A real load will still be there in 20 minutes"],
            ["Pickup at a different company than the rate con says", "The load may have been re-tendered", "Ask who the shipper is and call them"],
          ],
        },
        {
          type: "p",
          text: "Basic checks like these are covered in more detail in [what to check on a broker before you book](/guides/what-to-check-on-a-broker-before-you-book).",
        },
      ],
    },
    {
      heading: "Warning signs at pickup and delivery",
      blocks: [
        {
          type: "list",
          items: [
            "The shipper's paperwork names a different carrier or broker than your rate confirmation.",
            "The shipper says the load was already assigned to another truck, or was cancelled.",
            "The dock asks you to call someone you have never heard of for release instructions.",
            "The bill of lading names a different bill-to party than you expected.",
            "After delivery, the broker you booked with stops answering, or the invoice address is new.",
          ],
        },
        {
          type: "callout",
          text: "If the names on the rate confirmation, the bill of lading and the shipper's system do not match, stop and call before you load.",
        },
      ],
    },
    {
      heading: "How do you protect yourself?",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Verify the broker's authority and bond on FMCSA's Licensing and Insurance search before you accept.",
            "Call back on the number FMCSA lists, not the one in the email.",
            "Get a signed rate confirmation before you move, and keep it with your bill of lading.",
            "Ask the shipper to confirm the broker's name when you arrive.",
            "Photograph the bill of lading, seals and signed delivery receipt.",
            "Send your invoice with the proof of delivery the same day.",
          ],
        },
        {
          type: "p",
          text: "Do the same for your own side: do not re-tender a load you accepted unless your contract and your authority allow it. Use the [carrier lookup tool](/tools/carrier-lookup) to check a carrier's public record before you hand it work.",
        },
        // REVIEW: Confirm the carrier lookup tool also covers the checks described (it targets carriers; broker checks are done on FMCSA L&I).
      ],
    },
    {
      heading: "What if you already hauled a double-brokered load?",
      blocks: [
        {
          type: "p",
          text: "Send a written demand to the party you contracted with, and give the shipper or original broker your delivery documents. Ask them whether they already paid the middleman. Some will pay a second time to keep a relationship, some will not. If the party you contracted with is a registered broker, you may be able to claim against its bond. Report suspected fraud to FMCSA, and consider speaking to a transportation attorney for larger amounts.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is double brokering illegal?",
      a: "Acting as a broker without FMCSA broker registration and the required $75,000 financial security is unlawful. Re-tendering a load can also breach your contract even when it is not unlawful. A motor carrier moving a load it accepted and is bound to transport is generally not acting as a broker.",
    },
    {
      q: "How do I know if my load was double brokered?",
      a: "The names on your rate confirmation, the bill of lading and the shipper's system will not match, or the shipper tells you someone else is already assigned. When in doubt, call the shipper before you load.",
    },
    {
      q: "Who pays if a load is double brokered and the middleman vanishes?",
      a: "That depends on the contracts. Carriers often have to chase the party they contracted with, and may claim on a registered broker's bond. Shippers sometimes pay twice to protect a relationship. There is no guarantee, so verify before you haul.",
    },
    {
      q: "How can I tell if a broker's email is fake?",
      a: "Compare the domain with the company's website, look for letters swapped or added, and call the phone number listed on FMCSA. Do not rely on contact details in the email itself.",
    },
  ],
  sources: [
    { label: "49 CFR 371.2: Definitions, including broker (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-371/section-371.2" },
    { label: "49 U.S.C. 14916: Unlawful brokerage activities", url: "https://www.law.cornell.edu/uscode/text/49/14916" },
    { label: "FMCSA Licensing and Insurance (L&I) public search", url: "https://li-public.fmcsa.dot.gov/" },
    { label: "FMCSA Safety and Fitness Electronic Records (SAFER)", url: "https://safer.fmcsa.dot.gov/" },
  ],
};
