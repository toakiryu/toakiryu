import {
  IconBrandGithub,
  IconBrandX,
  IconCode,
  IconFileDescription,
  IconMail,
  IconSocial,
} from "@tabler/icons-react";
import { ColorModeToggle } from "@/src/components/ui/color-mode-toggle.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/shadcn/card";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/shadcn/avatar";
import { LinkButton } from "@/src/components/custom/link-button";

import PageHomeCompactProjectsContent from "./(page)/compact-projects-content";

import PageHomeClient from "./client";

export default function Home() {
  return (
    <div>
      <PageHomeClient />
      <PageHomeCompactProjectsContent />
      <div className="relative w-full">
        {/* <section>
          <ProjectsCarousel />
        </section> */}
        <div className="w-full flex flex-col min-h-screen bg-background text-foreground">
          <div className="relative flex flex-col w-full h-full min-h-dvh py-24">
            <ColorModeToggle />
            <section className="relative grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl m-auto p-5">
              <div className="absolute w-[1px] left-1/2 -translate-x-1/2 -inset-y-10 bg-primary/20 animate-pulse" />
              <div className="absolute rounded-2xl border border-primary/20 inset-y-0 inset-x-16 md:inset-x-[17.5%] animate-pulse" />
              <div className="absolute flex flex-col items-center justify-center p-2 -top-12 left-1/2 -translate-x-1/2">
                <div className="bg-primary/20 absolute rounded-full -inset-3 animate-ping" />
                <div className="bg-background border ring-4 ring-primary/20 absolute rounded-full border-primary -inset-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-2">
                    <Avatar>
                      <AvatarImage
                        src="/wp-content/brand/toakiryu/icon.256x256.webp"
                        alt="Icon"
                      />
                      <AvatarFallback>ICON</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
              <div className="absolute flex items-center justify-center -bottom-10 left-1/2 -translate-x-1/2">
                <div className="bg-primary border-primary p-1 animate-ping rounded-full" />
                <div className="absolute bg-primary border-primary inset-0 rounded-full" />
              </div>
              <AspectRatio ratio={1 / 1} className="bg-transparent">
                <Card className="relative w-full h-full py-0 bg-popover text-popover-foreground border border-border overflow-hidden">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src="/wp-content/image/upload/front/nextjs/twitter-card.png"
                      alt="Photo by Drew Beamer"
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                </Card>
              </AspectRatio>
              <Card className="relative md:col-span-2 flex flex-row gap-0 w-full py-0 bg-popover text-popover-foreground border border-border overflow-hidden">
                <div className="relative flex flex-col items-center justify-start p-3">
                  <div className="absolute inset-y-0 right-1/2 translate-x-1/2 w-[1px] bg-border" />
                  <div className="relative p-2 bg-popover rounded-full border border-border">
                    <IconFileDescription size={20} />
                  </div>
                </div>
                <div className="flex py-3 pr-5 flex-col gap-1 flex-1">
                  <h1 className="flex items-center h-10 text-lg font-bold">
                    Description
                  </h1>
                  <p className="dark:text-foreground/70">
                    最新の技術とフレームワークを駆使し、モダンでスケーラブルなウェブアプリケーションを開発します。Next.js
                    とTypeScriptを活用したフルスタック開発が得意です。他にも API
                    開発なども行っています。
                  </p>
                </div>
              </Card>

              <Card className="relative flex flex-row-reverse md:col-span-2 w-full py-0 bg-popover text-popover-foreground border border-border overflow-hidden">
                <div className="relative p-3 flex flex-col items-center justify-start">
                  <div className="absolute inset-y-0 right-1/2 translate-x-1/2 w-[1px] bg-border" />
                  <div className="relative p-2 bg-popover rounded-full border border-border">
                    <IconCode size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1 py-3 pl-5"></div>
              </Card>
              <Card className="relative col-span-1 gap-0 w-full py-0 bg-popover text-popover-foreground border border-border overflow-hidden"></Card>

              <Card className="relative md:col-span-3 gap-0 w-full py-0 bg-popover text-popover-foreground border border-border overflow-hidden">
                <CardHeader className="py-5">
                  <CardTitle className="flex items-center gap-3">
                    <IconSocial />
                    Socials
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3 border-t py-5">
                  <LinkButton
                    href="http://l.toakiryu.com/github"
                    variant="outline"
                  >
                    <IconBrandGithub />
                    GitHub
                  </LinkButton>
                  <LinkButton href="http://l.toakiryu.com/x" variant="outline">
                    <IconBrandX />
                    Twitter
                  </LinkButton>
                  <LinkButton
                    href="mailto:toakiryu@gmail.com"
                    variant="outline"
                  >
                    <IconMail />
                    Email
                  </LinkButton>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
