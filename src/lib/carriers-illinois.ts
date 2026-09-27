import type { StateCarrierRow } from "@/lib/data";

export const ILLINOIS_CARRIERS: StateCarrierRow[] = [
  { name: "Windy City Freight Co", city: "Chicago", dot: "5312048", equipment: "Power only", trucks: 8, status: "ACTIVE", score: 87 },
  { name: "Volga Line Transport", city: "Chicago", dot: "5324671", equipment: "Dry van", trucks: 11, status: "ACTIVE", score: 91 },
  { name: "Prairie State Logistics", city: "Joliet", dot: "5338902", equipment: "Dry van", trucks: 6, status: "ACTIVE", score: 82 },
  { name: "Moldova Express LLC", city: "Rockford", dot: "5341255", equipment: "Reefer", trucks: 4, status: "ACTIVE", score: 78 },
  { name: "Great Lakes Intermodal", city: "Chicago", dot: "5356789", equipment: "Power only", trucks: 3, status: "WARNING", score: 61 },
  { name: "Peoria Flatbed Solutions", city: "Peoria", dot: "5367413", equipment: "Flatbed", trucks: 5, status: "ACTIVE", score: 74 },
  { name: "Aurora Trucking Group", city: "Aurora", dot: "5379024", equipment: "Dry van", trucks: 2, status: "INACTIVE", score: 38 },
  { name: "Bloomington Bulk Carriers", city: "Bloomington", dot: "5388560", equipment: "Reefer", trucks: 1, status: "ACTIVE", score: 70 },
];
