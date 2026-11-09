import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, reference } from 'astro:content';

const nameSchema = z.object({
  hiragana: z.string(),
  kanji: z.string().optional(),
  romaji: z.string().optional(),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './content/authors' }),
  schema: z.object({
    firstname: nameSchema,
    lastname: nameSchema,
    url: z.url(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    public: z.boolean(),
    author: reference('authors'),
    title: z.string(),
    description: z.string(),
    category: z.enum(['announcement', 'release', 'other']),
    tags: z.array(z.string()).optional(),
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

export const collections = { authors, posts, technologies };
