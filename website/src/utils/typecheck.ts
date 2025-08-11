export function isAnArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}