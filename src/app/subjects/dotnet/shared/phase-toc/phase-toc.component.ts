import { Component, inject } from '@angular/core';
import { PhaseTocService } from './phase-toc.service';

@Component({
  selector: 'app-phase-toc',
  template: `
    @if (toc.topics().length) {
      <p class="toc-title">On this page</p>
      <ol class="toc-list">
        @for (t of toc.topics(); track t.id) {
          <li>
            <a [href]="'#' + t.id" (click)="scrollTo(t.id, $event)">{{ t.title }}</a>
          </li>
        }
      </ol>
    }
  `,
  host: {
    'class': 'app-toc',
    'role': 'complementary',
    'aria-label': 'On this page'
  }
})
export class PhaseTocComponent {
  protected readonly toc = inject(PhaseTocService);

  scrollTo(id: string, event: MouseEvent): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  }
}
