"use client";

import React from "react";
import { RoughNotation } from "react-rough-notation";
import {
  IconBrandAws,
  IconBrandBootstrap,
  IconBrandCloudflare,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGithubCopilot,
  IconBrandGoogleAnalytics,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandNpm,
  IconBrandNuxt,
  IconBrandOpenai,
  IconBrandPrisma,
  IconBrandPython,
  IconBrandReact,
  IconBrandStorybook,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVscode,
  IconBrandVue,
  IconBrandWix,
  IconBrandWordpress,
} from "@tabler/icons-react";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";
import { techStackList } from "@/_config/tech-stack";

export default function PageHomeTechStackContent() {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div ref={ref} className="bg-background px-5 py-10">
      <div className="w-full max-w-5xl mx-auto mb-10 px-5">
        <div className="w-fit mx-auto">
          <RoughNotation
            type="underline"
            show={isVisible}
            animationDuration={1500}
            color="color-mix(in oklab, var(--accent) 80%, transparent)"
            strokeWidth={5}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-md/10 text-center uppercase">
              Tech Stack
            </h1>
          </RoughNotation>
        </div>
      </div>
      <ul className="flex flex-wrap justify-center items-center gap-2">
        {techStackList.map((item, index) => {
          return (
            <li key={index}>
              <div className="flex flex-col justify-center items-center gap-1 p-2">
                <item.icon />
                <span>{item.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
