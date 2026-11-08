// SITE_MODE=gallery (default): github.io URL with base path, everything noindex.
// SITE_MODE=production: https://bellassetmanagement.com at the root.
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

const production = process.env.SITE_MODE === 'production';

export default defineConfig({
  site: production ? 'https://bellassetmanagement.com' : 'https://boardybell.github.io',
  base: production ? '/' : '/bellassetmanagement-site',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // Per-format encoder quality (one quality number is wrong across formats: AVIF 72 is far heavier than WebP 72).
  image: { service: { entrypoint: 'astro/assets/services/sharp', config: { avif: { quality: 50, effort: 6 }, webp: { quality: 74, effort: 5 }, jpeg: { quality: 78, mozjpeg: true } } } },
  devToolbar: { enabled: false },
  // Iterations and the gallery are never in the sitemap. In gallery mode there is nothing indexable.
  integrations: [sitemap({ filter: (page) => production && !page.includes('/iterations/') && !page.includes('/404') })],
});