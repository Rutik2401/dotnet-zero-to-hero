import { AfterViewInit, Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';
import { PhaseTocService } from '../../shared/phase-toc/phase-toc.service';
import { phase2Topics } from './phase-2.data';

// Register C# once for the lifetime of the page (lazy-loaded with the component).
hljs.registerLanguage('csharp', csharp);

@Component({
  selector: 'app-phase-2',
  imports: [CodeBlockComponent],
  templateUrl: './phase-2.component.html'
})
export class Phase2Component implements AfterViewInit {
  private readonly host = inject(ElementRef);

  topics = phase2Topics;

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

  /** Highlight all C# code blocks; skip output panes (plain console output). */
  private highlightCodeBlocks(): void {
    const blocks: NodeListOf<HTMLElement> =
      this.host.nativeElement.querySelectorAll('.topic-card pre:not(.code-output) code');

    blocks.forEach(block => {
      if (block.dataset['highlighted'] === 'yes') return; // already done
      block.classList.add('language-csharp');
      hljs.highlightElement(block);
    });
  }
}
