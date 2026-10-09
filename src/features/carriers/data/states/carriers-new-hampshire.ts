import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const NEW_HAMPSHIRE_CARRIERS: StateCarrierRow[] = [
  { name: "Manchester Freight Lines", city: "Manchester", dot: "8412047", equipment: "Dry van", trucks: 7, status: "ACTIVE", score: 88 },
  { name: "Granite State Carriers", city: "Nashua", dot: "8423981", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 92 },
  { name: "Merrimack Valley Transport", city: "Concord", dot: "8437652", equipment: "Reefer", trucks: 5, status: "ACTIVE", score: 79 },
  { name: "Volga Line Transport NH", city: "Derry", dot: "8441290", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 84 },
  { name: "Seacoast Distribution Co", city: "Dover", dot: "8456813", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 71 },
  { name: "Lilac City Logistics", city: "Rochester", dot: "8462305", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 75 },
  { name: "Baltic Star Trucking", city: "Manchester", dot: "8478534", equipment: "Reefer", trucks: 6, status: "WARNING", score: 62 },
  { name: "Old Colony Freight Co", city: "Nashua", dot: "8489167", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 41 },
];
