import type { CarrierStatus } from "@/features/carriers/model/carriers.types";

export const STATUS_COLORS: Record<CarrierStatus, { bg: string; fg: string; dot: string }> = {
  ACTIVE: { bg: "#E2F0E8", fg: "#0E5C3A", dot: "#0E5C3A" },
  WARNING: { bg: "#FFF1CC", fg: "#7A5300", dot: "#F2A900" },
  INACTIVE: { bg: "#FBE9E7", fg: "#B42318", dot: "#B42318" },
};
