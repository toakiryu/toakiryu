"use client";

import React, { useRef } from "react";

import { cn } from "@/lib/utils";

import Link from "../custom/link";
import Image from "../custom/image";

import { ArrowRightIcon } from "lucide-react";

import { motion, useInView } from "motion/react";

import { Meteors } from "../magicui/meteors";
import { AnimatedGridPattern } from "../magicui/animated-grid-pattern";
import { AuroraText } from "../magicui/aurora-text";
import { SpinningText } from "../magicui/spinning-text";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";

function SectionHero() {
  const ref_avatar = useRef(null);
  const isInView_avatar = useInView(ref_avatar, { once: true, margin: "0px" });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true, margin: "0px" });

  return (
    <section id="hero">
      <div className="relative container max-w-5xl px-4">
        <div className="relative border-x overflow-hidden">
          <div className="-z-10">
            <Meteors number={30} />
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
          </div>
          <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-2 gap-x-8 w-full p-6 lg:p-12">
            <div className="flex flex-col justify-start items-start lg:col-span-1">
              <Link
                href="https://foriio.com/toakiryu"
                className="w-fit animation-slide-button"
              >
                <div
                  className={cn(
                    "group w-fit rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span>✨ ポートロフォリオ</span>
                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </Link>
              <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
                <motion.h1
                  ref={ref}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  variants={{
                    hidden: {
                      opacity: 0,
                      filter: "blur(100%)",
                      y: 50,
                    },
                    show: {
                      opacity: 1,
                      filter: "blur(0%)",
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter will-change-auto"
                >
                  <span className="inline-block text-balance">
                    <AuroraText>桐生トア</AuroraText>
                  </span>
                </motion.h1>
                <motion.p
                  ref={ref2}
                  initial="hidden"
                  animate={isInView2 ? "show" : "hidden"}
                  variants={{
                    hidden: {
                      opacity: 0,
                      filter: "blur(100%)",
                      y: 50,
                    },
                    show: {
                      opacity: 1,
                      filter: "blur(0%)",
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                    ease: "easeInOut",
                  }}
                  className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance mt-2"
                >
                  最新の技術とフレームワークを用いて、美しい製品を開発しています。素晴らしい製品作りに情熱を注ぐ開発者です。
                </motion.p>
              </div>
            </div>
            <div className="relative h-[240px] mb-5 lg:mb-0 lg:h-full lg:col-span-1">
              <motion.div
                ref={ref_avatar}
                initial="hidden"
                animate={isInView_avatar ? "show" : "hidden"}
                variants={{
                  hidden: {
                    opacity: 0,
                    filter: "blur(100%)",
                  },
                  show: {
                    opacity: 1,
                    filter: "blur(0%)",
                  },
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full origin-top-left flex items-center justify-center"
              >
                <SpinningText
                  reverse
                  className="text-3xl"
                  duration={4}
                  radius={6}
                >
                  frontend• backend • developer •
                </SpinningText>
                <Image
                  alt="avatar"
                  src="/wp-content/toakiryu/icon.png"
                  width={140}
                  height={140}
                  className="absolute"
                  rounded="9999px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHero;
