import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private apiService: ApiService) {}

  like() {}

  unlike() {}
}
