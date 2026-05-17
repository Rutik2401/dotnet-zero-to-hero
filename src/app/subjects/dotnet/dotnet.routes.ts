import { Routes } from '@angular/router';
import { DotnetShellComponent } from './dotnet-shell.component';

const comingSoon = () =>
  import('./coming-soon/coming-soon.component').then(m => m.ComingSoonComponent);

export const DOTNET_ROUTES: Routes = [
  {
    path: '',
    component: DotnetShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        title: '.NET Roadmap — Home'
      },
      {
        path: 'phase-0',
        loadComponent: () => import('./phase-0/phase-0.component').then(m => m.Phase0Component),
        title: 'Phase 0 — Programming + OOP'
      },
      {
        path: 'phase-1',
        loadComponent: () => import('./phase-1/phase-1.component').then(m => m.Phase1Component),
        title: 'Phase 1 — C# Deep Dive'
      },
      {
        path: 'phase-2',
        loadComponent: () => import('./phase-2/phase-2.component').then(m => m.Phase2Component),
        title: 'Phase 2 — ASP.NET Core'
      },
      {
        path: 'phase-3',
        loadComponent: () => import('./phase-3/phase-3.component').then(m => m.Phase3Component),
        title: 'Phase 3 — SQL + EF Core'
      },
      {
        path: 'phase-4',
        loadComponent: () => import('./phase-4/phase-4.component').then(m => m.Phase4Component),
        title: 'Phase 4 — Advanced + System Design'
      },
      {
        path: 'phase-5',
        loadComponent: () => import('./phase-5/phase-5.component').then(m => m.Phase5Component),
        title: 'Phase 5 — Modern Angular'
      },
      {
        path: 'phase-6',
        loadComponent: () => import('./phase-6/phase-6.component').then(m => m.Phase6Component),
        title: 'Phase 6 — DevOps + Deployment'
      },
      { path: 'phase-7', loadComponent: comingSoon, title: 'Phase 7 — Projects' },
      { path: 'phase-8', loadComponent: comingSoon, title: 'Phase 8 — Interview Preparation' }
    ]
  }
];
