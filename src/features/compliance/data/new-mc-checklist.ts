export type ChecklistItem = { title: string; description: string };
export type AuditStep = { number: string; title: string; description: string };
export type ChecklistFaq = { q: string; a: string };

export const BEFORE_YOU_HAUL: ChecklistItem[] = [
  {
    title: "USDOT & MC number",
    description:
      "Issued by FMCSA when you register through the Unified Registration System. Your authority goes active after a 4-day protest period.",
  },
  {
    title: "BOC-3 process agent",
    description:
      "Required in every state you operate. A process agent service can file blanket coverage for all 50 states in one shot.",
  },
  {
    title: "UCR registration",
    description:
      "Unified Carrier Registration, paid every year. The fee is based on how many trucks are in your fleet.",
  },
  {
    title: "BMC-91/91X insurance",
    description:
      "Liability and optional cargo insurance, filed straight to FMCSA by your insurer. This is not paperwork you file yourself.",
  },
  {
    title: "EIN & business bank account",
    description:
      "Keep company money separate from day one. Brokers and factoring companies will ask for both.",
  },
  {
    title: "IFTA & IRP",
    description:
      "Fuel tax license and apportioned plates if you run more than one state. Skip these and roadside stops get expensive fast.",
  },
];

export const AUDIT_STEPS: AuditStep[] = [
  {
    number: "1",
    title: "Authority goes active",
    description:
      "Your USDOT and MC are live. FMCSA starts an 18-24 month new entrant monitoring period the same day.",
  },
  {
    number: "2",
    title: "Audit gets scheduled",
    description:
      "Most new entrants see a safety audit within the first 12 months, often inside the first 60-90 days.",
  },
  {
    number: "3",
    title: "The paperwork gets checked",
    description:
      "Driver qualification files, HOS and ELD records, drug & alcohol testing, maintenance records and your accident register.",
  },
  {
    number: "4",
    title: "Pass, fix, or lose your authority",
    description:
      "Most failures are missing files, not violations. An unsatisfactory rating can lead to revoked operating authority.",
  },
];

export const SHUTDOWN_REASONS: ChecklistItem[] = [
  {
    title: "BOC-3 lapses",
    description:
      "Miss it in even one state you run and your authority can be frozen until it is refiled.",
  },
  {
    title: "Failing the audit on paperwork",
    description:
      "Missing driver files or HOS logs fails you just as fast as an actual safety problem.",
  },
  {
    title: "Skipping the Clearinghouse",
    description:
      "Every DOT-regulated carrier with drivers, even a solo owner-operator, must register for the Drug & Alcohol Clearinghouse.",
  },
  {
    title: "No ELD or HOS logs",
    description:
      "Running without required logs is one of the fastest paths to an unsatisfactory safety rating.",
  },
  {
    title: "BMC-91X lapses",
    description:
      "Let your insurance filing lapse for even a day and FMCSA revokes operating authority automatically, no grace period.",
  },
];

export const NEW_MC_FAQ: ChecklistFaq[] = [
  {
    q: "How long does it take to get my MC?",
    a: "USDOT and MC numbers are usually issued within a few business days of applying through URS. Your authority does not go active until a 4-day protest period passes and your BOC-3 and insurance filings are on file with FMCSA.",
  },
  {
    q: "Can I haul loads before the safety audit?",
    a: "Yes. You can haul as soon as your authority is active. The safety audit usually happens later in your first year, but FMCSA expects you to be keeping full driver, HOS and maintenance records from day one, not just once the audit is scheduled.",
  },
  {
    q: "What is BOC-3 and do I need it in every state?",
    a: "BOC-3 designates a process agent to accept legal papers on your behalf, and yes, you need coverage in every state you operate. Most process agent services file blanket coverage for all 50 states at once.",
  },
  {
    q: "Will brokers work with a brand-new MC?",
    a: "Some brokers filter out authorities under 6 months, mainly over insurance and fraud risk. Plenty still will, especially if a dispatcher who knows which brokers accept new MCs is setting up the load.",
  },
  {
    q: "What happens if I fail the new entrant audit?",
    a: "A conditional rating usually gives you a chance to correct the deficiencies. An unsatisfactory rating can lead to your operating authority being revoked, which shuts down your ability to haul.",
  },
];
