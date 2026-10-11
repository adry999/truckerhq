import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const KANSAS_CARRIERS: StateCarrierRow[] = [
  { name: "Sunflower State Freight", city: "Wichita", dot: "7104521", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 88 },
  { name: "Prairie Trail Logistics", city: "Overland Park", dot: "7112893", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Volga Line Transport KS", city: "Kansas City", dot: "7126047", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 91 },
  { name: "Wheat State Carriers", city: "Topeka", dot: "7138215", equipment: "Flatbed", trucks: 12, status: "ACTIVE", score: 76 },
  { name: "Crossroads Trucking Co", city: "Olathe", dot: "7145690", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 95 },
  { name: "Jayhawk Freight Systems", city: "Lawrence", dot: "7153382", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 79 },
  { name: "Kansas Plains Hauling", city: "Wichita", dot: "7161974", equipment: "Reefer", trucks: 4, status: "WARNING", score: 61 },
  { name: "Ural Star Trucking", city: "Overland Park", dot: "7178506", equipment: "Flatbed", trucks: 1, status: "INACTIVE", score: 38 },
];
