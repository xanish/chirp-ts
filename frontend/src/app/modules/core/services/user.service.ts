import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TPaginationResponse } from '../../shared/types/paginated-response.type';
import { TPaginationOptions } from '../../shared/types/pagination-options.type';
import { TTweet } from '../../shared/types/tweet.type';
import { TUser } from '../../shared/types/user.type';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  findOne(id: string): Observable<TUser> {
    return this.apiService.get(`/users/${id}`);
  }

  findMany(
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TUser>> {
    return this.apiService.get('/users', options);
  }

  follow(id: string): Observable<any> {
    return this.apiService.put(`/users/${id}/followers`, {
      userId: this.tokenService.id(),
    });
  }

  unfollow(id: string): Observable<any> {
    return this.apiService.delete(`/users/${id}/followers`, {
      userId: this.tokenService.id(),
    });
  }

  followers(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TUser>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/followers`, options);
  }

  following(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TUser>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/following`, options);
  }

  tweets(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/tweets`, options);
  }

  replies(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/replies`, options);
  }

  medias(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/medias`, options);
  }

  likes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    if (options.offset == null) {
      delete options.offset;
    }

    return this.apiService.get(`/users/${id}/likes`, options);
  }
}
