// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ja-magbanua.vercel.app',
  // Matches vercel.json (cleanUrls, no trailing slash), so canonical URLs,
  // the sitemap and the served URLs are all the same string.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // About 10 KB of CSS in total: inlining it removes two render-blocking
    // requests from the critical path, which was the bulk of mobile LCP.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
