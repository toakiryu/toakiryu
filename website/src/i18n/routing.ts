import { i18n } from '@/data/i18n';

export const locales = i18n.locales;

export type Locale = (typeof locales)[number];

export function getLocaleStaticPaths() {
  return locales.map((lang) => ({
    params: { lang },
  }));
}
