"use client";

import { useSearchParams } from "next/navigation";
import StateEquipmentChips from "@/components/StateEquipmentChips";
import StateCarriersList from "@/components/StateCarriersList";
import type { StateCarrierRow } from "@/lib/data";

export function StateEquipmentChipsFromUrl({
  equipmentOptions,
  basePath,
}: {
  equipmentOptions: readonly string[];
  basePath: string;
}) {
  const params = useSearchParams();
  return (
    <StateEquipmentChips
      equipmentOptions={equipmentOptions}
      basePath={basePath}
      equip={params.get("equip") ?? "All"}
    />
  );
}

export function StateCarriersListFromUrl(props: {
  stateAbbr: string;
  stateName: string;
  carriers: StateCarrierRow[];
  totalCount: string;
}) {
  const params = useSearchParams();
  return <StateCarriersList {...props} equip={params.get("equip") ?? "All"} />;
}
