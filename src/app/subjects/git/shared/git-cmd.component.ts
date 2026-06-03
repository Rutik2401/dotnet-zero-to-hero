import { Component, input, signal } from '@angular/core';

/**
 * A copyable command box with a copy icon, used everywhere a Git command is
 * shown (mistake/fix cards, cheatsheet). Multi-line commands are preserved.
 * `tone` tints it red (a wrong command), green (the fix), or neutral.
 */
@Component({
  selector: 'git-cmd',
  template: `
    <div class="cmd"
         [class.cmd-bad]="tone() === 'bad'"
         [class.cmd-good]="tone() === 'good'">
      <pre class="cmd-text"><code>{{ cmd() }}</code></pre>
      <button type="button" class="cmd-copy"
              [class.copied]="copied()"
              (click)="copy()"
              [attr.aria-label]="copied() ? 'Copied' : 'Copy command'"
              [title]="copied() ? 'Copied' : 'Copy'">
        @if (copied()) {
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        } @else {
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        }
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .cmd {
      position: relative;
      background: #0a0e1a;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 10px;
      padding: 0.7rem 2.4rem 0.7rem 0.85rem;
    }
    .cmd-bad  { border-color: rgba(220, 38, 38, 0.4); background: #1a0d0e; }
    .cmd-good { border-color: rgba(4, 120, 87, 0.4); }
    .cmd-text {
      margin: 0; overflow-x: auto;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem; line-height: 1.55;
      color: #d1d5db; white-space: pre;
    }
    .cmd-bad  .cmd-text { color: #fca5a5; }
    .cmd-good .cmd-text { color: #6ee7b7; }
    .cmd-copy {
      position: absolute; top: 0.45rem; right: 0.45rem;
      display: inline-flex; align-items: center; justify-content: center;
      width: 26px; height: 26px; padding: 0;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 7px; color: #cbd5e1; cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    .cmd-copy:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
    .cmd-copy.copied { color: #34d399; border-color: rgba(4, 120, 87, 0.5); }
  `]
})
export class GitCmdComponent {
  cmd = input.required<string>();
  tone = input<'bad' | 'good' | 'neutral'>('neutral');

  protected readonly copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.cmd());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      /* Clipboard unavailable (non-secure context) — ignore. */
    }
  }
}
