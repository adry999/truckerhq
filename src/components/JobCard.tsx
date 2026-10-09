import Link from "next/link";
import { Badge } from "@/shared/ui/Badge";
import { HealthBadge } from "@/shared/ui/HealthBadge";

type JobCardProps = {
  href: string;
  title: string;
  meta: string;
  pay: string;
  payNote?: string;
  posted: string;
  tags: { label: string; variant: "green" | "muted" | "outline" }[];
  score?: number;
  healthLabel?: string;
  ctaLabel?: string;
};

export default function JobCard({
  href,
  title,
  meta,
  pay,
  payNote,
  posted,
  tags,
  score,
  healthLabel,
  ctaLabel,
}: JobCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-display text-[26px] font-extrabold uppercase leading-tight">{title}</span>
          <span className="text-sm text-ink-2">{meta}</span>
        </div>
        {score !== undefined && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-2xl border-[1.5px] border-border py-0.5 pl-1 pr-2">
            <HealthBadge score={score} size="sm" />
            <span className="text-[13px] font-semibold text-ink-2">{healthLabel}</span>
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-display text-[34px] font-extrabold tabular-nums text-green">{pay}</span>
        {payNote && <span className="text-sm text-ink-2">{payNote}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Badge key={t.label} variant={t.variant} className="rounded-md">
            {t.label}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between border-t border-divider pt-3 text-[13px] text-grey">
        <span>{posted}</span>
        {ctaLabel && (
          <span className="font-display text-[17px] font-bold tracking-[.05em] text-green">{ctaLabel}</span>
        )}
      </div>
    </Link>
  );
}
