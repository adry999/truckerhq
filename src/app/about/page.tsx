import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutContactForm from "@/components/AboutContactForm";
import JsonLd from "@/components/JsonLd";
import { contactPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Trucker HQ: Dispatch Team, Contact",
  description:
    "Who we are, who answers the phone, and how to reach us 24/7. English and Russian.",
  path: "/about",
});

const CONTACT_SCHEMA = contactPageSchema({
  name: "About Trucker HQ",
  url: "https://truckerhq.com/about",
  telephone: "+1-XXX-XXX-XXXX",
  email: "hello@truckerhq.com",
});

const FACTS = [
  { k: "Founded", v: "20XX" },
  { k: "USDOT", v: "XXXXXXX" },
  { k: "MC", v: "XXXXXXX" },
  { k: "Languages", v: "English · Русский" },
];

const TEAM = [
  { name: "Name Surname", role: "Founder", note: "EN · RU" },
  {
    name: "Dispatcher Name",
    role: "Dispatcher · Dry van, reefer",
    note: "EN · RU · Nights, Central",
  },
  {
    name: "Dispatcher Name",
    role: "Dispatcher · Flatbed",
    note: "EN · RU · Days, Eastern",
  },
  {
    name: "Name Surname",
    role: "Driver recruiting",
    note: "EN · RU · Days, Central",
  },
];

const CONTACTS = [
  {
    k: "Dispatch, 24/7",
    v: "(XXX) XXX-XXXX",
    note: "Call or text",
    href: "tel:+1XXXXXXXXXX",
  },
  {
    k: "Office",
    v: "(XXX) XXX-XXXX",
    note: "Mon–Fri 9–6 CT",
    href: "tel:+1XXXXXXXXXX",
  },
  {
    k: "Email",
    v: "hello@truckerhq.com",
    note: "Reply same day",
    href: "mailto:hello@truckerhq.com",
  },
  {
    k: "Telegram / WhatsApp",
    v: "@truckerhq",
    note: "EN · RU",
    href: "#",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={CONTACT_SCHEMA} />
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col gap-[18px]">
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
              A small team that knows trucking
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA]">
              Trucker HQ started in 20XX in City, ST. [Two or three sentences
              in your own words: who started it, why, and who you work with
              today.]
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-white/16 pt-5">
              {FACTS.map((f) => (
                <div key={f.k} className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#AEB2B8]">{f.k}</span>
                  <span className="text-base font-semibold">{f.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-lg bg-border" />
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Who you&apos;ll talk to
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {TEAM.map((p) => (
              <div key={p.name + p.note} className="flex flex-col gap-3">
                <div className="aspect-[4/5] rounded-lg bg-border" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-bold">{p.name}</span>
                  <span className="text-[15px] text-[#4B5058]">{p.role}</span>
                  <span className="text-sm text-grey">{p.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2.5">
              <h2 className="font-display text-4xl font-extrabold md:text-5xl">
                Contact
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-[#3F444B]">
                Call, text or message us. Dispatch is answered 24/7.
              </p>
            </div>
            <div className="overflow-hidden rounded-[10px] border-[1.5px] border-border">
              {CONTACTS.map((c, i) => (
                <a
                  key={c.k}
                  href={c.href}
                  className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-offwhite ${
                    i ? "border-t border-border" : ""
                  }`}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm text-grey">{c.k}</span>
                    <span className="text-lg font-bold">{c.v}</span>
                  </span>
                  <span className="text-sm text-grey">{c.note}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-semibold">
                  Street address
                </span>
                <span className="text-base text-[#3F444B]">
                  City, ST 00000
                </span>
                <span className="text-sm text-grey">
                  Office Mon–Fri 9–6 CT. Dispatch line open 24/7.
                </span>
              </div>
              <div className="aspect-video rounded-lg bg-border" />
            </div>
          </div>
          <AboutContactForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
