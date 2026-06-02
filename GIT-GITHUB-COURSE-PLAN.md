# Git & GitHub — New Course Plan (Basic → Advanced)

> **Status:** PROPOSAL / DOC ONLY. No code written yet. Awaiting your "yes" + CSS decision.
> **Author:** Claude • **Date:** 2026-06-02

---

## 1. Goal (what you asked for)

A new course **"Git & GitHub — From Basic to Advanced"**, focused on the
**real mistakes developers actually make** (not toy commands). Requirements:

| Requirement | How the plan meets it |
|---|---|
| Basic → Advanced | 8 progressive topics, beginner → advanced (registry-driven) |
| "Where devs actually make mistakes" | Every topic has a **"❌ Mistake → ✅ Fix"** block (signature feature) |
| Scalable | Mirrors the proven `/dotnet` single-source-of-truth registry pattern |
| Without BE (no backend) | 100% static, build-time only. SSG-prerendered. No API, no DB. |
| Advanced SEO | Per-topic title/meta/OG/canonical + JSON-LD + auto sitemap |
| Lazy loading | Each topic is a lazily `import()`-ed standalone component |
| Best practices | Reuses shared `CodeBlockComponent`, SeoService, TOC service |
| Small, scalable CSS | See §6 — **decision needed** |

---

## 2. How your site is built (so the new course fits in, not bolts on)

Your repo (`learn-hub`) is an **Angular 19 SPA, SSG-prerendered**, no backend.
Subjects live under `src/app/subjects/*` and are **lazy-loaded route bundles**:

```
/            → hub home
/courses     → course catalog
/dotnet      → .NET roadmap (full registry-driven course)  ← the model to copy
/angular     → "coming soon" placeholder
/react       → "coming soon" placeholder
/git         → NEW: Git & GitHub course   ← what we add
```

The `/dotnet` course is driven by **one file** —
[src/app/subjects/dotnet/dotnet-topics.ts](src/app/subjects/dotnet/dotnet-topics.ts).
A single `DOTNET_TOPICS[]` array generates **routes, sidebar nav, home cards,
search index, prev/next links, SEO tags, and the sitemap automatically.**
We copy this pattern exactly so the Git course is scalable from day one.

---

## 3. Proposed course structure (`/git`)

Single registry file `git-topics.ts` → `GIT_TOPICS[]`. Proposed 8 topics:

| # | Slug | Title | Level | "Mistake" focus |
|---|---|---|---|---|
| 0 | `git-fundamentals` | What Git Really Is (not GitHub) | Beginner | confusing Git vs GitHub; committing node_modules |
| 1 | `staging-commits` | Staging, Commits & Good History | Beginner | `git add .` blindly; vague commit messages |
| 2 | `branching-merging` | Branches, Merge & Fast-forward | Beginner | working on `main`; deleting unmerged branches |
| 3 | `remotes-github` | Remotes, Push/Pull & GitHub Flow | Intermediate | force-push to shared branch; pull vs fetch confusion |
| 4 | `merge-vs-rebase` | Merge vs Rebase (and conflicts) | Intermediate | rebasing public history; aborting mid-conflict wrong |
| 5 | `undoing-things` | Undo: reset, revert, restore, reflog | Intermediate | `reset --hard` losing work; revert vs reset mixup |
| 6 | `pull-requests-review` | PRs, Code Review & Protected Branches | Advanced | giant PRs; no branch protection; squash misuse |
| 7 | `advanced-git` | Stash, Cherry-pick, Bisect, Hooks, Submodules | Advanced | leaked secrets in history; broken `.gitignore` timing |

> Topic list is a starting point — easy to add/reorder later (just edit the array).
> We can ship topics 0–2 "ready" first and mark the rest `ready: false`
> ("coming soon") so the course goes live fast and grows incrementally.

### Signature feature: the "Mistake → Fix" block
Each topic renders cards like:

```
❌ MISTAKE          git reset --hard HEAD~3   (you just lost 3 commits of work)
✅ FIX              git reflog → find the SHA → git reset --hard <sha>
💡 WHY             reflog keeps a 90-day safety log of every HEAD move
```

This is the course's differentiator and maps cleanly to a small reusable component.

---

## 4. File-by-file change list (when approved)

**New files:**
```
src/app/subjects/git/git.routes.ts            # routes derived from registry
src/app/subjects/git/git-topics.ts            # SINGLE SOURCE OF TRUTH
src/app/subjects/git/git-shell.component.ts    # sidebar + header + TOC shell
src/app/subjects/git/home/git-home.component.* # course landing page
src/app/subjects/git/<topic>/<topic>.component.ts
src/app/subjects/git/<topic>/<topic>.data.ts   # content as data (mistake/fix/code)
```

**Edited files (tiny, surgical):**
```
src/app/app.routes.ts          # +1 lazy route:  { path: 'git', loadChildren: ... }
src/app/pages/courses/...       # +1 catalog card for the Git course
src/app/pages/home/...          # (optional) feature the course on hub home
app.routes.server.ts            # ensure /git/* is in the prerender set
```

No backend, no new runtime deps (CSS decision in §6 is the only possible dep).

---

## 5. SEO plan (advanced, static-friendly)

Reuses your existing [SeoService](src/app/shared/seo/seo.service.ts) +
`site.config.ts` base URL. Per topic:

- Unique, keyword-rich `<title>` + ~155-char `<meta description>`
- `og:*` / `twitter:*` tags + canonical URL (already handled by SeoService)
- **JSON-LD** `Course` + `BreadcrumbList` structured data (NEW small helper)
- Auto-included in `sitemap.xml` via existing `scripts/generate-sitemap.mjs`
  (it globs prerendered output — no extra wiring)
- SSG prerender = real crawlable HTML for every `/git/<slug>` URL
- Target keywords: "git mistakes", "git rebase vs merge", "undo git commit",
  "git reflog recover", "github pull request best practices"

---

## 6. ⚠️ CSS DECISION — needs your call

Your site today = **one global `src/styles.css`** (custom utilities + semantic
classes), components set to `style: "none"`. **Tailwind is not installed.**

Three options:

**A. Match the existing convention (no new dep).**
Add Git-course classes to the existing global CSS using the same naming style as
the `/dotnet` course. → Zero new tooling, perfectly consistent with the rest of
the site, smallest diff. *Recommended for consistency.*

**B. Add Tailwind (what you said you want).**
Install `tailwindcss` + PostCSS, add `tailwind.config.js`, enable it in the
build, then write the Git course with utility classes. → You get Tailwind, but it
**only** styles the new course while the rest of the site stays on global CSS
(two systems coexisting), bigger setup, slightly larger first diff.

**C. Add Tailwind AND keep it scoped cleanly.**
Same as B but we prefix/scope so it never fights the existing CSS, and we treat
it as the go-forward standard for future courses too.

> I'll implement whichever you pick. Tell me A, B, or C (and your final
> topic list tweaks), then I'll build it.

---

## 7. Out of scope (confirming your "without BE")
- No server/API, no database, no auth, no comments, no search backend.
- Everything is static + build-time. Hosting stays on Vercel static output.
```
```
```

(End of doc.)
