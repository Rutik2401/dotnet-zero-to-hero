import { AfterViewInit, Component, ElementRef, effect, inject, signal } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import { phase1Topics } from './phase-1.data';

// Register C# once for the lifetime of the page (lazy-loaded with the component).
hljs.registerLanguage('csharp', csharp);

@Component({
  selector: 'app-phase-1',
  imports: [],
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
