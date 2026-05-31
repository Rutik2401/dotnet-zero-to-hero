import { Injectable, signal } from '@angular/core';
import { TOPICS_IN_ORDER } from '../../subjects/dotnet/dotnet-topics';

export interface SearchEntry {
  title: string;
  subtitle: string;
  path: string;
  kind: 'page' | 'phase' | 'note' | 'phase-deep';
  badge?: string;
}

/** .NET topic entries, generated from the registry so search stays in sync. */
const DOTNET_TOPIC_ENTRIES: SearchEntry[] = TOPICS_IN_ORDER.map(t => ({
  title: t.navLabel,
  subtitle: t.searchSubtitle,
  path: `/dotnet/${t.slug}`,
  kind: 'phase' as const,
  ...(t.ready ? {} : { badge: 'SOON' })
}));

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

    ...DOTNET_TOPIC_ENTRIES,

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
