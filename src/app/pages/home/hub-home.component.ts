import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';

interface SubjectCard {
  vol: string;
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  meta: string;
  ready: boolean;
  link: string;
  coverInitials: string;
  coverGradient: string;
}

@Component({
  selector: 'app-hub-home',
  imports: [RouterLink, LandingNavComponent],
  templateUrl: './hub-home.component.html',
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
        radial-gradient(circle at 18% 12%, rgba(99, 102, 241, 0.18) 0%, transparent 38%),
        radial-gradient(circle at 82% 88%, rgba(139, 92, 246, 0.16) 0%, transparent 42%),
        radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.10) 0%, transparent 55%);
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
      color: #818cf8;
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
      background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 60%, #67e8f9 100%);
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
    .stats .free-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .stats .free-pill::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
    }

    /* Section */
    .section { padding: clamp(2.5rem, 6vh, 4.5rem) 0; }
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
      color: #818cf8;
      text-transform: uppercase;
      margin: 0;
      font-weight: 600;
    }
    .sec-label::before {
      content: '';
      display: inline-block;
      width: 36px;
      height: 1px;
      background: rgba(129, 140, 248, 0.5);
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

    /* Subject grid */
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
      text-decoration: none;
      color: inherit;
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
    .card:hover .cta { gap: 0.55rem; color: #fff; }
    .card-soon { opacity: 0.78; }

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
    .cover-vol {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.78);
      align-self: flex-start;
      padding: 0.3rem 0.65rem;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
    }
    .cover-initials {
      position: relative;
      z-index: 1;
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      align-self: flex-end;
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
      margin: 0 0 0.85rem;
    }
    .name {
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.015em;
      margin: 0 0 0.5rem;
    }
    .desc {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.55;
      margin: 0 0 1.25rem;
    }
    .hr { border: 0; border-top: 1px solid rgba(255, 255, 255, 0.07); margin: 0 0 1rem; }
    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.82rem;
      letter-spacing: 0.04em;
      color: #64748b;
    }
    .cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: #a5b4fc;
      font-weight: 600;
      transition: gap 0.25s ease, color 0.25s ease;
    }

    .foot-note {
      margin: clamp(3rem, 6vh, 5rem) 0 clamp(4rem, 8vh, 6rem);
      text-align: center;
      color: #64748b;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.82rem;
      letter-spacing: 0.04em;
    }
  `]
})
export class HubHomeComponent {
  subjects: SubjectCard[] = [
    {
      vol: '00',
      slug: 'dotnet',
      title: '.NET Roadmap',
      tagline: 'Backend · Full-stack',
      desc: '9-phase, 6–7 month roadmap. C#, ASP.NET Core, EF Core, system design, DevOps. Real examples in Indian English.',
      meta: '9 phases · 100+ topics',
      ready: true,
      link: '/dotnet',
      coverInitials: '.NET',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '01',
      slug: 'angular',
      title: 'Angular Roadmap',
      tagline: 'Frontend · Modern',
      desc: 'Standalone, signals, control flow, RxJS, OnPush, SSR. The Angular 19+ stack, phase by phase.',
      meta: 'In progress',
      ready: false,
      link: '/angular',
      coverInitials: 'NG',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '02',
      slug: 'react',
      title: 'React Roadmap',
      tagline: 'Frontend · Next.js',
      desc: 'Hooks, Context, Redux Toolkit, React Query, Next.js App Router, Server Components and streaming.',
      meta: 'In progress',
      ready: false,
      link: '/react',
      coverInitials: 'RX',
      coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)'
    },
    {
      vol: '03',
      slug: 'notes',
      title: 'Notes & PDFs',
      tagline: 'Premium · Interview Prep',
      desc: '4 interview-ready PDFs — Angular, .NET Senior, .NET Fresher, React. Download, read on screen or print.',
      meta: '4 PDFs · 475+ pages',
      ready: true,
      link: '/notes',
      coverInitials: 'PDF',
      coverGradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 70%, #f59e0b 100%)'
    }
  ];

  get readyCount(): number {
    return this.subjects.filter(s => s.ready).length;
  }
}
