"use client";

import { PHONE_HREF } from "@/lib/contact";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { Segmented } from "@/components/ui/Segmented";

const TRAILER_TYPES = ["Dry van", "Reefer", "Flatbed", "Step deck", "Power only"];
const DRIVER_TYPES = ["I drive", "Company driver", "Team"];
const REGIONS = [
  "Midwest",
  "Northeast",
  "Southeast",
  "Texas & South",
  "West Coast",
  "Mountain",
  "Anywhere",
];
const HOME_TIME_OPTIONS = ["Every night", "Every week", "Every 2 weeks", "Out 3+ weeks"];
const AUTHORITY_OPTIONS = ["I have an MC", "MC is pending", "I don't have one yet"];
const BEST_TIME_OPTIONS = ["Right now", "Today", "Tomorrow AM", "Tomorrow PM"];
const LANGUAGE_OPTIONS = ["English", "Русский"];

const STEP_LABELS = ["Truck", "Lanes", "Authority", "Call"];

const TIME_PHRASES: Record<string, string> = {
  "Right now": "in the next 15 minutes",
  Today: "today",
  "Tomorrow AM": "tomorrow morning",
  "Tomorrow PM": "tomorrow afternoon",
};

const READY_ITEMS = [
  "MC authority letter and W-9",
  "Certificate of insurance",
  "Truck and trailer numbers",
  "Factoring company, if you use one",
];

function CheckIcon({ stroke = "#FFFFFF" }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Stepper({
  value,
  onChange,
  min = 1,
  max = 50,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div role="group" aria-labelledby="trucks-label" className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Fewer trucks"
        className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border-[1.5px] border-[#9CA0A8] font-display text-2xl font-extrabold text-asphalt disabled:opacity-30"
      >
        −
      </button>
      <output
        aria-live="polite"
        className="flex h-[50px] w-[70px] items-center justify-center rounded-[10px] border-[1.5px] border-border bg-white font-display text-2xl font-extrabold tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="More trucks"
        className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border-[1.5px] border-[#9CA0A8] font-display text-2xl font-extrabold text-asphalt disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-t-0 first:pt-0">
      <span className="text-[#4B5058]">{label}</span>
      <span className="text-right font-semibold text-asphalt">{value}</span>
    </div>
  );
}

export default function DispatchStartWizard() {
  const [step, setStep] = useState(0);

  const [trailer, setTrailer] = useState("Dry van");
  const [trucks, setTrucks] = useState(1);
  const [driver, setDriver] = useState("I drive");

  const [homeBase, setHomeBase] = useState("");
  const [lanes, setLanes] = useState<string[]>(["Midwest"]);
  const [homeTime, setHomeTime] = useState("Every week");

  const [authority, setAuthority] = useState("I have an MC");
  const [mcNumber, setMcNumber] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("Today");
  const [language, setLanguage] = useState("English");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const toggleLane = (lane: string) => {
    setLanes((prev) => (prev.includes(lane) ? prev.filter((l) => l !== lane) : [...prev, lane]));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => Math.min(4, s + 1));
      return;
    }
    setSubmitting(true);
    setSubmitError(false);
    const website = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/dispatch-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailerType: trailer,
          trucks,
          driverType: driver,
          homeBase,
          lanes,
          homeTime,
          authority,
          mcNumber,
          name,
          phone,
          bestTime,
          language,
          website,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      trackEvent("dispatch_start_request", { trucks, authority });
      setStep(4);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const languageName = language === "English" ? "English" : "Russian";
  const timePhrase = TIME_PHRASES[bestTime] ?? "soon";

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-10 pt-6 sm:px-6 md:pb-14">
          <ol className="flex gap-2">
            {STEP_LABELS.map((label, i) => {
              const isFuture = i > step;
              const isPast = i < step;
              const clickable = isPast && step < 4;
              return (
                <li
                  key={label}
                  aria-current={i === step ? "step" : undefined}
                  className="flex flex-1 flex-col gap-2"
                >
                  <div className={`h-1.5 rounded-full ${isFuture ? "bg-white/20" : "bg-amber"}`} />
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      className="text-left font-display text-sm font-bold uppercase tracking-[.08em] text-amber hover:underline"
                    >
                      {label}
                    </button>
                  ) : (
                    <span
                      className={`font-display text-sm font-bold uppercase tracking-[.08em] ${
                        isFuture ? "text-[#AEB2B8]" : "text-amber"
                      }`}
                    >
                      {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
        <div className="grid gap-6 min-[900px]:grid-cols-3">
          <div className="min-[900px]:col-span-2">
            {step === 4 ? (
              <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-white p-7 text-center sm:p-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green">
                  <CheckIcon stroke="#F2A900" />
                </div>
                <h2 className="font-display text-4xl font-extrabold uppercase leading-tight">
                  You&apos;re on the list
                </h2>
                <p className="max-w-md text-base leading-relaxed text-[#3F444B]">
                  A dispatcher will call {phone.trim() || "you"} {timePhrase}, in {languageName}.
                  The call takes about 10 minutes.
                </p>
                <div className="w-full max-w-md rounded-lg bg-[#F2F2EF] p-5 text-left">
                  <span className="font-display text-lg font-extrabold uppercase">
                    Have these ready
                  </span>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {READY_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                          <CheckIcon stroke="#0E5C3A" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={PHONE_HREF}
                  className="mt-1.5 flex h-14 items-center justify-center rounded-xl border-2 border-asphalt px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
                >
                  Can&apos;t wait? Call now
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-7 rounded-lg border border-border bg-white p-[22px] sm:p-7"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {step === 0 && (
                  <div className="flex flex-col gap-7">
                    <h2 className="font-display text-3xl font-extrabold uppercase">Your truck</h2>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Trailer type</span>
                      <Segmented
                        options={TRAILER_TYPES}
                        value={trailer}
                        onChange={setTrailer}
                        label="Trailer type"
                        buttonClassName="h-[50px] flex-1 basis-[130px] px-3 font-sans text-[15px] font-semibold"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span id="trucks-label" className="text-sm font-semibold">
                        How many trucks?
                      </span>
                      <Stepper value={trucks} onChange={setTrucks} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Who drives?</span>
                      <Segmented
                        options={DRIVER_TYPES}
                        value={driver}
                        onChange={setDriver}
                        label="Who drives?"
                        buttonClassName="h-[50px] flex-1 basis-[130px] px-3 font-sans text-[15px] font-semibold"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="flex flex-col gap-7">
                    <h2 className="font-display text-3xl font-extrabold uppercase">
                      Lanes and home time
                    </h2>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">Home base</span>
                      <input
                        value={homeBase}
                        onChange={(e) => setHomeBase(e.target.value)}
                        placeholder="City, state"
                        className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none focus:border-green"
                      />
                    </label>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">
                        Where do you want to run? (Pick any)
                      </span>
                      <div
                        role="group"
                        aria-label="Where do you want to run?"
                        className="flex flex-wrap gap-2"
                      >
                        {REGIONS.map((region) => {
                          const on = lanes.includes(region);
                          return (
                            <button
                              key={region}
                              type="button"
                              role="checkbox"
                              aria-checked={on}
                              onClick={() => toggleLane(region)}
                              className={`h-[46px] rounded-[10px] px-4 font-sans text-[15px] font-semibold ${
                                on
                                  ? "border-[1.5px] border-green bg-green text-offwhite"
                                  : "border-[1.5px] border-[#9CA0A8] bg-white text-asphalt"
                              }`}
                            >
                              {region}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">How often home?</span>
                      <Segmented
                        options={HOME_TIME_OPTIONS}
                        value={homeTime}
                        onChange={setHomeTime}
                        label="How often home?"
                        buttonClassName="h-[50px] flex-1 basis-[130px] px-3 font-sans text-[15px] font-semibold"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-7">
                    <h2 className="font-display text-3xl font-extrabold uppercase">
                      Your authority
                    </h2>
                    <div role="radiogroup" aria-label="Your authority" className="flex flex-col gap-2.5">
                      {AUTHORITY_OPTIONS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          role="radio"
                          aria-checked={authority === a}
                          onClick={() => setAuthority(a)}
                          className={`flex h-[60px] items-center rounded-[10px] px-5 text-left font-sans text-base font-semibold ${
                            authority === a
                              ? "border-[1.5px] border-green bg-green text-offwhite"
                              : "border-[1.5px] border-[#9CA0A8] bg-white text-asphalt"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                    {authority !== "I don't have one yet" ? (
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold">MC/DOT number</span>
                        <input
                          value={mcNumber}
                          onChange={(e) => setMcNumber(e.target.value)}
                          placeholder="MC 1182044"
                          className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none focus:border-green"
                        />
                        <span className="text-[13px] text-grey">
                          We&apos;ll pull your record from FMCSA so you don&apos;t have to type it.
                        </span>
                      </label>
                    ) : (
                      <div className="rounded-lg border-[1.5px] border-amber bg-[#FDF3DC] p-4 text-[15px] leading-relaxed text-asphalt">
                        No problem. We&apos;ll walk you through the{" "}
                        <Link
                          href="/tools/new-mc-checklist"
                          className="font-semibold text-green underline"
                        >
                          New MC Checklist
                        </Link>{" "}
                        on the call and start booking as soon as your authority is active.
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-7">
                    <h2 className="font-display text-3xl font-extrabold uppercase">
                      When can we call?
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold">Name (required)</span>
                        <input
                          required
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none focus:border-green"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold">Phone (required)</span>
                        <input
                          required
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 555-5555"
                          className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-base outline-none focus:border-green"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Best time</span>
                      <Segmented
                        options={BEST_TIME_OPTIONS}
                        value={bestTime}
                        onChange={setBestTime}
                        label="Best time"
                        buttonClassName="h-[50px] flex-1 basis-[130px] px-3 font-sans text-[15px] font-semibold"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-semibold">Language</span>
                      <Segmented
                        options={LANGUAGE_OPTIONS}
                        value={language}
                        onChange={setLanguage}
                        label="Language"
                        containerClassName="grid max-w-[340px] grid-cols-2 gap-2"
                        buttonClassName="h-[50px] px-3 font-sans text-[15px] font-semibold"
                      />
                    </div>
                    <p className="text-[13px] leading-relaxed text-grey">
                      By requesting a call, you agree to receive a call and
                      text from Trucker HQ about this request. Msg &amp; data
                      rates may apply. Reply STOP to opt out. See{" "}
                      <Link href="/sms-terms" className="underline">
                        SMS terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline">
                        Privacy
                      </Link>
                      .
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="font-display text-base font-bold uppercase tracking-[.05em] text-grey hover:text-asphalt"
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-14 items-center justify-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {step === 3 ? (submitting ? "Sending..." : "Request my call") : "Next"}
                  </button>
                </div>
                {submitError && (
                  <p role="alert" className="text-sm font-semibold text-red">
                    Something went wrong. Try again, or call us directly.
                  </p>
                )}
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-4 min-[900px]:sticky min-[900px]:top-24 min-[900px]:self-start">
            <div className="flex flex-col gap-2 rounded-lg bg-asphalt p-5 text-offwhite">
              <span className="font-display text-[13px] font-bold tracking-[.14em] text-amber">
                YOUR PRICE
              </span>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold">$XXX</span>
                <span className="text-[15px] text-[#D4D6DA]">
                  / week × {trucks} truck{trucks === 1 ? "" : "s"}
                </span>
              </div>
              <span className="text-[13px] leading-relaxed text-[#AEB2B8]">
                Flat, week to week. No percentage and no contract.
              </span>
            </div>

            <div className="flex flex-col gap-2.5 rounded-lg border border-border bg-white p-5">
              <span className="font-display text-lg font-extrabold uppercase">So far</span>
              <div className="flex flex-col gap-2 text-[15px]">
                <SummaryRow label="Equipment" value={trailer} />
                <SummaryRow label="Trucks" value={String(trucks)} />
                <SummaryRow label="Drivers" value={driver} />
                {step >= 1 && (
                  <>
                    <SummaryRow label="Lanes" value={lanes.length ? lanes.join(", ") : "—"} />
                    <SummaryRow label="Home" value={homeTime} />
                  </>
                )}
                {step >= 2 && (
                  <SummaryRow label="Authority" value={mcNumber.trim() ? mcNumber : authority} />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
