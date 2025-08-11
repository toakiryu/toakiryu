import React from "react";
import { IconUsers } from "@tabler/icons-react";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";
import { projects } from "projects";
import { LinkText } from "@/src/components/custom/link-text";

export default function PageHomeCompactProjectsContent() {
  return (
    <section
      id="projects"
      className="relative w-full h-full py-10 md:py-15 lg:py-20"
    >
      <div className="max-w-5xl mx-auto mb-10 px-5">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-lg/20 text-center uppercase">
          Projects
        </h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-5 w-full h-full px-5 md:px-[8vw] lg:px-[7vw] xl:px-[6vw] py-5">
        {projects.map((project, index) => {
          return (
            <li
              key={index}
              className="relative group bg-background w-full h-full pb-5 rounded-2xl drop-shadow-md overflow-hidden hover:drop-shadow-2xl transition-all duration-300 ease-linear"
            >
              <LinkText
                href={`https://github.com/${project.repo}`}
                className="relative w-full h-auto"
                isDefClass={false}
              >
                <AspectRatio
                  ratio={16 / 9}
                  className="w-full h-auto rounded-t-2xl overflow-hidden"
                >
                  <Skeleton className="w-full h-full rounded-none" />
                </AspectRatio>
                <div className="relative w-full mb-[45px]">
                  <div className="absolute -top-5 left-5 bg-background p-5 rounded-full">
                    <project.icon />
                  </div>
                </div>
                <div className="w-full h-auto pt-3 px-5">
                  <h1 className="font-bold text-lg">{project.title}</h1>
                  <p className="mt-2">{project.description}</p>
                </div>
              </LinkText>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
