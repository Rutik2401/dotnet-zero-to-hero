import { Routes } from '@angular/router';
import { POSTS } from './blog-data';

/**
 * One concrete route per post (built from the generated data) so Angular's SSG
 * prerenders every post to static HTML automatically. Each carries its title +
 * SEO data, which the SeoService bakes into the page.
 *
 * Adding a post: write it in Sanity Studio → rebuild. The build regenerates the
 * data, these routes update, and the new post prerenders. No code changes.
 */
const postRoutes: Routes = POSTS.map(p => ({
  path: p.slug,
  loadComponent: () => import('./blog-post.component').then(m => m.BlogPostComponent),
  title: `${p.title} — Learn Hub`,
  data: {
    seo: {
      description: p.seo.metaDescription,
      keywords: p.seo.keywords,
      image: p.coverUrl ?? undefined,
      type: 'article' as const
    }
  }
}));

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./blog-list.component').then(m => m.BlogListComponent),
    title: 'Blog — Learn Hub',
    data: {
      seo: {
        description:
          'Tutorials, post-mortems and field notes on .NET, Angular and modern web development.',
        keywords: '.NET blog, Angular blog, programming tutorials, EF Core, signals',
        type: 'website' as const
      }
    }
  },
  ...postRoutes
];
