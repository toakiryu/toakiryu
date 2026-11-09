import { getCollection } from 'astro:content';

export async function getPublicPosts() {
  const latest = await getCollection('posts', ({ data }) => data.public);
  return latest.toSorted(
    (a, b) => b.data.created_at.getTime() - a.data.created_at.getTime(),
  );
}
