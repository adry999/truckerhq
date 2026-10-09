import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const ARIZONA_CARRIERS: StateCarrierRow[] = [
  { name: "Sonoran Freight Lines", city: "Phoenix", dot: "6213045", equipment: "Dry van", trucks: 12, status: "ACTIVE", score: 92 },
  { name: "Cactus Line Logistics", city: "Tucson", dot: "6224671", equipment: "Reefer", trucks: 7, status: "ACTIVE", score: 87 },
  { name: "Volga Line Transport AZ", city: "Mesa", dot: "6238190", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 81 },
  { name: "Desert Crossing Carriers", city: "Yuma", dot: "6241357", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 78 },
  { name: "Grand Canyon Trucking Co", city: "Flagstaff", dot: "6255902", equipment: "Power only", trucks: 1, status: "ACTIVE", score: 74 },
  { name: "Chandler Crossroads Transport", city: "Chandler", dot: "6262418", equipment: "Dry van", trucks: 8, status: "ACTIVE", score: 95 },
  { name: "Border Gate Logistics", city: "Tucson", dot: "6271830", equipment: "Reefer", trucks: 3, status: "WARNING", score: 62 },
  { name: "Papago Freight Co", city: "Phoenix", dot: "6289564", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 41 },
];
