import assert from 'node:assert/strict';
import test from 'node:test';

import config from '../../redirect.config.ts';
import { isRedirectExcluded } from './paths.ts';

test('static directories, internal endpoints, and file URLs are excluded', () => {
  for (const path of [
    '/static',
    '/static/noise.png',
    '/static/download',
    '/_astro/app.js',
    '/__devframes/__ws',
    '/.well-known/security',
    '/favicon.svg',
    '/ja/image.png',
    '/en/font.woff2',
    '/feed.xml/',
  ]) {
    assert.equal(isRedirectExcluded(path), true, path);
  }
});

test('page URLs and similarly named directories still receive locale handling', () => {
  for (const path of [
    '/',
    '/projects',
    '/ja/missing',
    '/staticity',
    '/v1.0/page',
  ]) {
    assert.equal(isRedirectExcluded(path), false, path);
  }
});

test('exact path exclusions and file detection can be configured independently', () => {
  const original = config.exclude;
  try {
    config.exclude = {
      paths: ['/download'],
      prefixes: ['/media/'],
      filesWithExtension: false,
    };
    assert.equal(isRedirectExcluded('/download'), true);
    assert.equal(isRedirectExcluded('/downloads'), false);
    assert.equal(isRedirectExcluded('/download/child'), false);
    assert.equal(isRedirectExcluded('/media'), true);
    assert.equal(isRedirectExcluded('/media/file'), true);
    assert.equal(isRedirectExcluded('/mediator'), false);
    assert.equal(isRedirectExcluded('/image.png'), false);
  } finally {
    config.exclude = original;
  }
});
