"use client";

import Link from "next/link";
import { useState } from "react";
import { healthColor } from "@/lib/data";

const CARRIER = {
  name: "Carpathian Freight LLC",
  dot: "3412897",
  mc: "MC 1182044",
  score: 86,
  slug: "carpathian-freight-3412897",
};

const STEPS = ["Verify", "Details", "Done"] as const;

const CONTACT_METHODS = [
  {
    id: "phone" as const,
    label: "Text to the phone on FMCSA record",
    masked: "(•••) •••-4471",
  },
  {
    id: "email" as const,
    label: "Email on FMCSA record",
    masked: "o•••@carpathianfreight.com",
  },
];

const EQUIPMENT_OPTIONS = ["Dry van", "Reefer", "Flatbed", "Step deck", "Power only"];
const LANE_OPTIONS = ["Midwest", "Northeast", "Southeast", "Texas & South", "West Coast", "Mountain"];

const ALSO_SHOW: [string, string][] = [
  ["russian", "We speak Russian"],
  ["hiring", "We are hiring drivers"],
  ["direct", "Looking for direct shippers and brokers"],
];

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function ClaimProfileWizard() {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [contactMethod, setContactMethod] = useState<"phone" | "email" | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState<string[]>(["Dry van"]);
  const [lanes, setLanes] = useState<string[]>(["Midwest"]);
  const [alsoShow, setAlsoShow] = useState<Record<string, boolean>>({
    russian: true,
    hiring: false,
    direct: true,
  });

  const selectedAlsoShow = ALSO_SHOW.filter(([k]) => alsoShow[k]).map(([, label]) => label);

  const primaryLabel = step === 0 ? (codeSent ? "Verify code" : "Send code") : "Publish profile";
  const primaryDisabled =
    (step === 0 && !codeSent && !contactMethod) ||
    (step === 0 && codeSent && code.replace(/\D/g, "").length < 6);

  function handlePrimaryClick() {
    if (step === 0) {
      if (!codeSent) {
        setCodeSent(true);
        return;
      }
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
  }

  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:pb-10">
          <div className="flex gap-3">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col gap-1.5">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-amber" : "bg-white/20"}`} />
                <span
                  className={`font-display text-sm font-bold uppercase tracking-[.08em] ${
                    i <= step ? "text-amber" : "text-[#7D8189]"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-3 md:py-12">
        <div className="flex min-w-0 flex-col gap-5 md:col-span-2">
          <div className="flex flex-col gap-5 rounded-lg border border-border bg-white p-[22px]">
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-display text-3xl font-extrabold uppercase leading-tight">
                    Prove it&apos;s your company
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#3F444B]">
                    We&apos;ll send a 6-digit code to the phone or email on your
                    FMCSA record. Enter it here to prove you run this company.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {CONTACT_METHODS.map((m) => {
                    const on = contactMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setContactMethod(m.id)}
                        className={`flex min-h-[64px] items-center gap-3.5 rounded-lg border-[1.5px] px-3.5 py-2.5 text-left ${
                          on ? "border-green bg-[#EEF6F1]" : "border-border bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                            on ? "border-green" : "border-[#9CA0A8]"
                          }`}
                        >
                          {on && <span className="h-[10px] w-[10px] rounded-full bg-green" />}
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="font-display text-lg font-extrabold tabular-nums tracking-[.02em]">
                            {m.masked}
                          </span>
                          <span className="text-sm text-[#4B5058]">{m.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {codeSent && (
                  <label className="flex flex-col gap-2">
                    <span className="font-display text-lg font-extrabold uppercase">
                      Enter the 6-digit code
                    </span>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="000000"
                      className="h-16 w-full max-w-[240px] rounded-[10px] border-[1.5px] border-[#9CA0A8] pl-[.6em] text-center font-display text-3xl font-extrabold tracking-[.5em] tabular-nums outline-none focus:border-green"
                    />
                    <span className="text-[13px] leading-relaxed text-grey">
                      Didn&apos;t get it? Wait a minute and resend. Your contact
                      info is wrong on FMCSA? Update your MCS-150 first.
                    </span>
                  </label>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-display text-3xl font-extrabold uppercase leading-tight">
                    What brokers and drivers should see
                  </h2>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-display text-xl font-extrabold uppercase">
                    Dispatch phone
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="(XXX) XXX-XXXX"
                    className="h-14 max-w-sm rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-lg tabular-nums outline-none focus:border-green"
                  />
                </label>

                <div className="flex flex-col gap-2.5">
                  <span className="font-display text-xl font-extrabold uppercase">Equipment</span>
                  <div className="flex flex-wrap gap-2">
                    {EQUIPMENT_OPTIONS.map((opt) => {
                      const on = equipment.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setEquipment((e) => toggleInArray(e, opt))}
                          className={`flex h-11 items-center rounded-full border-[1.5px] px-4 text-sm font-semibold ${
                            on
                              ? "border-green bg-[#EEF6F1] text-green"
                              : "border-border bg-white text-asphalt"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <span className="font-display text-xl font-extrabold uppercase">
                    Lanes you run
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {LANE_OPTIONS.map((opt) => {
                      const on = lanes.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setLanes((l) => toggleInArray(l, opt))}
                          className={`flex h-11 items-center rounded-full border-[1.5px] px-4 text-sm font-semibold ${
                            on
                              ? "border-green bg-[#EEF6F1] text-green"
                              : "border-border bg-white text-asphalt"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <span className="font-display text-xl font-extrabold uppercase">Also show</span>
                  {ALSO_SHOW.map(([k, label]) => {
                    const on = !!alsoShow[k];
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setAlsoShow((s) => ({ ...s, [k]: !s[k] }))}
                        className={`flex min-h-[52px] items-center gap-3.5 rounded-lg border-[1.5px] px-3.5 py-2.5 text-left ${
                          on ? "border-green bg-[#EEF6F1]" : "border-border bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-md border-2 ${
                            on ? "border-green bg-green" : "border-[#9CA0A8] bg-white"
                          }`}
                        >
                          {on && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        <span className="text-base font-semibold">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3.5 py-4">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F2A900"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-display text-4xl font-extrabold uppercase leading-tight">
                  Profile claimed
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-[#3F444B]">
                  Your profile now shows a &quot;Verified owner&quot; badge.
                  FMCSA data like authority, insurance and inspections still
                  comes from public records and updates on its own.
                </p>
                <div className="mt-1.5 flex flex-wrap gap-3">
                  <Link
                    href={`/tools/carrier-lookup/${CARRIER.slug}`}
                    className="flex h-14 items-center rounded-xl bg-amber px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
                  >
                    View my profile
                  </Link>
                  <Link
                    href="/tools/compliance-alerts"
                    className="flex h-14 items-center rounded-[10px] border-2 border-asphalt px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
                  >
                    Turn on alerts
                  </Link>
                </div>
              </div>
            )}

            {step !== 2 && (
              <div className="flex items-center justify-between gap-3 border-t border-[#ECEDEA] pt-5">
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex h-14 items-center px-2 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt"
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={handlePrimaryClick}
                  disabled={primaryDisabled}
                  className="h-14 rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {primaryLabel}
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-3 md:sticky md:top-6 md:self-start">
          <span className="font-display text-sm font-bold tracking-[.14em] text-grey">
            PREVIEW
          </span>
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-5">
            <div className="flex items-center gap-4">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(${healthColor(CARRIER.score)} ${CARRIER.score}%, #ECEDEA 0)`,
                }}
              >
                <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white">
                  <span className="font-display text-2xl font-extrabold">{CARRIER.score}</span>
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-lg font-extrabold uppercase leading-tight">
                  {CARRIER.name}
                </span>
                <span className="text-sm tabular-nums text-grey">
                  DOT {CARRIER.dot} · {CARRIER.mc}
                </span>
                {step >= 1 && (
                  <span className="mt-1 flex w-fit items-center gap-1.5 rounded-md bg-[#EEF6F1] px-2.5 py-1 text-xs font-bold uppercase tracking-[.05em] text-green">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Verified owner
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#ECEDEA] border-t border-[#ECEDEA]">
              <div className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                <span className="text-[#4B5058]">Phone</span>
                <span className="text-right font-semibold text-asphalt">
                  {step >= 1 && phone.trim() ? phone : "Not listed"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                <span className="text-[#4B5058]">Equipment</span>
                <span className="text-right font-semibold text-asphalt">
                  {step >= 1 && equipment.length ? equipment.join(", ") : "Not listed"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                <span className="text-[#4B5058]">Lanes</span>
                <span className="text-right font-semibold text-asphalt">
                  {step >= 1 && lanes.length ? lanes.join(", ") : "Not listed"}
                </span>
              </div>
              {step >= 1 && selectedAlsoShow.length > 0 && (
                <div className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                  <span className="text-[#4B5058]">Notes</span>
                  <span className="text-right font-semibold text-asphalt">
                    {selectedAlsoShow.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <span className="text-[13px] text-grey">
            Free. You can edit or hide these details any time.
          </span>
        </aside>
      </section>
    </>
  );
}
