import type { StateCarrierRow } from "@/lib/data";

export const MONTANA_CARRIERS: StateCarrierRow[] = [
  { name: "Big Sky Freight Lines", city: "Billings", dot: "8102451", equipment: "Flatbed", trucks: 7, status: "ACTIVE", score: 91 },
  { name: "Missoula Mountain Movers", city: "Missoula", dot: "8113987", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport MT", city: "Great Falls", dot: "8124630", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 78 },
  { name: "Bozeman Peak Trucking", city: "Bozeman", dot: "8135802", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 88 },
  { name: "Butte Copper Country Carriers", city: "Butte", dot: "8141275", equipment: "Dry van", trucks: 5, status: "WARNING", score: 62 },
  { name: "Helena Capital Freight", city: "Helena", dot: "8156390", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 95 },
  { name: "Carpathian Express Logistics", city: "Billings", dot: "8162748", equipment: "Flatbed", trucks: 1, status: "INACTIVE", score: 41 },
  { name: "Hi-Line Ag Haulers", city: "Great Falls", dot: "8179023", equipment: "Flatbed", trucks: 9, status: "ACTIVE", score: 73 },
];
