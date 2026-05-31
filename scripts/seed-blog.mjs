/**
 * Generates a ready-to-import Sanity post (NDJSON) for a first blog post.
 *
 * Run:   node scripts/seed-blog.mjs
 * Then import it into Sanity (see BLOG-CMS.md):
 *        cd studio && npx sanity dataset import ../scripts/seed/angular-signals-guide.ndjson production
 *
 * Writing the post in code (vs. by hand) keeps the Portable Text valid.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── tiny Portable Text helpers ───────────────────────────────────────────────
let n = 0;
const key = () => `s${(++n).toString(36)}`;
const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks });
const p = (children) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  children: Array.isArray(children) ? children : [span(children)],
});
const h2 = (text) => ({
  _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [span(text)],
});
const li = (children) => ({
  _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
  children: Array.isArray(children) ? children : [span(children)],
});
const code = (codeStr, language = 'typescript', filename) => ({
  _type: 'code', _key: key(), language, code: codeStr, ...(filename ? { filename } : {}),
});
const c = (t) => span(t, ['code']); // inline code

const doc = {
  _id: 'post.angular-signals-guide',
  _type: 'post',
  title: 'Angular Signals — The 2026 Guide to Reactive State',
  slug: { _type: 'slug', current: 'angular-signals-guide' },
  excerpt:
    'Signals are now the heart of reactivity in Angular. Here is a practical, example-first guide to signal(), computed(), effect(), signal inputs and how they sit alongside RxJS.',
  tag: 'DEEP DIVE',
  category: 'Angular',
  publishedAt: '2026-05-31T10:00:00Z',
  readMins: 8,
  seo: {
    metaDescription:
      'A practical guide to Angular Signals: signal(), computed(), effect(), signal inputs/model(), and signals vs RxJS — with runnable code for modern Angular.',
    keywords: 'Angular signals, computed, effect, signal inputs, model, signals vs rxjs, modern Angular reactivity',
  },
  body: [
    p([
      span('Signals are the biggest shift in Angular since standalone components. They give Angular a '),
      c('fine-grained'),
      span(' reactivity model: the framework knows exactly which values a template uses, so it can update just those parts of the DOM — no more zone-wide change detection guesswork.'),
    ]),

    h2('What is a signal?'),
    p([
      span('A signal is a wrapper around a value that notifies anything depending on it when the value changes. You read it by calling it like a function ('),
      c('count()'),
      span(') and you write it with '),
      c('set()'),
      span(' or '),
      c('update()'),
      span('.'),
    ]),
    code(
      `import { signal } from '@angular/core';

const count = signal(0);

count();            // read  → 0
count.set(5);       // write → 5
count.update(n => n + 1); // 6`,
      'typescript',
      'count.ts'
    ),

    h2('computed() — derived state'),
    p([
      span('A '),
      c('computed()'),
      span(' signal derives its value from other signals and recomputes automatically — and only when something it actually reads has changed. It is also memoised.'),
    ]),
    code(
      `import { signal, computed } from '@angular/core';

const price = signal(100);
const qty = signal(2);

const total = computed(() => price() * qty()); // 200
qty.set(3);          // total re-computes lazily → 300`,
      'typescript',
      'total.ts'
    ),

    h2('effect() — running side effects'),
    p([
      span('Use '),
      c('effect()'),
      span(' for side effects that should re-run when their signals change: logging, syncing to localStorage, integrating non-Angular libraries. Do not use it to set other signals — use '),
      c('computed()'),
      span(' for derived state.'),
    ]),
    code(
      `import { effect } from '@angular/core';

effect(() => {
  // Re-runs whenever theme() changes
  localStorage.setItem('theme', theme());
});`,
      'typescript'
    ),

    h2('Signal inputs and model()'),
    p([
      span('Modern Angular replaces the '),
      c('@Input()'),
      span(' decorator with signal-based inputs, and adds two-way '),
      c('model()'),
      span(' signals:'),
    ]),
    code(
      `import { Component, input, model } from '@angular/core';

@Component({ selector: 'app-counter', /* ... */ })
export class CounterComponent {
  // <app-counter [start]="5" />
  start = input(0);            // readonly signal input
  label = input.required<string>();

  // two-way: <app-counter [(value)]="x" />
  value = model(0);

  increment() { this.value.update(v => v + 1); }
}`,
      'typescript',
      'counter.component.ts'
    ),

    h2('Signals vs RxJS — when to use which'),
    p('They are partners, not rivals. The rule of thumb seniors use:'),
    li([c('signal()'), span(' for synchronous UI state that always has a current value.')]),
    li([span('RxJS for streams of events over time — debounced search, websockets, retries.')]),
    li([c('toSignal()'), span(' to bridge an Observable into a signal at the edge of your component.')]),
    code(
      `import { toSignal } from '@angular/core/rxjs-interop';

results = toSignal(
  this.search.valueChanges.pipe(debounceTime(300), switchMap(q => this.api.find(q))),
  { initialValue: [] }
);`,
      'typescript'
    ),

    h2('A full component'),
    code(
      `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: \`
    <button (click)="add()">Add item</button>
    <p>Items: {{ count() }} · Total: {{ total() }}</p>
  \`,
})
export class CartComponent {
  count = signal(0);
  price = signal(199);
  total = computed(() => this.count() * this.price());

  add() { this.count.update(n => n + 1); }
}`,
      'typescript',
      'cart.component.ts'
    ),

    h2('Takeaways'),
    p([
      span('Reach for '),
      c('signal()'),
      span(' for state, '),
      c('computed()'),
      span(' for anything derived, '),
      c('effect()'),
      span(' for side effects, and '),
      c('toSignal()'),
      span(' to bring RxJS streams in. Master these four and you have modern Angular reactivity covered.'),
    ]),
  ],
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'seed');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'angular-signals-guide.ndjson');
writeFileSync(outPath, JSON.stringify(doc) + '\n', 'utf8');
console.log(`[seed-blog] Wrote post → ${outPath}`);
