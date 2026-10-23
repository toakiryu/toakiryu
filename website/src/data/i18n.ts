const rc = {
  locales: {
    en: 'en-US',
    ja: 'ja-JP'
  },
  defaultLocale: "ja",
} as const;

// キーの配列を取得
export const localesKeys = Object.keys(rc.locales);

// 型も含めて完全に抽出
export type LocaleKey = keyof typeof rc.locales;

export const i18n = {
  raw: rc,
  locales: localesKeys as LocaleKey[],
  localesMap: rc.locales,
  defaultLocale: rc.defaultLocale as LocaleKey,
}
