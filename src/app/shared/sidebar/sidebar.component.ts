import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface PhaseLink {
  path: string;
  label: string;
  ready: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <p class="sidebar-title">Roadmap</p>
    <ul class="sidebar-list">
      @for (p of phases(); track p.path) {
        <li>
          <a [routerLink]="p.path"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: p.path === '/' }"
             [tabindex]="open() ? 0 : -1">
            {{ p.label }}
            @if (!p.ready) { <span class="pill pill-soon">soon</span> }
          </a>
        </li>
      }
    </ul>
  `,
  host: {
    'class': 'app-sidebar',
    '[attr.aria-hidden]': '!open()'
  }
})
export class SidebarComponent {
  phases = input.required<PhaseLink[]>();
  open   = input.required<boolean>();
}
