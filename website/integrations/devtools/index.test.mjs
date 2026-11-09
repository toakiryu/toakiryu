import assert from 'node:assert/strict';
import test from 'node:test';
import { setTimeout } from 'node:timers/promises';

import { getDevToolsRpcClient } from '@vitejs/devtools-kit/client';
import { createX18nDevframe } from '@x18n/devtools/devframe';
import { createServer } from 'vite';

import devtools from './index.mjs';

test('the Astro integration injects Vite DevTools only in development', async () => {
  const calls = [];
  const setup = devtools({ devframes: [createX18nDevframe()] }).hooks[
    'astro:config:setup'
  ];
  const hooks = {
    updateConfig: (config) => calls.push(config),
    injectScript: (...args) => calls.push(args),
  };
  await setup({ ...hooks, command: 'build' });
  assert.equal(calls.length, 0);
  await setup({ ...hooks, command: 'dev' });
  assert(
    calls[0].vite.plugins.some(
      (plugin) => plugin.name === 'vite:devtools:server',
    ),
  );
  assert(
    calls[0].vite.plugins.some((plugin) => plugin.name === 'devframe:x18n'),
  );
  assert.equal(calls[1][0], 'page');
  assert.match(calls[1][1], /bootDevTools\("\/__devtools\/"\)/);
});

test('X18n mounts and sidecar RPC survives foreign WebSocket interception', async () => {
  let config;
  await devtools({ devframes: [createX18nDevframe()] }).hooks[
    'astro:config:setup'
  ]({
    command: 'dev',
    injectScript() {},
    updateConfig(value) {
      config = value.vite;
    },
  });
  const server = await createServer({
    ...config,
    configFile: false,
    server: { port: 0, host: 'localhost' },
  });
  let intercepted = 0;
  server.httpServer.on('upgrade', (_request, socket) => {
    intercepted++;
    socket.destroy();
  });
  const previousLocation = globalThis.location;
  let rpc;
  try {
    await server.listen();
    const origin = server.resolvedUrls.local[0].replace(/\/$/, '');
    const baseURL = `${origin}/__devtools/`;
    const meta = await fetch(`${baseURL}__connection.json`).then((response) =>
      response.json(),
    );
    assert(Number.isInteger(meta.websocket.port));
    assert.notEqual(meta.websocket.port, server.httpServer.address().port);
    assert.equal((await fetch(`${baseURL}embedded.js`)).status, 200);
    assert.equal((await fetch(`${origin}/__x18n/`)).status, 200);
    globalThis.location = new URL(`${origin}/ja/`);
    rpc = await getDevToolsRpcClient({
      baseURL,
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
    await server.close();
  }
});
