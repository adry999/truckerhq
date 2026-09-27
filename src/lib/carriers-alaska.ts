import type { StateCarrierRow } from "@/lib/data";

export const ALASKA_CARRIERS: StateCarrierRow[] = [
  { name: "Northern Lights Freight Co", city: "Anchorage", dot: "6104521", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 91 },
  { name: "Dalton Highway Hauling", city: "Fairbanks", dot: "6112873", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 84 },
  { name: "Mat-Su Valley Trucking", city: "Wasilla", dot: "6127390", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 78 },
  { name: "Southeast Alaska Freight Lines", city: "Juneau", dot: "6138204", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 88 },
  { name: "Kenai Peninsula Logistics", city: "Kenai", dot: "6145617", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 73 },
  { name: "Baranof Island Transport", city: "Sitka", dot: "6156932", equipment: "Dry van", trucks: 1, status: "WARNING", score: 62 },
  { name: "Volga Line Transport AK", city: "Anchorage", dot: "6163408", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 95 },
  { name: "Interior Freight & Supply", city: "Fairbanks", dot: "6171755", equipment: "Reefer", trucks: 2, status: "INACTIVE", score: 34 },
];
