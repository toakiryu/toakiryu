"use client";

import React from "react";
import { useFormatter } from "next-intl";
import { RoughNotation } from "react-rough-notation";
import certifications from "@/_config/certifications";
import { cn } from "@/src/lib/utils";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";

export default function PageHomeCertificationsContent({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const format = useFormatter();
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div
      ref={ref}
      className={cn("bg-background px-5 py-10", className)}
      {...props}
    >
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
              認定資格/修了証
            </h1>
          </RoughNotation>
        </div>
      </div>
      <ul className="flex flex-wrap justify-center gap-3">
        {certifications.map((item, index) => {
          if (index >= 6) return null;
          return (
            <li key={index} className="relative max-w-xs">
              <div className="bg-accent w-full h-auto p-5 drop-shadow-md">
                <h1 className="font-bold">{item.name}</h1>
                <div className="my-2">
                  <div className="flex flex-wrap">
                    {item.skills?.map((skill, index) => {
                      return (
                        <span key={index} className="text-sm mr-1">
                          {skill},
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="flex mr-3">
                    <span>{item.issuer}</span>
                  </div>
                  <span>
                    {format.dateTime(new Date(item.issueDate), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
