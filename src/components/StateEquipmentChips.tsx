import Link from "next/link";

export default function StateEquipmentChips({
  equipmentOptions,
  basePath,
  equip,
}: {
  equipmentOptions: readonly string[];
  basePath: string;
  equip: string;
}) {
  const chipHref = (e: string) => {
    const sp = new URLSearchParams();
    if (e !== "All") sp.set("equip", e);
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <>
    {equipmentOptions.map((e) => (
      <Link
        key={e}
        href={chipHref(e)}
        className={`flex h-11 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
          equip === e
            ? "border-[1.5px] border-asphalt bg-asphalt text-offwhite"
            : "border-[1.5px] border-border bg-white text-asphalt"
        }`}
      >
        {e.toUpperCase()}
      </Link>
    ))}
    </>
  );
}
