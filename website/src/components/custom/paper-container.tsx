import React from "react";
import { cn } from "@/src/lib/utils";

export interface PaperContainerProps {
  children?: React.ReactNode;
  classNames?: {
    container?: string;
  };
  rotate?: number;
}

export function PaperContainer({
  children,
  classNames,
  rotate = 0,
}: PaperContainerProps) {
  return (
    <div
      className={cn("relative container w-full max-w-5xl h-full mx-auto drop-shadow-md", classNames?.container)}
      style={{
        rotate: `${rotate}deg`,
      }}
    >
      {children}
    </div>
  );
}
