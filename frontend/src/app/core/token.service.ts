import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  token(): string | null {
    return localStorage.getItem('token') ?? null;
  }

  id(): string | null {
    const user = this.user();

    return user.id;
  }

  clear() {
    localStorage.clear();
  }

  user(): User {
    const token = this.token();

    if (!token) {
      return new User(null, null, null, null);
    }

    const payload: any = JSON.parse(atob(token.split('.')[1]));

    return new User(
      payload.id,
      payload.username,
      payload.firstName,
      payload.lastName
    );
  }
}
