import { Injectable, signal } from '@angular/core';

export interface SearchEntry {
  title: string;
  subtitle: string;
  path: string;
  kind: 'page' | 'phase' | 'note' | 'phase-deep';
  badge?: string;
}

/**
 * Lightweight search index over the public pages, the .NET phases and the
 * PDF note packs. Topic-level search is intentionally out of scope to keep
 * the main bundle small — drilling into a phase + browser Cmd+F covers it.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly isOpen = signal(false);
  readonly query  = signal('');

  readonly index: SearchEntry[] = [
    { title: 'Hub Home',         subtitle: 'Tracks · subjects · roadmaps',                      path: '/',          kind: 'page',  badge: 'PAGE'  },
    { title: '.NET Roadmap',     subtitle: '9 phases · interview-ready · live',                 path: '/dotnet',    kind: 'page',  badge: 'PAGE'  },
    { title: 'Notes & PDFs',     subtitle: '4 interview-ready PDFs · 475+ pages',               path: '/notes',     kind: 'page',  badge: 'PAGE'  },
    { title: 'Angular Roadmap',  subtitle: 'Standalone · signals · RxJS · SSR (coming soon)',   path: '/angular',   kind: 'page',  badge: 'SOON'  },
    { title: 'React Roadmap',    subtitle: 'Hooks · Next.js · Server Components (coming soon)', path: '/react',     kind: 'page',  badge: 'SOON'  },
    { title: 'Blog',             subtitle: 'Writing · field notes · teardowns',                 path: '/blog',      kind: 'page',  badge: 'PAGE'  },

    { title: 'Phase 0 — Programming + OOP',         subtitle: 'Variables · loops · OOP · SOLID',           path: '/dotnet/phase-0', kind: 'phase' },
    { title: 'Phase 1 — C# Deep Dive',              subtitle: 'CLR · LINQ · async/await · collections',    path: '/dotnet/phase-1', kind: 'phase' },
    { title: 'Phase 2 — ASP.NET Core',              subtitle: 'Web API · middleware · DI · JWT',           path: '/dotnet/phase-2', kind: 'phase' },
    { title: 'Phase 3 — SQL + EF Core',             subtitle: 'Joins · indexes · migrations · N+1',        path: '/dotnet/phase-3', kind: 'phase' },
    { title: 'Phase 4 — Advanced + System Design',  subtitle: 'Caching · CQRS · microservices · gateway',  path: '/dotnet/phase-4', kind: 'phase' },
    { title: 'Phase 5 — Modern Angular',            subtitle: 'Standalone · signals · OnPush · SSR',       path: '/dotnet/phase-5', kind: 'phase' },
    { title: 'Phase 6 — DevOps + Deployment',       subtitle: 'Git · CI/CD · Docker · Azure App Service',  path: '/dotnet/phase-6', kind: 'phase' },
    { title: 'Phase 7 — Projects',                  subtitle: 'E-commerce · Employee Mgmt · Microservice', path: '/dotnet/phase-7', kind: 'phase', badge: 'SOON' },
    { title: 'Phase 8 — Interview Preparation',     subtitle: 'DSA · Q&A drilling · mock interviews',      path: '/dotnet/phase-8', kind: 'phase', badge: 'SOON' },

    { title: 'Angular Notes PDF',     subtitle: 'Angular interview prep',     path: '/notes#angular',     kind: 'note', badge: 'PDF' },
    { title: '.NET Senior Notes PDF', subtitle: '.NET senior interview prep', path: '/notes#dotnet-sr',   kind: 'note', badge: 'PDF' },
    { title: '.NET Fresher Notes PDF',subtitle: '.NET fresher interview prep',path: '/notes#dotnet-fr',   kind: 'note', badge: 'PDF' },
    { title: 'React Notes PDF',       subtitle: 'React interview prep',       path: '/notes#react',       kind: 'note', badge: 'PDF' }
  ];

  open(): void  { this.isOpen.set(true);  this.query.set(''); }
  close(): void { this.isOpen.set(false); this.query.set(''); }

  match(q: string): SearchEntry[] {
    const needle = q.trim().toLowerCase();
    if (!needle) return this.index;
    return this.index.filter(e =>
      e.title.toLowerCase().includes(needle) ||
      e.subtitle.toLowerCase().includes(needle)
    );
  }
}
