import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const OREGON_CARRIERS: StateCarrierRow[] = [
  { name: "Cascade Summit Logistics", city: "Portland", dot: "9012384", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport OR", city: "Hillsboro", dot: "9034561", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 83 },
  { name: "Willamette Valley Freight", city: "Salem", dot: "9047823", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 78 },
  { name: "Port of Portland Carriers", city: "Portland", dot: "9058902", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 88 },
  { name: "Emerald Eugene Trucking", city: "Eugene", dot: "9061247", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 74 },
  { name: "High Desert Bend Haulers", city: "Bend", dot: "9073519", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 70 },
  { name: "Gresham Gateway Transport", city: "Gresham", dot: "9082604", equipment: "Dry van", trucks: 5, status: "WARNING", score: 62 },
  { name: "Timber Country Trucking", city: "Eugene", dot: "9091356", equipment: "Flatbed", trucks: 2, status: "INACTIVE", score: 41 },
];
