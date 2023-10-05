import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

export const canAccessAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!!tokenService.token()) {
    return router.parseUrl('/feed');
  } else {
    return true;
  }
};
