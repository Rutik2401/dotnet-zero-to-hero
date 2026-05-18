import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../../shared/landing-footer/landing-footer.component';

@Component({
  selector: 'app-angular-home',
  imports: [RouterLink, LandingNavComponent, LandingFooterComponent],
  template: `
    <div class="landing-bg" aria-hidden="true"></div>
    <div class="landing-grid" aria-hidden="true"></div>

    <div class="wrap">
      <app-landing-nav />

      <section class="hero">
        <p class="eyebrow">In progress · Coming soon</p>
        <h1 class="title">
          Modern Angular,<br>
          <span class="accent">Phase by Phase.</span>
        </h1>
        <p class="sub">
          Standalone components, signals, control flow, RxJS deep-dive, OnPush strategy,
          modern routing, deferrable views and SSR — the Angular 19+ stack as senior engineers
          actually write it.
        </p>
        <div class="stats">
          <span><strong>8+</strong> phases planned</span>
          <span class="dot">·</span>
          <span><strong>Angular 19+</strong></span>
          <span class="dot">·</span>
          <span class="free-pill">Free forever</span>
        </div>
        <div class="cta-row">
          <a routerLink="/dotnet" class="btn btn-primary">Open .NET Roadmap <span aria-hidden="true">→</span></a>
          <a routerLink="/notes" class="btn btn-ghost">Browse notes</a>
        </div>
      </section>

      <section class="section">
        <p class="sec-label">01 — WHAT'S COMING</p>
        <h2 class="sec-title">The Roadmap.</h2>
        <ul class="phase-list">
          <li><span class="phase-num">00</span> Angular fundamentals · components, templates, directives</li>
          <li><span class="phase-num">01</span> Modern Angular · standalone, signals, control flow</li>
          <li><span class="phase-num">02</span> RxJS deep-dive · operators, schedulers, real patterns</li>
          <li><span class="phase-num">03</span> Change detection · OnPush, signals, zoneless</li>
          <li><span class="phase-num">04</span> State management · signals vs NgRx vs services</li>
          <li><span class="phase-num">05</span> Routing &amp; guards · functional guards, lazy, defer</li>
          <li><span class="phase-num">06</span> Forms &amp; validation · template vs reactive vs signal forms</li>
          <li><span class="phase-num">07</span> SSR &amp; hybrid rendering · server, prerender, hydration</li>
        </ul>
      </section>
    </div>

    <app-landing-footer />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .landing-bg, .landing-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .landing-bg {
      background:
        radial-gradient(45rem 30rem at 14% -8%, rgba(220, 38, 38, 0.06), transparent 60%),
        radial-gradient(50rem 32rem at 100% 100%, rgba(139, 92, 246, 0.05), transparent 60%);
    }
    .landing-grid {
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.6;
    }

    .wrap { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2rem); }

    .hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }
    .eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.12em; color: var(--danger);
      text-transform: uppercase; margin: 0 0 1.2rem; font-weight: 700;
      line-height: 1.5;
    }
    .title {
      font-size: clamp(2.2rem, 5.5vw, 3.75rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 1.5rem; max-width: 820px; text-wrap: balance;
      color: var(--text);
    }
    .accent { color: var(--danger); }
    .sub {
      color: var(--text-soft);
      font-size: clamp(1.0625rem, 1.5vw, 1.1875rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.75rem;
    }
    .stats {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 0.5rem 0.85rem; color: var(--text-soft); font-size: 0.9375rem;
      line-height: 1.5;
      margin-bottom: 1.85rem;
    }
    .stats strong { color: var(--text); font-weight: 700; }
    .stats .dot { color: var(--text-muted); }
    .stats .free-pill { display: inline-flex; align-items: center; gap: 0.4rem; }
    .stats .free-pill::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.16);
    }

    .cta-row { display: flex; flex-wrap: wrap; gap: 0.7rem; }
    .cta-row .btn { padding: 0.9rem 1.5rem; font-size: 0.9375rem; }

    .section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(4rem, 8vh, 6rem); }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--danger);
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
      line-height: 1.5;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(185, 28, 28, 0.45);
    }
    .sec-title {
      font-size: clamp(1.65rem, 3.4vw, 2.25rem);
      font-weight: 700; letter-spacing: -0.02em; line-height: 1.15;
      margin: 0 0 1.85rem; color: var(--text);
      padding: 0; border: 0;
    }

    .phase-list {
      list-style: none; padding: 0; margin: 0;
      display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 0.7rem;
    }
    .phase-list li {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 1.2rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-soft);
      box-shadow: var(--shadow-sm);
      font-size: 1rem;
      line-height: 1.5;
      transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .phase-list li:hover {
      border-color: rgba(185, 28, 28, 0.32);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .phase-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.04em;
      color: var(--text-muted); min-width: 28px;
      line-height: 1.5;
    }
  `]
})
export class AngularHomeComponent {}
