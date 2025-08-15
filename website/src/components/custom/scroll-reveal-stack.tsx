"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

/**
 *
 * @param myIndex 要求 Index
 * @param currentIndex 現在の Index
 * @param range 範囲
 * @returns boolean
 */
export function isAnimateArea(
  myIndex: number,
  currentIndex: number,
  range: number
): boolean {
  return Math.abs(myIndex - currentIndex) <= range;
}

export function StackedScrollReveal({
  children,
  onVisibleIndexChange,
}: {
  children: React.ReactNode[];
  onVisibleIndexChange?: (index: number) => void;
}) {
  const [initialized, setInitialized] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = React.useState<number[]>([]);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    if (heights.length === React.Children.count(children)) {
      setInitialized(true);
    } else {
      setInitialized(false);
    }
  }, [heights, children]);

  React.useEffect(() => {
    if (!itemRefs.current) return;
    const observers: ResizeObserver[] = [];

    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new ResizeObserver(() => {
        const rect = ref.getBoundingClientRect();
        setHeights((prev) => {
          const next = [...prev];
          next[i] = rect.height;
          return next;
        });
      });
      obs.observe(ref);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [itemRefs]);

  React.useEffect(() => {
    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = window.scrollY - (window.scrollY + rect.top);
      setScrollY(relativeY);
    };

    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    window.addEventListener("orientationchange", updateScroll); // 追加

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("orientationchange", updateScroll); // 追加
    };
  }, [containerRef]);

  const cumulativeTops = heights.map((_, i) =>
    heights.slice(0, i).reduce((a, b) => a + b, 0)
  );

  const totalHeight = heights.reduce((a, b) => a + b, 0);

  const currentIndex = (() => {
    const foundIndex = cumulativeTops.findIndex((top) => top > scrollY);
    let currentIndex = foundIndex === -1 ? children.length - 1 : foundIndex;

    // Check if scroll passed far beyond the last item's bottom
    const lastItemBottom = cumulativeTops[cumulativeTops.length - 1] ?? 0;
    const overscroll = scrollY - lastItemBottom;

    if (overscroll > 0) {
      const threshold = heights[heights.length - 1] ?? 0;
      const factor = overscroll / (threshold || 1); // avoid divide by zero
      currentIndex = children.length - 1 + Math.floor(factor);
    }
    return currentIndex;
  })();

  React.useEffect(() => {
    if (onVisibleIndexChange) {
      onVisibleIndexChange(currentIndex);
    }
  }, [currentIndex, onVisibleIndexChange]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
      aria-label="stacked-scroll-reveal"
    >
      {React.Children.map(children, (child, i) => (
        <div
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={cn(
            "w-full",
            i <= currentIndex ? "sticky top-0" : "absolute"
          )}
          style={{
            top: initialized
              ? `${i <= currentIndex ? 0 : cumulativeTops[i]}px`
              : "-100dvh",
            zIndex: 10 + i,
          }}
        >
          {child}
        </div>
      ))}
    </section>
  );
}
