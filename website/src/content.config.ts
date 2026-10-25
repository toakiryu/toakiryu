import { defineCollection } from 'astro:content';

import { glob, file } from 'astro/loaders';

import { z } from 'astro/zod';

const latest = defineCollection({
  loader: glob({ base: './content/latest', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    public: z.boolean(),
    title: z.string(),
    description: z.string(),
    category: z.enum(['announcement', 'release', 'other']),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional(),
  }),
});

const technologies = defineCollection({
  loader: file('./content/technologies.json'),
  schema: z.object({
    id: z.string(),
    icon: z.string(),
  }),
});

export const collections = { latest, technologies };
