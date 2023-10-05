import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ValidationError } from '../../shared/errors/validation.error';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  delete(path: string, body: any = {}): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { body })
      .pipe(catchError(this.handleError));
  }

  get(path: string, params: any = {}): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    const defaultMessage =
      'Oops! something broke, please retry or try again later';

    if (error instanceof ProgressEvent || error instanceof ErrorEvent) {
      return throwError(() => new Error(defaultMessage));
    }

    if (error.status === 422) {
      return throwError(() => new ValidationError(error.error));
    }

    return throwError(() => new Error(error.error.message ?? defaultMessage));
  }
}
