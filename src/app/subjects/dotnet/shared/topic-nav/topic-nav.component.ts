import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

import { adjacentTopics } from '../../dotnet-topics';

/**
 * "Previous / Next" tutorial links shown at the bottom of every topic page.
 * It reads the current slug from the URL and looks up neighbours in the
 * registry — so it stays correct as topics are added or reordered.
 */
@Component({
  selector: 'app-topic-nav',
  imports: [RouterLink],
  template: `
    @if (prev() || next()) {
      <nav class="topic-nav" aria-label="Tutorial navigation">
        @if (prev(); as p) {
          <a class="topic-nav-link prev" [routerLink]="['/dotnet', p.slug]">
            <span class="topic-nav-dir">← Previous</span>
            <span class="topic-nav-title">{{ p.navLabel }}</span>
          </a>
        } @else { <span></span> }

        @if (next(); as n) {
          <a class="topic-nav-link next" [routerLink]="['/dotnet', n.slug]">
            <span class="topic-nav-dir">Next →</span>
            <span class="topic-nav-title">{{ n.navLabel }}</span>
          </a>
        }
      </nav>
    }
  `,
  styles: [`
    .topic-nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 3rem 0 1rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(245, 241, 232, 0.12);
    }
    .topic-nav-link {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: 1rem 1.25rem;
      border: 1px solid rgba(245, 241, 232, 0.14);
      border-radius: 14px;
      text-decoration: none;
      transition: border-color 0.18s ease, transform 0.18s ease, background 0.18s ease;
      background: rgba(245, 241, 232, 0.02);
    }
    .topic-nav-link:hover {
      border-color: rgba(245, 241, 232, 0.35);
      transform: translateY(-2px);
      text-decoration: none;
    }
    .topic-nav-link.next { text-align: right; align-items: flex-end; }
    .topic-nav-dir {
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.6;
    }
    .topic-nav-title { font-weight: 600; }
    @media (max-width: 560px) {
      .topic-nav { grid-template-columns: 1fr; }
      .topic-nav-link.next { text-align: left; align-items: flex-start; }
    }
  `]
})
export class TopicNavComponent {
  private readonly router = inject(Router);

  /** Current /dotnet/<slug> segment, recomputed on every navigation. */
  private readonly slug = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url),
      map(url => url.split('#')[0].split('?')[0].split('/').filter(Boolean)),
      map(parts => (parts[0] === 'dotnet' ? parts[1] ?? '' : ''))
    ),
    { initialValue: this.router.url.split('/').filter(Boolean)[1] ?? '' }
  );

  private readonly adjacent = computed(() => adjacentTopics(this.slug()));
  readonly prev = computed(() => this.adjacent().prev);
  readonly next = computed(() => this.adjacent().next);
}
