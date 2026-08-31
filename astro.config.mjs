// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.alliance-digitale.fr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Exclut les pages document fines (noindex) du silo sécurité IA — garde les 21 hubs secteur.
      filter: (page) => !/\/securite-ia\/secteur\/[^/]+\/[^/]+\/?$/.test(new URL(page).pathname),
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
    react(),
  ],
});