// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from '@tailwindcss/vite';
import { i18n } from '@/data/i18n';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  build: {
    format: "directory",
  },
  srcDir: './src',
  site: "https://ktoa.me",
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: i18n.defaultLocale,
      locales: i18n.localesMap,
    }
  }), partytown(), react()],
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