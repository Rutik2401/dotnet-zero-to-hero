import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, PhaseLink } from '../dotnet/shared/sidebar/sidebar.component';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { PageTocComponent } from '../../shared/page-toc/page-toc.component';
import { PageTocService } from '../../shared/page-toc/page-toc.service';
import { GIT_TOPICS_IN_ORDER } from './git-topics';

const SIDEBAR_KEY = 'git-sidebar-open';

@Component({
  selector: 'app-git-shell',
  imports: [RouterOutlet, SidebarComponent, LandingNavComponent, PageTocComponent],
  template: `
    <div class="app-shell"
         [class.sidebar-collapsed]="!sidebarOpen()"
         [class.has-toc]="hasToc()">
      <header class="app-header">
        <button class="btn-burger"
                type="button"
                (click)="toggleSidebar()"
                [attr.aria-expanded]="sidebarOpen()"
                aria-controls="app-sidebar"
                [attr.aria-label]="sidebarOpen() ? 'Collapse lesson list' : 'Open lesson list'"
                [title]="sidebarOpen() ? 'Collapse lesson list' : 'Open lesson list'">
          @if (sidebarOpen()) { <span aria-hidden="true">✕</span> }
          @else                { <span aria-hidden="true">☰</span> }
        </button>
        <app-landing-nav class="app-header-nav" />
      </header>

      <app-sidebar id="app-sidebar" [phases]="phases" [open]="sidebarOpen()" />

      <div class="sidebar-backdrop" (click)="toggleSidebar()" aria-hidden="true"></div>

      <main class="app-main" id="main-content" tabindex="-1">
        <router-outlet />
      </main>

      @if (hasToc()) {
        <app-page-toc />
      }
    </div>
  `
})
export class GitShellComponent {
  private readonly toc = inject(PageTocService);

  sidebarOpen = signal(this.readSidebarState());

  hasToc = computed(() => this.toc.topics().length > 0);

  /* Sidebar list — derived from the topic registry. New lessons appear
     automatically; not-ready ones show a "soon" pill. */
  phases: PhaseLink[] = [
    { path: '/git', label: 'Course Home', ready: true, exact: true },
    ...GIT_TOPICS_IN_ORDER.map(t => ({
      path: `/git/${t.slug}`,
      label: t.navLabel,
      ready: t.ready
    }))
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
