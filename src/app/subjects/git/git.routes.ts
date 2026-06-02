import { Routes } from '@angular/router';
import { GitShellComponent } from './git-shell.component';
import { GIT_TOPICS } from './git-topics';
import { gitLessonResolver } from './git-lesson.resolver';

/* Topic pages — generated from the registry so adding a lesson needs no route
   wiring. Ready topics load the shared renderer (one chunk) and pull their own
   lazy content via the registry's loadData; not-ready ones show coming-soon.
   Each route carries its SEO data for the SeoService. */
const topicRoutes: Routes = GIT_TOPICS.map(t => ({
  path: t.slug,
  loadComponent: t.ready
    ? () => import('./git-topic.component').then(m => m.GitTopicComponent)
    : () => import('./coming-soon/coming-soon.component').then(m => m.GitComingSoonComponent),
  /* Ready topics resolve their lesson content before render so it is baked
     into the prerendered HTML (SEO), while still loading from a lazy chunk. */
  resolve: t.ready ? { lesson: gitLessonResolver } : undefined,
  title: t.title,
  data: {
    slug: t.slug,
    seo: {
      description: t.metaDescription,
      keywords: t.keywords,
      type: 'article' as const
    }
  }
}));

export const GIT_ROUTES: Routes = [
  /* Full-width course landing — no sidebar shell. */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/git-home.component').then(m => m.GitHomeComponent),
    title: 'Git & GitHub — From Basic to Advanced',
    data: {
      seo: {
        description:
          'A practical Git & GitHub course from basic to advanced, built around the mistakes developers actually make — with real fixes, scenarios and interview questions.',
        keywords: 'git course, github tutorial, learn git, git mistakes, git interview questions',
        type: 'website' as const
      }
    }
  },

  /* All topic pages share the git shell (sidebar + header). */
  {
    path: '',
    component: GitShellComponent,
    children: topicRoutes
  }
];
