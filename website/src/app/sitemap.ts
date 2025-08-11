import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import siteConfig from "@/richtpl.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result: MetadataRoute.Sitemap = [];

  // localePrefix に応じて異なる処理を行う
  const isLocalePrefixAsNeeded = siteConfig.i18n.localePrefix === "as-needed";

  for (const lang of siteConfig.i18n.locales) {
    const langConfig = siteConfig.i18n.localeConfigs[lang];
    const isDefaultLocale = lang === siteConfig.i18n.defaultLocale;

    // `localePrefix` に応じたホームURLの生成
    const homeUrl = isLocalePrefixAsNeeded
      ? isDefaultLocale
        ? siteConfig.url
        : `${siteConfig.url}/${langConfig.path}`
      : `${siteConfig.url}/${langConfig.path}`;

    result.push({
      url: homeUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: siteConfig.i18n.locales.reduce<{ [key: string]: string }>(
          (acc, l) => {
            const lConfig = siteConfig.i18n.localeConfigs[l];
            acc[lConfig.htmlLang] =
              l === siteConfig.i18n.defaultLocale
                ? siteConfig.url
                : `${siteConfig.url}/${lConfig.path}`;
            return acc;
          },
          {}
        ),
      },
    });

    const dirPath = path.join(process.cwd(), `src/app/[locale]`);

    if (fs.existsSync(dirPath)) {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const item of items) {
        if (
          item.isDirectory() &&
          !siteConfig.themeConfig.sitemap?.excludedDirs?.includes(item.name)
        ) {
          const pagePath = path.join(dirPath, item.name, "page.tsx");
          if (fs.existsSync(pagePath)) {
            // `localePrefix` に応じたURLの生成
            const pageUrl = isLocalePrefixAsNeeded
              ? isDefaultLocale
                ? `${siteConfig.url}/${item.name}`
                : `${siteConfig.url}/${langConfig.path}/${item.name}`
              : `${siteConfig.url}/${langConfig.path}/${item.name}`;

            result.push({
              url: pageUrl,
              lastModified: new Date().toISOString(),
              changeFrequency: "daily",
              priority: 0.7,
              alternates: {
                languages: siteConfig.i18n.locales.reduce<{
                  [key: string]: string;
                }>((acc, l) => {
                  const lConfig = siteConfig.i18n.localeConfigs[l];
                  acc[lConfig.htmlLang] =
                    l === siteConfig.i18n.defaultLocale
                      ? `${siteConfig.url}/${item.name}`
                      : `${siteConfig.url}/${lConfig.path}/${item.name}`;
                  return acc;
                }, {}),
              },
            });
          }
        }
      }
    }
  }

  return result;
}
