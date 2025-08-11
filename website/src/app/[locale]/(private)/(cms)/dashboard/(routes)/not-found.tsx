"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LinkButton } from "@/src/components/custom/link-button";

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col justify-center items-center max-w-5xl h-(--inset-main-height) mx-auto">
      <div className="w-full">
        <DotLottieReact src="/wp-content/dotlottie/404.lottie" loop autoplay />
      </div>
      <div className="p-5">
        <div className="text-center mt-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-2">
            ページが存在しません！
          </h1>
          <span className="text-sm md:text-base lg:text-lg xl:text-2xl mb-2">
            ページが存在しないか、移動された可能性があります！
          </span>
          <div className="max-w-2xl mt-10 mx-auto">
            <LinkButton
              href="/dashboard"
              className="w-full h-auto text-sm md:text-base lg:text-lg xl:text-2xl"
              variant="default"
            >
              ホームに戻る
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
