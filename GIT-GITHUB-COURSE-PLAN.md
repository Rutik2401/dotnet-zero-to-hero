# Git & GitHub — New Course Plan (Basic → Advanced)

> **Status:** ✅ COMPLETE — all 9 lessons live at `/git`. CSS = global, no Tailwind.
> **Author:** Claude • **Date:** 2026-06-02
>
> **Shipped (9/9):** Fundamentals · Repo→Push · Branching & Merging · Merge vs Rebase ·
> Undoing/reflog · Remotes & GitHub Flow · PRs & Code Review · Advanced Git (incl. leaked-secret
> scrub) · Interview Q&A + Scenarios. All routes prerendered (SSG), content + JSON-LD + the
> right-side "On this page" TOC baked into static HTML, sitemap updated, linked from `/courses`.
> Build passes (35 routes prerendered).

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
| 8 | `interview-questions` | Interview Q&A + Real-World Scenarios | All levels | the questions everyone gets wrong (see §8) |

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

## 6. ✅ CSS DECISION — LOCKED

**Decision (2026-06-02): Keep external/global CSS only. NO Tailwind.**

The Git course will use the existing global `src/styles.css` with the same
naming convention as the `/dotnet` course (custom utilities + semantic classes,
components stay `style: "none"`). Zero new dependencies, fully consistent with
the rest of the site, smallest possible diff, and "small scalable CSS" as asked.

*(Tailwind was considered and declined — it is not installed and the rest of the
site does not use it.)*

---

## 7. Out of scope (confirming your "without BE")
- No server/API, no database, no auth, no comments, no search backend.
- Everything is static + build-time. Hosting stays on Vercel static output.

---

## 8. Interview & Scenario topic (the finale — "no one teaches it like this")

A dedicated last topic `/git/interview-questions`, grounded in official docs
([git-scm.com](https://git-scm.com/doc), [GitHub Docs](https://docs.github.com))
and common interview sources. It answers the questions juniors actually get
asked + the real situations they panic in:

**Core Q&A**
- **Git vs GitHub** — Git = distributed VCS, runs locally / any server, no
  internet needed. GitHub = a web host for Git repos + collaboration (PRs,
  issues, Actions). One is the tool, the other is a place to keep & share repos.
- **Repo creation → first push, step by step** (the full happy path):
  `git init` → `git add .` → `git commit -m` → create empty repo on GitHub →
  `git remote add origin <url>` → `git branch -M main` → `git push -u origin main`.
- **How do I delete the last commit?** — the answer interviewers want is
  "it depends if it's pushed":
  - not pushed, keep changes: `git reset --soft HEAD~1`
  - not pushed, discard changes: `git reset --hard HEAD~1`
  - already pushed/shared: `git revert HEAD` (new commit, safe, no history rewrite)

**Scenario / "what do you do when…" cards** (junior dev panics, solved):
- I committed to `main` but it should've been a feature branch
- I `reset --hard` and lost work → `git reflog` recovery
- I committed a password / `.env` → remove from history + rotate the secret
- Merge conflict mid-pull — how to read it and finish (or `--abort`)
- I committed `node_modules` — fix `.gitignore` + `git rm -r --cached`
- "Pull is rejected (non-fast-forward)" — fetch, rebase/merge, then push
- Detached HEAD — what it means and how to get back safely

Each renders as the same **❌ Mistake / ✅ Fix / 💡 Why** card, so it reads like
a rescue manual, not a command dictionary.

---

## 9. Sources (for content accuracy)
- Official Git docs — https://git-scm.com/doc
- Official GitHub docs — https://docs.github.com
- Cross-checked against common interview compilations (reset vs revert, GitHub flow).
```
```
```

(End of doc.)
