import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

interface PhaseInfo {
  tag: string;
  title: string;
  scope: string;
  topics: string[];
}

const PHASE_INFO: Record<string, PhaseInfo> = {
  'phase-1': {
    tag: 'Phase 1',
    title: 'C# Deep Dive',
    scope: 'Master the C# language — runtime internals, advanced features, async, LINQ, collections.',
    topics: ['CLR, CTS, CLS', 'Value vs Reference Types', 'Boxing / Unboxing', 'Garbage Collection',
             'Delegates & Events', 'Lambda Expressions', 'LINQ deep dive', 'Async / Await',
             'Exception Handling', 'Collections (List, Dictionary, HashSet)', 'IEnumerable vs IQueryable']
  },
  'phase-2': {
    tag: 'Phase 2',
    title: 'ASP.NET Core',
    scope: 'Build real backend services. Web API, middleware, DI, auth, configuration, logging.',
    topics: ['What is .NET Core', '.NET Framework vs Core vs 6/7/8', 'Project structure', 'Middleware',
             'Dependency Injection', 'Configuration & Logging', 'Web API & REST', 'Routing',
             'Model Binding & Validation', 'Filters', 'JWT Authentication', 'Role-based Authorization']
  },
  'phase-3': {
    tag: 'Phase 3',
    title: 'SQL + EF Core',
    scope: 'Database fundamentals + Entity Framework Core. Joins, indexes, migrations, performance.',
    topics: ['SQL basics', 'Joins (Inner, Left, Right, Full)', 'Indexes', 'Normalization',
             'Stored Procedures', 'Transactions', 'EF Core Code-First', 'Migrations',
             'Relationships (1-1, 1-many, many-many)', 'Lazy vs Eager loading', 'N+1 problem', 'Tracking vs NoTracking']
  },
  'phase-4': {
    tag: 'Phase 4',
    title: 'Advanced + System Design',
    scope: 'Caching, design patterns, microservices basics, scalability concepts.',
    topics: ['MemoryCache & Redis', 'Background Jobs (Hangfire)', 'API Versioning', 'Rate Limiting',
             'Singleton', 'Repository Pattern', 'Unit of Work', 'Factory Pattern',
             'CQRS basics', 'Monolith vs Microservices', 'API Gateway', 'Load Balancing']
  },
  'phase-5': {
    tag: 'Phase 5',
    title: 'Frontend Basics',
    scope: 'Just enough frontend to integrate with your APIs and build full-stack projects.',
    topics: ['HTML basics', 'CSS basics', 'JavaScript fundamentals', 'Choose Angular OR React',
             'Component basics', 'API integration with HttpClient/fetch', 'CRUD UI', 'Forms & validation']
  },
  'phase-6': {
    tag: 'Phase 6',
    title: 'DevOps + Deployment',
    scope: 'Git, CI/CD, deployment to IIS / Azure, Docker basics.',
    topics: ['Git essentials', 'GitHub workflow', 'Build pipelines', 'CI/CD basics',
             'IIS hosting', 'Azure App Service', 'Azure SQL', 'Docker basics', 'Dockerizing .NET app']
  },
  'phase-7': {
    tag: 'Phase 7',
    title: 'Projects',
    scope: 'Three portfolio-ready projects — each with auth, logging, caching, error handling.',
    topics: ['E-Commerce API (Auth + Cart + Orders + Payment)', 'Employee Management System (CRUD + RBAC)',
             'Microservice Project (2-3 services + API Gateway)', 'Adding Logging', 'Adding Caching',
             'Clean Architecture layers', 'Error handling middleware', 'Interview-ready explanations']
  },
  'phase-8': {
    tag: 'Phase 8',
    title: 'Interview Preparation',
    scope: 'Final 3–4 weeks — DSA daily, .NET Q&A drilling, mock interviews.',
    topics: ['Arrays & Strings DSA', 'Sliding window', 'Recursion problems', 'DI deep dive',
             'Async / Await internals', 'Middleware flow', 'EF Core behaviour',
             'Project explanation drill', 'Whiteboard coding', 'Mock interviews']
  }
};

@Component({
  selector: 'app-coming-soon',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './coming-soon.component.html'
})
export class ComingSoonComponent {
  private readonly route = inject(ActivatedRoute);

  info$ = this.route.url.pipe(
    map(segments => segments[0]?.path ?? ''),
    map(slug => PHASE_INFO[slug] ?? {
      tag: 'Phase ?', title: 'Coming soon', scope: 'This phase is being prepared.', topics: []
    })
  );
}
