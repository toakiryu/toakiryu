import { fileURLToPath } from 'node:url';

import { DEVFRAMES_HUB_BASE, normalizeHubBase } from '@devframes/hub/constants';
import { viteDevframeHub } from '@devframes/vite/hub';

/**
 * Mount Devframe and its overlay only in Astro's development server.
 * @param {import('@devframes/vite/hub').ViteDevframeHubOptions} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function devframe(options = {}) {
  const base = normalizeHubBase(options.base ?? DEVFRAMES_HUB_BASE);
  const client = fileURLToPath(
    new URL('./client.mjs', import.meta.url),
  ).replaceAll('\\', '/');

  return {
    name: 'toakiryu:devframe',
    hooks: {
      'astro:config:setup'({ command, injectScript, updateConfig }) {
        if (command !== 'dev') return;

        updateConfig({
          vite: { plugins: [viteDevframeHub({ ...options, base })] },
        });
        injectScript(
          'page',
          `import { bootDevframe } from ${JSON.stringify(client)};\nbootDevframe(${JSON.stringify(base)});`,
        );
      },
    },
  };
}
