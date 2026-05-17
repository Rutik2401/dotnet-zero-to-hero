import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/hub-home.component').then(m => m.HubHomeComponent),
    title: 'Learn Hub — Roadmaps for .NET, Angular, React'
  },
  {
    path: 'dotnet',
    loadChildren: () => import('./subjects/dotnet/dotnet.routes').then(m => m.DOTNET_ROUTES)
  },
  {
    path: 'angular',
    loadChildren: () => import('./subjects/angular/angular.routes').then(m => m.ANGULAR_ROUTES)
  },
  {
    path: 'react',
    loadChildren: () => import('./subjects/react/react.routes').then(m => m.REACT_ROUTES)
  },
  {
    path: 'notes',
    loadChildren: () => import('./subjects/notes/notes.routes').then(m => m.NOTES_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
