import {Component, inject} from '@angular/core';
import {RedirectService} from '../../../core/services/redirect-service';

@Component({
  selector: 'app-not-found-component',
  imports: [],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.css',
})
export class NotFoundComponent {
  private redirectService = inject(RedirectService);

  goHome() {
    this.redirectService.redirectToDashboard();
  }
}
