import type { StateCarrierRow } from "@/lib/data";

export const WYOMING_CARRIERS: StateCarrierRow[] = [
  { name: "Cheyenne Capitol Freight", city: "Cheyenne", dot: "10123456", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 91 },
  { name: "Casper Basin Energy Haulers", city: "Casper", dot: "10134872", equipment: "Power only", trucks: 5, status: "ACTIVE", score: 84 },
  { name: "Laramie Plains Trucking", city: "Laramie", dot: "10145901", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 78 },
  { name: "Gillette Coal Country Carriers", city: "Gillette", dot: "10156234", equipment: "Flatbed", trucks: 7, status: "ACTIVE", score: 88 },
  { name: "Rock Springs Route 80 Transport", city: "Rock Springs", dot: "10167890", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 73 },
  { name: "Sheridan Bighorn Freight", city: "Sheridan", dot: "10178345", equipment: "Reefer", trucks: 4, status: "ACTIVE", score: 80 },
  { name: "Volga Line Transport WY", city: "Cheyenne", dot: "10189012", equipment: "Flatbed", trucks: 3, status: "WARNING", score: 62 },
  { name: "Casper Frontier Hauling", city: "Casper", dot: "10192567", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
];
