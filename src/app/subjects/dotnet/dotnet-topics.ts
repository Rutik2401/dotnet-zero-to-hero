import { Type } from '@angular/core';

/**
 * SINGLE SOURCE OF TRUTH for the .NET roadmap.
 *
 * Every topic's URL, navigation entry, search entry, prev/next link, SEO tags
 * and sitemap row are derived from this one array. To add a new tutorial:
 *
 *   1. Create the component folder (e.g. `signalr/signalr.component.ts`).
 *   2. Add ONE entry below with its slug + metadata + loadComponent.
 *
 * That's it — routes, sidebar, home cards, search and the sitemap pick it up
 * automatically. Do NOT hard-code phase/slug links anywhere else.
 */
export interface DotnetTopic {
  /** SEO-friendly URL segment, e.g. 'aspnet-core' → /dotnet/aspnet-core */
  slug: string;
  /** Old phase path, kept only to emit a 301 redirect (e.g. 'phase-2'). */
  legacyPath: string;
  /** Display order in the roadmap (also drives prev/next). */
  order: number;
  /** Whether the tutorial content exists (false → "coming soon" page). */
  ready: boolean;

  /** Short, readable label for sidebar / nav (NOT "Phase 2"). */
  navLabel: string;

  // ── SEO ────────────────────────────────────────────────────────────────
  /** <title> — unique, keyword-rich. */
  title: string;
  /** <meta name="description"> — ~150-160 chars. */
  metaDescription: string;
  /** <meta name="keywords"> (minor signal, but cheap to include). */
  keywords: string;

  // ── Home page card ───────────────────────────────────────────────────────
  vol: string;
  tag: string;
  cardTitle: string;
  cardDesc: string;
  topics: number;
  hours: string;
  level: string;
  coverIcon: string;
  coverGradient: string;

  // ── Search index ──────────────────────────────────────────────────────────
  searchSubtitle: string;

  /** Lazy component loader. Omitted for not-yet-ready topics (→ coming-soon). */
  loadComponent?: () => Promise<Type<unknown>>;
}

export const DOTNET_TOPICS: DotnetTopic[] = [
  {
    slug: 'programming-fundamentals',
    legacyPath: 'phase-0',
    order: 0,
    ready: true,
    navLabel: 'Programming Fundamentals & OOP',
    title: 'Programming Fundamentals & OOP in C# — .NET Roadmap',
    metaDescription:
      'Learn programming fundamentals and object-oriented programming (OOP) in C#: variables, loops, classes, inheritance, polymorphism and SOLID principles — with runnable examples.',
    keywords: 'C# basics, OOP, object oriented programming, SOLID principles, programming fundamentals',
    vol: '00', tag: 'PROGRAMMING + OOP', cardTitle: 'Programming + OOP',
    cardDesc: 'Variables, loops, OOP fundamentals and SOLID. The foundation interviewers test before going deep.',
    topics: 8, hours: '12', level: 'BEGINNER', coverIcon: '0',
    coverGradient: 'linear-gradient(135deg, #1e293b 0%, #312e81 70%, #4338ca 100%)',
    searchSubtitle: 'Variables · loops · OOP · SOLID',
    loadComponent: () => import('./phase-0/phase-0.component').then(m => m.Phase0Component)
  },
  {
    slug: 'csharp-deep-dive',
    legacyPath: 'phase-1',
    order: 1,
    ready: true,
    navLabel: 'C# Deep Dive',
    title: 'C# Deep Dive — CLR, LINQ, Async/Await & Collections',
    metaDescription:
      'Go deep on C#: CLR internals, value vs reference types, garbage collection, delegates, LINQ, async/await and collections — the depth .NET interviews actually probe.',
    keywords: 'C# deep dive, CLR, LINQ, async await, garbage collection, delegates, collections',
    vol: '01', tag: 'C# DEEP DIVE', cardTitle: 'C# Deep Dive',
    cardDesc: 'CLR internals, value vs reference, LINQ, async/await, collections. The depth interviewers actually probe.',
    topics: 12, hours: '20', level: 'BEGINNER', coverIcon: 'C#',
    coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)',
    searchSubtitle: 'CLR · LINQ · async/await · collections',
    loadComponent: () => import('./phase-1/phase-1.component').then(m => m.Phase1Component)
  },
  {
    slug: 'aspnet-core',
    legacyPath: 'phase-2',
    order: 2,
    ready: true,
    navLabel: 'ASP.NET Core',
    title: 'ASP.NET Core Tutorial — Web API, Middleware, DI & JWT Auth',
    metaDescription:
      'Build real ASP.NET Core backends: Web API and REST, middleware, dependency injection, routing, model binding, filters and JWT authentication — with working code.',
    keywords: 'ASP.NET Core, Web API, middleware, dependency injection, JWT authentication, REST API',
    vol: '02', tag: 'ASP.NET CORE', cardTitle: 'ASP.NET Core',
    cardDesc: 'Web API, middleware, DI, JWT auth, filters, model binding. Building real backends, not toy demos.',
    topics: 14, hours: '28', level: 'INTERMEDIATE', coverIcon: '.NET',
    coverGradient: 'linear-gradient(135deg, #312e81 0%, #6d28d9 60%, #a21caf 100%)',
    searchSubtitle: 'Web API · middleware · DI · JWT',
    loadComponent: () => import('./phase-2/phase-2.component').then(m => m.Phase2Component)
  },
  {
    slug: 'sql-entity-framework-core',
    legacyPath: 'phase-3',
    order: 3,
    ready: true,
    navLabel: 'SQL & EF Core',
    title: 'SQL & Entity Framework Core — Joins, Migrations & N+1 Fixes',
    metaDescription:
      'Master SQL and Entity Framework Core: joins, indexes, normalization, code-first migrations, relationships, lazy vs eager loading and fixing the N+1 query problem.',
    keywords: 'Entity Framework Core, EF Core, SQL joins, migrations, N+1 problem, indexes, LINQ to SQL',
    vol: '03', tag: 'SQL + EF CORE', cardTitle: 'SQL + EF Core',
    cardDesc: 'Joins, indexes, normalization, EF Core, migrations, N+1, tracking vs no-tracking, real query optimisation.',
    topics: 12, hours: '22', level: 'INTERMEDIATE', coverIcon: 'SQL',
    coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)',
    searchSubtitle: 'Joins · indexes · migrations · N+1',
    loadComponent: () => import('./phase-3/phase-3.component').then(m => m.Phase3Component)
  },
  {
    slug: 'advanced-system-design',
    legacyPath: 'phase-4',
    order: 4,
    ready: true,
    navLabel: 'Advanced & System Design',
    title: 'Advanced .NET & System Design — Caching, CQRS & Microservices',
    metaDescription:
      'Level up with advanced .NET and system design: caching with Redis, design patterns, CQRS, microservices basics, API gateways and load balancing.',
    keywords: 'system design, Redis caching, CQRS, microservices, design patterns, API gateway, scalability',
    vol: '04', tag: 'ADVANCED + DESIGN', cardTitle: 'Advanced + System Design',
    cardDesc: 'Caching, Redis, design patterns, CQRS, microservices basics, API gateway, load balancing.',
    topics: 12, hours: '24', level: 'ADVANCED', coverIcon: '◆',
    coverGradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #c026d3 100%)',
    searchSubtitle: 'Caching · CQRS · microservices · gateway',
    loadComponent: () => import('./phase-4/phase-4.component').then(m => m.Phase4Component)
  },
  {
    slug: 'modern-angular',
    legacyPath: 'phase-5',
    order: 5,
    ready: true,
    navLabel: 'Modern Angular',
    title: 'Modern Angular — Standalone, Signals, RxJS, OnPush & SSR',
    metaDescription:
      'Modern Angular for .NET developers: standalone components, signals, the new control flow, RxJS, OnPush change detection and SSR — Angular as seniors actually write it.',
    keywords: 'modern Angular, signals, standalone components, RxJS, OnPush, Angular SSR, control flow',
    vol: '05', tag: 'MODERN ANGULAR', cardTitle: 'Modern Angular',
    cardDesc: 'Standalone, signals, control flow, RxJS, OnPush, SSR. Angular as senior engineers actually write it.',
    topics: 10, hours: '14', level: 'INTERMEDIATE', coverIcon: 'NG',
    coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)',
    searchSubtitle: 'Standalone · signals · OnPush · SSR',
    loadComponent: () => import('./phase-5/phase-5.component').then(m => m.Phase5Component)
  },
  {
    slug: 'devops-deployment',
    legacyPath: 'phase-6',
    order: 6,
    ready: true,
    navLabel: 'DevOps & Deployment',
    title: 'DevOps & Deployment for .NET — CI/CD, Docker & Azure',
    metaDescription:
      'Ship .NET apps end to end: Git workflow, CI/CD with GitHub Actions, Docker, IIS hosting and Azure App Service deployment — the practical DevOps a backend dev needs.',
    keywords: '.NET DevOps, CI/CD, GitHub Actions, Docker, Azure App Service, IIS hosting, deployment',
    vol: '06', tag: 'DEVOPS + DEPLOY', cardTitle: 'DevOps + Deployment',
    cardDesc: 'Git, CI/CD, GitHub Actions, Docker, IIS hosting, Azure App Service. End-to-end shipping.',
    topics: 9, hours: '15', level: 'INTERMEDIATE', coverIcon: '⚙',
    coverGradient: 'linear-gradient(135deg, #134e4a 0%, #0d9488 70%, #14b8a6 100%)',
    searchSubtitle: 'Git · CI/CD · Docker · Azure App Service',
    loadComponent: () => import('./phase-6/phase-6.component').then(m => m.Phase6Component)
  },
  {
    slug: 'dotnet-projects',
    legacyPath: 'phase-7',
    order: 7,
    ready: false,
    navLabel: 'Portfolio Projects',
    title: '.NET Portfolio Projects — E-commerce, Microservices & More',
    metaDescription:
      'Three portfolio-ready .NET projects — an E-commerce API, an Employee Management System and a microservice — each with auth, logging, caching and clean architecture.',
    keywords: '.NET projects, portfolio projects, e-commerce API, microservices project, clean architecture',
    vol: '07', tag: 'PROJECTS', cardTitle: 'Portfolio Projects',
    cardDesc: 'Three real projects — E-commerce API, Employee Management, Microservice — each with auth, logging, caching.',
    topics: 3, hours: '40', level: 'ALL LEVELS', coverIcon: '◑',
    coverGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 70%, #4b5563 100%)',
    searchSubtitle: 'E-commerce · Employee Mgmt · Microservice'
  },
  {
    slug: 'dotnet-interview-questions',
    legacyPath: 'phase-8',
    order: 8,
    ready: false,
    navLabel: 'Interview Preparation',
    title: '.NET Interview Questions & Preparation — DSA, Q&A, Mock Interviews',
    metaDescription:
      '.NET interview preparation: DSA practice, C# and ASP.NET Core Q&A drilling, project explanation drills, whiteboard coding and mock interviews to land the offer.',
    keywords: '.NET interview questions, C# interview, ASP.NET Core interview, DSA, mock interview, interview prep',
    vol: '08', tag: 'INTERVIEW PREP', cardTitle: 'Interview Preparation',
    cardDesc: 'DSA daily, .NET Q&A drilling, project explanation drills, whiteboard coding, mock interviews.',
    topics: 50, hours: '20', level: 'ALL LEVELS', coverIcon: '★',
    coverGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 70%, #4b5563 100%)',
    searchSubtitle: 'DSA · Q&A drilling · mock interviews'
  }
];

/** All topics in roadmap order. */
export const TOPICS_IN_ORDER = [...DOTNET_TOPICS].sort((a, b) => a.order - b.order);

/** Look up a topic by its new slug. */
export function topicBySlug(slug: string): DotnetTopic | undefined {
  return DOTNET_TOPICS.find(t => t.slug === slug);
}

/** Look up a topic by its legacy phase path (for redirects / coming-soon). */
export function topicByLegacyPath(legacyPath: string): DotnetTopic | undefined {
  return DOTNET_TOPICS.find(t => t.legacyPath === legacyPath);
}

/** Previous / next ready topics for the prev-next footer nav. */
export function adjacentTopics(slug: string): { prev?: DotnetTopic; next?: DotnetTopic } {
  const ready = TOPICS_IN_ORDER.filter(t => t.ready);
  const i = ready.findIndex(t => t.slug === slug);
  if (i === -1) return {};
  return { prev: ready[i - 1], next: ready[i + 1] };
}
