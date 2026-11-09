import { handle } from '@astrojs/cloudflare/handler';

import { isRedirectExcluded } from '../src/i18n/paths';
import worker from './index';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const pathname = new URL(request.url).pathname;

    // Preserve excluded endpoint responses, including 404s, without falling
    // through to the site's locale redirect or localized error page.
    if (isRedirectExcluded(pathname)) {
      return handle(request, env, ctx);
    }

    // Production serves existing static assets before invoking the Worker.
    // In development, Astro renders those assets on demand instead.
    if (pathname !== '/') {
      const response = await handle(request.clone() as Request, env, ctx);
      if (response.status !== 404) return response;
      await response.body?.cancel();
    }

    return worker.fetch(request, {
      ASSETS: {
        fetch: (assetRequest) => handle(new Request(assetRequest), env, ctx),
      },
    });
  },
} satisfies ExportedHandler<Env>;
