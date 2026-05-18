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

    .page-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(2.5rem, 4vw, 3.5rem);
      align-items: center;
      padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem);
    }
    @media (min-width: 960px) {
      .page-hero { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); }
    }
    .hero-text { min-width: 0; }
    .page-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 1.1rem; font-weight: 600;
      line-height: 1.5;
    }
    .page-title {
      font-size: clamp(1.85rem, 4.4vw, 3rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 1.5rem; max-width: 820px; text-wrap: balance;
      color: var(--text);
    }
    .accent-mark { display: inline-block; }
    .page-sub {
      color: var(--text-soft);
      font-size: clamp(1.0625rem, 1.5vw, 1.1875rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.85rem;
    }
    .page-cta { display: flex; flex-wrap: wrap; gap: 0.7rem; }
    .page-cta .btn { padding: 0.9rem 1.5rem; font-size: 0.9375rem; }

    .page-section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(4rem, 8vh, 6rem); }
    .page-seclabel {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
      line-height: 1.5;
    }
    .page-seclabel::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(109, 40, 217, 0.4);
    }
    .page-sectitle {
      font-size: clamp(1.65rem, 3.4vw, 2.25rem);
      font-weight: 700; letter-spacing: -0.02em; line-height: 1.15;
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
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1.5;
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

    /* ─── HERO VISUAL — animated blog post preview card ─── */
    .hero-visual {
      position: relative;
      display: none;
      min-height: 320px;
      perspective: 1200px;
    }
    @media (min-width: 960px) { .hero-visual { display: block; } }

    .hv-glow {
      position: absolute;
      inset: 8% -10% 4% -4%;
      background:
        radial-gradient(45% 55% at 60% 50%, rgba(139, 92, 246, 0.38), transparent 70%),
        radial-gradient(40% 50% at 30% 80%, rgba(6, 182, 212, 0.22), transparent 70%);
      filter: blur(36px);
      z-index: 0;
      animation: hv-glow-pulse 7s ease-in-out infinite;
    }

    .hv-card {
      position: relative;
      z-index: 1;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem 1.6rem 1.75rem;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.9) inset,
        0 24px 50px -18px rgba(15, 15, 15, 0.35),
        0 14px 32px -12px rgba(109, 40, 217, 0.18);
      transform-origin: 60% 50%;
      opacity: 0;
      animation:
        hv-enter 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards,
        hv-float 7s ease-in-out 1.05s infinite alternate;
    }
    .hv-card:hover { animation-play-state: paused; }

    .hv-post-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
    }
    .hv-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--primary);
      background: rgba(109, 40, 217, 0.10);
      border: 1px solid rgba(109, 40, 217, 0.28);
      padding: 0.18rem 0.55rem;
      border-radius: 999px;
      line-height: 1.5;
    }
    .hv-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .hv-post-title {
      font-size: clamp(1.05rem, 1.4vw, 1.25rem);
      font-weight: 700; line-height: 1.25; letter-spacing: -0.015em;
      color: var(--text);
      margin: 0 0 0.85rem;
      text-wrap: balance;
    }
    .hv-post-line {
      font-size: 0.9375rem; line-height: 1.6;
      color: var(--text-soft);
      margin: 0 0 0.7rem;
      opacity: 0;
      transform: translateY(6px);
      animation: hv-type 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .hv-l1 { animation-delay: 0.55s; }
    .hv-l2 { animation-delay: 0.85s; }
    .hv-l3 { animation-delay: 1.15s; }
    .hv-c {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78em;
      padding: 0.06em 0.32em;
      border-radius: 6px;
      background: rgba(10, 10, 10, 0.05);
      color: var(--text);
    }
    .hv-progress {
      position: relative;
      height: 4px; width: 100%;
      background: rgba(10, 10, 10, 0.06);
      border-radius: 999px;
      margin-top: 1.1rem;
      overflow: hidden;
    }
    .hv-progress-bar {
      position: absolute; top: 0; bottom: 0; left: 0;
      height: 100%; width: 0;
      background: linear-gradient(90deg, var(--primary), var(--accent-2));
      border-radius: 999px;
      animation: hv-progress 2.4s ease-out 1.4s forwards;
    }

    .hv-badge {
      position: absolute;
      bottom: -1.1rem;
      right: clamp(0.5rem, 3vw, 2rem);
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 0.95rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em;
      color: var(--text);
      box-shadow: var(--shadow-md);
      line-height: 1.5;
      opacity: 0;
      transform: translateY(8px);
      animation: hv-badge-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
    }
    .hv-badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-2);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.18);
      animation: hv-pulse 2.2s ease-in-out infinite;
    }
    .hv-badge-sep { color: var(--text-muted); }

    @keyframes hv-enter {
      from { opacity: 0; transform: translateY(22px) rotate(-3deg); }
      to   { opacity: 1; transform: translateY(0)    rotate(-1.5deg); }
    }
    @keyframes hv-float {
      from { transform: translateY(0)     rotate(-1.5deg); }
      to   { transform: translateY(-12px) rotate(-0.6deg); }
    }
    @keyframes hv-glow-pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50%      { opacity: 1;   transform: scale(1.06); }
    }
    @keyframes hv-pulse {
      0%, 100% { box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.18); }
      50%      { box-shadow: 0 0 0 7px rgba(139, 92, 246, 0.06); }
    }
    @keyframes hv-type {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hv-badge-enter {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hv-progress {
      to { width: 65%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .hv-card, .hv-badge, .hv-glow, .hv-post-line, .hv-progress-bar, .hv-badge-dot {
        animation: none !important;
      }
      .hv-card, .hv-badge { opacity: 1; }
      .hv-card { transform: rotate(-1deg); }
      .hv-post-line { opacity: 1; transform: none; }
      .hv-progress-bar { width: 65%; }
    }
  `]
})
export class BlogComponent {}
