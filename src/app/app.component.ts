import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface PhaseLink {
  path: string;
  label: string;
  ready: boolean;
}

const SIDEBAR_KEY = 'roadmap-sidebar-open';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '.NET Roadmap';

  sidebarOpen = signal(this.readSidebarState());

  phases: PhaseLink[] = [
    { path: '/',        label: 'Home',                            ready: true  },
    { path: '/phase-0', label: 'Phase 0 — Programming + OOP',     ready: true  },
    { path: '/phase-1', label: 'Phase 1 — C# Deep Dive',          ready: true  },
    { path: '/phase-2', label: 'Phase 2 — ASP.NET Core',          ready: true  },
    { path: '/phase-3', label: 'Phase 3 — SQL + EF Core',         ready: true  },
    { path: '/phase-4', label: 'Phase 4 — Advanced + System Design', ready: false },
    { path: '/phase-5', label: 'Phase 5 — Frontend Basics',       ready: false },
    { path: '/phase-6', label: 'Phase 6 — DevOps + Deployment',   ready: false },
    { path: '/phase-7', label: 'Phase 7 — Projects',              ready: false },
    { path: '/phase-8', label: 'Phase 8 — Interview Preparation', ready: false }
  ];

  toggleSidebar(): void {
    const next = !this.sidebarOpen();
    this.sidebarOpen.set(next);
    try { localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0'); } catch { /* SSR / privacy mode */ }
  }

  private readSidebarState(): boolean {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      return stored === null ? true : stored === '1';
    } catch {
      return true;
    }
  }
}
