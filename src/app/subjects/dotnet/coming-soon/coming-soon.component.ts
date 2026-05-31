import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

import { TOPICS_IN_ORDER, topicBySlug } from '../dotnet-topics';

interface ComingSoonInfo {
  tag: string;
  title: string;
  scope: string;
  topics: string[];
}

/** Detailed "what this will cover" bullets, keyed by the topic slug. */
const TOPIC_OUTLINE: Record<string, string[]> = {
  'dotnet-projects': [
    'E-Commerce API (Auth + Cart + Orders + Payment)', 'Employee Management System (CRUD + RBAC)',
    'Microservice Project (2-3 services + API Gateway)', 'Adding Logging', 'Adding Caching',
    'Clean Architecture layers', 'Error handling middleware', 'Interview-ready explanations'
  ],
  'dotnet-interview-questions': [
    'Arrays & Strings DSA', 'Sliding window', 'Recursion problems', 'DI deep dive',
    'Async / Await internals', 'Middleware flow', 'EF Core behaviour',
    'Project explanation drill', 'Whiteboard coding', 'Mock interviews'
  ]
};

@Component({
  selector: 'app-coming-soon',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './coming-soon.component.html'
})
export class ComingSoonComponent {
  private readonly route = inject(ActivatedRoute);

  /** First ready tutorial — used for the "start here instead" call to action. */
  readonly firstReady = TOPICS_IN_ORDER.find(t => t.ready);

  info$ = this.route.url.pipe(
    map(segments => segments[0]?.path ?? ''),
    map((slug): ComingSoonInfo => {
      const topic = topicBySlug(slug);
      return {
        tag: topic?.navLabel ?? 'Coming soon',
        title: topic?.cardTitle ?? 'Coming soon',
        scope: topic?.metaDescription ?? 'This tutorial is being prepared.',
        topics: TOPIC_OUTLINE[slug] ?? []
      };
    })
  );
}
