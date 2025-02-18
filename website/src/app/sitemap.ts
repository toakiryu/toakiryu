import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import config from "../../richtpl.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result: MetadataRoute.Sitemap = [];

  const homeUrl = `${config.url}`;

  result.push({
    url: homeUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  const dirPath = path.join(process.cwd(), `src/app/`);

  if (fs.existsSync(dirPath)) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      if (
        item.isDirectory() &&
        !config.themeConfig.sitemap?.excludedDirs?.includes(item.name)
      ) {
        const pagePath = path.join(dirPath, item.name, "page.tsx");
        if (fs.existsSync(pagePath)) {
          const url = `${config.url}/${item.name}`;

          result.push({
            url: url,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.7,
          });
        }
      }
    }
  }

  return result;
}
