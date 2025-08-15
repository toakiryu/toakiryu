"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import { IconChevronLeftPipe } from "@tabler/icons-react";
import type { supabaseDatabaseType } from "@/src/utils/supabase/table";
import { LinkButton } from "@/src/components/custom/link-button";
import { MarkdownRenderer } from "@/src/components/ui/markdown/render";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { PaperContainer } from "@/src/components/custom/paper-container";

type statusType = "await" | "loading" | "error" | "null" | "ready";

function NewsOneContentSkeleton() {
  return (
    <div className="w-full max-w-[750px] mx-auto p-5">
      <div className="mb-10">
        <LinkButton
          href="/news"
          size="icon"
          variant="outline"
          className="active:scale-90 transition-all duration-300 ease-linear"
        >
          <IconChevronLeftPipe />
        </LinkButton>
      </div>
      <div className="flex flex-wrap justify-between items-center my-2">
        <Skeleton className="w-[53px] h-[22px]" />
        <Skeleton className="w-[70px] h-[24px]" />
      </div>
      <div className="flex justify-center items-center w-full mx-auto">
        <div className="relative group w-full h-full min-w-[223.98px] max-w-[750px]">
          <AspectRatio
            ratio={16 / 9}
            className="min-w-[223.98px] max-w-[750px] min-h-[125.98px] max-h-[596.88px]"
          >
            <Skeleton className="w-full h-full rounded-sm" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex flex-col w-full mt-5">
        <Skeleton className="w-full h-[24px]" />
        <Skeleton className="w-3/4 h-[24px] mt-2" />
      </div>
    </div>
  );
}

export function NewsOneContent({
  newsId,
}: {
  lang: string;
  newsId: string | null;
}) {
  const format = useFormatter();
  const [status, setStatus] = useState<statusType>("await");
  const [news, setNews] =
    useState<supabaseDatabaseType.public.tables.news.req.def | null>(null);

  useEffect(() => {
    const getNews = async () => {
      setStatus("loading");
      const res = await axios(`/api/news?id=${newsId}`, {
        method: "GET",
      });
      if (res.status === 200) {
        const data: supabaseDatabaseType.public.tables.news.req.def = res.data;
        setNews(data);
        setStatus("ready");
      } else {
        setStatus("error");
        console.error(res.statusText);
      }
    };

    getNews();
  }, []);

  if (!news) {
    return <NewsOneContentSkeleton />;
  }

  console.debug("news one status:", status);

  const dateTime = new Date(news.created_at);

  return (
    <div className="relative w-full mx-auto">
      <PaperContainer>
        <div className="w-full max-w-[750px] p-5 mx-auto bg-background">
          <div className="mb-10">
            <LinkButton
              href="/news"
              size="icon"
              variant="outline"
              className="active:scale-90 transition-all duration-300 ease-linear"
            >
              <IconChevronLeftPipe />
            </LinkButton>
          </div>
          <div className="flex flex-wrap justify-between items-center my-2">
            <Badge variant="secondary">{news.type}</Badge>
            <time dateTime={new Date(news.created_at).toString()}>
              {format.dateTime(dateTime, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </time>
          </div>
          <div className="flex justify-center items-center w-full mx-auto">
            <div className="relative group w-full h-full min-w-[223.98px] max-w-[750px]">
              <AspectRatio
                ratio={16 / 9}
                className="min-w-[223.98px] max-w-[750px] min-h-[125.98px] max-h-[596.88px]"
              >
                <Skeleton className="w-full h-full rounded-sm" />
              </AspectRatio>
            </div>
          </div>
          <div className="w-full mt-5">
            <h1 className="font-bold text-2xl">{news.title}</h1>
            <article className="markdown">
              <MarkdownRenderer content={news.content!} />
            </article>
          </div>
        </div>
      </PaperContainer>
    </div>
  );
}
