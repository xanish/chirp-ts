import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

export const userAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // this is just a dummy call ideally need to call the server to
  // verify the authenticity of the token
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const authenticated = !!tokenService.token();

  if (!authenticated) {
    return router.parseUrl('auth/login');
  }

  return authenticated;
};
