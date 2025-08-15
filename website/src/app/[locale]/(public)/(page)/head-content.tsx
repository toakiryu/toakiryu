"use client";

import React from "react";
import { IconExternalLink } from "@tabler/icons-react";
import { RoughNotation } from "react-rough-notation";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";
import { AnimatedScribbleLine } from "@/src/components/animations/scribbleLine";
import { LinkButton } from "@/src/components/custom/link-button";

export default function PageHomeHeadContent({
  isAnimateArea,
}: {
  isAnimateArea?: boolean;
}) {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div className="w-full h-auto pt-[3%] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full rotate-[-2deg]">
        <div className="relative w-full h-full">
          <div
            className="absolute bg-muted/80 w-full h-10 rotate-[50deg]"
            style={{
              top: "-1%",
              right: "5%",
            }}
          />
          <div
            className="absolute bg-muted/80 w-full h-10 rotate-[-50deg]"
            style={{
              bottom: "-1%",
              left: "-40%",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "16%",
              left: "5%",
              rotate: "10deg",
            }}
          >
            <AnimatedScribbleLine isAnimate={isAnimateArea} />
          </div>
          <div
            className="absolute"
            style={{
              bottom: "16%",
              right: "5%",
              rotate: "-15deg",
            }}
          >
            <AnimatedScribbleLine isAnimate={isAnimateArea} />
          </div>
          <div
            className="absolute"
            style={{
              top: "46%",
              left: "20%",
              rotate: "-50deg",
            }}
          >
            <AnimatedScribbleLine isAnimate={isAnimateArea} />
          </div>
        </div>
      </div>
      <div className="w-auto h-auto bg-background/80  px-5 py-32 sm:mx-[3%]">
        <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
          <img
            alt="background"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
            className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[5%] left-[1%] bg-accent/80 w-fit p-4 shadow-lg rotate-[-8deg]">
            <p className="font-handwriting text-black">
              HAL 高度情報学科 WEB開発コースⅠ・Ⅱ
            </p>
          </div>
        </div>
        <div className="relative z-10 container mx-auto">
          <div className="flex flex-col items-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="rounded-xl bg-background/30 shadow-sm backdrop-blur-sm overflow-hidden">
                <img
                  src="/wp-content/brand/toakiryu/icon.256x256.webp"
                  alt="logo"
                  className="h-16"
                />
              </div>
              <div ref={ref} className="mt-3">
                <div className="mb-10">
                  <h1 className="font-bold tracking-tight text-pretty text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    <RoughNotation
                      type="highlight"
                      show={isVisible}
                      animationDuration={1500}
                      color="color-mix(in oklab, var(--accent) 80%, transparent)"
                    >
                      <span className="text-primary">フルスタック開発</span>{" "}
                      が出来るようになる
                    </RoughNotation>
                    <span className="relative">のが目標</span>
                  </h1>
                </div>
                <p className="flex flex-wrap justify-center max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg md:text-2xl lg:text-3xl">
                  いろんなものを作ってます。主に{" "}
                  <RoughNotation
                    type="circle"
                    show={isVisible}
                    animationDelay={1500}
                    animationDuration={1000}
                    color="color-mix(in oklab, var(--color-blue-400) 50%, transparent)"
                  >
                    Next.js
                  </RoughNotation>
                  を使ってサイトやアプリを開発することが多いです。
                </p>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <LinkButton
                  href="/"
                  className="shadow-sm transition-shadow hover:shadow sm:text-lg md:text-2xl h-auto"
                >
                  始める
                </LinkButton>
                <LinkButton
                  href="/about"
                  variant="outline"
                  className="group sm:text-lg md:text-2xl h-auto"
                >
                  もっと詳しく知る
                  <IconExternalLink className="size-[14px] sm:size-[18px] md:size-[24px] transition-transform group-hover:translate-x-0.5" />
                </LinkButton>
              </div>
              <div className="mt-[5vw] flex flex-col items-center gap-5">
                <p className="font-medium text-muted-foreground lg:text-left text-base sm:text-lg md:text-2xl lg:text-3xl">
                  オープンソース技術で構築
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <LinkButton
                    href="https://ui.shadcn.com"
                    variant="outline"
                    className="group aspect-square flex items-center justify-center min-h-12 h-[2.5vw] p-0"
                  >
                    <img
                      src="/wp-content/logo/shadcn-ui.icon.svg"
                      alt="shadcn/ui logo"
                      className="min-h-6 h-[1.25vw] saturate-0 transition-all group-hover:saturate-100"
                    />
                  </LinkButton>
                  <LinkButton
                    href="https://www.typescriptlang.org"
                    variant="outline"
                    className="group aspect-square flex items-center justify-center min-h-12 h-[2.5vw] p-0"
                  >
                    <img
                      src="/wp-content/logo/typescript.icon.svg"
                      alt="TypeScript logo"
                      className="min-h-6 h-[1.25vw] saturate-0 transition-all group-hover:saturate-100"
                    />
                  </LinkButton>
                  <LinkButton
                    href="http://nextjs.org"
                    variant="outline"
                    className="group aspect-square flex items-center justify-center min-h-12 h-[2.5vw] p-0"
                  >
                    <img
                      src="/wp-content/logo/nextjs.icon.svg"
                      alt="Next.js logo"
                      className="min-h-6 h-[1.25vw] saturate-0 transition-all group-hover:saturate-100"
                    />
                  </LinkButton>
                  <LinkButton
                    href="https://tailwindcss.com"
                    variant="outline"
                    className="group aspect-square flex items-center justify-center min-h-12 h-[2.5vw] p-0"
                  >
                    <img
                      src="/wp-content/logo/tailwind.icon.svg"
                      alt="Tailwind CSS logo"
                      className="min-h-6 h-[1.25vw] saturate-0 transition-all group-hover:saturate-100"
                    />
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
