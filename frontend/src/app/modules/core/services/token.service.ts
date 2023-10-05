import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  token(): string | null {
    return localStorage.getItem('token') ?? null;
  }

  id(): string {
    const user = this.user();

    return user.id ?? '';
  }

  clear() {
    localStorage.clear();
  }

  user(): User {
    const token = this.token();

    if (!token) {
      return User.default();
    }

    const payload: any = JSON.parse(atob(token.split('.')[1]));

    return new User({
      id: payload.id,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
  }
}
