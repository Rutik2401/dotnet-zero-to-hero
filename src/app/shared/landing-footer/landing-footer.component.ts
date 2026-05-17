import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink { label: string; path: string; fragment?: string; external?: boolean; }
interface FooterCol  { title: string; links: FooterLink[]; }

type SocialKind = 'github' | 'twitter' | 'linkedin' | 'youtube' | 'email';
interface Social { label: string; href: string; kind: SocialKind; }

@Component({
  selector: 'app-landing-footer',
  imports: [RouterLink],
  template: `
    <footer class="lfoot">
      <div class="lfoot-inner">
        <div class="lfoot-brand">
          <a routerLink="/" class="lfoot-mark" aria-label="Learn Hub — Home">
            <span class="lfoot-mark-svg" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.5 L28.5 9.75 V22.25 L16 29.5 L3.5 22.25 V9.75 Z"
                      fill="#6d28d9" stroke="#5b21b6" stroke-width="1" stroke-linejoin="round"/>
                <path d="M11 11 V21 M11 16 H17 M17 11 V21" stroke="#f5f1e8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="lfoot-wordmark">
              <span class="lfoot-wordmark-soft">learn</span><span class="lfoot-wordmark-bold">hub</span>
            </span>
          </a>
          <p class="lfoot-tagline">
            Roadmaps and battle-tested notes for product-company interviews.
            .NET, Angular & React — phase by phase.
          </p>

          <div class="lfoot-social" role="list">
            @for (s of socials; track s.label) {
              <a class="lfoot-social-link"
                 [href]="s.href"
                 target="_blank"
                 rel="noopener"
                 [attr.aria-label]="s.label"
                 role="listitem">
                @switch (s.kind) {
                  @case ('github') {
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.28-1.67-1.28-1.67-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39s1.98.13 2.9.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                    </svg>
                  }
                  @case ('twitter') {
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/>
                    </svg>
                  }
                  @case ('linkedin') {
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
                    </svg>
                  }
                  @case ('youtube') {
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.46 3.5 12 3.5 12 3.5s-7.46 0-9.37.56A3.02 3.02 0 0 0 .5 6.2C0 8.12 0 12 0 12s0 3.88.5 5.8a3.02 3.02 0 0 0 2.13 2.14C4.54 20.5 12 20.5 12 20.5s7.46 0 9.37-.56A3.02 3.02 0 0 0 23.5 17.8C24 15.88 24 12 24 12s0-3.88-.5-5.8ZM9.6 15.6V8.4l6.27 3.6L9.6 15.6Z"/>
                    </svg>
                  }
                  @case ('email') {
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2"/>
                      <path d="m3 7 9 6 9-6"/>
                    </svg>
                  }
                }
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
                    <a [href]="l.path" target="_blank" rel="noopener">{{ l.label }}</a>
                  } @else if (l.fragment) {
                    <a [routerLink]="l.path" [fragment]="l.fragment">{{ l.label }}</a>
                  } @else {
                    <a [routerLink]="l.path">{{ l.label }}</a>
                  }
                </li>
              }
            </ul>
          </nav>
        }
      </div>

      <div class="lfoot-bottom">
        <p class="lfoot-copy">
          © {{ year }} <strong>Learn Hub</strong>. Built solo. Updated as I ship.
        </p>
        <a routerLink="/" fragment="newsletter" class="lfoot-cta">
          Subscribe to the newsletter <span aria-hidden="true">→</span>
        </a>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }

    .lfoot {
      position: relative;
      margin-top: clamp(3rem, 6vh, 5rem);
      padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2.5rem) 0;
      background: var(--bg-soft);
      border-top: 1px solid var(--border-chrome);
      color: var(--text-soft);
    }

    /* ─── Top grid: brand + columns ─── */
    .lfoot-inner {
      max-width: 1180px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr));
      gap: clamp(2rem, 4vw, 3.5rem);
      padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
    }

    /* Brand block */
    .lfoot-brand { min-width: 0; }
    .lfoot-mark {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      text-decoration: none;
      color: var(--text);
      transition: opacity 0.2s ease;
    }
    .lfoot-mark:hover { opacity: 0.85; text-decoration: none; }
    .lfoot-mark-svg {
      display: inline-flex;
      filter: drop-shadow(0 4px 10px rgba(109, 40, 217, 0.28));
    }
    .lfoot-wordmark {
      font-size: 1.05rem;
      letter-spacing: -0.015em;
      color: var(--text);
    }
    .lfoot-wordmark-soft { font-weight: 500; opacity: 0.85; }
    .lfoot-wordmark-bold { font-weight: 800; }

    .lfoot-tagline {
      margin: 1rem 0 1.4rem;
      max-width: 340px;
      font-size: 0.92rem;
      line-height: 1.6;
      color: var(--text-soft);
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
      width: 36px;
      height: 36px;
      border-radius: 999px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--text-soft);
      transition: color 0.2s ease, transform 0.2s ease,
                  background 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease;
      box-shadow: var(--shadow-sm);
    }
    .lfoot-social-link:hover {
      color: var(--primary);
      border-color: rgba(109, 40, 217, 0.35);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }
    .lfoot-social-link svg {
      display: block;
      flex-shrink: 0;
    }

    /* Link columns */
    .lfoot-col { min-width: 0; }
    .lfoot-coltitle {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      color: var(--text-muted);
      text-transform: uppercase;
      margin: 0 0 1rem;
      font-weight: 700;
    }
    .lfoot-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }
    .lfoot-list a {
      color: var(--text-soft);
      font-size: 0.92rem;
      transition: color 0.2s ease, padding-left 0.2s ease;
      display: inline-block;
      text-decoration: none;
    }
    .lfoot-list a:hover {
      color: var(--text);
      padding-left: 4px;
      text-decoration: none;
    }

    /* ─── Bottom strip ─── */
    .lfoot-bottom {
      max-width: 1180px;
      margin: 0 auto;
      padding: 1.25rem 0 1.5rem;
      border-top: 1px solid var(--border-chrome);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.85rem;
    }
    .lfoot-copy {
      margin: 0;
      font-size: 0.82rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.02em;
    }
    .lfoot-copy strong { color: var(--text-soft); font-weight: 700; }
    .lfoot-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text);
      text-decoration: none;
      transition: gap 0.2s ease, color 0.2s ease;
    }
    .lfoot-cta:hover {
      gap: 0.65rem;
      color: var(--primary);
      text-decoration: none;
    }

    /* ─── Responsive ─── */
    @media (max-width: 760px) {
      .lfoot-inner {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
      .lfoot-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 480px) {
      .lfoot-inner { grid-template-columns: 1fr; gap: 1.85rem; }
      .lfoot-bottom { justify-content: flex-start; }
    }
  `]
})
export class LandingFooterComponent {
  readonly year = new Date().getFullYear();

  readonly cols: FooterCol[] = [
    {
      title: 'Navigate',
      links: [
        { label: 'Home',          path: '/' },
        { label: '.NET Roadmap',  path: '/dotnet' },
        { label: 'Notes & PDFs',  path: '/notes' },
        { label: 'Angular',       path: '/angular' },
        { label: 'React',         path: '/react' },
        { label: 'Blog',          path: '/blog' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Newsletter',                 path: '/', fragment: 'newsletter' },
        { label: 'Interview PDFs',             path: '/notes' },
        { label: 'Phase 0 — Programming + OOP',path: '/dotnet/phase-0' },
        { label: 'Phase 2 — ASP.NET Core',     path: '/dotnet/phase-2' },
        { label: 'Phase 4 — System Design',    path: '/dotnet/phase-4' },
        { label: 'Phase 6 — DevOps',           path: '/dotnet/phase-6' }
      ]
    }
  ];

  readonly socials: Social[] = [
    { label: 'GitHub',      href: 'https://github.com/rutikpimpale2401',  kind: 'github'   },
    { label: 'Twitter / X', href: 'https://twitter.com/',                 kind: 'twitter'  },
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/',            kind: 'linkedin' },
    { label: 'YouTube',     href: 'https://www.youtube.com/',             kind: 'youtube'  },
    { label: 'Email',       href: 'mailto:codervibe61@gmail.com',         kind: 'email'    }
  ];
}
