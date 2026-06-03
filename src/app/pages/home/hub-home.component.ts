import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';

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
  status?: string;
}

interface FeatureItem  { icon: string; title: string; desc: string; }
interface MethodStep   { step: string; title: string; desc: string; }

@Component({
  selector: 'app-hub-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, LandingNavComponent, LandingFooterComponent],
  templateUrl: './hub-home.component.html',
  styles: [`
    /* Hub landing — consumes global cream tokens from src/styles.css */
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .cream-bg, .cream-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .cream-bg {
      background:
        radial-gradient(60rem 36rem at 12% -8%, rgba(139, 92, 246, 0.08), transparent 60%),
        radial-gradient(50rem 36rem at 100% 100%, rgba(245, 158, 11, 0.06), transparent 60%);
    }
    .cream-grid {
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.7;
    }

    .wrap {
      position: relative; z-index: 1;
      max-width: 1180px; margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    /* ─── HERO ───────────────────────────────────────────── */
    .hero {
      padding: clamp(2.5rem, 8vh, 6rem) 0 clamp(3rem, 8vh, 6.5rem);
      text-align: center;
    }
    .announce {
      display: inline-flex; align-items: center; gap: 0.55rem;
      padding: 0.42rem 1rem;
      font-size: 0.875rem; font-weight: 500;
      line-height: 1.5;
      color: var(--text-soft);
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 999px;
      text-decoration: none;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
      margin: 0 auto clamp(1.75rem, 4vw, 2.5rem);
    }
    .announce:hover {
      color: var(--text);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }
    .announce-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-2);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.18);
    }
    .announce-sep { color: var(--text-muted); }
    .announce-arrow { color: var(--primary); font-weight: 700; }

    .hero-title {
      font-size: clamp(2rem, 5vw, 3.75rem);
      font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 auto 1.4rem;
      max-width: 820px;
      text-wrap: balance;
      color: var(--text);
    }
    .accent-mark { display: inline-block; }
    .hero-sub {
      color: var(--text-soft);
      font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
      line-height: 1.6; max-width: 680px;
      margin: 0 auto 2rem;
    }
    .hero-cta { display: inline-flex; flex-wrap: wrap; gap: 0.65rem; justify-content: center; }
    .hero-cta .btn { padding: 0.95rem 1.6rem; font-size: 0.9375rem; }

    /* ─── SECTION HEAD ──────────────────────────────────── */
    .section { padding: clamp(3rem, 7vh, 5.5rem) 0; }
    .sec-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 0.5rem;
    }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--primary);
      text-transform: uppercase; margin: 0; font-weight: 600;
      line-height: 1.5;
    }
    .sec-label::before {
      content: ''; display: inline-block;
      width: 36px; height: 1px; background: rgba(109, 40, 217, 0.4);
    }
    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em; color: var(--text-muted);
      line-height: 1.5;
    }
    .sec-title {
      font-size: clamp(1.85rem, 4vw, 2.6rem);
      font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 clamp(2rem, 3.5vw, 2.75rem);
      color: var(--text);
      padding: 0; border: 0;
    }

    /* ─── SUBJECT GRID ──────────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      display: flex; flex-direction: column;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px; overflow: hidden;
      text-decoration: none; color: inherit;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: var(--border-strong);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 22px 48px rgba(15, 15, 15, 0.12);
    }
    .card:hover .cta { gap: 0.55rem; color: var(--text); }
    .card-soon { opacity: 0.82; }

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
      font-size: 3.5rem; font-weight: 800;
      letter-spacing: -0.03em; line-height: 0.95;
      color: rgba(255, 255, 255, 0.96);
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      align-self: flex-start;
    }
    .cover-tag {
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
    }

    .body { padding: 1.4rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em; color: var(--text-muted);
      text-transform: uppercase; margin: 0 0 0.85rem;
      line-height: 1.5;
    }
    .meta .meta-dot {
      display: inline-block; width: 3px; height: 3px; border-radius: 50%;
      background: var(--text-muted); margin: 0 0.5rem; vertical-align: middle;
    }
    .meta .live { color: var(--accent); font-weight: 700; }
    .meta .soon { color: var(--warn); font-weight: 700; }
    .name {
      font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em;
      margin: 0 0 0.55rem; color: var(--text);
      line-height: 1.25;
    }
    .desc { color: var(--text-soft); font-size: 0.9375rem; line-height: 1.6; margin: 0 0 1.25rem; }
    .hr { border: 0; border-top: 1px solid var(--border-chrome); margin: 0 0 1rem; }
    .foot {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.04em; color: var(--text-muted);
    }
    .cta {
      display: inline-flex; align-items: center; gap: 0.4rem;
      color: var(--primary); font-weight: 700;
      transition: gap 0.25s ease, color 0.25s ease;
    }

    /* ─── FEATURES / METHOD ───────────────────────────── */
    .feature-grid, .method-list {
      display: grid; gap: 1rem;
    }
    .feature-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
    .method-list  { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }

    .feature, .method {
      padding: 1.6rem 1.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .feature:hover, .method:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .feature-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 40px; height: 40px;
      background: rgba(139, 92, 246, 0.14);
      border: 1px solid rgba(139, 92, 246, 0.32);
      border-radius: 11px;
      color: var(--primary);
      font-size: 1.1rem; font-weight: 800;
      margin-bottom: 1rem;
    }
    .feature-title, .method-title {
      font-size: 1.125rem; font-weight: 700; letter-spacing: -0.01em;
      margin: 0 0 0.4rem; color: var(--text);
      line-height: 1.35;
    }
    .feature-desc, .method-desc {
      color: var(--text-soft); font-size: 0.9375rem; line-height: 1.6; margin: 0;
    }
    .method-step {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em; color: var(--primary);
      margin: 0 0 0.7rem; font-weight: 700;
      line-height: 1.5;
    }

    /* ─── STUCK-ON CTA CARD ────────────────────────────── */
    .stuck {
      display: flex; align-items: center; justify-content: space-between;
      gap: clamp(1.5rem, 4vw, 3rem); flex-wrap: wrap;
      padding: clamp(2rem, 4.5vw, 3rem) clamp(1.75rem, 4vw, 2.75rem);
      margin: clamp(2rem, 5vh, 4rem) 0 0;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 22px;
      box-shadow: var(--shadow-md);
    }
    .stuck-text { flex: 1 1 380px; min-width: 0; }
    .stuck-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.10em;
      color: var(--text-muted); text-transform: uppercase;
      margin: 0 0 0.65rem; font-weight: 600;
      line-height: 1.5;
    }
    .stuck-title {
      font-size: clamp(1.65rem, 3.2vw, 2.25rem);
      font-weight: 700; letter-spacing: -0.02em; line-height: 1.15;
      margin: 0 0 0.85rem; color: var(--text);
      padding: 0; border: 0;
    }
    .stuck-sub {
      color: var(--text-soft);
      font-size: 1.0625rem; line-height: 1.65;
      margin: 0; max-width: 580px;
    }
    .stuck-cta { display: inline-flex; flex-wrap: wrap; gap: 0.6rem; }
    .stuck-cta .btn { padding: 0.85rem 1.4rem; font-size: 0.9375rem; }

    /* ─── NEWSLETTER ───────────────────────────────────── */
    .newsletter {
      padding: clamp(3rem, 8vh, 5.5rem) clamp(1.5rem, 4vw, 3rem);
      border-radius: 28px;
      background:
        radial-gradient(ellipse at 0% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 100% 100%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
        var(--bg-soft);
      border: 1px solid var(--border);
      text-align: center;
      margin: clamp(2rem, 5vh, 3.5rem) 0 0;
    }
    .nl-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.12em;
      color: var(--primary); text-transform: uppercase;
      margin: 0 0 1.25rem; font-weight: 700;
      line-height: 1.5;
    }
    .nl-title {
      font-size: clamp(1.85rem, 4vw, 2.8rem);
      font-weight: 800; letter-spacing: -0.03em;
      margin: 0 0 1rem; line-height: 1.1;
      color: var(--text);
      padding: 0; border: 0;
    }
    .nl-net { color: var(--primary); display: inline-block; }
    .nl-sub {
      color: var(--text-soft); max-width: 580px;
      font-size: clamp(1.0625rem, 1.3vw, 1.125rem);
      margin: 0 auto 1.75rem; line-height: 1.6;
    }
    .nl-sub strong { color: var(--text); font-weight: 700; }

    .nl-topics {
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      justify-content: center; margin: 0 auto 2rem;
    }
    .nl-topic {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.10em; text-transform: uppercase;
      padding: 0.5rem 1rem; border-radius: 999px;
      background: var(--bg-card);
      color: var(--text-soft);
      border: 1px solid var(--border);
      font-weight: 600;
      line-height: 1.5;
    }

    .nl-form {
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      max-width: 520px; margin: 0 auto;
      padding: 0.4rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 999px;
      box-shadow: var(--shadow-md);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    /* The email input is borderless; surface focus on the wrapper instead. */
    .nl-form:focus-within {
      border-color: var(--primary);
      box-shadow: var(--shadow-md), 0 0 0 4px rgba(109, 40, 217, 0.18);
    }
    .nl-input {
      flex: 1 1 200px; min-width: 0;
      padding: 0.85rem 1.1rem;
      background: transparent; border: 0;
      color: var(--text); font-size: 1rem;
      line-height: 1.5;
      outline: none;
      font-family: inherit;
    }
    .nl-input::placeholder { color: var(--text-muted); }
    .nl-submit {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.85rem 1.5rem;
      background: var(--text); color: var(--text-on-dark);
      font-weight: 700; font-size: 0.9375rem;
      line-height: 1.5;
      border: 0; border-radius: 999px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }
    .nl-submit:hover {
      transform: translateY(-1px);
      background: #1c1917;
      box-shadow: 0 8px 22px rgba(10, 10, 10, 0.22);
    }
    .nl-foot { margin: 1.4rem 0 0; font-size: 0.9375rem; color: var(--text-muted); line-height: 1.5; }
    .nl-foot strong { color: var(--text); font-weight: 700; }
    .nl-foot-dot {
      display: inline-block;
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--accent-2); margin-right: 0.45rem; vertical-align: middle;
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.18);
    }
    .nl-thanks {
      padding: 1.05rem 1.5rem; max-width: 520px; margin: 0 auto;
      background: rgba(4, 120, 87, 0.08);
      border: 1px solid rgba(4, 120, 87, 0.28);
      color: var(--accent);
      border-radius: 999px;
      font-weight: 700;
    }

    /* ─── RESPONSIVE ───────────────────────────────────── */
    @media (max-width: 860px) {
      .hero { padding: 2.5rem 0 3rem; }
      .sec-head { flex-wrap: wrap; gap: 0.5rem; }
      .stuck { flex-direction: column; align-items: flex-start; padding: 1.75rem 1.5rem; }
      .stuck-cta { width: 100%; }
      .stuck-cta .btn { flex: 1 1 auto; justify-content: center; min-width: 0; }
      .nl-form { flex-direction: column; padding: 0.5rem; border-radius: 18px; }
      .nl-input {
        flex: 0 0 auto;
        width: 100%;
        text-align: center;
        padding: 0.85rem 1rem;
      }
      .nl-submit {
        flex: 0 0 auto;
        width: 100%;
        justify-content: center;
      }
    }
    @media (max-width: 520px) {
      .hero-cta { flex-direction: column; width: 100%; align-items: stretch; }
      .hero-cta .btn { width: 100%; justify-content: center; }
      .announce { font-size: 0.8125rem; padding: 0.38rem 0.85rem; }
    }
  `]
})
export class HubHomeComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  email = '';
  subscribed = signal(false);

  constructor() {
    afterNextRender(() => this.setupAnimations());
  }

  /**
   * GSAP entrance + scroll-trigger animations across the landing.
   * Runs only in the browser (afterNextRender), scoped to this component
   * via gsap.context() so leaving the route reverts every animation and
   * disposes the ScrollTriggers.
   */
  private async setupAnimations(): Promise<void> {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Hero — runs on load as a single timeline ───────────────────
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.75 } });
      heroTl
        .from('.announce', { y: 18, opacity: 0, duration: 0.55 })
        .from('.hero-title', { y: 36, opacity: 0 }, '-=0.2')
        .from('.hero-sub', { y: 22, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.hero-cta > *',
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 },
          '-=0.35');

      // ── Section eyebrow + title reveals ────────────────────────────
      gsap.utils.toArray<HTMLElement>('.section').forEach(section => {
        const eyebrow = section.querySelectorAll('.sec-label, .sec-meta');
        const title   = section.querySelector('.sec-title');
        if (eyebrow.length) {
          gsap.from(eyebrow, {
            y: 18, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06,
            scrollTrigger: { trigger: section, start: 'top 82%', once: true }
          });
        }
        if (title) {
          gsap.from(title, {
            y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 85%', once: true }
          });
        }
      });

      // ── Card grids — staggered fade-up ─────────────────────────────
      const gridSelectors: string[] = ['.grid', '.feature-grid', '.method-list'];
      gridSelectors.forEach(sel => {
        gsap.utils.toArray<HTMLElement>(sel).forEach(grid => {
          gsap.from(Array.from(grid.children), {
            y: 32, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
          });
        });
      });

      // ── Stuck-on CTA card — single reveal ──────────────────────────
      gsap.from('.stuck', {
        y: 40, opacity: 0, duration: 0.75, ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.stuck', start: 'top 85%', once: true }
      });

      // ── Newsletter — title + form + topics in sequence ─────────────
      const nlTargets = '.nl-eyebrow, .nl-title, .nl-sub, .nl-topics, .nl-form, .nl-foot';
      gsap.from(nlTargets, {
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: '.newsletter', start: 'top 80%', once: true }
      });

      // Refresh after any post-mount layout shifts (fonts, images, etc.)
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, this.host.nativeElement);

    this.destroyRef.onDestroy(() => ctx.revert());
  }

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
      meta: 'Drafting · Q3 2026',
      ready: false, link: '/angular',
      status: 'DRAFTING · Q3',
      coverInitials: 'NG',
      coverTag: 'ANGULAR · DRAFTING',
      coverGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dd0031 70%, #ef4444 100%)'
    },
    {
      vol: '03', slug: 'react',
      title: 'React Roadmap',
      tagline: 'Frontend · Next.js',
      desc: 'Hooks, Context, Redux Toolkit, React Query, Next.js App Router, Server Components and streaming — the full modern stack.',
      meta: 'Drafting · Q4 2026',
      ready: false, link: '/react',
      status: 'DRAFTING · Q4',
      coverInitials: 'RX',
      coverTag: 'REACT · DRAFTING',
      coverGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 70%, #06b6d4 100%)'
    }
  ];

  features: FeatureItem[] = [
    { icon: '▤', title: 'Topics Broken Down',     desc: 'Each phase is split into bite-sized topics. Read top-to-bottom, no jumping around.' },
    { icon: '◇', title: 'Code + Expected Output', desc: 'Every snippet has a "see output" toggle. Predict first, verify after — like a real coding round.' },
    { icon: '?', title: 'Interview Q&A',          desc: '3–5 main questions per topic plus rapid-fire follow-ups. The actual questions you\'ll face.' },
    { icon: '◈', title: 'Real-Life Examples',     desc: 'Concepts explained with Swiggy, Amazon, ATM, banking — examples you actually relate to.' },
    { icon: '⚠', title: 'Common Mistakes',        desc: 'Each topic flags the answer that sounds smart but loses you the round. Skip the trap.' },
    { icon: '★', title: 'Pro Tips',               desc: 'One line per topic that makes you sound like a senior, not someone reciting Stack Overflow.' }
  ];

  method: MethodStep[] = [
    { step: '01', title: 'Read the Concept',   desc: 'Understand the why before the how. That\'s what separates a senior answer from a junior one.' },
    { step: '02', title: 'Predict the Output', desc: 'Before clicking "see output", guess what it prints. The closest thing to a real round at home.' },
    { step: '03', title: 'Drill the Q&A',      desc: 'Re-read the interview questions the day before any interview. These are the actual questions.' },
    { step: '04', title: 'Ship a Project',     desc: 'Theory without project is forgotten in two weeks. Apply each phase inside a real feature.' }
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
