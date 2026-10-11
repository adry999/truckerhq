import { healthColor, healthOnColor } from "@/lib/data";
import { cx } from "@/shared/ui/cx";

const SIZES = {
  sm: "h-[26px] w-[26px] text-[15px]",
  md: "h-7 w-7 text-base",
} as const;

export default function HealthBadge({
  score,
  size = "md",
}: {
  score: number;
  size?: keyof typeof SIZES;
}) {
  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full font-display font-extrabold",
        SIZES[size],
      )}
      style={{ background: healthColor(score), color: healthOnColor(score) }}
    >
      {score}
    </span>
  );
}
