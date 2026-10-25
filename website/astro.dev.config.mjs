// Keep production builds static; use workerd only for the development server.
import { mergeConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import config from './astro.config.mjs';

export default mergeConfig(config, {
  adapter: cloudflare({
    configPath: './wrangler.dev.toml',
    imageService: 'passthrough',
    remoteBindings: false,
  }),
  session: false,
  vite: {
    optimizeDeps: {
      // Avoid restarting the workerd module graph midway through the first render.
      include: [
        '@phosphor-icons/react',
        'astro-icon/components',
        'class-variance-authority',
        'cn',
        'react-aria-components',
        'uqr',
      ],
    },
  },
});
