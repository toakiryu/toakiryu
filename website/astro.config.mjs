// @ts-check
import { defineConfig } from 'astro/config';

import node from "@astrojs/node";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import cloudflare from '@astrojs/cloudflare';
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: "static",
  srcDir: './src',
  site: "https://ktoa.me",
  i18n: {
    locales: [
      "ja", "en"
    ],
    defaultLocale: "ja",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          en: 'en-US',
          ja: 'ja-JP'
        }
      }
    }),
    partytown()
  ],
  adapter: cloudflare(),
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        emitTsDeclarations: true,
        strategy: ["url", "globalVariable", "baseLocale"]
      }),
      tailwindcss()
    ],
    build: {
      minify: false,
    },
  }
});
