"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/src/lib/utils";

export default function DashboardLoadingContent({
  className,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container flex flex-col justify-center items-center max-w-5xl h-(--inset-main-height) mx-auto",
        className
      )}
    >
      <div className="w-full animate-pulse">
        <DotLottieReact
          src="/wp-content/dotlottie/loading-paperplane.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
