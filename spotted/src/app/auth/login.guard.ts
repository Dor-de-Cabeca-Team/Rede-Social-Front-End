import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = loginService.getToken();
  if (token && loginService.jwtDecode()) {
    if (
      loginService.hasPermission('USUARIO') ||
      (loginService.hasPermission('ADMIN') && state.url === '/principal')
    ) {
      return true;
    }
  }
  router.navigate(['/login']);
  return false;
};
