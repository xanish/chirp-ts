import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { TUser } from '../../shared/types/user.type';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);

  return userService
    .findOne(route.paramMap.get('username') ?? '')
    .pipe(switchMap((user: TUser) => of(new User(user))));
};
