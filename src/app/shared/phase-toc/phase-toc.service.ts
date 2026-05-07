import { Injectable, signal } from '@angular/core';

export interface TocItem {
  id: string;
  title: string;
}

/**
 * Tiny shared store for the right-side phase TOC.
 *
 * Each phase component sets its topics on init and clears them on destroy.
 * The shell-level <app-phase-toc> reads the signal and renders the list.
 * When topics() is empty, the TOC column collapses (e.g. on home / coming-soon).
 */
@Injectable({ providedIn: 'root' })
export class PhaseTocService {
  private readonly _topics = signal<TocItem[]>([]);
  readonly topics = this._topics.asReadonly();

  setTopics(topics: TocItem[]): void {
    this._topics.set(topics);
  }

  clear(): void {
    this._topics.set([]);
  }
}
