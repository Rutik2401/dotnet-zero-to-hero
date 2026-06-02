import { Injectable, signal } from '@angular/core';

export interface TocItem {
  id: string;
  title: string;
}

/**
 * Shared store for the right-side "On this page" TOC, used by every course shell.
 *
 * A page component sets its sections on init and clears them on destroy. The
 * shell-level <app-page-toc> reads the signal, renders the list, and runs the
 * scroll-spy. When topics() is empty the TOC column collapses (home / coming-soon).
 */
@Injectable({ providedIn: 'root' })
export class PageTocService {
  private readonly _topics = signal<TocItem[]>([]);
  readonly topics = this._topics.asReadonly();

  setTopics(topics: TocItem[]): void {
    this._topics.set(topics);
  }

  clear(): void {
    this._topics.set([]);
  }
}
