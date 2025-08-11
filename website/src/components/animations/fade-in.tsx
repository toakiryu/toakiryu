"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function FadeIn({
  children,
  stagger = 0,
  y = 0,
}: {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
}) {
  const el = React.useRef<HTMLDivElement | null>(null);
  const animation = React.useRef();

  useGSAP(() => {
    animation.current = gsap.from(el.current.children, {
      opacity: 0,
      stagger,
      y,
    });
  });

  return <div ref={el}>{children}</div>;
}
