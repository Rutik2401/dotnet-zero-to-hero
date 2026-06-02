import { AfterViewInit, Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { PageTocService } from '../../../shared/page-toc/page-toc.service';
import { loadCSharpHighlighter } from '../../../shared/highlight/code-highlighter';
import { phase1Topics } from './phase-1.data';

@Component({
  selector: 'app-phase-1',
  imports: [CodeBlockComponent],
  templateUrl: './phase-1.component.html'
})
export class Phase1Component implements AfterViewInit {
  private readonly host = inject(ElementRef);

  topics = phase1Topics;

  /** Per-topic toggle state for the "See Output" button. */
  private readonly _outputs = signal<Record<string, boolean>>({});

  constructor() {
    // Re-highlight whenever toggle state changes (because the @if introduces a new
    // <pre class="code-output"> that hasn't been processed yet).
    effect(() => {
      this._outputs();
      queueMicrotask(() => this.highlightCodeBlocks());
    });

    const toc = inject(PageTocService);
    toc.setTopics(this.topics.map(t => ({ id: t.id, title: t.title })));
    inject(DestroyRef).onDestroy(() => toc.clear());
  }

  isOutputShown(id: string): boolean {
    return !!this._outputs()[id];
  }

  toggleOutput(id: string): void {
    const current = this._outputs();
    this._outputs.set({ ...current, [id]: !current[id] });
  }

  scrollToTopic(id: string, event: MouseEvent): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  }

  ngAfterViewInit(): void {
    this.highlightCodeBlocks();
  }

  private async highlightCodeBlocks(): Promise<void> {
    if (typeof document === 'undefined') return; // skip during server prerender
    const hljs = await loadCSharpHighlighter();
    const blocks: NodeListOf<HTMLElement> =
      this.host.nativeElement.querySelectorAll('.topic-card pre:not(.code-output) code');

    blocks.forEach(block => {
      if (block.dataset['highlighted'] === 'yes') return;
      block.classList.add('language-csharp');
      hljs.highlightElement(block);
    });
  }
}
