import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TPaginationResponse } from '../../shared/types/paginated-response.type';
import { TUser } from '../../shared/types/user.type';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private apiService: ApiService) {}

  follows(): Observable<TPaginationResponse<TUser>> {
    return this.apiService.get(`/suggestions/follows`);
  }
}
