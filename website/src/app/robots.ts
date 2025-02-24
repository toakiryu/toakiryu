import { MetadataRoute } from "next";
import config from "../../richtpl.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api"],
    },
    sitemap: [
      `${config.url}/sitemap.xml`,
      `${config.url}/api/feed`,
      `${config.url}/api/feed/certifications`,
    ],
    ...config.themeConfig.robots,
  };
}
