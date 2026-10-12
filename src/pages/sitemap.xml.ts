import type { APIRoute } from 'astro';
import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import portrait from '../assets/portrait.jpg';
import portraitWide from '../assets/portrait-wide.jpg';
import { OG_IMAGE } from '../seo';

// Built from the same content collections as the pages, so a new project
// appears here automatically. Served at /sitemap.xml, the same address the
// old site used, so the sitemap already submitted to Search Console keeps
// working. Each page lists its images (Google image sitemap extension),
// using the same generated files the pages' share tags point to.
// No <lastmod>: Google only trusts it when it is accurate, and a build date
// would claim every page changed on every deploy.

interface Entry {
  path: string;
  images: ImageMetadata[];
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  const entries: Entry[] = [
    { path: '/', images: [portraitWide, portrait] },
    ...projects.map((p) => ({ path: `/work/${p.id}`, images: p.data.cover ? [p.data.cover] : [] })),
    { path: '/approach', images: [] },
  ];

  const urls = await Promise.all(
    entries.map(async ({ path, images }) => {
      const loc = new URL(path, site).href;
      const imgs = await Promise.all(
        images.map(async (src) => new URL((await getImage({ src, ...OG_IMAGE })).src, site).href),
      );
      return [
        '  <url>',
        `    <loc>${escape(loc)}</loc>`,
        ...imgs.map((u) => `    <image:image><image:loc>${escape(u)}</image:loc></image:image>`),
        '  </url>',
      ].join('\n');
    }),
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
