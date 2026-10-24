import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ base: './content/news', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    public: z.boolean(),
    title: z.string(),
    description: z.string(),
    category: z.enum(['announcement', 'release', 'other']),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional(),
  }),
});

export const collections = { news };
