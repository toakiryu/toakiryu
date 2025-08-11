import { readdir, rm } from "fs/promises";
import { join } from "path";

await cleanMacJunkFiles(".");

// 再帰的に対象ディレクトリから邪魔ファイルを削除する
async function cleanMacJunkFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      // 条件にマッチするファイルを削除
      if (
        entry.isFile() &&
        (entry.name === ".DS_Store" ||
          entry.name === ".AppleDouble" ||
          entry.name === ".Spotlight-V100" ||
          entry.name === ".Trashes" ||
          entry.name === "Icon\r" || // アイコン設定用の変なファイル
          entry.name.startsWith("._")) // AppleDoubleファイル
      ) {
        await rm(fullPath, { force: true });
        console.log(`🧹 Deleted Mac junk file: ${fullPath}`);
      }

      // ディレクトリなら再帰的に処理
      else if (entry.isDirectory()) {
        await cleanMacJunkFiles(fullPath);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
