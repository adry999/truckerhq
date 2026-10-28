import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "Turn a load down when the all-in pay per total mile is below your walk-away number, when it leaves you in a market with no freight out, when it does not fit your hours of service, or when the broker or paperwork looks wrong. The decision should come from numbers you wrote down before the call, not from how the broker makes you feel.",
  sections: [
    {
      heading: "The five tests",
      blocks: [
        {
          type: "p",
          text: "Run every load through the same five tests. A load that fails one needs a good reason to be worth it. A load that fails two is a no.",
        },
        {
          type: "table",
          head: ["Test", "Question", "Turn it down if"],
          rows: [
            ["Money", "Is total pay divided by loaded plus empty miles above my walk-away number?", "It is below, and the broker will not move"],
            ["Position", "What can I realistically book out of the delivery area?", "The market is thin and you would deadhead a long way or sit"],
            ["Time", "Can I drive it legally and make both appointments?", "The schedule needs more hours than you have left"],
            ["Freight", "Can my truck and trailer take the commodity, weight and handling?", "It needs equipment, endorsements or work you do not have"],
            ["Counterparty", "Do I trust who is paying me?", "Authority, bond or paperwork does not check out"],
          ],
        },
      ],
    },
    {
      heading: "Test 1: the money",
      blocks: [
        {
          type: "p",
          text: "Your walk-away number is your cost per mile plus the profit you need per mile. Work it out once, then apply it to total pay divided by every mile you drive. If you have not done this yet, start with [how to tell if a load pays enough](/guides/how-to-tell-if-a-load-pays-enough) or the [profit per mile calculator](/tools/profit-per-mile).",
        },
        {
          type: "p",
          text: "Before you reject on price, ask whether the rate is all-in and whether the miles are correct. Sometimes the number improves. See [rate per mile vs. all-in rate](/guides/rate-per-mile-vs-all-in-rate-what-brokers-mean).",
        },
      ],
    },
    {
      heading: "Test 2: where the load leaves you",
      blocks: [
        {
          type: "p",
          text: "A good rate into a slow market can cost more than it earns. Before you accept, look at what is posted out of the delivery area on your equipment type, and at what rates. If you have to deadhead hours to find a load, add that cost to the trip.",
        },
        {
          type: "p",
          text: "A lower rate into a busy area can be the better choice. Judge the whole cycle, not one leg.",
        },
      ],
    },
    {
      heading: "Test 3: can you legally run it?",
      blocks: [
        {
          type: "p",
          text: "Federal hours-of-service rules for property-carrying drivers limit you to 11 hours of driving within a 14-hour window that starts after 10 consecutive hours off duty. You also need a 30-minute break once more than 8 hours of driving has passed without one, and you are capped at 60 hours on duty in 7 days or 70 in 8, depending on how your carrier operates. A 34-hour off-duty period restarts the weekly clock.",
        },
        {
          type: "list",
          items: [
            "Add up driving time plus fuel, loading, unloading and waiting before you say yes.",
            "Appointment windows that assume no traffic, no weather and no wait at the dock are risky.",
            "Late delivery can mean fines or a charge-back in the carrier agreement. Check the rate con.",
          ],
        },
        // REVIEW: Short-haul and adverse-driving exceptions exist in 49 CFR 395.1. Confirm whether to mention them or add a "check your exemptions" line.
      ],
    },
    {
      heading: "Tests 4 and 5: the freight and the counterparty",
      blocks: [
        {
          type: "list",
          items: [
            "Weight, commodity and trailer type match what you can haul.",
            "Special requirements are named on the rate con: tarps, straps, temperature, TWIC, team driving, driver-assist or no-touch freight.",
            "The broker has active authority and a bond on file. See [what to check on a broker before you book](/guides/what-to-check-on-a-broker-before-you-book).",
            "Names and MC numbers match between the call, the email and the rate confirmation. See [double brokering: the warning signs](/guides/double-brokering-the-warning-signs).",
            "Detention, layover and cancellation terms are written, not promised. See [detention pay](/guides/detention-pay-how-to-get-it-on-the-rate-con).",
          ],
        },
      ],
    },
    {
      heading: "How to say no",
      blocks: [
        {
          type: "p",
          text: "Keep it short and give your number. \"I can't make that work below $X all-in. If you get there, call me back.\" It is polite, it ends the negotiation, and it leaves the door open. Many brokers come back with a better rate when the truck is still empty.",
        },
        {
          type: "callout",
          text: "A turned-down load costs you nothing. A bad load costs you a day and a lot of fuel.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "When should an owner-operator refuse a load?",
      a: "Refuse it when pay per total mile is below your walk-away number, when you cannot legally or safely make the schedule, when the delivery market has little freight out, or when the broker's authority, bond or paperwork does not check out.",
    },
    {
      q: "Can I get in trouble for turning down a load?",
      a: "With an open spot load there is nothing to turn down yet, so you are fine. If you already signed a rate confirmation, cancelling can trigger fees or hurt your standing with that broker, so read the cancellation terms before you sign.",
    },
    {
      q: "What should I do if a broker keeps lowering the rate after I accept?",
      a: "Do not move on a verbal agreement. If the rate confirmation shows a lower number than you agreed to, do not sign it. Ask for the corrected version. If the broker will not correct it, decline the load.",
    },
    {
      q: "How do I know if my deadhead is too long?",
      a: "Add the empty miles to the loaded miles and divide the total pay by that sum. If the result is below your walk-away number, the deadhead is too long for that rate.",
    },
  ],
  sources: [
    { label: "49 CFR 395.3: Maximum driving time for property-carrying vehicles (eCFR)", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395/subpart-A/section-395.3" },
    { label: "FMCSA hours of service rules", url: "https://www.fmcsa.dot.gov/regulations/hours-of-service" },
  ],
};
