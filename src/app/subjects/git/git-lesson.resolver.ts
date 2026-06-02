import { ResolveFn } from '@angular/router';
import { GitLesson } from './topic.types';
import { gitTopicBySlug } from './git-topics';

/**
 * Resolves a topic's lesson content BEFORE the route renders. The router (and
 * the SSG prerenderer) waits for this promise, so the content is baked into the
 * static HTML for SEO. The data still comes from a per-topic dynamic import, so
 * each lesson ships as its own lazy chunk.
 */
export const gitLessonResolver: ResolveFn<GitLesson | null> = route => {
  const slug = route.data['slug'] as string;
  const topic = gitTopicBySlug(slug);
  return topic?.loadData ? topic.loadData() : null;
};
