import React from "react";
import { FlickeringGrid } from "../magicui/flickering-grid";
import Link from "../custom/link";

export type SectionProjectsType = {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
};

function SectionProjects({ projects }: { projects: SectionProjectsType[] }) {
  return (
    <section id="projects">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tight uppercase">
            Projects
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
        <div className="border-x border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-2 items-center justify-center py-8 px-4 border-b transition-colors hover:bg-secondary/20 last:border-b-0 md:nth-[2n+1]:border-r md:nth-[n+5]:border-b-0 lg:nth-[3n]:border-r-0 lg:nth-[n+4]:border-b-0 lg:border-r"
              >
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="bg-linear-to-b from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-2 rounded-lg transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                    {React.createElement(project.icon, { size: 32 })}
                  </div>
                  <h2 className="text-xl font-medium text-card-foreground text-center text-balance">
                    {project.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground text-balance text-center truncate max-w-md max-h-10 mx-auto">
                  {project.description}
                </p>
                <Link
                  className="text-sm text-primary hover:underline underline-offset-4 transition-colors hover:text-secondary-foreground"
                  href={project.link}
                >
                  Learn more &gt;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionProjects;