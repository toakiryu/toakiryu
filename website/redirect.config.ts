interface RedirectConfig {
  enabled: boolean;
  status: 302 | 307;
  exclude: {
    paths: string[];
    prefixes: string[];
    filesWithExtension: boolean;
  };
}

const config: RedirectConfig = {
  // 言語プレフィックスのないURLを、ブラウザの言語に応じて転送する。
  enabled: true,
  status: 302,
  exclude: {
    // 完全一致で除外するパス。例: ['/download', '/health']
    paths: [],
    // この文字列で始まるパスを除外する。
    // 末尾が / の場合は、そのディレクトリ自体も除外する。
    prefixes: ['/__', '/_astro/', '/static/', '/.well-known/'],
    // .png、.woff2、.json など、最後のパス要素に拡張子があるURLを除外する。
    filesWithExtension: true,
  },
};

export default config;
