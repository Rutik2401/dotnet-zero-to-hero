import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  soon?: boolean;
}

@Component({
  selector: 'app-landing-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="lnav" aria-label="Primary">
      <a routerLink="/" class="lnav-brand" aria-label="Learn Hub — Home">
        <span class="lnav-brand-mark" aria-hidden="true">LH</span>
        <span class="lnav-brand-text">Learn Hub</span>
      </a>

      <div class="lnav-pill">
        @for (l of links; track l.path) {
          <a [routerLink]="l.path"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: false }"
             class="lnav-link"
             [class.is-soon]="l.soon">
            <span class="lnav-link-label">{{ l.label }}</span>
            @if (l.soon) { <span class="lnav-link-tag">soon</span> }
          </a>
        }
      </div>

      <a routerLink="/" fragment="newsletter" class="lnav-subscribe">
        Subscribe <span aria-hidden="true">→</span>
      </a>
    </nav>
  `,
  styles: [`
    :host { display: block; }

    .lnav {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
    }

    /* Brand */
    .lnav-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      transition: opacity 0.2s;
      flex-shrink: 0;
    }
    .lnav-brand:hover { opacity: 0.85; }
    .lnav-brand-mark {
      width: 30px; height: 30px; border-radius: 9px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #06b6d4 100%);
      display: inline-flex; align-items: center; justify-content: center;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; font-weight: 900; color: #07091a;
      letter-spacing: -0.02em;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.32);
    }
    .lnav-brand-text {
      font-weight: 700; font-size: 0.98rem; letter-spacing: -0.01em;
      background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 60%, #67e8f9 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }

    /* Centered pill of links */
    .lnav-pill {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      padding: 0.3rem;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 999px;
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
      padding: 0.45rem 0.85rem;
      font-size: 0.86rem;
      font-weight: 600;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.2s, background 0.2s;
    }
    .lnav-link:hover { color: #f1f5f9; }
    .lnav-link.active {
      color: #07091a;
      background: #f8fafc;
    }
    .lnav-link-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.58rem; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 0.1rem 0.36rem;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.18);
      color: #cbd5e1;
    }
    .lnav-link.active .lnav-link-tag {
      background: rgba(7, 9, 26, 0.12);
      color: #07091a;
    }
    .lnav-link.is-soon { color: #64748b; }
    .lnav-link.is-soon:hover { color: #cbd5e1; }

    /* Subscribe — primary CTA */
    .lnav-subscribe {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1.15rem;
      font-size: 0.86rem;
      font-weight: 700;
      color: #07091a;
      background: #f8fafc;
      border-radius: 999px;
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.2s, box-shadow 0.2s;
      flex-shrink: 0;
    }
    .lnav-subscribe:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 22px rgba(255, 255, 255, 0.18);
    }

    @media (max-width: 860px) {
      .lnav { gap: 0.6rem; }
      .lnav-brand-text { display: none; }
      .lnav-pill { padding: 0.25rem; gap: 0.1rem; }
      .lnav-link { padding: 0.4rem 0.65rem; font-size: 0.8rem; }
      .lnav-link-tag { display: none; }
      .lnav-subscribe { padding: 0.5rem 0.85rem; font-size: 0.78rem; }
    }
  `]
})
export class LandingNavComponent {
  readonly links: NavLink[] = [
    { label: '.NET',    path: '/dotnet' },
    { label: 'Notes',   path: '/notes' },
    { label: 'Angular', path: '/angular', soon: true },
    { label: 'React',   path: '/react',   soon: true },
    { label: 'Blog',    path: '/blog' },
  ];
}
