import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class CanAccessAuthGuard {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.tokenService.token()) {
      return this.router.parseUrl('/feed');
    } else {
      return true;
    }
  }
}

export const canAccessAuthGuard: CanActivateFn = (route, state) => {
  return inject(CanAccessAuthGuard).canActivate(route, state);
};
