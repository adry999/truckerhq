import type { GuideBodyData } from "@/features/guides/data/guide-body";

export const body: GuideBodyData = {
  reviewStatus: "draft",
  summary:
    "A rate per mile is a price for each mile the broker counts, and brokers often quote it on loaded miles only and sometimes before fuel surcharge. An all-in rate is one total number for the trip, with fuel already inside it. Whichever the broker says, turn it into total dollars and divide by every mile you will drive, including the empty miles to pickup.",
  sections: [
    {
      heading: "What does each term usually mean?",
      blocks: [
        {
          type: "p",
          text: "There is no legal definition of these terms for spot freight, so the same words can mean different things at different brokers. Treat the table below as common usage and confirm each point on the call.",
        },
        {
          type: "table",
          head: ["Term", "Usually means", "Ask"],
          rows: [
            ["Rate per mile (RPM)", "Linehaul dollars for each mile the broker counts", "Which miles: loaded only, or including empty miles? From which mileage software?"],
            ["Linehaul", "The base transportation charge, often before fuel surcharge", "Is fuel surcharge extra or included?"],
            ["Fuel surcharge (FSC)", "A separate charge that moves with diesel prices", "Is it a flat amount or per mile? Is it on the rate con?"],
            ["Flat rate", "One price for the whole load, regardless of miles", "Does it include fuel, tolls and stop-offs?"],
            ["All-in rate", "Total pay for the trip, ideally including fuel and expected accessorials", "Is anything still extra, such as detention, lumper or tolls?"],
            ["Accessorials", "Extra charges for detention, layover, extra stops, lumpers", "Which ones are on the rate con, and at what rate?"],
          ],
        },
      ],
    },
    {
      heading: "Convert every quote to the same number",
      blocks: [
        {
          type: "p",
          text: "To compare loads fairly, convert the quote into total pay, then divide by all the miles you drive for it. Below is an example with made-up numbers.",
        },
        {
          type: "table",
          head: ["Line", "Quote A: per mile + FSC", "Quote B: all-in flat"],
          rows: [
            ["What the broker says", "$2.10 per mile plus $0.30 per mile fuel", "$1,400 all-in"],
            ["Loaded miles", "600", "600"],
            ["Total pay", "600 × $2.40 = $1,440", "$1,400"],
            ["Empty miles to pickup", "60", "60"],
            ["Pay per total mile", "$1,440 ÷ 660 = $2.18", "$1,400 ÷ 660 = $2.12"],
          ],
        },
        {
          type: "p",
          text: "The per-mile quote looks lower at $2.10 but pays $40 more once fuel is added. The all-in number is the one that is easier to compare with your cost. Your cost per mile is what matters: see [how to tell if a load pays enough](/guides/how-to-tell-if-a-load-pays-enough) and run your own numbers in the [profit per mile calculator](/tools/profit-per-mile).",
        },
      ],
    },
    {
      heading: "Where the numbers quietly change",
      blocks: [
        {
          type: "list",
          items: [
            "Mileage source: brokers and carriers often calculate miles with different software or routes. A 20-mile difference on a 600-mile haul moves your rate per mile. Ask what the broker uses and check it against your own route.",
            "Loaded versus total miles: a rate quoted on loaded miles ignores your deadhead to pickup. The pickup distance changes your real rate.",
            "Fuel: if fuel surcharge is separate and the rate con leaves it out, you may not get it.",
            "Accessorials: detention, layover and extra stops should be on the rate con, not promised on the phone. See [detention pay: how to get it on the rate con](/guides/detention-pay-how-to-get-it-on-the-rate-con).",
          ],
        },
      ],
    },
    {
      heading: "A script for the call",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "\"Is that rate all-in, including fuel?\"",
            "\"How many miles are you paying on, and what software?\"",
            "\"Are there any deductions, like quick pay or fees?\"",
            "\"What is the detention policy and the free time?\"",
            "\"Can you put all of that on the rate confirmation?\"",
          ],
        },
        {
          type: "p",
          text: "If something the broker said is not on the rate confirmation, treat it as not agreed. [How to read a rate confirmation](/guides/how-to-read-a-rate-confirmation) walks through each field.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What does all-in rate mean in trucking?",
      a: "An all-in rate is one total price for the trip that should already include fuel surcharge. Confirm whether accessorials like detention, lumper fees and tolls are included, because they often are not.",
    },
    {
      q: "Is rate per mile based on loaded miles or total miles?",
      a: "It depends on the broker. Spot quotes are commonly based on loaded miles from origin to destination, which leaves out your empty miles to pickup. Always divide total pay by loaded plus empty miles to see what you really earn.",
    },
    {
      q: "Is fuel surcharge included in the rate per mile?",
      a: "Not always. Some brokers quote linehaul and fuel separately. Ask for the total and make sure the rate confirmation shows both the linehaul and the surcharge, or states that the rate is all-in.",
    },
    {
      q: "Why does the broker's mileage differ from my GPS?",
      a: "Different routing software uses different routes, truck restrictions and origin or destination points. Ask which software the broker uses and compare it with your own route before you accept.",
    },
  ],
  // REVIEW: No primary source defines "rate per mile" or "all-in rate" for spot freight; this guide describes common industry usage. Add a citation if the client has one.
  sources: [],
};
