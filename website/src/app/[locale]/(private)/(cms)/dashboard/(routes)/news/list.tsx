"use client";

import React from "react";
import { supabaseDatabaseType } from "@/src/utils/supabase/table";
import axios from "axios";
import { Card } from "@/src/components/ui/shadcn/card";

type statusType = "await" | "loading" | "error" | "null" | "ready";

export function NewsList() {
  const [status, setStatus] = React.useState<statusType>("await");
  const [news, setNews] = React.useState<
    supabaseDatabaseType.public.tables.news.req.iptdacu[] | null
  >(null);

  React.useEffect(() => {
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
    <div>
      <ul className="flex flex-wrap gap-2">
        {news?.map((item) => (
          <li key={item.id}>
            <Card>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
