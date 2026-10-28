// @ts-check
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { createX18nDevframe } from '@x18n/devtools/devframe';
import icon from 'astro-icon';
import metaTags from 'astro-meta-tags';
import { defineConfig } from 'astro/config';

import { i18n } from '@/data/i18n';

import devframe from './integrations/devframe/index.mjs';

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
    devframe({
      // Cloudflare forwards app-server WebSocket upgrades to workerd.
      // Give Devframe a separate, OS-assigned port to avoid that interception.
      port: 0,
      devframes: [createX18nDevframe()],
    }),
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
