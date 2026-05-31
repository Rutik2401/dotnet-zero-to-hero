import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../../shared/landing-nav/landing-nav.component';
import { TOPICS_IN_ORDER } from '../dotnet-topics';

interface PhaseCard {
  vol: string;
  tag: string;
  title: string;
  desc: string;
  topics: number;
  hours: string;
  level: string;
  link: string;
  ready: boolean;
  coverIcon: string;
  coverGradient: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, LandingNavComponent],
  templateUrl: './home.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    /* ─── Ambient ─── */
    .landing-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.6;
    }
    .landing-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background:
        radial-gradient(40rem 28rem at 14% -8%, rgba(139, 92, 246, 0.07), transparent 60%),
        radial-gradient(45rem 30rem at 100% 100%, rgba(245, 158, 11, 0.05), transparent 60%);
    }

    .landing-wrap {
      position: relative; z-index: 1;
      max-width: 1180px; margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    /* ─── Hero ─── */
    .landing-hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }
    .landing-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.12em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 1.25rem; font-weight: 700;
      line-height: 1.5;
    }
    .landing-title {
      font-size: clamp(2.2rem, 5.5vw, 3.75rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 1.6rem; max-width: 900px; text-wrap: balance;
      color: var(--text);
    }
    .landing-title .accent {
      color: var(--primary);
    }
    .landing-sub {
      color: var(--text-soft);
      font-size: clamp(1.0625rem, 1.5vw, 1.1875rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.75rem;
    }
    .landing-stats {
      display: flex; flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 0.85rem;
      color: var(--text-soft);
      font-size: 0.9375rem;
      line-height: 1.5;
    }
    .landing-stats strong { color: var(--text); font-weight: 700; }
    .landing-stats .dot { color: var(--text-muted); }
    .landing-stats .free-pill { display: inline-flex; align-items: center; gap: 0.4rem; }
    .landing-stats .free-pill::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.16);
    }

    /* ─── Section head ─── */
    .landing-section { padding: clamp(2.5rem, 6vh, 4rem) 0; }
    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 0.5rem;
    }
    .section-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--primary);
      text-transform: uppercase; margin: 0; font-weight: 600;
      line-height: 1.5;
    }
    .section-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(109, 40, 217, 0.45);
    }
    .section-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em; color: var(--text-muted);
      display: inline-flex; align-items: center; gap: 0.45rem;
      line-height: 1.5;
    }
    .section-meta::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.16);
    }
    .section-title {
      font-size: clamp(1.85rem, 4vw, 2.6rem);
      font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
      color: var(--text);
      padding: 0; border: 0;
    }

    /* ─── Phase cards ─── */
    .phase-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .phase-card {
      display: flex; flex-direction: column;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      text-decoration: none; color: inherit;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .phase-card:hover {
      transform: translateY(-6px);
      border-color: var(--border-strong);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 22px 48px rgba(15, 15, 15, 0.12);
    }
    .phase-card:hover .phase-cta { gap: 0.55rem; color: var(--text); }
    .phase-card:hover .phase-cover-num { transform: translateY(-2px); }

    .phase-card-soon { opacity: 0.82; pointer-events: none; }
    .phase-card-soon:hover { transform: none; }

    .phase-cover {
      position: relative; height: 200px; padding: 1.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      overflow: hidden;
    }
    .phase-cover::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 80% 90%, rgba(0, 0, 0, 0.30) 0%, transparent 65%);
      pointer-events: none;
    }
    .phase-cover-num {
      position: relative; z-index: 1;
      font-size: 3.5rem; font-weight: 800;
      letter-spacing: -0.03em; line-height: 0.95;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      align-self: flex-start;
    }
    .phase-cover-tag {
      position: relative; z-index: 1;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em; text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      align-self: flex-end;
      padding: 0.3rem 0.65rem;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      line-height: 1.5;
    }

    .phase-body {
      padding: 1.4rem 1.5rem 1.5rem;
      flex: 1;
      display: flex; flex-direction: column;
    }
    .phase-meta {
      display: flex; align-items: center; flex-wrap: wrap;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em;
      color: var(--text-muted);
      text-transform: uppercase; margin: 0 0 0.85rem;
      line-height: 1.5;
    }
    .phase-meta .meta-dot {
      width: 3px; height: 3px; border-radius: 50%; background: var(--text-muted);
    }
    .phase-meta .free { color: var(--accent); font-weight: 700; }
    .phase-title {
      font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em;
      line-height: 1.25; margin: 0 0 0.5rem; color: var(--text);
    }
    .phase-desc {
      color: var(--text-soft);
      font-size: 0.9375rem; line-height: 1.6;
      margin: 0 0 1.25rem;
    }
    .phase-hr {
      border: 0;
      border-top: 1px solid rgba(10, 10, 10, 0.06);
      margin: 0 0 1rem;
    }
    .phase-foot {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto;
      font-size: 0.8125rem; color: var(--text-muted);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.04em;
      line-height: 1.5;
    }
    .phase-cta {
      display: inline-flex; align-items: center; gap: 0.4rem;
      color: var(--primary); font-weight: 700;
      transition: gap 0.25s ease, color 0.25s ease;
    }

    /* ─── How-it-works ─── */
    .how-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }
    .how-step {
      padding: 1.6rem 1.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .how-step:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .how-step-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em;
      color: var(--primary); margin: 0 0 0.7rem; font-weight: 700;
      line-height: 1.5;
    }
    .how-step-title {
      font-size: 1.125rem; font-weight: 700; letter-spacing: -0.01em;
      margin: 0 0 0.45rem; color: var(--text);
      line-height: 1.35;
    }
    .how-step-desc {
      color: var(--text-soft);
      font-size: 0.9375rem; line-height: 1.6;
      margin: 0;
    }

    /* ─── CTA band — dark accent on cream page ─── */
    .cta-band {
      margin: clamp(3rem, 6vh, 5rem) 0 clamp(4rem, 8vh, 6rem);
      padding: clamp(2.5rem, 6vw, 4rem) clamp(1.75rem, 4vw, 3rem);
      border-radius: 24px;
      background: var(--text);
      color: var(--text-on-dark);
      text-align: center;
      box-shadow: 0 24px 60px rgba(10, 10, 10, 0.18),
                  0 8px 22px rgba(10, 10, 10, 0.10);
    }
    .cta-band h3 {
      color: var(--text-on-dark);
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      font-weight: 700; letter-spacing: -0.02em;
      margin: 0 0 0.75rem;
      line-height: 1.15;
      padding: 0; border: 0;
    }
    .cta-band p {
      color: rgba(245, 241, 232, 0.78);
      max-width: 540px; margin: 0 auto 1.75rem; line-height: 1.65;
      font-size: 1.0625rem;
    }
    .cta-band a {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.9rem 1.6rem;
      background: var(--bg);
      color: var(--text);
      font-weight: 700; font-size: 0.9375rem; line-height: 1.5;
      border-radius: 999px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .cta-band a:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 32px rgba(245, 241, 232, 0.22);
      text-decoration: none;
    }

    @media (max-width: 640px) {
      .phase-cover { height: 160px; padding: 1.2rem; }
      .phase-cover-num { font-size: 3rem; }
      .section-head { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
    }

    @media (max-width: 480px) {
      .landing-title { font-size: clamp(2rem, 8vw, 2.6rem); letter-spacing: -0.03em; line-height: 1.1; }
      .landing-sub { font-size: 1.0625rem; line-height: 1.6; }
      .landing-eyebrow { font-size: 0.8125rem; letter-spacing: 0.10em; margin-bottom: 1rem; }
      .landing-stats { font-size: 0.9375rem; gap: 0.4rem 0.65rem; }
    }
  `]
})
export class HomeComponent {
  /* Cards are generated from the topic registry — one source of truth shared
     with the routes, sidebar, search and sitemap. */
  phases: PhaseCard[] = TOPICS_IN_ORDER.map(t => ({
    vol: t.vol,
    tag: t.tag,
    title: t.cardTitle,
    desc: t.cardDesc,
    topics: t.topics,
    hours: t.hours,
    level: t.level,
    link: t.slug,
    ready: t.ready,
    coverIcon: t.coverIcon,
    coverGradient: t.coverGradient
  }));

  readonly totalPhases = this.phases.length;
  readonly readyCount = this.phases.filter(p => p.ready).length;

  get activePhases(): PhaseCard[]   { return this.phases.filter(p => p.ready); }
  get upcomingPhases(): PhaseCard[] { return this.phases.filter(p => !p.ready); }

  /** First ready topic — drives the hero CTA so it never points at a stale slug. */
  get firstTopic(): PhaseCard | undefined { return this.activePhases[0]; }
}
