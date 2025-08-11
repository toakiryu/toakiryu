"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="container flex flex-col justify-center items-center max-w-5xl h-(--inset-main-height) mx-auto">
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
