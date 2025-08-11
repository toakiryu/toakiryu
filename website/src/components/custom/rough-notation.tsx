"use client";

import { cn } from "@/src/lib/utils";
import React from "react";
import { RoughNotation, RoughNotationProps } from "react-rough-notation";

export interface CustomRoughNotation extends RoughNotationProps {
  offset?: { x?: number; y?: number };
  classNames?: {
    container?: string;
    overlay?: string;
    hidden?: string;
    content?: string;
  };
}

export const CustomRoughNotation = ({
  children,
  show,
  offset = {},
  classNames,
  ...props
}: CustomRoughNotation) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setRect(r);
    }
  }, [show]);

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block w-auto h-auto",
        classNames?.container
      )}
    >
      {rect && (
        <span
          className={cn("absolute w-full h-ful overflow-visiblel", classNames?.overlay)}
          style={{
            left: offset.x ?? 0,
            top: offset.y ?? 0,
          }}
        >
          <RoughNotation show={show} {...props}>
            <span
              style={{ visibility: "hidden" }}
              className={cn("", classNames?.hidden)}
            >
              {children}
            </span>
          </RoughNotation>
        </span>
      )}
      <span className={cn("relative", classNames?.content)}>{children}</span>
    </span>
  );
};
