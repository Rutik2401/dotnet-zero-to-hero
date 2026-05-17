import { Component } from '@angular/core';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';

interface NoteCard {
  vol: string;
  slug: string;
  title: string;
  shortTag: string;
  level: string;
  description: string;
  topics: string[];
  pages: string;
  questions: string;
  updated: string;
  pdfPath: string;
  pdfSize: string;
  fileName: string;
  coverInitials: string;
  coverGradient: string;
}

@Component({
  selector: 'app-notes',
  imports: [LandingNavComponent, LandingFooterComponent],
  templateUrl: './notes.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .landing-bg, .landing-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .landing-bg {
      background:
        radial-gradient(45rem 28rem at 12% -8%, rgba(180, 83, 9, 0.06), transparent 60%),
        radial-gradient(50rem 32rem at 100% 100%, rgba(139, 92, 246, 0.05), transparent 60%);
    }
    .landing-grid {
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.6;
    }

    .wrap {
      position: relative; z-index: 1;
      max-width: 1180px; margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(2.5rem, 4vw, 3.5rem);
      align-items: center;
      padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem);
    }
    @media (min-width: 960px) {
      .hero { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); }
    }
    .hero-text { min-width: 0; }

    /* ─── HERO VISUAL — animated PDF document mockup ─── */
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
        radial-gradient(45% 55% at 60% 50%, rgba(245, 158, 11, 0.35), transparent 70%),
        radial-gradient(40% 50% at 30% 80%, rgba(180, 83, 9, 0.18), transparent 70%);
      filter: blur(36px);
      z-index: 0;
      animation: hv-glow-pulse 7s ease-in-out infinite;
    }

    .hv-card {
      position: relative;
      z-index: 1;
      background: #fffdf8;
      border: 1px solid rgba(180, 83, 9, 0.18);
      border-radius: 14px;
      overflow: hidden;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.9) inset,
        0 30px 60px -20px rgba(15, 15, 15, 0.18),
        0 14px 32px -12px rgba(180, 83, 9, 0.28);
      transform-origin: 60% 50%;
      opacity: 0;
      animation:
        hv-enter 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards,
        hv-float 7s ease-in-out 1.05s infinite alternate;
    }
    .hv-card:hover { animation-play-state: paused; }

    .hv-bar {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.7rem 0.95rem;
      background: rgba(180, 83, 9, 0.06);
      border-bottom: 1px solid rgba(180, 83, 9, 0.18);
    }
    .hv-icon {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.18rem 0.45rem;
      border-radius: 6px;
      background: var(--warn);
      color: #fff;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; font-weight: 700; letter-spacing: 0.08em;
    }
    .hv-file {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem;
      color: var(--text-soft);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hv-pages {
      margin-left: auto;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      background: rgba(180, 83, 9, 0.10);
      border: 1px solid rgba(180, 83, 9, 0.22);
      color: var(--warn);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.64rem; font-weight: 700; letter-spacing: 0.10em;
      white-space: nowrap;
    }

    .hv-body {
      padding: 1.25rem 1.4rem 1.6rem;
      background: #fffdf8;
    }
    .hv-doc-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; letter-spacing: 0.18em;
      color: var(--warn); text-transform: uppercase;
      font-weight: 700;
      margin: 0 0 0.85rem;
    }
    .hv-toc {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }
    .hv-toc-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      border-top: 1px solid rgba(180, 83, 9, 0.10);
      opacity: 0;
      transform: translateX(-4px);
      animation: hv-type 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .hv-toc-item:first-child { border-top: 0; }
    .hv-toc-item:nth-child(1) { animation-delay: 0.55s; }
    .hv-toc-item:nth-child(2) { animation-delay: 0.80s; }
    .hv-toc-item:nth-child(3) { animation-delay: 1.05s; }
    .hv-toc-item:nth-child(4) { animation-delay: 1.30s; }
    .hv-toc-item:nth-child(5) { animation-delay: 1.55s; }
    .hv-toc-num {
      flex-shrink: 0;
      width: 22px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; font-weight: 700;
      color: var(--warn);
    }
    .hv-toc-text {
      flex: 1; min-width: 0;
      font-size: 0.86rem;
      font-weight: 500;
      color: var(--text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hv-toc-page {
      flex-shrink: 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; font-weight: 700;
      color: var(--text-muted);
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
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
      color: var(--text);
      box-shadow: var(--shadow-md);
      opacity: 0;
      transform: translateY(8px);
      animation: hv-badge-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
    }
    .hv-badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--warn);
      box-shadow: 0 0 0 4px rgba(180, 83, 9, 0.16);
      animation: hv-pulse 2.2s ease-in-out infinite;
    }
    .hv-badge-sep { color: var(--text-muted); }

    @keyframes hv-enter {
      from { opacity: 0; transform: translateY(22px) rotate(3deg); }
      to   { opacity: 1; transform: translateY(0)    rotate(1.5deg); }
    }
    @keyframes hv-float {
      from { transform: translateY(0)     rotate(1.5deg); }
      to   { transform: translateY(-12px) rotate(0.6deg); }
    }
    @keyframes hv-glow-pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50%      { opacity: 1;   transform: scale(1.06); }
    }
    @keyframes hv-pulse {
      0%, 100% { box-shadow: 0 0 0 4px rgba(180, 83, 9, 0.16); }
      50%      { box-shadow: 0 0 0 7px rgba(180, 83, 9, 0.06); }
    }
    @keyframes hv-type {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes hv-badge-enter {
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .hv-card, .hv-badge, .hv-glow, .hv-toc-item, .hv-badge-dot {
        animation: none !important;
      }
      .hv-card, .hv-badge { opacity: 1; }
      .hv-card { transform: rotate(1deg); }
      .hv-toc-item { opacity: 1; transform: none; }
    }
    .eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.18em; color: var(--warn);
      text-transform: uppercase; margin: 0 0 1.25rem; font-weight: 700;
    }
    .title {
      font-size: clamp(2.6rem, 8.5vw, 6rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 0.98;
      margin: 0 0 1.6rem; max-width: 920px; text-wrap: balance;
      color: var(--text);
    }
    .accent { color: var(--warn); }
    .sub {
      color: var(--text-soft);
      font-size: clamp(1.05rem, 1.5vw, 1.2rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.75rem;
    }
    .stats {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 0.5rem 0.85rem;
      color: var(--text-soft);
      font-size: 0.94rem;
    }
    .stats strong { color: var(--text); font-weight: 700; }
    .stats .dot { color: var(--text-muted); }
    .stats .free-pill { display: inline-flex; align-items: center; gap: 0.4rem; }
    .stats .free-pill::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.16);
    }

    .section { padding: clamp(2rem, 6vh, 3.5rem) 0 clamp(4rem, 8vh, 6rem); }
    .sec-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 0.5rem;
    }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.14em; color: var(--warn);
      text-transform: uppercase; margin: 0; font-weight: 600;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(180, 83, 9, 0.45);
    }
    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; color: var(--text-muted);
    }
    .sec-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800; letter-spacing: -0.035em; line-height: 1;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
      color: var(--text);
      padding: 0; border: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      display: flex; flex-direction: column;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px; overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: var(--border-strong);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 22px 48px rgba(15, 15, 15, 0.12);
    }

    .cover {
      position: relative; height: 200px; padding: 1.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      overflow: hidden;
    }
    .cover::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 80% 90%, rgba(0, 0, 0, 0.30) 0%, transparent 65%);
    }
    .cover-initials {
      position: relative; z-index: 1;
      font-size: 4.25rem; font-weight: 900;
      letter-spacing: -0.04em; line-height: 0.85;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      align-self: flex-start;
    }
    .cover-vol {
      position: relative; z-index: 1;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
      align-self: flex-end;
      padding: 0.3rem 0.65rem;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
    }

    .body { padding: 1.4rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.12em;
      color: var(--text-muted);
      text-transform: uppercase; margin: 0 0 0.75rem;
    }
    .meta .free { color: var(--accent); font-weight: 700; }
    .meta .meta-dot {
      display: inline-block; width: 3px; height: 3px; border-radius: 50%;
      background: var(--text-muted); margin: 0 0.45rem; vertical-align: middle;
    }
    .name {
      font-size: 1.35rem; font-weight: 800; letter-spacing: -0.02em;
      line-height: 1.25; margin: 0 0 0.55rem; color: var(--text);
    }
    .desc {
      color: var(--text-soft);
      font-size: 0.94rem; line-height: 1.55;
      margin: 0 0 1rem;
    }
    .topics { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0 0 1.25rem; }
    .topic {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; letter-spacing: 0.06em;
      padding: 0.22rem 0.55rem; border-radius: 999px;
      background: rgba(10, 10, 10, 0.05);
      color: var(--text-soft);
      border: 1px solid rgba(10, 10, 10, 0.08);
    }
    .hr { border: 0; border-top: 1px solid rgba(10, 10, 10, 0.06); margin: 0 0 1rem; }
    .stats-row {
      display: flex; gap: 1.25rem; margin: 0 0 1.25rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem; color: var(--text-muted);
    }
    .stats-row strong { color: var(--text); display: block; font-weight: 700; font-size: 0.95rem; }

    .actions { margin-top: auto; display: flex; align-items: center; gap: 0.75rem; }
    .btn-download {
      flex: 1;
      display: inline-flex; align-items: center; justify-content: center;
      gap: 0.45rem;
      padding: 0.8rem 1rem;
      background: var(--text);
      color: var(--text-on-dark);
      font-weight: 700;
      text-decoration: none;
      border-radius: 12px;
      font-size: 0.92rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      box-shadow: 0 6px 16px rgba(10, 10, 10, 0.18);
    }
    .btn-download:hover {
      transform: translateY(-1px);
      background: #1c1917;
      box-shadow: 0 10px 24px rgba(10, 10, 10, 0.26);
      text-decoration: none;
    }
    .size {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; color: var(--text-muted);
      letter-spacing: 0.04em;
    }
  `]
})
export class NotesComponent {
  notes: NoteCard[] = [
    {
      vol: '01', slug: 'angular',
      title: 'Modern Angular Roadmap',
      shortTag: 'ANGULAR',
      level: 'Junior → Senior',
      description: 'Signals, change detection internals, RxJS patterns, NgRx, lazy-loading, SSR. Every angle interviewers actually push on.',
      topics: ['Signals', 'Change Detection', 'RxJS', 'NgRx', 'SSR', 'Performance'],
      pages: '130+', questions: '90+', updated: 'Apr 2025',
      pdfPath: 'notes/angular/notes.pdf',
      pdfSize: '8 MB', fileName: 'angular-roadmap.pdf',
      coverInitials: 'NG',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '02', slug: 'dotnet-senior',
      title: '.NET Senior Roadmap',
      shortTag: '.NET · SENIOR',
      level: '0 – 2.5 years experience',
      description: 'C# 12, .NET 8, ASP.NET Core internals, EF Core, Clean Architecture. Senior-style answers with the trickiest follow-ups interviewers chain.',
      topics: ['C# 12', '.NET 8', 'ASP.NET Core', 'EF Core', 'Clean Arch.', 'SOLID'],
      pages: '135+', questions: '80+', updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-senior/notes.pdf',
      pdfSize: '6.8 MB', fileName: 'dotnet-senior.pdf',
      coverInitials: '.NET',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '03', slug: 'dotnet-fresher',
      title: '.NET & C# Q&A',
      shortTag: '.NET · FRESHER',
      level: 'Fresher → Mid-level',
      description: 'C# fundamentals, OOP, LINQ, async, EF Core basics. 75+ most-asked fresher questions with crisp direct answers and follow-ups.',
      topics: ['C# Fundamentals', 'OOP', 'LINQ', 'Async', 'EF Core', 'Tricky Qs'],
      pages: '90+', questions: '75+', updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-fresher/notes.pdf',
      pdfSize: '5.6 MB', fileName: 'dotnet-fresher.pdf',
      coverInitials: 'C#',
      coverGradient: 'linear-gradient(135deg, #064e3b 0%, #059669 70%, #10b981 100%)'
    },
    {
      vol: '04', slug: 'react',
      title: 'React Deep Dive',
      shortTag: 'REACT',
      level: '0 – 3 years experience',
      description: 'JSX & VDOM, hooks pitfalls, reconciliation & keys, React 18/19 concurrent, RSC. 30+ deep-dive questions, no fluff.',
      topics: ['React 18/19', 'Hooks', 'Reconciliation', 'Performance', 'Suspense', 'RSC'],
      pages: '120+', questions: '30+', updated: 'May 2026',
      pdfPath: 'notes/react/notes.pdf',
      pdfSize: '5.4 MB', fileName: 'react-roadmap.pdf',
      coverInitials: 'RX',
      coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)'
    }
  ];

  readonly totalPages = '475+';
  readonly totalQuestions = '275+';
}
