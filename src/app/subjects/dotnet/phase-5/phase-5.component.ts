import { AfterViewInit, Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { PhaseTocService } from '../shared/phase-toc/phase-toc.service';
import { loadTypeScriptHighlighter } from '../../../shared/highlight/code-highlighter';
import { phase5Topics } from './phase-5.data';

@Component({
  selector: 'app-phase-5',
  imports: [CodeBlockComponent],
  templateUrl: './phase-5.component.html'
})
export class Phase5Component implements AfterViewInit {
  private readonly host = inject(ElementRef);

  topics = phase5Topics;

  /** Per-topic toggle state for the "See Output" button. */
  private readonly _outputs = signal<Record<string, boolean>>({});

  constructor() {
    // Re-highlight whenever toggle state changes (because the @if introduces a new
    // <pre class="code-output"> that hasn't been processed yet).
    effect(() => {
      this._outputs();
      queueMicrotask(() => this.highlightCodeBlocks());
    });

    const toc = inject(PhaseTocService);
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
    const hljs = await loadTypeScriptHighlighter();
    const blocks: NodeListOf<HTMLElement> =
      this.host.nativeElement.querySelectorAll('.topic-card pre:not(.code-output) code');

    blocks.forEach(block => {
      if (block.dataset['highlighted'] === 'yes') return;
      block.classList.add('language-typescript');
      hljs.highlightElement(block);
    });
  }
}
