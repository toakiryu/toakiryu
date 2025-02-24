import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// config
import config from "../../richtpl.config";

import { Toaster } from "sonner";

import { GoogleAnalytics } from "@next/third-parties/google";

import { ThemeProvider } from "next-themes";

export async function generateMetadata(): Promise<Metadata> {
  // titleの値を判別
  const titleData = config.themeConfig?.metadata?.title;
  let title: string;
  if (typeof titleData === "string") {
    title = titleData;
  } else if (titleData && "default" in titleData) {
    title = titleData.default;
  } else if (titleData && "absolute" in titleData) {
    title = titleData.absolute;
  } else {
    title = config.title;
  }

  return {
    title: {
      template: `%s | ${config.title}`,
      default: config.title,
    },
    description: config.description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: config.themeConfig?.metadata?.authors ?? [
      { name: "Toa Kiryu", url: "https://toakiryu.com" },
    ],
    creator: "Toa Kiryu",
    icons: config.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    metadataBase: new URL(config.url),
    openGraph: {
      type: "profile",
      url: config.url,
      siteName: config.title,
      title: title,
      description:
        config.themeConfig?.metadata?.description ?? config.description,
      images: [
        {
          url: config.themeConfig.image || config.favicon,
          width: 512,
          height: 512,
          alt: "Toa Kiryu's Profile Icon",
        },
      ],
      locale: "ja-JP",
    },
    twitter: {
      card: "summary", // `summary` or `summary_large_image`
      site: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      title: title,
      description:
        config.themeConfig?.metadata?.description ?? config.description,
      creator: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      images: config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.GA_ID || "";

  return (
    <html lang="ja" suppressHydrationWarning>
      <GoogleAnalytics gaId={gaId} />
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/api/feed"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Certifications Feed"
          href="/api/feed/certifications"
        />
        <meta name="theme-color" content="#1e2327" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body
        className={`relative w-full h-full overflow-x-clip ${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme={config.themeConfig.colorMode.defaultMode}
          {...config.themeConfig.colorMode.custom}
        >
          <main className="w-full h-full">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
