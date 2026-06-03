import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavComponent } from '../../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../../shared/landing-footer/landing-footer.component';
import { GIT_TOPICS_IN_ORDER } from '../git-topics';

@Component({
  selector: 'app-git-home',
  imports: [RouterLink, LandingNavComponent, LandingFooterComponent],
  template: `
    <div class="cream-bg" aria-hidden="true"></div>
    <div class="cream-grid" aria-hidden="true"></div>

    <div class="wrap">
      <app-landing-nav />

      <section class="hero" id="main-content" tabindex="-1">
        <p class="hero-eyebrow">GIT &amp; GITHUB · BASIC → ADVANCED</p>
        <h1 class="hero-title">
          Git, taught around the <span class="accent">mistakes developers actually make.</span>
        </h1>
        <p class="hero-sub">
          Not a command dictionary. Every lesson shows the wrong way devs really do it,
          the correct fix, and <em>why</em> — from your first commit to recovering lost
          work, ending with the interview questions everyone gets asked.
        </p>
        <div class="hero-stats">
          <span><strong>{{ readyCount }}</strong> live lessons</span>
          <span class="dot">·</span>
          <span><strong>{{ totalCount }}</strong> total topics</span>
          <span class="dot">·</span>
          <span class="free">All free</span>
        </div>
        @if (firstTopic) {
          <a class="hero-cta" [routerLink]="['/git', firstTopic.slug]">
            Start with {{ firstTopic.navLabel }} <span aria-hidden="true">→</span>
          </a>
        }
      </section>

      <section class="section">
        <div class="sec-head">
          <p class="sec-label">01 ─── THE ROADMAP</p>
          <div class="sec-meta">{{ totalCount }} TOPICS</div>
        </div>
        <hr class="sec-divider" />
        <h2 class="sec-title">what you'll learn</h2>

        <div class="grid">
          @for (t of topics; track t.slug) {
            @if (t.ready) {
              <a class="card" [routerLink]="['/git', t.slug]">
                <div class="cover" [style.background]="t.coverGradient">
                  <span class="cover-icon">{{ t.coverIcon }}</span>
                  <span class="cover-tag">{{ t.tag }}</span>
                </div>
                <div class="body">
                  <p class="meta">
                    VOL. {{ t.vol }}<span class="meta-dot"></span>
                    <span class="free">FREE</span><span class="meta-dot"></span>{{ t.level }}
                  </p>
                  <h3 class="name">{{ t.cardTitle }}</h3>
                  <p class="desc">{{ t.cardDesc }}</p>
                  <hr class="hr" />
                  <div class="foot">
                    <span>{{ t.lessons }} lessons · {{ t.minutes }} min</span>
                    <span class="cta">Start <span aria-hidden="true">↗</span></span>
                  </div>
                </div>
              </a>
            } @else {
              <div class="card card-soon" aria-disabled="true">
                <div class="cover" [style.background]="t.coverGradient">
                  <span class="cover-icon">{{ t.coverIcon }}</span>
                  <span class="cover-tag">{{ t.tag }}</span>
                </div>
                <div class="body">
                  <p class="meta">
                    VOL. {{ t.vol }}<span class="meta-dot"></span>
                    <span class="soon">SOON</span><span class="meta-dot"></span>{{ t.level }}
                  </p>
                  <h3 class="name">{{ t.cardTitle }}</h3>
                  <p class="desc">{{ t.cardDesc }}</p>
                  <hr class="hr" />
                  <div class="foot">
                    <span>{{ t.lessons }} lessons · {{ t.minutes }} min</span>
                    <span class="cta cta-soon">Coming soon</span>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </section>
    </div>

    <app-landing-footer />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .cream-bg, .cream-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .cream-bg {
      background:
        radial-gradient(60rem 36rem at 12% -8%, rgba(220, 38, 38, 0.07), transparent 60%),
        radial-gradient(50rem 36rem at 100% 100%, rgba(245, 158, 11, 0.06), transparent 60%);
    }
    .cream-grid {
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.7;
    }

    .wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2rem); }

    .hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 3.5rem); max-width: 820px; }
    .hero-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; letter-spacing: 0.12em; color: var(--primary);
      text-transform: uppercase; font-weight: 700; margin: 0 0 1.25rem; line-height: 1.5;
    }
    .hero-title {
      font-size: clamp(2.1rem, 5.5vw, 3.6rem); font-weight: 800; letter-spacing: -0.03em;
      line-height: 1.1; margin: 0 0 1.5rem; color: var(--text); text-wrap: balance;
    }
    .hero-title .accent { color: var(--primary); }
    .hero-sub { color: var(--text-soft); font-size: clamp(1.0625rem, 1.5vw, 1.1875rem); line-height: 1.65; max-width: 660px; margin: 0 0 1.5rem; }
    .hero-stats {
      display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.85rem;
      color: var(--text-soft); font-size: 0.9375rem; margin: 0 0 1.75rem;
    }
    .hero-stats strong { color: var(--text); font-weight: 700; }
    .hero-stats .dot { color: var(--text-muted); }
    .hero-stats .free { color: var(--accent); font-weight: 700; }
    .hero-cta {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.9rem 1.6rem; background: var(--text); color: var(--text-on-dark);
      font-weight: 700; font-size: 0.9375rem; border-radius: 999px; text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease, gap 0.2s ease;
    }
    .hero-cta:hover { transform: translateY(-2px); gap: 0.7rem; box-shadow: 0 12px 28px rgba(10,10,10,0.2); }

    .section { padding: clamp(2rem, 5vh, 3.5rem) 0 clamp(3rem, 8vh, 5rem); }
    .sec-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
    .sec-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.8125rem;
      letter-spacing: 0.10em; color: var(--primary); text-transform: uppercase; margin: 0; font-weight: 600;
    }
    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem;
      letter-spacing: 0.10em; color: var(--text-muted);
    }
    .sec-divider { border: 0; border-top: 1px solid var(--border); margin: 0 0 clamp(1.25rem, 2.5vw, 1.75rem); }
    .sec-title {
      font-size: clamp(1.85rem, 4vw, 2.6rem); font-weight: 700; letter-spacing: -0.03em;
      line-height: 1.1; margin: 0 0 clamp(1.75rem, 3vw, 2.5rem); color: var(--text);
    }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
    .card {
      display: flex; flex-direction: column; background: var(--bg-card);
      border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
      text-decoration: none; color: inherit; box-shadow: var(--shadow-sm);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-6px); border-color: var(--border-strong);
      box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 22px 48px rgba(15,15,15,0.12);
    }
    .card:hover .cta { gap: 0.55rem; color: var(--text); }
    .card-soon { opacity: 0.82; pointer-events: none; }

    .cover { position: relative; height: 170px; padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
    .cover::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.30) 0%, transparent 65%); }
    .cover-icon {
      position: relative; z-index: 1; font-size: 2.6rem; font-weight: 800; letter-spacing: -0.03em;
      color: rgba(255,255,255,0.96); text-shadow: 0 4px 24px rgba(0,0,0,0.4); align-self: flex-start;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .cover-tag {
      position: relative; z-index: 1; font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.9);
      align-self: flex-end; padding: 0.3rem 0.65rem; background: rgba(0,0,0,0.32); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; line-height: 1.5;
    }

    .body { padding: 1.3rem 1.4rem 1.4rem; flex: 1; display: flex; flex-direction: column; }
    .meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.72rem; letter-spacing: 0.10em;
      color: var(--text-muted); text-transform: uppercase; margin: 0 0 0.75rem; line-height: 1.5;
    }
    .meta .meta-dot { display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: var(--text-muted); margin: 0 0.5rem; vertical-align: middle; }
    .meta .free { color: var(--accent); font-weight: 700; }
    .meta .soon { color: var(--warn); font-weight: 700; }
    .name { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; margin: 0 0 0.5rem; color: var(--text); }
    .desc { color: var(--text-soft); font-size: 0.9rem; line-height: 1.55; margin: 0 0 1.1rem; }
    .hr { border: 0; border-top: 1px solid var(--border-chrome); margin: auto 0 0.9rem; }
    .foot {
      display: flex; align-items: center; justify-content: space-between;
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.78rem;
      letter-spacing: 0.04em; color: var(--text-muted);
    }
    .cta { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--primary); font-weight: 700; transition: gap 0.25s ease, color 0.25s ease; }
    .cta-soon { color: var(--text-muted); }

    @media (max-width: 560px) {
      .cover { height: 140px; }
      .cover-icon { font-size: 2.1rem; }
    }
  `]
})
export class GitHomeComponent {
  topics = GIT_TOPICS_IN_ORDER;
  readonly totalCount = this.topics.length;
  readonly readyCount = this.topics.filter(t => t.ready).length;
  get firstTopic() { return this.topics.find(t => t.ready); }
}
