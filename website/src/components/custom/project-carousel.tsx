"use client";

import { useEffect, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { githubGetRepos } from "@/src/utils/github/getrepos";

import { Carousel, CarouselContent, CarouselItem } from "@/src/components/ui/shadcn/carousel";
import { Card } from "@/src/components/ui/shadcn/card";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";
import { LinkButton } from "@/src/components/custom/link-button";

const ProjectsCarousel = () => {
  const [repos, setRepos] = useState<any[] | null | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await githubGetRepos("toakiryu");
        setRepos(res);
      } catch (err) {
        console.error(err);
        setRepos(null);
      }
    };
    fetch();
  }, []);

  function CarouselContents() {
    if (repos === undefined) {
      return (
        <>
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
              <AspectRatio ratio={2 / 1}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </CarouselItem>
          ))}
        </>
      );
    }

    if (repos === null) {
      return <p className="text-center w-full">データの取得に失敗しました。</p>;
    }

    return (
      <>
        {repos.slice(0, 10).map((repo) => (
          <CarouselItem key={repo.id} className="sm:basis-1/2 md:basis-1/3">
            <AspectRatio ratio={2 / 1}>
              <LinkButton
                href={`https://github.com/${repo.full_name}`}
                className="w-full h-full"
                variant="link"
              >
                <Card className="group relative flex items-center justify-center gap-0 w-full h-full py-0 overflow-hidden">
                  <div className="absolute w-full h-full">
                    <img
                      alt="GitHub Repo Image"
                      src={`https://opengraph.githubassets.com/main/${repo.full_name}`}
                      className="w-full h-full dark:grayscale-75 bg-cover bg-center bg-no-repeat"
                    />
                  </div>
                  <div className="relative w-full h-full">
                    <div className="w-full h-full group-hover:bg-primary/10 transition-all duration-300 ease-in-out" />
                  </div>
                </Card>
              </LinkButton>
            </AspectRatio>
          </CarouselItem>
        ))}
      </>
    );
  }

  return (
    <section className="">
      <div className="relative flex items-center justify-center lg:max-w-5xl mx-auto overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true })]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {CarouselContents()}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
