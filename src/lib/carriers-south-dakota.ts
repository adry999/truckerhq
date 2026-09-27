import type { StateCarrierRow } from "@/lib/data";

export const SOUTH_DAKOTA_CARRIERS: StateCarrierRow[] = [
  { name: "Sioux Falls Flatbed Co", city: "Sioux Falls", dot: "9312047", equipment: "Flatbed", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Black Hills Reefer Line", city: "Rapid City", dot: "9327185", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport", city: "Brookings", dot: "9338420", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Aberdeen Livestock Haulers", city: "Aberdeen", dot: "9351763", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 75 },
  { name: "Glacial Lakes Trucking", city: "Watertown", dot: "9364298", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 71 },
  { name: "Mitchell Corn Palace Freight", city: "Mitchell", dot: "9377531", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 92 },
  { name: "Dakota Steppe Express", city: "Sioux Falls", dot: "9385904", equipment: "Dry van", trucks: 7, status: "WARNING", score: 63 },
  { name: "Prairie Ridge Bulk Carriers", city: "Rapid City", dot: "9396817", equipment: "Flatbed", trucks: 2, status: "INACTIVE", score: 41 },
];
