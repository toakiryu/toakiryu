"use client";

import { cn } from "@/lib/utils";
import Image from "@/components/custom/image";

import Header from "@/components/header";
import SectionCta from "@/components/sections/cta";
import Footer from "@/components/footer";

import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Error({ error, reset }: { error: any; reset: any }) {
  console.log(error);

  return (
    <div className="relative w-full h-full">
      <Header />
      <section id="status">
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
                <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
                  <h1 className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter">
                    <AuroraText>桐生トア</AuroraText>
                  </h1>
                  <p className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance mt-2">
                    最新の技術とフレームワークを用いて、美しい製品を開発しています。素晴らしい製品作りに情熱を注ぐ開発者です。
                  </p>
                  <div className="mt-5">
                    <InteractiveHoverButton onClick={reset}>
                      リトライ
                    </InteractiveHoverButton>
                  </div>
                </div>
              </div>
              <div className="relative lg:h-full lg:col-span-1">
                <Image
                  alt="500 Image"
                  src="/wp-content/uploads/kawaii-logos/500.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionCta />
      <Footer />
    </div>
  );
}
