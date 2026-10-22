export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export function getLocaleStaticPaths() {
  return locales.map((lang) => ({
    params: { lang },
  }));
}
