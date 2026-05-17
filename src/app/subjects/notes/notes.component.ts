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

    .hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }
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
