import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "Before you book, confirm that the broker holds active FMCSA broker authority, has the required $75,000 of financial security on file, and that the person calling you is really from that company. Then check how and when they pay. Ten minutes on this before you accept a load is cheaper than chasing a 60-day invoice.",
  sections: [
    {
      heading: "What does a legitimate broker have on file with FMCSA?",
      blocks: [
        {
          type: "p",
          text: "A broker must be registered with FMCSA and must keep a $75,000 surety bond (form BMC-84) or trust fund (form BMC-85) in effect. Federal law bars anyone from arranging interstate freight as a broker without that registration and financial security. The bond or trust exists so carriers and shippers have a place to file a claim if the broker does not pay.",
        },
        // REVIEW: FMCSA changed broker financial-security rules effective Jan 16, 2026 (49 CFR 387.307). Confirm the $75,000 figure and BMC-84/BMC-85 wording are still current on fmcsa.dot.gov before publishing.
        {
          type: "p",
          text: "You can see all of this for free in FMCSA's Licensing and Insurance (L&I) search. Look the broker up by MC number or legal name and read the record yourself instead of trusting a PDF the broker sent you.",
        },
      ],
    },
    {
      heading: "The 10-minute pre-booking check",
      blocks: [
        {
          type: "table",
          head: ["Check", "Where to look", "Stop if"],
          rows: [
            ["Active broker authority", "FMCSA L&I search, by MC number", "Authority is inactive, revoked, or listed as carrier-only"],
            ["Bond or trust on file", "L&I record, insurance/bond section", "No BMC-84 or BMC-85 shown, or a pending cancellation"],
            ["Identity matches", "Legal name, address and phone on L&I versus the email and rate confirmation", "Different company name, a free email address, or a number that rings somewhere else"],
            ["Authority age", "L&I record, authority grant date", "Very new authority with no references and pressure to book fast"],
            ["Payment terms", "Rate confirmation and carrier agreement", "Terms are vague, or payment depends on something you do not control"],
            ["Reputation", "Other owner-operators, load-board credit and comment tools you already use", "Several people report slow or missed payment"],
          ],
        },
        {
          type: "callout",
          text: "Call the broker back on the phone number listed on FMCSA, not the one in the email.",
        },
      ],
    },
    {
      heading: "How do you find out how fast a broker pays?",
      blocks: [
        {
          type: "p",
          text: "Ask directly: what are your standard payment terms, and do you offer quick pay? Get the answer in writing, ideally on the rate confirmation or in the carrier agreement. Then ask what paperwork starts the clock. Some brokers count days from delivery, others from the day they receive a clean bill of lading and signed rate confirmation.",
        },
        {
          type: "list",
          items: [
            "Net 30 means they have up to 30 days from the trigger date, not 30 days from delivery.",
            "Quick pay usually means a fee taken off your rate in exchange for faster payment. Ask for the exact percentage and work out whether it is worth it.",
            "If you use a factoring company, ask whether the broker has been approved by your factor. Factors often check broker credit before they will buy the invoice.",
          ],
        },
        {
          type: "p",
          text: "For the math on whether a rate is worth taking at all, use the [profit per mile calculator](/tools/profit-per-mile) or read [how to tell if a load pays enough](/guides/how-to-tell-if-a-load-pays-enough).",
        },
      ],
    },
    {
      heading: "Read the carrier agreement before you sign",
      blocks: [
        {
          type: "p",
          text: "Most brokers ask you to sign a broker-carrier agreement during onboarding. It often covers more than a single load. Read it for:",
        },
        {
          type: "list",
          items: [
            "Payment terms and the documents required before payment starts.",
            "Fees or deductions, such as quick pay, system fees or charge-backs.",
            "Detention, layover and truck-ordered-not-used rules. See [detention pay: how to get it on the rate con](/guides/detention-pay-how-to-get-it-on-the-rate-con).",
            "A ban on re-brokering your load and what happens if it is breached.",
            "Cargo insurance requirements that exceed what you carry.",
            "Which state's law and courts apply if there is a dispute.",
          ],
          ordered: false,
        },
        {
          type: "p",
          text: "Federal rules also give each party to a brokered transaction the right to review the broker's record of that transaction. If something does not add up, you can ask to see it.",
        },
      ],
    },
    {
      heading: "Red flags that mean walk away",
      blocks: [
        {
          type: "list",
          items: [
            "The rate is well above anything else posted on the same lane, and they want you to move now.",
            "Pickup instructions or a payment address change after you accept.",
            "The broker refuses to send a rate confirmation before you arrive at the shipper.",
            "The MC number on the rate confirmation does not match the one you checked.",
            "They will not answer on the phone number FMCSA has on file.",
          ],
        },
        {
          type: "p",
          text: "Several of these also show up in double brokering schemes. See [double brokering: the warning signs](/guides/double-brokering-the-warning-signs).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How do I check if a freight broker is legitimate?",
      a: "Search the broker on FMCSA's Licensing and Insurance site by MC number. Confirm the authority is active for brokering, a $75,000 bond (BMC-84) or trust fund (BMC-85) is on file, and the legal name, address and phone match the rate confirmation and the person you spoke with.",
    },
    {
      q: "How much is a freight broker bond?",
      a: "Federal rules require brokers to keep $75,000 in financial security, either as a surety bond (BMC-84) or a trust fund (BMC-85). The broker pays a premium for the bond; the $75,000 is the coverage amount available for valid claims.",
    },
    {
      q: "What if a broker does not pay me?",
      a: "Send a written demand with your signed rate confirmation, bill of lading and proof of delivery. If they still do not pay, you can file a claim against the broker's bond with the surety company shown in their FMCSA record. Keep every document, and consider talking to a transportation attorney for larger amounts.",
    },
    {
      q: "Should I work with a broker that has a brand-new MC number?",
      a: "It is not automatically a problem, but it deserves extra checks. Verify the bond, confirm identity by calling the FMCSA-listed number, and avoid long payment terms until they have a payment record with carriers you trust.",
    },
  ],
  sources: [
    { label: "FMCSA Licensing and Insurance (L&I) public search", url: "https://li-public.fmcsa.dot.gov/" },
    { label: "49 CFR 387.307: Broker and freight forwarder financial security (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-C/section-387.307" },
    { label: "49 CFR 371.3: Records of brokers (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-371/section-371.3" },
    { label: "49 U.S.C. 14916: Unlawful brokerage activities", url: "https://www.law.cornell.edu/uscode/text/49/14916" },
  ],
};
