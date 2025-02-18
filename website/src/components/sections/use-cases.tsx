import React from "react";

import { FlickeringGrid } from "../magicui/flickering-grid";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import { AnimatedListNotifications } from "../ui/c/AnimatedListNotifications";
import { AnimatedBeamMultipleOutputs } from "../ui/c/AnimatedBeamMultipleOutputs";

import {
  IconCode,
  IconDeviceImac,
  IconNetwork,
  IconServer,
  IconUser,
} from "@tabler/icons-react";

function SectionUseCases() {
  return (
    <section id="use-canvas">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tigh uppercase">
            Use Cases
          </h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background -z-10 from-50%" />
          <FlickeringGrid
            className="w-full h-full -z-20 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
        <div className="grid lg:grid-cols-3 h-full border border-b-0">
          <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
            <div className="flex flex-col gap-y-5 items-center justify-between h-full w-full">
              <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
                <div className="p-2 rounded-t-md overflow-hidden h-[270px] flex flex-col gap-y-3.5 w-full [mask-image:radial-gradient(200px_circle_at_center,white,transparent)]">
                  <AnimatedListNotifications
                    loop
                    notifications={[
                      {
                        name: "クリエイター",
                        description: "公式サイトの制作を依頼したいです。",
                        time: "15m ago",
                        icon: "💸",
                        color: "#00C9A7",
                      },
                      {
                        name: "クリエイター",
                        description: "コラボしたいです！",
                        time: "10m ago",
                        icon: "👤",
                        color: "#FFB800",
                      },
                      {
                        name: "依頼主",
                        description: "依頼をお願いしたいです。",
                        time: "2m ago",
                        icon: "🗞️",
                        color: "#1E86FF",
                      },
                      {
                        name: "開発者",
                        description: "依頼内容のご確認をお願いします。",
                        time: "5m ago",
                        icon: "💬",
                        color: "#FF3D71",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                <h2 className="font-semibold tracking-tight text-lg">
                  素早い対応
                </h2>
                <p className="text-sm text-muted-foreground">
                  コミニケーションはとても大切です。僕は、素早い対応を心がけています。
                </p>
              </div>
            </div>
          </div>
          <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
            <div className="flex flex-col gap-y-5 items-center justify-between h-full w-full">
              <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex ">
                <div className="p-2 rounded-t-md overflow-hidden h-[270px] flex flex-col gap-y-3.5 w-full [mask-image:radial-gradient(200px_circle_at_center,white,transparent)]">
                  <AnimatedBeamMultipleOutputs />
                </div>
              </div>
              <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                <h2 className="font-semibold tracking-tight text-lg">
                  AI の活用
                </h2>
                <p className="text-sm text-muted-foreground">
                  作業の効率化のために、 AI
                  を様々な場面で積極的に活用しています。
                </p>
              </div>
            </div>
          </div>
          <div className="p-0 min-h-[500px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
            <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
              <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">
                <div className="relative flex items-center justify-center h-full w-full">
                  <OrbitingCircles
                    iconSize={30}
                    radius={40}
                    reverse
                    speed={1.8}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <IconUser />
                    </div>
                  </OrbitingCircles>
                  <OrbitingCircles iconSize={30} radius={80} speed={1.6}>
                    <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <IconDeviceImac />
                    </div>
                  </OrbitingCircles>
                  <OrbitingCircles
                    iconSize={30}
                    radius={120}
                    reverse
                    speed={1.4}
                  >
                    <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                      <IconCode />
                    </div>
                  </OrbitingCircles>
                  <OrbitingCircles iconSize={30} radius={160} speed={1.2}>
                    <div className="h-8 w-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                      <IconNetwork />
                    </div>
                  </OrbitingCircles>
                  <OrbitingCircles iconSize={30} radius={200} reverse speed={1}>
                    <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center">
                      <IconServer />
                    </div>
                  </OrbitingCircles>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                <h2 className="font-semibold tracking-tight text-lg">繋がり</h2>
                <p className="text-sm text-muted-foreground">
                  開発には様々な物や人が関係してきます。敬意を払い繋がりを大切にしています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionUseCases;
