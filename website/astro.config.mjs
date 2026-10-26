// @ts-check
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import metaTags from 'astro-meta-tags';
import { defineConfig } from 'astro/config';

import { i18n } from '@/data/i18n';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
    // CSSをインライン化するしきい値
    inlineStylesheets: 'auto', // 'always' または 'never'
  },
  srcDir: './src',
  site: 'https://ktoa.me',
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: i18n.defaultLocale,
        locales: i18n.localesMap,
      },
    }),
    partytown(),
    react(),
    icon(),
    metaTags(),
  ],
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        emitTsDeclarations: true,
        strategy: ['url', 'globalVariable', 'baseLocale'],
      }),
      tailwindcss(),
    ],
    build: {
      minify: false,
    },
  },
});
