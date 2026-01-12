import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    alert("Veuillez d'abord vous connecter.")
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url}});
  }

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRole = authService.userRole();

  if (expectedRoles && !expectedRoles.includes(userRole || '')) {
    alert("Vous n'avez pas la permission d'accéder à cette page");
  }

    return true;
};
