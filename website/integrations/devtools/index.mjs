import { fileURLToPath } from 'node:url';

import { DevTools } from '@vitejs/devtools';
import { DEVTOOLS_MOUNT_PATH } from '@vitejs/devtools-kit/constants';
import { createPluginFromDevframe } from '@vitejs/devtools-kit/node';

/**
 * Mount Vite DevTools only in Astro's development server.
 * @param {{ devframes?: Parameters<typeof createPluginFromDevframe>[0][] }} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function devtools(options = {}) {
  const base = DEVTOOLS_MOUNT_PATH;
  const client = fileURLToPath(
    new URL('./client.mjs', import.meta.url),
  ).replaceAll('\\', '/');

  return {
    name: 'toakiryu:vite-devtools',
    hooks: {
      async 'astro:config:setup'({ command, injectScript, updateConfig }) {
        if (command !== 'dev') return;

        const plugins = await DevTools();
        const serverPlugin = plugins.find(
          (plugin) => plugin.name === 'vite:devtools:server',
        );
        if (
          !serverPlugin ||
          typeof serverPlugin.configureServer !== 'function'
        ) {
          throw new Error('Vite DevTools server hook is unavailable');
        }
        const configureServer = serverPlugin.configureServer;
        serverPlugin.configureServer = function (server) {
          // Cloudflare owns app-server WebSocket upgrades. Let DevTools allocate
          // its sidecar transport without changing the real Vite server.
          const sidecarServer = new Proxy(server, {
            get(target, key, receiver) {
              return key === 'httpServer'
                ? null
                : Reflect.get(target, key, receiver);
            },
          });
          return configureServer.call(this, sidecarServer);
        };
        updateConfig({
          vite: {
            plugins: [
              ...plugins,
              ...(options.devframes ?? []).map((frame) =>
                createPluginFromDevframe(frame),
              ),
            ],
          },
        });
        injectScript(
          'page',
          `import { bootDevTools } from ${JSON.stringify(client)};\nbootDevTools(${JSON.stringify(base)});`,
        );
      },
    },
  };
}
