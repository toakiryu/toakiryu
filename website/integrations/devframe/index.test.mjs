import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import test from 'node:test';
import { setTimeout } from 'node:timers/promises';

import { connectDevframe } from '@devframes/hub/client';

import devframe from './index.mjs';

test('the Astro integration injects devtools only in development', () => {
  const calls = [];
  const setup = devframe().hooks['astro:config:setup'];
  const hooks = {
    updateConfig: (config) => calls.push(config),
    injectScript: (...args) => calls.push(args),
  };
  setup({ ...hooks, command: 'build' });
  assert.equal(calls.length, 0);
  setup({ ...hooks, command: 'dev' });
  assert.equal(calls[0].vite.plugins[0].name, 'devframes:hub');
  assert.equal(calls[1][0], 'page');
  assert.match(calls[1][1], /bootDevframe\("\/__devframes\/"\)/);
});

test('sidecar RPC survives an app server that destroys foreign WebSocket upgrades', async () => {
  let middleware;
  let intercepted = 0;
  const server = createServer((request, response) => {
    middleware(request, response, () => {
      response.writeHead(404).end();
    });
  });
  // Reproduce Cloudflare's ownership conflict without requiring a Worker.
  server.on('upgrade', (_request, socket) => {
    intercepted++;
    socket.destroy();
  });
  server.listen(0, 'localhost');
  await once(server, 'listening');
  const origin = `http://localhost:${server.address().port}`;
  let plugin;
  devframe({ port: 0, ui: { authBanner() {} } }).hooks['astro:config:setup']({
    command: 'dev',
    injectScript() {},
    updateConfig(config) {
      [plugin] = config.vite.plugins;
    },
  });
  plugin.configResolved({ root: process.cwd(), command: 'serve' });
  const previousLocation = globalThis.location;
  let rpc;
  try {
    await plugin.configureServer({
      httpServer: server,
      resolvedUrls: { local: [`${origin}/`] },
      middlewares: {
        use(handler) {
          middleware = handler;
        },
      },
    });
    const meta = await fetch(`${origin}/__devframes/__connection.json`).then(
      (response) => response.json(),
    );
    assert(Number.isInteger(meta.websocket.port));
    assert.notEqual(meta.websocket.port, server.address().port);
    // The browser client needs location to resolve its advertised WS endpoint.
    globalThis.location = new URL(`${origin}/ja/`);
    rpc = await connectDevframe({
      baseURL: `${origin}/__devframes/`,
      simpleAuth: false,
      authToken: '',
      callTimeout: 2000,
    });
    await rpc.requestAuthCode();
    await setTimeout(300);
    await rpc.requestAuthCode({ reissue: true });
    assert.equal(rpc.status, 'unauthorized');
    assert.equal(intercepted, 0);
  } finally {
    rpc?.close();
    globalThis.location = previousLocation;
    await plugin.closeBundle();
    await new Promise((resolve) => server.close(resolve));
  }
});
