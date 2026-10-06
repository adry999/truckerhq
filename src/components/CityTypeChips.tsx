import Link from "next/link";

const TYPE_FILTERS = ["All", "Local", "Regional", "OTR"] as const;

export default function CityTypeChips({ basePath, type }: { basePath: string; type: string }) {
  const chipHref = (t: string) => {
    const sp = new URLSearchParams();
    if (t !== "All") sp.set("type", t);
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
      {TYPE_FILTERS.map((t) => (
        <Link
          key={t}
          href={chipHref(t)}
          className={`flex h-11 shrink-0 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
            type === t
              ? "bg-asphalt text-offwhite"
              : "border-[1.5px] border-border bg-white text-asphalt"
          }`}
        >
          {t.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
