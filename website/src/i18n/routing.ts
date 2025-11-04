import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import siteConfig from "../../richtpl.config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: siteConfig.i18n.locales,

  // Used when no locale matches
  defaultLocale: siteConfig.i18n.defaultLocale,

  localePrefix: siteConfig.i18n.localePrefix,
});

export type Locale = (typeof routing.locales)[number];
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
