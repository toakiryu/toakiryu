import React from "react";
import { ClientOnly } from "@/components/ui/custom/client-only";
import { PageFullOverlay } from "@/components/layout/overlay";
import TargetCursor from "@/components/ui/bits/TargetCursor";
import GradualBlurClient from "@/components/ui/bits/GradualBlurWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <ClientOnly>
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      </ClientOnly>
      <PageFullOverlay
        layout={{
          border: {
            put: ["top", "left", "right"],
          },
          cornerDecorations: {
            put: ["top-right"],
          },
          actionBtn: {
            put: "top-right",
          },
        }}
      />
      {children}
      <GradualBlurClient
        target="page"
        preset="bottom"
        height="6rem"
        strength={2}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </div>
  );
}
