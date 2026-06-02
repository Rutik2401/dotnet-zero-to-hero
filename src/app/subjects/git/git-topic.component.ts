import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';
import { PageTocService, TocItem } from '../../shared/page-toc/page-toc.service';
import { SITE_URL } from '../../shared/site.config';
import { GitLesson } from './topic.types';
import { GitTopic, adjacentGitTopics, gitTopicBySlug } from './git-topics';

/** Every Git lesson shares the same section skeleton, so the TOC is fixed. */
const LESSON_SECTIONS: TocItem[] = [
  { id: 'what-is-this',   title: 'What is this?' },
  { id: 'why-it-matters', title: 'Why it matters' },
  { id: 'real-life',      title: 'Real-life picture' },
  { id: 'how-it-works',   title: 'How it works' },
  { id: 'try-it',         title: 'Try it' },
  { id: 'mistakes',       title: 'Mistakes → fixes' },
  { id: 'interview',      title: 'Interview questions' }
];

@Component({
  selector: 'app-git-topic',
  imports: [RouterLink, CodeBlockComponent],
  template: `
    @if (lesson(); as l) {
      <article class="lesson">
        <header class="lesson-head">
          <p class="lesson-eyebrow">{{ topic?.tag }} · LESSON {{ topic?.vol }}</p>
          <h1 class="lesson-title">{{ l.title }}</h1>
        </header>

        <section class="block" id="what-is-this">
          <h2 class="block-h">What is this?</h2>
          @for (p of l.whatIsThis; track p) { <p class="prose">{{ p }}</p> }
        </section>

        <section class="block" id="why-it-matters">
          <h2 class="block-h">Why it matters</h2>
          @for (p of l.whyItMatters; track p) { <p class="prose">{{ p }}</p> }
        </section>

        <section class="block" id="real-life">
          <h2 class="block-h">A real-life way to picture it</h2>
          @for (p of l.realLifeExample; track p) { <p class="prose">{{ p }}</p> }
        </section>

        <section class="block" id="how-it-works">
          <h2 class="block-h">How it works, step by step</h2>
          <ol class="steps">
            @for (s of l.howItWorks; track s) { <li>{{ s }}</li> }
          </ol>
        </section>

        <section class="block" id="try-it">
          <h2 class="block-h">Try it</h2>
          <app-code-block [code]="l.codeExample" label="terminal" />
          @if (l.codeOutput) {
            <pre class="code-output" aria-label="Expected output">{{ l.codeOutput }}</pre>
          }
        </section>

        <section class="block" id="mistakes">
          <h2 class="block-h">❌ Where devs actually go wrong → ✅ the fix</h2>
          <div class="mf-grid">
            @for (m of l.mistakeFixes; track m.mistake) {
              <div class="mf-card">
                <div class="mf-row mf-bad">
                  <span class="mf-tag mf-tag-bad">Mistake</span>
                  <div class="mf-body">
                    <p>{{ m.mistake }}</p>
                    @if (m.badCommand) { <code class="mf-cmd mf-cmd-bad">{{ m.badCommand }}</code> }
                  </div>
                </div>
                <div class="mf-row mf-good">
                  <span class="mf-tag mf-tag-good">Fix</span>
                  <div class="mf-body">
                    <p>{{ m.fix }}</p>
                    @if (m.fixCommand) { <code class="mf-cmd mf-cmd-good">{{ m.fixCommand }}</code> }
                  </div>
                </div>
                <div class="mf-row mf-why">
                  <span class="mf-tag mf-tag-why">Why</span>
                  <div class="mf-body"><p>{{ m.why }}</p></div>
                </div>
              </div>
            }
          </div>
        </section>

        <section class="block" id="interview">
          <h2 class="block-h">Interview questions</h2>
          <div class="qa-list">
            @for (qa of l.interviewQuestions; track qa.q) {
              <details class="qa">
                <summary class="qa-q">{{ qa.q }}</summary>
                <p class="qa-a">{{ qa.a }}</p>
              </details>
            }
          </div>
        </section>

        <aside class="protip">
          <span class="protip-label">💡 Pro tip</span>
          <p>{{ l.proTip }}</p>
        </aside>

        <nav class="prevnext" aria-label="Lesson navigation">
          @if (prev) {
            <a class="pn pn-prev" [routerLink]="['/git', prev.slug]">
              <span class="pn-dir">← Previous</span>
              <span class="pn-label">{{ prev.navLabel }}</span>
            </a>
          } @else { <span></span> }
          @if (next) {
            <a class="pn pn-next" [routerLink]="['/git', next.slug]">
              <span class="pn-dir">Next →</span>
              <span class="pn-label">{{ next.navLabel }}</span>
            </a>
          }
        </nav>
      </article>
    } @else {
      <div class="lesson-loading" role="status">Loading lesson…</div>
    }
  `,
  styles: [`
    :host { display: block; }
    .lesson { max-width: 760px; margin: 0 auto; padding: clamp(1.5rem, 4vw, 2.5rem) 0 1rem; }

    .lesson-head { margin-bottom: 2rem; }
    .lesson-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--primary); font-weight: 700; margin: 0 0 0.75rem; line-height: 1.5;
    }
    .lesson-title {
      font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.12; margin: 0; color: var(--text);
      text-wrap: balance;
    }

    .block { margin: 0 0 2.25rem; }
    .block-h {
      font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em;
      color: var(--text); margin: 0 0 0.9rem; line-height: 1.3;
    }
    .prose { color: var(--text-soft); font-size: 1.0625rem; line-height: 1.7; margin: 0 0 0.85rem; }
    .steps { color: var(--text-soft); font-size: 1.0625rem; line-height: 1.7; margin: 0; padding-left: 1.3rem; }
    .steps li { margin: 0 0 0.55rem; }

    .code-output {
      margin: 0.85rem 0 0; padding: 1rem 1.15rem;
      background: #0a0e1a; color: #d1d5db; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.875rem; line-height: 1.6; white-space: pre-wrap; overflow-x: auto;
    }

    /* ── Mistake / Fix / Why cards ── */
    .mf-grid { display: grid; gap: 1.1rem; }
    .mf-card {
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      background: var(--bg-card); box-shadow: var(--shadow-sm);
    }
    .mf-row { display: flex; gap: 0.85rem; padding: 1rem 1.15rem; }
    .mf-bad  { background: rgba(220, 38, 38, 0.05); border-bottom: 1px solid var(--border); }
    .mf-good { background: rgba(4, 120, 87, 0.05); border-bottom: 1px solid var(--border); }
    .mf-why  { background: transparent; }
    .mf-tag {
      flex-shrink: 0; align-self: flex-start;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase;
      font-weight: 700; padding: 0.25rem 0.55rem; border-radius: 999px; line-height: 1.5;
    }
    .mf-tag-bad  { color: #b91c1c; background: rgba(220, 38, 38, 0.12); }
    .mf-tag-good { color: #047857; background: rgba(4, 120, 87, 0.12); }
    .mf-tag-why  { color: var(--primary); background: rgba(109, 40, 217, 0.12); }
    .mf-body { min-width: 0; }
    .mf-body p { margin: 0; color: var(--text); font-size: 0.9875rem; line-height: 1.6; }
    .mf-cmd {
      display: inline-block; margin-top: 0.5rem; padding: 0.35rem 0.6rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.8125rem;
      border-radius: 8px; white-space: pre-wrap; word-break: break-word;
    }
    .mf-cmd-bad  { background: rgba(220, 38, 38, 0.1); color: #b91c1c; }
    .mf-cmd-good { background: #0a0e1a; color: #67e8f9; }

    /* ── Interview Q&A ── */
    .qa-list { display: grid; gap: 0.6rem; }
    .qa {
      border: 1px solid var(--border); border-radius: 12px;
      background: var(--bg-card); overflow: hidden;
    }
    .qa-q {
      cursor: pointer; padding: 0.95rem 1.1rem; font-weight: 600;
      color: var(--text); font-size: 0.9875rem; line-height: 1.5; list-style: none;
    }
    .qa-q::-webkit-details-marker { display: none; }
    .qa-q::before { content: '＋ '; color: var(--primary); font-weight: 700; }
    .qa[open] .qa-q::before { content: '－ '; }
    .qa-a {
      margin: 0; padding: 0 1.1rem 1.05rem; color: var(--text-soft);
      font-size: 0.9875rem; line-height: 1.65;
    }

    /* ── Pro tip ── */
    .protip {
      margin: 2.5rem 0; padding: 1.25rem 1.4rem;
      border: 1px solid var(--border); border-left: 3px solid var(--primary);
      border-radius: 12px; background: rgba(109, 40, 217, 0.04);
    }
    .protip-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--primary); font-weight: 700; display: block; margin-bottom: 0.5rem;
    }
    .protip p { margin: 0; color: var(--text); font-size: 1rem; line-height: 1.65; }

    /* ── Prev / Next ── */
    .prevnext {
      display: flex; justify-content: space-between; gap: 1rem;
      margin: 2.5rem 0 0; padding-top: 1.5rem; border-top: 1px solid var(--border);
    }
    .pn {
      display: flex; flex-direction: column; gap: 0.25rem;
      text-decoration: none; padding: 0.85rem 1.1rem;
      border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card);
      transition: border-color 0.2s ease, transform 0.2s ease;
      max-width: 48%;
    }
    .pn:hover { border-color: var(--border-strong); transform: translateY(-2px); }
    .pn-next { text-align: right; margin-left: auto; }
    .pn-dir {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.06em; color: var(--text-muted);
    }
    .pn-label { font-weight: 700; color: var(--text); font-size: 0.9375rem; }

    .lesson-loading {
      max-width: 760px; margin: 0 auto; padding: 4rem 0;
      text-align: center; color: var(--text-muted);
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.875rem;
    }

    @media (max-width: 560px) {
      .pn { max-width: 100%; }
      .prevnext { flex-direction: column; }
    }
  `]
})
export class GitTopicComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly doc = inject(DOCUMENT);
  private readonly toc = inject(PageTocService);

  protected readonly lesson = signal<GitLesson | null>(null);
  protected topic?: GitTopic;
  protected prev?: GitTopic;
  protected next?: GitTopic;

  private jsonLd?: HTMLScriptElement;

  ngOnInit(): void {
    const slug = this.route.snapshot.data['slug'] as string;
    this.topic = gitTopicBySlug(slug);
    const adj = adjacentGitTopics(slug);
    this.prev = adj.prev;
    this.next = adj.next;

    // Content is resolved by gitLessonResolver before the route renders, so it
    // is available synchronously here and is captured in the prerendered HTML.
    const data = this.route.snapshot.data['lesson'] as GitLesson | undefined;
    if (data) {
      this.lesson.set(data);
      this.injectJsonLd(data);
      // Publish the section list to the shell's right-side "On this page" TOC.
      this.toc.setTopics(LESSON_SECTIONS);
    }
  }

  ngOnDestroy(): void {
    this.jsonLd?.remove();
    this.toc.clear();
  }

  /** Course + breadcrumb structured data for rich results. */
  private injectJsonLd(lesson: GitLesson): void {
    if (!this.topic) return;
    const url = `${SITE_URL}/git/${this.topic.slug}`;
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Course',
          name: lesson.title,
          description: this.topic.metaDescription,
          url,
          provider: { '@type': 'Organization', name: 'Learn Hub', url: SITE_URL }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Courses', item: `${SITE_URL}/courses` },
            { '@type': 'ListItem', position: 2, name: 'Git & GitHub', item: `${SITE_URL}/git` },
            { '@type': 'ListItem', position: 3, name: this.topic.navLabel, item: url }
          ]
        }
      ]
    };
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(graph);
    this.doc.head.appendChild(script);
    this.jsonLd = script;
  }
}
