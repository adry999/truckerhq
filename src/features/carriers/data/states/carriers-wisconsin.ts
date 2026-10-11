import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const WISCONSIN_CARRIERS: StateCarrierRow[] = [
  { name: "Badger State Freight", city: "Milwaukee", dot: "10014237", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 88 },
  { name: "Dairyland Reefer Co", city: "Green Bay", dot: "10022891", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 91 },
  { name: "Cream City Carriers", city: "Milwaukee", dot: "10035640", equipment: "Dry van", trucks: 4, status: "ACTIVE", score: 79 },
  { name: "Kettle Moraine Trucking", city: "Kenosha", dot: "10041178", equipment: "Flatbed", trucks: 3, status: "ACTIVE", score: 75 },
  { name: "Volga Line Transport WI", city: "Madison", dot: "10058923", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Fox Valley Freight Lines", city: "Appleton", dot: "10063412", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 94 },
  { name: "Racine Harbor Hauling", city: "Racine", dot: "10071065", equipment: "Power only", trucks: 1, status: "WARNING", score: 62 },
  { name: "Capital City Logistics", city: "Madison", dot: "10089754", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 41 },
];
