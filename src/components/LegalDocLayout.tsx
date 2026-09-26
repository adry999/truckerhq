import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type LegalSection = {
  heading: string;
  body: string;
};

type LegalLink = {
  label: string;
  href: string;
};

type LegalDocLayoutProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  otherDocs: LegalLink[];
};

export default function LegalDocLayout({
  title,
  lastUpdated,
  sections,
  otherDocs,
}: LegalDocLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-[760px] flex-1 flex-col gap-[22px] px-4 py-14 sm:px-6 md:py-20">
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">
          {title}
        </h1>

        <p className="text-sm text-grey">Last updated: {lastUpdated}</p>

        <div className="rounded-lg bg-[#FFF7E0] p-5 text-[15px] leading-relaxed text-[#4B5058]">
          Outline only. The final text must be written or reviewed by a
          lawyer before launch.
        </div>

        {sections.map((s) => (
          <div key={s.heading} className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-extrabold">
              {s.heading}
            </h2>
            <p className="text-base leading-relaxed text-[#3F444B]">
              {s.body}
            </p>
          </div>
        ))}

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          {otherDocs.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="text-[15px] font-semibold text-green hover:underline"
            >
              {d.label} →
            </Link>
          ))}
        </div>

        <p className="text-sm text-grey">
          Questions: hello@truckerhq.com · Trucker HQ, Street address, City,
          ST 00000
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
