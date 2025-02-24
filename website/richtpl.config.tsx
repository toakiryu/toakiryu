import Config from "@/types/richtpl.config";

const _config = {
  url: "https://toakiryu.com",
  title: "桐生トア",
  description:
    "最新の技術とフレームワークを駆使し、モダンでスケーラブルなウェブアプリケーションを開発します。ReactとTypeScriptを活用したフロントエンド開発が得意です。",
};

/**
 * Site configuration object.
 * Contains general site information, i18n settings, and theme configuration.
 */
const siteConfig: Config = {
  // Tagline for the site
  tagline: "Toa Kiryu Website",

  // URL to the favicon
  favicon: "/favicon.ico",

  // Production URL of the site
  url: _config.url,

  // Base URL pathname (for GitHub Pages deployment)
  baseUrl: "/",

  title: "桐生トア",
  description: _config.description,

  // GitHub deployment configuration
  organizationName: "toakiryu", // GitHub organization/user name
  projectName: "toakiryu", // GitHub repository name

  // Theme and layout configuration
  themeConfig: {
    // Color mode settings
    colorMode: {
      defaultMode: "system", // Default color mode (light, dark, or system)
      selectSwitch: true, // Whether to allow switching color modes
    },
    // URL to the social card image (replace with your project's image)
    image: "/wp-content/toakiryu/icon-rounded.png",

    // Metadata for the site
    metadata: {
      keywords: [
        "きりゅうとあ",
        "とあきりゅう",
        "桐生トア",
        "桐生",
        "トア",
        "とあ",
        "Toakiryu",
        "toa kiryu",
        "kiryu",
        "toa",
        "portfolio",
        "website",
        "projects",
        "fullstack developer",
        "vercel-hosting",
      ],
      authors: { name: "toakiryu", url: "https://toakiryu.com" },
      creator: "toakiryu",
      icons: {
        icon: "/wp-content/toakiryu/icon-rounded.ico",
        apple: "/wp-content/toakiryu/icon-rounded.png",
      },
      generator: "Next.js",
      publisher: "Vercel",
      robots: "follow, index",
      metadataBase: new URL("https://toakiryu.com"),

      title: {
        template: `%s | ${_config.title}`,
        default: `${_config.title} | 公式ウェブサイト`,
      },

      openGraph: {
        type: "profile",
        url: _config.url,
        title: `${_config.title}｜公式ウェブサイト`,
        description: _config.description,
        images: [
          {
            url: "/wp-content/toakiryu/icon_256x256.png",
            width: 512,
            height: 512,
            alt: "Toa Kiryu's Profile Icon",
          },
        ],
        locale: "ja-JP",
      },
      twitter: {
        card: "summary", // `summary` or `summary_large_image`
        site: "@toakiryu",
        title: `${_config.title}｜公式ウェブサイト`,
        description: _config.description,
        creator: "@toakiryu",
        images: "/wp-content/toakiryu/icon_256x256.png",
      },

      other: {
        "rss-feed": "/api/feed",
        "rss-certifications": "/api/feed/certifications",
      },
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
