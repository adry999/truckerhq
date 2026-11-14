import { Button } from "@/shared/ui/Button";
import { ButtonRow } from "@/shared/ui/ButtonRow";
import { formatCensusDate } from "@/features/carriers/model/state-content";

export function StateLookupCta({
  stateName,
  sourceName,
  sourceUrl,
  sourceFetchedAt,
}: {
  stateName: string;
  sourceName: string;
  sourceUrl: string;
  sourceFetchedAt: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
        Check a {stateName} carrier
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-ink-3">
        Have a DOT or MC number? Look it up to see authority, insurance, safety record and the
        Health Score before you book a load. Starting your own authority? Our new-MC checklist
        walks through the steps.
      </p>
      <ButtonRow>
        <Button href="/tools/carrier-lookup" size="lg">
          Carrier lookup
        </Button>
        <Button href="/tools/new-mc-checklist" variant="outline" size="lg">
          New MC checklist
        </Button>
      </ButtonRow>
      <p className="text-sm text-grey">
        Source:{" "}
        <a href={sourceUrl} className="underline" rel="noopener noreferrer">
          {sourceName}
        </a>
        , data as of {formatCensusDate(sourceFetchedAt)}. Counts cover active interstate carriers
        authorized for hire with a physical address in {stateName}.
      </p>
    </section>
  );
}
