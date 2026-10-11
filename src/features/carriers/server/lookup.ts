import "server-only";
import { CARRIERS } from "@/features/carriers/data/carriers";
import { fmcsaEnabled, searchFmcsaCarriers } from "@/features/carriers/server/fmcsa";
import { filterByStatus, matchSampleCarriers } from "@/features/carriers/model/lookup";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export type LookupSearch = {
  matched: Carrier[];
  shown: Carrier[];
  usingLiveData: boolean;
  liveSearchAvailable: boolean;
};

// Live FMCSA results when configured and matching, sample data otherwise.
export async function searchCarriers(rawQuery: string, status: string): Promise<LookupSearch> {
  const liveResults = await searchFmcsaCarriers(rawQuery);
  const usingLiveData = liveResults !== null;
  const matched = usingLiveData ? liveResults : matchSampleCarriers(CARRIERS, rawQuery);
  return {
    matched,
    shown: filterByStatus(matched, status),
    usingLiveData,
    liveSearchAvailable: fmcsaEnabled(),
  };
}
