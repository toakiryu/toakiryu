const pngToIco = require("png-to-ico");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const crypto = require("crypto");

const inputFilePath = process.argv[2];
if (!inputFilePath) {
  console.error("❌ 入力画像ファイルパスを指定してください。");
  process.exit(1);
}

if (!fs.existsSync(inputFilePath)) {
  console.error(`❌ 指定されたファイルが存在しません: ${inputFilePath}`);
  process.exit(1);
}

// const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
// const ext = path.extname(inputFilePath).toLowerCase();
// if (!validExtensions.includes(ext)) {
//   console.error(`❌ 対応していないファイル形式です: ${ext}`);
//   console.error(`   対応形式: ${validExtensions.join(", ")}`);
//   process.exit(1);
// }

const baseName = path.basename(inputFilePath, path.extname(inputFilePath));
const outputDir = argv.O || `.output/${crypto.randomUUID()}`;

// 出力フォーマットとサイズ一覧
const defaultFormats = ["png", "webp", "ico", "jpg", "avif"];
const defaultSizes = [
  [16, 16],
  [32, 32],
  [64, 64],
  [128, 128],
  [256, 256],
  [512, 512],
  [1024, 1024],
  [1500, 1500],
  [2048, 2048],
];

let formats = [...defaultFormats];
let sizes = [...defaultSizes];

// フォーマット関連オプション
if (argv.F) {
  formats = argv.F.split(",").map((f) => f.trim());
}
if (argv.FI) {
  formats = [
    ...new Set([...formats, ...argv.FI.split(",").map((f) => f.trim())]),
  ];
}
if (argv.FE) {
  const exclude = argv.FE.split(",").map((f) => f.trim());
  formats = formats.filter((f) => !exclude.includes(f));
}

// サイズ関連オプション
if (argv.S) {
  sizes = argv.S.split(",").map((s) => {
    const [w, h] = s.split("x").map(Number);
    return [w, h];
  });
}

if (argv.SI) {
  const additionalSizes = argv.SI.split(",").map((s) => {
    const [w, h] = s.split("x").map(Number);
    return [w, h];
  });
  sizes = [...sizes, ...additionalSizes];
}

if (argv.SE) {
  const excludeSizes = argv.SE.split(",").map((s) => s.trim());
  sizes = sizes.filter(([w, h]) => !excludeSizes.includes(`${w}x${h}`));
}

// 出力ディレクトリ作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  for (const [width, height] of sizes) {
    for (const format of formats) {
      const outputFileName = `${baseName}.${width}x${height}.${format}`;
      const outputPath = path.join(outputDir, outputFileName);

      try {
        let image = sharp(inputFilePath).resize(width, height);

        if (format === "ico") {
          const tempPngPath = outputPath.replace(/\.ico$/, ".temp.png");
          await sharp(inputFilePath).resize(width, height).png().toFile(tempPngPath);

          const icoBuffer = await pngToIco(tempPngPath);
          await fs.promises.writeFile(outputPath, icoBuffer);
          await fs.promises.unlink(tempPngPath);
        } else {
          await image.toFormat(format).toFile(outputPath);
        }

        console.log(`✅ Generated: ${outputFileName}`);
      } catch (err) {
        console.error(`❌ Error generating ${outputFileName}:`, err);
      }
    }
  }
  console.log("\n🎉 全ファイルの出力が完了しました。");
  console.log(`📁 出力先: ${path.resolve(outputDir)}\n`);
})();
