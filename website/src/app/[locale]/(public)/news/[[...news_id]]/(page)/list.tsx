"use client";

import { Dispatch, SetStateAction, useState } from "react";
import type { newsType, supabaseDatabaseType } from "@/src/utils/supabase/table";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";

function SelectContentType({
  selectContentType,
  setSelectContentType,
}: {
  selectContentType: string;
  setSelectContentType: Dispatch<SetStateAction<"all" | newsType>>;
}) {
  function SelectBadge({ label, val }: { label: string; val: "all" | newsType }) {
    const isSelect = val === selectContentType;
    return (
      <Badge
        className="px-5 py-1"
        variant={isSelect ? "default" : "outline"}
        onClick={() => setSelectContentType(val)}
      >
        {label}
      </Badge>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-1">
      <SelectBadge label="全て" val="all" />
      <SelectBadge label="お知らせ" val="notice" />
      <SelectBadge label="イベント" val="event" />
      <SelectBadge label="その他" val="other" />
    </div>
  );
}

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

export function NewsListContent() {
  const [news, setNews] = useState<
    null | supabaseDatabaseType.public.tables.news.req.iptdacu[]
  >(null);
  const [selectContentType, setSelectContentType] = useState<"all" | newsType>(
    "all"
  );

  console.debug("news list:", news);
  console.debug("setNews:", setNews);

  return (
    <div className="relative w-full mx-auto">
      <div className="sticky z-10 top-0 left-0 w-full flex flex-col py-5 border-b bg-background/50 backdrop-blur-lg drop-shadow-lg">
        <SelectContentType
          selectContentType={selectContentType}
          setSelectContentType={setSelectContentType}
        />
      </div>
      <div className="w-full p-5">
        <li className="flex flex-wrap justify-center gap-5 w-full mx-auto">
          <NewsSkeleton />
        </li>
      </div>
    </div>
  );
}
