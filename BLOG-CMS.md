# Blog CMS (Sanity) — how it works & how to use it

Your blog is powered by **Sanity** (a free headless CMS) using a
**build-time fetch** model. You write posts in the Sanity Studio (admin panel);
a build step pulls them into the site and prerenders them to static HTML.

```
Sanity Studio (admin)              your Angular site
┌───────────────────┐   build     ┌──────────────────────────────┐
│ write post + image │ ─────────►  │ scripts/fetch-blog.mjs        │
│ click "Publish"    │   (GROQ)    │   → blog-data.generated.ts    │
└───────────────────┘             │ ng build → /blog/* prerendered │
                                   └──────────────────────────────┘
```

**Why this way?** Posts are baked into static HTML → perfect SEO, and your
visitors load only your own static files (Sanity is hit *only during the build*),
so your free tier is basically never used. 🔒

---

## A. Writing posts (the admin)

The Studio lives in [`studio/`](studio/). First time only:

```bash
cd studio
npm install
npm run dev          # opens the admin at http://localhost:3333
```

Then: **Blog Post → + Create**, fill in title, slug (click *Generate*), cover
image, body (paste text, drop images, add code blocks), and **Publish**.

### A ready-made first post (Angular Signals)

A starter post is generated at `scripts/seed/angular-signals-guide.ndjson`.
Import it into Sanity once (from inside `studio/`, after `npx sanity login`):

```bash
cd studio
npx sanity dataset import ../scripts/seed/angular-signals-guide.ndjson production
```

It then appears in the Studio (already published) and on the site after a
content refresh (section C). Edit/expand it there like any other post.

To get an admin you can reach from anywhere (hosted free by Sanity):

```bash
cd studio
npm run deploy       # gives you https://<name>.sanity.studio
```

## B. The read token (required)

This project requires a **read token** to fetch content via the API (even with
the dataset set to public — public visibility only covers image assets here).
So the build needs a read-only token:

1. Sanity dashboard → **API → Tokens → Add API token**
2. Name it `blog-read`, permission **Viewer** (read-only), create, copy it.
3. Set it as an env var named `SANITY_API_READ_TOKEN`:
   - **Locally** (PowerShell): `$env:SANITY_API_READ_TOKEN = "your-token"`
   - **Vercel**: Project → **Settings → Environment Variables** → add
     `SANITY_API_READ_TOKEN` = your token (all environments).

> Use a dedicated **Viewer** token — not your personal CLI login token.
> No CORS setup is needed: the build fetches server-side; visitors never call Sanity.

**Safety net:** if the token is missing, the build **keeps the last generated
posts** instead of wiping them (see `scripts/fetch-blog.mjs`). And
`blog-data.generated.ts` is committed, so the site always has content even
before the token is set — the token just enables *fresh* fetches.

## C. See your posts locally

`ng serve` does **not** auto-fetch — it just reads the committed
`blog-data.generated.ts`. To pull the latest content first:

```powershell
$env:SANITY_API_READ_TOKEN = "your-token"   # this terminal only
npm run blog:fetch    # regenerates src/app/pages/blog/blog-data.generated.ts
npm start             # http://localhost:4200/blog
```

(A full `npm run build` runs the fetch automatically via the `prebuild` step.)

## D. Auto-publish to production (the magic button)

So that clicking **Publish** in Sanity updates the live site automatically:

1. **Vercel** → your project → **Settings → Git → Deploy Hooks** →
   create one (e.g. name `sanity-publish`, branch `main`). Copy the URL.
2. **Sanity** → **API → Webhooks → Create webhook**:
   - URL: *(paste the Vercel deploy hook URL)*
   - Dataset: `production`, Trigger on: **Create / Update / Delete**
   - Filter (optional): `_type == "post"`

Now: **Publish in Sanity → Vercel rebuilds (~1–2 min) → post is live with full SEO.**

---

## Adding fields later

Edit [`studio/schemaTypes/post.ts`](studio/schemaTypes/post.ts) (the form) and,
if the site should use the new field, read it in
[`scripts/fetch-blog.mjs`](scripts/fetch-blog.mjs) (the GROQ query + mapping).
Everything else (routes, list cards, prev/next, sitemap) updates automatically.

## Files at a glance

| File | What it does |
|---|---|
| `studio/` | The Sanity admin panel (schema + config) |
| `scripts/fetch-blog.mjs` | Build step: Sanity → generated data file |
| `src/app/pages/blog/blog-data.generated.ts` | Auto-generated post data (don't edit) |
| `src/app/pages/blog/blog-data.ts` | Helpers (lookup, prev/next) |
| `src/app/pages/blog/blog.routes.ts` | `/blog` list + one route per post |
| `src/app/pages/blog/blog-list.component.*` | The `/blog` index page |
| `src/app/pages/blog/blog-post.component.*` | A single post page |
