// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The public address of the site. Canonical URLs, Open Graph images, the
// sitemap, robots.txt, JSON-LD and llms.txt are all built from it.
// Order: an explicit SITE_URL, then the production URL the host provides
// (Netlify sets URL, Vercel sets VERCEL_PROJECT_PRODUCTION_URL), then the
// current Vercel address as a fallback for local builds.
const site =
  process.env.SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://ja-magbanua.vercel.app';

// https://astro.build/config
export default defineConfig({
  site,
  // Matches vercel.json (cleanUrls, no trailing slash), so canonical URLs,
  // the sitemap and the served URLs are all the same string.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // About 10 KB of CSS in total: inlining it removes two render-blocking
    // requests from the critical path, which was the bulk of mobile LCP.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
