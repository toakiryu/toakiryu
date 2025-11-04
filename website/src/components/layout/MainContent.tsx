"use client";

import { ColorModeToggle } from "@/components/ui/custom/color-mode-toggle.tsx";
import SplitText from "@/components/ui/bits/SplitText";
import ScrollFloat from "@/components/ui/bits/ScrollFloat";
import BeamsClient from "@/components/ui/bits/BeamsWrapper";
import GlareHover from "@/components/ui/bits/GlareHover";
import { usePrefetchOnHover } from "@/hooks/usePrefetchOnHover";

export function MainContent() {
  // prefetch heavy beams chunk when user hovers/focuses the title card
  const { prefetch } = usePrefetchOnHover(
    () => import("@/components/ui/bits/GlareHover"),
    { delay: 150 }
  );
  return (
    <div className="w-full h-full">
      <div className="flex flex-col-reverse md:flex-row gap-1.5 md:gap-2.5 p-[2vw] md:p-[1.5vw]">
        <GlareHover
          className="relative bg-foreground flex justify-center items-center w-[calc(100%-2vw)] md:w-[75px] h-10 md:h-[calc(100dvh-20vw)] lg:h-[calc(100dvh-5vw)] mx-auto md:mx-0 md:mr-auto rounded-[50px] overflow-hidden"
          onHoverStart={prefetch}
          glareColor="var(--background)"
          glareOpacity={0.06}
          transitionDuration={600}
        >
          <h1 className="text-background md:vertical-text-[sideways-lr-sideways] uppercase">
            Toa Kiryu's Official Website
          </h1>
        </GlareHover>
        <div className="relative w-[calc(100%-1vw)] md:w-[calc(100%-75px-10px)] h-[calc(100dvh-20vw)] md:h-[calc(100dvh-20vw)] lg:md:h-[calc(100dvh-5vw)] mx-auto md:mx-0 rounded-[50px] overflow-hidden">
          <BeamsClient
            beamWidth={1.5}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
      </div>
      <div className="w-full p-3">
        <ColorModeToggle />
      </div>
      <div className="w-auto px-[2vw] md:px-[1.5vw]">
        <SplitText
          text="Hello, GSAP!"
          className="cursor-target text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        {Array.from({ length: 100 }).map((_, index) => (
          <ScrollFloat
            key={index}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="cursor-target w-fit"
          >
            React Bits
          </ScrollFloat>
        ))}
      </div>
    </div>
  );
}
