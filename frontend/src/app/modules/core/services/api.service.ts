import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ValidationError } from '../../shared/errors/validation.error';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  delete(path: string, params: any = {}): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { params });
  }

  get(path: string, params: any = {}): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params });
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body);
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
