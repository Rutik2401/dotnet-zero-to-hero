# 📘 Content Format Rules — .NET Roadmap Site

This file is the **single source of truth** for how every topic page must be written.
Follow this format strictly. No improvisation.

---

## 1. Language & Tone

- Use **simple Indian English**, daily conversation style.
- Explain like teaching a fresher in office, not a research paper.
- Avoid: "leverage", "paradigm", "abstraction layer complexity", "in essence", "thereby".
- Use: "Use this when…", "Simple meaning is…", "In real project…", "👉 …".

---

## 2. Topic Page Structure (MANDATORY — every topic)

Every topic must include **all** of these sections, in this order:

1. **🔹 What is [Topic]?** — definition + 👉 Simple meaning
2. **🔹 Why do we use it?** — bullets + 👉 Real reason (interview answer)
3. **🔹 Real-life Example** — Indian context (Swiggy, Bank, Amazon, ATM, etc.)
4. **🔹 How it works (Step-by-step)** — numbered flow
5. **🔹 Code Example (C# / .NET)** — C# code + **toggle output**
6. **🔹 Interview Questions** — 3–5 main Q&A
7. **🔹 Follow-up Questions (rapid fire)** — *only for important topics* (Q1/Q2/Q3 format)
8. **🔹 Common Mistakes** — what beginners do wrong
9. **🔹 Pro Tip (Interviewer Insight)** — 1 line that makes the candidate stand out

---

## 3. Code Example Rule

- Every code block must be runnable C#.
- **Every code example must have an `Output` block.**
- On the website, the output is hidden by default behind a `See Output` button.
- User clicks → output appears. Clicks again → hides.
- This makes the user **predict first, verify after** — the way actual interview prep works.

In the data file:

```ts
codeExample: `Console.WriteLine("Hello");`,
codeOutput: "Hello"
```

---

## 4. Follow-up Questions Format (for Important Topics only)

Use this exact rapid-fire style — short questions, 1-line direct answers prefixed with 👉.

### Example (taken from `Sealed Class`)

🔹 **What is a Sealed Class?**

A sealed class is a class that cannot be inherited by any other class.

👉 **Simple meaning:**
Once you create a sealed class, no one can extend it further.

🔹 **Why do we use it?**

- To stop inheritance when you don't want further modification
- To protect logic (security / business rules)
- To improve performance slightly (compiler optimization)

👉 **Real reason (interview answer):**
"We use sealed class when we want to restrict inheritance and ensure the behavior of the class is not changed."

🔹 **Interview Questions**

**Q1: Can we inherit a sealed class?**
👉 No, it will give compile-time error.

**Q2: Can sealed class have constructor?**
👉 Yes.

**Q3: Can sealed class have methods?**
👉 Yes, normal methods.

---

In the data file, follow-up questions go into a separate `followUpQuestions` array so they render as the rapid-fire block:

```ts
followUpQuestions: [
  { q: "Can we inherit a sealed class?",        a: "No, compile-time error." },
  { q: "Can sealed class have constructor?",    a: "Yes." },
  { q: "Can sealed class have methods?",        a: "Yes, normal methods." }
]
```

---

## 5. Which Topics Are "Important"?

Add follow-up questions for any topic that:

- Appears as a **standard interview question** (OOP, async/await, DI, EF Core, LINQ, etc.)
- Has a **lot of small gotchas** that interviewers love to drill into
- Is a **definition-style** question where short Q&A format helps memorisation

Examples in Phase 0 — Classes, Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID.
Skip follow-up for purely procedural topics like loops or operators (already simple).

---

## 6. Bullet Point Rule

- Don't write one-line bullets everywhere.
- Each main bullet should have **2–4 lines of explanation**.
- Short bullets allowed only for **feature lists**, **Common Mistakes**, **Why-do-we-use** lists.

---

## 7. Examples Should Always Be Indian / Relatable

✅ Use:
- Swiggy / Zomato (orders, delivery)
- Amazon / Flipkart (cart, checkout, products)
- Banking (SBI, HDFC, account, withdrawal)
- ATM (PIN, cash dispenser)
- IRCTC (booking, retry on failure)
- College / classroom

❌ Avoid:
- Vague Western examples (foo / bar)
- Overly abstract math problems

---

## 8. Pro Tip Rule

- ONE line, max two.
- Must sound like something a senior engineer says in an interview.
- Should hint at **real production thinking**, not textbook knowledge.

✅ Good Pro Tip:
> "I default to `decimal` for any money/financial data because `double` uses binary floating point which gives precision errors."

❌ Bad Pro Tip:
> "Always write good code and follow best practices."

---

## 9. Interview Questions Rule

- 3–5 main interview Q&A per topic (not optional).
- Answers must be **2–4 sentences**, not one-liners (these are "main round" questions).
- Cover **what / why / when / how** — not just definitions.
- Use the type `QA = { q: string; a: string }`.

Follow-up questions are **separate** and short — see Section 4.

---

## 10. File / Folder Conventions

- Each phase = one Angular page component, e.g. `pages/phase-0/`.
- Topic content lives in a sibling `phase-N.data.ts` file as a typed array.
- No per-component CSS (`schematics: { style: "none" }` in `angular.json`).
- All styling in `src/styles.css`.
- Routes are lazy-loaded.

---

## 11. Output Toggle UX

- Default state: output **hidden**.
- Button label changes: `See Output` ⇄ `Hide Output`.
- Multiple code blocks on one page each have their own toggle (independent state).
- The output block uses a different background colour (greenish / terminal-like) so the eye can tell at a glance: this is the result, not the code.

---

## 12. Topic Navigation (in Phase Page)

- Top of phase page: **Topic Index** (numbered list, click → smooth scroll to topic).
- Right side (desktop): **Sticky TOC** that stays visible while scrolling.
- Bottom of each topic card: optional `↑ Top` link.

---

## 13. Routing Rule

- All 9 phases (`Phase 0` through `Phase 8`) must be routable.
- Phases not yet authored show a **"Coming Soon"** page (not a 404).
- Sidebar shows all phases — completed ones styled active, upcoming ones with a `soon` pill.
- 404 / unknown routes → redirect to home.

---

## 14. Final Quality Check (before pushing a topic)

- [ ] All 9 sections present.
- [ ] Code compiles in C# (no fake APIs).
- [ ] Output is realistic — actually what `dotnet run` would print.
- [ ] At least 1 Indian real-life example.
- [ ] Pro tip sounds like a senior engineer talking.
- [ ] No GeeksforGeeks-style copy-paste — explanation must be original and conversational.

---

## 15. Format Cheatsheet (for new contributors)

```ts
{
  id: 'kebab-case-id',
  title: 'N. Topic Title',

  whatIsThis: ["Definition line 1", "Simple meaning..."],
  whyUseIt:   ["Reason 1 in 2-3 lines", "Reason 2..."],
  realLifeExample: ["Indian example explained..."],
  howItWorks: ["Step 1", "Step 2", "Step 3"],

  codeExample: `// runnable C#`,
  codeOutput:  `actual console output`,

  interviewQuestions: [
    { q: "Main interview question?", a: "2-4 sentence answer." }
  ],

  // Optional — only for IMPORTANT topics
  followUpQuestions: [
    { q: "Quick Q1?", a: "👉 Direct one-line answer." },
    { q: "Quick Q2?", a: "👉 Direct one-line answer." }
  ],

  commonMistakes: ["Mistake 1", "Mistake 2"],
  proTip: "One line a senior engineer would actually say."
}
```

---

---

# 🛠 Engineering Conventions (codebase rules)

The sections below apply to **every code change** in this repo — not just topic content.

---

## 16. Project Naming

- Project name: **`dotnet-roadmap`** (in `package.json`, `angular.json`, build outputs).
- Browser title (`index.html`): `.NET Roadmap — Interview Prep`.
- Never commit `hello-world` references — they are leftover Angular CLI defaults.

---

## 17. Folder & File Structure

```
src/
├── index.html
├── main.ts
├── styles.css                      ← single global stylesheet (tokens + components)
└── app/
    ├── app.component.{ts,html}     ← shell: header + sidebar + router-outlet
    ├── app.config.ts
    ├── app.routes.ts               ← all routes lazy-loaded via loadComponent
    └── pages/
        ├── home/                   ← landing page
        ├── coming-soon/            ← shared page for unauthored phases
        └── phase-N/                ← one folder per phase
            ├── phase-N.component.ts
            ├── phase-N.component.html
            ├── phase-N.data.ts     ← typed Topic[] array
            └── phase-N.types.ts    ← QA + Topic interfaces
```

Rules:
- One component per folder. File names are **kebab-case** (`phase-1.component.ts`).
- No per-component CSS files (`schematics.style: "none"` in `angular.json`). All styling in `src/styles.css`.
- Standalone components only — **no NgModules**.
- Routes are **lazy-loaded** via `loadComponent` (never eager-import a page component).

---

## 18. Angular Code Conventions

- Use modern control flow: **`@if` / `@for` / `@switch`** (not `*ngIf` / `*ngFor`).
- Use **signals** for component state; `effect()` for reactive side-effects.
- `inject()` over constructor injection in standalone components.
- Always use `track` in `@for` loops (`@for (item of items; track item.id)`).
- Public class members readonly when possible; prefer immutable updates over mutation.

---

## 19. CSS / Design System

- **Never hard-code** colors, durations, radii, spacing, or font families.  
  Always use the CSS custom properties from `src/styles.css`:
  - Colors: `--bg`, `--text`, `--primary`, `--border`, etc.
  - Spacing: `--space-1` … `--space-12` (8px scale)
  - Radii: `--radius-sm`, `--radius`, `--radius-lg`, `--radius-pill`
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
  - Motion: `--ease`, `--dur-fast`, `--dur`, `--dur-slow`
  - Layout: `--header-h`, `--sidebar-w`, `--content-max`, `--toc-w`
- New tokens go at the top of `styles.css` under section `1. Tokens`.
- Group related rules under existing numbered section banners — don't sprinkle.

✅ Good:
```css
.my-card {
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  transition: box-shadow var(--dur) var(--ease);
}
```

❌ Bad:
```css
.my-card {
  padding: 16px 20px;
  border-radius: 10px;
  transition: box-shadow 200ms ease-in-out;
}
```

---

## 20. Responsive Breakpoints

Standard breakpoints (defined in `styles.css` section `14. Responsive`):

| Breakpoint   | Target                            |
| ------------ | --------------------------------- |
| `≤ 1280px`   | Wide laptop — drop right TOC      |
| `≤ 1024px`   | Laptop — gentler padding          |
| `≤ 768px`    | Tablet — single-column shell      |
| `≤ 480px`    | Small phone — tighter typography  |

Rules:
- Test every new screen at all four breakpoints.
- Prefer `clamp()` for fluid typography (e.g. `clamp(1.75rem, 4vw, 2.4rem)`).
- Use Flexbox / CSS Grid; no fixed-pixel layouts.

---

## 21. Accessibility (a11y) — minimum bar

- Every interactive element must show focus via `:focus-visible` (handled globally — don't override).
- Icon-only buttons need `aria-label` AND `title` (e.g. burger menu).
- Use semantic tags: `<header>`, `<main>`, `<aside>`, `<nav>`, `<article>`, `<section>`.
- Color contrast ≥ AA (4.5:1 body, 3:1 large text).
- Respect `prefers-reduced-motion` — don't add JS animations that bypass the global media query.

---

## 22. Animation Guidelines

- One easing curve: `var(--ease)`. Three durations: `--dur-fast` (120ms hover), `--dur` (180ms default), `--dur-slow` (280ms reveals).
- Subtle is the rule — `translateY(-1px)` on hover, not `translateY(-6px)`.
- Page transitions: handled globally (`pageEnter` keyframe on routed components). Don't add per-page animations.
- Always wrap motion in or respect `@media (prefers-reduced-motion: reduce)`.

---

## 23. Performance

- Routes: **always** `loadComponent` lazy import — never eager.
- Use `track` on every `@for` to avoid re-rendering whole lists.
- Defer heavy renders behind toggles (see the `See Output` button pattern).
- No external font CDNs in `index.html`; use system font stack (`var(--font-sans)`).
- Don't pull entire libraries for a single function — copy / inline the function instead.

---

## 24. Build & Verification

Before committing:
```bash
npm run build
```

Must pass with:
- ✅ Zero compile errors / warnings.
- ✅ Initial bundle under the budget in `angular.json` (currently 500 KB warn / 1 MB error).
- ✅ Per-phase chunk under ~120 KB (lazy-loaded).

If a chunk grows past 120 KB, split data file or audit imports.

---

## 25. Code Hygiene

- No `console.log` left in committed code.
- No commented-out code blocks (delete them; git remembers).
- No `TODO` without an issue / owner — write the fix or open a ticket.
- One concept per commit; commit message in imperative mood (`add phase-2 page`, not `added phase 2`).

---

**End of Rules.md** — every topic page AND every code change must pass these checklists.

