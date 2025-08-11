"use client";

import { NewsProps } from "../layout";
import { NewsListContent } from "./list";
import { NewsOneContent } from "./one";

export default function NewsPageClient({ params }: NewsProps) {
  const { locale, news_id } = params;

  const isSelectNews = !!news_id;

  return (
    <section id="news">
      {isSelectNews ? (
        <NewsOneContent lang={locale} newsId={news_id} />
      ) : (
        <NewsListContent />
      )}
    </section>
  );
}
