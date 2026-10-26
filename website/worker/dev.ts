import { handle } from '@astrojs/cloudflare/handler';

import worker from './index';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Production serves existing static assets before invoking the Worker.
    // In development, Astro renders those assets on demand instead.
    if (new URL(request.url).pathname !== '/') {
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
