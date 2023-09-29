import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TPaginationResponse } from '../../shared/types/paginated-response.type';
import { TPaginationOptions } from '../../shared/types/pagination-options.type';
import { TTweet } from '../../shared/types/tweet.type';
import { TUser, TUserUpdate } from '../../shared/types/user.type';
import filterObjectKeysUtil from '../../shared/utils/filter-object-keys.util';
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
    return this.apiService.get('/users', filterObjectKeysUtil(options));
  }

  follow(id: string): Observable<any> {
    return this.apiService.put(`/users/${id}/followers`, {
      followerId: this.tokenService.id(),
    });
  }

  unfollow(id: string): Observable<any> {
    return this.apiService.delete(`/users/${id}/followers`, {
      followerId: this.tokenService.id(),
    });
  }

  followers(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TUser>> {
    return this.apiService.get(
      `/users/${id}/followers`,
      filterObjectKeysUtil(options)
    );
  }

  following(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TUser>> {
    return this.apiService.get(
      `/users/${id}/following`,
      filterObjectKeysUtil(options)
    );
  }

  tweets(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/users/${id}/tweets`,
      filterObjectKeysUtil(options)
    );
  }

  replies(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/users/${id}/replies`,
      filterObjectKeysUtil(options)
    );
  }

  medias(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/users/${id}/medias`,
      filterObjectKeysUtil(options)
    );
  }

  likes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/users/${id}/likes`,
      filterObjectKeysUtil(options)
    );
  }

  update(user: TUserUpdate): Observable<TUser> {
    return this.apiService.put(
      `/users/${this.tokenService.id()}`,
      filterObjectKeysUtil(user)
    );
  }
}
