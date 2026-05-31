import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LandingNavComponent } from '../../shared/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../shared/landing-footer/landing-footer.component';
import { POSTS } from './blog-data';

/** The /blog index — hero + a card grid of all published posts (from Sanity). */
@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, DatePipe, LandingNavComponent, LandingFooterComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  readonly posts = POSTS;
}
