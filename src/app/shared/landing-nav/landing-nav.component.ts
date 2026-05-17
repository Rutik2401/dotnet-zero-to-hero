import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  soon?: boolean;
}

interface NavCta {
  label: string;
  path: string;
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

      <div class="lnav-links">
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

      @if (cta(); as c) {
        <a [routerLink]="c.path" class="lnav-cta">
          {{ c.label }} <span aria-hidden="true">→</span>
        </a>
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }

    .lnav {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      flex-wrap: wrap;
    }

    /* Brand */
    .lnav-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .lnav-brand:hover { opacity: 0.85; }

    .lnav-brand-mark {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #06b6d4 100%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      font-weight: 900;
      color: #07091a;
      letter-spacing: -0.02em;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.32);
    }
    .lnav-brand-text {
      font-weight: 700;
      font-size: 0.98rem;
      letter-spacing: -0.01em;
      background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 60%, #67e8f9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* Links */
    .lnav-links {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-left: 0.5rem;
      flex: 1 1 auto;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .lnav-links::-webkit-scrollbar { display: none; }

    .lnav-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.85rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.2s, background 0.2s;
    }
    .lnav-link:hover { color: #f1f5f9; background: rgba(255, 255, 255, 0.04); }
    .lnav-link.active {
      color: #f8fafc;
      background: rgba(255, 255, 255, 0.06);
    }
    .lnav-link.active::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -6px;
      transform: translateX(-50%);
      width: 16px;
      height: 2px;
      border-radius: 2px;
      background: linear-gradient(90deg, #818cf8 0%, #67e8f9 100%);
    }

    .lnav-link-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.12rem 0.4rem;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.12);
      color: #cbd5e1;
      border: 1px solid rgba(148, 163, 184, 0.22);
    }
    .lnav-link.is-soon { color: #64748b; }
    .lnav-link.is-soon:hover { color: #cbd5e1; }

    /* CTA */
    .lnav-cta {
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
      margin-left: auto;
    }
    .lnav-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 22px rgba(255, 255, 255, 0.18);
    }

    @media (max-width: 720px) {
      .lnav { gap: 0.6rem; }
      .lnav-brand-text { display: none; }
      .lnav-cta { padding: 0.5rem 0.85rem; font-size: 0.8rem; }
      .lnav-links { margin-left: 0; gap: 0.15rem; }
      .lnav-link { padding: 0.45rem 0.7rem; font-size: 0.82rem; }
      .lnav-link-tag { display: none; }
    }
  `]
})
export class LandingNavComponent {
  cta = input<NavCta | null>(null);

  readonly links: NavLink[] = [
    { label: '.NET',    path: '/dotnet' },
    { label: 'Notes',   path: '/notes' },
    { label: 'Angular', path: '/angular', soon: true },
    { label: 'React',   path: '/react',   soon: true },
  ];
}
