import { i18n } from '../src/data/i18n';

interface Env {
  ASSETS: Pick<Fetcher, 'fetch'>;
}

const locales = new Set<string>(i18n.locales);

function resolveLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) {
    return i18n.defaultLocale;
  }

  const preferences = acceptLanguage
    .split(',')
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(';');

      const quality = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith('q='));

      return {
        tag: tag.toLowerCase(),
        q: quality ? Number(quality.slice(2)) : 1,
      };
    })
    .filter(({ q }) => Number.isFinite(q) && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    if (tag === '*') {
      return i18n.defaultLocale;
    }

    const language = tag.split('-')[0];

    if (locales.has(language)) {
      return language;
    }
  }

  return i18n.defaultLocale;
}

function getPathLocale(pathname: string): string | null {
  const segment = pathname.split('/')[1];

  return locales.has(segment) ? segment : null;
}

function isAssetPath(pathname: string): boolean {
  return pathname.startsWith('/_astro/') || /\/[^/]+\.[^/]+$/.test(pathname);
}

export default {
  async fetch(request: Request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const locale = getPathLocale(pathname);

    // 対応言語のプレフィックスがある場合
    if (locale) {
      // 存在しない静的ページに対して、
      // 対応言語の 404 ページを返す
      const notFoundUrl = new URL(`/${locale}/404/`, url);

      const response = await env.ASSETS.fetch(
        new Request(notFoundUrl, request),
      );

      if (!response.ok) {
        return new Response('Not Found', { status: 404 });
      }

      return new Response(response.body, {
        status: 404,
        headers: response.headers,
      });
    }

    // 静的アセットには言語を付与しない
    if (isAssetPath(pathname)) {
      return env.ASSETS.fetch(request);
    }

    // GET / HEAD 以外はリダイレクトしない
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }

    const preferredLocale = resolveLocale(
      request.headers.get('Accept-Language'),
    );

    url.pathname = `/${preferredLocale}${pathname}`;

    const headers = new Headers({
      Location: url.toString(),
      Vary: 'Accept-Language',
      'Cache-Control': 'private, no-store',
    });

    return new Response(null, {
      status: 302,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
