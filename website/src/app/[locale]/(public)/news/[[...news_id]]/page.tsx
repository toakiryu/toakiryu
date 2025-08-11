"use server";

import { NewsPropsPromise } from "./layout";
import NewsPageClient from "./(page)/client";

export default async function NewsPage({ params }: NewsPropsPromise) {
  const pam = await params;

  return <NewsPageClient params={pam} />;
}
