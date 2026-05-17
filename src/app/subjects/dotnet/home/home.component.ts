import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PhaseCard {
  vol: string;
  tag: string;
  title: string;
  desc: string;
  topics: number;
  hours: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL LEVELS';
  link: string;
  ready: boolean;
  coverIcon: string;
  coverGradient: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #07091a;
      color: #f8fafc;
    }

    /* ─── Ambient background ─── */
    .landing-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image:
        radial-gradient(circle at 18% 12%, rgba(99, 102, 241, 0.18) 0%, transparent 38%),
        radial-gradient(circle at 82% 88%, rgba(139, 92, 246, 0.16) 0%, transparent 42%),
        radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.10) 0%, transparent 55%);
    }
    .landing-grid {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
    }

    .landing-wrap {
      position: relative;
      z-index: 1;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    /* ─── Top nav ─── */
    .landing-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 0;
      gap: 1rem;
    }
    .landing-nav-left,
    .landing-nav-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .hub-back {
      display: inline-flex;
      align-items: center;
      padding: 0.45rem 0.85rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .hub-back:hover {
      color: #fff;
      background: rgba(99, 102, 241, 0.18);
      border-color: rgba(99, 102, 241, 0.4);
    }
    .landing-brand {
      font-weight: 700;
      letter-spacing: -0.01em;
      background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 60%, #67e8f9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.55rem 1.1rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #07091a;
      background: #f8fafc;
      border-radius: 999px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .nav-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(255, 255, 255, 0.18);
    }

    /* ─── Hero ─── */
    .landing-hero {
      padding: clamp(2.5rem, 8vh, 6rem) 0 clamp(2rem, 5vh, 4rem);
    }
    .landing-eyebrow {
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      color: #818cf8;
      text-transform: uppercase;
      margin: 0 0 1.25rem;
      font-weight: 600;
    }
    .landing-title {
      font-size: clamp(2.5rem, 8vw, 5.75rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 0.98;
      margin: 0 0 1.75rem;
      max-width: 900px;
      text-wrap: balance;
    }
    .landing-title .accent {
      background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 60%, #67e8f9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .landing-sub {
      color: #94a3b8;
      font-size: clamp(1.05rem, 1.6vw, 1.2rem);
      line-height: 1.7;
      max-width: 640px;
      margin: 0 0 2rem;
    }
    .landing-stats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.55rem 0.9rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }
    .landing-stats strong { color: #f8fafc; font-weight: 700; }
    .landing-stats .dot { color: #475569; }
    .landing-stats .free-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .landing-stats .free-pill::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
    }

    /* ─── Section header ─── */
    .landing-section { padding: clamp(2.5rem, 6vh, 4.5rem) 0; }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .section-label {
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      color: #818cf8;
      text-transform: uppercase;
      margin: 0;
      font-weight: 600;
    }
    .section-label::before {
      content: '';
      display: inline-block;
      width: 36px;
      height: 1px;
      background: rgba(129, 140, 248, 0.5);
    }
    .section-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #64748b;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
    }
    .section-meta::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.16);
    }
    .section-title {
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.05;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
    }

    /* ─── Phase cards grid ─── */
    .phase-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .phase-card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease,
                  box-shadow 0.3s ease,
                  background 0.3s ease;
    }
    .phase-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.035);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }
    .phase-card:hover .phase-cta { gap: 0.55rem; color: #fff; }
    .phase-card:hover .phase-cover-num { transform: translateY(-2px); }

    .phase-card-soon { opacity: 0.7; pointer-events: none; }
    .phase-card-soon:hover { transform: none; }

    /* Cover */
    .phase-cover {
      position: relative;
      height: 200px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .phase-cover::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 80% 90%, rgba(0, 0, 0, 0.35) 0%, transparent 65%);
      pointer-events: none;
    }
    .phase-cover-num {
      position: relative;
      z-index: 1;
      font-size: 5rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 0.85;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      align-self: flex-start;
    }
    .phase-cover-tag {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.78);
      align-self: flex-end;
      padding: 0.3rem 0.65rem;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
    }

    /* Body */
    .phase-body {
      padding: 1.4rem 1.4rem 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .phase-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #94a3b8;
      text-transform: uppercase;
      margin: 0 0 0.85rem;
    }
    .phase-meta .meta-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #475569;
    }
    .phase-meta .free { color: #6ee7b7; }
    .phase-title {
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      line-height: 1.25;
      margin: 0 0 0.5rem;
      color: #f8fafc;
    }
    .phase-desc {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.55;
      margin: 0 0 1.25rem;
    }
    .phase-hr {
      border: 0;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      margin: 0 0 1rem;
    }
    .phase-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      font-size: 0.85rem;
      color: #64748b;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.04em;
    }
    .phase-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: #a5b4fc;
      font-weight: 600;
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
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
    }
    .how-step-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem;
      letter-spacing: 0.14em;
      color: #818cf8;
      margin: 0 0 0.6rem;
    }
    .how-step-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 0.4rem;
      color: #f8fafc;
    }
    .how-step-desc {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.6;
      margin: 0;
    }

    /* ─── CTA band ─── */
    .cta-band {
      margin: clamp(3rem, 6vh, 5rem) 0 clamp(4rem, 8vh, 6rem);
      padding: clamp(2.5rem, 6vw, 4rem) clamp(1.75rem, 4vw, 3rem);
      border-radius: 24px;
      background:
        radial-gradient(circle at 80% 100%, rgba(167, 139, 250, 0.22) 0%, transparent 55%),
        radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 55%),
        rgba(15, 21, 48, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
    }
    .cta-band h3 {
      font-size: clamp(1.6rem, 3.5vw, 2.4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0 0 0.75rem;
    }
    .cta-band p {
      color: #cbd5e1;
      max-width: 540px;
      margin: 0 auto 1.75rem;
      line-height: 1.6;
    }
    .cta-band a {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.85rem 1.5rem;
      background: #f8fafc;
      color: #07091a;
      font-weight: 700;
      border-radius: 999px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-band a:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(255, 255, 255, 0.16);
    }

    @media (max-width: 640px) {
      .landing-nav { flex-wrap: wrap; }
      .landing-nav-right .nav-cta { padding: 0.45rem 0.85rem; font-size: 0.78rem; }
      .phase-cover { height: 160px; padding: 1.2rem; }
      .phase-cover-num { font-size: 3.5rem; }
      .section-head { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
    }
  `]
})
export class HomeComponent {
  readonly readyCount = 7;
  readonly totalPhases = 9;

  phases: PhaseCard[] = [
    {
      vol: '00', tag: 'PROGRAMMING + OOP',
      title: 'Programming + OOP',
      desc: 'Variables, loops, OOP fundamentals and SOLID. The foundation interviewers test before going deep.',
      topics: 8, hours: '12', level: 'BEGINNER',
      link: 'phase-0', ready: true,
      coverIcon: '0',
      coverGradient: 'linear-gradient(135deg, #1e293b 0%, #312e81 70%, #4338ca 100%)'
    },
    {
      vol: '01', tag: 'C# DEEP DIVE',
      title: 'C# Deep Dive',
      desc: 'CLR internals, value vs reference, LINQ, async/await, collections. The depth interviewers actually probe.',
      topics: 12, hours: '20', level: 'BEGINNER',
      link: 'phase-1', ready: true,
      coverIcon: 'C#',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '02', tag: 'ASP.NET CORE',
      title: 'ASP.NET Core',
      desc: 'Web API, middleware, DI, JWT auth, filters, model binding. Building real backends, not toy demos.',
      topics: 14, hours: '28', level: 'INTERMEDIATE',
      link: 'phase-2', ready: true,
      coverIcon: '.NET',
      coverGradient: 'linear-gradient(135deg, #312e81 0%, #6d28d9 60%, #a21caf 100%)'
    },
    {
      vol: '03', tag: 'SQL + EF CORE',
      title: 'SQL + EF Core',
      desc: 'Joins, indexes, normalization, EF Core, migrations, N+1, tracking vs no-tracking, real query optimisation.',
      topics: 12, hours: '22', level: 'INTERMEDIATE',
      link: 'phase-3', ready: true,
      coverIcon: 'SQL',
      coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)'
    },
    {
      vol: '04', tag: 'ADVANCED + DESIGN',
      title: 'Advanced + System Design',
      desc: 'Caching, Redis, design patterns, CQRS, microservices basics, API gateway, load balancing.',
      topics: 12, hours: '24', level: 'ADVANCED',
      link: 'phase-4', ready: true,
      coverIcon: '◆',
      coverGradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #c026d3 100%)'
    },
    {
      vol: '05', tag: 'MODERN ANGULAR',
      title: 'Modern Angular',
      desc: 'Standalone, signals, control flow, RxJS, OnPush, SSR. Angular as senior engineers actually write it.',
      topics: 10, hours: '14', level: 'INTERMEDIATE',
      link: 'phase-5', ready: true,
      coverIcon: 'NG',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '06', tag: 'DEVOPS + DEPLOY',
      title: 'DevOps + Deployment',
      desc: 'Git, CI/CD, GitHub Actions, Docker, IIS hosting, Azure App Service. End-to-end shipping.',
      topics: 9, hours: '15', level: 'INTERMEDIATE',
      link: 'phase-6', ready: true,
      coverIcon: '⚙',
      coverGradient: 'linear-gradient(135deg, #134e4a 0%, #0d9488 70%, #14b8a6 100%)'
    },
    {
      vol: '07', tag: 'PROJECTS',
      title: 'Portfolio Projects',
      desc: 'Three real projects — E-commerce API, Employee Management, Microservice — each with auth, logging, caching.',
      topics: 3, hours: '40', level: 'ALL LEVELS',
      link: 'phase-7', ready: false,
      coverIcon: '◑',
      coverGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 70%, #4b5563 100%)'
    },
    {
      vol: '08', tag: 'INTERVIEW PREP',
      title: 'Interview Preparation',
      desc: 'DSA daily, .NET Q&A drilling, project explanation drills, whiteboard coding, mock interviews.',
      topics: 50, hours: '20', level: 'ALL LEVELS',
      link: 'phase-8', ready: false,
      coverIcon: '★',
      coverGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 70%, #4b5563 100%)'
    }
  ];

  get activePhases(): PhaseCard[] {
    return this.phases.filter(p => p.ready);
  }

  get upcomingPhases(): PhaseCard[] {
    return this.phases.filter(p => !p.ready);
  }
}
