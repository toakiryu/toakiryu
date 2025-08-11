# Commands

## `npm run generate-brand-assets`

元となる画像からブランドアセットを生成します。

### 引数一覧

1. `ファイルパス`（必須）: 変換対象の画像ファイル（例: `./logo.png`）

#### オプション引数

- `-F <形式,...>`: 出力フォーマットを指定して上書き（例: `-F png,webp`）
- `-FI <形式,...>`: 出力フォーマットに追加（例: `-FI ico,avif`）
- `-FE <形式,...>`: 出力フォーマットから除外（例: `-FE jpg`）
- `-S <サイズ,...>`: 出力サイズを指定して上書き（例: `-S 64x64,128x128`）
- `-SI <サイズ,...>`: 出力サイズに追加（例: `-SI 1024x1024`）
- `-SE <サイズ,...>`: 出力サイズから除外（例: `-SE 16x16`）
- `-O <ディレクトリ>`: 出力先ディレクトリを指定（例: `-O ./dist/assets`）

サイズは `WIDTHxHEIGHT` 形式で指定してください。

### 例

```sh
# 基本使用例
npm run generate-brand-assets ./logo.png

# 出力フォーマットを webp のみに指定
npm run generate-brand-assets ./logo.png -- -F webp

# png を追加し、ico を除外
npm run generate-brand-assets ./logo.png -- -FI png -FE ico

# サイズを 64x64 と 128x128 に限定
npm run generate-brand-assets ./logo.png -- -S 64x64,128x128

# サイズを追加（1024x1024）、出力先を ./dist に指定
npm run generate-brand-assets ./logo.png -- -SI 1024x1024 -O ./dist

# 推奨
npm run generate-brand-assets ./logo.png -- -F png,webp,ico
```
