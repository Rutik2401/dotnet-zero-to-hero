import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server render config. Every route is prerendered to static HTML at build
 * time (SSG) — discovered automatically by crawling the app from '/'. New
 * topics are linked from the home/sidebar, so they get prerendered with no
 * extra config here.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender }
];
