import { BLOG_POSTS, type GeneratedPost } from './blog-data.generated';

/**
 * Thin, hand-written helpers over the auto-generated post data. Keeping these
 * separate means the generated file stays pure data (safe to overwrite each
 * build) while the lookup logic lives in version-controlled code.
 */
export type { GeneratedPost };

/** All posts, already newest-first (ordered by the build script). */
export const POSTS = BLOG_POSTS;

/** Find a single post by its URL slug. */
export function postBySlug(slug: string): GeneratedPost | undefined {
  return POSTS.find(p => p.slug === slug);
}

/** Neighbouring posts for the prev/next footer (by publish date). */
export function adjacentPosts(slug: string): { newer?: GeneratedPost; older?: GeneratedPost } {
  const i = POSTS.findIndex(p => p.slug === slug);
  if (i === -1) return {};
  return { newer: POSTS[i - 1], older: POSTS[i + 1] };
}
