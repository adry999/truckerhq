import type { StateCarrierRow } from "@/lib/data";

export const IOWA_CARRIERS: StateCarrierRow[] = [
  { name: "Hawkeye Freight Lines", city: "Des Moines", dot: "7012845", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Cedar Rapids Grain Haulers", city: "Cedar Rapids", dot: "7024193", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 81 },
  { name: "Mississippi Valley Trucking", city: "Davenport", dot: "7038671", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 76 },
  { name: "Volga Line Transport IA", city: "Des Moines", dot: "7041520", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 79 },
  { name: "Sioux City Bulk Carriers", city: "Sioux City", dot: "7055298", equipment: "Flatbed", trucks: 12, status: "ACTIVE", score: 91 },
  { name: "Iowa City Cartage Co", city: "Iowa City", dot: "7063714", equipment: "Power only", trucks: 1, status: "WARNING", score: 62 },
  { name: "Waterloo Crossroads Freight", city: "Waterloo", dot: "7071086", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 73 },
  { name: "Corn Belt Logistics", city: "Cedar Rapids", dot: "7088452", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 41 },
];
