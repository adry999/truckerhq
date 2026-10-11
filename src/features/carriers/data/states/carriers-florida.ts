import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export const FLORIDA_CARRIERS: StateCarrierRow[] = [
  { name: "Sunshine State Logistics", city: "Miami", dot: "5214087", equipment: "Reefer", trucks: 8, status: "ACTIVE", score: 87 },
  { name: "Moldova Express", city: "Orlando", dot: "5227351", equipment: "Dry van", trucks: 5, status: "ACTIVE", score: 82 },
  { name: "Gulfstream Freight Co", city: "Tampa", dot: "5233942", equipment: "Reefer", trucks: 11, status: "ACTIVE", score: 90 },
  { name: "Jax Port Carriers", city: "Jacksonville", dot: "5241608", equipment: "Dry van", trucks: 3, status: "WARNING", score: 61 },
  { name: "Danube Trucking LLC", city: "Fort Lauderdale", dot: "5256790", equipment: "Flatbed", trucks: 4, status: "ACTIVE", score: 75 },
  { name: "Citrus Belt Reefer Lines", city: "Lakeland", dot: "5262214", equipment: "Reefer", trucks: 6, status: "ACTIVE", score: 79 },
  { name: "Everglades Power Only", city: "Miami", dot: "5271839", equipment: "Power only", trucks: 1, status: "INACTIVE", score: 34 },
  { name: "Odessa Import Transport", city: "Tampa", dot: "5288503", equipment: "Dry van", trucks: 2, status: "ACTIVE", score: 72 },
];
