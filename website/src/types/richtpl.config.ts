import { Metadata, MetadataRoute } from "next";
import { ThemeProviderProps } from "next-themes";

/**
 * Internationalization (i18n) configuration type.
 * Contains default locale, supported locales, and locale-specific configurations.
 */
type i18n = {
  defaultLocale: string; // The default language locale
  locales: string[]; // Array of supported locales
  localeConfigs: { [locale: string]: localeConfig }; // Configuration for each locale
  selectButton?: boolean; // Option to include a locale selection button
  localePrefix: "always" | "as-needed"
};

/**
 * Configuration for a specific locale.
 * Includes label, HTML language attribute, and path prefix.
 */
type localeConfig = {
  label: string; // Human-readable name of the locale
  htmlLang: string; // HTML language attribute value
  path: string; // URL path prefix for the locale
};

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
interface siteConfigType {
  title: string; // Site title
  description?: string; // Site description
  tagline: string; // Site tagline
  favicon?: string; // URL to the favicon

  url: string; // Production URL of the site
  baseUrl?: string; // Base URL pathname

  organizationName: string; // GitHub organization/user name
  projectName: string; // GitHub repository name

  i18n: i18n; // Internationalization settings

  themeConfig: ThemeConfig; // Theme and layout configuration
}

export default siteConfigType;
