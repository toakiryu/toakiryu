# Toakiryu website

Astroで静的ページを生成し、Cloudflare WorkersのStatic Assetsで配信するWebサイトです。日本語（`/ja/`）と英語（`/en/`）に対応し、翻訳にはParaglideを使用しています。

![screenshot v202610251](/website/public/static/uploads/202610251.png)

## セットアップ

Node.js 22.23.4以上とpnpmが必要です。以下のコマンドは、この`website`ディレクトリで実行します。

```sh
pnpm install
pnpm dev
```

`pnpm dev`でAstroとWorkerをまとめて起動します。事前ビルドは不要です。通常は`http://localhost:4321/`を開くと、ブラウザの言語に応じて`/ja/`または`/en/`へ移動します。`pnpm dev:bg`でバックグラウンド起動し、`pnpm dev:stop`で停止、`pnpm dev:status`で状態、`pnpm dev:logs`でログを確認できます。

AstroとViteがページやスタイルの変更を反映し、翻訳コードはParaglideのViteプラグインが生成します。`public`は直接配信されるため、変更後にブラウザを再読み込みすれば確認できます。変更のたびにサイト全体のビルドやWorker型の生成は行いません。

開発中はDevframe HubからX18nの翻訳用DevToolsを利用できます。ページ内のDevToolsボタンを押し、「未認証」から認証画面を開くと、開発サーバーへ6桁のコードを要求します。コードは起動したターミナルで確認できます。`pnpm dev:bg`で起動した場合は`pnpm dev:logs`を使ってください。Hubを別ページで開く場合のURLは`http://localhost:4321/__devframes/`です。Astroプラグインは開発時だけHubの表示スクリプトを読み込みます。本番ビルドにはDevToolsを含めません。

Devframeは`integrations/devframe/`のAstroプラグインで設定し、開発時だけHubと公式オーバーレイを読み込みます。CloudflareのViteプラグインが同じポートのWebSocket接続を切断する[既知の問題](https://github.com/cloudflare/workers-sdk/issues/15654)を避けるため、`astro.config.mjs`で[公式の`port`設定](https://devfra.me/frameworks/vite)を`0`にしています。通信にはOSが割り当てた別ポートを使い、その接続先はHubから自動で通知されます。認証画面のコード発行・再発行は公式UIの処理を使います。

開発時は`astro.dev.config.mjs`で公式Cloudflareアダプターを有効にし、Workerを`workerd`で実行します。`worker/dev.ts`は、静的ファイルに相当するリクエストをAstroでその都度レンダリングし、見つからない場合は本番と同じ`worker/index.ts`へ渡します。言語リダイレクト、言語別404、Workerの変更反映も開発サーバーで確認できます。ページはHMR、WorkerはViteのモジュール再読み込みで更新し、全体ビルドの監視プロセスは使いません。

本番ビルドは従来どおり`astro.config.mjs`と`wrangler.toml`を使用した静的配信です。生成されたサイトマップや本番成果物の配信動作は`pnpm preview`で確認してください。プレビューは通常`http://localhost:8787`で配信され、Ctrl+Cで停止します。ページや静的ファイルの変更をプレビューへ反映するには、別のターミナルで`pnpm build`を実行するか、プレビューを再起動してください。

## コードの検査と整形

`pnpm check`でOxlintとOxfmtの検査を実行します。`pnpm lint`は翻訳メッセージの参照ルールも含み、`pnpm lint:i18n`は同じ処理を呼ぶ互換用エイリアスです。`pnpm format:check`で整形だけを検査できます。

`pnpm format`でコードとインポート順を整え、`pnpm lint:fix`でlintの自動修正を実行します。`pnpm lint:fix:all`は提案レベルの修正も適用するため、実行後に差分を確認してください。ビルド成果物と自動生成コードは検査・整形の対象外です。

Oxfmtの設定は`.oxfmtrc.json`で管理します。Astroの整形を有効にし、行幅80・シングルクォートと既存の生成物除外を引き継いでいます。VS Codeでは推奨拡張の「Oxc」をインストールすると、保存時にもOxfmtで整形できます。

## 構成と配信

| パス                           | 役割                                         |
| ------------------------------ | -------------------------------------------- |
| `src/pages/[lang]/`            | 言語別の静的ページ                           |
| `src/layouts/`                 | 共通のHTMLレイアウト                         |
| `i18n.config.ts`               | 対応言語・既定言語の正本                     |
| `redirect.config.ts`           | 言語リダイレクトと除外ルール                 |
| `scripts/sync-i18n.mjs`        | inlangの言語設定の同期スクリプト             |
| `src/data/i18n.ts`             | 共通設定をAstro・Worker向けに公開            |
| `src/i18n/routing.ts`          | 言語別ページ生成の共通処理                   |
| `src/middleware.ts`            | ページ生成時の翻訳言語を設定                 |
| `messages/`                    | 言語別の翻訳メッセージ                       |
| `project.inlang/settings.json` | 翻訳プロジェクト設定（言語設定のみ自動同期） |
| `src/paraglide/`               | 自動生成される翻訳コード                     |
| `public/`                      | ビルド時にそのままコピーされる静的ファイル   |
| `worker/index.ts`              | 言語リダイレクトと404応答                    |
| `worker/dev.ts`                | 開発時のAstroと本番Workerの接続              |
| `astro.dev.config.mjs`         | 開発時のみCloudflareアダプターを有効化       |
| `wrangler.dev.toml`            | 開発用Workerの設定                           |
| `wrangler.toml`                | Worker・静的配信・ドメインの設定             |
| `dist/`                        | ビルド成果物                                 |

静的ファイルを優先して配信し、ルート`/`はWorkerで処理します。Workerは`Accept-Language`に応じて言語別URLへリダイレクトし、対応言語の存在しないページにはその言語の404ページを返します。

リダイレクトと静的ファイルの除外は`redirect.config.ts`で設定します。開発・本番のWorkerとi18nミドルウェアが同じ除外ルールを使います。

| 設定                         | 内容                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| `enabled`                    | `false`で言語プレフィックスへの自動転送を停止                 |
| `status`                     | 転送ステータス。`302`または`307`                              |
| `exclude.paths`              | 完全一致で除外。例: `['/download', '/health']`                |
| `exclude.prefixes`           | 先頭一致で除外。例: `['/static/', '/media/']`                 |
| `exclude.filesWithExtension` | `true`なら画像・フォント・JSONなど拡張子付きURLをまとめて除外 |

既定では`/__*`、`/_astro/`、`/static/`、`/.well-known/`と拡張子付きURLを除外します。`/media/`のように末尾が`/`のルールは、`/media`自体とその配下を除外します。`/mediator`など別のパスには一致しません。除外パスは言語別URLへの転送や言語別404への置き換えを行わず、元のURLで配信します。

静的ファイルのURLには`public`を含めません。たとえば`public/static/noise.png`は`/static/noise.png`です。除外設定は存在しないファイルを作ったり、`/ja/static/noise.png`を`/static/noise.png`へ読み替えたりはしません。`/static/noice.png`のように実ファイル名と異なる場合は404になります。設定変更後は開発サーバーを再起動してください。

言語設定は`i18n.config.ts`を編集してください。`locales`はURLの言語コードとサイトマップ用の言語タグの対応表、`defaultLocale`は既定言語です。開発・ビルド・inlangの各スクリプトは実行前に、既存の`project.inlang/settings.json`の`locales`と`baseLocale`だけを同期します。`modules`や`plugin.inlang.messageFormat`などは`settings.json`で直接管理し、そのほかの設定も同期時に保持されます。同期結果はコミットしてください。内容に変更がない場合はファイルを書き換えません。設定変更後は`pnpm dev:stop`、`pnpm dev`で開発サーバーを再起動してください。言語を追加する場合は`messages/`に翻訳ファイルも追加します。

`pnpm deploy`は既定のWorkerを`ktoa.me/*`へデプロイします。事前にCloudflareの認証と対象ゾーンへの権限が必要です。`wrangler.toml`には、別名のWorkerを使用する`staging`（`staging.ktoa.me/*`）と`production`（`ktoa.me/*`）も定義されています。環境を指定する場合は、ビルド後に`pnpm exec wrangler deploy --env staging`または`--env production`を実行します。

Astroの仕様は[公式ドキュメント](https://docs.astro.build)を参照してください。
