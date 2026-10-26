import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'oxc', 'import'],
  jsPlugins: [
    {
      name: 'paraglide',
      specifier: '@inlang/paraglide-js/eslint',
    },
  ],

  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },

  rules: {
    // 重複インポートはOxlintで検出し、並べ替えはOxfmtが担当。
    'import/no-duplicates': 'error',
    // CSSは副作用による読み込みが必要。
    'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],
    'paraglide/no-dynamic-message-access': [
      'error',
      { messageModuleDirectories: ['paraglide'] },
    ],
  },

  ignorePatterns: [
    'dist/**',
    '.astro/**',
    '.wrangler/**',
    'node_modules/**',
    'src/paraglide/**',
    'worker-configuration.d.ts',
  ],
});
