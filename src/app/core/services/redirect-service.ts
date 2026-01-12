import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);
  private authService = inject(AuthService);

  getRoleBasedRoute(): string {
    const role = this.authService.userRole();

    switch (role) {
      case "ROLE_ADMIN": return "/admin";
      case "ROLE_AGENT": return "/agent";
      case "ROLE_CLIENT": return "/client";
      default: return "/login";
    }
  }

  redirectToDashboard() {
    this.router.navigateByUrl(this.getRoleBasedRoute());
  }

  redirectToForbidden() {
    this.router.navigateByUrl("/403");
  }
}
