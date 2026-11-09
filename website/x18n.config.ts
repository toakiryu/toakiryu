import { defineConfig } from '@x18n/core';

import { i18n } from './src/data/i18n';

// Migrated from i18n-ally by `x18n migrate i18n-ally`.
export default defineConfig({
  sourceLocale: i18n.defaultLocale,
  presets: [],
  resources: [
    {
      pattern: 'messages/{locale}.{ext}',
    },
    {
      pattern: 'messages/{locale}/**/*.{ext}',
    },
  ],
  keyStyle: 'flat',
  plugins: ['./.x18n/custom.x18n-plugin.yml'],
  ignoreKeys: ['$schema'],
});
