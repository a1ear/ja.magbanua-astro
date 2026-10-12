import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        role: z.string().optional(),
        summary: z.string(),
        // Optional on purpose: only filled where the year is a confirmed fact.
        year: z.number().int().optional(),
        status: z.enum(['Live', 'Alpha', 'NDA']),
        kind: z.string(),
        url: z.url().optional(),
        nda: z.boolean().default(false),
        cover: image().optional(),
        alt: z.string().optional(),
        tech: z.array(z.string()).min(1),
        order: z.number().int(),
        featured: z.boolean().default(true),
      })
      // An NDA project must never leak a link or screenshot; a public one
      // must always have both, plus alt text for the screenshot.
      .refine((p) => (p.nda ? !p.url && !p.cover : !!p.url && !!p.cover && !!p.alt), {
        message: 'NDA projects take no url/cover; public projects need url, cover and alt',
      }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    period: z.string(),
    kind: z.enum(['work', 'education']).default('work'),
    order: z.number().int(),
  }),
});

const stack = defineCollection({
  loader: file('./src/content/stack.json'),
  schema: z.object({
    label: z.string(),
    order: z.number().int(),
    items: z.array(
      z.object({
        name: z.string(),
        // Simple Icons export name (e.g. "siReact"). Omitted when the tool
        // has no Simple Icons entry, which renders a letter badge instead.
        icon: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { projects, experience, stack };
