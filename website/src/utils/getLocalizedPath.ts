import siteConfig from "@/richtpl.config";

// 言語要素を削除する関数
export function getPathWithOutLocaliz(path: string): string {
  const { locales } = siteConfig.i18n;

  // 言語リストを正規表現で作成（例: /(?:en|ja)/）
  const localeRegex = new RegExp(`^/(?:${locales.join("|")})`);

  // 現在のパスから言語プレフィックスを削除
  const cleanPath = path.replace(localeRegex, "") || "/";

  return cleanPath;
}

export function getLocalizedPath(path: string, locale: string): string {
  const { locales, defaultLocale, localePrefix } = siteConfig.i18n;

  // 言語リストを正規表現で作成（例: /(?:en|ja)/）
  const localeRegex = new RegExp(`^/(?:${locales.join("|")})`);
  const isDefaultLocale = locale === defaultLocale;

  // 現在のパスから言語プレフィックスを削除
  const cleanPath = path.replace(localeRegex, "") || "/";

  // localePrefix によって挙動を変更
  if (localePrefix === "as-needed") {
    // "as-needed" の場合、デフォルト言語ならプレフィックスをつけない
    return isDefaultLocale ? cleanPath : `/${locale}${cleanPath}`;
  }

  // localePrefix が "always" またはそれ以外の場合は、全ての言語にプレフィックスをつける
  return `/${locale}${cleanPath}`;
}
