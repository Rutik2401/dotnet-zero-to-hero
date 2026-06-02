import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'brand'        // learnhub hex/H mark
  | 'search'
  | 'kbd-mod'
  | 'sun'
  | 'chevron-down'
  | 'arrow-right'
  | 'rocket'
  | 'pdf'
  | 'box'
  | 'mail'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'youtube';

/**
 * Single source of truth for inline SVG icons used in chrome (nav, footer).
 *
 * Usage: `<app-icon name="github" size="16" />`
 *
 * The brand mark accepts an optional `tone` to swap the hex fill — `brand`
 * (purple, the default) is used in the cream nav, `bright` (violet on dark)
 * is used in the plum footer. Every icon inherits color via `currentColor`,
 * so callers control color through CSS on the host or parent.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (name()) {
      @case ('brand') {
        <svg [attr.viewBox]="'0 0 32 32'" [attr.width]="size()" [attr.height]="size()" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <!-- The site's brand gradient (135°, #6d28d9 → #8b5cf6); the dark-bg
                 "bright" variant shifts one step lighter so it reads on plum. -->
            <linearGradient [attr.id]="'lhmark-' + tone()" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0" [attr.stop-color]="tone() === 'bright' ? '#8b5cf6' : '#6d28d9'"/>
              <stop offset="1" [attr.stop-color]="tone() === 'bright' ? '#a78bfa' : '#8b5cf6'"/>
            </linearGradient>
          </defs>
          <path d="M16 2.5 L28.5 9.75 V22.25 L16 29.5 L3.5 22.25 V9.75 Z"
                [attr.fill]="'url(#lhmark-' + tone() + ')'"
                [attr.stroke]="tone() === 'bright' ? '#a78bfa' : '#5b21b6'"
                stroke-width="1.5" stroke-linejoin="round"/>
          <!-- Soft top sheen for a modern, glassy mark. -->
          <path d="M16 2.5 L28.5 9.75 L16 16 L3.5 9.75 Z" fill="#ffffff" opacity="0.14"/>
          <!-- Centered "H" monogram. -->
          <path d="M11.5 10.5 V21.5 M11.5 16 H20.5 M20.5 10.5 V21.5"
                stroke="#f5f1e8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      }
      @case ('search') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/>
          <path d="m20 20-3.5-3.5"/>
        </svg>
      }
      @case ('sun') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      }
      @case ('chevron-down') {
        <svg viewBox="0 0 12 12" [attr.width]="size()" [attr.height]="size()" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      }
      @case ('rocket') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 15c-1.5 0-3 1.5-3 4 2.5 0 4-1.5 4-3M14.5 4.5l5 5M9 11l4 4M14 4l6 6c0 5-4 9-9 9l-2-2c0-5 4-9 9-9zM7 17l-3 3"/>
          <circle cx="15" cy="9" r="1.2" fill="currentColor"/>
        </svg>
      }
      @case ('pdf') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
          <path d="M14 3v5h5M9 13h6M9 17h4"/>
        </svg>
      }
      @case ('box') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
        </svg>
      }
      @case ('mail') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="m3 7 9 6 9-6"/>
        </svg>
      }
      @case ('github') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.28-1.67-1.28-1.67-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39s1.98.13 2.9.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
        </svg>
      }
      @case ('twitter') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/>
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
        </svg>
      }
      @case ('youtube') {
        <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.46 3.5 12 3.5 12 3.5s-7.46 0-9.37.56A3.02 3.02 0 0 0 .5 6.2C0 8.12 0 12 0 12s0 3.88.5 5.8a3.02 3.02 0 0 0 2.13 2.14C4.54 20.5 12 20.5 12 20.5s7.46 0 9.37-.56A3.02 3.02 0 0 0 23.5 17.8C24 15.88 24 12 24 12s0-3.88-.5-5.8ZM9.6 15.6V8.4l6.27 3.6L9.6 15.6Z"/>
        </svg>
      }
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
    svg { display: block; flex-shrink: 0; }
  `]
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<number>(18);
  /** Brand-mark color variant — `brand` (cream-bg use) or `bright` (dark-bg use). */
  readonly tone = input<'brand' | 'bright'>('brand');
}
