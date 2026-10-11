export function filterJobsByType<T extends { type: string }>(jobs: readonly T[], type: string): T[] {
  if (type.toUpperCase() === "ALL") return [...jobs];
  const wanted = type.toUpperCase();
  return jobs.filter((j) => j.type.toUpperCase() === wanted);
}
