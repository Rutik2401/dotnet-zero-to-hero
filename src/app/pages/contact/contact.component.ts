import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';

interface StartingPoint {
  label: string;
  title: string;
  desc: string;
  subject: string;
  accent: string;
}

interface DirectChannel {
  label: string;
  value: string;
  note: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LandingNavComponent, LandingFooterComponent],
  template: `
    <div class="page-grid" aria-hidden="true"></div>

    <div class="page-wrap">
      <app-landing-nav />

      <section class="page-hero">
        <p class="page-eyebrow">Contact</p>
        <h1 class="page-title">
          let's <span class="accent-mark">talk.</span>
        </h1>
        <p class="page-sub">
          Sponsorships, collaborations, topic suggestions, or just a hello.
          I read every message and reply within a day on weekdays.
        </p>
      </section>

      <section class="page-section">
        <div class="sec-head">
          <p class="page-seclabel"><span class="sec-num">01</span> Pick a starting point</p>
          <h2 class="page-sectitle">what's this about?</h2>
          <p class="sec-meta">3 OPTIONS</p>
        </div>

        <div class="options-grid">
          @for (opt of startingPoints; track opt.subject) {
            <button
              type="button"
              class="card option-card"
              [style.--opt-accent]="opt.accent"
              (click)="pickStartingPoint(opt)"
            >
              <span class="opt-label">{{ opt.label }}</span>
              <h3 class="opt-title">{{ opt.title }}</h3>
              <p class="opt-desc">{{ opt.desc }}</p>
              <span class="opt-pick">Select this <span aria-hidden="true">→</span></span>
            </button>
          }
        </div>
      </section>

      <section class="page-section two-col">
        <div class="col col-form">
          <div class="sec-head">
            <p class="page-seclabel"><span class="sec-num">02</span> Write to me</p>
            <h2 class="page-sectitle">send a message</h2>
            <p class="sec-meta">30 SEC TO FILL</p>
          </div>

          @if (submitted()) {
            <div class="success-banner" role="status">
              <span class="success-dot" aria-hidden="true"></span>
              Thanks — message received. I'll reply within a day.
            </div>
          }

          <form
            #formEl
            class="contact-form"
            [formGroup]="form"
            (ngSubmit)="onSubmit()"
            novalidate
          >
            <div class="field-row">
              <div class="field">
                <label for="name">NAME</label>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  placeholder="Your name"
                  autocomplete="name"
                />
                @if (showError('name')) {
                  <p class="field-err">Please enter your name.</p>
                }
              </div>

              <div class="field">
                <label for="email">EMAIL</label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  placeholder="you@domain.com"
                  autocomplete="email"
                />
                @if (showError('email')) {
                  <p class="field-err">Please enter a valid email.</p>
                }
              </div>
            </div>

            <div class="field">
              <label for="subject">SUBJECT</label>
              <input
                id="subject"
                type="text"
                formControlName="subject"
                placeholder="What's this about?"
              />
              @if (showError('subject')) {
                <p class="field-err">Please add a subject.</p>
              }
            </div>

            <div class="field">
              <label for="message">MESSAGE</label>
              <textarea
                id="message"
                formControlName="message"
                rows="6"
                placeholder="Tell me what you're working on, what you need, or what you'd like me to write about."
              ></textarea>
              @if (showError('message')) {
                <p class="field-err">Please write a short message.</p>
              }
            </div>

            <div class="form-foot">
              <button type="submit" class="btn btn-primary">
                Send message <span aria-hidden="true">→</span>
              </button>
              <span class="form-hint">No spam. No list. Just a reply.</span>
            </div>
          </form>
        </div>

        <aside class="col col-channels">
          <div class="sec-head">
            <p class="page-seclabel"><span class="sec-num">03</span> Other channels</p>
            <h2 class="page-sectitle small">reach out direct</h2>
          </div>

          <div class="channels">
            @for (ch of directChannels; track ch.label) {
              <a
                class="channel-card"
                [href]="ch.href"
                [attr.target]="ch.href.startsWith('http') ? '_blank' : null"
                [attr.rel]="ch.href.startsWith('http') ? 'noopener noreferrer' : null"
              >
                <span class="ch-label">{{ ch.label }}</span>
                <span class="ch-value">{{ ch.value }}</span>
                <span class="ch-note">{{ ch.note }}</span>
                <span class="ch-arrow" aria-hidden="true">→</span>
              </a>
            }
          </div>
        </aside>
      </section>
    </div>

    <app-landing-footer />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: var(--bg); color: var(--text); }

    .page-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: radial-gradient(rgba(10, 10, 10, 0.045) 1px, transparent 1px);
      background-size: 22px 22px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, #000 35%, transparent 100%);
      opacity: 0.6;
    }

    .page-wrap {
      position: relative; z-index: 1;
      max-width: 1080px; margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
    }

    .page-hero { padding: clamp(2.5rem, 8vh, 5rem) 0 clamp(2rem, 5vh, 4rem); }

    .page-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.16em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 1.1rem; font-weight: 600;
    }

    .page-title {
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 800; letter-spacing: -0.04em; line-height: 0.98;
      margin: 0 0 1.5rem; max-width: 820px; text-wrap: balance;
      color: var(--text);
    }

    .accent-mark { position: relative; display: inline-block; }
    .accent-mark::after {
      content: ''; position: absolute;
      left: 0; right: 0; bottom: 0.04em;
      height: 0.18em;
      background: linear-gradient(90deg, var(--primary) 0%, var(--accent-2) 100%);
      border-radius: 4px; z-index: -1; opacity: 0.85;
    }

    .page-sub {
      color: var(--text-soft);
      font-size: clamp(1.05rem, 1.5vw, 1.18rem);
      line-height: 1.65; max-width: 640px; margin: 0 0 1.85rem;
    }

    .page-section { padding: clamp(2rem, 6vh, 4rem) 0 clamp(2rem, 6vh, 4rem); }

    .sec-head { position: relative; margin-bottom: 2rem; }

    .page-seclabel {
      display: inline-flex; align-items: center; gap: 0.85rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.14em; color: var(--primary);
      text-transform: uppercase; margin: 0 0 0.5rem; font-weight: 600;
    }
    .sec-num {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 28px; height: 22px; padding: 0 0.5rem;
      background: rgba(109, 40, 217, 0.1);
      border: 1px solid rgba(109, 40, 217, 0.25);
      border-radius: 6px;
      color: var(--primary);
      font-size: 0.7rem; font-weight: 700;
    }

    .page-sectitle {
      font-size: clamp(1.85rem, 4vw, 2.6rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
      margin: 0 0 0.5rem; color: var(--text);
      padding: 0; border: 0;
    }
    .page-sectitle.small {
      font-size: clamp(1.5rem, 2.6vw, 1.9rem);
    }

    .sec-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.16em;
      color: var(--text-muted); margin: 0.35rem 0 0; text-transform: uppercase;
    }

    /* ---------- Options grid ---------- */
    .options-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.1rem;
    }

    .option-card {
      --opt-accent: var(--primary);
      position: relative;
      display: flex; flex-direction: column;
      gap: 0.65rem;
      text-align: left;
      padding: 1.4rem 1.35rem 1.3rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 14px;
      cursor: pointer;
      color: var(--text);
      box-shadow: var(--shadow-sm);
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      font: inherit;
    }
    .option-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-md);
      background: var(--bg-card-hover, var(--bg-card));
    }
    .option-card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.22), var(--shadow-md);
      border-color: var(--primary);
    }

    .opt-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.7rem; letter-spacing: 0.16em;
      text-transform: uppercase; font-weight: 700;
      color: var(--opt-accent);
    }
    .opt-title {
      font-size: 1.25rem;
      font-weight: 800; letter-spacing: -0.02em;
      line-height: 1.15;
      margin: 0;
      color: var(--text);
    }
    .opt-desc {
      color: var(--text-soft);
      font-size: 0.93rem;
      line-height: 1.55;
      margin: 0 0 0.4rem;
    }
    .opt-pick {
      margin-top: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.74rem; letter-spacing: 0.12em;
      text-transform: uppercase; font-weight: 600;
      color: var(--opt-accent);
      display: inline-flex; align-items: center; gap: 0.4rem;
      transition: gap 0.2s ease;
    }
    .option-card:hover .opt-pick { gap: 0.65rem; }

    /* ---------- Two-column ---------- */
    .two-col {
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
      gap: clamp(1.5rem, 3vw, 2.5rem);
      align-items: start;
    }

    /* ---------- Form ---------- */
    .contact-form {
      display: flex; flex-direction: column;
      gap: 1.1rem;
      padding: 1.6rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .field { display: flex; flex-direction: column; gap: 0.45rem; }

    .field label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.68rem; letter-spacing: 0.16em;
      text-transform: uppercase; font-weight: 700;
      color: var(--text-muted);
    }

    .field input,
    .field textarea {
      width: 100%;
      padding: 0.85rem 1.1rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      font: inherit;
      font-size: 0.96rem;
      color: var(--text);
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      font-family: var(--font-sans, inherit);
    }
    .field textarea {
      resize: vertical; min-height: 140px;
      line-height: 1.55;
    }
    .field input::placeholder,
    .field textarea::placeholder {
      color: var(--text-muted);
      opacity: 0.8;
    }
    .field input:hover,
    .field textarea:hover {
      border-color: var(--border-strong);
    }
    .field input:focus,
    .field textarea:focus,
    .field input:focus-visible,
    .field textarea:focus-visible {
      outline: none;
      border-color: var(--primary);
      background: var(--bg-card);
      box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.18);
    }

    .field-err {
      margin: 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem;
      color: #b91c1c;
      letter-spacing: 0.04em;
    }

    .form-foot {
      display: flex; align-items: center; flex-wrap: wrap;
      gap: 1rem;
      margin-top: 0.3rem;
    }
    .form-foot .btn { padding: 0.9rem 1.5rem; font-size: 0.95rem; }
    .form-hint {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .success-banner {
      display: inline-flex; align-items: center; gap: 0.7rem;
      padding: 0.75rem 1.1rem;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.14), rgba(34, 197, 94, 0.05));
      border: 1px solid rgba(34, 197, 94, 0.35);
      color: #14532d;
      border-radius: 999px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1.1rem;
      box-shadow: var(--shadow-sm);
    }
    .success-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent, #22c55e);
      box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
    }

    /* ---------- Channels ---------- */
    .channels {
      display: flex; flex-direction: column;
      gap: 1rem;
    }

    .channel-card {
      position: relative;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas:
        'label arrow'
        'value arrow'
        'note  note';
      gap: 0.25rem 0.5rem;
      padding: 1.05rem 1.15rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 14px;
      text-decoration: none;
      color: var(--text);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .channel-card:hover {
      transform: translateY(-2px);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-md);
    }
    .channel-card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px rgba(109, 40, 217, 0.22), var(--shadow-md);
      border-color: var(--primary);
    }
    .ch-label {
      grid-area: label;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.68rem; letter-spacing: 0.16em;
      text-transform: uppercase; font-weight: 700;
      color: var(--primary);
    }
    .ch-value {
      grid-area: value;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: -0.01em;
      color: var(--text);
    }
    .ch-note {
      grid-area: note;
      color: var(--text-soft);
      font-size: 0.85rem;
      line-height: 1.5;
      margin-top: 0.25rem;
    }
    .ch-arrow {
      grid-area: arrow;
      align-self: center;
      font-size: 1.1rem;
      color: var(--text-muted);
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .channel-card:hover .ch-arrow {
      transform: translateX(3px);
      color: var(--primary);
    }

    /* ---------- Responsive ---------- */
    @media (max-width: 860px) {
      .options-grid {
        grid-template-columns: 1fr;
      }
      .two-col {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .field-row {
        grid-template-columns: 1fr;
      }
      .contact-form { padding: 1.25rem; }
    }
  `]
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  @ViewChild('formEl') formEl?: ElementRef<HTMLFormElement>;

  readonly submitted = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(8)]],
  });

  readonly startingPoints: StartingPoint[] = [
    {
      label: 'SPONSORSHIP',
      title: 'reach developers.',
      desc: 'Newsletter primaries, blog placements, and bespoke deals. Reach a focused audience of working engineers across stacks.',
      subject: 'Sponsorship inquiry',
      accent: '#6d28d9',
    },
    {
      label: 'COLLABORATION',
      title: 'build something together.',
      desc: 'Talks, conference workshops, content collaborations, podcast appearances. Open to projects where the audience overlaps.',
      subject: 'Collaboration idea',
      accent: '#8b5cf6',
    },
    {
      label: 'SUGGEST A TOPIC',
      title: 'tell me what to write next.',
      desc: "Stuck on something? Send the problem — it might be the next deep-dive.",
      subject: 'Topic suggestion',
      accent: '#ec4899',
    },
  ];

  readonly directChannels: DirectChannel[] = [
    {
      label: 'EMAIL · PRIMARY',
      value: 'codervibe61@gmail.com',
      note: 'Best for sponsorships, collaborations, and longer messages.',
      href: 'mailto:codervibe61@gmail.com',
    },
    {
      label: 'X / TWITTER',
      value: '@learnhub',
      note: 'Quick public questions and replies.',
      href: 'https://twitter.com/',
    },
    {
      label: 'GITHUB',
      value: '@rutikpimpale2401',
      note: 'Issues, code questions, and contributions.',
      href: 'https://github.com/rutikpimpale2401',
    },
  ];

  pickStartingPoint(opt: StartingPoint): void {
    this.form.patchValue({ subject: opt.subject });
    this.submitted.set(false);
    queueMicrotask(() => {
      this.formEl?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const subjectInput = this.formEl?.nativeElement.querySelector<HTMLInputElement>('#subject');
      subjectInput?.focus({ preventScroll: true });
    });
  }

  showError(name: 'name' | 'email' | 'subject' | 'message'): boolean {
    const ctrl = this.form.controls[name];
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.form.reset({ name: '', email: '', subject: '', message: '' });
    queueMicrotask(() => {
      this.formEl?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
