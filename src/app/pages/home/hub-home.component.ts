import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  coverTag: string;
  coverGradient: string;
}

interface FeatureItem  { icon: string; title: string; desc: string; }
interface MethodStep   { step: string; title: string; desc: string; }

@Component({
  selector: 'app-hub-home',
  imports: [RouterLink, FormsModule, LandingNavComponent],
  templateUrl: './hub-home.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; background: #07091a; color: #f8fafc; }

    .landing-bg, .landing-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
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
    .wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2rem); }

    /* Hero */
    .hero { padding: clamp(2rem, 6vh, 4.5rem) 0 clamp(2.5rem, 6vh, 5rem); text-align: center; }
    .announce {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.4rem 0.95rem;
      font-size: 0.82rem;
      color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
      margin: 0 auto 2rem;
    }
    .announce:hover { color: #fff; background: rgba(99, 102, 241, 0.14); border-color: rgba(99, 102, 241, 0.4); }
    .announce-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }
    .announce-arrow { color: #818cf8; font-weight: 700; }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 6rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.02;
      margin: 0 0 1.5rem;
      max-width: 920px;
      margin-left: auto;
      margin-right: auto;
      text-wrap: balance;
    }
    .accent-mark {
      position: relative;
      display: inline-block;
      white-space: nowrap;
    }
    .accent-mark::after {
      content: '';
      position: absolute;
      left: -0.05em;
      right: -0.05em;
      bottom: 0.06em;
      height: 0.22em;
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.55) 0%, rgba(139, 92, 246, 0.55) 100%);
      border-radius: 4px;
      z-index: -1;
    }
    .hero-sub {
      color: #94a3b8;
      font-size: clamp(1.05rem, 1.6vw, 1.2rem);
      line-height: 1.7;
      max-width: 620px;
      margin: 0 auto 2rem;
    }
    .hero-cta {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
    .btn-light {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.85rem 1.5rem;
      background: #f8fafc; color: #07091a; font-weight: 700;
      border-radius: 999px; text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-light:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255, 255, 255, 0.16); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.85rem 1.5rem;
      background: rgba(255, 255, 255, 0.04);
      color: #cbd5e1; font-weight: 600; border-radius: 999px;
      text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.1);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .btn-ghost:hover { color: #fff; background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

    /* Section header */
    .section { padding: clamp(2.5rem, 6vh, 4.5rem) 0; }
    .sec-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 0.5rem;
    }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.14em; color: #818cf8;
      text-transform: uppercase; margin: 0; font-weight: 600;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(129, 140, 248, 0.5);
    }
    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; color: #64748b;
    }
    .sec-title {
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      font-weight: 800; letter-spacing: -0.025em; line-height: 1.05;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
    }

    /* Subject grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      display: flex; flex-direction: column;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px; overflow: hidden;
      text-decoration: none; color: inherit;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s, box-shadow 0.3s, background 0.3s;
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
      position: relative; height: 200px; padding: 1.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      overflow: hidden;
    }
    .cover::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 80% 90%, rgba(0, 0, 0, 0.35) 0%, transparent 65%);
    }
    .cover-initials {
      position: relative; z-index: 1;
      font-size: 4.25rem; font-weight: 900;
      letter-spacing: -0.04em; line-height: 0.85;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      align-self: flex-start;
    }
    .cover-tag {
      position: relative; z-index: 1;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(255, 255, 255, 0.78);
      align-self: flex-end;
      padding: 0.3rem 0.65rem;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
    }

    .body { padding: 1.4rem 1.4rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; color: #94a3b8;
      text-transform: uppercase; margin: 0 0 0.85rem;
    }
    .meta .meta-dot {
      display: inline-block; width: 3px; height: 3px; border-radius: 50%;
      background: #475569; margin: 0 0.45rem; vertical-align: middle;
    }
    .meta .live { color: #6ee7b7; }
    .meta .soon { color: #fcd34d; }
    .name { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.015em; margin: 0 0 0.5rem; }
    .desc { color: #94a3b8; font-size: 0.92rem; line-height: 1.55; margin: 0 0 1.25rem; }
    .hr { border: 0; border-top: 1px solid rgba(255, 255, 255, 0.07); margin: 0 0 1rem; }
    .foot {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.82rem; letter-spacing: 0.04em; color: #64748b;
    }
    .cta {
      display: inline-flex; align-items: center; gap: 0.4rem;
      color: #a5b4fc; font-weight: 600;
      transition: gap 0.25s ease, color 0.25s ease;
    }

    /* Features grid */
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .feature {
      padding: 1.5rem 1.4rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      transition: border-color 0.25s, background 0.25s;
    }
    .feature:hover { border-color: rgba(255, 255, 255, 0.16); background: rgba(255, 255, 255, 0.035); }
    .feature-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 38px; height: 38px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.18));
      border: 1px solid rgba(99, 102, 241, 0.32);
      border-radius: 10px; font-size: 1.1rem; margin-bottom: 0.85rem;
    }
    .feature-title { font-size: 1rem; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 0.35rem; }
    .feature-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.55; margin: 0; }

    /* Method */
    .method-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    .method {
      padding: 1.5rem 1.4rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
    }
    .method-step {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.14em; color: #818cf8;
      margin: 0 0 0.6rem; font-weight: 700;
    }
    .method-title { font-size: 1.05rem; font-weight: 700; margin: 0 0 0.4rem; }
    .method-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.55; margin: 0; }

    /* Newsletter */
    .newsletter {
      padding: clamp(3rem, 8vh, 5rem) clamp(1.5rem, 4vw, 3rem);
      border-radius: 24px;
      background:
        radial-gradient(circle at 80% 100%, rgba(167, 139, 250, 0.18) 0%, transparent 55%),
        radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.18) 0%, transparent 55%),
        rgba(15, 21, 48, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      margin: clamp(2rem, 5vh, 3.5rem) 0 0;
    }
    .nl-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.18em;
      color: #a5b4fc; text-transform: uppercase;
      margin: 0 0 1rem; font-weight: 600;
    }
    .nl-title {
      font-size: clamp(2rem, 5vw, 3.25rem);
      font-weight: 800; letter-spacing: -0.025em;
      margin: 0 0 0.85rem; line-height: 1.05;
    }
    .nl-sub {
      color: #cbd5e1; max-width: 560px;
      margin: 0 auto 1.75rem; line-height: 1.65;
    }
    .nl-topics {
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      justify-content: center;
      margin: 0 auto 1.75rem;
    }
    .nl-topic {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 0.4rem 0.85rem; border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nl-form {
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      max-width: 480px; margin: 0 auto;
      padding: 0.35rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
    }
    .nl-input {
      flex: 1 1 200px; min-width: 0;
      padding: 0.7rem 1rem;
      background: transparent; border: 0;
      color: #f8fafc; font-size: 0.95rem;
      outline: none;
    }
    .nl-input::placeholder { color: #64748b; }
    .nl-submit {
      padding: 0.7rem 1.3rem;
      background: #f8fafc; color: #07091a;
      font-weight: 700; font-size: 0.9rem;
      border: 0; border-radius: 999px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .nl-submit:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(255, 255, 255, 0.2);
    }
    .nl-foot {
      margin: 1.25rem 0 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.08em;
      color: #64748b;
    }
    .nl-foot .nl-foot-dot {
      display: inline-block;
      width: 6px; height: 6px; border-radius: 50%;
      background: #818cf8; margin-right: 0.4rem; vertical-align: middle;
    }
    .nl-thanks {
      padding: 1rem 1.5rem; max-width: 480px; margin: 0 auto;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #6ee7b7;
      border-radius: 999px;
      font-weight: 600;
    }

    /* Foot */
    .foot-note {
      text-align: center; color: #64748b;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.82rem; letter-spacing: 0.04em;
      padding: 3rem 0;
    }
  `]
})
export class HubHomeComponent {
  email = '';
  subscribed = signal(false);

  subjects: SubjectCard[] = [
    {
      vol: '00', slug: 'dotnet',
      title: '.NET Roadmap',
      tagline: 'Backend · Full-stack',
      desc: '9-phase, 6–7 month interview roadmap. C#, ASP.NET Core, EF Core, system design, DevOps. Real examples, not toy demos.',
      meta: '9 phases · 100+ topics',
      ready: true, link: '/dotnet',
      coverInitials: '.NET',
      coverTag: '.NET ROADMAP',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '01', slug: 'notes',
      title: 'Notes & PDFs',
      tagline: 'Premium · Interview prep',
      desc: '4 interview-ready PDFs — Angular, .NET Senior, .NET Fresher, React. 475+ pages, 275+ questions. Direct download.',
      meta: '4 PDFs · 475+ pages',
      ready: true, link: '/notes',
      coverInitials: 'PDF',
      coverTag: 'NOTES · DOWNLOAD',
      coverGradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 70%, #f59e0b 100%)'
    },
    {
      vol: '02', slug: 'angular',
      title: 'Angular Roadmap',
      tagline: 'Frontend · Modern',
      desc: 'Standalone, signals, control flow, RxJS, OnPush, SSR. The Angular 19+ stack as senior engineers actually write it.',
      meta: 'In progress',
      ready: false, link: '/angular',
      coverInitials: 'NG',
      coverTag: 'ANGULAR · SOON',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '03', slug: 'react',
      title: 'React Roadmap',
      tagline: 'Frontend · Next.js',
      desc: 'Hooks, Context, Redux Toolkit, React Query, Next.js App Router, Server Components and streaming — the full modern stack.',
      meta: 'In progress',
      ready: false, link: '/react',
      coverInitials: 'RX',
      coverTag: 'REACT · SOON',
      coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)'
    }
  ];

  features: FeatureItem[] = [
    { icon: '▤', title: 'Topics broken down', desc: 'Each phase is split into bite-sized topics. Read top-to-bottom, no jumping around.' },
    { icon: '◇', title: 'Code + expected output', desc: 'Every snippet has a "see output" toggle. Predict first, verify after — like a real coding round.' },
    { icon: '?', title: 'Interview Q&A',          desc: '3–5 main questions per topic plus rapid-fire follow-ups. The actual questions you\'ll face.' },
    { icon: '◈', title: 'Real-life examples',    desc: 'Concepts explained with Swiggy, Amazon, ATM, banking — examples you actually relate to.' },
    { icon: '⚠', title: 'Common mistakes',       desc: 'Each topic flags the answer that sounds smart but loses you the round. Skip the trap.' },
    { icon: '★', title: 'Pro tips',               desc: 'One line per topic that makes you sound like a senior, not someone reciting Stack Overflow.' }
  ];

  method: MethodStep[] = [
    { step: '01', title: 'Read the concept',   desc: 'Understand the why before the how. That\'s what separates a senior answer from a junior one.' },
    { step: '02', title: 'Predict the output', desc: 'Before clicking "see output", guess what it prints. The closest thing to a real round at home.' },
    { step: '03', title: 'Drill the Q&A',      desc: 'Re-read the interview questions the day before any interview. These are the actual questions.' },
    { step: '04', title: 'Ship a project',     desc: 'Theory without project is forgotten in two weeks. Apply each phase inside a real feature.' }
  ];

  topics: string[] = ['ROADMAPS', 'INTERVIEW PREP', 'CODE EXAMPLES', 'BEHIND-THE-SCENES'];

  get readyCount(): number {
    return this.subjects.filter(s => s.ready).length;
  }

  onSubscribe(): void {
    if (!this.email || !this.email.includes('@')) return;
    this.subscribed.set(true);
    this.email = '';
  }
}
