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
      type: "website",
      url: config.url,
      siteName: config.title,
      title: title,
      description:
        config.themeConfig?.metadata?.description ?? config.description,
      images: config.themeConfig.image,
      locale: "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${config.themeConfig?.metadata?.creator ?? "Toa Kiryu"}`,
      title: title,
      description:
        config.themeConfig?.metadata?.description ?? config.description,
      creator: `@${config.themeConfig?.metadata?.creator ?? "Toa Kiryu"}`,
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
