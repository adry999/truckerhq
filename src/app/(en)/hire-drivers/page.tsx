import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HireDriversForm from "@/components/HireDriversForm";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hire CDL Drivers, Pre-Screened",
  description:
    "Post a driver job. We check CDL, MVR and experience before a driver reaches you. Solo and team drivers.",
  path: "/hire-drivers",
});

const STATS = [
  { big: "EN · RU", small: "Drivers who speak your language" },
  { big: "2–5 DAYS", small: "To first driver calls, typical" },
  { big: "CDL + MVR", small: "Checked before you call" },
  { big: "30 DAYS", small: "Free replacement on Full recruiting" },
];

const STEPS = [
  { n: "1", title: "Post the job", desc: "Pay, home time, equipment and lanes. Five minutes. We check your DOT." },
  { n: "2", title: "We screen drivers", desc: "CDL, MVR, experience and Clearinghouse. Only drivers who pass get through." },
  { n: "3", title: "You hire", desc: "Checked drivers call you. You interview and decide. Road test is yours." },
];

const CHECKS = [
  ["CDL", "Class, endorsements, expiration"],
  ["MVR", "Violations in the last 3 years"],
  ["PSP report", "Crash and inspection history"],
  ["Clearinghouse", "Drug and alcohol query"],
  ["Experience", "Previous employers verified"],
  ["Language", "English level noted, Russian if needed"],
];

const PLAN_A = [
  "Your job on Trucker HQ Jobs for 30 days",
  "Shown in English and Russian",
  "Your Health Score next to the job",
  "Applications sent to your phone",
];

const PLAN_B = [
  "Everything in Job post",
  "We call and screen every applicant",
  "CDL, MVR, PSP and Clearinghouse checks",
  "Free replacement within 30 days",
  "Pay only when a driver starts",
];

const FAQ = [
  { q: "How fast will I get drivers?", a: "Most carriers get their first calls in 2–5 days. Team drivers and hazmat take longer." },
  { q: "Do you hire new CDL graduates?", a: "Only if you ask for them. By default we send drivers with verified experience." },
  { q: "What if a driver quits in the first month?", a: "On Full recruiting, we replace the driver free within 30 days." },
  { q: "Can I hire owner-operators to lease on?", a: "Yes. Pick Owner-op as the position and we screen their truck and paperwork too." },
];

export default function HireDriversPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(FAQ)} />
      <SiteHeader />

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1724556271642-e9acaf03ac23?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt="Driver walking to a truck in a yard, morning"
            fill
            loading="eager"
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-[22px] px-4 py-16 sm:px-6 md:py-28">
          <h1 className="max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
            A parked truck
            <br />
            <span className="text-amber">makes no money.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA] md:text-xl">
            Post a driver job and get checked CDL drivers calling you. English
            and Russian-speaking drivers, solo and team.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#post"
              className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              Post a driver job
            </a>
            <a
              href={PHONE_HREF}
              className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 px-4 py-7 sm:px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.small} className="flex flex-col gap-1">
              <div className="font-display text-4xl font-extrabold text-green">{s.big}</div>
              <div className="text-[15px] leading-snug text-[#3F444B]">{s.small}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          From job post to driver in the seat
        </h2>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-3.5">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                {s.n}
              </div>
              <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
              <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-start md:py-24">
          <div className="flex flex-col gap-[18px]">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              WHAT WE CHECK
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              You only talk to drivers who pass
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-[#C9CBCF]">
              Every driver we send has been screened. You still make the final
              call.
            </p>
          </div>
          <div className="overflow-hidden rounded-[10px] bg-white text-asphalt">
            {CHECKS.map(([t, d], i) => (
              <div
                key={t}
                className={`flex items-center gap-3.5 px-5 py-4 ${i ? "border-t border-[#ECEDEA]" : ""}`}
              >
                <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#E2F0E8] px-2.5 py-1 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                  <span className="h-2 w-2 rounded-full bg-green" />
                  CHECKED
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-bold">{t}</span>
                  <span className="text-sm text-grey">{d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Two ways to hire
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3.5 rounded-[10px] border-[1.5px] border-border bg-white p-6">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-grey">
              DO IT YOURSELF
            </div>
            <div className="font-display text-4xl font-extrabold uppercase">Job post</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-extrabold">$XXX</span>
              <span className="text-[15px] text-[#4B5058]">/ 30 days</span>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {PLAN_A.map((it) => (
                <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                  {it}
                </li>
              ))}
            </ul>
            <a
              href="#post"
              className="flex h-14 items-center justify-center rounded-xl border-2 border-asphalt font-display text-xl font-extrabold uppercase tracking-[.05em] hover:bg-asphalt hover:text-offwhite"
            >
              Post a job
            </a>
          </div>
          <div className="flex rounded-[10px] bg-green p-1.5">
            <div className="flex flex-1 flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6 text-offwhite">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
                WE DO IT FOR YOU
              </div>
              <div className="font-display text-4xl font-extrabold uppercase">Full recruiting</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-extrabold">$XXX</span>
                <span className="text-[15px] text-[#DCE6E0]">per driver hired</span>
              </div>
              <ul className="flex flex-1 flex-col gap-2.5">
                {PLAN_B.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#post"
                className="flex h-14 items-center justify-center rounded-xl bg-amber font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                Start recruiting
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="post" className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Tell us who you need
          </h2>
          <HireDriversForm />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Hiring questions
        </h2>
        <div className="flex flex-col border-t-2 border-asphalt">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
                {f.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
