import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ForgotPasswordFormData } from '../shared/models/forgot-password-form-data.model';
import { LoginFormData } from '../shared/models/login-form-data.model';
import { RegisterFormData } from '../shared/models/register-form-data.model';
import { ResetPasswordFormData } from '../shared/models/reset-password-form-data.model copy';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  forgotPassword(data: ForgotPasswordFormData): Observable<Object> {
    return this.apiService.post('/auth/forgot-password', data);
  }

  login(data: LoginFormData): Observable<Object> {
    return this.apiService.post('/auth/login', data);
  }

  register(data: RegisterFormData): Observable<Object> {
    return this.apiService.post('/auth/register', data);
  }

  resetPassword(data: ResetPasswordFormData): Observable<Object> {
    return this.apiService.post('/auth/reset-password', data);
  }

  verify(token: string) {
    return this.apiService.post(`/auth/verify/${token}`);
  }
}
