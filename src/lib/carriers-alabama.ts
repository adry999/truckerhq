import type { StateCarrierRow } from "@/lib/data";

export const ALABAMA_CARRIERS: StateCarrierRow[] = [
  { name: "Magic City Freight Lines", city: "Birmingham", dot: "6014287", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Port of Mobile Carriers", city: "Mobile", dot: "6032651", equipment: "Flatbed", trucks: 6, status: "ACTIVE", score: 83 },
  { name: "Volga Line Transport AL", city: "Huntsville", dot: "6058914", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 77 },
  { name: "Capital City Hauling", city: "Montgomery", dot: "6071206", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 91 },
  { name: "Druid City Logistics", city: "Tuscaloosa", dot: "6009473", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 74 },
  { name: "Wiregrass Peanut Express", city: "Dothan", dot: "6044820", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 70 },
  { name: "Odessa Freight Alabama", city: "Birmingham", dot: "6087395", equipment: "Dry van", trucks: 7, status: "WARNING", score: 58 },
  { name: "Azalea Trail Transport", city: "Mobile", dot: "6096142", equipment: "Reefer", trucks: 2, status: "INACTIVE", score: 41 },
];
