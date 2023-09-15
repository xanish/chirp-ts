import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class UserAuthenticatedGuard {
  constructor(private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this is just a dummy call ideally need to call the server to
    // verify the authenticity of the token
    return !!this.tokenService.token();
  }
}

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  return inject(UserAuthenticatedGuard).canActivate(route, state);
};
