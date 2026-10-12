import type { APIRoute } from 'astro';

// Generated so the sitemap address always matches the deployed domain.
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap.xml', site).href}`, ''].join(
      '\n',
    ),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
