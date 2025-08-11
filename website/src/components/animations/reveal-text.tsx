"use client";

import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";

type RevealTextProps = {
  delay?: number;
  delayPlus?: number;
  duration?: number;
  classNames?: {
    container?: string;
    overlay?: string;
    text?: string;
  };
  children: React.ReactNode;
};

export const RevealText = ({
  delay = 0,
  delayPlus = 0,
  duration = 0.8,
  classNames = {},
  children,
}: RevealTextProps) => {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: delayPlus,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div
      ref={ref}
      className={cn("relative w-fit overflow-hidden", classNames.container)}
    >
      <motion.span
        initial={{ x: 0 }}
        animate={isVisible ? { x: "101%" } : { x: 0 }}
        transition={{ duration, ease: "easeOut", delay }}
        className={cn("absolute inset-0 bg-black z-20", classNames.overlay)}
      />
      <span className={cn("relative z-10", classNames.text)}>{children}</span>
    </div>
  );
};
