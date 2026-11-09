import { getLocale } from '@/paraglide/runtime.js';

const AddLocaleToPath = (path: string, slug?: string): string => {
  const lang = getLocale();
  return `/${lang}${path}/${slug ?? ''}`.replace(/\/+$/, '');
};

export { AddLocaleToPath as i18nl };
