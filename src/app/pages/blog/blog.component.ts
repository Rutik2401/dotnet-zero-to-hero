import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, LandingNavComponent, LandingFooterComponent],
  templateUrl: './blog.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .page-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.6;
    }
    .page-wrap {
      position: relative; z-index: 1;
      max-width: 1080px; margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    .page-hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }
    .page-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.16em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 1.1rem; font-weight: 600;
    }
    .page-title {
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 0.98;
      margin: 0 0 1.5rem; max-width: 820px; text-wrap: balance;
      color: var(--text);
    }
    .accent-mark { position: relative; display: inline-block; }
    .accent-mark::after {
      content: ''; position: absolute;
      left: 0; right: 0; bottom: 0.04em;
      height: 0.18em;
      background: linear-gradient(90deg, var(--primary) 0%, var(--accent-2) 100%);
      border-radius: 4px; z-index: -1; opacity: 0.85;
    }
    .page-sub {
      color: var(--text-soft);
      font-size: clamp(1.05rem, 1.5vw, 1.18rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.85rem;
    }
    .page-cta { display: flex; flex-wrap: wrap; gap: 0.7rem; }
    .page-cta .btn { padding: 0.9rem 1.5rem; font-size: 0.95rem; }

    .page-section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(4rem, 8vh, 6rem); }
    .page-seclabel {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.14em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
    }
    .page-seclabel::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(109, 40, 217, 0.4);
    }
    .page-sectitle {
      font-size: clamp(1.85rem, 4vw, 2.6rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
      margin: 0 0 1.75rem; color: var(--text);
      padding: 0; border: 0;
    }

    .post-list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 0.6rem;
    }
    .post-list li {
      display: flex; align-items: center; gap: 0.85rem;
      padding: 1rem 1.2rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-soft);
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .post-list li:hover {
      border-color: var(--border-strong);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .post-dot {
      flex-shrink: 0; width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-2); box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.18);
    }
  `]
})
export class BlogComponent {}
