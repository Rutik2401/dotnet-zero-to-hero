import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';

interface CourseCard {
  vol: string;
  title: string;
  link: string;
  lessons: string;
  hours: string;
  coverInitials: string;
  coverTag: string;
  coverGradient: string;
}

interface ComingTopic {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LandingNavComponent, LandingFooterComponent],
  template: `
    <div class="cream-bg" aria-hidden="true"></div>
    <div class="cream-grid" aria-hidden="true"></div>

    <div class="wrap">
      <app-landing-nav />

      <!-- ─── HERO ─── -->
      <section class="hero">
        <div class="hero-text">
          <p class="hero-eyebrow">COURSES</p>
          <h1 class="hero-title">learn .net,<br />the practical way.</h1>
          <p class="hero-sub">
            Free, hands-on courses for .NET developers. Track progress across lessons,
            read or watch at your own pace, and pull every example from a real GitHub repo.
            Built around production patterns I actually ship.
          </p>
          <div class="hero-stats">
            <span class="stat">2 courses</span>
            <span class="stat-dot" aria-hidden="true">·</span>
            <span class="stat">100+ lessons</span>
            <span class="stat-dot" aria-hidden="true">·</span>
            <span class="stat stat-free">
              <span class="dot dot-green" aria-hidden="true"></span>
              All free
            </span>
            <span class="stat-dot" aria-hidden="true">·</span>
            <span class="stat">Source code included</span>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="hv-glow"></div>
          <div class="hv-card">
            <div class="hv-bar">
              <span class="hv-tl hv-tl-r"></span>
              <span class="hv-tl hv-tl-y"></span>
              <span class="hv-tl hv-tl-g"></span>
              <span class="hv-file">Program.cs</span>
              <span class="hv-tag">.NET 9</span>
            </div>
            <div class="hv-code">
              <span class="hv-c-line"><span class="hv-c-kw">var</span> builder = WebApplication</span><span class="hv-c-line">    .<span class="hv-c-fn">CreateBuilder</span>(args);</span><span class="hv-c-line"><span class="hv-c-kw">var</span> app = builder.<span class="hv-c-fn">Build</span>();</span><span class="hv-c-line">app.<span class="hv-c-fn">MapGet</span>(<span class="hv-c-str">"/"</span>, () =&gt; <span class="hv-c-str">"Hello!"</span>);</span><span class="hv-c-line">app.<span class="hv-c-fn">Run</span>();<span class="hv-c-caret"></span></span>
            </div>
          </div>
          <div class="hv-badge">
            <span class="hv-badge-dot"></span>
            <span>LIVE</span>
            <span class="hv-badge-sep">·</span>
            <span>3 students online</span>
          </div>
        </div>
      </section>

      <!-- ─── SECTION 01 — ACTIVE COURSES ─── -->
      <section class="section">
        <div class="sec-head">
          <p class="sec-label">
            01 ─── <span class="dot dot-green" aria-hidden="true"></span> LIVE NOW
          </p>
          <div class="sec-meta">
            <span class="dot dot-green" aria-hidden="true"></span> {{ activeCourses.length }} COURSES
          </div>
        </div>
        <hr class="sec-divider" />
        <h2 class="sec-title">active courses</h2>

        <div class="grid">
          @for (c of activeCourses; track c.vol) {
            <a class="card" [routerLink]="c.link">
              <div class="cover" [style.background]="c.coverGradient">
                <span class="cover-initials">{{ c.coverInitials }}</span>
                <span class="cover-tag">{{ c.coverTag }}</span>
              </div>
              <div class="body">
                <p class="meta">
                  VOL. {{ c.vol }}<span class="meta-dot"></span>
                  <span class="free">FREE</span>
                  <span class="meta-dot"></span>ALL LEVELS
                </p>
                <h3 class="name">{{ c.title }}</h3>
                <hr class="hr" />
                <div class="foot">
                  <span>{{ c.lessons }} · {{ c.hours }}</span>
                  <span class="cta">Start <span aria-hidden="true">↗</span></span>
                </div>
              </div>
            </a>
          }
        </div>
      </section>

      <!-- ─── SECTION 02 — IN THE WORKS ─── -->
      <section class="section">
        <div class="sec-head">
          <p class="sec-label sec-label-warn">
            02 ─── <span class="dot dot-orange" aria-hidden="true"></span> IN THE WORKS
          </p>
          <div class="sec-meta">{{ comingTopics.length }} ON DECK</div>
        </div>
        <hr class="sec-divider" />
        <h2 class="sec-title">what's coming next</h2>

        <div class="works">
          <div class="works-left">
            <p class="works-desc">
              Deep-dive courses on the topics most asked about. Each one will ship as a
              full module set with source code, lesson articles, and video walkthroughs —
              same format as the active courses.
            </p>

            <div class="chip-grid">
              @for (t of comingTopics; track t.label) {
                <div class="chip" aria-disabled="true">
                  <span class="chip-icon" aria-hidden="true">{{ t.icon }}</span>
                  <span class="chip-label">{{ t.label }}</span>
                </div>
              }
            </div>
          </div>

          <aside class="notify">
            <p class="notify-eyebrow">GET NOTIFIED</p>
            <h3 class="notify-title">First in line when they drop.</h3>
            <p class="notify-body">
              The newsletter is the first place new courses get announced —
              usually a week before the public launch.
            </p>
            <a routerLink="/" fragment="newsletter" class="notify-btn">
              Join the newsletter <span aria-hidden="true">→</span>
            </a>
            <p class="notify-foot">
              <strong>8,429</strong> developers already in
            </p>
          </aside>
        </div>
      </section>
    </div>

    <app-landing-footer />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    /* ─── BACKGROUND LAYERS (copied from hub-home) ─── */
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

    /* ─── HERO (two-column at >=960px, single column below) ─── */
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: clamp(2.5rem, 4vw, 3.5rem);
      align-items: center;
      padding: clamp(3rem, 9vh, 6rem) 0 clamp(3rem, 7vh, 5rem);
      text-align: left;
    }
    @media (min-width: 960px) {
      .hero { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); }
    }
    .hero-text { min-width: 0; }
    .hero-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem; letter-spacing: 0.22em;
      color: var(--primary); text-transform: uppercase;
      margin: 0 0 1.5rem; font-weight: 700;
    }

    /* ─── HERO VISUAL — animated code editor card ─── */
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
        radial-gradient(45% 55% at 60% 50%, rgba(139, 92, 246, 0.38), transparent 70%),
        radial-gradient(40% 50% at 30% 80%, rgba(6, 182, 212, 0.22), transparent 70%);
      filter: blur(36px);
      z-index: 0;
      animation: hv-glow-pulse 7s ease-in-out infinite;
    }

    .hv-card {
      position: relative;
      z-index: 1;
      background: #0a0e1a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.06) inset,
        0 30px 60px -20px rgba(15, 15, 15, 0.45),
        0 14px 32px -12px rgba(109, 40, 217, 0.32);
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
      gap: 0.5rem;
      padding: 0.72rem 0.95rem;
      background: rgba(255, 255, 255, 0.035);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .hv-tl {
      width: 11px; height: 11px; border-radius: 50%; display: inline-block;
    }
    .hv-tl-r { background: #ff5f57; }
    .hv-tl-y { background: #febc2e; }
    .hv-tl-g { background: #28c840; }
    .hv-file {
      margin-left: 0.55rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.76rem;
      color: rgba(245, 241, 232, 0.55);
    }
    .hv-tag {
      margin-left: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.64rem; font-weight: 700; letter-spacing: 0.12em;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      color: #c4b5fd;
      background: rgba(139, 92, 246, 0.16);
      border: 1px solid rgba(139, 92, 246, 0.32);
    }

    .hv-code {
      padding: 1.15rem 1.25rem 1.45rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.88rem;
      line-height: 1.7;
      color: #d1d5db;
    }
    .hv-c-line {
      display: block;
      white-space: pre;
      opacity: 0;
      transform: translateX(-4px);
      animation: hv-type 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .hv-c-line:nth-child(1) { animation-delay: 0.55s; }
    .hv-c-line:nth-child(2) { animation-delay: 0.80s; }
    .hv-c-line:nth-child(3) { animation-delay: 1.05s; }
    .hv-c-line:nth-child(4) { animation-delay: 1.30s; }
    .hv-c-line:nth-child(5) { animation-delay: 1.55s; }
    .hv-c-kw  { color: #c084fc; }
    .hv-c-fn  { color: #67e8f9; }
    .hv-c-str { color: #fde047; }
    .hv-c-caret {
      display: inline-block;
      width: 7px; height: 1em;
      background: #a78bfa;
      margin-left: 4px;
      vertical-align: -2px;
      animation: hv-caret 1s steps(2) 2s infinite;
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
      background: var(--accent);
      box-shadow: 0 0 0 4px rgba(4, 120, 87, 0.16);
      animation: hv-pulse 2.2s ease-in-out infinite;
    }
    .hv-badge-sep { color: var(--text-muted); }

    @keyframes hv-enter {
      from { opacity: 0; transform: translateY(22px) rotate(-3deg); }
      to   { opacity: 1; transform: translateY(0)    rotate(-1.5deg); }
    }
    @keyframes hv-float {
      from { transform: translateY(0)     rotate(-1.5deg); }
      to   { transform: translateY(-12px) rotate(-0.6deg); }
    }
    @keyframes hv-glow-pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50%      { opacity: 1;   transform: scale(1.06); }
    }
    @keyframes hv-pulse {
      0%, 100% { box-shadow: 0 0 0 4px rgba(4, 120, 87, 0.16); }
      50%      { box-shadow: 0 0 0 7px rgba(4, 120, 87, 0.06); }
    }
    @keyframes hv-caret { 50% { opacity: 0; } }
    @keyframes hv-type {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes hv-badge-enter {
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .hv-card, .hv-badge, .hv-glow, .hv-c-line, .hv-c-caret, .hv-badge-dot {
        animation: none !important;
      }
      .hv-card, .hv-badge { opacity: 1; }
      .hv-card { transform: rotate(-1deg); }
      .hv-c-line { opacity: 1; transform: none; }
    }
    .hero-title {
      font-size: clamp(1.85rem, 4.4vw, 3.4rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.02;
      margin: 0 0 1.25rem;
      max-width: 760px;
      color: var(--text);
      text-wrap: balance;
    }
    .hero-sub {
      color: var(--text-soft);
      font-size: clamp(1.02rem, 1.35vw, 1.18rem);
      line-height: 1.65; max-width: 640px;
      margin: 0 0 1.75rem;
    }
    .hero-stats {
      display: flex; flex-wrap: wrap; align-items: center;
      gap: 0.55rem 0.75rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.78rem; letter-spacing: 0.1em;
      color: var(--text-muted); text-transform: uppercase;
    }
    .hero-stats .stat-dot { color: var(--text-muted); }
    .hero-stats .stat-free { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent); font-weight: 700; }

    /* shared dot ornaments */
    .dot {
      display: inline-block; width: 7px; height: 7px;
      border-radius: 50%; vertical-align: middle;
    }
    .dot-green {
      background: var(--accent);
      box-shadow: 0 0 0 4px rgba(4, 120, 87, 0.16);
    }
    .dot-orange {
      background: var(--warn);
      box-shadow: 0 0 0 4px rgba(180, 83, 9, 0.18);
    }

    /* ─── SECTION HEAD (matches hub-home) ─── */
    .section { padding: clamp(2.5rem, 6.5vh, 4.5rem) 0; }
    .sec-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap;
    }
    .sec-label {
      display: inline-flex; align-items: center; gap: 0.65rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.16em;
      color: var(--primary);
      text-transform: uppercase; margin: 0; font-weight: 600;
    }
    .sec-label-warn { color: var(--warn); }
    .sec-meta {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.14em; color: var(--text-muted);
    }
    .sec-divider {
      border: 0; border-top: 1px solid var(--border);
      margin: 0 0 clamp(1.25rem, 2.5vw, 1.75rem);
    }
    .sec-title {
      font-size: clamp(2.2rem, 5.5vw, 4rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 1;
      margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
      color: var(--text);
      padding: 0; border: 0;
    }

    /* ─── COURSE GRID ─── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

    .cover {
      position: relative; height: 210px; padding: 1.5rem;
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
    .cover-tag {
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
      font-size: 0.7rem; letter-spacing: 0.12em; color: var(--text-muted);
      text-transform: uppercase; margin: 0 0 0.85rem;
    }
    .meta .meta-dot {
      display: inline-block; width: 3px; height: 3px; border-radius: 50%;
      background: var(--text-muted); margin: 0 0.5rem; vertical-align: middle;
    }
    .meta .free { color: var(--accent); font-weight: 700; }
    .name {
      font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em;
      margin: 0 0 0.9rem; color: var(--text);
    }
    .hr { border: 0; border-top: 1px solid var(--border-chrome); margin: 0 0 1rem; }
    .foot {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.82rem; letter-spacing: 0.04em; color: var(--text-muted);
    }
    .cta {
      display: inline-flex; align-items: center; gap: 0.4rem;
      color: var(--primary); font-weight: 700;
      transition: gap 0.25s ease, color 0.25s ease;
    }

    /* ─── IN-THE-WORKS LAYOUT ─── */
    .works {
      display: flex; flex-wrap: wrap;
      gap: clamp(1.5rem, 3vw, 2.5rem);
      align-items: flex-start;
    }
    .works-left {
      flex: 1 1 480px; min-width: 0;
    }
    .works-desc {
      color: var(--text-soft);
      font-size: 1rem; line-height: 1.65;
      max-width: 540px;
      margin: 0 0 1.75rem;
    }

    .chip-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }
    .chip {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 1rem 1.1rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow-sm);
      opacity: 0.95; cursor: default;
      transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .chip:hover {
      border-color: var(--primary);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .chip-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 24px; height: 24px;
      color: var(--primary); font-size: 0.9rem;
      flex-shrink: 0;
    }
    .chip-label {
      font-size: 0.92rem; font-weight: 700; letter-spacing: -0.01em;
      color: var(--text);
    }

    /* notify card */
    .notify {
      flex: 1 1 360px; min-width: 0;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: clamp(1.5rem, 2.5vw, 2rem);
      box-shadow: var(--shadow-md);
    }
    .notify-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.18em;
      color: var(--primary); text-transform: uppercase;
      margin: 0 0 1rem; font-weight: 700;
    }
    .notify-title {
      font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em;
      line-height: 1.15; margin: 0 0 0.85rem;
      color: var(--text);
    }
    .notify-body {
      color: var(--text-soft);
      font-size: 0.96rem; line-height: 1.6;
      margin: 0 0 1.5rem;
    }
    .notify-btn {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 0.9rem 1.4rem;
      background: var(--text); color: var(--text-on-dark);
      font-weight: 700; font-size: 0.95rem;
      border: 0; border-radius: 999px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, gap 0.2s ease;
    }
    .notify-btn:hover {
      transform: translateY(-1px);
      background: #1c1917;
      box-shadow: 0 8px 22px rgba(10, 10, 10, 0.22);
      gap: 0.6rem;
    }
    .notify-foot {
      margin: 1.2rem 0 0;
      font-size: 0.88rem;
      color: var(--text-muted);
    }
    .notify-foot strong { color: var(--text); font-weight: 700; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 860px) {
      .hero { padding: 2.5rem 0 2rem; }
      .sec-head { flex-wrap: wrap; gap: 0.5rem; }
      .chip-grid { grid-template-columns: repeat(2, 1fr); }
      .works { flex-direction: column; }
      .works-left, .notify { flex: 1 1 100%; width: 100%; }
    }
    @media (max-width: 520px) {
      .chip-grid { grid-template-columns: 1fr; }
      .hero-stats { font-size: 0.72rem; gap: 0.45rem 0.6rem; }
    }
  `]
})
export class CoursesComponent {
  activeCourses: CourseCard[] = [
    {
      vol: '01',
      title: '.NET Web API Zero to Hero',
      link: '/dotnet',
      lessons: '127 lessons',
      hours: '60+ hours',
      coverInitials: '.NET',
      coverTag: '.NET · ZERO TO HERO',
      coverGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 70%, #8b5cf6 100%)'
    },
    {
      vol: '02',
      title: 'Interview Notes & PDFs',
      link: '/notes',
      lessons: '4 PDFs',
      hours: '475+ pages',
      coverInitials: 'PDF',
      coverTag: 'NOTES · DOWNLOAD',
      coverGradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 70%, #f59e0b 100%)'
    }
  ];

  comingTopics: ComingTopic[] = [
    { label: 'Angular Roadmap',    icon: '▲' },
    { label: 'React Roadmap',      icon: '◆' },
    { label: 'Docker & Kubernetes', icon: '◇' },
    { label: 'Clean Architecture', icon: '▤' },
    { label: 'System Design',      icon: '◈' }
  ];
}
