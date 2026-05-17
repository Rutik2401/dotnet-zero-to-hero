import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from './search.service';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
  soon?: boolean;
}

@Component({
  selector: 'app-landing-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="lnav" aria-label="Primary">
      <a routerLink="/" class="lnav-brand" aria-label="Learn Hub — Home">
        <span class="lnav-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2.5 L28.5 9.75 V22.25 L16 29.5 L3.5 22.25 V9.75 Z"
                  fill="#6d28d9" stroke="#5b21b6" stroke-width="1" stroke-linejoin="round"/>
            <path d="M11 11 V21 M11 16 H17 M17 11 V21" stroke="#f5f1e8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="lnav-name">
          <span class="lnav-name-soft">learn</span><span class="lnav-name-bold">hub</span>
        </span>
      </a>

      <div class="lnav-pill" role="navigation">
        @for (l of links; track l.path) {
          <a [routerLink]="l.path"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: !!l.exact }"
             class="lnav-link"
             [class.is-soon]="l.soon">
            <span class="lnav-link-label">{{ l.label }}</span>
            @if (l.soon) { <span class="lnav-link-tag">soon</span> }
          </a>
        }
      </div>

      <div class="lnav-actions">
        <button class="lnav-search" type="button" (click)="openSearch()" aria-label="Search">
          <svg class="lnav-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-3.5-3.5"/>
          </svg>
          <span class="lnav-search-label">Search</span>
          <kbd class="lnav-kbd">Ctrl<span class="lnav-kbd-plus">·</span>K</kbd>
        </button>

        <button class="lnav-theme" type="button" (click)="toggleTheme()" aria-label="Toggle theme">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        </button>

        <a routerLink="/" fragment="newsletter" class="lnav-subscribe">
          Subscribe
        </a>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }

    .lnav {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.85rem 0;
    }

    /* ─── Brand ─── */
    .lnav-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      text-decoration: none;
      flex-shrink: 0;
      color: #0a0a0a;
      transition: opacity 0.2s ease;
    }
    .lnav-brand:hover { opacity: 0.85; text-decoration: none; }
    .lnav-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 10px rgba(109, 40, 217, 0.32));
    }
    .lnav-name {
      font-size: 1.05rem;
      letter-spacing: -0.015em;
      color: #0a0a0a;
    }
    .lnav-name-soft { font-weight: 500; opacity: 0.85; }
    .lnav-name-bold { font-weight: 800; }

    /* ─── Center pill ─── */
    .lnav-pill {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      padding: 0.32rem;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(10, 10, 10, 0.08);
      border-radius: 999px;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 6px 20px rgba(15, 15, 15, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      overflow-x: auto;
      scrollbar-width: none;
      max-width: 100%;
    }
    .lnav-pill::-webkit-scrollbar { display: none; }

    .lnav-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.95rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: #44403c;
      text-decoration: none;
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.2s ease, background 0.2s ease;
    }
    .lnav-link:hover { color: #0a0a0a; text-decoration: none; }
    .lnav-link.active { color: #f5f1e8; background: #0a0a0a; }
    .lnav-link-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.58rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.1rem 0.36rem;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.08);
      color: #57534e;
    }
    .lnav-link.active .lnav-link-tag {
      background: rgba(245, 241, 232, 0.18);
      color: #f5f1e8;
    }
    .lnav-link.is-soon { color: #a8a29e; }
    .lnav-link.is-soon:hover { color: #44403c; }

    /* ─── Right-side actions ─── */
    .lnav-actions {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .lnav-search {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.5rem 0.7rem 0.5rem 0.85rem;
      font-size: 0.86rem;
      font-weight: 500;
      color: #44403c;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(10, 10, 10, 0.08);
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset;
    }
    .lnav-search:hover {
      color: #0a0a0a;
      background: #fff;
      transform: translateY(-1px);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 6px 18px rgba(15, 15, 15, 0.08);
    }
    .lnav-search-icon { color: #78716c; }
    .lnav-search:hover .lnav-search-icon { color: #6d28d9; }
    .lnav-search-label { letter-spacing: -0.005em; }
    .lnav-kbd {
      display: inline-flex;
      align-items: center;
      gap: 1px;
      padding: 0.18rem 0.42rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      font-weight: 600;
      color: #78716c;
      background: rgba(10, 10, 10, 0.05);
      border: 1px solid rgba(10, 10, 10, 0.10);
      border-radius: 6px;
      letter-spacing: 0;
    }
    .lnav-kbd-plus { opacity: 0.6; margin: 0 1px; }

    .lnav-theme {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      color: #44403c;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(10, 10, 10, 0.08);
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset;
    }
    .lnav-theme:hover {
      color: #6d28d9;
      background: #fff;
      transform: translateY(-1px) rotate(-8deg);
    }

    .lnav-subscribe {
      display: inline-flex;
      align-items: center;
      padding: 0.6rem 1.15rem;
      font-size: 0.88rem;
      font-weight: 700;
      color: #f5f1e8;
      background: #0a0a0a;
      border-radius: 999px;
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      box-shadow: 0 6px 18px rgba(10, 10, 10, 0.18);
    }
    .lnav-subscribe:hover {
      background: #1c1917;
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(10, 10, 10, 0.26);
      text-decoration: none;
    }

    /* ─── Responsive ─── */
    @media (max-width: 1100px) {
      .lnav-search-label { display: none; }
      .lnav-search { padding: 0.5rem 0.6rem; gap: 0.35rem; }
    }
    @media (max-width: 920px) {
      .lnav { gap: 0.6rem; }
      .lnav-name { display: none; }
      .lnav-pill { padding: 0.26rem; gap: 0.1rem; }
      .lnav-link { padding: 0.4rem 0.7rem; font-size: 0.82rem; }
      .lnav-link-tag { display: none; }
      .lnav-kbd { display: none; }
    }
    @media (max-width: 640px) {
      .lnav-pill { display: none; }
      .lnav-subscribe { padding: 0.5rem 0.85rem; font-size: 0.8rem; }
    }
  `]
})
export class LandingNavComponent {
  private readonly search = inject(SearchService);

  readonly links: NavLink[] = [
    { label: 'Home',    path: '/',        exact: true },
    { label: '.NET',    path: '/dotnet' },
    { label: 'Notes',   path: '/notes' },
    { label: 'Angular', path: '/angular', soon: true },
    { label: 'React',   path: '/react',   soon: true },
    { label: 'Blog',    path: '/blog' }
  ];

  openSearch(): void {
    this.search.open();
  }

  toggleTheme(): void {
    // Single-theme product for now. The toggle stays as a visual affordance
    // so the nav matches the codewithmukesh aesthetic; dark mode is a future task.
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    const isMod = e.ctrlKey || e.metaKey;
    if (isMod && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      this.search.open();
    }
  }
}
