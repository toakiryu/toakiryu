import { useCallback, useRef, useEffect } from "react";

/**
 * usePrefetchOnHover
 * - importer: () => Promise<any>
 * - returns a `prefetch` function you can call (and it will be debounced)
 * - useful to call onMouseEnter/onFocus to prefetch a dynamic chunk
 */
export function usePrefetchOnHover(
  importer: () => Promise<any>,
  options?: { delay?: number }
) {
  const delay = options?.delay ?? 120;
  const startedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const run = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    importer().catch(() => {
      /* ignore */
    });
  }, [importer]);

  const prefetch = useCallback(() => {
    if (startedRef.current) return;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setTimeout(() => {
      run();
      timerRef.current = null;
    }, delay);
  }, [delay, run]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    prefetch,
    immediate: run,
  } as const;
}
