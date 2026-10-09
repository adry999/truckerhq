import Link from "next/link";

export function FeaturedGuideBody() {
  return (
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
  );
}
