import { Routes } from '@angular/router';

export const REACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/react-home.component').then(m => m.ReactHomeComponent),
    title: 'React Roadmap — Coming Soon'
  }
];
