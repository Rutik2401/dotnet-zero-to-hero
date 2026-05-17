import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, LandingNavComponent],
  template: `
    <div class="landing-bg" aria-hidden="true"></div>
    <div class="landing-grid" aria-hidden="true"></div>

    <div class="wrap">
      <app-landing-nav />

      <section class="hero">
        <p class="eyebrow">Blog · Coming soon</p>
        <h1 class="title">
          short notes,<br>
          <span class="accent-mark">deep takes.</span>
        </h1>
        <p class="sub">
          Tutorials, post-mortems, and field notes on what I'm building, breaking and shipping.
          First posts drop after the .NET roadmap finishes.
        </p>
        <div class="cta-row">
          <a routerLink="/dotnet" class="btn-light">Open .NET Roadmap <span aria-hidden="true">→</span></a>
          <a routerLink="/" fragment="newsletter" class="btn-ghost">Get notified</a>
        </div>
      </section>

      <section class="section">
        <p class="sec-label">PLANNED</p>
        <h2 class="sec-title">what's coming.</h2>
        <ul class="post-list">
          <li><span class="post-dot"></span> EF Core change tracking — when it bites and how to spot it</li>
          <li><span class="post-dot"></span> ASP.NET Core middleware order — the one most tutorials get wrong</li>
          <li><span class="post-dot"></span> JWT vs cookie auth — what I actually use in production</li>
          <li><span class="post-dot"></span> Postgres + EF Core — the indexes nobody explains</li>
          <li><span class="post-dot"></span> Angular signals — three patterns I lift from .NET</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #07091a; color: #f8fafc; }

    .landing-bg, .landing-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .landing-bg {
      background-image:
        radial-gradient(circle at 18% 12%, rgba(99, 102, 241, 0.16) 0%, transparent 38%),
        radial-gradient(circle at 82% 88%, rgba(6, 182, 212, 0.12) 0%, transparent 42%);
    }
    .landing-grid {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
    }

    .wrap { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2rem); }

    .hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }
    .eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.16em; color: #818cf8;
      text-transform: uppercase; margin: 0 0 1.25rem; font-weight: 600;
    }
    .title {
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 800; letter-spacing: -0.035em; line-height: 0.98;
      margin: 0 0 1.75rem; max-width: 820px; text-wrap: balance;
    }
    .accent-mark {
      position: relative; display: inline-block; white-space: nowrap;
    }
    .accent-mark::after {
      content: ''; position: absolute;
      left: -0.05em; right: -0.05em; bottom: 0.06em;
      height: 0.22em;
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.55) 0%, rgba(139, 92, 246, 0.55) 100%);
      border-radius: 4px; z-index: -1;
    }
    .sub { color: #94a3b8; font-size: clamp(1.05rem, 1.6vw, 1.2rem); line-height: 1.7; max-width: 620px; margin: 0 0 2rem; }

    .cta-row { display: flex; flex-wrap: wrap; gap: 0.85rem; }
    .btn-light {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.85rem 1.5rem; background: #f8fafc; color: #07091a;
      font-weight: 700; border-radius: 999px; text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-light:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255, 255, 255, 0.16); }
    .btn-ghost {
      display: inline-flex; align-items: center; padding: 0.85rem 1.5rem;
      background: rgba(255, 255, 255, 0.04);
      color: #cbd5e1; font-weight: 600; border-radius: 999px;
      text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.1);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .btn-ghost:hover { color: #fff; background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

    .section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(4rem, 8vh, 6rem); }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.14em; color: #818cf8;
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(129, 140, 248, 0.5);
    }
    .sec-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800; letter-spacing: -0.025em; line-height: 1.1;
      margin: 0 0 2rem;
    }
    .post-list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .post-list li {
      display: flex; align-items: center; gap: 0.85rem;
      padding: 1rem 1.2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      color: #cbd5e1;
    }
    .post-dot {
      flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%;
      background: #818cf8; box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.16);
    }
  `]
})
export class BlogComponent {}
