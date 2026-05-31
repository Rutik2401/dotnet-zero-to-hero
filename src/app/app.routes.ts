import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/hub-home.component').then(m => m.HubHomeComponent),
    title: 'Learn Hub — Roadmaps for .NET, Angular, React'
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent),
    title: 'Courses — Learn Hub'
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
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.routes').then(m => m.BLOG_ROUTES)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Learn Hub'
  },
  { path: '**', redirectTo: '' }
];
