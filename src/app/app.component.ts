import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchModalComponent } from './shared/landing-nav/search-modal.component';
import { SeoService } from './shared/seo/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchModalComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Learn Hub';

  constructor() {
    // Start managing canonical + Open Graph/Twitter tags on every navigation.
    inject(SeoService).init();
  }
}
