import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import siteConfig from "../../richtpl.config";

type Messages = Record<string, any>;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !siteConfig.i18n.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`../../.translations/${locale}.json`))
    .default as Messages;
  const defaultMessages = (
    await import(`../../.translations/${siteConfig.i18n.defaultLocale}.json`)
  ).default as Messages;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
