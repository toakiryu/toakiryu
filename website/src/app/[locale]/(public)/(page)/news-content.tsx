"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormatter, useLocale } from "next-intl";
import { motion } from "motion/react";
import {
  IconArrowBarToRight,
  IconExclamationCircle,
  IconMoodPuzzled,
} from "@tabler/icons-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/src/lib/utils";
import type { supabaseDatabaseType } from "@/src/utils/supabase/table";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/src/components/custom/embla-buttons";
import { LinkButton } from "@/src/components/custom/link-button";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { LinkText } from "@/src/components/custom/link-text";

type statusType = "await" | "loading" | "error" | "null" | "ready";

function NewsSkeleton() {
  return (
    <>
      {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (_) => (
        <ul
          key={_}
          className="relative group cursor-pointer w-full h-full min-w-[223.98px] max-w-[350px]"
        >
          <div className="flex flex-col w-full h-full transition-all duration-300 ease-linear">
            <AspectRatio
              ratio={16 / 9}
              className="min-w-[223.98px] max-w-[350px] min-h-[125.98px] max-h-[196.88px]"
            >
              <Skeleton className="w-full h-full rounded-sm" />
            </AspectRatio>
            <div className="flex justify-between items-center my-2">
              <Skeleton className="w-[53px] h-[22px]" />
              <Skeleton className="w-[70px] h-[24px]" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-full h-[24px]" />
              <Skeleton className="w-3/4 h-[24px] mt-2" />
            </div>
          </div>
        </ul>
      ))}
    </>
  );
}

function StatusContent({ status }: { status: statusType }) {
  if (status === "null") {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <IconMoodPuzzled className="size-[30px] sm:size-[40px] lg:size-[50px] mb-2" />
        <span className="font-bold sm:text-lg lg:text-2xl">
          ニュースはありません
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <IconExclamationCircle className="size-[30px] sm:size-[40px] lg:size-[50px] mb-2" />
        <span className="font-bold sm:text-lg lg:text-2xl">
          ニュースの取得に失敗しました
        </span>
      </div>
    );
  }

  return null;
}

function NewsRender({
  status,
  news,
  lang,
}: {
  lang: string;
  status: statusType;
  news: supabaseDatabaseType.public.tables.news.req.iptdacu[] | null;
}) {
  const format = useFormatter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (status !== "ready") {
    return (
      <div className="relative mx-auto">
        <div className="overflow-hidden">
          <ul className="flex gap-5 px-11 md:px-[8vw] lg:px-[6vw] xl:px-[4vw] py-5">
            <NewsSkeleton />
            <StatusContent status={status} />
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto">
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="invisible md:visible"
      />
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-5 py-5">
          {news?.map((item, index) => (
            <motion.li
              key={index}
              className={cn(
                "relative group cursor-pointer w-full h-full",
                index === 0 && "pl-11 md:pl-[8vw] lg:pl-[7vw] xl:pl-[6vw]",
                news.length === index + 1 &&
                  "pr-11 md:pr-[8vw] lg:pr-[7vw] xl:pr-[6vw]"
              )}
            >
              <LinkText
                href={`/news/${item.id}`}
                isDefClass={false}
                className="relative flex w-full h-full min-w-[223.98px] max-w-[350px] md:min-w-[350px]"
              >
                <div className="flex flex-col w-full h-full group-hover:opacity-80 transition-all duration-300 ease-linear">
                  <AspectRatio
                    ratio={16 / 9}
                    className="w-full h-auto min-w-[223.98px] max-w-[350px] min-h-[125.98px] max-h-[196.88px] drop-shadow-md rounded-sm overflow-hidden"
                  >
                    {item.image ? (
                      <img alt="Image" src={item.image} className="" />
                    ) : (
                      <Skeleton className="w-full h-full" />
                    )}
                  </AspectRatio>
                  <div className="flex justify-between items-center my-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <time dateTime={new Date(item.created_at).toString()}>
                      {format.dateTime(new Date(item.created_at), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="">{item.title}</h1>
                  </div>
                </div>
              </LinkText>
            </motion.li>
          ))}
        </ul>
      </div>
      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="invisible md:visible"
      />
    </div>
  );
}

export default function PageHomeNewsContent({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const lang = useLocale();
  const [status, setStatus] = useState<statusType>("await");
  const [news, setNews] = useState<
    supabaseDatabaseType.public.tables.news.req.iptdacu[] | null
  >(null);

  useEffect(() => {
    const getNews = async () => {
      setStatus("loading");
      const res = await axios("/api/news", {
        method: "GET",
      });
      console.log(res);
      if (res.status === 200) {
        const data: supabaseDatabaseType.public.tables.news.req.iptdacu[] =
          res.data;
        if (data.length > 0) {
          setNews(data);
          setStatus("ready");
        } else {
          setStatus("null");
        }
      } else {
        setStatus("error");
        console.error(res.statusText);
      }
    };

    getNews();
  }, []);

  return (
    <div
      className={cn(
        "relative bg-background w-full h-full py-10 md:py-15 lg:py-20",
        className
      )}
      {...props}
    >
      <div className="max-w-5xl mx-auto mb-10 px-5">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-md/10 text-center uppercase">
          News
        </h1>
      </div>
      <NewsRender lang={lang} status={status} news={news} />
      <div className="flex justify-center items-center mt-5">
        <LinkButton
          href="/news"
          className="relative flex font-bold text-lg md:text-2xl lg:text-3xl w-auto h-auto px-14! md:px-18! lg:px-22! py-3! md:py-4! rounded-full hover:drop-shadow-2xl transition-all duration-300 ease-linear"
        >
          ニュース一覧
          <IconArrowBarToRight className="absolute top-0 border-0 right-5 md:right-6 lg:right-7 size-[25px] sm:size-[30px] md:size-[35px] h-full!" />
        </LinkButton>
      </div>
    </div>
  );
}
