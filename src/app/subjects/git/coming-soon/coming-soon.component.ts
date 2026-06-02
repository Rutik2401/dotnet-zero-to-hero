import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { gitTopicBySlug } from '../git-topics';

@Component({
  selector: 'app-git-coming-soon',
  imports: [RouterLink],
  template: `
    <div class="cs">
      <p class="cs-eyebrow">COMING SOON</p>
      <h1 class="cs-title">{{ topic?.cardTitle ?? 'This lesson' }} is on the way</h1>
      <p class="cs-sub">{{ topic?.cardDesc }}</p>
      <p class="cs-note">
        The earlier lessons are live now — start there and this one will slot in
        right after.
      </p>
      <a class="cs-btn" routerLink="/git">← Back to course home</a>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .cs { max-width: 620px; margin: 0 auto; padding: clamp(3rem, 10vh, 6rem) 0; text-align: center; }
    .cs-eyebrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; letter-spacing: 0.12em; color: var(--warn);
      font-weight: 700; margin: 0 0 1rem;
    }
    .cs-title {
      font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; letter-spacing: -0.03em;
      line-height: 1.15; margin: 0 0 1rem; color: var(--text); text-wrap: balance;
    }
    .cs-sub { color: var(--text-soft); font-size: 1.0625rem; line-height: 1.65; margin: 0 0 1rem; }
    .cs-note { color: var(--text-muted); font-size: 0.9375rem; line-height: 1.6; margin: 0 0 2rem; }
    .cs-btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.85rem 1.4rem; background: var(--text); color: var(--text-on-dark);
      font-weight: 700; font-size: 0.9375rem; border-radius: 999px; text-decoration: none;
      transition: transform 0.2s ease;
    }
    .cs-btn:hover { transform: translateY(-2px); }
  `]
})
export class GitComingSoonComponent {
  private readonly route = inject(ActivatedRoute);
  protected topic = gitTopicBySlug(this.route.snapshot.data['slug'] as string);
}
