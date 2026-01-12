import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {
    path: 'register',
    loadComponent: () => import("./features/auth/register-component/register-component")
      .then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import("./features/auth/login-component/login-component")
      .then(m => m.LoginComponent)
  },
  {
    path: '403',
    loadComponent: () => import("./features/auth/forbidden-component/forbidden-component")
      .then(m => m.ForbiddenComponent)
  }
];
