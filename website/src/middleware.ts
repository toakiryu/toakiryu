import { defineMiddleware } from 'astro:middleware';

import { isRedirectExcluded } from './i18n/paths';
import { assertIsLocale, baseLocale, setLocale } from './paraglide/runtime.js';

export const onRequest = defineMiddleware((context, next) => {
  if (isRedirectExcluded(context.url.pathname)) return next();

  setLocale(assertIsLocale(context.currentLocale ?? baseLocale));

  return next();
});
