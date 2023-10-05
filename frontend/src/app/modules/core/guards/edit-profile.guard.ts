import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

export const editProfileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);
  // only allow edit profile if its users own profile
  return tokenService.user().username === route.paramMap.get('username');
};
