export function buildFilterHref(
  basePath: string,
  current: URLSearchParams | Record<string, string>,
  key: string,
  value: string,
  allValue = "All",
): string {
  const params = new URLSearchParams(current);
  if (value === allValue) params.delete(key);
  else params.set(key, value);
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
