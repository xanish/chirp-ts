import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { TUser } from '../../shared/types/user.type';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.userService
      .findOne(route.paramMap.get('username') ?? '')
      .pipe(switchMap((user: TUser) => of(new User(user))));
  }
}

export const userResolver: ResolveFn<User> = (route, state) => {
  return inject(UserResolver).resolve(route, state);
};
