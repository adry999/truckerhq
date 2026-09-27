import type { StateCarrierRow } from "@/lib/data";

export const HAWAII_CARRIERS: StateCarrierRow[] = [
  { name: "Honolulu Harbor Drayage", city: "Honolulu", dot: "6702118", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 91 },
  { name: "Volga Line Transport HI", city: "Waipahu", dot: "6714387", equipment: "Power only", trucks: 3, status: "ACTIVE", score: 84 },
  { name: "Aloha Island Freight", city: "Honolulu", dot: "6725903", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 88 },
  { name: "Hilo Bay Trucking", city: "Hilo", dot: "6737256", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 76 },
  { name: "Kailua Coastal Carriers", city: "Kailua", dot: "6748619", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 79 },
  { name: "Pearl City Container Co", city: "Pearl City", dot: "6753082", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 72 },
  { name: "Kaneohe Bay Logistics", city: "Kaneohe", dot: "6761745", equipment: "Reefer", trucks: 3, status: "WARNING", score: 61 },
  { name: "Waipahu Interisland Hauling", city: "Waipahu", dot: "6774390", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 38 },
];
