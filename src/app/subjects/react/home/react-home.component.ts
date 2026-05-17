import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-react-home',
  imports: [RouterLink],
  template: `
    <section class="subject-placeholder">
      <a routerLink="/" class="hub-back">← Learn Hub</a>
      <span class="pill">Coming soon</span>
      <h1>Modern <span class="brand-text">React</span> Roadmap</h1>
      <p class="lead">
        Hooks deep-dive, Context, Redux Toolkit, React Query, Next.js App Router,
        Server Components, suspense and streaming — same phase-by-phase structure
        as the .NET roadmap.
      </p>
      <p>This subject is being prepared. In the meantime, check out the .NET roadmap.</p>
      <a class="btn btn-primary" routerLink="/dotnet">Open .NET Roadmap →</a>
    </section>
  `,
  styles: [`
    .subject-placeholder {
      max-width: 760px;
      margin: 4rem auto;
      padding: 2rem;
      text-align: center;
    }
    .subject-placeholder h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 1rem 0; }
    .subject-placeholder .lead { color: var(--text-soft); margin: 1rem 0 2rem; }
    .subject-placeholder .hub-back {
      display: inline-block;
      margin-bottom: 1.5rem;
      color: var(--text-muted);
      text-decoration: none;
    }
    .subject-placeholder .hub-back:hover { color: var(--text); }
  `]
})
export class ReactHomeComponent {}
