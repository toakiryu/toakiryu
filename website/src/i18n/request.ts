import config from "@/richtpl.config";
import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !config.i18n.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`../../.translations/${locale}.json`))
    .default;
  const defaultMessages = (await import(`../../.translations/ja.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages: messages,
  };
});
