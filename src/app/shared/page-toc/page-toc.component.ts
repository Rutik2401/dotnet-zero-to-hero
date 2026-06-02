import { Component, DestroyRef, NgZone, effect, inject, signal } from '@angular/core';
import { PageTocService } from './page-toc.service';

/**
 * Shared right-side "On this page" navigation with live scroll-spy.
 *
 * Course-agnostic: it is driven entirely by PageTocService, so any shell can
 * render <app-page-toc> and any page can publish its sections via setTopics().
 *
 * As the user scrolls `.app-main`, the entry for the section currently at the
 * top of the viewport is highlighted, so a long page never feels disorienting.
 * Clicking an entry smooth-scrolls to its section (respecting reduced-motion)
 * and highlights it immediately.
 */
@Component({
  selector: 'app-page-toc',
  template: `
    @if (toc.topics().length) {
      <p class="toc-title">On this page</p>
      <ol class="toc-list">
        @for (t of toc.topics(); track t.id) {
          <li>
            <a [href]="'#' + t.id"
               [attr.data-toc]="t.id"
               [class.active]="t.id === activeId()"
               [attr.aria-current]="t.id === activeId() ? 'true' : null"
               (click)="scrollTo(t.id, $event)">{{ t.title }}</a>
          </li>
        }
      </ol>
    }
  `,
  host: {
    'class': 'app-toc',
    'role': 'complementary',
    'aria-label': 'On this page'
  }
})
export class PageTocComponent {
  protected readonly toc = inject(PageTocService);
  private readonly zone = inject(NgZone);

  /** Id of the section currently considered "current" by the scroll-spy. */
  protected readonly activeId = signal<string>('');

  /** How far below the top of the scroll area (px) a section becomes "current". */
  private readonly TRIGGER = 140;

  private scrollEl: HTMLElement | null = null;
  private readonly onScroll = () => this.scheduleSpy();
  private rafId = 0;
  private listening = false;

  constructor() {
    // (Re)attach the spy whenever the topic list changes — i.e. a new page loads.
    effect(() => {
      const topics = this.toc.topics();
      if (typeof document === 'undefined') return; // SSR / prerender
      this.teardown();
      if (!topics.length) {
        this.activeId.set('');
        return;
      }
      // Wait for the page's sections to paint before measuring.
      requestAnimationFrame(() => this.setup());
    });

    inject(DestroyRef).onDestroy(() => this.teardown());
  }

  scrollTo(id: string, event: MouseEvent): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    this.activeId.set(id); // optimistic highlight — don't wait for the scroll
    el.scrollIntoView({ behavior: this.prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  }

  // ---- scroll-spy internals -------------------------------------------------

  private setup(): void {
    this.scrollEl = document.querySelector('.app-main');
    if (!this.scrollEl) return;
    this.zone.runOutsideAngular(() => {
      this.scrollEl!.addEventListener('scroll', this.onScroll, { passive: true });
      this.listening = true;
    });
    this.computeActive(); // initial highlight
  }

  private teardown(): void {
    if (this.scrollEl && this.listening) {
      this.scrollEl.removeEventListener('scroll', this.onScroll);
    }
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.listening = false;
    this.scrollEl = null;
  }

  /** Coalesce scroll events into one measurement per animation frame. */
  private scheduleSpy(): void {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      this.computeActive();
    });
  }

  private computeActive(): void {
    const el = this.scrollEl;
    if (!el) return;
    const topics = this.toc.topics();
    if (!topics.length) return;

    // At the bottom of the scroll range, force the last item — the final
    // sections can't always reach the top, so they'd never highlight otherwise.
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
      this.setActive(topics[topics.length - 1].id);
      return;
    }

    const rootTop = el.getBoundingClientRect().top;
    let current = topics[0].id;
    for (const t of topics) {
      const section = document.getElementById(t.id);
      if (!section) continue;
      const top = section.getBoundingClientRect().top - rootTop;
      if (top <= this.TRIGGER) current = t.id;
      else break;
    }
    this.setActive(current);
  }

  private setActive(id: string): void {
    if (id === this.activeId()) return;
    this.zone.run(() => this.activeId.set(id)); // back in-zone for change detection
    this.keepActiveVisible(id);
  }

  /** Keep the highlighted entry in view when the TOC column itself scrolls. */
  private keepActiveVisible(id: string): void {
    const toc = this.scrollEl?.ownerDocument.querySelector<HTMLElement>('.app-toc');
    const link = toc?.querySelector<HTMLElement>(`a[data-toc="${id}"]`);
    if (!toc || !link) return;
    const tr = toc.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    if (lr.top < tr.top) toc.scrollTop -= (tr.top - lr.top) + 8;
    else if (lr.bottom > tr.bottom) toc.scrollTop += (lr.bottom - tr.bottom) + 8;
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }
}
