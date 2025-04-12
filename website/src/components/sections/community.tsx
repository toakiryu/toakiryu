import React from "react";

import Link from "../custom/link";

import { FlickeringGrid } from "../magicui/flickering-grid";
import { Ripple } from "../magicui/ripple";
import { AvatarCircles } from "../magicui/avatar-circles";
import { IconUsers } from "@tabler/icons-react";

const avatars = [
  {
    imageUrl: "https://github.com/smaeda-ks.png",
    profileUrl: "https://github.com/smaeda-ks",
  },
  {
    imageUrl: "https://github.com/mongolyy.png",
    profileUrl: "https://github.com/mongolyy",
  },
  {
    imageUrl: "https://github.com/tamonmon0417.png",
    profileUrl: "https://github.com/tamonmon0417",
  },
  {
    imageUrl: "https://github.com/RimlTempest.png",
    profileUrl: "https://github.com/RimlTempest",
  },
  {
    imageUrl: "https://github.com/ya2s.png",
    profileUrl: "https://github.com/ya2s",
  },
  {
    imageUrl: "https://github.com/AyamotoKohei.png",
    profileUrl: "https://github.com/AyamotoKohei",
  },
];

function SectionCommunity() {
  return (
    <section id="community">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tight uppercase">
            Community
          </h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-linear-to-t from-background dark:from-background -z-10 from-50%" />
          <FlickeringGrid
            className="w-full h-full -z-20 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
        <div className="border-x border-t overflow-hidden relative">
          <Ripple />
          <div className="p-6 text-center py-12">
            <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
              僕が参加しているコミュニティーに皆さんも参加してみてください。
            </p>
            <div className="flex justify-center -space-x-6 mb-8">
              <AvatarCircles
                href="https://vercel.connpass.com/participation/"
                numPeople={99}
                avatarUrls={avatars}
              />
            </div>
            <div className="flex justify-center">
              <Link
                href="https://vercel.connpass.com"
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 flex items-center gap-2"
              >
                <IconUsers />
                参加する
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCommunity;
