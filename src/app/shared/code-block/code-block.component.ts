import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  template: `
    <div class="code-block">
      <button type="button"
              class="btn-copy"
              [class.copied]="copied()"
              (click)="copy()"
              [attr.aria-label]="copied() ? 'Code copied' : 'Copy code'">
        @if (copied()) {
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Copied</span>
        } @else {
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>Copy</span>
        }
      </button>
      <pre [attr.data-label]="label()"><code>{{ code() }}</code></pre>
    </div>
  `
})
export class CodeBlockComponent {
  code  = input.required<string>();
  label = input<string>('Program.cs');

  protected readonly copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard not available (non-secure context) — silently ignore.
    }
  }
}
