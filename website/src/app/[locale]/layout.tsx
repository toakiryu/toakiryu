import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// config
import config from "../../../richtpl.config";

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

// next-theme
import { ThemeProvider } from "next-themes";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";

import { lazyImport } from "@/components/lazyImport";
const Header = lazyImport(() => import("@/components/header"));
const Footer = lazyImport(() => import("@/components/footer"));

import { GoogleAnalytics } from "@next/third-parties/google";

import { HeroUIProvider } from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type LayoutProps = {
  locale: string;
};

export async function generateMetadata(props: {
  params: LayoutProps;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tOpenGraph = await getTranslations({ locale, namespace: "open-graph" });

  const header = await headers();
  const pathname = header.get("x-pathname");
  const path = pathname ? pathname : "";
  let nowUrl = path.replace(`/${locale}`, "");
  if (!nowUrl) {
    nowUrl = "/";
  }

  const generateAlternates = () => {
    const alternates: {
      canonical: string;
      languages: { [key: string]: string };
    } = {
      canonical: `${config.url}${path}`,
      languages: {},
    };

    for (const locale of config.i18n.locales) {
      const localeConfig = config.i18n.localeConfigs[locale];
      const cleanPath = path.replace(`/${locale}`, ""); // Remove current locale from path
      alternates.languages[
        localeConfig.htmlLang
      ] = `${config.url}/${localeConfig.path}${cleanPath}`;
    }

    return alternates;
  };

  const openGraphTitle = `${
    tOpenGraph.has(`${nowUrl}.title`)
      ? `${tOpenGraph(`${nowUrl}.title`)} | ${t("templateTitle")}`
      : t(`title`)
  }`;
  const openGraphImageURL = `${
    nowUrl === "/"
      ? `/${locale}/api/og`
      : `${`/${locale}/api/og?theme=mainTitleMinIcon&title=${
          tOpenGraph.has(`${nowUrl}.title`)
            ? tOpenGraph(`${nowUrl}.title`)
            : t(`title`)
        }&description=${
          tOpenGraph.has(`${nowUrl}.description`)
            ? tOpenGraph(`${nowUrl}.description`)
            : t(`description`)
        } `}`
  }`;

  return {
    title: {
      template: `%s | ${
        config.themeConfig?.metadata?.title ||
        config.title ||
        t(`templateTitle`)
      }`,
      default: `${
        config.themeConfig?.metadata?.title || config.title || t(`title`)
      }`,
    },
    description: `${
      config.themeConfig?.metadata?.title ||
      config.description ||
      t(`description`)
    }`,
    referrer:
      config.themeConfig?.metadata?.referrer || "origin-when-cross-origin",
    keywords: config.themeConfig?.metadata?.keywords || ["Vercel", "Next.js"],
    authors: config.themeConfig?.metadata?.authors || [
      { name: "Toa Kiryu", url: "https://toakiryu.com" },
    ],
    creator: config.themeConfig?.metadata?.creator || "Toa Kiryu",
    icons: config.favicon || "/favicon.ico",
    generator: config.themeConfig?.metadata?.generator || "Next.js",
    publisher: config.themeConfig?.metadata?.publisher || "Vercel",
    robots: config.themeConfig?.metadata?.robots || "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase || new URL(config.url),
    alternates: generateAlternates(),
    openGraph: {
      type: "website",
      url: config.url,
      siteName:
        config.themeConfig?.metadata?.openGraph?.siteName ||
        config.title ||
        t(`title`),
      title: openGraphTitle,
      description:
        config.themeConfig?.metadata?.openGraph?.description ||
        config.description ||
        t(`description`),
      images: openGraphImageURL,
      locale:
        config.themeConfig?.metadata?.openGraph?.locale ||
        config.i18n.localeConfigs[locale].htmlLang ||
        "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${
        config.themeConfig?.metadata?.twitter?.site ||
        config.themeConfig?.metadata?.creator ||
        "toakiryu"
      }`,
      title: openGraphTitle,
      description:
        config.themeConfig?.metadata?.twitter?.description ||
        config.description ||
        t(`description`),
      creator: `@${
        config.themeConfig?.metadata?.twitter?.creator ||
        config.themeConfig?.metadata?.creator ||
        "toakiryu"
      }`,
      images: openGraphImageURL,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LayoutProps;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const gaId = process.env.GA_ID || "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <GoogleAnalytics gaId={gaId} />
      <body
        className={`relative w-full h-full overflow-x-clip ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <HeroUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={config.themeConfig.colorMode.defaultMode}
            {...config.themeConfig.colorMode.custom}
          >
            <NextIntlClientProvider messages={messages}>
              <Header />
              <main className="w-full h-full">{children}</main>
              <Footer />
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
