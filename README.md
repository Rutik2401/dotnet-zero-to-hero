# .NET Roadmap — Zero to Hero

An Angular 19 site that walks a fresher through becoming a job-ready .NET developer
in 6–7 months. Each phase is a topic-by-topic explainer with code examples,
output, interview Q&A, rapid-fire follow-ups, common mistakes, and pro tips —
written in simple Indian English with relatable examples (Swiggy, Flipkart,
Amazon, banking, ATM).

🌐 **Live site:** [github.com/Rutik2401/dotnet-zero-to-hero](https://github.com/Rutik2401/dotnet-zero-to-hero)

## Phases

| Phase | Topic | Status |
| ----- | ----- | ------ |
| 0 | Programming + OOP fundamentals | ✅ Ready |
| 1 | C# Deep Dive (LINQ, async, collections) | ✅ Ready |
| 2 | ASP.NET Core (Web API, DI, middleware) | ✅ Ready |
| 3 | SQL + EF Core | ✅ Ready |
| 4 | Advanced + System Design | ✅ Ready |
| 5 | Modern Angular (signals, control flow) | ✅ Ready |
| 6 | DevOps + Deployment (Git, Docker, Azure) | ✅ Ready |
| 7 | Portfolio Projects | 🚧 Soon |
| 8 | Interview Preparation | 🚧 Soon |

## Local development

```bash
npm install
npm start          # serves on http://localhost:4200
```

## Build for production

```bash
npm run build
```

Build output goes to `dist/dotnet-roadmap`.

## Tech stack

- Angular 19 (standalone components, new control flow, signals)
- highlight.js for code syntax highlighting (C# / TypeScript / bash / YAML / Dockerfile)
- Lazy-loaded routes — every phase is its own chunk
- No CSS framework — hand-rolled design tokens in `src/styles.css`

## Project structure

```
src/app/
  pages/
    home/                    # landing page with phase grid
    phase-0/ ... phase-6/    # one folder per phase
      phase-N.component.ts
      phase-N.component.html
      phase-N.data.ts        # all topics for that phase
      phase-N.types.ts
    coming-soon/             # placeholder for unfinished phases
  app.component.ts           # shell with sidebar + header
  app.routes.ts              # lazy-loaded route table
  app.config.ts              # provideRouter, etc.
```

## Authoring rules

See [Rules.md](Rules.md) — every topic page must follow the 9-section structure
(What is this → Why → Real-life Example → How it works → Code → Output →
Interview Q&A → Follow-ups → Common Mistakes → Pro Tip).
