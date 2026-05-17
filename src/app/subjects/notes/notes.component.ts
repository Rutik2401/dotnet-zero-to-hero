import { Component } from '@angular/core';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';

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
  imports: [LandingNavComponent],
  templateUrl: './notes.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #07091a;
      color: #f8fafc;
    }

    .landing-bg, .landing-grid {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .landing-bg {
      background-image:
        radial-gradient(circle at 12% 18%, rgba(245, 158, 11, 0.14) 0%, transparent 38%),
        radial-gradient(circle at 88% 82%, rgba(220, 38, 38, 0.12) 0%, transparent 42%),
        radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.10) 0%, transparent 55%);
    }
    .landing-grid {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 100%);
    }

    .wrap {
      position: relative;
      z-index: 1;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    /* Hero */
    .hero { padding: clamp(2.5rem, 8vh, 6rem) 0 clamp(2rem, 5vh, 4rem); }
    .eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      color: #fcd34d;
      text-transform: uppercase;
      margin: 0 0 1.25rem;
      font-weight: 600;
    }
    .title {
      font-size: clamp(2.5rem, 8vw, 5.75rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 0.98;
      margin: 0 0 1.75rem;
      max-width: 900px;
      text-wrap: balance;
    }
    .accent {
      background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 60%, #dc2626 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .sub {
      color: #94a3b8;
      font-size: clamp(1.05rem, 1.6vw, 1.2rem);
      line-height: 1.7;
      max-width: 640px;
      margin: 0 0 2rem;
    }
    .stats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.55rem 0.9rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }
    .stats strong { color: #f8fafc; font-weight: 700; }
    .stats .dot { color: #475569; }
    .stats .free-pill { display: inline-flex; align-items: center; gap: 0.4rem; }
    .stats .free-pill::before {
      content: '';
      width: 8px; height: 8px; border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
    }

    /* Section */
    .section { padding: clamp(2rem, 6vh, 3.5rem) 0 clamp(4rem, 8vh, 6rem); }
    .sec-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .sec-label {
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      color: #fcd34d;
      text-transform: uppercase;
      margin: 0;
      font-weight: 600;
    }
    .sec-label::before {
      content: '';
      display: inline-block;
      width: 36px;
      height: 1px;
      background: rgba(252, 211, 77, 0.5);
    }
    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #64748b;
    }
    .sec-title {
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.05;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
    }

    /* Note cards */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease,
                  box-shadow 0.3s ease,
                  background 0.3s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.035);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }

    .cover {
      position: relative;
      height: 200px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .cover::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 80% 90%, rgba(0, 0, 0, 0.35) 0%, transparent 65%);
    }
    .cover-initials {
      position: relative;
      z-index: 1;
      font-size: 4.25rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 0.85;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      align-self: flex-start;
    }
    .cover-vol {
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

    .body {
      padding: 1.4rem 1.4rem 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #94a3b8;
      text-transform: uppercase;
      margin: 0 0 0.75rem;
    }
    .meta .free { color: #6ee7b7; }
    .meta .meta-dot {
      display: inline-block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #475569;
      margin: 0 0.4rem;
      vertical-align: middle;
    }
    .name {
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      line-height: 1.25;
      margin: 0 0 0.5rem;
    }
    .desc {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.55;
      margin: 0 0 1rem;
    }
    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin: 0 0 1.25rem;
    }
    .topic {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem;
      letter-spacing: 0.06em;
      padding: 0.22rem 0.55rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .hr { border: 0; border-top: 1px solid rgba(255, 255, 255, 0.07); margin: 0 0 1rem; }
    .stats-row {
      display: flex;
      gap: 1.25rem;
      margin: 0 0 1.25rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem;
      color: #64748b;
    }
    .stats-row strong { color: #f8fafc; display: block; font-weight: 700; font-size: 0.95rem; }
    .actions {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .btn-download {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.75rem 1rem;
      background: #f8fafc;
      color: #07091a;
      font-weight: 700;
      text-decoration: none;
      border-radius: 12px;
      font-size: 0.92rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-download:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.16);
    }
    .size {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      color: #64748b;
      letter-spacing: 0.04em;
    }
  `]
})
export class NotesComponent {
  notes: NoteCard[] = [
    {
      vol: '01', slug: 'angular',
      title: 'Angular Interview Roadmap',
      shortTag: 'ANGULAR',
      level: 'Junior → Senior',
      description: 'Complete Angular 17/18 interview prep — signals, change detection internals, RxJS patterns, NgRx, lazy-loading, SSR.',
      topics: ['Signals', 'Change Detection', 'RxJS', 'NgRx', 'SSR', 'Performance'],
      pages: '130+', questions: '90+', updated: 'Apr 2025',
      pdfPath: 'notes/angular/notes.pdf',
      pdfSize: '8 MB', fileName: 'angular-roadmap.pdf',
      coverInitials: 'NG',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '02', slug: 'dotnet-senior',
      title: '.NET Interview Roadmap',
      shortTag: '.NET · SENIOR',
      level: '0 – 2.5 years experience',
      description: 'Senior-style answers — C# 12, .NET 8, ASP.NET Core internals, EF Core, Clean Architecture, trickiest follow-ups.',
      topics: ['C# 12', '.NET 8', 'ASP.NET Core', 'EF Core', 'Clean Arch.', 'SOLID'],
      pages: '135+', questions: '80+', updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-senior/notes.pdf',
      pdfSize: '6.8 MB', fileName: 'dotnet-senior.pdf',
      coverInitials: '.NET',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '03', slug: 'dotnet-fresher',
      title: '.NET & C# Interview Q&A',
      shortTag: '.NET · FRESHER',
      level: 'Fresher → Mid-level',
      description: '75+ modern, tricky and most-asked C# / .NET questions with crisp direct answers, code snippets and follow-up Qs.',
      topics: ['C# Fundamentals', 'OOP', 'LINQ', 'Async', 'EF Core', 'Tricky Qs'],
      pages: '90+', questions: '75+', updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-fresher/notes.pdf',
      pdfSize: '5.6 MB', fileName: 'dotnet-fresher.pdf',
      coverInitials: 'C#',
      coverGradient: 'linear-gradient(135deg, #064e3b 0%, #059669 70%, #10b981 100%)'
    },
    {
      vol: '04', slug: 'react',
      title: 'React Interview Roadmap',
      shortTag: 'REACT',
      level: '0 – 3 years experience',
      description: '30+ deep-dive React questions — JSX & VDOM, hooks pitfalls, reconciliation & keys, React 18/19 concurrent, RSC.',
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
