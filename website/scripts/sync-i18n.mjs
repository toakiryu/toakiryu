import { readFile, writeFile } from "node:fs/promises";

const settingsPath = "project.inlang/settings.json";
// 実行ディレクトリに依存せず、常にこのプロジェクトの設定を更新する。
const destination = new URL("../project.inlang/settings.json", import.meta.url);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateConfig(config) {
  if (!isObject(config) || !isObject(config.locales)) {
    throw new Error("i18n.config.ts: locales must be an object mapping locale codes to language tags.");
  }

  const locales = Object.keys(config.locales);
  if (locales.length === 0) {
    throw new Error("i18n.config.ts: locales must contain at least one locale.");
  }
  for (const [locale, languageTag] of Object.entries(config.locales)) {
    if (!locale.trim() || typeof languageTag !== "string" || !languageTag.trim()) {
      throw new Error(`i18n.config.ts: locale ${JSON.stringify(locale)} must have a non-empty code and string language tag.`);
    }
  }
  if (!locales.includes(config.defaultLocale)) {
    throw new Error(`i18n.config.ts: defaultLocale ${JSON.stringify(config.defaultLocale)} must be included in locales.`);
  }
  return locales;
}

async function main() {
  // 動的importにより、設定ファイルの読み込み・構文エラーも統一して報告する。
  let config;
  try {
    ({ default: config } = await import("../i18n.config.ts"));
  } catch (cause) {
    throw new Error("Could not load i18n.config.ts.", { cause });
  }
  const locales = validateConfig(config);

  let previous;
  try {
    previous = await readFile(destination, "utf8");
  } catch (cause) {
    // modules等を保持するため、ファイルがない場合も新規作成しない。
    throw new Error(`Could not read ${settingsPath}. Restore the existing settings file and check its permissions.`, { cause });
  }

  let existing;
  try {
    existing = JSON.parse(previous);
  } catch (cause) {
    throw new Error(`${settingsPath} contains invalid JSON. Fix it before syncing.`, { cause });
  }
  if (!isObject(existing)) {
    throw new Error(`${settingsPath} must contain a JSON object.`);
  }

  // 言語設定が同じなら、整形や改行の違いだけでは書き換えない。
  if (existing.baseLocale === config.defaultLocale &&
    Array.isArray(existing.locales) &&
    existing.locales.length === locales.length &&
    existing.locales.every((locale, index) => locale === locales[index])) {
    return;
  }

  // modulesやプラグイン設定などを保持し、管理対象の2項目だけ上書きする。
  const settings = JSON.stringify({
    ...existing,
    baseLocale: config.defaultLocale,
    locales,
  }, null, 2) + "\n";

  try {
    await writeFile(destination, settings, "utf8");
  } catch (cause) {
    throw new Error(`Could not write ${settingsPath}. Check its permissions and available disk space.`, { cause });
  }
  console.log(`Synced baseLocale and locales in ${settingsPath}`);
}

try {
  await main();
} catch (error) {
  // 元のエラーも残しつつ、CLIでは対象ファイルと原因を簡潔に表示する。
  for (let current = error; current; current = current.cause) {
    console.error(`[sync:i18n] ${current.message ?? String(current)}`);
  }
  // 後続のAstro・inlangを起動しないよう、失敗を終了コードで伝える。
  process.exitCode = 1;
}
