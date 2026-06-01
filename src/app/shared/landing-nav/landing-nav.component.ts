import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { SearchService } from './search.service';
import { IconComponent, IconName } from '../icon/icon.component';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
  soon?: boolean;
}

interface ResourceItem {
  title: string;
  desc: string;
  path: string;
  fragment?: string;
  external?: boolean;
  icon: IconName;
  tag?: 'live' | 'soon' | 'free';
}

@Component({
  selector: 'app-landing-nav',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet, IconComponent],
  template: `
    <nav class="lnav" aria-label="Primary">
      <a routerLink="/" class="lnav-brand" aria-label="Learn Hub — Home">
        <span class="lnav-mark" aria-hidden="true">
          <app-icon name="brand" [size]="28" />
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

        <!-- ─── Resources mega-dropdown ─── -->
        <div class="lnav-drop" #dropRoot>
          <button type="button"
                  class="lnav-link lnav-drop-trigger"
                  [class.is-open]="resourcesOpen()"
                  (click)="toggleResources($event)"
                  (mouseenter)="hoverOpen()"
                  aria-haspopup="true"
                  [attr.aria-expanded]="resourcesOpen()"
                  aria-controls="lnav-resources-panel">
            <span class="lnav-link-label">Resources</span>
            <span class="lnav-drop-chevron"><app-icon name="chevron-down" [size]="11" /></span>
          </button>

          @if (resourcesOpen()) {
            <div class="lnav-drop-panel"
                 id="lnav-resources-panel"
                 role="menu"
                 (mouseleave)="hoverClose()">
              @for (r of resources; track r.title) {
                @if (r.external) {
                  <a class="lnav-drop-item"
                     [href]="r.path"
                     target="_blank"
                     rel="noopener"
                     role="menuitem"
                     (click)="closeResources()">
                    <ng-container *ngTemplateOutlet="dropContent; context: { $implicit: r }"></ng-container>
                  </a>
                } @else if (r.fragment) {
                  <a class="lnav-drop-item"
                     [routerLink]="r.path"
                     [fragment]="r.fragment"
                     role="menuitem"
                     (click)="closeResources()">
                    <ng-container *ngTemplateOutlet="dropContent; context: { $implicit: r }"></ng-container>
                  </a>
                } @else {
                  <a class="lnav-drop-item"
                     [routerLink]="r.path"
                     role="menuitem"
                     (click)="closeResources()">
                    <ng-container *ngTemplateOutlet="dropContent; context: { $implicit: r }"></ng-container>
                  </a>
                }
              }
            </div>
          }

          <ng-template #dropContent let-r>
            <span class="lnav-drop-icon" aria-hidden="true">
              <app-icon [name]="r.icon" [size]="18" />
            </span>
            <span class="lnav-drop-text">
              <span class="lnav-drop-title">
                {{ r.title }}
                @if (r.tag === 'live') { <span class="lnav-drop-tag lnav-drop-tag-live">live</span> }
                @if (r.tag === 'soon') { <span class="lnav-drop-tag lnav-drop-tag-soon">soon</span> }
                @if (r.tag === 'free') { <span class="lnav-drop-tag lnav-drop-tag-free">free</span> }
              </span>
              <span class="lnav-drop-desc">{{ r.desc }}</span>
            </span>
            <span class="lnav-drop-arrow" aria-hidden="true">→</span>
          </ng-template>
        </div>
      </div>

      <div class="lnav-actions">
        <button class="lnav-search" type="button" (click)="openSearch()" aria-label="Search">
          <span class="lnav-search-icon"><app-icon name="search" [size]="16" /></span>
          <span class="lnav-search-label">Search</span>
          <kbd class="lnav-kbd">Ctrl<span class="lnav-kbd-plus">·</span>K</kbd>
        </button>

        <button class="lnav-theme" type="button" (click)="toggleTheme()" aria-label="Toggle theme">
          <app-icon name="sun" [size]="18" />
        </button>

        <a routerLink="/" fragment="newsletter" class="lnav-subscribe">
          Subscribe
        </a>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      z-index: 30;
      /* Break out of whatever page wrapper we're dropped into (home 1180px,
         blog-list 1100px, blog-post 780px…) so the header renders at one
         identical width on every page. body has overflow-x:hidden, so the
         100vw band never adds a horizontal scrollbar. */
      width: 100vw;
      left: 50%;
      margin-left: -50vw;
    }

    /* Inside the .NET roadmap shell the nav sits in its own flex header bar
       next to the burger button — keep it in normal flow there. */
    :host(.app-header-nav) {
      width: auto;
      left: auto;
      margin-left: 0;
    }

    .lnav {
      display: flex;
      align-items: center;
      gap: 1rem;
      /* One canonical width + side padding, centered, on every page. */
      max-width: 1180px;
      margin: 0 auto;
      padding: 0.85rem clamp(1rem, 4vw, 2rem);
    }

    :host(.app-header-nav) .lnav {
      max-width: none;
      padding-left: 0;
      padding-right: 0;
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
      font-size: 1.0625rem;
      letter-spacing: -0.015em;
      line-height: 1.4;
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
      max-width: 100%;
    }

    .lnav-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.95rem;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.4;
      color: #44403c;
      text-decoration: none;
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.2s ease, background 0.2s ease;
      background: transparent;
      border: 0;
      cursor: pointer;
      font-family: inherit;
    }
    .lnav-link:hover { color: #0a0a0a; text-decoration: none; }
    .lnav-link.active { color: #f5f1e8; background: #0a0a0a; }
    .lnav-link-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.1rem 0.36rem;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.08);
      color: #57534e;
      line-height: 1.4;
    }
    .lnav-link.active .lnav-link-tag {
      background: rgba(245, 241, 232, 0.18);
      color: #f5f1e8;
    }
    .lnav-link.is-soon { color: #a8a29e; }
    .lnav-link.is-soon:hover { color: #44403c; }

    /* ─── Resources dropdown ─── */
    .lnav-drop {
      position: relative;
      display: inline-flex;
    }
    .lnav-drop-trigger { gap: 0.32rem; }
    .lnav-drop-trigger.is-open {
      background: rgba(10, 10, 10, 0.06);
      color: #0a0a0a;
    }
    .lnav-drop-chevron {
      display: inline-flex;
      transition: transform 0.2s ease, color 0.2s ease;
      color: #78716c;
    }
    .lnav-drop-trigger.is-open .lnav-drop-chevron {
      transform: rotate(180deg);
      color: #6d28d9;
    }

    /* Solid white panel — no transparency, no backdrop-filter, lifted above
       every page hero. Fixes the bleed-through issue on subject hero pages. */
    .lnav-drop-panel {
      position: absolute;
      top: calc(100% + 0.6rem);
      left: 50%;
      transform: translateX(-50%);
      width: min(360px, calc(100vw - 2rem));
      padding: 0.45rem;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      background: #ffffff;
      border: 1px solid rgba(10, 10, 10, 0.10);
      border-radius: 18px;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.95) inset,
        0 24px 56px rgba(15, 15, 15, 0.22),
        0 8px 20px rgba(15, 15, 15, 0.10);
      z-index: 1000;
      animation: dropFade 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes dropFade {
      from { opacity: 0; transform: translate(-50%, -6px); }
      to   { opacity: 1; transform: translate(-50%, 0); }
    }

    .lnav-drop-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.75rem 0.85rem;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: background 0.18s ease, transform 0.18s ease;
    }
    .lnav-drop-item:hover {
      background: rgba(109, 40, 217, 0.06);
      text-decoration: none;
    }
    .lnav-drop-item:hover .lnav-drop-arrow {
      color: #6d28d9;
      transform: translateX(3px);
    }
    .lnav-drop-item:hover .lnav-drop-icon {
      border-color: rgba(109, 40, 217, 0.35);
      color: #6d28d9;
      background: rgba(139, 92, 246, 0.12);
    }

    .lnav-drop-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px; height: 38px;
      border-radius: 10px;
      background: #faf7f0;
      border: 1px solid rgba(10, 10, 10, 0.08);
      color: #44403c;
      transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
    }

    .lnav-drop-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }
    .lnav-drop-title {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.9375rem;
      font-weight: 600;
      color: #0a0a0a;
      letter-spacing: 0;
      line-height: 1.4;
    }
    .lnav-drop-desc {
      font-size: 0.875rem;
      color: #78716c;
      font-weight: 500;
      letter-spacing: 0;
      margin-top: 2px;
      line-height: 1.45;
    }
    .lnav-drop-arrow {
      color: #a8a29e;
      font-weight: 700;
      transition: color 0.18s ease, transform 0.18s ease;
      flex-shrink: 0;
    }
    .lnav-drop-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.1rem 0.4rem;
      border-radius: 999px;
      line-height: 1.4;
    }
    .lnav-drop-tag-live {
      background: rgba(4, 120, 87, 0.10);
      color: #047857;
      border: 1px solid rgba(4, 120, 87, 0.28);
    }
    .lnav-drop-tag-soon {
      background: rgba(180, 83, 9, 0.10);
      color: #b45309;
      border: 1px solid rgba(180, 83, 9, 0.28);
    }
    .lnav-drop-tag-free {
      background: rgba(109, 40, 217, 0.10);
      color: #6d28d9;
      border: 1px solid rgba(109, 40, 217, 0.28);
    }

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
      font-size: 0.9375rem;
      font-weight: 500;
      line-height: 1.4;
      color: #44403c;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(10, 10, 10, 0.08);
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset;
      font-family: inherit;
    }
    .lnav-search:hover {
      color: #0a0a0a;
      background: #fff;
      transform: translateY(-1px);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 6px 18px rgba(15, 15, 15, 0.08);
    }
    .lnav-search-icon { display: inline-flex; color: #78716c; }
    .lnav-search:hover .lnav-search-icon { color: #6d28d9; }
    .lnav-search-label { letter-spacing: -0.005em; }
    .lnav-kbd {
      display: inline-flex;
      align-items: center;
      gap: 1px;
      padding: 0.18rem 0.42rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #78716c;
      background: rgba(10, 10, 10, 0.05);
      border: 1px solid rgba(10, 10, 10, 0.10);
      border-radius: 6px;
      letter-spacing: 0.02em;
      line-height: 1.4;
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
      padding: 0.6rem 1.2rem;
      font-size: 0.9375rem;
      font-weight: 700;
      line-height: 1.4;
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
      .lnav-link { padding: 0.4rem 0.7rem; font-size: 0.875rem; }
      .lnav-link-tag { display: none; }
      .lnav-kbd { display: none; }
      .lnav-drop-panel { width: 320px; }
    }
    @media (max-width: 640px) {
      .lnav-pill { display: none; }
      .lnav-subscribe { padding: 0.5rem 0.95rem; font-size: 0.875rem; }
    }
  `]
})
export class LandingNavComponent {
  private readonly search = inject(SearchService);
  private readonly router = inject(Router);
  private readonly dropRoot = viewChild<ElementRef<HTMLElement>>('dropRoot');

  readonly links: NavLink[] = [
    { label: 'Home',    path: '/',        exact: true },
    { label: 'Courses', path: '/courses' },
    { label: 'Notes',   path: '/notes' },
    { label: 'Blog',    path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly resources: ResourceItem[] = [
    {
      title: '.NET Roadmap',
      desc:  '9-Phase Interview Prep · Start Here',
      path:  '/dotnet',
      icon:  'rocket',
      tag:   'live'
    },
    {
      title: 'Interview PDFs',
      desc:  '475+ Pages · 275+ Questions · Free',
      path:  '/notes',
      icon:  'pdf',
      tag:   'free'
    },
    {
      title: 'Blog & Field Notes',
      desc:  'Post-Mortems, Write-Ups, Ship Logs',
      path:  '/blog',
      icon:  'box'
    },
    {
      title: 'Newsletter',
      desc:  'Weekly Drops · No Spam, Just Signal',
      path:  '/',
      fragment: 'newsletter',
      icon: 'mail'
    }
  ];

  readonly resourcesOpen = signal(false);
  private hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.closeResources());
  }

  toggleResources(e: Event): void {
    e.stopPropagation();
    this.resourcesOpen.update(v => !v);
  }

  hoverOpen(): void {
    if (this.hoverCloseTimer) {
      clearTimeout(this.hoverCloseTimer);
      this.hoverCloseTimer = null;
    }
    this.resourcesOpen.set(true);
  }

  hoverClose(): void {
    this.hoverCloseTimer = setTimeout(() => this.resourcesOpen.set(false), 160);
  }

  closeResources(): void {
    this.resourcesOpen.set(false);
  }

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
    if (e.key === 'Escape' && this.resourcesOpen()) {
      this.closeResources();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.resourcesOpen()) return;
    const root = this.dropRoot()?.nativeElement;
    if (root && !root.contains(e.target as Node)) {
      this.closeResources();
    }
  }
}
