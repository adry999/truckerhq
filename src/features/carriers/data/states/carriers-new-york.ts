import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const NEW_YORK_CARRIERS: StateCarrierRow[] = [
  { name: "Empire State Freight Lines", city: "New York City", dot: "8612437", equipment: "Dry van", trucks: 9, status: "ACTIVE", score: 91 },
  { name: "Buffalo Bulk Carriers", city: "Buffalo", dot: "8623958", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 84 },
  { name: "Volga Line Transport NY", city: "Yonkers", dot: "8634721", equipment: "Dry van", trucks: 3, status: "ACTIVE", score: 77 },
  { name: "Hudson Valley Haulers", city: "Albany", dot: "8645106", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 88 },
  { name: "Flower City Freight", city: "Rochester", dot: "8656289", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 73 },
  { name: "Five Boroughs Trucking", city: "New York City", dot: "8667043", equipment: "Power only", trucks: 2, status: "ACTIVE", score: 95 },
  { name: "Syracuse Salt City Lines", city: "Syracuse", dot: "8678514", equipment: "Dry van", trucks: 7, status: "WARNING", score: 62 },
  { name: "Carpathian Express Transport", city: "Buffalo", dot: "8689375", equipment: "Dry van", trucks: 1, status: "INACTIVE", score: 41 },
];
