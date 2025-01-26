import { products } from "../../../config";
import { Image } from "@heroui/react";
import { lazyImport } from "@/components/lazyImport";
const HeroParallax = lazyImport(() => import("@/components/ui/hero-parallax"))
const HeroAboutMeContent = lazyImport(() => import("@/components/hero/aboutMe"))
const ContainerScroll = lazyImport(() => import("@/components/ui/container-scroll-animation"))
const HeroTimelineContent = lazyImport(() => import("@/components/hero/timelineContent"))
const ServerWorldMap = lazyImport(() => import("@/components/hero/ServerWorldMap"))

export default function Home() {
  return (
    <div>
      <HeroParallax products={products} />
      <HeroAboutMeContent />
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Toa Kiryu
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  FullStack Developer
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/wp-content/toakiryu/3ae6f47b-fdff-45b6-976d-4b33addd1cf5.webp`}
            alt="Toa Kiryu Hero Image"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
            loading="lazy"
          />
        </ContainerScroll>
      </div>
      <HeroTimelineContent />
      <ServerWorldMap />
    </div>
  );
}
