import React from "react";
import { cn } from "@/src/lib/utils";

export interface PaperContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}: PaperContainerProps) {
  return (
    <div
      className={cn(
        "relative container w-full max-w-5xl h-full mx-auto drop-shadow-md",
        classNames?.container
      )}
      style={{
        rotate: `${rotate}deg`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
