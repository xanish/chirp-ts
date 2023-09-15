import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private apiService: ApiService) {}

  follow() {}

  unfollow() {}
}
