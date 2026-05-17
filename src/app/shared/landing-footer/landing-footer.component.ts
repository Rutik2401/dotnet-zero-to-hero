import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs/operators';
import { IconComponent, IconName } from '../icon/icon.component';

interface FooterLink { label: string; path: string; fragment?: string; external?: boolean; soon?: boolean; live?: boolean; }
interface FooterCol  { title: string; links: FooterLink[]; }

interface Social { label: string; href: string; icon: IconName; }

type PageContext = 'home' | 'dotnet' | 'phase' | 'notes' | 'blog' | 'angular' | 'react' | 'default';

interface ContextStrip {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaPath: string;
  ctaFragment?: string;
}

@Component({
  selector: 'app-landing-footer',
  imports: [RouterLink, IconComponent],
  template: `
    <footer class="lfoot" aria-labelledby="lfoot-heading">
      <h2 id="lfoot-heading" class="visually-hidden">Site footer</h2>

      <!-- ─── Contextual top strip — changes with the route ─── -->
      <div class="lfoot-strip">
        <div class="lfoot-strip-inner">
          <div class="lfoot-strip-text">
            <p class="lfoot-strip-eyebrow">{{ strip().eyebrow }}</p>
            <p class="lfoot-strip-title">{{ strip().title }}</p>
          </div>
          @if (strip().ctaFragment) {
            <a [routerLink]="strip().ctaPath"
               [fragment]="strip().ctaFragment!"
               class="lfoot-strip-cta">
              {{ strip().ctaLabel }} <span aria-hidden="true">→</span>
            </a>
          } @else {
            <a [routerLink]="strip().ctaPath" class="lfoot-strip-cta">
              {{ strip().ctaLabel }} <span aria-hidden="true">→</span>
            </a>
          }
        </div>
      </div>

      <!-- ─── Main grid ─── -->
      <div class="lfoot-inner">
        <div class="lfoot-brand">
          <a routerLink="/" class="lfoot-mark" aria-label="Learn Hub — Home">
            <span class="lfoot-mark-svg" aria-hidden="true">
              <app-icon name="brand" tone="bright" [size]="28" />
            </span>
            <span class="lfoot-wordmark">
              <span class="lfoot-wordmark-soft">learn</span><span class="lfoot-wordmark-bold">hub</span>
            </span>
          </a>
          <p class="lfoot-tagline">
            Roadmaps and battle-tested notes for product-company interviews.
            Built in public — one topic at a time.
          </p>

          <div class="lfoot-status" role="status">
            <span class="lfoot-status-dot" aria-hidden="true"></span>
            <span class="lfoot-status-text">All systems shipping · v{{ buildVersion }}</span>
          </div>

          <div class="lfoot-social" role="list">
            @for (s of socials; track s.label) {
              <a class="lfoot-social-link"
                 [href]="s.href"
                 target="_blank"
                 rel="noopener"
                 [attr.aria-label]="s.label"
                 role="listitem">
                <app-icon [name]="s.icon" [size]="16" />
              </a>
            }
          </div>
        </div>

        @for (col of cols; track col.title) {
          <nav class="lfoot-col" [attr.aria-label]="col.title">
            <p class="lfoot-coltitle">{{ col.title }}</p>
            <ul class="lfoot-list">
              @for (l of col.links; track l.label) {
                <li>
                  @if (l.external) {
                    <a [href]="l.path" target="_blank" rel="noopener" class="lfoot-link">
                      <span>{{ l.label }}</span>
                      @if (l.live) { <span class="lfoot-badge lfoot-badge-live">live</span> }
                      @if (l.soon) { <span class="lfoot-badge lfoot-badge-soon">soon</span> }
                    </a>
                  } @else if (l.fragment) {
                    <a [routerLink]="l.path" [fragment]="l.fragment" class="lfoot-link">
                      <span>{{ l.label }}</span>
                      @if (l.live) { <span class="lfoot-badge lfoot-badge-live">live</span> }
                      @if (l.soon) { <span class="lfoot-badge lfoot-badge-soon">soon</span> }
                    </a>
                  } @else {
                    <a [routerLink]="l.path" class="lfoot-link">
                      <span>{{ l.label }}</span>
                      @if (l.live) { <span class="lfoot-badge lfoot-badge-live">live</span> }
                      @if (l.soon) { <span class="lfoot-badge lfoot-badge-soon">soon</span> }
                    </a>
                  }
                </li>
              }
            </ul>
          </nav>
        }
      </div>

      <!-- ─── Bottom strip ─── -->
      <div class="lfoot-bottom">
        <div class="lfoot-bottom-inner">
          <p class="lfoot-copy">
            © {{ year }} <strong>Learn Hub</strong> · Built solo. Updated as I ship.
          </p>
          <div class="lfoot-meta">
            <a routerLink="/" fragment="newsletter" class="lfoot-meta-link">Newsletter</a>
            <span class="lfoot-meta-dot" aria-hidden="true">·</span>
            <a href="https://github.com/rutikpimpale2401" target="_blank" rel="noopener" class="lfoot-meta-link">Source on GitHub</a>
            <span class="lfoot-meta-dot" aria-hidden="true">·</span>
            <a routerLink="/contact" class="lfoot-meta-link">Contact</a>
          </div>
        </div>
      </div>

      <!-- Decorative gradient orbs -->
      <span class="lfoot-orb lfoot-orb-1" aria-hidden="true"></span>
      <span class="lfoot-orb lfoot-orb-2" aria-hidden="true"></span>
    </footer>
  `,
  styles: [`
    :host { display: block; }

    .visually-hidden {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }

    /* ─── Shell ───
       Deep plum / purple-ink. Cream foreground text. Subtle starfield. */
    .lfoot {
      position: relative;
      margin-top: clamp(3rem, 6vh, 5rem);
      padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2.5rem) 0;
      background:
        radial-gradient(ellipse 90rem 40rem at 12% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
        radial-gradient(ellipse 70rem 36rem at 100% 100%, rgba(6, 182, 212, 0.10), transparent 60%),
        linear-gradient(180deg, #1e1b4b 0%, #1a1339 45%, #14102e 100%);
      color: #d4cfe8;
      overflow: hidden;
      isolation: isolate;
    }
    .lfoot::before {
      content: ''; position: absolute; inset: 0;
      background-image:
        radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
      background-size: 26px 26px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 85%);
      -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 85%);
      pointer-events: none;
      z-index: 0;
    }
    .lfoot::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.32), transparent);
      pointer-events: none;
    }

    .lfoot-orb {
      position: absolute; border-radius: 50%; filter: blur(60px);
      pointer-events: none; z-index: 0;
    }
    .lfoot-orb-1 {
      top: -80px; left: 8%; width: 280px; height: 280px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.28), transparent 70%);
    }
    .lfoot-orb-2 {
      bottom: 40px; right: 6%; width: 320px; height: 320px;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.16), transparent 70%);
    }

    /* ─── Contextual strip (changes per route) ─── */
    .lfoot-strip {
      position: relative; z-index: 1;
      max-width: 1180px;
      margin: 0 auto clamp(2rem, 4vw, 3rem);
    }
    .lfoot-strip-inner {
      display: flex; align-items: center; justify-content: space-between;
      gap: clamp(1rem, 3vw, 2.5rem); flex-wrap: wrap;
      padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2rem);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(167, 139, 250, 0.22);
      border-radius: 18px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.06) inset,
        0 12px 32px rgba(10, 5, 30, 0.30);
    }
    .lfoot-strip-text { min-width: 0; }
    .lfoot-strip-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.18em;
      text-transform: uppercase; font-weight: 600;
      color: #a78bfa;
      margin: 0 0 0.4rem;
    }
    .lfoot-strip-title {
      font-size: clamp(1.05rem, 1.6vw, 1.25rem);
      font-weight: 700; line-height: 1.35;
      color: #f5f1e8;
      margin: 0; letter-spacing: -0.01em;
    }
    .lfoot-strip-cta {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.7rem 1.25rem;
      font-size: 0.88rem; font-weight: 700;
      color: #1e1b4b;
      background: #f5f1e8;
      border-radius: 999px;
      text-decoration: none;
      white-space: nowrap;
      transition: gap 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      box-shadow: 0 8px 22px rgba(10, 5, 30, 0.35);
    }
    .lfoot-strip-cta:hover {
      gap: 0.7rem;
      background: #ffffff;
      color: #2e1065;
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(10, 5, 30, 0.45);
      text-decoration: none;
    }

    /* ─── Top grid: brand + columns ─── */
    .lfoot-inner {
      position: relative; z-index: 1;
      max-width: 1180px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr));
      gap: clamp(2rem, 4vw, 3.5rem);
      padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
    }

    /* Brand block */
    .lfoot-brand { min-width: 0; }
    .lfoot-mark {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: #f5f1e8;
      transition: opacity 0.2s ease;
    }
    .lfoot-mark:hover { opacity: 0.88; text-decoration: none; }
    .lfoot-mark-svg {
      display: inline-flex;
      filter: drop-shadow(0 4px 14px rgba(139, 92, 246, 0.55));
    }
    .lfoot-wordmark {
      font-size: 1.1rem;
      letter-spacing: -0.015em;
      color: #f5f1e8;
    }
    .lfoot-wordmark-soft { font-weight: 500; opacity: 0.78; }
    .lfoot-wordmark-bold { font-weight: 800; }

    .lfoot-tagline {
      margin: 1rem 0 1.2rem;
      max-width: 340px;
      font-size: 0.92rem;
      line-height: 1.65;
      color: #b8b2d1;
    }

    .lfoot-status {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.4rem 0.8rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; letter-spacing: 0.04em;
      color: #c4f0d8;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.30);
      border-radius: 999px;
      margin-bottom: 1.2rem;
    }
    .lfoot-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
      animation: lfoot-pulse 2.4s ease-in-out infinite;
    }
    @keyframes lfoot-pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25); }
      50%      { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.10); }
    }

    .lfoot-social {
      display: inline-flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .lfoot-social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px; height: 38px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.10);
      color: #c4bce0;
      transition: color 0.2s ease, transform 0.2s ease,
                  background 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease;
    }
    .lfoot-social-link:hover {
      color: #f5f1e8;
      background: rgba(167, 139, 250, 0.18);
      border-color: rgba(167, 139, 250, 0.50);
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(139, 92, 246, 0.25);
      text-decoration: none;
    }
    .lfoot-social-link svg { display: block; flex-shrink: 0; }

    /* Link columns */
    .lfoot-col { min-width: 0; }
    .lfoot-coltitle {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      color: #a78bfa;
      text-transform: uppercase;
      margin: 0 0 1.1rem;
      font-weight: 700;
    }
    .lfoot-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .lfoot-link {
      display: inline-flex; align-items: center; gap: 0.5rem;
      color: #c4bce0;
      font-size: 0.92rem;
      transition: color 0.2s ease, transform 0.2s ease;
      text-decoration: none;
    }
    .lfoot-link:hover {
      color: #f5f1e8;
      transform: translateX(3px);
      text-decoration: none;
    }
    .lfoot-badge {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.6rem; font-weight: 700;
      letter-spacing: 0.10em; text-transform: uppercase;
      padding: 0.12rem 0.42rem;
      border-radius: 999px;
      line-height: 1.4;
    }
    .lfoot-badge-live {
      background: rgba(16, 185, 129, 0.18);
      color: #6ee7b7;
      border: 1px solid rgba(16, 185, 129, 0.32);
    }
    .lfoot-badge-soon {
      background: rgba(245, 158, 11, 0.16);
      color: #fcd34d;
      border: 1px solid rgba(245, 158, 11, 0.32);
    }

    /* ─── Bottom strip ─── */
    .lfoot-bottom {
      position: relative; z-index: 1;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .lfoot-bottom-inner {
      max-width: 1180px;
      margin: 0 auto;
      padding: 1.4rem 0 1.6rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.85rem;
    }
    .lfoot-copy {
      margin: 0;
      font-size: 0.82rem;
      color: #8a82a5;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.02em;
    }
    .lfoot-copy strong { color: #d4cfe8; font-weight: 700; }

    .lfoot-meta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      font-size: 0.82rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .lfoot-meta-link {
      color: #b8b2d1;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .lfoot-meta-link:hover { color: #f5f1e8; text-decoration: none; }
    .lfoot-meta-dot { color: #5a5378; }

    /* ─── Responsive ─── */
    @media (max-width: 960px) {
      .lfoot-inner {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
      .lfoot-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 600px) {
      .lfoot-strip-inner { padding: 1.1rem 1.25rem; }
      .lfoot-strip-cta { width: 100%; justify-content: center; }
    }
    @media (max-width: 480px) {
      .lfoot-inner { grid-template-columns: 1fr; gap: 1.85rem; }
      .lfoot-bottom-inner { justify-content: flex-start; }
      .lfoot-orb-1, .lfoot-orb-2 { display: none; }
    }
  `]
})
export class LandingFooterComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly year = new Date().getFullYear();
  readonly buildVersion = '1.4';

  private readonly url = signal<string>(this.router.url);

  /** Updates on every successful navigation so the contextual strip stays in sync. */
  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.url.set(this.router.url));
  }

  /** Coarse page bucket for the contextual strip. */
  private readonly context = computed<PageContext>(() => {
    const u = this.url();
    if (u === '/' || u.startsWith('/?') || u.startsWith('/#')) return 'home';
    if (u.startsWith('/dotnet/phase')) return 'phase';
    if (u.startsWith('/dotnet')) return 'dotnet';
    if (u.startsWith('/notes')) return 'notes';
    if (u.startsWith('/blog')) return 'blog';
    if (u.startsWith('/angular')) return 'angular';
    if (u.startsWith('/react')) return 'react';
    return 'default';
  });

  /** Reactive content for the top strip — generic, stack-agnostic copy. */
  readonly strip = computed<ContextStrip>(() => {
    switch (this.context()) {
      case 'phase':
        return {
          eyebrow: 'Reading the roadmap',
          title:  'Pair this phase with the matching interview notes — same topics, printable, free.',
          ctaLabel: 'Open the notes',
          ctaPath: '/notes'
        };
      case 'dotnet':
      case 'angular':
      case 'react':
        return {
          eyebrow: 'Roadmaps · phase by phase',
          title:  'Bookmark the path. New phases drop with the newsletter — no spam, just signal.',
          ctaLabel: 'Subscribe',
          ctaPath: '/',
          ctaFragment: 'newsletter'
        };
      case 'notes':
        return {
          eyebrow: 'Free interview PDFs',
          title:  'Notes cover the questions. Roadmaps give you the depth — pick one and go phase by phase.',
          ctaLabel: 'Browse roadmaps',
          ctaPath: '/'
        };
      case 'blog':
        return {
          eyebrow: 'Field notes',
          title:  'Every post starts as a draft in the newsletter. Want the early version? Subscribe.',
          ctaLabel: 'Subscribe',
          ctaPath: '/',
          ctaFragment: 'newsletter'
        };
      case 'home':
      default:
        return {
          eyebrow: 'Built for the next round',
          title:  'Pick a roadmap. Drill the questions. Ship the projects. Updated as I ship.',
          ctaLabel: 'Subscribe',
          ctaPath: '/',
          ctaFragment: 'newsletter'
        };
    }
  });

  /** SaaS-style 4-column layout: no phase links, no churn-prone deep paths. */
  readonly cols: FooterCol[] = [
    {
      title: 'Product',
      links: [
        { label: '.NET Roadmap', path: '/dotnet',  live: true },
        { label: 'Notes & PDFs', path: '/notes',   live: true },
        { label: 'Blog',         path: '/blog' },
        { label: 'Angular',      path: '/angular', soon: true },
        { label: 'React',        path: '/react',   soon: true }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Newsletter',          path: '/', fragment: 'newsletter' },
        { label: 'Free Interview PDFs', path: '/notes' },
        { label: 'Roadmap overview',    path: '/dotnet' },
        { label: 'Search the site',     path: '/' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub',   path: 'https://github.com/rutikpimpale2401', external: true },
        { label: 'Twitter',  path: 'https://twitter.com/',                 external: true },
        { label: 'LinkedIn', path: 'https://www.linkedin.com/',            external: true },
        { label: 'Email',    path: 'mailto:codervibe61@gmail.com',         external: true }
      ]
    }
  ];

  readonly socials: Social[] = [
    { label: 'GitHub',      href: 'https://github.com/rutikpimpale2401',  icon: 'github'   },
    { label: 'Twitter / X', href: 'https://twitter.com/',                 icon: 'twitter'  },
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/',            icon: 'linkedin' },
    { label: 'YouTube',     href: 'https://www.youtube.com/',             icon: 'youtube'  },
    { label: 'Email',       href: 'mailto:codervibe61@gmail.com',         icon: 'mail'     }
  ];
}
