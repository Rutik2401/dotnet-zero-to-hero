import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-angular-home',
  imports: [RouterLink],
  template: `
    <div class="landing-bg" aria-hidden="true"></div>
    <div class="landing-grid" aria-hidden="true"></div>

    <div class="wrap">
      <nav class="nav">
        <a routerLink="/" class="hub-back">← Learn Hub</a>
        <span class="nav-brand">Angular Roadmap</span>
      </nav>

      <section class="hero">
        <p class="eyebrow">In progress · Coming soon</p>
        <h1 class="title">
          modern angular,<br>
          <span class="accent">phase by phase.</span>
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
          <a routerLink="/dotnet" class="btn-primary">Open .NET Roadmap <span aria-hidden="true">→</span></a>
          <a routerLink="/notes" class="btn-ghost">Browse notes</a>
        </div>
      </section>

      <section class="section">
        <p class="sec-label">01 — WHAT'S COMING</p>
        <h2 class="sec-title">the roadmap.</h2>
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
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #07091a; color: #f8fafc; }

    .landing-bg, .landing-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .landing-bg {
      background-image:
        radial-gradient(circle at 18% 12%, rgba(220, 38, 38, 0.16) 0%, transparent 38%),
        radial-gradient(circle at 82% 88%, rgba(239, 68, 68, 0.14) 0%, transparent 42%);
    }
    .landing-grid {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
    }

    .wrap { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2rem); }

    .nav { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 0; }
    .hub-back {
      display: inline-flex; align-items: center; padding: 0.45rem 0.85rem;
      font-size: 0.8rem; font-weight: 600; color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px; text-decoration: none;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .hub-back:hover { color: #fff; background: rgba(220, 38, 38, 0.18); border-color: rgba(220, 38, 38, 0.45); }
    .nav-brand {
      font-weight: 700;
      background: linear-gradient(135deg, #fca5a5 0%, #ef4444 60%, #dc2626 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }

    .hero { padding: clamp(2.5rem, 8vh, 6rem) 0 clamp(2rem, 5vh, 4rem); }
    .eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.16em; color: #fca5a5;
      text-transform: uppercase; margin: 0 0 1.25rem; font-weight: 600;
    }
    .title {
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 800; letter-spacing: -0.035em; line-height: 0.98;
      margin: 0 0 1.75rem; max-width: 820px; text-wrap: balance;
    }
    .accent {
      background: linear-gradient(135deg, #fca5a5 0%, #ef4444 60%, #dc2626 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .sub { color: #94a3b8; font-size: clamp(1.05rem, 1.6vw, 1.2rem); line-height: 1.7; max-width: 620px; margin: 0 0 2rem; }
    .stats { display: flex; flex-wrap: wrap; align-items: center; gap: 0.55rem 0.9rem; color: #cbd5e1; font-size: 0.95rem; margin-bottom: 2rem; }
    .stats strong { color: #f8fafc; font-weight: 700; }
    .stats .dot { color: #475569; }
    .stats .free-pill { display: inline-flex; align-items: center; gap: 0.4rem; }
    .stats .free-pill::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
      background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
    }

    .cta-row { display: flex; flex-wrap: wrap; gap: 0.85rem; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.85rem 1.5rem; background: #f8fafc; color: #07091a;
      font-weight: 700; border-radius: 999px; text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(255, 255, 255, 0.16); }
    .btn-ghost {
      display: inline-flex; align-items: center;
      padding: 0.85rem 1.5rem; background: rgba(255, 255, 255, 0.04);
      color: #cbd5e1; font-weight: 600; border-radius: 999px;
      text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.1);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .btn-ghost:hover { color: #fff; background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

    .section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(4rem, 8vh, 6rem); }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.14em; color: #fca5a5;
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(252, 165, 165, 0.5);
    }
    .sec-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800; letter-spacing: -0.025em; line-height: 1.1;
      margin: 0 0 2rem;
    }
    .phase-list {
      list-style: none; padding: 0; margin: 0;
      display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 0.65rem;
    }
    .phase-list li {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 1.2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      color: #cbd5e1;
      transition: border-color 0.2s, background 0.2s;
    }
    .phase-list li:hover {
      border-color: rgba(220, 38, 38, 0.3);
      background: rgba(220, 38, 38, 0.04);
    }
    .phase-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.85rem; font-weight: 800; letter-spacing: 0.04em;
      color: #ef4444; min-width: 28px;
    }
  `]
})
export class AngularHomeComponent {}
