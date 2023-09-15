import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable()
export class TweetService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  feed() {}

  personal(params: { offset?: null | string; limit: number }) {
    if (params.offset == null || params.offset === '') {
      delete params.offset;
    }

    return this.apiService.get(
      `/users/${this.tokenService.id()}/tweets`,
      params
    );
  }

  create() {}

  reply() {}

  retweet() {}
}
