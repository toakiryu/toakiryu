## シークレットスキャナ（プリコミットフック）導入ドキュメント

このリポジトリには軽量な Node ベースのシークレットスキャナを導入しています。
目的はコミット／プッシュ前に誤って API キーやシークレットを含めないように検出してブロックすることです。

### 追加されたファイル

- `scripts/check-secrets.js` — ステージされたファイル（デフォルト）または `--all` でリポジトリ全体をスキャンします。共通のキー形式（AWS, Google API key, Slack token, JWT, private key ブロック, 一般的な `api_key` / `secret` 代入）を検出します。誤検知低減のため、コード式（`authz.slice(7)` など）や `process.env` 参照、典型的なプレースホルダは無視します。
- `.husky/pre-commit` — プリコミットで `pnpm run scan-staged-secrets` を実行するフック。
- `package.json` に以下のスクリプトを追加しました:
  - `prepare` — Husky をインストールするためのスクリプト
  - `scan-staged-secrets` — ステージされたファイルをチェック
  - `scan-all-secrets` — リポジトリ全体をチェック

### 導入手順（開発者向け）

PowerShell（Windows）での手順:

```powershell
pnpm install
pnpm run prepare   # husky のフックをインストール
# スキャン（全体）
node .\scripts\check-secrets.js --all
# ステージされたファイルのみチェック（プリコミットと同じ動作）
node .\scripts\check-secrets.js
```

コミット時は自動でプリコミットが走り、問題が見つかるとコミットは中止されます。

### フローと期待動作

- 開発者が `git commit` を行うとプリコミットフックが `scripts/check-secrets.js` を実行します。
- スキャナは検出時に標準エラーへ詳細を出力し、終了コード `1` で停止します（コミット中止）。
- 誤検知（例: `token = authz.slice(7)`）はヒューリスティックで除外されるようになっています。

### よくある検出パターンと対応

- テストファイルにベタ書きされた長いトークン（例: `api_key: "Z7rzVUG..."`）
  - これが本物のキーの場合: 即座にそのキーをローテーション（無効化 + 再発行）してください。
  - テスト用ダミーであれば値を削除または環境変数 `process.env.TEST_CF_API_TOKEN` に差し替えてください。
- `token = authz.slice(7)` のようなコード式
  - これは正常な処理です。スキャナはコード式を誤検知しないよう改良済みです。

### 誤検知を減らす / ルール調整

- 無視するパスは `scripts/check-secrets.js` 内の `ignoreNames` に追加できます（例: `__test__`, `apps/**/__test__` など）。
- 検出ルールは同ファイル中の `rules` 配列で定義されています。プロジェクト特有のパターンを追加・削除して調整してください。

例: `ignoreNames` に `__test__` を追加する方法（編集例）:

```js
const ignoreNames = ["node_modules/", "dist/", ".next/", ".git/", "__test__"];
```

### CI への組み込み（例: GitHub Actions）

下記は簡単なワークフローの例 (`.github/workflows/secret-scan.yml`)：

```yaml
name: Secret scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"
      - name: Install
        run: pnpm install
      - name: Run secret scanner
        run: node ./scripts/check-secrets.js --all
```

検出があればジョブは失敗します。CI 側でも鍵の混在を防げます。

### もし既に公開してしまったら（緊急対応）

1. 該当キーを即座にローテーション（無効化して新しいキーを発行）。
2. 履歴から完全に除去したい場合は `git filter-repo` か `BFG` を使用して履歴を洗浄します（慎重に実行してください）。
   - 洗浄後は `git push --force` が必要で、コラボレーターへ通知する必要があります。

簡単な対応テンプレート（例）:

```text
1) 直ちに該当サービスでキーを無効化/ローテーション
2) リポジトリをバックアップ
3) git filter-repo を使って該当文字列を削除
4) force push（チームに通知）
```

### FAQ

- Q: `token = authz.slice(7)` はシークレットですか？

  - A: いいえ。Authorization ヘッダから Bearer を取り除いている通常の処理であり、スキャナはコード式と判断して誤検知しないよう調整済みです。

- Q: 誤検知が出たらどうする？
  - A: `scripts/check-secrets.js` の `ignoreNames` と `rules` を調整してください。

### 補足（ベストプラクティス）

- シークレットはコードベースに絶対書かない（環境変数/シークレットマネージャ使用）。
- 開発用のキーも公開リポジトリには置かない。テスト用ダミーは明示的なダミー文字列にする（`DUMMY_*` など）。
- CI にも同ルールを入れてサーバー側での流出を防ぐ。
