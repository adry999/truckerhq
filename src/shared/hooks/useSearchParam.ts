"use client";

import { useSearchParams } from "next/navigation";

export function useSearchParam(name: string, fallback: string): string {
  return useSearchParams().get(name) ?? fallback;
}
