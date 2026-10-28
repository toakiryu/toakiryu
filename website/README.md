# Toakiryu website

Astroで静的ページを生成し、Cloudflare Workersで配信するWebサイトです。日本語（`/ja/`）と英語（`/en/`）に対応し、翻訳にはParaglideを使用しています。

![screenshot v202610251](/website/public/static/uploads/202610251.png)

## 開発

Node.js 22.23.4以上とpnpmが必要です。`website`ディレクトリで実行してください。

```sh
pnpm install
pnpm dev
```

開発URLは通常`http://localhost:4321/`です。コマンド一覧と説明は[package.json](./package.json)の`scripts`を参照してください。

開発中はページ内のDevframeからX18nの翻訳用DevToolsを利用できます。認証にはサーバーログに表示される6桁のコードを使います。DevToolsは`integrations/devframe/`で管理し、本番には含めません。

## 主な設定

| ファイル                                     | 用途                                     |
| -------------------------------------------- | ---------------------------------------- |
| `i18n.config.ts`                             | 対応言語・既定言語                       |
| `redirect.config.ts`                         | 言語リダイレクト・静的ファイルなどの除外 |
| `messages/`                                  | 言語別の翻訳メッセージ                   |
| `x18n.config.ts`                             | X18nのリソース・キー参照の検出           |
| `astro.config.mjs`                           | Astro・Vite・Devframe                    |
| `astro.dev.config.mjs` / `wrangler.dev.toml` | 開発用Worker                             |
| `wrangler.toml`                              | 本番Worker・静的配信・ドメイン           |
| `oxlint.config.ts` / `.oxfmtrc.json`         | コードの検査・整形                       |

言語設定は開発・ビルド前にinlangへ同期されます。言語を追加する場合は`messages/`にも翻訳ファイルを追加し、設定変更後は開発サーバーを再起動してください。`src/paraglide/`は自動生成されます。

静的ファイルは`public/`に配置します。URLに`public`や言語プレフィックスは付けません。リダイレクトの除外条件は`redirect.config.ts`のコメントを参照してください。

## 配信

開発時はAstroとWorkerを`workerd`上で動かし、変更をその都度反映します。本番は`dist/`の静的ファイルを優先して配信し、Workerが言語リダイレクトと言語別404を処理します。

デプロイ先は`wrangler.toml`で管理します。既定・`production`は`ktoa.me`、`staging`は`staging.ktoa.me`です。デプロイにはCloudflareの認証と対象ゾーンへの権限が必要です。
