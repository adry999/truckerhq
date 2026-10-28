// Content for the /dispatch/<slug> landing pages (EN only for now).
// Brand facts are shared with /dispatch. The price is a placeholder on the
// site, so no page states a number: they point to the pricing on /dispatch.

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServicePage = {
  slug: string;
  /** Short label for links and breadcrumbs. */
  name: string;
  /** Meta title, 60 characters or fewer. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ServiceSection[];
  faq: { q: string; a: string }[];
};

export const DISPATCH_SERVICE_PAGES: ServicePage[] = [
  {
    slug: "dry-van",
    name: "Dry van",
    title: "Dry Van Dispatch for Owner-Operators",
    description:
      "Dry van dispatch for owner-operators and small fleets. A flat weekly price, a dispatcher on your time zone, rate negotiation and broker checks on every load.",
    eyebrow: "DRY VAN DISPATCH",
    h1: "Dry van dispatch, one flat weekly price",
    intro:
      "Dry van is the biggest part of the spot market, and that is the problem. Every broker has a van to cover and every carrier is bidding for it. A dispatcher earns the fee by finding the loads that pay and refusing the ones that do not.",
    sections: [
      {
        heading: "What a dry van dispatcher actually does",
        paragraphs: [
          "Most of the day is search and talk. We watch DAT, Truckstop and direct broker lists, call brokers on the loads that fit your lane and home time, and come back to you with the rate, the miles, the pickup window and the broker's record.",
          "You approve every load. We do not book freight behind your back and we do not push you into a lane you do not want.",
        ],
      },
      {
        heading: "Freight you can expect in a van",
        paragraphs: [
          "A 53-foot van hauls almost anything that is boxed, bagged or palletized and does not need heat or cold. The mix changes by lane, but most of it falls into a few groups.",
        ],
        bullets: [
          "Retail and e-commerce freight moving out of distribution centers.",
          "Packaged food and beverage that is not temperature controlled.",
          "Paper, packaging and consumer goods.",
          "Auto parts and light manufacturing inputs.",
        ],
      },
      {
        heading: "Drop-and-hook or live load",
        paragraphs: [
          "Live loading means you wait at the dock while the shipper loads or unloads you. Drop-and-hook means you swap trailers and leave. Hook-and-go saves hours, but it is not always on offer, and the rate usually reflects it.",
          "We ask which one it is before we quote you the load. We also ask what the facility's detention policy is, how long trucks usually sit, and whether you get paid for time over the free window. A cheap load with a four-hour dock wait is not cheap.",
        ],
      },
      {
        heading: "Seasonality and rate pressure",
        paragraphs: [
          "Van rates move with retail. Freight tends to build ahead of the holidays and soften after them. Some lanes run one way, so a good load out can be followed by a poor one back. Because vans are easy to find, brokers know they can wait for a lower bid.",
          "Negotiation starts with the lane average, not the broker's first number. We check what that lane has paid recently, ask for more, and plan the next load before you deliver so you are not hunting for a return from an empty truck stop.",
        ],
      },
      {
        heading: "Broker checks and paperwork on every van load",
        paragraphs: [
          "Before we book, we look at the broker's authority, credit score and days to pay. After delivery we send the BOL and invoice, and to your factoring company if you use one. A load is not finished until the paperwork is in.",
        ],
      },
      {
        heading: "How the price works",
        paragraphs: [
          "You pay a flat weekly price per truck. It is never a percentage of the load, so a better rate is all yours. See the current pricing below on this page.",
        ],
      },
      {
        heading: "Is dry van right for your truck?",
        paragraphs: [
          // REVIEW: confirm the team has dry van experience on these points.
          "If you already own a van, the question is lanes and home time. Tell us where you want to be on the weekend and how far out you will run. A short list of lanes you like gives us a better chance of finding repeat freight than a wide-open search.",
          "If you are deciding between equipment types, we can talk through what the van market looks like before you buy. We will not push you toward a trailer you do not own.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you book dry van loads for a single truck?",
        a: "Yes. Most of our dry van work is one truck run by its owner. Fleets pay the same kind of flat price per truck.",
      },
      {
        q: "Can I choose drop-and-hook only?",
        a: "You can ask for it. It narrows the choice of loads, and we will tell you what that costs in rate before you decide.",
      },
      {
        q: "Who pays if a shipper keeps me waiting?",
        a: "The rate confirmation should set a free window and a detention rate. We check for it before booking and chase it when it is owed. We cannot promise a shipper pays.",
      },
      {
        q: "Do you only use load boards?",
        a: "No. We use DAT and Truckstop, and we also call brokers directly, because the best loads often never reach a board.",
      },
    ],
  },
  {
    slug: "reefer",
    name: "Reefer",
    title: "Reefer Dispatch for Owner-Operators",
    description:
      "Reefer dispatch for owner-operators and small fleets. Flat weekly price, a dispatcher on your time zone, and reefer-specific load checks before you book.",
    eyebrow: "REEFER DISPATCH",
    h1: "Reefer dispatch that watches the details",
    intro:
      "A reefer load can pay better than a dry van, but it carries more ways to lose money: a rejected load, a claim, a long wait with the unit running. Reefer dispatch is about reading those risks before you say yes.",
    sections: [
      {
        heading: "Reefer loads are about temperature, not just miles",
        paragraphs: [
          "Every reefer rate confirmation should state a set point and, often, a mode: continuous or start-stop. Continuous burns more fuel. Start-stop saves it, but some products cannot take it. We read this before we send you the load, not after you are at the dock.",
          "We also ask whether the shipper requires a pre-cooled trailer, whether they will check the temperature at the door, and whether you are asked to send temperature readings from pickup to delivery.",
        ],
      },
      {
        heading: "Pre-cooling and temperature records",
        paragraphs: [
          "Pre-cool the trailer before you reach the dock. A warm box can fail the shipper's check, and a failed check means a wait or a lost load. Keep the receiver's printout or the unit's download. If a receiver says the product arrived warm, that record is the first thing the broker will ask for.",
        ],
        bullets: [
          "Wash-out and clean trailer: many food shippers inspect before loading.",
          "Set point on the BOL matching the set point on the rate confirmation.",
          "Seal number written on the BOL, and the seal left intact.",
          "A photo of the unit display at pickup and at delivery.",
        ],
      },
      {
        heading: "Produce seasons and lanes",
        paragraphs: [
          "Produce moves in waves. Rates and load counts rise in the harvest regions during their season and fall when it ends. Winter can flip the picture: some freight needs a heated trailer to avoid freezing, and the reefer unit works in reverse.",
          "A dispatcher who follows the season can line up the next region before the current one slows down. We will not promise any rate for any month.",
        ],
      },
      {
        heading: "Detention, lumpers and the cost of waiting",
        paragraphs: [
          "Reefer shippers and receivers are often busy and slow. Waiting with the unit running burns fuel too. We ask for the detention terms before booking and track the check-in time so you have proof when the free time is exceeded.",
          "Lumper fees are common at some receivers. We ask who pays and whether the broker will reimburse it, so the receipt is not a surprise.",
        ],
      },
      {
        heading: "Claims risk and broker choice",
        paragraphs: [
          "Cargo claims on reefer freight can be large. Before booking we check the broker's authority, credit and payment record, and we read the rate confirmation for the clauses that move liability to the carrier. You decide whether to accept the load.",
        ],
      },
      {
        heading: "Fuel for the reefer unit",
        paragraphs: [
          "The unit has its own tank. Running it dry on a cold or hot day can ruin a load. We keep the unit's fuel in mind when we plan stops, and the fuel card discounts that come with dispatch apply where the card is accepted.",
        ],
      },
      {
        heading: "What we need to know about your reefer",
        paragraphs: [
          // REVIEW: confirm the team has reefer experience and can follow these checks.
          "Tell us the age and make of your unit, the size of the fuel tank, whether it can run continuous and start-stop, and whether it can log temperatures. Tell us which commodities you will haul and which you will not. Some drivers avoid raw meat or seafood and some avoid produce with long dock waits. That is a good reason to say it before the search, not after.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you dispatch both continuous and start-stop reefer loads?",
        a: "Yes. We check which mode the product needs and tell you before you accept the load.",
      },
      {
        q: "Who is responsible if the product arrives warm?",
        a: "That depends on the rate confirmation and the cause. Keep your temperature records. We review the clauses before booking, but we are not your insurance or your lawyer.",
      },
      {
        q: "Will you help with the paperwork if a claim is filed?",
        a: "We can send the BOL, rate confirmation and your temperature records to the broker. Claims are decided by the broker and your insurer.",
      },
      {
        q: "Do you handle reefer loads in winter?",
        a: "Yes. Some freight needs protection from freezing, and we check the set point and heat requirements on the rate confirmation.",
      },
    ],
  },
  {
    slug: "flatbed",
    name: "Flatbed",
    title: "Flatbed Dispatch for Owner-Operators",
    description:
      "Flatbed dispatch for owner-operators and small fleets. Flat weekly price, a dispatcher on your time zone, tarp pay and securement checked before you book.",
    eyebrow: "FLATBED DISPATCH",
    h1: "Flatbed dispatch built around the work on the deck",
    intro:
      "Flatbed freight takes work from the driver: strapping, chaining, tarping. A good flatbed load pays for that work. A bad one does not. Dispatch starts with telling the two apart before you drive to the shipper.",
    sections: [
      {
        heading: "What flatbeds haul",
        paragraphs: [
          "The common loads are steel, lumber, building materials, pipe, machinery parts and block or brick. Each has its own habits, such as steel coils needing specific chains and lumber needing a tarp and straps.",
        ],
        bullets: [
          "Steel: coils, plate, beams, rebar.",
          "Lumber and building supplies, sometimes with a forklift on the truck.",
          "Pipe and tubing.",
          "Machinery and parts that fit within legal dimensions.",
        ],
      },
      {
        heading: "Tarps and tarp pay",
        paragraphs: [
          "A tarped load takes more time, more gear and, in wind and rain, more risk. Many brokers add a tarp fee. We ask for it by name before booking, and if the fee is missing from the rate confirmation we ask for it to be added.",
          "We also ask what kind of tarp it takes. Lumber and steel are different jobs, and the height of the freight decides what you will need.",
        ],
      },
      {
        heading: "Securement is your call, and ours to check",
        paragraphs: [
          "You are the one on the deck, so you decide if a load is secure. We help by asking the shipper what the freight is, how it is blocked, and whether dunnage is provided. You need straps and chains to match the weight, plus corner protectors where straps meet sharp edges.",
          "If the load description does not match the rate confirmation, we call the broker before you drive to the shipper.",
        ],
      },
      {
        heading: "Oversize and permits",
        paragraphs: [
          // REVIEW: confirm permitted/oversize loads are out of scope for TruckerHQ dispatch.
          "Oversize and overweight permits are outside what we cover. We dispatch legal-size and legal-weight flatbed loads only. If a load needs a permit or escorts, we will tell you and pass on it unless you have already arranged the permit.",
        ],
      },
      {
        heading: "Construction seasons and lanes",
        paragraphs: [
          "Flatbed follows construction and manufacturing. Freight builds in the warm months and slows when the weather turns, though industrial lanes keep moving. Winter loads need more care with ice and with tarps that freeze. Many flatbed shippers also post loads late, so a dispatcher who calls direct can find freight before it hits a board.",
        ],
      },
      {
        heading: "Rates, brokers and paperwork",
        paragraphs: [
          "We negotiate the line rate and the extras, such as tarp, stop-off and layover. Before booking we check the broker's authority, credit and days to pay. Afterward we send the BOL, invoice and factoring packet. You pay a flat weekly price, not a share of the load.",
        ],
      },
      {
        heading: "What we need to know about your flatbed",
        paragraphs: [
          // REVIEW: confirm the team has flatbed experience and the load-screening claims above.
          "Give us your deck length, the number of straps and chains you carry, whether you have tarps and how many, and any limits on height. Tell us which freight you will not haul, for example loads that need a forklift on the truck. We can then screen out the loads you would turn down anyway and save you the phone calls.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you add tarp pay to the rate confirmation?",
        a: "We ask for it before booking. Whether the broker agrees depends on the load, but we do not accept a tarped load without discussing it.",
      },
      {
        q: "Can you dispatch oversize or permitted loads?",
        a: "No. We handle legal-size, legal-weight flatbed freight. Permitted loads need their own planning and are not part of our service.",
      },
      {
        q: "Do you know which shippers load fast?",
        a: "We learn it from the drivers we work with and from dock times. We cannot promise a time at any shipper.",
      },
      {
        q: "I only run a 48-foot flatbed. Is that fine?",
        a: "Yes. Tell us your length, your straps and chains, and whether you carry tarps, and we search for matching loads.",
      },
    ],
  },
  {
    slug: "step-deck",
    name: "Step deck",
    title: "Step Deck Dispatch for Owner-Operators",
    description:
      "Step deck dispatch for owner-operators and small fleets. Flat weekly price, a dispatcher on your time zone, and loads checked for height and securement.",
    eyebrow: "STEP DECK DISPATCH",
    h1: "Step deck dispatch for taller and heavier freight",
    intro:
      "A step deck sits lower than a flatbed, so it carries taller freight under the legal height limit. That makes it the trailer for equipment, machinery and anything a flatbed cannot clear. The dispatch work is matching your deck to the load.",
    sections: [
      {
        heading: "Why the step deck is a separate market",
        paragraphs: [
          "The main deck is lower than a flatbed, with a short upper deck at the front. Loads that would be too tall on a flatbed can fit on a step deck without a permit. Brokers who need that capacity often have fewer trucks to call, which can work in your favor on rate, but the loads are fewer too.",
        ],
      },
      {
        heading: "Common step deck freight",
        paragraphs: [
          "Most step deck work is equipment and machinery, plus tall building materials and steel fabrications.",
        ],
        bullets: [
          "Construction equipment that fits within legal dimensions.",
          "Industrial machinery on skids or crates.",
          "Tall prefabricated or fabricated pieces.",
          "Vehicles and trailers, depending on your ramps.",
        ],
      },
      {
        heading: "Height, length and weight come first",
        paragraphs: [
          "Before we call a broker we need the numbers: overall height of the freight on your deck, length and weight. A load that is a few inches too tall is not a load, it is a ticket or a stuck truck. We ask the broker for the dimensions in writing and compare them to your deck.",
          // REVIEW: confirm permitted loads are out of scope.
          "If a load turns out to need a permit, we say so plainly. We do not dispatch permitted loads, so we would pass on it.",
        ],
      },
      {
        heading: "Chains, ramps and loading",
        paragraphs: [
          "Rolling equipment needs ramps, and the weight decides what kind. Heavy machinery needs enough chains and binders rated for it. Ask the shipper how the freight will be loaded, whether there is a crane or forklift, and if you must supply blocking or dunnage.",
          "We pass these questions to the shipper and broker before you leave the yard, so you do not discover the answer at the gate.",
        ],
      },
      {
        heading: "Rates and extras",
        paragraphs: [
          "Equipment loads often carry extras, such as tarps, straps, stop-offs and wait time during loading. We ask for each one, check the lane average and negotiate. You approve each load.",
        ],
      },
      {
        heading: "Broker checks and paperwork",
        paragraphs: [
          "We check the broker's authority, credit and payment record. After delivery we send the BOL and invoice, to your factoring company or to the broker. The price is the same flat weekly amount whatever the load pays.",
        ],
      },
      {
        heading: "What we need to know about your step deck",
        paragraphs: [
          // REVIEW: confirm the team has step deck and equipment-hauling experience.
          "Tell us your deck lengths, whether you run a standard or a double-drop trailer, the ramps you carry and how many chains and binders. Tell us what you have hauled before. A driver who has moved excavators gets a different search from one who mostly hauls tall steel fabrications. The more precise the picture of your truck, the fewer wasted calls.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the difference between step deck and flatbed dispatch?",
        a: "The load search differs. Step deck loads are often taller or heavier and need exact dimensions, ramps and chains. The service and the flat weekly price are the same.",
      },
      {
        q: "Can you find loads that need a permit?",
        a: "No. We dispatch legal-size and legal-weight loads. If a load needs a permit, we pass on it.",
      },
      {
        q: "Do you need my deck length and ramp details?",
        a: "Yes. We ask for your deck lengths, your ramps, how many chains and binders you carry, and whether you can tarp.",
      },
      {
        q: "Are step deck loads easier to find than flatbed loads?",
        a: "There are fewer of them. We search boards and call brokers directly to cover the lanes you run.",
      },
    ],
  },
  {
    slug: "power-only",
    name: "Power only",
    title: "Power Only Dispatch for Owner-Operators",
    description:
      "Power only dispatch for owner-operators with a tractor and no trailer. Flat weekly price, a dispatcher on your time zone, and trailer pool loads checked.",
    eyebrow: "POWER ONLY DISPATCH",
    h1: "Power only dispatch when you bring the tractor",
    intro:
      "With power only, you bring the tractor and the shipper or broker brings the trailer. There is no trailer payment and no trailer to keep, but the paperwork and the insurance work differently. Dispatch is the same: find the load, check the terms, handle the paper.",
    sections: [
      {
        heading: "How power only works",
        paragraphs: [
          "You hook to a trailer you do not own, pull it to the destination and drop it. The trailer can be a dry van, a reefer, a container chassis or a flatbed. The loads are usually shorter and more repeatable than spot freight, because the same trailer pool serves the same facilities.",
        ],
      },
      {
        heading: "Who uses power only",
        paragraphs: [
          "Large shippers, third-party logistics firms and some brokers keep trailer pools and need tractors to move them. Drayage and intermodal work is a similar idea with containers and chassis.",
        ],
        bullets: [
          "Retailers and manufacturers with their own trailer fleets.",
          "Third-party logistics providers moving drop trailers between sites.",
          "Brokers with trailer access that need extra capacity.",
          "Carriers who are short of tractors for a busy season.",
        ],
      },
      {
        heading: "Trailer interchange insurance",
        paragraphs: [
          "When you pull a trailer you do not own, the owner usually requires trailer interchange coverage, and you need to know who is responsible if it is damaged. Talk to your insurance agent before the first power only load. We check what the rate confirmation or interchange agreement asks for and flag it to you.",
        ],
      },
      {
        heading: "Inspect the trailer before you leave",
        paragraphs: [
          "A trailer in a pool may have worn tires, bad lights or a damaged door. Walk around it, photograph any damage, and note it on the paperwork before you pull out. Otherwise you may be blamed for it later. If something is unsafe, call us and we talk to the broker.",
        ],
      },
      {
        heading: "Rates, miles and the empty trailer",
        paragraphs: [
          "Power only usually pays a flat rate or per-mile rate that is lower than a loaded van. You gain fewer waits, no trailer costs and more predictable runs. We compare the rate with what your truck can earn on regular freight and tell you which is better for your week. We cannot promise either.",
          "We ask whether the trailer is loaded or empty, who will load it, and where you drop it. We also ask about wait time at the pickup yard.",
        ],
      },
      {
        heading: "Paperwork and pay",
        paragraphs: [
          "Power only loads still need a rate confirmation, a trailer interchange record and a signed delivery. We handle the invoice and the factoring packet, and we check the broker's authority, credit and payment record before booking. You pay one flat weekly price per truck.",
        ],
      },
      {
        heading: "Is power only right for you?",
        paragraphs: [
          // REVIEW: confirm the team has power only / trailer pool contacts.
          "It suits drivers who want to skip the trailer payment, or who have a tractor and want steady local or regional work. It suits less if you want to choose your own freight and negotiate each rate on the spot market. Tell us which you want, and we will search for it.",
          "Some power only runs are short and return you home each night. Others are long. We ask for the route and the drop point before you accept.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need my own trailer?",
        a: "No. Power only means you supply the tractor. The shipper or broker supplies the trailer.",
      },
      {
        q: "Do I need special insurance?",
        a: "Often yes. Trailer interchange coverage is commonly required. Ask your agent, and send us the requirements on any rate confirmation you want to check.",
      },
      {
        q: "Can I do power only and regular freight on the same truck?",
        a: "Yes, if you have the trailer for regular freight. We can look at both and compare.",
      },
      {
        q: "Are power only loads steady?",
        a: "They can be repeatable when a shipper uses a trailer pool, but we cannot promise volume. We will tell you what is on offer.",
      },
    ],
  },
  {
    slug: "new-authority",
    name: "New authority",
    title: "Dispatch for New MC Authority, First 90 Days",
    description:
      "Dispatch for new MC authorities under 6 months. Broker setup packets, brokers that accept new MCs, and a flat weekly price with no percentage of your loads.",
    eyebrow: "NEW AUTHORITY DISPATCH",
    h1: "Dispatch for a new MC, from the first load",
    intro:
      "A new authority has a real problem: you have a truck and a number, but no history. Many brokers will not book a carrier without one. The first 90 days are about getting set up, building a record and surviving on thin margins.",
    sections: [
      {
        heading: "Why the first 90 days are hard",
        paragraphs: [
          "Many brokers want a minimum time in business or a safety record before they send you loads. Loads from the ones that do accept new carriers often pay less. Fixed costs like insurance and the truck payment start before the money does. A dispatcher cannot change that, but one who knows which brokers will say yes saves you weeks of calls.",
        ],
      },
      {
        heading: "Before your authority is active",
        paragraphs: [
          // 10 days from FMCSA Register publication: 49 CFR 365.203.
          "After you apply, the FMCSA publishes your application in the FMCSA Register, and a 10-day protest period runs before authority goes live. Insurance filings must be on record too. Our New MC Checklist walks through each step in order.",
          "Do not sit waiting for that date. Use it to collect your setup documents and build the packet brokers ask for.",
        ],
        bullets: [
          "MC and DOT numbers, and your W-9.",
          "Certificate of insurance and your cargo and liability limits.",
          "Notice of assignment and your factoring agreement, if you factor.",
          "A voided check or bank details for direct payment.",
        ],
      },
      {
        heading: "Brokers that accept new MCs",
        paragraphs: [
          // REVIEW: confirm TruckerHQ really has brokers that accept new MCs and say so in these terms.
          "Some brokers take new carriers and some do not. We keep a working list of the ones that do and send your setup packet to them. This is the main thing the Starter MC package covers.",
          "We check each broker's credit and payment record before booking. A broker that accepts anyone is not always one that pays on time. The risk is higher for a new carrier with little cash behind it.",
        ],
      },
      {
        heading: "Factoring when cash is thin",
        paragraphs: [
          "Brokers can take 30 days or longer to pay. Many new carriers use a factoring company to get paid within days for a fee. We prepare the packet the factor needs: the rate confirmation, signed BOL and invoice. Choosing a factor is your decision, and the terms vary, so read them.",
        ],
      },
      {
        heading: "The new entrant safety audit",
        paragraphs: [
          "New carriers are subject to an FMCSA new entrant safety audit in their first months of operation. It looks at your records, such as driver qualification files, hours of service, insurance and drug testing. We send compliance reminders for your dates, but the records and the audit are yours.",
        ],
      },
      {
        heading: "A flat weekly price while you grow",
        paragraphs: [
          "The Starter MC package is a flat weekly price per truck for MCs under 6 months. We never take a percentage of your loads, and you can stop with one week's notice. See the pricing below on this page.",
        ],
      },
      {
        heading: "What a realistic first month looks like",
        paragraphs: [
          "Expect to run a few lanes with a few brokers while you build a payment record. Keep your costs low, keep your paperwork clean and do not accept a load just because it is offered. After a few on-time deliveries you can ask better brokers for more, and the packets you send get easier to approve.",
          "We cannot say how much you will earn in that time, and we will not promise it. We can say what each load pays, what it costs you to run and when you are likely to be paid.",
        ],
      },
    ],
    faq: [
      {
        q: "How soon can I run loads after I apply for my MC?",
        a: "Not until the authority is active. That depends on the FMCSA review, the protest period and your insurance filing. Our New MC Checklist lists the steps.",
      },
      {
        q: "Will brokers work with a brand-new MC?",
        a: "Some will, and some will not. We know which ones accept new authorities and send them your setup packet.",
      },
      {
        q: "Do I need a factoring company?",
        a: "No, but many new carriers use one for cash flow. We can work with your factor, or invoice brokers directly if you do not factor.",
      },
      {
        // REVIEW: confirm what happens to Starter MC pricing after 6 months.
        q: "What happens when my MC passes 6 months?",
        a: "You move to the regular owner-operator package. Nothing else changes, and we can discuss it before the date.",
      },
    ],
  },
];

export function findServicePage(slug: string): ServicePage | undefined {
  return DISPATCH_SERVICE_PAGES.find((p) => p.slug === slug);
}
