import { LOOKUP_FAQ, LOOKUP_GUIDE_UPDATED } from "@/features/carriers/model/guide";

const CHECKS = [
  "The MC and DOT numbers on the rate confirmation match the public record.",
  "Operating authority is active, and how long it has been active.",
  "Liability and cargo insurance are on file and not about to expire.",
  "Out-of-service rates and crashes are not far above the national average.",
  "The payment terms are in writing, and you know who actually pays.",
];

export function LookupGuide() {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-14 sm:px-6 md:py-20">
        <p className="text-sm text-grey">Updated {LOOKUP_GUIDE_UPDATED}</p>
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          How the carrier Health Score works
        </h2>
        <p className="text-lg leading-relaxed text-[#4B5058]">
          The Health Score is a 0 to 100 number built from four public FMCSA
          signals. Each one adds points, and the headline score is their sum.
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          <li><b>Authority, 30 points.</b> Full points for active authority, fewer if the carrier is allowed to operate but not active, none otherwise.</li>
          <li><b>Insurance, 25 points.</b> 15 for liability (BIPD) on file and 10 for cargo on file.</li>
          <li><b>Inspections, 30 points.</b> Starts at 30 and loses points for vehicle and driver out-of-service rates.</li>
          <li><b>Crashes, 15 points.</b> Starts at 15 and loses points for each reportable crash.</li>
        </ul>
        <p className="text-[17px] leading-relaxed text-[#4B5058]">
          The data is public FMCSA records, read through the FMCSA QCMobile
          API. The score is our own summary and is not published by FMCSA.
        </p>

        <h3 className="mt-4 font-display text-3xl font-extrabold">
          What to check before booking a broker
        </h3>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[#4B5058]">
          {CHECKS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-display text-3xl font-extrabold">Carrier lookup FAQ</h3>
        <dl className="flex flex-col gap-5">
          {LOOKUP_FAQ.map((f) => (
            <div key={f.q}>
              <dt className="text-lg font-bold">{f.q}</dt>
              <dd className="mt-1 text-[17px] leading-relaxed text-[#4B5058]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
