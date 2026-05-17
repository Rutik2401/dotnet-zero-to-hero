import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NoteCard {
  slug: string;
  title: string;
  badge: string;
  badgeTone: 'new' | 'senior' | 'fresher';
  level: string;
  description: string;
  topics: string[];
  pages: string;
  questions: string;
  updated: string;
  pdfPath: string;
  pdfSize: string;
  fileName: string;
  cover: {
    initials: string;
    gradientFrom: string;
    gradientTo: string;
    accent: string;
  };
}

@Component({
  selector: 'app-notes',
  imports: [RouterLink],
  templateUrl: './notes.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }
    .notes-wrap {
      max-width: 1120px;
      margin: 0 auto;
      padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
    }
    .notes-back {
      display: inline-block;
      color: var(--text-muted);
      text-decoration: none;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }
    .notes-back:hover { color: var(--text); }
    .notes-hero {
      text-align: center;
      margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
    }
    .notes-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0.75rem 0;
    }
    .notes-sub {
      color: var(--text-soft);
      max-width: 620px;
      margin: 0 auto;
      font-size: 1.05rem;
    }
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .note-card {
      display: flex;
      flex-direction: column;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
      box-shadow: var(--shadow-sm);
    }
    .note-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-md);
    }
    .note-cover {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    }
    .note-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .note-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .note-level {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .note-title { font-size: 1.4rem; font-weight: 700; margin: 0 0 0.5rem; }
    .note-desc { color: var(--text-soft); font-size: 0.92rem; line-height: 1.55; margin: 0 0 1rem; }
    .note-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }
    .note-topic {
      font-size: 0.72rem;
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-pill);
      background: var(--pill-bg);
      color: var(--pill-text);
    }
    .note-stats {
      display: flex;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .note-stats strong { color: var(--text); display: block; font-weight: 700; font-size: 1rem; }
    .note-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }
    .note-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      font-weight: 600;
      text-decoration: none;
      font-size: 0.92rem;
      transition: background 0.2s var(--ease), transform 0.15s var(--ease);
    }
    .note-btn-primary {
      background: var(--gradient-brand);
      color: white;
    }
    .note-btn-primary:hover { transform: translateY(-1px); }
    .note-size {
      text-align: center;
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }
  `]
})
export class NotesComponent {
  notes: NoteCard[] = [
    {
      slug: 'angular',
      title: 'Angular Interview Roadmap',
      badge: 'BEST SELLER',
      badgeTone: 'new',
      level: 'Junior → Senior',
      description:
        'Complete Angular 17/18 interview prep — signals, change detection internals, RxJS patterns, NgRx, lazy-loading, SSR, and architectural questions asked at top product companies.',
      topics: ['Signals', 'Change Detection', 'RxJS', 'NgRx', 'SSR', 'Performance'],
      pages: '130+',
      questions: '90+',
      updated: 'Apr 2025',
      pdfPath: 'notes/angular/notes.pdf',
      pdfSize: '8 MB',
      fileName: 'angular-roadmap.pdf',
      cover: { initials: 'NG', gradientFrom: '#dd0031', gradientTo: '#7d0019', accent: '#ff5577' }
    },
    {
      slug: 'dotnet-senior',
      title: '.NET Interview Roadmap',
      badge: 'LATEST',
      badgeTone: 'senior',
      level: '0 – 2.5 years experience',
      description:
        'Senior-style answers covering C# 12, .NET 8, ASP.NET Core internals, EF Core, Clean Architecture, and the trickiest follow-ups asked in product-company interviews.',
      topics: ['C# 12', '.NET 8', 'ASP.NET Core', 'EF Core', 'Clean Arch.', 'SOLID'],
      pages: '135+',
      questions: '80+',
      updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-senior/notes.pdf',
      pdfSize: '6.8 MB',
      fileName: 'dotnet-senior.pdf',
      cover: { initials: '.NET', gradientFrom: '#512bd4', gradientTo: '#1f0d63', accent: '#a78bfa' }
    },
    {
      slug: 'dotnet-fresher',
      title: '.NET & C# Interview Q&A',
      badge: 'FRESHER FRIENDLY',
      badgeTone: 'fresher',
      level: 'Fresher → Mid-level',
      description:
        '75+ modern, tricky and most-asked C# / .NET questions with crisp direct answers, key points, code snippets and follow-up Qs — designed for quick revision before interviews.',
      topics: ['C# Fundamentals', 'OOP', 'LINQ', 'Async', 'EF Core', 'Tricky Qs'],
      pages: '90+',
      questions: '75+',
      updated: 'Apr 2025',
      pdfPath: 'notes/dotnet-fresher/notes.pdf',
      pdfSize: '5.6 MB',
      fileName: 'dotnet-fresher.pdf',
      cover: { initials: 'C#', gradientFrom: '#10b981', gradientTo: '#064e3b', accent: '#34d399' }
    },
    {
      slug: 'react',
      title: 'React Interview Roadmap',
      badge: 'NEW',
      badgeTone: 'new',
      level: '0 – 3 years experience',
      description:
        '30+ deep-dive React questions — JSX & VDOM, hooks pitfalls, reconciliation & keys, React 18/19 concurrent features, RSC, and the tricky follow-ups asked at product companies.',
      topics: ['React 18/19', 'Hooks', 'Reconciliation', 'Performance', 'Suspense', 'RSC'],
      pages: '120+',
      questions: '30+',
      updated: 'May 2026',
      pdfPath: 'notes/react/notes.pdf',
      pdfSize: '5.4 MB',
      fileName: 'react-roadmap.pdf',
      cover: { initials: 'REACT', gradientFrom: '#0891b2', gradientTo: '#062c3a', accent: '#22d3ee' }
    }
  ];
}
