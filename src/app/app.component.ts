import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchModalComponent } from './shared/landing-nav/search-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchModalComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Learn Hub';
}
