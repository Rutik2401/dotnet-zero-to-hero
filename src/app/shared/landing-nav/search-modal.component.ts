import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchEntry } from './search.service';

@Component({
  selector: 'app-search-modal',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (svc.isOpen()) {
      <div class="sm-backdrop" (click)="close()" aria-hidden="true"></div>
      <div class="sm-shell" role="dialog" aria-modal="true" aria-label="Search">
        <div #card class="sm-card" (click)="$event.stopPropagation()">
          <div class="sm-input-row">
            <svg class="sm-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-3.5-3.5"/>
            </svg>
            <input #input
                   class="sm-input"
                   type="text"
                   placeholder="Search pages, phases, notes..."
                   [(ngModel)]="queryModel"
                   (ngModelChange)="onQueryChange($event)"
                   (keydown.arrowDown)="moveActive(1, $event)"
                   (keydown.arrowUp)="moveActive(-1, $event)"
                   (keydown.enter)="goToActive($event)"
                   (keydown.escape)="close()"
                   autocomplete="off"
                   spellcheck="false"
                   role="combobox"
                   aria-controls="sm-listbox"
                   aria-autocomplete="list"
                   [attr.aria-expanded]="results().length > 0"
                   [attr.aria-activedescendant]="results().length ? 'sm-opt-' + active() : null"
                   aria-label="Search input" />
            <button class="sm-esc" type="button" (click)="close()" aria-label="Close search">esc</button>
          </div>

          <div class="sm-results" id="sm-listbox" role="listbox" aria-label="Search results">
            @if (results().length === 0) {
              <p class="sm-empty">No matches for "<strong>{{ queryModel }}</strong>"</p>
            }
            @for (e of results(); track e.path; let i = $index) {
              <button class="sm-row"
                      [id]="'sm-opt-' + i"
                      role="option"
                      tabindex="-1"
                      [class.is-active]="i === active()"
                      [attr.aria-selected]="i === active()"
                      type="button"
                      (mouseenter)="active.set(i)"
                      (click)="goTo(e)">
                <span class="sm-kind" [attr.data-kind]="e.kind">{{ e.badge || iconFor(e.kind) }}</span>
                <span class="sm-text">
                  <span class="sm-title">{{ e.title }}</span>
                  <span class="sm-sub">{{ e.subtitle }}</span>
                </span>
                <span class="sm-arrow" aria-hidden="true">↵</span>
              </button>
            }
          </div>

          <div class="sm-foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>esc</kbd> close</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .sm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.45);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 100;
      cursor: pointer;
      animation: smFade 140ms ease-out;
    }
    .sm-shell {
      position: fixed;
      inset: 0;
      z-index: 101;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: clamp(3rem, 12vh, 7rem) 1rem 1rem;
      pointer-events: none;
    }
    .sm-card {
      width: min(640px, 100%);
      background: #ffffff;
      border: 1px solid rgba(10, 10, 10, 0.10);
      border-radius: 18px;
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset,
                  0 30px 60px rgba(15, 15, 15, 0.22),
                  0 8px 22px rgba(15, 15, 15, 0.10);
      overflow: hidden;
      pointer-events: auto;
      animation: smPop 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sm-input-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.95rem 1.1rem;
      border-bottom: 1px solid rgba(10, 10, 10, 0.06);
    }
    /* The search input is borderless and auto-focused on open; show a visible
       focus indicator on the row so keyboard users can see where they are. */
    .sm-input-row:focus-within {
      box-shadow: inset 0 0 0 2px var(--primary, #6d28d9);
      border-radius: 12px 12px 0 0;
    }
    .sm-icon { color: #78716c; flex-shrink: 0; }
    .sm-input {
      flex: 1;
      min-width: 0;
      padding: 0.35rem 0;
      border: 0;
      background: transparent;
      color: #0a0a0a;
      font-size: 1.0625rem;
      line-height: 1.5;
      outline: none;
      font-family: inherit;
    }
    .sm-input::placeholder { color: #a8a29e; }
    .sm-esc {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem;
      padding: 0.28rem 0.55rem;
      color: #78716c;
      background: rgba(10, 10, 10, 0.05);
      border: 1px solid rgba(10, 10, 10, 0.08);
      border-radius: 6px;
      cursor: pointer;
      line-height: 1.4;
      transition: background 0.15s, color 0.15s;
    }
    .sm-esc:hover { background: rgba(10, 10, 10, 0.08); color: #0a0a0a; }

    .sm-results {
      max-height: min(60vh, 480px);
      overflow-y: auto;
      padding: 0.4rem;
    }
    .sm-empty {
      text-align: center;
      padding: 2.5rem 1rem;
      color: #78716c;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }
    .sm-row {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      width: 100%;
      padding: 0.7rem 0.85rem;
      background: transparent;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: background 0.12s ease, transform 0.12s ease;
    }
    .sm-row:hover, .sm-row.is-active {
      background: #f5f1e8;
    }
    .sm-kind {
      flex-shrink: 0;
      width: 50px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #6d28d9;
      background: rgba(139, 92, 246, 0.10);
      border: 1px solid rgba(139, 92, 246, 0.22);
      border-radius: 8px;
      text-transform: uppercase;
      line-height: 1.4;
    }
    .sm-kind[data-kind="phase"] { color: #b45309; background: rgba(180, 83, 9, 0.08); border-color: rgba(180, 83, 9, 0.20); }
    .sm-kind[data-kind="note"]  { color: #047857; background: rgba(4, 120, 87, 0.08); border-color: rgba(4, 120, 87, 0.22); }
    .sm-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .sm-title {
      color: #0a0a0a;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.35;
      letter-spacing: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sm-sub {
      color: #78716c;
      font-size: 0.8125rem;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sm-arrow {
      flex-shrink: 0;
      color: #a8a29e;
      font-size: 1rem;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .sm-row.is-active .sm-arrow { opacity: 1; color: #6d28d9; }

    .sm-foot {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.85rem;
      padding: 0.65rem 1rem;
      background: #faf8f2;
      border-top: 1px solid rgba(10, 10, 10, 0.06);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.8125rem;
      color: #78716c;
      line-height: 1.5;
    }
    .sm-foot kbd {
      display: inline-block;
      padding: 0.1rem 0.38rem;
      margin: 0 0.18rem 0 0;
      background: #fff;
      border: 1px solid rgba(10, 10, 10, 0.10);
      border-bottom-width: 2px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.8125rem;
      color: #44403c;
      line-height: 1.4;
    }

    @keyframes smFade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes smPop  {
      from { opacity: 0; transform: translateY(-12px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 520px) {
      .sm-shell { padding-top: 3rem; }
      .sm-foot { font-size: 0.75rem; gap: 0.5rem; }
    }
  `]
})
export class SearchModalComponent implements AfterViewInit {
  protected readonly svc = inject(SearchService);
  private readonly router = inject(Router);
  @ViewChild('input') private inputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('card') private cardEl?: ElementRef<HTMLElement>;

  /** The element focused before the modal opened, so we can restore it on close. */
  private lastFocused: HTMLElement | null = null;

  queryModel = '';
  readonly active = signal(0);
  readonly results = computed(() => this.svc.match(this.svc.query()));

  constructor() {
    // Open/close side-effects: focus the input, lock body scroll, and restore
    // focus to the trigger on close. Guarded for SSR (no document).
    effect(() => {
      const open = this.svc.isOpen();
      if (typeof document === 'undefined') return;
      if (open) {
        this.lastFocused = document.activeElement as HTMLElement | null;
        this.active.set(0);
        this.queryModel = '';
        document.body.style.overflow = 'hidden';
        queueMicrotask(() => this.inputEl?.nativeElement.focus());
      } else {
        document.body.style.overflow = '';
        this.lastFocused?.focus?.();
        this.lastFocused = null;
      }
    });
    // Clamp active index when result set shrinks.
    effect(() => {
      const len = this.results().length;
      if (this.active() >= len) this.active.set(Math.max(0, len - 1));
    });
  }

  ngAfterViewInit(): void {
    if (this.svc.isOpen()) this.inputEl?.nativeElement.focus();
  }

  onQueryChange(v: string): void {
    this.svc.query.set(v);
    this.active.set(0);
  }

  moveActive(delta: number, e: Event): void {
    e.preventDefault();
    const len = this.results().length;
    if (len === 0) return;
    this.active.set((this.active() + delta + len) % len);
  }

  goToActive(e: Event): void {
    e.preventDefault();
    const e0 = this.results()[this.active()];
    if (e0) this.goTo(e0);
  }

  goTo(entry: SearchEntry): void {
    this.close();
    if (entry.path.includes('#')) {
      const [path, fragment] = entry.path.split('#');
      this.router.navigate([path], { fragment });
    } else {
      this.router.navigateByUrl(entry.path);
    }
  }

  close(): void { this.svc.close(); }

  iconFor(kind: SearchEntry['kind']): string {
    return kind === 'phase' ? 'PH' : kind === 'note' ? 'PDF' : 'GO';
  }

  @HostListener('window:keydown.escape')
  onEsc(): void {
    if (this.svc.isOpen()) this.close();
  }

  // Keep Tab focus inside the dialog while it is open (the background is not
  // inert, so without this, focus would escape to the page behind the backdrop).
  @HostListener('window:keydown.Tab', ['$event'])
  trapTab(e: Event): void {
    if (!this.svc.isOpen()) return;
    const card = this.cardEl?.nativeElement;
    if (!card) return;
    const focusable = card.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const shift = (e as KeyboardEvent).shiftKey;
    if (shift && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!shift && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
