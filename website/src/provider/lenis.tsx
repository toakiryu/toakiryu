"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children?: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
}
