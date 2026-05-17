import { Routes } from '@angular/router';

export const ANGULAR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/angular-home.component').then(m => m.AngularHomeComponent),
    title: 'Angular Roadmap — Coming Soon'
  }
];
