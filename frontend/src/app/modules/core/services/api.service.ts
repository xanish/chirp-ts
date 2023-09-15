import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  delete(path: string, params: any = {}) {
    return this.http.delete(`${environment.api_url}${path}`, { params });
  }

  get(path: string, params: any = {}) {
    return this.http.get(`${environment.api_url}${path}`, { params });
  }

  patch(path: string, body: Object = {}) {
    return this.http.patch(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: Object = {}) {
    return this.http.post(`${environment.api_url}${path}`, body);
  }

  put(path: string, body: Object = {}) {
    return this.http.put(`${environment.api_url}${path}`, body);
  }
}
