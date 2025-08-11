"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LinkButton } from "@/src/components/custom/link-button";

export default function ContentAccessDenied() {
  return (
    <div>
      <div className="container flex flex-col justify-center items-center max-w-5xl h-full min-h-dvh mx-auto">
        <div className="w-full">
          <DotLottieReact
            src="/wp-content/dotlottie/access-denied.lottie"
            loop
            autoplay
          />
        </div>
        <div className="p-5">
          <div className="text-center mt-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-2">
              アクセスが制限されています！
            </h1>
            <span className="text-sm md:text-base lg:text-lg xl:text-2xl mb-2">
              あなたには「ダッシュボード」へのアクセス権限が存在しません。
            </span>
            <div className="max-w-2xl mt-10 mx-auto">
              <LinkButton
                href="/accounts/sign-in?redirect=/dashboard"
                className="w-full h-auto text-sm md:text-base lg:text-lg xl:text-2xl"
                variant="default"
              >
                サインインする
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
