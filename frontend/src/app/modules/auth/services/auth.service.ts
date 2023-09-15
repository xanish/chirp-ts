import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { TTokenResponse } from '../../shared/types/token-response.type';
import { TUser } from '../../shared/types/user.type';
import { ForgotPasswordOptions } from '../shared/types/forgot-password-options.type';
import { LoginOptions } from '../shared/types/login-options.type';
import { RegisterOptions } from '../shared/types/register-options.type';
import { ResetPasswordOptions } from '../shared/types/reset-password-options.type';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  forgotPassword(data: ForgotPasswordOptions): Observable<any> {
    return this.apiService.post('/auth/forgot-password', data);
  }

  login(data: LoginOptions): Observable<TTokenResponse> {
    return this.apiService.post('/auth/login', data);
  }

  register(data: RegisterOptions): Observable<TUser> {
    return this.apiService.post('/auth/register', data);
  }

  resetPassword(data: ResetPasswordOptions): Observable<TUser> {
    return this.apiService.post('/auth/reset-password', data);
  }

  verify(token: string): Observable<any> {
    return this.apiService.post(`/auth/verify/${token}`);
  }
}
