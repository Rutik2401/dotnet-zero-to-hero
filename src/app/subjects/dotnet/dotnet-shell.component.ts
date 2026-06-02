import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, PhaseLink } from './shared/sidebar/sidebar.component';
import { PageTocComponent } from '../../shared/page-toc/page-toc.component';
import { PageTocService } from '../../shared/page-toc/page-toc.service';
import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { TopicNavComponent } from './shared/topic-nav/topic-nav.component';
import { TOPICS_IN_ORDER } from './dotnet-topics';

const SIDEBAR_KEY = 'roadmap-sidebar-open';

@Component({
  selector: 'app-dotnet-shell',
  imports: [RouterOutlet, SidebarComponent, PageTocComponent, LandingNavComponent, TopicNavComponent],
  templateUrl: './dotnet-shell.component.html'
})
export class DotnetShellComponent {
  private readonly toc = inject(PageTocService);

  sidebarOpen = signal(this.readSidebarState());

  hasToc = computed(() => this.toc.topics().length > 0);

  /* Sidebar list — derived from the topic registry. New tutorials appear
     automatically; labels use the readable topic name, never "Phase N". */
  phases: PhaseLink[] = [
    { path: '/dotnet', label: 'Home', ready: true, exact: true },
    ...TOPICS_IN_ORDER.map(t => ({
      path: `/dotnet/${t.slug}`,
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
