import { Routes } from '@angular/router';
import { DotnetShellComponent } from './dotnet-shell.component';
import { DOTNET_TOPICS } from './dotnet-topics';

const comingSoon = () =>
  import('./coming-soon/coming-soon.component').then(m => m.ComingSoonComponent);

/* Topic pages — generated from the registry so adding a tutorial needs no
   route wiring. Each carries its title + SEO data for the SeoService. */
const topicRoutes: Routes = DOTNET_TOPICS.map(t => ({
  path: t.slug,
  loadComponent: t.loadComponent ?? comingSoon,
  title: t.title,
  data: {
    seo: {
      description: t.metaDescription,
      keywords: t.keywords,
      type: 'article' as const
    }
  }
}));

/* Backwards-compatible client-side redirects from the old phase URLs.
   The authoritative HTTP 301s are emitted by Vercel (see vercel.json) — these
   only catch in-app navigations after the SPA has booted. */
const legacyRedirects: Routes = DOTNET_TOPICS.map(t => ({
  path: t.legacyPath,
  redirectTo: t.slug,
  pathMatch: 'full' as const
}));

export const DOTNET_ROUTES: Routes = [
  /* Full-width SaaS landing — no sidebar / app-shell. */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: '.NET Roadmap — Learn .NET, the practical way',
    data: {
      seo: {
        description:
          'A practical, interview-focused .NET roadmap: C#, ASP.NET Core, EF Core, system design, Angular and DevOps — with runnable code and expected output.',
        keywords: '.NET roadmap, learn .NET, C# tutorial, ASP.NET Core, EF Core, .NET interview',
        type: 'website' as const
      }
    }
  },

  /* All topic pages share the dotnet-shell (sidebar + header + TOC). */
  {
    path: '',
    component: DotnetShellComponent,
    children: [...topicRoutes, ...legacyRedirects]
  }
];
