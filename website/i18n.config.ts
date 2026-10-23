const locales = {
  ja: "ja-JP",
  en: "en-US",
} as const;

export default {
  locales,
  defaultLocale: "ja" satisfies keyof typeof locales,
} as const;
