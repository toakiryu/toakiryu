import config from "../../i18n.config";

export type LocaleKey = keyof typeof config.locales;

export const i18n = {
  locales: Object.keys(config.locales) as LocaleKey[],
  localesMap: config.locales,
  defaultLocale: config.defaultLocale,
}
