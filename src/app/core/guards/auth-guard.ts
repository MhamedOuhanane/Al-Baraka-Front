import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../auth/auth-service';
import {RedirectService} from '../services/redirect-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const redirectService = inject(RedirectService);

  if (!authService.isAuthenticated()) {
    alert("Veuillez d'abord vous connecter.")
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url}});
  }

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRole = authService.userRole();

  if (expectedRoles && !expectedRoles.includes(userRole || '')) {
    redirectService.redirectToForbidden();
  }

    return true;
};
