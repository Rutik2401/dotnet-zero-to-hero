import { Topic } from './phase-5.types';

export const phase5Topics: Topic[] = [
  // ============================================================
  // 1. Angular Architecture & Standalone Components
  // ============================================================
  {
    id: 'angular-architecture-standalone',
    title: '1. Angular Architecture & Standalone Components',
    whatIsThis: [
      "Angular is a TypeScript-based frontend framework by Google. It is used to build SPAs (Single Page Applications) — one HTML page that swaps content as the user navigates. Everything in Angular is built using small reusable building blocks called components.",
      "Simple meaning is — Angular gives you a proper structure (components, services, routing, forms) so big apps don't become a mess. From v17 onwards, the new default is standalone components, which means no more NgModule boilerplate."
    ],
    whyUseIt: [
      "For small apps a simple HTML/JS works fine. But for big real apps with 100+ screens, login, role-based menu, forms, API calls — we need structure. Angular gives that structure out of the box.",
      "Standalone components make it even simpler. Earlier we had to declare every component, pipe, directive inside an NgModule. Now each component declares its own imports directly, so the code is shorter and lazy loading is easier."
    ],
    realLifeExample: [
      "Think of the Swiggy web app — header, sidebar with categories, restaurant list, restaurant detail, cart, checkout. Each one is a separate component. The router decides which component to show based on the URL.",
      "If today the team wants to add a new 'Offers' page, they just create OffersComponent (standalone), add a route, and it works — no NgModule changes needed."
    ],
    howItWorks: [
      "ng new myapp creates a new Angular project (standalone by default in v17+).",
      "main.ts calls bootstrapApplication(AppComponent, appConfig) — this is the new entry point.",
      "appConfig holds providers like provideRouter(), provideHttpClient() — replaces the old AppModule.",
      "AppComponent is a standalone component (standalone: true is now the default in v19).",
      "Each component imports what it needs directly — RouterOutlet, RouterLink, FormsModule etc."
    ],
    codeExample: `// main.ts — application entry point
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

// app.config.ts — global providers (replaces AppModule)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

// app.component.ts — root standalone component
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],   // import what THIS component needs
  template: \`
    <h1>Hello Modern Angular!</h1>
    <router-outlet />
  \`
})
export class AppComponent { }`,
    codeOutput: `Hello Modern Angular!
(plus whatever component the current route renders below)`,
    interviewQuestions: [
      {
        q: "What is the difference between NgModule-based and Standalone components?",
        a: "In the old NgModule approach, every component/pipe/directive must be declared inside a module, and the module declares its imports. In standalone, each component declares its own imports directly using imports: [...] in the @Component decorator. Standalone is the default from Angular 17+ and makes lazy loading and tree-shaking easier."
      },
      {
        q: "What does bootstrapApplication() do?",
        a: "It is the new way to start an Angular standalone app. It takes the root component and an optional config object with providers. It replaces the old platformBrowserDynamic().bootstrapModule(AppModule) approach. We pass providers like provideRouter, provideHttpClient inside the config."
      },
      {
        q: "What are providers in app.config.ts?",
        a: "Providers tell Angular how to create dependencies (services, router, HTTP client). Functions like provideRouter(routes), provideHttpClient(), provideAnimations() are called provider functions. They register what was earlier done inside an NgModule's providers array."
      },
      {
        q: "Can NgModules and Standalone components coexist?",
        a: "Yes, completely. An existing NgModule app can slowly migrate component by component to standalone. A standalone component can also be imported inside an NgModule. Angular team supports both for backwards compatibility, but new projects should use standalone."
      },
      {
        q: "Why is standalone better for lazy loading?",
        a: "Earlier we had to lazy-load entire NgModules with loadChildren. With standalone, we can directly lazy-load a single component using loadComponent in the route, which gives smaller bundles and faster page loads."
      }
    ],
    followUpQuestions: [
      { q: "Is standalone default from which Angular version?", a: "Default from Angular 17. In v19 it is the only way for new components." },
      { q: "Where do we declare component imports in standalone?", a: "Inside the @Component decorator's imports array." },
      { q: "What replaces AppModule in standalone?", a: "app.config.ts with the providers array." },
      { q: "Can a standalone component use another standalone component?", a: "Yes, just import it in the imports array." },
      { q: "Do we still need NgModule for older libraries?", a: "Yes, if a third-party library exports an NgModule, we import that module in our standalone component's imports." }
    ],
    commonMistakes: [
      "Forgetting to add imports: [...] in @Component when using RouterLink, FormsModule, etc. — gives 'Can't bind to X' error.",
      "Mixing standalone and NgModule patterns in the same project without a clear migration plan — confuses the team.",
      "Putting heavy logic in main.ts instead of app.config.ts — keep main.ts thin.",
      "Importing whole modules (like CommonModule) just to use one directive — in standalone you can import only what you need."
    ],
    proTip: "When the interviewer asks why standalone, say this: 'Standalone removes the NgModule indirection. Each component declares its own imports, so I can read one file and know exactly what it depends on. Lazy loading also becomes per-component instead of per-module, which gives smaller initial bundles.'"
  },

  // ============================================================
  // 2. Component Anatomy & Lifecycle Hooks
  // ============================================================
  {
    id: 'component-lifecycle',
    title: '2. Component Anatomy & Lifecycle Hooks',
    whatIsThis: [
      "A component is the smallest unit of UI in Angular. It has 3 parts — a TypeScript class (logic), an HTML template (view), and CSS styles. The @Component decorator ties them together with a selector, template, and imports.",
      "Lifecycle hooks are special methods Angular calls at fixed moments in a component's life — when it is created, when inputs change, when the view is ready, when it is destroyed. Simple meaning is — Angular gives you 'phone call' methods at each stage so you can run your code at the right time."
    ],
    whyUseIt: [
      "Without lifecycle hooks, we won't know when to fetch API data, when to subscribe to something, or when to clean up. ngOnInit is for initial loading, ngOnDestroy is for cleanup, ngAfterViewInit is for accessing DOM/child components.",
      "If we don't unsubscribe in ngOnDestroy, the subscription keeps running even after component is destroyed — this is the classic memory leak that interviewers love to ask about."
    ],
    realLifeExample: [
      "Imagine a Restaurant Detail page on Swiggy. ngOnInit — fetch restaurant info from API. ngAfterViewInit — start the image carousel that needs the DOM ready. ngOnDestroy — close the open WebSocket for live order tracking.",
      "If we forget to close the WebSocket in ngOnDestroy, every time the user opens and closes 10 restaurants, 10 WebSockets stay alive in the background — phone gets hot, battery drains."
    ],
    howItWorks: [
      "constructor() runs first — only for dependency injection, no API calls here.",
      "ngOnChanges(changes) — runs whenever an @Input changes (called before ngOnInit and on every input change).",
      "ngOnInit() — runs once after the first ngOnChanges. This is where we put initial setup and API calls.",
      "ngAfterViewInit() — runs after the view (and child components) are rendered. Use it when you need DOM access via @ViewChild.",
      "ngOnDestroy() — runs just before component is destroyed. Cleanup goes here — unsubscribe, clear timers, close sockets.",
      "Modern way: use DestroyRef + takeUntilDestroyed() instead of writing ngOnDestroy manually."
    ],
    codeExample: `import {
  Component, OnInit, OnDestroy, AfterViewInit,
  DestroyRef, inject, signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-restaurant-detail',
  template: \`
    <h2>{{ restaurantName() }}</h2>
    <p>Live tick: {{ tick() }}</p>
  \`
})
export class RestaurantDetailComponent
  implements OnInit, AfterViewInit, OnDestroy {

  private readonly destroyRef = inject(DestroyRef);

  restaurantName = signal('Loading...');
  tick = signal(0);

  constructor() {
    console.log('1. constructor — DI only, no API calls here');
  }

  ngOnInit(): void {
    console.log('2. ngOnInit — fetch initial data');
    this.restaurantName.set('Punjabi Tadka');

    // Modern cleanup — auto-unsubscribes when component is destroyed
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(n => this.tick.set(n));
  }

  ngAfterViewInit(): void {
    console.log('3. ngAfterViewInit — DOM is ready');
  }

  ngOnDestroy(): void {
    console.log('4. ngOnDestroy — cleanup any old-style subscriptions here');
  }
}`,
    codeOutput: `1. constructor — DI only, no API calls here
2. ngOnInit — fetch initial data
3. ngAfterViewInit — DOM is ready
(...tick keeps updating every second...)
4. ngOnDestroy — cleanup any old-style subscriptions here`,
    interviewQuestions: [
      {
        q: "Why do we put API calls in ngOnInit and not in the constructor?",
        a: "Constructor is meant only for dependency injection. At constructor time, @Input values are not yet set, and the component is not fully initialised. ngOnInit runs after Angular has set the inputs and finished construction, so it is the safe place for setup logic and API calls."
      },
      {
        q: "What is the difference between ngOnInit and ngAfterViewInit?",
        a: "ngOnInit runs after Angular sets the inputs but before the view renders. ngAfterViewInit runs after the template (and all child components) are rendered. We use ngAfterViewInit when we need to read or manipulate the DOM, or access child components via @ViewChild."
      },
      {
        q: "What is ngOnDestroy used for?",
        a: "It runs just before Angular destroys the component. We use it to unsubscribe from observables, clear setInterval/setTimeout, close WebSocket connections, and remove event listeners. Forgetting to do this causes memory leaks."
      },
      {
        q: "What is DestroyRef and takeUntilDestroyed()?",
        a: "DestroyRef is a built-in service from Angular 16+ that gives you a hook to run code when the current scope is destroyed. takeUntilDestroyed() is an RxJS operator that auto-unsubscribes when the component is destroyed. Together they replace the manual unsubscribe-in-ngOnDestroy pattern."
      },
      {
        q: "When does ngOnChanges fire?",
        a: "ngOnChanges fires every time an @Input value changes — including the very first time before ngOnInit. It receives a SimpleChanges object with previous and current values for each changed input. Note: it only fires for reference changes, not for mutations of the same object."
      }
    ],
    followUpQuestions: [
      { q: "Order of constructor, ngOnInit, ngAfterViewInit?", a: "constructor → ngOnChanges → ngOnInit → ngAfterViewInit." },
      { q: "Can ngOnInit be async?", a: "Yes, you can mark it async, but Angular will not await it — it just fires." },
      { q: "Will ngOnChanges fire if no @Input is bound?", a: "No, it only fires when at least one @Input changes." },
      { q: "Modern alternative to ngOnDestroy for cleanup?", a: "Use DestroyRef + takeUntilDestroyed() — auto cleanup." },
      { q: "Where to access @ViewChild value safely?", a: "In ngAfterViewInit, not in ngOnInit." }
    ],
    commonMistakes: [
      "Calling APIs inside the constructor — inputs are not ready, hard to mock in tests.",
      "Forgetting to unsubscribe from Observables in ngOnDestroy → memory leak.",
      "Trying to read @ViewChild in ngOnInit — it is undefined there. Use ngAfterViewInit.",
      "Mutating an @Input object instead of replacing it — ngOnChanges won't fire because reference is same."
    ],
    proTip: "On modern projects I always use DestroyRef + takeUntilDestroyed() instead of writing ngOnDestroy with manual subscription handling. It removes a whole class of memory-leak bugs and makes the component code shorter."
  },

  // ============================================================
  // 3. Data Binding (4 types)
  // ============================================================
  {
    id: 'data-binding',
    title: '3. Data Binding (4 Types)',
    whatIsThis: [
      "Data binding is how the TypeScript class talks to the HTML template and back. Angular has 4 types — interpolation, property binding, event binding, and two-way binding.",
      "Simple meaning is — TS to HTML is one-way (just show the value), HTML to TS is one-way (button click), and two-way is both directions (input field updates the variable, variable updates the field)."
    ],
    whyUseIt: [
      "Without data binding we will have to manually use document.getElementById and write event listeners — same as plain JavaScript. Angular's binding makes the template reactive — change the variable in TS, the screen updates by itself.",
      "Each binding type has a clear purpose: {{ }} for showing, [ ] for setting, ( ) for listening, [( )] for both. Once you remember this, syntax becomes very natural."
    ],
    realLifeExample: [
      "Login page on any banking app. Username and password fields use two-way binding [(ngModel)] — typing updates the variable. The 'Login' button uses event binding (click) — calls the login() method. The 'Welcome, Rohit' message uses interpolation {{ user.name }}. The disabled state of the button uses property binding [disabled].",
      "All four types in one screen — and once you see the pattern in one form, you can build any form."
    ],
    howItWorks: [
      "Interpolation: {{ expression }} — Angular evaluates and shows as text. Sanitises HTML automatically.",
      "Property binding: [property]=\"expression\" — sets the DOM property to the expression value.",
      "Event binding: (event)=\"handler($event)\" — calls a method when the DOM event fires.",
      "Two-way binding: [(ngModel)]=\"variable\" — banana in a box. Combines property + event in one. Needs FormsModule.",
      "Angular runs change detection after every event, updating the view if data changed."
    ],
    codeExample: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: \`
    <!-- 1. Interpolation — show value as text -->
    <h2>Welcome, {{ name() || 'Guest' }}</h2>
    <p>You typed {{ password.length }} characters</p>

    <!-- 2. Property binding — set DOM property -->
    <input type="text"
           [value]="name()"
           [placeholder]="'Enter username'"
           [disabled]="locked()" />

    <!-- 3. Event binding — listen to DOM event -->
    <button (click)="login()" [disabled]="!name()">Login</button>

    <!-- 4. Two-way binding — both directions -->
    <input [(ngModel)]="password"
           type="password"
           placeholder="Password" />

    <p>Class binding: <span [class.active]="locked()">Locked?</span></p>
    <p>Style binding: <span [style.color]="locked() ? 'red' : 'green'">Status</span></p>
  \`
})
export class LoginComponent {
  name = signal('Rohit');
  password = '';
  locked = signal(false);

  login(): void {
    console.log('Login clicked for', this.name());
    this.locked.set(true);
  }
}`,
    codeOutput: `Welcome, Rohit
You typed 0 characters
[ Enter username (input) ]
[ Login (button) ]
[ Password (input) ]
Class binding: Locked?
Style binding: Status (green)`,
    interviewQuestions: [
      {
        q: "What are the 4 types of data binding in Angular?",
        a: "Interpolation {{ }} for showing values, Property binding [prop] for setting DOM properties, Event binding (event) for listening to events, and Two-way binding [(ngModel)] which combines property and event in one. Together they cover all class-template communication."
      },
      {
        q: "What is the difference between interpolation and property binding?",
        a: "Both are one-way TS-to-HTML, but interpolation only outputs text content like <h1>{{ title }}</h1>. Property binding sets actual DOM properties like [src]='imgUrl'. For attributes that are not standard HTML, like [disabled] or [class.active], we must use property binding."
      },
      {
        q: "What does [(ngModel)] mean?",
        a: "It is two-way binding, also called 'banana in a box' [( )]. The brackets [] are property binding (TS to HTML), the parentheses () are event binding (HTML to TS), and ngModel is the directive that handles both. We need to import FormsModule to use it."
      },
      {
        q: "Difference between [class] and [class.something]?",
        a: "[class]='someStr' replaces the entire class string. [class.active]='isActive' adds/removes only the 'active' class based on the boolean. Same logic for [style] vs [style.color]. Granular versions are safer because they don't overwrite other classes."
      },
      {
        q: "What is $event in event binding?",
        a: "$event is the DOM event object passed to the handler. For click events it is the MouseEvent, for input events it is the InputEvent (use $event.target.value to read the input value). It works exactly like the native event in plain JS."
      }
    ],
    followUpQuestions: [
      { q: "Need FormsModule for ngModel?", a: "Yes, import FormsModule in the component's imports array." },
      { q: "Can we have property and event binding without ngModel?", a: "Yes — [value]='x' (input)='x = $event.target.value'. ngModel is just shorthand." },
      { q: "Is interpolation safe from XSS?", a: "Yes, Angular sanitises HTML in interpolation by default." },
      { q: "Difference between [(ngModel)] and [ngModel]?", a: "[ngModel] is one-way (TS to input), [(ngModel)] is two-way." },
      { q: "Can we use template expressions like a + b in interpolation?", a: "Yes, simple expressions work. Avoid heavy logic — keep it in TS." }
    ],
    commonMistakes: [
      "Forgetting to import FormsModule when using ngModel — gives 'Can't bind to ngModel' error.",
      "Using interpolation for property values like <img src='{{ url }}'> — works but [src]='url' is preferred.",
      "Doing heavy work inside interpolation — runs on every change detection, kills performance.",
      "Confusing [class]='active' with [class.active] — first replaces all classes, second toggles one."
    ],
    proTip: "For modern Angular, prefer signals over plain class fields where possible. With signals, the template only re-renders when the signal value actually changes — much better performance than the default Zone.js-based change detection."
  },

  // ============================================================
  // 4. Built-in Control Flow (@if, @for, @switch, @defer)
  // ============================================================
  {
    id: 'control-flow',
    title: '4. Built-in Control Flow (@if, @for, @switch, @defer)',
    whatIsThis: [
      "From Angular 17+, the framework introduced new built-in control flow blocks — @if, @for, @switch, @defer. They replace the older *ngIf, *ngFor, *ngSwitch directives. They are the new recommended way and are stable since v18.",
      "Simple meaning is — earlier we wrote *ngIf=\"isLoggedIn\" as an attribute on a div. Now we write @if (isLoggedIn) { <div>...</div> } as a block. It looks more like normal JavaScript and is easier to read."
    ],
    whyUseIt: [
      "The new syntax is faster (up to 90% faster runtime per Angular team), supports type narrowing, and does not need any module imports — it is built into the compiler. No more importing CommonModule just to use ngIf.",
      "It also supports @empty in @for (when list is empty), and @defer for lazy loading parts of the template — these were not possible cleanly with the old syntax."
    ],
    realLifeExample: [
      "On Zomato menu page — if cart is empty, show 'Add items to start ordering' (@empty in @for). Show item types using @switch (Veg/Non-veg/Egg). For the heavy reviews section at the bottom, use @defer so it loads only when scrolled into view — initial page is fast.",
      "Earlier we needed *ngIf with an else template ref, multiple ng-template tags, and lots of import boilerplate. Now it is one clean block."
    ],
    howItWorks: [
      "@if (condition) { ... } @else if (...) { ... } @else { ... } — clean conditionals.",
      "@for (item of items; track item.id) { ... } @empty { ... } — track is mandatory, @empty handles empty list.",
      "@switch (value) { @case ('veg') { ... } @case ('nonveg') { ... } @default { ... } } — multiple branches.",
      "@defer (on viewport) { <heavy-comp /> } @placeholder { ... } @loading { ... } @error { ... } — lazy load on scroll, idle, hover, interaction etc.",
      "All of these are compiled to optimised code, no runtime directive overhead like *ngIf had."
    ],
    codeExample: `import { Component, signal } from '@angular/core';

interface MenuItem { id: number; name: string; type: 'veg' | 'nonveg' | 'egg'; }

@Component({
  selector: 'app-menu',
  template: \`
    <h2>Punjabi Tadka — Menu</h2>

    <!-- 1. @if / @else if / @else -->
    @if (loading()) {
      <p>Loading menu...</p>
    } @else if (items().length === 0) {
      <p>No items today, please come tomorrow 🙏</p>
    } @else {
      <p>{{ items().length }} dishes available</p>
    }

    <!-- 2. @for with track + @empty -->
    <ul>
      @for (item of items(); track item.id) {
        <li>
          <strong>{{ item.name }}</strong>

          <!-- 3. @switch for type indicator -->
          @switch (item.type) {
            @case ('veg')    { <span class="dot green">🟢</span> }
            @case ('nonveg') { <span class="dot red">🔴</span> }
            @case ('egg')    { <span class="dot yellow">🟡</span> }
            @default         { <span class="dot">❓</span> }
          }
        </li>
      } @empty {
        <li>Cart is empty — start ordering!</li>
      }
    </ul>

    <!-- 4. @defer — lazy load heavy reviews section -->
    @defer (on viewport) {
      <app-reviews />
    } @placeholder {
      <p>Scroll down to see reviews...</p>
    } @loading (minimum 200ms) {
      <p>Loading reviews...</p>
    } @error {
      <p>Failed to load reviews 😔</p>
    }
  \`
})
export class MenuComponent {
  loading = signal(false);
  items = signal<MenuItem[]>([
    { id: 1, name: 'Paneer Butter Masala', type: 'veg' },
    { id: 2, name: 'Chicken Biryani',      type: 'nonveg' },
    { id: 3, name: 'Egg Curry',            type: 'egg' }
  ]);
}`,
    codeOutput: `Punjabi Tadka — Menu
3 dishes available
- Paneer Butter Masala 🟢
- Chicken Biryani 🔴
- Egg Curry 🟡
Scroll down to see reviews...
(reviews component loads when scrolled into view)`,
    interviewQuestions: [
      {
        q: "What is the difference between @if and *ngIf?",
        a: "@if is the new built-in control flow from Angular 17+. *ngIf is the old structural directive. @if has cleaner syntax with native @else / @else if, supports type narrowing better, is up to 90% faster at runtime, and does not need CommonModule import. Both work but @if is the new recommended way."
      },
      {
        q: "Why is track mandatory in @for?",
        a: "Angular needs to know how to identify items between renders to update the DOM efficiently. If you don't provide track, Angular cannot reuse DOM nodes when items change order, leading to unnecessary destroy/recreate cycles. Always use a unique field like track item.id, or track $index if there is no unique field."
      },
      {
        q: "What does @defer do and when do we use it?",
        a: "@defer lazy-loads a portion of the template based on a trigger — when the user scrolls (on viewport), when the browser is idle (on idle), on hover, on interaction, or after a timer. It improves initial page load by deferring heavy components like charts, comments, or videos until they are actually needed."
      },
      {
        q: "What triggers does @defer support?",
        a: "Common triggers — on idle (browser idle), on viewport (when element scrolls into view), on interaction (when user clicks/keypresses), on hover, on timer(2s), and on immediate. You can also use 'when condition' for custom logic. @placeholder, @loading, @error are companion blocks for showing fallback content."
      },
      {
        q: "Do we still need CommonModule for @if and @for?",
        a: "No. @if, @for, @switch, @defer are built into the compiler. CommonModule is only needed for old directives like *ngIf, *ngFor, ngClass (the directive form). For pipes like async, date, json, you still need CommonModule (or import each pipe individually in standalone components)."
      }
    ],
    followUpQuestions: [
      { q: "Is track mandatory in @for?", a: "Yes — compiler error if missing." },
      { q: "Default value for @case in @switch?", a: "@default acts like the default case in a switch." },
      { q: "Can @defer prefetch?", a: "Yes — prefetch on hover/idle while showing placeholder." },
      { q: "Is @empty mandatory in @for?", a: "No, optional — used when list is empty." },
      { q: "From which version is new control flow stable?", a: "Stable from Angular 17, default from v18." }
    ],
    commonMistakes: [
      "Forgetting track in @for — compiler will error. Use track item.id or track $index.",
      "Using *ngIf with @if in same template — works but inconsistent, pick one style.",
      "Using @defer everywhere — only use it for genuinely heavy components, otherwise it adds complexity.",
      "Not providing @placeholder for @defer — user sees a flash of nothing while it loads."
    ],
    proTip: "I use @defer (on viewport) for any below-the-fold heavy section — comments, related products, charts. Lighthouse score improves a lot because the initial JS bundle is smaller. Always pair it with a @placeholder so the page does not jump when the lazy content loads."
  },

  // ============================================================
  // 5. Directives (Structural, Attribute, Custom)
  // ============================================================
  {
    id: 'directives',
    title: '5. Directives (Structural, Attribute, Custom)',
    whatIsThis: [
      "A directive is a class with a @Directive decorator that adds behaviour to an existing element. Components are actually directives with a template — they all extend from the same base concept.",
      "Two types — structural directives change the DOM structure (add/remove elements), attribute directives change the appearance or behaviour of an existing element. Simple meaning is — structural reshapes the DOM tree, attribute decorates an element."
    ],
    whyUseIt: [
      "Directives let us apply reusable logic to many elements without making new components. Want every input to highlight on focus? Make a directive once, slap it on 100 inputs. Want to right-click a div to show a menu? Directive.",
      "They keep templates clean — instead of writing the same (mouseenter)/(mouseleave) handler on every card, we write appHoverGlow once."
    ],
    realLifeExample: [
      "On Amazon product page — every clickable card has a hover-zoom effect. Instead of writing the same JS in every component, the team writes a single appHoverZoom directive and just adds it to any element: <div appHoverZoom>...</div>. Same directive, different elements, zero copy-paste.",
      "Another classic — appHasRole='admin' that hides an element if the logged-in user is not admin. One directive controls visibility based on role across the whole app."
    ],
    howItWorks: [
      "Structural directives use * prefix or @-blocks now (*ngIf, *ngFor, @if, @for) — they add or remove a host element from the DOM.",
      "Attribute directives change the look/behaviour — ngClass, ngStyle, or any custom directive with a selector like [appHighlight].",
      "Custom directive = @Directive class with a selector, can inject ElementRef to access the host element, listen to events with @HostListener, set bindings with @HostBinding.",
      "From Angular 14+, directives can be standalone — declare imports directly in the component using them.",
      "Angular calls the directive's lifecycle hooks (ngOnInit, ngOnDestroy) just like a component."
    ],
    codeExample: `import {
  Directive, ElementRef, HostListener, HostBinding,
  Component, inject, input, signal
} from '@angular/core';

// Custom attribute directive — highlight on hover
@Directive({
  selector: '[appHoverGlow]',
  standalone: true
})
export class HoverGlowDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  // Input — let user pass a custom colour
  color = input<string>('#fde68a');

  @HostBinding('style.transition') transition = 'background 200ms ease';

  @HostListener('mouseenter') onEnter(): void {
    this.el.nativeElement.style.background = this.color();
  }

  @HostListener('mouseleave') onLeave(): void {
    this.el.nativeElement.style.background = '';
  }
}

// Use it in a component
@Component({
  selector: 'app-product-list',
  imports: [HoverGlowDirective],
  template: \`
    <div class="card" appHoverGlow>Boat Headphones — ₹1,499</div>
    <div class="card" appHoverGlow color="#bbf7d0">Mi Watch — ₹2,799</div>

    <!-- Built-in attribute directives -->
    <p [class.error]="hasError()">Status</p>
    <p [style.color]="hasError() ? 'red' : 'green'">Live</p>

    <!-- Structural — old vs new -->
    @if (hasError()) { <p>Something went wrong!</p> }
    <!-- old way: <p *ngIf="hasError()">Something went wrong!</p> -->
  \`
})
export class ProductListComponent {
  hasError = signal(false);
}`,
    codeOutput: `[ Boat Headphones — ₹1,499 ]   ← background turns yellow on hover
[ Mi Watch — ₹2,799 ]          ← background turns green on hover
Status (no class)
Live (green)`,
    interviewQuestions: [
      {
        q: "What is the difference between structural and attribute directives?",
        a: "Structural directives (*ngIf, *ngFor, *ngSwitch) change the DOM tree by adding or removing elements. Attribute directives (ngClass, ngStyle, custom ones like [appHighlight]) change the appearance or behaviour of an existing element without adding/removing it. Components are actually directives with a template."
      },
      {
        q: "How do you create a custom directive?",
        a: "Use the @Directive decorator with a selector, mark it standalone, and inject ElementRef to access the host. Use @HostListener to listen to host events and @HostBinding to bind to host properties. Then add it to the imports array of any component that uses it."
      },
      {
        q: "What is @HostListener and @HostBinding?",
        a: "@HostListener listens to DOM events on the host element — like @HostListener('click') triggers when the host is clicked. @HostBinding binds a property of the host element — like @HostBinding('class.active') controls if the 'active' class is on the host. Both make directive code clean."
      },
      {
        q: "Difference between ngClass directive and [class.x] binding?",
        a: "ngClass takes an object or string and applies multiple classes — [ngClass]={ active: isOn, error: hasError }. [class.active]='isOn' is the more lightweight Angular-built-in way for a single class. For 1–2 classes, prefer [class.x]; for many dynamic classes, ngClass is cleaner."
      },
      {
        q: "Can a directive have its own template?",
        a: "No, only components have a template. If you need a template, use a component. Structural directives use a template ref (the host element's content) but don't define their own template."
      }
    ],
    commonMistakes: [
      "Forgetting standalone: true in custom directive (or omitting it from imports array of the component using it).",
      "Using DOM manipulation directly inside the directive — works, but not SSR-safe. Use Renderer2 or HostBinding for portability.",
      "Putting heavy logic in @HostListener — runs on every event, can hurt performance.",
      "Overusing directives when a CSS pseudo-class would work — :hover background change does not need a directive."
    ],
    proTip: "When the interviewer asks 'when would you write a custom directive?', the strong answer is: 'When the same DOM behaviour needs to be reused across components — like a tooltip, autofocus, role-based visibility, or click-outside detection. If a CSS rule can do it, I prefer CSS. If it needs DOM event handling, directive.'"
  },

  // ============================================================
  // 6. Pipes (Built-in + Custom + Pure vs Impure)
  // ============================================================
  {
    id: 'pipes',
    title: '6. Pipes (Built-in + Custom + Pure vs Impure)',
    whatIsThis: [
      "A pipe is a small function we use in templates to transform a value before showing it. Syntax is value | pipeName : argument. Example {{ price | currency:'INR' }} formats 1500 as ₹1,500.00.",
      "Simple meaning is — pipes are like Excel formulas for the template. Pass in raw data, get pretty output. They keep the component class focused on logic, not on display formatting."
    ],
    whyUseIt: [
      "Without pipes we will write date formatting, number rounding, currency symbols inside the component — that pollutes the class. Pipes let us write {{ today | date:'shortDate' }} in the template and forget about formatting code.",
      "Built-in pipes cover most needs — date, currency, number, percent, json, slice, async, uppercase. For business-specific formatting (Indian phone number, masked card) we write a custom pipe."
    ],
    realLifeExample: [
      "On Amazon product page — price | currency:'INR' shows ₹1,499.00. publishedAt | date:'mediumDate' shows '10 Mar 2026'. user.email | mask shows 'roh***@gmail.com' (custom pipe). orders$ | async automatically subscribes and shows the data.",
      "All formatting happens in the template. The TS class only worries about fetching data — not how to display it."
    ],
    howItWorks: [
      "Built-in pipes — import them from @angular/common in standalone components (or just CommonModule for all of them).",
      "Use chaining: value | pipe1 | pipe2 — output of one is input of next.",
      "Custom pipe — class with @Pipe decorator and a transform(value, ...args) method.",
      "Pure pipe — runs only when input reference changes (default, fast). Impure pipe — runs on every change detection (slow, use rarely).",
      "async pipe — special. Subscribes to an Observable/Promise, returns the latest value, and unsubscribes automatically when component is destroyed."
    ],
    codeExample: `import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, AsyncPipe, JsonPipe } from '@angular/common';
import { interval, map } from 'rxjs';

// Custom pipe — mask Indian phone number
@Pipe({
  name: 'phoneMask',
  standalone: true,
  pure: true
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone || phone.length < 10) return phone;
    const last4 = phone.slice(-4);
    return 'XXXXXX' + last4;
  }
}

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe, DatePipe, AsyncPipe, JsonPipe, PhoneMaskPipe],
  template: \`
    <h3>Order #1234</h3>

    <!-- Built-in pipes -->
    <p>Total: {{ price | currency:'INR':'symbol':'1.2-2' }}</p>
    <p>Placed at: {{ orderTime | date:'medium' }}</p>
    <p>Customer phone: {{ phone | phoneMask }}</p>

    <!-- Chaining + uppercase -->
    <p>Status: {{ status() | uppercase }}</p>

    <!-- async pipe — auto subscribe + unsubscribe -->
    <p>Live tick: {{ tick$ | async }}</p>

    <!-- json pipe — debug helper -->
    <pre>{{ debugObj | json }}</pre>
  \`
})
export class OrderSummaryComponent {
  price = 1499;
  orderTime = new Date();
  phone = '9876543210';
  status = signal('delivered');

  tick$ = interval(1000).pipe(map(n => n));

  debugObj = { id: 1234, items: 3, paid: true };
}`,
    codeOutput: `Order #1234
Total: ₹1,499.00
Placed at: Mar 10, 2026, 4:32:00 PM
Customer phone: XXXXXX3210
Status: DELIVERED
Live tick: 0  (then 1, 2, 3...)
{
  "id": 1234,
  "items": 3,
  "paid": true
}`,
    interviewQuestions: [
      {
        q: "What is the difference between a pure and impure pipe?",
        a: "A pure pipe runs only when the input reference changes — it is fast and the default. An impure pipe (pure: false) runs on every change detection cycle — it is slow but can detect mutations inside the same object/array. Use impure pipes only when absolutely needed, like a search filter on a mutable array."
      },
      {
        q: "What does the async pipe do?",
        a: "The async pipe takes an Observable or Promise, automatically subscribes to it, returns the latest emitted value, and automatically unsubscribes when the component is destroyed. It is the cleanest way to handle Observables in templates — no manual subscribe/unsubscribe needed."
      },
      {
        q: "Why is using async pipe better than .subscribe() in TS?",
        a: "Three reasons — (1) auto unsubscribe prevents memory leaks, (2) it works well with OnPush change detection because Angular knows exactly when the value changes, (3) the template stays declarative and the TS class stays cleaner. The result variable is local to the template."
      },
      {
        q: "How do you create a custom pipe?",
        a: "Make a class with @Pipe({ name, standalone: true }) decorator, implement PipeTransform interface, and write the transform(value, ...args) method. Add it to the imports array of any component using it. Keep it pure unless you really need impure behaviour."
      },
      {
        q: "Why should you avoid impure pipes in @for loops?",
        a: "An impure pipe runs on every change detection cycle. If used inside a @for loop with 1000 items, the pipe runs 1000 times per cycle, which kills performance. Better to compute the filtered/sorted list inside a computed signal or in the component class once, not via an impure pipe in the template."
      }
    ],
    followUpQuestions: [
      { q: "Default pure value of a pipe?", a: "Pure by default (pure: true)." },
      { q: "Does async pipe auto-unsubscribe?", a: "Yes — when component is destroyed." },
      { q: "Can a pipe take multiple arguments?", a: "Yes — value | pipe : arg1 : arg2. Match in transform(value, arg1, arg2)." },
      { q: "Built-in pipes need import in standalone?", a: "Yes — import each (CurrencyPipe, DatePipe etc.) or import CommonModule." },
      { q: "Best pipe for showing Observable data?", a: "async pipe." }
    ],
    commonMistakes: [
      "Using impure pipes for filtering/sorting big lists — kills performance. Compute the result in the component instead.",
      "Forgetting to import the pipe in the component's imports array (standalone) — gives 'No pipe found' error.",
      "Subscribing to an Observable in TS and also using async pipe — double subscription. Pick one.",
      "Putting heavy computation in transform() — the pipe runs many times. Cache the result if needed."
    ],
    proTip: "For showing async data, I always use the async pipe over manual subscribe in TS. Auto-unsubscribe + plays nicely with OnPush change detection + cleaner code. The only time I subscribe manually is when I need the value to drive other logic in TS, not just display it."
  },

  // ============================================================
  // 7. Services & Dependency Injection
  // ============================================================
  {
    id: 'services-di',
    title: '7. Services & Dependency Injection',
    whatIsThis: [
      "A service is a TypeScript class marked with @Injectable that holds reusable logic — API calls, shared state, business rules. Components inject services to use them, instead of writing the same logic in every component.",
      "Dependency Injection (DI) is Angular's built-in system that creates and provides services automatically. Simple meaning is — you don't 'new' a service yourself, you ask Angular for it and Angular gives you the same instance everywhere."
    ],
    whyUseIt: [
      "Without services, every component will write its own HTTP call code, its own state — duplicate code everywhere. Services keep the component thin (just 'render this and call that') and the logic in one place.",
      "DI gives us testability — in tests we replace the real service with a mock. It also gives us a singleton by default (providedIn: 'root'), so all components share the same instance."
    ],
    realLifeExample: [
      "On Flipkart — there is a CartService. AddToCart button on the product page injects it and calls cart.add(item). The cart icon in the header injects the same CartService and reads cart.count(). Both see the same cart because Angular gives them the same singleton instance.",
      "If tomorrow we move from REST to GraphQL, we change only CartService. The 50+ components that inject it don't change at all."
    ],
    howItWorks: [
      "Mark the service class with @Injectable({ providedIn: 'root' }) — this makes it a singleton available app-wide.",
      "In any component, inject it — either via constructor or the modern inject() function.",
      "Angular maintains an injector tree. providedIn: 'root' = single instance. providedIn: 'platform' = shared across multiple Angular apps. Component-level providers = new instance per component.",
      "When component is destroyed, the service stays alive (singleton). Use providedIn: 'any' for component-scoped instance.",
      "DI also works for non-services — Router, HttpClient, ActivatedRoute, DestroyRef are all injected the same way."
    ],
    codeExample: `import { Injectable, inject, signal, Component, computed } from '@angular/core';

// 1. Define a service
@Injectable({ providedIn: 'root' })   // singleton across the whole app
export class CartService {
  // Internal state — signal-based for reactivity
  private readonly _items = signal<{ id: number; name: string; price: number }[]>([]);

  // Public read-only views
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);
  readonly total = computed(() =>
    this._items().reduce((sum, i) => sum + i.price, 0)
  );

  add(item: { id: number; name: string; price: number }): void {
    this._items.update(curr => [...curr, item]);
  }

  remove(id: number): void {
    this._items.update(curr => curr.filter(i => i.id !== id));
  }

  clear(): void { this._items.set([]); }
}

// 2. Inject in any component
@Component({
  selector: 'app-cart-icon',
  template: \`<button>🛒 Cart ({{ cart.count() }})</button>\`
})
export class CartIconComponent {
  // Modern way — inject() function (Angular 14+)
  protected readonly cart = inject(CartService);
}

@Component({
  selector: 'app-product',
  template: \`
    <button (click)="addToCart()">Add Boat Headphones — ₹1,499</button>
    <p>Cart total: ₹{{ cart.total() }}</p>
  \`
})
export class ProductComponent {
  protected readonly cart = inject(CartService);

  addToCart(): void {
    this.cart.add({ id: 1, name: 'Boat Headphones', price: 1499 });
  }
}`,
    codeOutput: `🛒 Cart (0)                      ← initially
(click Add to Cart)
🛒 Cart (1)                      ← updates everywhere
Cart total: ₹1499`,
    interviewQuestions: [
      {
        q: "What is dependency injection in Angular?",
        a: "DI is a design pattern where a class receives its dependencies from outside instead of creating them. Angular's injector creates services and provides them automatically. We just declare what we need (in constructor or via inject()), and Angular hands us the same instance every time. Benefits: testable, decoupled, singleton by default."
      },
      {
        q: "What is providedIn: 'root'?",
        a: "It registers the service at the root injector — making it a singleton available across the entire app, lazy-loaded modules included. It is the most common option. Angular's tree-shaker can also remove the service if no component injects it. Other options: 'platform', 'any', or providing it in a component for component-scoped instance."
      },
      {
        q: "Difference between constructor injection and the inject() function?",
        a: "Constructor injection: constructor(private svc: CartService) — older syntax. inject() function: protected readonly svc = inject(CartService) — modern, works outside constructor (in field initialisers, factory providers, route guards as functions). Both give the same instance. Modern code prefers inject()."
      },
      {
        q: "What is a singleton service and how do you ensure one?",
        a: "Singleton means only one instance exists across the app. providedIn: 'root' guarantees this. If you accidentally provide the service inside a component's providers array, every instance of that component creates a new copy — common bug. Stick to 'root' unless you specifically want a per-component instance."
      },
      {
        q: "How do you mock a service in tests?",
        a: "In TestBed.configureTestingModule, use providers: [{ provide: CartService, useValue: mockCartService }]. The DI system gives the mock instead of the real one. This lets you test the component in isolation without hitting real APIs."
      }
    ],
    followUpQuestions: [
      { q: "Default scope of a service?", a: "providedIn: 'root' = app-wide singleton." },
      { q: "Modern way to inject in Angular 14+?", a: "inject() function." },
      { q: "Can we inject HttpClient into a service?", a: "Yes — services can inject other services." },
      { q: "Where to put shared state across components?", a: "In a service (with signals or BehaviorSubject)." },
      { q: "How to make a service component-scoped?", a: "providedIn: 'any' or providers: [Service] inside the component." }
    ],
    commonMistakes: [
      "Adding the service to a component's providers array by mistake — creates a new instance per component, breaks shared state.",
      "Putting business logic in components instead of services — components become huge and untestable.",
      "Forgetting @Injectable — works only if other things are injected into the service. Always add @Injectable for safety.",
      "Using new Service() manually — bypasses DI, breaks testability."
    ],
    proTip: "Modern teams keep services as the single source of truth for shared state. I expose internal signals as readonly with .asReadonly() so components can read but not mutate — only the service's own methods can update state. This pattern stops 'random component changed my data' bugs."
  },

  // ============================================================
  // 8. Signals (signal, computed, effect)
  // ============================================================
  {
    id: 'signals',
    title: '8. Signals (signal, computed, effect)',
    whatIsThis: [
      "Signals are Angular's new reactive primitive (stable from v17). A signal is a holder of a value that can notify Angular when it changes. Three core APIs — signal() creates one, computed() derives from others, effect() runs side effects when signals change.",
      "Simple meaning is — signals are like a smarter version of plain variables. Read them by calling them (count()), update via .set() or .update(). Angular tracks who reads what, so the UI automatically updates only the parts that depend on the changed signal."
    ],
    whyUseIt: [
      "Older Angular relied on Zone.js to detect changes — every async event caused full app re-check. With signals, Angular knows exactly which views depend on which data — much more targeted and faster updates, especially in big apps.",
      "Signals also remove a lot of RxJS boilerplate for simple state. Where earlier we used BehaviorSubject + .next() + async pipe, now signal() + .set() works cleaner and is synchronous."
    ],
    realLifeExample: [
      "On a Swiggy cart page — cart items signal, total = computed(() => sum of prices), tax = computed(() => total * 0.05), grandTotal = computed(() => total + tax). Add an item → total auto recalculates → tax auto recalculates → grand total updates → screen shows new value. We never wrote a single 'recalculate' line.",
      "An effect logs 'cart changed' to analytics every time items change. Angular handles all the wiring — we just describe relationships."
    ],
    howItWorks: [
      "signal(initial) — create a signal. Read with count(), write with count.set(5) or count.update(c => c + 1).",
      "computed(() => derivedValue) — read other signals inside. Auto-updates when those signals change. Memoised — only recomputes when needed.",
      "effect(() => { /* uses signals */ }) — runs once on creation, then every time any signal it reads changes. Used for side effects (logging, localStorage sync).",
      "asReadonly() — exposes a signal but hides set/update so consumers can only read.",
      "Signals integrate with templates: {{ count() }} — Angular tracks template reads automatically and only updates the affected DOM."
    ],
    codeExample: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: \`
    <h3>Your Cart</h3>
    <p>Items: {{ count() }}</p>
    <p>Subtotal: ₹{{ subtotal() }}</p>
    <p>Tax (5%): ₹{{ tax() }}</p>
    <p><strong>Grand Total: ₹{{ grandTotal() }}</strong></p>

    <button (click)="addItem(499)">Add ₹499 item</button>
    <button (click)="addItem(1499)">Add ₹1,499 item</button>
    <button (click)="clear()">Clear</button>
  \`
})
export class CartComponent {
  // 1. signal — writable state
  private readonly items = signal<number[]>([]);

  // 2. computed — derived values, auto-updates
  readonly count    = computed(() => this.items().length);
  readonly subtotal = computed(() => this.items().reduce((s, p) => s + p, 0));
  readonly tax      = computed(() => Math.round(this.subtotal() * 0.05));
  readonly grandTotal = computed(() => this.subtotal() + this.tax());

  constructor() {
    // 3. effect — side effect runs on signal changes
    effect(() => {
      console.log('Cart changed →', this.count(), 'items, ₹', this.grandTotal());
      // Could also save to localStorage here
    });
  }

  addItem(price: number): void {
    this.items.update(list => [...list, price]);
  }

  clear(): void {
    this.items.set([]);
  }
}`,
    codeOutput: `Items: 0
Subtotal: ₹0
Tax (5%): ₹0
Grand Total: ₹0

(click Add ₹499)
Cart changed → 1 items, ₹ 524
Items: 1
Subtotal: ₹499
Tax (5%): ₹25
Grand Total: ₹524

(click Add ₹1499)
Cart changed → 2 items, ₹ 2098
...`,
    interviewQuestions: [
      {
        q: "What are signals in Angular and why were they introduced?",
        a: "Signals are reactive primitives stable from Angular 17. They hold a value and notify Angular when it changes. They were introduced to give fine-grained reactivity — earlier Angular re-checked the whole component tree on every async event via Zone.js. With signals, Angular knows exactly which views depend on which data and updates only those parts. Result: faster apps, less boilerplate."
      },
      {
        q: "What is the difference between signal, computed, and effect?",
        a: "signal() creates a writable value — change with .set/.update. computed() creates a derived signal — value comes from other signals automatically and is memoised. effect() runs a side effect (logging, localStorage save) every time the signals it reads change. Rule of thumb — derive with computed, side effect with effect."
      },
      {
        q: "How are signals different from RxJS Observables?",
        a: "Signals are synchronous — read the value directly with count(). Observables are async streams — you subscribe and get values over time. Signals are simpler for state. Observables are better for events and streams (clicks, HTTP, WebSocket). Modern Angular code uses signals for state and RxJS for events."
      },
      {
        q: "Do signals replace RxJS?",
        a: "No, they complement each other. Signals are great for component state and derived values. RxJS is still needed for HTTP, complex async flows, and event streams. Angular provides toSignal() and toObservable() for interop. Many teams use signals where they used to use BehaviorSubject."
      },
      {
        q: "How does change detection work with signals?",
        a: "When a signal updates, only the components/views that read that signal mark themselves for check. Angular doesn't re-check unrelated components. This is far more efficient than Zone.js-based default change detection. With OnPush + signals, Angular only re-renders exactly what changed."
      }
    ],
    followUpQuestions: [
      { q: "How to read a signal value?", a: "Call it like a function: count()." },
      { q: "How to update a signal?", a: "set(value) or update(prev => newValue)." },
      { q: "Can computed be set directly?", a: "No — it's read-only, derived." },
      { q: "When does effect run?", a: "Once on creation, then every time its read signals change." },
      { q: "How to expose a read-only signal?", a: "Use signal.asReadonly()." },
      { q: "Signals stable from which version?", a: "Angular 17 (developer preview in 16)." }
    ],
    commonMistakes: [
      "Forgetting parentheses — count is the signal object, count() is the value. Templates need {{ count() }}, not {{ count }}.",
      "Using computed() for side effects — computed should be pure and only return a value. Use effect() for logging, network calls.",
      "Mutating the array/object inside a signal — signal won't notify because reference is same. Always replace: items.update(curr => [...curr, newItem]).",
      "Setting one signal inside an effect that reads it — causes infinite loop. Angular will throw."
    ],
    proTip: "On modern Angular projects I use signals as the default for component and service state, and keep RxJS for HTTP and event streams (clicks, WebSocket, debounced search). The combo gives me the best of both — synchronous simple state via signals, powerful async streams via RxJS, with toSignal/toObservable bridging when needed."
  },

  // ============================================================
  // 9. Component Communication (Input / Output — old & new APIs)
  // ============================================================
  {
    id: 'component-communication',
    title: '9. Component Communication (@Input / @Output / input() / output() / model())',
    whatIsThis: [
      "Components talk to each other using inputs and outputs. A parent passes data down via inputs. A child sends events up via outputs. Both old (@Input/@Output decorator) and new (input()/output()/model() function) APIs work — modern code prefers the new ones.",
      "Simple meaning is — input is data flowing parent → child, output is event flowing child → parent. model() is two-way binding (input + output combined). For unrelated components (cousins), use a shared service."
    ],
    whyUseIt: [
      "Components must be reusable. A reusable RatingStarsComponent should not know which page it lives on — it just receives a 'value' input and emits 'changed' events. Parents wire the data and react to events.",
      "The new signal-based input()/output() is type-safe, supports required inputs at compile time, integrates with computed signals for derived values, and removes the need for ngOnChanges in many cases."
    ],
    realLifeExample: [
      "On Amazon product card — ProductCardComponent gets product (input), and emits addToCart event (output). Parent ProductListComponent supplies the product and handles the event. Same card is reused on home, category, search results — zero changes.",
      "For star rating, the user clicks a star — the component emits the rating up. The parent saves it to the API. Two-way model() works perfectly here — [(rating)]='product.rating'."
    ],
    howItWorks: [
      "Parent passes data: <app-card [product]=\"item\" (addToCart)=\"onAdd($event)\" />.",
      "Child receives via input: product = input<Product>() — modern signal-based; or @Input() product!: Product — legacy.",
      "Child emits via output: addToCart = output<Product>() — call this.addToCart.emit(this.product()).",
      "Two-way: model() = input + output in one. Parent uses [(value)]='x'.",
      "For required inputs: input.required<Product>() — compile-time error if parent doesn't pass.",
      "Modern bonus: input() returns a signal, so you can use computed() on it without ngOnChanges."
    ],
    codeExample: `import { Component, input, output, model, computed } from '@angular/core';

interface Product { id: number; name: string; price: number; }

// CHILD — modern signal-based
@Component({
  selector: 'app-product-card',
  template: \`
    <div class="card">
      <h4>{{ product().name }}</h4>
      <p>₹{{ product().price }} (with GST: ₹{{ priceWithGst() }})</p>

      <input type="number"
             [value]="qty()"
             (input)="qty.set(+$any($event.target).value)" />

      <button (click)="onAdd()">Add to Cart</button>
    </div>
  \`
})
export class ProductCardComponent {
  // input() — required at compile time
  product = input.required<Product>();

  // input() with default
  showGst = input<boolean>(true);

  // model() — two-way binding for qty
  qty = model<number>(1);

  // output() — event up to parent
  addToCart = output<{ product: Product; qty: number }>();

  // computed off an input — no ngOnChanges needed
  priceWithGst = computed(() =>
    Math.round(this.product().price * (this.showGst() ? 1.18 : 1))
  );

  onAdd(): void {
    this.addToCart.emit({ product: this.product(), qty: this.qty() });
  }
}

// PARENT — wires the inputs and listens to output
@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  template: \`
    @for (p of products; track p.id) {
      <app-product-card
        [product]="p"
        [(qty)]="qtyFor[p.id]"
        (addToCart)="addToCart($event)" />
    }
    <p>Last added: {{ lastAdded?.product?.name }} x {{ lastAdded?.qty }}</p>
  \`
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Boat Headphones', price: 1499 },
    { id: 2, name: 'Mi Watch',        price: 2799 }
  ];
  qtyFor: Record<number, number> = { 1: 1, 2: 1 };
  lastAdded?: { product: Product; qty: number };

  addToCart(e: { product: Product; qty: number }): void {
    this.lastAdded = e;
    console.log('Added', e.qty, 'x', e.product.name);
  }
}`,
    codeOutput: `Boat Headphones
₹1499 (with GST: ₹1769)
[ qty: 2 ] [ Add to Cart ]

(click Add to Cart)
Added 2 x Boat Headphones
Last added: Boat Headphones x 2`,
    interviewQuestions: [
      {
        q: "How does a child component send data to its parent?",
        a: "Through outputs — either @Output() with EventEmitter (old) or output<T>() (new signal-based). The child calls .emit(value) and the parent listens with (eventName)='handler($event)'. This is the standard child-to-parent communication pattern."
      },
      {
        q: "What is the difference between @Input() and input()?",
        a: "@Input() is the decorator-based legacy API — string-typed, needs ngOnChanges to react. input() is the new signal-based API from Angular 17+ — returns a signal, fully type-safe, supports input.required<T>() for compile-time required inputs, and integrates with computed() for derived values without ngOnChanges."
      },
      {
        q: "What is model() and when do you use it?",
        a: "model() is a signal-based two-way binding — combines input() and output() in one. Parent uses [(value)]='x'. Use it for form-control-like components — date pickers, rating stars, custom inputs — where the value should flow both ways. Cleaner than separate [value] + (valueChange)."
      },
      {
        q: "How do unrelated components (cousins) share data?",
        a: "Through a shared service — usually with signals or BehaviorSubject. Both components inject the same service (providedIn: 'root'), the service exposes the state, and updates flow automatically. This is much cleaner than passing data up and down through many parents."
      },
      {
        q: "What is input.required<T>()?",
        a: "It declares an input that must be provided by the parent — Angular's compiler errors if it is missing. Earlier we used @Input({ required: true }) (Angular 16+) or marked the field with non-null assertion. input.required<T>() is the modern, cleanest way."
      }
    ],
    followUpQuestions: [
      { q: "How to listen to an output in parent?", a: "(eventName)='handler($event)'." },
      { q: "How to enforce a required input?", a: "input.required<T>()." },
      { q: "Two-way binding in modern Angular?", a: "model() in child + [(prop)] in parent." },
      { q: "EventEmitter still needed?", a: "Only for @Output() decorator. output() doesn't need it." },
      { q: "How to react to input changes without ngOnChanges?", a: "Use computed() over the input signal." }
    ],
    commonMistakes: [
      "Forgetting to call .emit() on outputs — handler in parent never fires.",
      "Mutating an input object — parent's data is also mutated (reference shared). Always treat inputs as read-only.",
      "Using outputs for shared state across many components — leads to prop-drilling. Use a service instead.",
      "Mixing @Input decorator with input() function in the same component — works but inconsistent. Pick one style."
    ],
    proTip: "On new Angular code I default to input() and output() functions over decorators. They give type safety, work with signals out of the box (no ngOnChanges noise), and input.required<T>() catches missing inputs at compile time. The day Angular team called these 'the future', I switched the whole team."
  },

  // ============================================================
  // 10. Routing (provideRouter, lazy load, guards, params)
  // ============================================================
  {
    id: 'routing',
    title: '10. Routing (Lazy Load, Guards, Resolvers, Params)',
    whatIsThis: [
      "Routing is what makes a SPA feel like a multi-page app. Angular Router maps URL paths to components — /products shows ProductListComponent, /products/123 shows ProductDetailComponent — without a full page reload.",
      "Modern Angular uses provideRouter() in app.config.ts (replaces RouterModule.forRoot), loadComponent for per-component lazy loading, and functional guards (canActivate as a function, not a class)."
    ],
    whyUseIt: [
      "Without routing, the app is a single component — no back button, no shareable URLs. Routing gives us bookmarkable URLs, browser history, deep links, and the ability to lazy load big features only when the user visits them.",
      "Lazy loading is critical for performance — the user does not download admin code if they never go to /admin. Route guards protect routes (login required, role required). Resolvers pre-fetch data so the page doesn't show a blank state."
    ],
    realLifeExample: [
      "On Flipkart — / shows home, /products/iphone-15 shows product detail (with id from URL), /admin loads only if user is admin (canActivate guard), /orders pre-fetches orders before the page renders (resolver). The whole admin section is lazy-loaded so regular users never download it.",
      "Browser back/forward, refresh, sharing the URL — everything works because of router."
    ],
    howItWorks: [
      "Define routes in app.routes.ts as an array of Route objects with path, loadComponent (or component), title, canActivate, resolve.",
      "Register with provideRouter(routes) in appConfig.providers.",
      "Place <router-outlet /> in the template where routed components should render.",
      "Navigate via [routerLink]=\"['/products', id]\" or programmatically via router.navigate(['/products', id]).",
      "Read URL params with inject(ActivatedRoute) — route.snapshot.params or route.params (Observable for changing params).",
      "Lazy load: loadComponent: () => import('./feature/feature.component').then(m => m.FeatureComponent)."
    ],
    codeExample: `// app.routes.ts
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

// Functional guard — modern way (no class needed)
const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};

// Functional resolver — pre-fetch data before route activates
const productResolver = (route: any) => {
  const svc = inject(ProductService);
  return svc.getById(+route.paramMap.get('id'));
};

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Eager-loaded
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },

  // Lazy-loaded with title
  {
    path: 'products',
    loadComponent: () => import('./products/list.component').then(m => m.ListComponent),
    title: 'All Products'
  },

  // Route param + resolver
  {
    path: 'products/:id',
    loadComponent: () => import('./products/detail.component').then(m => m.DetailComponent),
    resolve: { product: productResolver }
  },

  // Lazy + guard
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  },

  { path: '**', redirectTo: 'products' }
];

// product-detail.component.ts — read params + resolved data
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  template: \`
    <a routerLink="/products">← Back</a>
    <h2>{{ product()?.name }}</h2>
    <p>ID from URL: {{ id() }}</p>
  \`
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);

  // Params — sync via snapshot or async via route.params
  id = signal(this.route.snapshot.params['id']);

  // Resolved data — already loaded before page rendered
  product = signal(this.route.snapshot.data['product']);
}`,
    codeOutput: `URL: /products/iphone-15
← Back
iPhone 15
ID from URL: iphone-15

URL: /admin (when not logged in)
→ Redirected to /login`,
    interviewQuestions: [
      {
        q: "What is the difference between loadComponent and loadChildren?",
        a: "loadComponent lazy-loads a single standalone component — modern, simpler. loadChildren lazy-loads a feature module or a group of routes. With standalone components, loadComponent is preferred because it gives finer-grained code splitting and smaller bundles."
      },
      {
        q: "What is a route guard and what types are there?",
        a: "Guards control access to a route. Types: canActivate (run before navigating in), canDeactivate (before leaving — for unsaved-changes prompts), canLoad (before lazy module downloads), canMatch (modern, controls route matching), and resolve (pre-fetch data). Modern Angular uses functional guards — guards as plain functions, not classes."
      },
      {
        q: "How do you read URL parameters?",
        a: "Inject ActivatedRoute. For one-time read, route.snapshot.params['id']. For reactive reads (param can change without route change), subscribe to route.params or route.paramMap as Observable. Snapshot is enough for most cases. Use the Observable form if URL params change while staying on the same page."
      },
      {
        q: "What is a resolver and when do you use it?",
        a: "A resolver pre-fetches data before the route activates. So the user never sees an empty page that then loads. Useful when the page is meaningless without the data — product detail page should not render with no product. Modern Angular supports functional resolvers (just a function, no class needed)."
      },
      {
        q: "What is the difference between [routerLink] and router.navigate()?",
        a: "[routerLink] is template-based, declarative — write it on an anchor: [routerLink]=\"['/products', id]\". router.navigate() is programmatic — call inside TS after a form submit, after login, after API success. Both end up at the same URL. Use routerLink for plain links, navigate() for logic-driven navigation."
      }
    ],
    followUpQuestions: [
      { q: "Where to register router in modern Angular?", a: "provideRouter(routes) in app.config.ts." },
      { q: "Wildcard route?", a: "{ path: '**', redirectTo: ... } — must be last." },
      { q: "How to lazy load standalone component?", a: "loadComponent: () => import(...).then(m => m.X)." },
      { q: "Where to render routed components?", a: "<router-outlet />." },
      { q: "Functional vs class-based guards?", a: "Functional (just a function with inject()) is modern and recommended." },
      { q: "How to set tab title per route?", a: "title: 'My Page' in route config." }
    ],
    commonMistakes: [
      "Forgetting <router-outlet /> in the template — routes don't render anywhere.",
      "Putting wildcard route ('**') before specific routes — wildcard catches everything first.",
      "Heavy work in canActivate — guard runs on every navigation, keep it fast.",
      "Hardcoded URLs in TS code — use [routerLink] or router.navigate() so refactors are safe."
    ],
    proTip: "I always lazy-load every feature route with loadComponent. Initial bundle stays small (only home + login), and the rest downloads as the user navigates. Combined with @defer for below-the-fold content, the time-to-interactive on slow networks drops dramatically."
  },

  // ============================================================
  // 11. HTTP Client & Interceptors
  // ============================================================
  {
    id: 'http-client-interceptors',
    title: '11. HTTP Client & Interceptors (Functional)',
    whatIsThis: [
      "HttpClient is Angular's built-in service for making API calls (GET, POST, PUT, DELETE). It returns Observables, integrates with RxJS, and supports interceptors to modify every request/response.",
      "An interceptor is a function (modern way) that runs in between the HttpClient call and the network — used to add auth tokens, log requests, retry on errors, show a loading spinner. Simple meaning is — a single 'middleware' that handles cross-cutting HTTP concerns in one place."
    ],
    whyUseIt: [
      "Without HttpClient we will use fetch() everywhere — no built-in retry, no interceptors, no progress events for uploads. HttpClient gives all this plus testability via HttpClientTestingModule.",
      "Interceptors solve duplication. Every API call needs a token? Write one auth interceptor. Want to log every API call? One logging interceptor. Without interceptors, this code repeats in every service."
    ],
    realLifeExample: [
      "On Swiggy — every API call needs Authorization: Bearer <token>. Without interceptor, every service must add the header. With one auth interceptor, header is added automatically. If token expires (401), interceptor refreshes and retries. All this in one file, services stay clean.",
      "Loading spinner — start spinner on every outgoing request, stop on response/error. Done in one interceptor; works for the entire app."
    ],
    howItWorks: [
      "Register HttpClient with provideHttpClient() in app.config.ts. Add interceptors via withInterceptors([authInterceptor, loggingInterceptor]).",
      "Inject HttpClient where needed — http.get<T>(url), http.post<T>(url, body), etc. Returns Observable<T>.",
      "Functional interceptor signature: (req, next) => next(req). Modify req with req.clone({ ... }), then call next.",
      "Subscribe to the Observable to fire the call (or use async pipe in template). Without subscribe, the call never happens.",
      "Error handling — pipe with catchError() to return a fallback or rethrow."
    ],
    codeExample: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor }    from './interceptors/auth.interceptor';
import { loggingInterceptor } from './interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    )
  ]
};

// auth.interceptor.ts — functional, modern
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (!token) return next(req);

  const cloned = req.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` }
  });
  return next(cloned);
};

// logging.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  return next(req).pipe(
    tap({
      next: () => console.log(\`[\${req.method}] \${req.url} ✅ \${(performance.now() - start).toFixed(0)}ms\`),
      error: e => console.error(\`[\${req.method}] \${req.url} ❌\`, e.status)
    })
  );
};

// product.service.ts — typed API calls
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

interface Product { id: number; name: string; price: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base).pipe(
      catchError(() => of([]))   // graceful fallback
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(\`\${this.base}/\${id}\`);
  }

  create(p: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.base, p);
  }
}`,
    codeOutput: `[GET] /api/products ✅ 142ms
[GET] /api/products/5 ✅ 87ms
[POST] /api/products ✅ 213ms

(token expired)
[GET] /api/profile ❌ 401`,
    interviewQuestions: [
      {
        q: "What is HttpClient and how is it different from fetch?",
        a: "HttpClient is Angular's built-in HTTP service. Unlike fetch, it returns Observables (not Promises), supports interceptors, has built-in JSON parsing and typed responses, integrates with RxJS operators, and is testable via HttpClientTestingModule. fetch is the browser API and works fine but you lose all these Angular features."
      },
      {
        q: "What is an interceptor and give examples of when to use one?",
        a: "An interceptor is a middleware that sits between HttpClient and the network — it can modify requests (add headers, transform body) and responses (parse, log, retry). Common use cases: auth token, logging, loading spinner, error handling, retry-on-401, base URL prefix. Modern Angular prefers functional interceptors over class-based."
      },
      {
        q: "Difference between functional and class-based interceptors?",
        a: "Class-based was the original (HttpInterceptor with intercept method, registered as a multi-provider). Functional is the modern way from Angular 15+ — just a function (req, next) => next(req), registered via withInterceptors([...]). Functional is shorter, plays nicely with inject(), and is now the recommended approach."
      },
      {
        q: "How do you handle errors from HttpClient?",
        a: "Use the catchError operator from RxJS in the pipe. You can return a fallback value (return of([]) for graceful empty), rethrow with throwError, or transform the error. For app-wide handling, do it in an interceptor and call next(req).pipe(catchError(...))."
      },
      {
        q: "Why must you subscribe to HttpClient calls?",
        a: "HttpClient returns a cold Observable — it does nothing until subscribed. If you don't subscribe (or use async pipe), the HTTP call simply never fires. The async pipe in templates is the cleanest way; manual subscribe in TS works but you must remember to unsubscribe."
      }
    ],
    followUpQuestions: [
      { q: "Modern way to register HttpClient?", a: "provideHttpClient() in app.config.ts." },
      { q: "Why does HttpClient return Observable, not Promise?", a: "Cancellable, retryable, supports operators." },
      { q: "How to add a JWT to every request?", a: "Auth interceptor — clone req with Authorization header." },
      { q: "Best way to handle 401 globally?", a: "Interceptor with catchError → refresh token → retry." },
      { q: "Async pipe vs manual subscribe?", a: "async pipe auto-unsubscribes — preferred." }
    ],
    commonMistakes: [
      "Forgetting to subscribe — call appears to do nothing because Observable is cold.",
      "Subscribing inside a service for no reason — return the Observable and let component subscribe (or use async pipe).",
      "Catching errors silently and returning of(null) without logging — masks real bugs.",
      "Mutating the original HttpRequest — must use req.clone({ ... }) since it's immutable."
    ],
    proTip: "I keep one interceptor per concern — auth, logging, error, loading spinner. Easier to test, easier to enable/disable. The order in withInterceptors([...]) matters — auth first (so logging sees the final request with token), error last (so it catches errors from all earlier ones)."
  },

  // ============================================================
  // 12. Reactive Forms
  // ============================================================
  {
    id: 'reactive-forms',
    title: '12. Reactive Forms (FormBuilder, Validators, Custom Validators)',
    whatIsThis: [
      "Reactive Forms are Angular's way of building forms in TypeScript code (instead of in the template). You create FormControl, FormGroup, FormArray in the class, and bind them to inputs in the template with [formControl] and formControlName.",
      "Simple meaning is — the form lives in TS as a typed object. You can read/write values, add/remove fields, validate, all from code. Better for dynamic and complex forms compared to template-driven (ngModel) forms."
    ],
    whyUseIt: [
      "For login/signup/profile pages, template-driven forms work. But for big forms — multi-step, conditional fields, dynamic add/remove rows, custom async validation (like 'check if email already exists') — reactive forms are much cleaner.",
      "Reactive forms give a typed valueChanges Observable for free, granular validation, programmatic control (form.disable(), form.patchValue), and easier unit testing."
    ],
    realLifeExample: [
      "Address form on Amazon checkout — pincode field has async validator (calls API to check serviceability). Phone number has pattern validator (10 digits). 'Save as default' is a checkbox. 'Add another address' adds a new FormGroup to a FormArray. All this is a textbook fit for reactive forms.",
      "Without reactive forms, this becomes a mess of template logic and ad-hoc validation. With reactive forms, the whole form is a typed object you can console.log."
    ],
    howItWorks: [
      "Import ReactiveFormsModule in the component's imports.",
      "Build the form: FormBuilder.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]] }).",
      "Bind in template: <form [formGroup]='form' (ngSubmit)='onSubmit()'> with formControlName='name'.",
      "Read values: form.value, form.valid, form.controls.name.errors.",
      "Listen to changes: form.valueChanges.subscribe(v => ...) — Observable.",
      "Custom validator: just a function (control: AbstractControl) => ValidationErrors | null."
    ],
    codeExample: `import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators,
  AbstractControl, ValidationErrors
} from '@angular/forms';

// Custom synchronous validator — Indian PAN format
function panValidator(control: AbstractControl): ValidationErrors | null {
  const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return control.value && !pattern.test(control.value)
    ? { invalidPan: true }
    : null;
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Name
        <input formControlName="name" />
      </label>
      @if (form.controls.name.touched && form.controls.name.invalid) {
        <small class="err">Name is required (min 2 chars)</small>
      }

      <label>
        Email
        <input formControlName="email" type="email" />
      </label>
      @if (form.controls.email.touched && form.controls.email.errors?.['email']) {
        <small class="err">Invalid email</small>
      }

      <label>
        PAN
        <input formControlName="pan" />
      </label>
      @if (form.controls.pan.touched && form.controls.pan.errors?.['invalidPan']) {
        <small class="err">PAN format: AAAAA9999A</small>
      }

      <label>
        <input type="checkbox" formControlName="terms" />
        I accept terms
      </label>

      <button type="submit" [disabled]="form.invalid">Sign Up</button>

      <pre>{{ form.value | json }}</pre>
      <p>Valid: {{ form.valid }}</p>
    </form>
  \`
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    pan:   ['', [Validators.required, panValidator]],
    terms: [false, Validators.requiredTrue]
  });

  constructor() {
    // React to changes
    this.form.valueChanges.subscribe(v =>
      console.log('form changed →', v)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitting:', this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }
}`,
    codeOutput: `(typing in fields)
form changed → { name: 'R', email: '', pan: '', terms: false }
form changed → { name: 'Rohit', email: 'rohit@a.com', pan: '', terms: false }
...
{
  "name": "Rohit",
  "email": "rohit@example.com",
  "pan": "ABCDE1234F",
  "terms": true
}
Valid: true

(submit)
Submitting: { name: 'Rohit', email: 'rohit@example.com', pan: 'ABCDE1234F', terms: true }`,
    interviewQuestions: [
      {
        q: "What is the difference between Template-driven and Reactive Forms?",
        a: "Template-driven uses ngModel and lives in the template (good for simple login/contact forms). Reactive uses FormBuilder/FormGroup/FormControl and lives in TS (good for complex forms — multi-step, dynamic fields, async validation). Reactive is more testable, type-safe, and predictable. Modern enterprise apps prefer Reactive."
      },
      {
        q: "What is FormBuilder and why is it useful?",
        a: "FormBuilder is a service that gives short syntax to create forms. fb.group({}), fb.array([]), fb.control(value, validators) — less verbose than 'new FormGroup({...})'. fb.nonNullable.group() in v14+ gives stronger typing where values cannot be null."
      },
      {
        q: "How do you write a custom validator?",
        a: "A validator is a function (control: AbstractControl) => ValidationErrors | null. Return null if valid, otherwise an object like { invalidPan: true }. Pass it as the second argument to FormControl. For async validators (API call), return Observable<ValidationErrors | null>."
      },
      {
        q: "How do you handle dynamic fields like 'add multiple addresses'?",
        a: "Use FormArray. fb.array([initialAddress]) — then push new groups with arr.push(fb.group({...})) and remove with arr.removeAt(i). In template, *ngFor or @for over arr.controls. This is the main reason reactive forms are preferred for complex UIs."
      },
      {
        q: "What does form.valueChanges return?",
        a: "An Observable of the form's value that emits whenever any control changes. Great for live previews, autosave drafts, or triggering dependent fields. You can also pipe it with debounceTime, distinctUntilChanged before reacting."
      }
    ],
    followUpQuestions: [
      { q: "Module to import for reactive forms?", a: "ReactiveFormsModule." },
      { q: "Built-in required validator?", a: "Validators.required." },
      { q: "How to disable a control?", a: "control.disable()." },
      { q: "How to set values programmatically?", a: "form.patchValue({...}) or form.setValue({...})." },
      { q: "Difference between patchValue and setValue?", a: "setValue requires all fields, patchValue allows partial." },
      { q: "How to mark all fields as touched on submit?", a: "form.markAllAsTouched()." }
    ],
    commonMistakes: [
      "Forgetting to import ReactiveFormsModule — gives 'Can't bind to formGroup' error.",
      "Mixing template-driven (ngModel) and reactive forms in the same form — confusing.",
      "Not showing errors only when 'touched' or 'dirty' — user sees error before they even type, bad UX.",
      "Calling form.setValue() with missing fields — throws. Use patchValue() for partial updates."
    ],
    proTip: "I always use fb.nonNullable.group() (Angular 14+) for stronger types — values can't be null, getRawValue() is properly typed. Combined with custom validators returning typed error keys, the form becomes a proper typed contract that the compiler checks for me."
  },

  // ============================================================
  // 13. RxJS Essentials
  // ============================================================
  {
    id: 'rxjs-essentials',
    title: '13. RxJS Essentials (Observable, Subject, Operators, async pipe)',
    whatIsThis: [
      "RxJS is the reactive programming library Angular ships with. Observable is the core — a stream of values over time. Operators (map, filter, switchMap, debounceTime) are pipeable functions that transform streams. Subject is a special Observable that you can also push values into.",
      "Simple meaning is — Observable is like a Promise that can deliver many values, not just one. Click stream, HTTP response, WebSocket messages, route param changes — all are Observables. Operators let you chain transformations: 'wait 300ms, ignore duplicates, then call API'."
    ],
    whyUseIt: [
      "Modern apps are full of async events — clicks, typing, scrolling, API calls, WebSocket. Promises only handle one value. Observables handle streams elegantly with cancel, retry, debounce, and combine multiple streams.",
      "The async pipe + Observables removes manual subscribe/unsubscribe in many places. switchMap is the killer operator for typeahead search — auto-cancels previous request when user types again."
    ],
    realLifeExample: [
      "Search bar on Amazon — user types 'iph'. With debounceTime(300) we wait 300ms before searching. distinctUntilChanged ignores no-change events. switchMap calls /search?q=iph and auto-cancels if user types another letter. async pipe shows results in template. Whole thing is 8 lines of RxJS — without it, this would be 50+ lines of timeout/cancel code.",
      "Live order tracking on Swiggy — WebSocket stream of order status updates. Subject in a service holds the latest. Components read via async pipe."
    ],
    howItWorks: [
      "Observable.subscribe(next, error, complete) — the only way to get values from an Observable. Don't subscribe → nothing happens.",
      "pipe(operator1, operator2, ...) — chains pure transformations. Each returns a new Observable.",
      "Subject — both Observer and Observable. Use subject.next(value) to push values. Subject has no initial value.",
      "BehaviorSubject(initial) — like Subject but stores the latest value, emits it to new subscribers immediately.",
      "Hot vs Cold — Cold (HttpClient) starts fresh per subscriber. Hot (Subject, fromEvent) shares the same stream.",
      "Always unsubscribe to avoid memory leaks — async pipe, takeUntilDestroyed, take(1) are common patterns."
    ],
    codeExample: `import { Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  Subject, BehaviorSubject, of, EMPTY,
  debounceTime, distinctUntilChanged, switchMap, catchError, map
} from 'rxjs';

interface SearchResult { id: number; title: string; }

@Component({
  selector: 'app-typeahead-search',
  imports: [ReactiveFormsModule],
  template: \`
    <input [formControl]="search" placeholder="Search products..." />
    <p>Showing {{ results().length }} results</p>
    <ul>
      @for (r of results(); track r.id) {
        <li>{{ r.title }}</li>
      }
    </ul>
  \`
})
export class TypeaheadSearchComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  search = new FormControl('', { nonNullable: true });

  // Build the search stream
  private results$ = this.search.valueChanges.pipe(
    debounceTime(300),                       // wait 300ms after last keystroke
    distinctUntilChanged(),                  // ignore if value didn't change
    switchMap(q => q.length < 2
      ? of([])                               // skip very short queries
      : this.http.get<SearchResult[]>(\`/api/search?q=\${q}\`)
          .pipe(catchError(() => of([])))    // on error, empty list
    ),
    takeUntilDestroyed(this.destroyRef)      // auto unsubscribe
  );

  // Convert Observable → signal for the template
  results = toSignal(this.results$, { initialValue: [] as SearchResult[] });
}

// Subject vs BehaviorSubject in a service
@Injectable({ providedIn: 'root' })
class NotificationService {
  // Subject — no initial value, late subscribers miss past values
  private readonly events$ = new Subject<string>();
  events = this.events$.asObservable();

  // BehaviorSubject — has initial value, late subscribers get the latest
  private readonly badgeCount$ = new BehaviorSubject<number>(0);
  badgeCount = this.badgeCount$.asObservable();

  push(msg: string): void {
    this.events$.next(msg);
    this.badgeCount$.next(this.badgeCount$.value + 1);
  }

  clear(): void { this.badgeCount$.next(0); }
}`,
    codeOutput: `(user types 'i')
(no API call yet — debounced)

(user types 'ip')
(still waiting 300ms)

(user pauses 300ms)
GET /api/search?q=ip
Showing 12 results

(user types 'iphone' — quickly)
GET /api/search?q=ipho   ← auto-cancelled by switchMap
GET /api/search?q=iphone ← only this one completes
Showing 8 results`,
    interviewQuestions: [
      {
        q: "What is an Observable and how is it different from a Promise?",
        a: "An Observable is a stream of values over time — can emit zero, one, or many values, can be cancelled, and supports operators (map, filter, switchMap). A Promise is a single async value, cannot be cancelled, and has no operator chain. Observables are also lazy (cold) — nothing happens until subscribed; Promises start immediately."
      },
      {
        q: "What is the difference between Subject and BehaviorSubject?",
        a: "Subject is a multicast Observable with no initial value — late subscribers miss past emissions. BehaviorSubject has an initial value and stores the latest value — late subscribers immediately get the most recent value. For state (like 'current user'), BehaviorSubject is better. For events (like 'logout clicked'), Subject is fine."
      },
      {
        q: "What is switchMap and when do you use it?",
        a: "switchMap maps each input value to a new Observable and cancels the previous inner Observable when a new value comes. Classic use case: typeahead search — when user types, cancel the in-flight request and start a new one. Other map operators: mergeMap (don't cancel, all run), concatMap (queue), exhaustMap (ignore new while current is running)."
      },
      {
        q: "How do you avoid memory leaks with Observables?",
        a: "(1) Use the async pipe — auto unsubscribes when component is destroyed. (2) Use takeUntilDestroyed(destroyRef) — modern Angular pattern. (3) Manual unsubscribe in ngOnDestroy. (4) take(1) for one-shot Observables. The first two are preferred."
      },
      {
        q: "What is the async pipe and why is it preferred?",
        a: "async pipe subscribes to an Observable in the template, shows the latest value, and auto-unsubscribes when the component is destroyed. Benefits: zero memory leaks, plays well with OnPush change detection, keeps the TS class clean. Use it for most cases instead of manual subscribe."
      }
    ],
    followUpQuestions: [
      { q: "What does .subscribe() return?", a: "A Subscription — call .unsubscribe() to stop." },
      { q: "Hot vs Cold Observable?", a: "Cold: each subscriber gets own stream (HTTP). Hot: shared (Subject, fromEvent)." },
      { q: "Operator to debounce input?", a: "debounceTime(ms)." },
      { q: "Operator to retry on error?", a: "retry(n) or retryWhen." },
      { q: "Convert Observable → Signal?", a: "toSignal() from @angular/core/rxjs-interop." },
      { q: "Convert Signal → Observable?", a: "toObservable()." }
    ],
    commonMistakes: [
      "Forgetting to subscribe — Observable is cold, nothing happens.",
      "Using mergeMap when switchMap is needed — old API responses can override the latest typed search.",
      "Subscribing inside another subscribe — nesting hell. Use switchMap/mergeMap instead.",
      "Manual subscribe without unsubscribe — memory leak. Prefer async pipe or takeUntilDestroyed."
    ],
    proTip: "Modern Angular code combines RxJS for streams (HTTP, events) with signals for state. Use toSignal() at the boundary — keep the powerful operators (debounce, switchMap) for the input pipeline, then convert the result to a signal for the template. Best of both worlds."
  },

  // ============================================================
  // 14. Change Detection (Default vs OnPush)
  // ============================================================
  {
    id: 'change-detection',
    title: '14. Change Detection (Default vs OnPush, Signals)',
    whatIsThis: [
      "Change detection is the process Angular uses to figure out 'has any data changed, do I need to update the DOM?'. The default strategy checks every component on every async event (click, timer, HTTP). OnPush is a stricter strategy that checks only when inputs change or events happen inside the component.",
      "Simple meaning is — Default = check everything every time (safe, slow on big apps). OnPush = check only when needed (fast, requires immutable inputs). Signals + OnPush is the modern winning combo."
    ],
    whyUseIt: [
      "On a small app, default change detection is fine. On apps with hundreds of components and frequent events, default becomes slow — every click runs through every component. OnPush cuts this dramatically by skipping components whose inputs didn't change.",
      "Signals make OnPush even better. With signals, Angular knows exactly which views read which signals and updates only those — no need to mark for check manually."
    ],
    realLifeExample: [
      "On a Bloomberg-style finance dashboard with 500 widgets — every WebSocket tick, default change detection re-checks all 500 components. With OnPush + signals, only the widgets reading the changed signal update — UI stays smooth at 60fps even with hundreds of updates per second.",
      "On a normal CRUD app you may not feel the difference, but as the app grows, OnPush becomes essential."
    ],
    howItWorks: [
      "Default — Angular checks every component in the tree after every async event (Zone.js triggers it).",
      "OnPush — component is checked only when: (a) an @Input reference changes, (b) an event fires inside it, (c) async pipe emits, (d) markForCheck() is called manually, (e) a signal it reads changes.",
      "To enable: @Component({ ..., changeDetection: ChangeDetectionStrategy.OnPush }).",
      "With OnPush, mutate-then-set-same-reference does nothing — must replace: items = [...items, newItem]. This is why immutability is important.",
      "Signals automatically work well with OnPush — no manual markForCheck needed."
    ],
    codeExample: `import {
  Component, ChangeDetectionStrategy,
  ChangeDetectorRef, inject, signal, input
} from '@angular/core';

interface Order { id: number; status: string; }

// OnPush — fast, runs only when needed
@Component({
  selector: 'app-order-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>#{{ order().id }} → {{ order().status }}</p>
  \`
})
export class OrderRowComponent {
  // Signal-based input — works perfectly with OnPush
  order = input.required<Order>();
}

// Parent — uses OnPush too
@Component({
  selector: 'app-orders',
  imports: [OrderRowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h3>Live Orders ({{ orders().length }})</h3>
    @for (o of orders(); track o.id) {
      <app-order-row [order]="o" />
    }
    <button (click)="addOrder()">Add Order</button>
    <button (click)="updateFirst()">Update First</button>
  \`
})
export class OrdersComponent {
  orders = signal<Order[]>([
    { id: 101, status: 'Pending' },
    { id: 102, status: 'Cooking' }
  ]);

  addOrder(): void {
    // ✅ New reference — Angular detects change
    this.orders.update(arr => [
      ...arr,
      { id: Date.now(), status: 'Pending' }
    ]);
  }

  updateFirst(): void {
    // ✅ Replace the first item to keep immutability
    this.orders.update(arr => arr.map((o, i) =>
      i === 0 ? { ...o, status: 'Delivered' } : o
    ));

    // ❌ Wrong — mutating same object, signal won't notify
    // const arr = this.orders();
    // arr[0].status = 'Delivered';
  }
}

// Old-style — manual markForCheck (no signals)
@Component({
  selector: 'app-counter-old',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<p>Count: {{ count }}</p>\`
})
export class CounterOldComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  count = 0;

  manualUpdate(): void {
    this.count++;
    this.cdr.markForCheck();   // tell Angular to re-check next cycle
  }
}`,
    codeOutput: `Live Orders (2)
#101 → Pending
#102 → Cooking
[Add Order] [Update First]

(click Add Order)
Live Orders (3)
#101 → Pending
#102 → Cooking
#1709820000123 → Pending

(click Update First)
Live Orders (3)
#101 → Delivered
#102 → Cooking
#1709820000123 → Pending`,
    interviewQuestions: [
      {
        q: "What is OnPush change detection and when do you use it?",
        a: "OnPush is a strict change detection strategy. The component is checked only when: input reference changes, an event fires inside it, async pipe emits, markForCheck is called, or a signal it reads changes. Use it on big component trees, list items, dashboards — anywhere unnecessary checks hurt performance. Modern Angular code defaults to OnPush + signals."
      },
      {
        q: "Why does OnPush need immutability?",
        a: "OnPush triggers on input reference change. If you mutate an object passed as input (e.g., obj.name = 'X'), the reference is the same, so Angular skips the check. You must replace: { ...obj, name: 'X' }. Same with arrays — use [...arr, newItem], not arr.push(newItem). Signals + immutable updates remove this trap."
      },
      {
        q: "How does Zone.js relate to change detection?",
        a: "Zone.js patches all async APIs (setTimeout, addEventListener, fetch). When any async event fires, Zone tells Angular to run change detection. With default strategy, Angular checks every component after every event — expensive in big apps. OnPush narrows this. Future Angular is moving to zoneless mode where signals drive updates directly."
      },
      {
        q: "What is the difference between markForCheck and detectChanges?",
        a: "markForCheck schedules the component (and its ancestors) for the next change detection cycle — non-blocking, recommended. detectChanges runs change detection synchronously right now starting from this component down — heavier, can cause re-entrancy bugs if misused. 95% of cases use markForCheck."
      },
      {
        q: "How do signals improve change detection?",
        a: "With signals, Angular tracks exactly which component templates read which signals. When a signal changes, only those views are scheduled for check — finer than even OnPush. Combined with the upcoming zoneless mode, this gives surgical updates and removes the need for Zone.js entirely. This is the future direction of Angular."
      }
    ],
    followUpQuestions: [
      { q: "Default CD strategy?", a: "ChangeDetectionStrategy.Default — checks all on every event." },
      { q: "OnPush trigger conditions?", a: "Input ref change, event inside, async pipe, markForCheck, signal read." },
      { q: "Why mutate-and-keep-ref doesn't update OnPush?", a: "Reference is unchanged → Angular skips." },
      { q: "Best modern combo?", a: "OnPush + signals + immutable updates." },
      { q: "What is zoneless Angular?", a: "Future mode without Zone.js — signals drive change detection directly." }
    ],
    commonMistakes: [
      "Using OnPush but mutating input objects — view doesn't update. Always replace with new reference.",
      "Calling detectChanges manually all over the place — usually a sign that the design is wrong.",
      "Forgetting OnPush on list-item components — biggest perf win is on items rendered many times.",
      "Mixing default and OnPush randomly across the tree — hard to reason about. Pick OnPush as the default."
    ],
    proTip: "On any new project I set ChangeDetectionStrategy.OnPush as the default for all components and use signals for state. Mutations are replaced with immutable updates. Result — apps stay fast even with many components, and change detection becomes predictable. The interview answer 'OnPush + signals + async pipe' shows real production thinking."
  }
];
