import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { StaggeredPreloadStrategy } from './shared/preload/staggered-preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      withPreloading(StaggeredPreloadStrategy)
    )
  ]
};
