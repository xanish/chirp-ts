import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class UserAuthenticatedGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this is just a dummy call ideally need to call the server to
    // verify the authenticity of the token
    const authenticated = !!this.tokenService.token();

    if (!authenticated) {
      this.router.navigate(['auth/login']);
    }

    return authenticated;
  }
}

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  return inject(UserAuthenticatedGuard).canActivate(route, state);
};
