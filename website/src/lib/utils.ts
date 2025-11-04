import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deep merge two values (objects/arrays/primitives).
 * - Objects are merged recursively.
 * - Arrays are concatenated with deduplication (defaults first, override after).
 * - Primitives are overwritten by the override when provided.
 */
export function mergeDeep<T>(base: T, override?: Partial<T>): T {
  if (override === undefined) return JSON.parse(JSON.stringify(base));

  const result: any = Array.isArray(base)
    ? [...(base as any)]
    : { ...(base as any) };

  for (const key of Object.keys(override as any)) {
    const oVal = (override as any)[key];
    const bVal = (result as any)[key];

    // both arrays -> concat unique (defaults first)
    if (Array.isArray(bVal) && Array.isArray(oVal)) {
      result[key] = Array.from(new Set([...bVal, ...oVal]));
      continue;
    }

    const isObj = (v: any) => v && typeof v === "object" && !Array.isArray(v);
    if (isObj(bVal) && isObj(oVal)) {
      result[key] = mergeDeep(bVal, oVal);
      continue;
    }

    if (oVal !== undefined) {
      result[key] = oVal;
    }
  }

  return result;
}
