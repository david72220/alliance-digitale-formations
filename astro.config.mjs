// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.alliance-digitale.fr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap(), react()],
});