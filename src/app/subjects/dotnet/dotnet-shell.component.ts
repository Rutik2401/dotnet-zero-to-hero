import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, PhaseLink } from './shared/sidebar/sidebar.component';
import { PhaseTocComponent } from './shared/phase-toc/phase-toc.component';
import { PhaseTocService } from './shared/phase-toc/phase-toc.service';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';

const SIDEBAR_KEY = 'roadmap-sidebar-open';

@Component({
  selector: 'app-dotnet-shell',
  imports: [RouterOutlet, SidebarComponent, PhaseTocComponent, LandingNavComponent],
  templateUrl: './dotnet-shell.component.html'
})
export class DotnetShellComponent {
  private readonly toc = inject(PhaseTocService);

  sidebarOpen = signal(this.readSidebarState());

  hasToc = computed(() => this.toc.topics().length > 0);

  phases: PhaseLink[] = [
    { path: '/dotnet',         label: 'Home',                                ready: true, exact: true },
    { path: '/dotnet/phase-0', label: 'Phase 0 — Programming + OOP',         ready: true  },
    { path: '/dotnet/phase-1', label: 'Phase 1 — C# Deep Dive',              ready: true  },
    { path: '/dotnet/phase-2', label: 'Phase 2 — ASP.NET Core',              ready: true  },
    { path: '/dotnet/phase-3', label: 'Phase 3 — SQL + EF Core',             ready: true  },
    { path: '/dotnet/phase-4', label: 'Phase 4 — Advanced + System Design',  ready: true  },
    { path: '/dotnet/phase-5', label: 'Phase 5 — Modern Angular',            ready: true  },
    { path: '/dotnet/phase-6', label: 'Phase 6 — DevOps + Deployment',       ready: true  },
    { path: '/dotnet/phase-7', label: 'Phase 7 — Projects',                  ready: false },
    { path: '/dotnet/phase-8', label: 'Phase 8 — Interview Preparation',     ready: false }
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
