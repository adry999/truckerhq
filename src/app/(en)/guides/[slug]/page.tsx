import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { GUIDES, findGuide } from "@/lib/guides";

const FEATURED_SLUG = "how-to-tell-if-a-load-pays-enough";

const READ_NEXT_SLUGS = [
  "rate-per-mile-vs-all-in-rate-what-brokers-mean",
  "when-to-turn-down-a-load",
  "detention-pay-how-to-get-it-on-the-rate-con",
];

function updatedLabel(date: string) {
  const d = new Date(date);
  return `Updated ${d.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return {};

  const description =
    guide.slug === FEATURED_SLUG
      ? "Work out your cost per mile, add deadhead, and know your walk-away number before you call the broker."
      : `A ${guide.category.toLowerCase()} guide for owner-operators from Trucker HQ dispatch. ${guide.minutes} min read.`;

  return buildMetadata({
    title: guide.title,
    description,
    path: `/guides/${slug}`,
    ogImage: false,
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  const readNext = READ_NEXT_SLUGS.map((s) => findGuide(s)).filter(
    (g): g is NonNullable<typeof g> => g !== undefined && g.slug !== guide.slug
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    author: { "@type": "Person", name: guide.author },
    datePublished: guide.date,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={schema} />
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-7 sm:px-6 md:py-10">
        <div className="flex items-center gap-1.5 text-sm text-grey">
          <Link href="/guides" className="font-bold text-asphalt">
            Guides
          </Link>
          <span>/</span>
          <span>{guide.category}</span>
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-full bg-border" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-bold">
              {guide.author} <span className="font-normal text-grey">· Trucker HQ dispatch</span>
            </span>
            <span className="text-sm text-grey">
              {guide.minutes} min read · {updatedLabel(guide.date)}
            </span>
          </div>
        </div>

        <div className="aspect-video rounded-lg bg-border" />

        {guide.slug === FEATURED_SLUG ? (
          <article className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed">
              A load that looks good on the board can lose money once you
              count the miles to pick it up and what your truck costs to run.
              Before you call the broker, you need one number: the lowest
              rate per mile you will take.
            </p>

            <h2 className="font-display text-3xl font-extrabold">
              1. Know your cost per mile
            </h2>
            <p className="text-base leading-relaxed text-[#3F444B]">
              Add up a normal month: truck payment, insurance, fuel,
              maintenance, tolls, permits, phone, ELD and your own pay.
              Divide by the miles you drove that month, loaded and empty.
              That is what every mile costs you, whether or not a load is on
              the trailer.
            </p>

            <div className="flex flex-col gap-2 rounded-lg bg-asphalt p-6 text-offwhite">
              <span className="font-display text-sm font-bold tracking-[.12em] text-amber">
                EXAMPLE MONTH
              </span>
              <p className="text-base leading-relaxed text-[#D4D6DA]">
                Truck payment $2,400 · Insurance $1,300 · Fuel $7,200 ·
                Maintenance and tires $1,500 · Tolls, permits, ELD, phone $900
                · Your pay $4,500
              </p>
              <p className="font-display text-2xl font-extrabold text-offwhite">
                ÷ 10,000 miles = $1.78 per mile
              </p>
            </div>

            <h2 className="font-display text-3xl font-extrabold">
              2. Count the deadhead
            </h2>
            <p className="text-base leading-relaxed text-[#3F444B]">
              Brokers quote the rate on loaded miles. If the pickup is 80
              miles away, you drive those miles for free. Divide the total
              pay by loaded plus empty miles to see the real rate.
            </p>

            <div className="flex flex-col gap-1.5 rounded-lg border-[1.5px] border-border bg-white p-6">
              <p className="text-base leading-relaxed text-[#3F444B]">
                $2,100 for 800 loaded miles looks like $2.63/mi.
              </p>
              <p className="font-display text-xl font-extrabold">
                Add 80 miles to the pickup: $2,100 ÷ 880 = $2.39/mi.
              </p>
            </div>

            <h2 className="font-display text-3xl font-extrabold">
              3. Set your walk-away number
            </h2>
            <p className="text-base leading-relaxed text-[#3F444B]">
              Take your cost per mile and add the profit you need. If your
              cost is $1.78 and you want at least 40 cents a mile, anything
              under $2.18 all-in is a no. Write it down before you call, so
              the broker&rsquo;s pitch doesn&rsquo;t move you.
            </p>

            <h2 className="font-display text-3xl font-extrabold">
              4. Look at where the load leaves you
            </h2>
            <p className="text-base leading-relaxed text-[#3F444B]">
              A high rate into a market with no freight out can cost you a
              day and a long deadhead. Sometimes a lower rate into a busy
              lane pays more over the week. Check what loads are posted out
              of the delivery city before you say yes.
            </p>

            <div className="flex flex-col gap-3 rounded-lg bg-green p-6 text-offwhite">
              <span className="font-display text-2xl font-extrabold uppercase">
                Run your own numbers
              </span>
              <p className="text-base leading-relaxed text-[#D4D6DA]">
                The Profit per mile calculator does this math for any load.
              </p>
              <Link
                href="/tools/profit-per-mile"
                className="mt-1 flex h-12 w-fit items-center rounded-lg bg-amber px-6 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                Open calculator
              </Link>
            </div>
          </article>
        ) : (
          <article>
            <p className="text-lg leading-relaxed">
              This guide is being written by our dispatch team — check back
              soon.
            </p>
          </article>
        )}

        {readNext.length > 0 && (
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
            <span className="font-display text-sm font-bold tracking-[.12em] text-grey">
              READ NEXT
            </span>
            <div className="flex flex-col gap-2.5">
              {readNext.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg border-[1.5px] border-border bg-white p-4 hover:border-green"
                >
                  <span className="text-base font-bold">{g.title}</span>
                  <span className="shrink-0 text-sm text-grey">{g.minutes} min</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
