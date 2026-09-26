"use client";

import Link from "next/link";
import { useState } from "react";

const WATCH_ITEMS: [string, string, string][] = [
  ["auth", "Operating authority", "Active, pending, revoked or inactive"],
  ["ins", "Insurance filing", "BIPD and cargo on file, cancellation notices"],
  ["ucr", "UCR registration", "Reminder before the yearly deadline"],
  ["boc", "BOC-3 process agent", "Filing missing or removed"],
  ["oos", "Out-of-service order", "Any new OOS order on your DOT"],
  ["insp", "New inspections and crashes", "Every roadside inspection that hits your record"],
];

export default function ComplianceAlertsForm() {
  const [dot, setDot] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState<"EN" | "RU">("EN");
  const [done, setDone] = useState(false);
  const [watch, setWatch] = useState<Record<string, boolean>>({
    auth: true,
    ins: true,
    ucr: true,
    boc: true,
    oos: true,
    insp: false,
  });

  const found = dot.replace(/\D/g, "").length >= 6;
  const count = Object.values(watch).filter(Boolean).length;

  const sample =
    lang === "RU"
      ? "Trucker HQ: страховой полис DOT 3412897 будет отменён 14 окт. Позвоните агенту, чтобы избежать отзыва MC."
      : "Trucker HQ: Insurance cancellation filed for DOT 3412897, effective Oct 14. Call your agent to keep your authority active.";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {done ? (
        <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-white p-7">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F2A900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-tight">
            Alerts are on
          </h2>
          <p className="text-base leading-relaxed text-[#3F444B]">
            We&apos;re watching {count} items for {dot || "DOT 3412897"}. A
            confirmation text is on its way.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <Link
              href="/tools/new-mc-checklist"
              className="flex h-[52px] items-center rounded-[10px] border-2 border-asphalt px-[22px] font-display text-lg font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
            >
              New MC Checklist
            </Link>
            <button
              onClick={() => {
                setDone(false);
                setDot("");
              }}
              className="flex h-[52px] items-center px-2 font-sans text-[15px] font-semibold text-green underline"
            >
              Watch another carrier
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="flex flex-col gap-[22px] rounded-lg border border-border bg-white p-[22px]"
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-display text-xl font-extrabold uppercase">
              1. Your DOT or MC number
            </span>
            <input
              value={dot}
              onChange={(e) => setDot(e.target.value)}
              placeholder="DOT 3412897"
              inputMode="numeric"
              className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-lg font-semibold tabular-nums outline-none focus:border-green"
            />
            {found && (
              <span className="flex items-center gap-2 text-sm font-semibold text-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Carpathian Freight LLC · Des Plaines, IL
              </span>
            )}
          </label>

          <div className="flex flex-col gap-2.5">
            <span className="font-display text-xl font-extrabold uppercase">2. What to watch</span>
            {WATCH_ITEMS.map(([k, t, d]) => {
              const on = !!watch[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setWatch((w) => ({ ...w, [k]: !w[k] }))}
                  className={`flex min-h-[60px] items-center gap-3.5 rounded-lg border-[1.5px] px-3.5 py-2.5 text-left ${
                    on ? "border-green bg-[#EEF6F1]" : "border-border bg-white"
                  }`}
                >
                  <span
                    className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border-2 ${
                      on ? "border-green bg-green" : "border-[#9CA0A8] bg-white"
                    }`}
                  >
                    {on && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-base font-semibold">{t}</span>
                    <span className="text-sm text-[#4B5058]">{d}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-display text-xl font-extrabold uppercase">3. Where to text you</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                aria-label="Mobile phone"
                className="h-14 rounded-[10px] border-[1.5px] border-[#9CA0A8] px-3.5 font-sans text-lg tabular-nums outline-none focus:border-green"
              />
              <div className="flex h-14 overflow-hidden rounded-[10px] border-[1.5px] border-[#9CA0A8]">
                {(["EN", "RU"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`flex-1 text-base font-semibold ${
                      lang === code ? "bg-asphalt text-offwhite" : "bg-white text-asphalt"
                    }`}
                  >
                    {code === "EN" ? "English" : "Русский"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="h-[60px] rounded-xl bg-amber font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
          >
            Turn on alerts
          </button>
          <span className="text-[13px] leading-relaxed text-grey">
            By turning on alerts you agree to receive texts from Trucker HQ
            about this DOT number. Free, usually 1–3 texts a year. Msg & data
            rates may apply. Reply STOP to cancel, HELP for help. See our{" "}
            <Link href="/sms-terms" className="underline hover:text-asphalt">
              SMS terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-asphalt">
              Privacy policy
            </Link>
            .
          </span>
        </form>
      )}

      <aside className="flex flex-col gap-4">
        <div className="flex flex-col gap-3.5 rounded-lg bg-asphalt p-6 text-offwhite">
          <span className="font-display text-[15px] font-bold tracking-[.1em] text-amber">
            WHAT A TEXT LOOKS LIKE
          </span>
          <div className="max-w-[340px] rounded-2xl rounded-bl-md bg-[#2A2D32] p-4 text-[15px] leading-relaxed">
            {sample}
          </div>
          <span className="text-[13px] text-[#AEB2B8]">Trucker HQ · today, 7:02 AM</span>
        </div>
        <div className="flex flex-col gap-2.5 rounded-lg border border-border bg-white p-[22px]">
          <h2 className="font-display text-2xl font-extrabold">Why this matters</h2>
          <p className="text-[15px] leading-relaxed text-[#3F444B]">
            If your insurance filing lapses, FMCSA can revoke your authority,
            and brokers stop tendering loads. Most carriers find out when a
            load gets cancelled. A text the same day gives you time to call
            your agent.
          </p>
        </div>
      </aside>
    </div>
  );
}
