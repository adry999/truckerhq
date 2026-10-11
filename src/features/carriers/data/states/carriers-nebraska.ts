import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const NEBRASKA_CARRIERS: StateCarrierRow[] = [
  { name: "Missouri River Freight Co", city: "Omaha", dot: "8213045", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 91 },
  { name: "Cornhusker Bulk Carriers", city: "Lincoln", dot: "8224187", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 84 },
  { name: "Prairie Rail Transfer", city: "Grand Island", dot: "8231902", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 78 },
  { name: "Volga Plains Logistics", city: "Bellevue", dot: "8245613", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 88 },
  { name: "Platte Valley Flatbed", city: "Kearney", dot: "8256734", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 73 },
  { name: "Fremont Ag Haulers", city: "Fremont", dot: "8262048", equipment: "Reefer", trucks: 2, status: "ACTIVE", score: 95 },
  { name: "Steppe Route Carriers", city: "Omaha", dot: "8271395", equipment: "Power only", trucks: 1, status: "WARNING", score: 61 },
  { name: "Salt Creek Trucking", city: "Lincoln", dot: "8288460", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 42 },
];
