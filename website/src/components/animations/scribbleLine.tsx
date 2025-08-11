"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

export function AnimatedScribbleLine({
  color = "var(--secondary)",
  isAnimate = true,
}: {
  color?: string;
  isAnimate?: boolean;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const paths = [
      "M10 20 C 60 10, 140 30, 190 20",
      "M10 20 C 60 12, 140 28, 190 22",
      "M10 20 C 60 14, 140 26, 190 24",
      "M10 20 C 60 10, 140 30, 190 20",
    ];

    let tl: ReturnType<typeof createTimeline> | null = null;

    if (isAnimate) {
      tl = createTimeline({ loop: true, duration: 2000 });

      for (let i = 0; i < paths.length - 1; i++) {
        tl.add(path, {
          d: [paths[i], paths[i + 1]],
        });
      }
    } else {
      // Reset to initial path if not animating
      path.setAttribute("d", paths[0]);
    }

    return () => {
      if (tl) tl.pause();
    };
  }, [isAnimate]);

  return (
    <svg
      width="100%"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: "none" }}
    >
      <path
        ref={pathRef}
        d="M10 20 C 60 10, 140 30, 190 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
