import { Metadata, MetadataRoute } from "next";
import { ThemeProviderProps } from "next-themes";

/**
 * Theme configuration type.
 * Defines color mode settings, social card image, metadata, header, and footer.
 */
type ThemeConfig = {
  colorMode: {
    defaultMode: "light" | "dark" | "system" | string; // Default color mode
    selectSwitch: boolean; // Whether to allow switching color modes
    custom?: ThemeProviderProps;
  };
  image?: string; // Social card image URL
  metadata?: Metadata; // Metadata for the site
  sitemap?: {
    // List of directories to exclude from the sitemap
    excludedDirs?: string[];
  };
  robots?: MetadataRoute.Robots;
};

/**
 * Main configuration type for the site.
 * Includes basic site information, i18n settings, and theme configuration.
 */
interface Config {
  title: string; // Site title
  description?: string; // Site description
  tagline: string; // Site tagline
  favicon?: string; // URL to the favicon

  url: string; // Production URL of the site
  baseUrl?: string; // Base URL pathname

  organizationName: string; // GitHub organization/user name
  projectName: string; // GitHub repository name

  themeConfig: ThemeConfig; // Theme and layout configuration
}

export default Config;
