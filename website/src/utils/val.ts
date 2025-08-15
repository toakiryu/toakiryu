export function removeFalsyFromObject<T extends object>(object: T): T {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => Boolean(v))
  ) as T;
}
