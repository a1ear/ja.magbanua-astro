import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

// Generated from the same content collections the pages use, so this file
// can never drift from what visitors see.
export const GET: APIRoute = async ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const experience = (await getCollection('experience')).sort((a, b) => a.data.order - b.data.order);
  const stack = (await getCollection('stack')).sort((a, b) => a.data.order - b.data.order);

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.role} based in ${SITE.location}, and CFO and co-founder of ${SITE.org.name}. ${SITE.availability}.`,
    '',
    SITE.pitch,
    '',
    `## ${SITE.org.name}`,
    '',
    `${SITE.name} is CFO and co-founder of ${SITE.org.name} (${SITE.org.url}). ${SITE.org.description}`,
    '',
    '## Work',
    '',
    ...projects.map((p) => {
      const d = p.data;
      const link = d.nda ? 'Under NDA, no public link.' : `Live: <${d.url}>`;
      return `- [${d.title}](${base}/work/${p.id}): ${d.summary} ${d.kind}. Built with ${d.tech.join(', ')}. ${link}`;
    }),
    '',
    '## Experience',
    '',
    ...experience.map((e) => `- ${e.data.title}, ${e.data.org} (${e.data.period})`),
    '',
    '## Stack',
    '',
    ...stack.map((g) => `- ${g.data.label}: ${g.data.items.map((i) => i.name).join(', ')}`),
    '',
    '## Contact',
    '',
    `- Email: ${SITE.email}`,
    ...SITE.socials.map((s) => `- ${s.label}: ${s.href}`),
    `- Portfolio: ${base}/`,
    `- Resume: ${base}${SITE.resume}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
