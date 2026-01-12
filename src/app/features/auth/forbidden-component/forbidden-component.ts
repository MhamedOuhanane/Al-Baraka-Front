import {Component, inject} from '@angular/core';
import {RedirectService} from '../../../core/services/redirect-service';

@Component({
  selector: 'app-forbidden-component',
  imports: [],
  templateUrl: './forbidden-component.html',
  styleUrl: './forbidden-component.css',
})
export class ForbiddenComponent {
  private redirectService = inject(RedirectService);

  goHome() {
    this.redirectService.redirectToDashboard();
  }
}
