import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class EditProfileGuard {
  constructor(private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // only allow edit profile if its users own profile
    return this.tokenService.user().username === route.paramMap.get('username');
  }
}

export const editProfileGuard: CanActivateFn = (route, state) => {
  return inject(EditProfileGuard).canActivate(route, state);
};
