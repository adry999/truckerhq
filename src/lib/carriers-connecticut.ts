import type { StateCarrierRow } from "@/components/StateCarriersPage";
import type { CarrierStatus } from "@/lib/data";

export const CONNECTICUT_CARRIERS: StateCarrierRow[] = [
  { name: "Nutmeg State Freight Co", city: "Hartford", dot: "6512340", equipment: "Dry van", trucks: 9, status: "ACTIVE" as CarrierStatus, score: 91 },
  { name: "Bridgeport Harbor Transport", city: "Bridgeport", dot: "6524871", equipment: "Reefer", trucks: 5, status: "ACTIVE" as CarrierStatus, score: 84 },
  { name: "Volga Line Transport CT", city: "New Haven", dot: "6537902", equipment: "Dry van", trucks: 4, status: "ACTIVE" as CarrierStatus, score: 77 },
  { name: "Stamford Metro Carriers", city: "Stamford", dot: "6548215", equipment: "Power only", trucks: 2, status: "ACTIVE" as CarrierStatus, score: 88 },
  { name: "Naugatuck Valley Hauling", city: "Waterbury", dot: "6559634", equipment: "Dry van", trucks: 6, status: "ACTIVE" as CarrierStatus, score: 73 },
  { name: "Danbury Ridge Logistics", city: "Danbury", dot: "6561178", equipment: "Flatbed", trucks: 3, status: "ACTIVE" as CarrierStatus, score: 80 },
  { name: "Elm City Express", city: "New Haven", dot: "6573409", equipment: "Dry van", trucks: 7, status: "WARNING" as CarrierStatus, score: 62 },
  { name: "Constitution State Trucking", city: "Hartford", dot: "6584922", equipment: "Power only", trucks: 1, status: "INACTIVE" as CarrierStatus, score: 41 },
];
