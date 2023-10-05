import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class InjectTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status === 401) {
          this.tokenService.clear();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => e);
      })
    );
  }
}
