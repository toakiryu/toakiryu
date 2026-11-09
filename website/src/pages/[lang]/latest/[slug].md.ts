import type { APIRoute, GetStaticPaths } from 'astro';
import { getEntry, type CollectionEntry } from 'astro:content';

import { localeStaticPaths } from '@/i18n/routing';
import { Markdown } from '@/layouts/Markdown';
import { getPublicPosts } from '@/utils/posts';
import { MergeStaticPaths } from '@/utils/static-paths';

export const getStaticPaths = (async () => {
  const posts = await getPublicPosts();
  const latestPaths = posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
  return MergeStaticPaths(localeStaticPaths, latestPaths)();
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'posts'> };
  const author = await getEntry(post.data.author);
  if (!author) {
    throw new Error(
      `Author "${post.data.author.id}" not found for post "${post.id}"`,
    );
  }

  return Markdown({
    data: { ...post.data, author: author.data },
    body: post.body ?? '',
  });
};
