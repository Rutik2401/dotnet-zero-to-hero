import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, PreloadingStrategy, Route, Router } from '@angular/router';
import { EMPTY, Observable, ReplaySubject, timer } from 'rxjs';
import { catchError, filter, mergeMap, take } from 'rxjs/operators';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
}

type IdleCallback = (cb: () => void, opts?: { timeout: number }) => number;

@Injectable({ providedIn: 'root' })
export class StaggeredPreloadStrategy implements PreloadingStrategy {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly INITIAL_DELAY_MS = 2000;
  private readonly STAGGER_MS = 800;
  private readonly IDLE_TIMEOUT_MS = 3000;

  private readonly firstNav$ = new ReplaySubject<void>(1);
  private slot = 0;

  constructor() {
    if (!this.isBrowser) return;

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => this.firstNav$.next());
  }

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (!this.isBrowser) return EMPTY;
    if (route.data?.['preload'] === false) return EMPTY;
    if (this.isConstrainedNetwork()) return EMPTY;

    const delay = this.INITIAL_DELAY_MS + this.slot++ * this.STAGGER_MS;

    return this.firstNav$.pipe(
      take(1),
      mergeMap(() => timer(delay)),
      mergeMap(() => this.whenIdle()),
      mergeMap(() => load()),
      catchError(() => EMPTY)
    );
  }

  private isConstrainedNetwork(): boolean {
    const conn = (navigator as { connection?: NetworkInformation }).connection;
    if (!conn) return false;
    if (conn.saveData) return true;
    return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
  }

  private whenIdle(): Observable<void> {
    return new Observable<void>(sub => {
      const win = window as Window & {
        requestIdleCallback?: IdleCallback;
        cancelIdleCallback?: (handle: number) => void;
      };

      if (win.requestIdleCallback) {
        const handle = win.requestIdleCallback(
          () => { sub.next(); sub.complete(); },
          { timeout: this.IDLE_TIMEOUT_MS }
        );
        return () => win.cancelIdleCallback?.(handle);
      }

      const t = setTimeout(() => { sub.next(); sub.complete(); }, 0);
      return () => clearTimeout(t);
    });
  }
}
