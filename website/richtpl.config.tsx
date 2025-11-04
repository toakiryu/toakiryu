import siteConfigType from "@/types/richtpl.config";

/**
 * Site configuration object.
 * Contains general site information, i18n settings, and theme configuration.
 */
const siteConfig: siteConfigType = {
  // Tagline for the site
  tagline: "Next.js Template",

  // URL to the favicon
  favicon: "/favicon.ico",

  // Production URL of the site
  url: "https://nextjs-rich-tpl.toaki.cc",

  // Base URL pathname (for GitHub Pages deployment)
  baseUrl: "/",

  title: "nextjs-rich-tpl",

  // GitHub deployment configuration
  organizationName: "toaki-cltv", // GitHub organization/user name
  projectName: "nextjs-rich-tpl", // GitHub repository name

  // Internationalization (i18n) configuration
  i18n: {
    // Default locale for the site
    defaultLocale: "ja",
    // List of supported locales
    locales: ["ja", "en"],
    // Locale-specific configurations
    localeConfigs: {
      ja: {
        label: "日本語", // Label for the Japanese locale
        htmlLang: "ja-JP", // HTML language attribute for Japanese
        path: "ja", // Path prefix for Japanese locale
      },
      en: {
        label: "English", // Label for the English locale
        htmlLang: "en-US", // HTML language attribute for English
        path: "en", // Path prefix for English locale
      },
    },
    selectButton: true, // Option to include a locale selection button
    localePrefix: "as-needed",
  },

  // Theme and layout configuration
  themeConfig: {
    // Color mode settings
    colorMode: {
      defaultMode: "system", // Default color mode (light, dark, or system)
      selectSwitch: true, // Whether to allow switching color modes
    },
    // URL to the social card image (replace with your project's image)
    image: "/wp-content/image/upload/front/nextjs/twitter-card.png",
    // Metadata for the site
    metadata: {
      keywords: [
        "Template",
        "i18n",
        "template",
        "Next.js",
        "autoprefixer",
        "rich",
        "tailwindcss",
        "framer-motion",
        "next-themes",
        "vercel-hosting",
        "next-intl",
        "lucide-icons",
      ],
      authors: { name: "toakiryu", url: "https://toakiryu.com" },
      creator: "toakiryu",
      icons: "/favicon.ico",
      generator: "Next.js",
      publisher: "Vercel",
      robots: "follow, index",
    },
    // Sitemap Configuration
    sitemap: {
      excludedDirs: [
        "error", // Directory for error pages
        "not-found", // Directory for 404 pages
        "[...rest]", // Directory for [...rest] pages
      ],
    },
  },
};

export default siteConfig;
