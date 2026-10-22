
import { defineMiddleware } from "astro:middleware";

import {
  assertIsLocale,
  baseLocale,
  setLocale,
} from "./paraglide/runtime.js";

export const onRequest = defineMiddleware(
  (context, next) => {
    setLocale(
      assertIsLocale(context.currentLocale ?? baseLocale),
    );

    return next();
  },
);


// const locales = ["ja", "en"] as const;
// const defaultLocale = "ja";

// export const onRequest = defineMiddleware(
//   (context, next) => {
//     const { pathname, search } = context.url;
//     const segments = pathname.split("/").filter(Boolean);

//     const lang = segments[0];

//     if (!lang) {
//       return context.redirect(`/${defaultLocale}/${search}`, 302);
//     }

//     if (locales.some((locale) => locale === lang)) {
//       return next();
//     }

//     // /fr/about -> /ja/about
//     // /about -> /ja/about
//     const isLocale = /^[a-z]{2}(?:-[a-z]{2})?$/i.test(lang);

//     const path = isLocale
//       ? segments.slice(1).join("/")
//       : segments.join("/");

//     return context.redirect(
//       `/${defaultLocale}/${path}${search}`,
//       302,
//     );
//   },
// );
