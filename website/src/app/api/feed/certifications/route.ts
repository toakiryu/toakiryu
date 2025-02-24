import { Feed } from "feed";
import { NextResponse } from "next/server";
import siteConfig from "../../../../../richtpl.config";
import certifications from "../../../../../certifications";

export async function GET() {
  const siteUrl = siteConfig.url;
  const feed = new Feed({
    id: `${siteUrl}/feed/certifications`,
    title: "桐生トア 取得資格フィード",
    description: "私が取得した資格の最新情報をお届けします。",
    link: `${siteUrl}/feed/certifications`,
    language: "ja",
    copyright: `© ${new Date().getFullYear()} Toa Kiryu`,
    updated: new Date(),
  });

  certifications.forEach((cert) => {
    feed.addItem({
      title: cert.name,
      id: `${siteUrl}/certifications/${cert.id}`,
      link: cert.credentialUrl || `${siteUrl}/wp-content/uploads/certifications/${cert.id}.webp`,
      guid: "",
      description: `発行元: ${cert.issuer}\n取得日: ${cert.issueDate}${
        cert.expirationDate
          ? `\n有効期限: ${cert.expirationDate || "無期限"}`
          : ""
      }\n${cert.skills ? `関連スキル: ${cert.skills.join(", ")}` : ""}`,
      date: new Date(cert.issueDate),
    });
  });

  const rssFeed = feed.rss2();
  const encoder = new TextEncoder(); // UTF-8 にエンコード
  return new NextResponse(encoder.encode(rssFeed), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
