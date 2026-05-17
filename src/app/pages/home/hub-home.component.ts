import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SubjectCard {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  ready: boolean;
  link: string;
  accent: string;
}

@Component({
  selector: 'app-hub-home',
  imports: [RouterLink],
  templateUrl: './hub-home.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
    }
    .hub {
      max-width: 1120px;
      margin: 0 auto;
      padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 2rem);
    }
    .hub-hero {
      text-align: center;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .hub-title {
      font-size: clamp(2.25rem, 5vw, 3.75rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 1rem 0 1rem;
    }
    .hub-sub {
      font-size: clamp(1rem, 1.6vw, 1.15rem);
      color: var(--text-soft);
      max-width: 620px;
      margin: 0 auto;
    }
    .hub-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .subject-card {
      position: relative;
      display: block;
      overflow: hidden;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      text-decoration: none;
      color: inherit;
      transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
      box-shadow: var(--shadow-sm);
    }
    .subject-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-md);
      background: var(--bg-card-hover);
    }
    .subject-card-soon { opacity: 0.78; }
    .subject-accent {
      height: 6px;
      width: 100%;
    }
    .subject-body { padding: 1.5rem; }
    .subject-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .subject-tag {
      font-size: 0.78rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .subject-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }
    .subject-desc {
      color: var(--text-soft);
      margin: 0 0 1.25rem;
      font-size: 0.95rem;
      line-height: 1.55;
    }
    .subject-cta {
      display: inline-block;
      font-weight: 600;
      color: var(--primary);
    }
    .subject-card:hover .subject-cta { color: var(--text); }
    .hub-foot {
      margin-top: 3rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  `]
})
export class HubHomeComponent {
  subjects: SubjectCard[] = [
    {
      slug: 'dotnet',
      title: '.NET',
      tagline: 'Backend · Full-stack',
      desc: '9-phase, 6–7 month roadmap. C#, ASP.NET Core, EF Core, system design, DevOps. Real examples in Indian English.',
      ready: true,
      link: '/dotnet',
      accent: 'linear-gradient(135deg, #512BD4 0%, #8B5CF6 100%)'
    },
    {
      slug: 'angular',
      title: 'Angular',
      tagline: 'Frontend · Modern',
      desc: 'Standalone, signals, control flow, RxJS, OnPush, SSR. The Angular 19+ stack, phase by phase.',
      ready: false,
      link: '/angular',
      accent: 'linear-gradient(135deg, #DD0031 0%, #C3002F 100%)'
    },
    {
      slug: 'react',
      title: 'React',
      tagline: 'Frontend · Next.js',
      desc: 'Hooks, Context, Redux Toolkit, React Query, Next.js App Router, Server Components and streaming.',
      ready: false,
      link: '/react',
      accent: 'linear-gradient(135deg, #61DAFB 0%, #0EA5E9 100%)'
    },
    {
      slug: 'notes',
      title: 'Notes & PDFs',
      tagline: 'Premium · Interview Prep',
      desc: '4 interview-ready PDFs — Angular, .NET Senior, .NET Fresher, React. Download and print, or read on screen.',
      ready: true,
      link: '/notes',
      accent: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)'
    }
  ];
}
