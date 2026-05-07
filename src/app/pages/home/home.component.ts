import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PhaseCard {
  tag: string;
  title: string;
  desc: string;
  link?: string;
  ready: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  phases: PhaseCard[] = [
    { tag: 'Phase 0', title: 'Programming + OOP',          desc: 'Variables, loops, OOP, SOLID. Foundation of everything.',     link: '/phase-0', ready: true  },
    { tag: 'Phase 1', title: 'C# Deep Dive',               desc: 'CLR, value vs ref, LINQ, Async/Await, collections.',          link: '/phase-1', ready: true  },
    { tag: 'Phase 2', title: 'ASP.NET Core',               desc: 'Web API, Middleware, DI, Auth, Filters.',                     link: '/phase-2', ready: true  },
    { tag: 'Phase 3', title: 'SQL + EF Core',              desc: 'Joins, indexes, EF Core, migrations, query optimisation.',    link: '/phase-3', ready: true  },
    { tag: 'Phase 4', title: 'Advanced + System Design',   desc: 'Caching, Redis, design patterns, microservices basics.',      link: '/phase-4', ready: true  },
    { tag: 'Phase 5', title: 'Modern Angular',             desc: 'Standalone, signals, control flow, RxJS, OnPush.',            link: '/phase-5', ready: true  },
    { tag: 'Phase 6', title: 'DevOps + Deployment',        desc: 'Git, CI/CD, GitHub Actions, Docker, IIS, Azure.',             link: '/phase-6', ready: true  },
    { tag: 'Phase 7', title: 'Projects',                   desc: 'E-commerce API, Employee app, Microservice project.',         ready: false },
    { tag: 'Phase 8', title: 'Interview Preparation',      desc: 'DSA daily, .NET Q&A, mock interviews.',                       ready: false }
  ];
}
