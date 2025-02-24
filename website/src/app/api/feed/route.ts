import { Feed } from "feed";
import { NextResponse } from "next/server";
import siteConfig from "../../../../richtpl.config";
import certifications from "../../../../certifications";

export async function GET() {
  const siteUrl = siteConfig.url;
  const feed = new Feed({
    id: `${siteUrl}/feed`,
    title: siteConfig.title,
    description: siteConfig.description,
    link: `${siteUrl}/feed`,
    language: "ja",
    image: `${siteUrl}/wp-content/toakiryu/icon-rounded.png`,
    favicon: `${siteUrl}/wp-content/toakiryu/icon-rounded.ico`,
    copyright: `© ${new Date().getFullYear()} Toa Kiryu`,
    updated: new Date(),
  });

  const rssFeed = feed.rss2();
  const encoder = new TextEncoder(); // UTF-8 にエンコード
  return new NextResponse(encoder.encode(rssFeed), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
