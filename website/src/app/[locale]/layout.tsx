import siteConfig from "@/richtpl.config";
import "../globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ClerkProvider } from "@clerk/nextjs";
import { jaJP, enUS } from "@clerk/localizations";
// import { dark } from '@clerk/themes'

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/src/i18n/routing";

import { Toaster } from "@/src/components/ui/shadcn/sonner";
import { TooltipProvider } from "@/src/components/ui/shadcn/tooltip";

export type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const header = await headers();
  const origin = header.get("x-origin") ?? siteConfig.url;
  const url = header.get("x-url") ?? siteConfig.url;
  const pathname = header.get("x-pathname");
  const path = pathname ? pathname : "";

  const generateAlternates = () => {
    const alternates: {
      canonical: string;
      languages: { [key: string]: string };
    } = {
      canonical: `${siteConfig.url}${path}`,
      languages: {},
    };

    for (const locale of siteConfig.i18n.locales) {
      const localeConfig = siteConfig.i18n.localeConfigs[locale];
      const cleanPath = path.replace(`/${locale}`, ""); // Remove current locale from path
      alternates.languages[
        localeConfig.htmlLang
      ] = `${siteConfig.url}/${localeConfig.path}${cleanPath}`;
    }

    return alternates;
  };

  // titleの値を判別
  const titleData = siteConfig.themeConfig?.metadata?.title;
  const title = t.has(`title.default`)
    ? t(`title.default`)
    : t.has(`title`)
    ? t(`title`)
    : typeof titleData === "string"
    ? titleData
    : titleData && "default" in titleData
    ? titleData.default
    : titleData && "absolute" in titleData
    ? titleData.absolute
    : siteConfig.title
    ? siteConfig.title
    : "Next.js Rich Tpl";

  const description =
    (t.has(`description`) && t(`description`)) ||
    siteConfig.themeConfig.metadata?.description ||
    siteConfig.description;

  return {
    title: {
      template: `%s | ${t.has(`title.template`) ? t(`title.template`) : title}`,
      default: `${title}`,
    },
    description: description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: [{ name: "Toa Kiryu", url: "https://toakiryu.com" }],
    creator: "Toa Kiryu",
    icons: siteConfig.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    alternates: generateAlternates(),
    openGraph: {
      type: "website",
      siteName: title,
      url: url,
      images:
        siteConfig.themeConfig.metadata?.openGraph?.images ??
        siteConfig.themeConfig.image,
      locale:
        siteConfig.themeConfig?.metadata?.openGraph?.locale ??
        siteConfig.i18n.localeConfigs[locale].htmlLang ??
        "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${siteConfig.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      creator: `@${siteConfig.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      images:
        siteConfig.themeConfig.metadata?.twitter?.images ??
        siteConfig.themeConfig.image,
    },
    ...siteConfig.themeConfig?.metadata,
    metadataBase: new URL(
      origin ?? siteConfig.themeConfig?.metadata?.metadataBase ?? siteConfig.url
    ),
  };
}

export default async function SiteRootLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`relative w-full h-full antialiased`}
        suppressHydrationWarning
      >
        <TooltipProvider>
          <div className="relative w-full h-full">
            <ClerkProvider
              localization={locale === "ja" ? jaJP : enUS}
              appearance={{
                // theme: dark,
                variables: {
                  colorPrimary: "var(--primary)",
                  colorDanger: "var(--destructive)",
                  colorSuccess: "var(--secondary)",
                  colorWarning: "var(--accent-foreground)",
                  colorNeutral: "var(--foreground)",
                  colorForeground: "var(--foreground)",
                  colorPrimaryForeground: "var(--primary-foreground)",
                  colorMutedForeground: "var(--muted-foreground)",
                  colorMuted: "var(--muted)",
                  colorBackground: "var(--card)",
                  colorInputForeground: "var(--muted-foreground)",
                  colorInput: "var(--input)",
                  // colorShimmer: "var(--aaaaa)",
                  colorRing: "var(--ring)",
                  colorShadow: "var(--shadow-color)",
                  colorBorder: "var(--border)",
                  // colorModalBackdrop: "var(--aaaaa)",
                  fontFamily: "var(--font-sans)",
                  // fontFamilyButtons: "var(--aaaaa)",
                  // fontSize: "var(--aaaaa)",
                  // fontWeight: "var(--aaaaa)",
                  borderRadius: "var(--radius)",
                  // spacing: "var(--aaaaa)",
                },
              }}
            >
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ClerkProvider>
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
