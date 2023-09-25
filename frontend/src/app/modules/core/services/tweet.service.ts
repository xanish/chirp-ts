import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TweetType } from '../../shared/enums/tweet-type.enum';
import { Tweet } from '../../shared/models/tweet.model';
import { TPaginationResponse } from '../../shared/types/paginated-response.type';
import { TPaginationOptions } from '../../shared/types/pagination-options.type';
import { TTweet } from '../../shared/types/tweet.type';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable()
export class TweetService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  findOne(id: string): Observable<TTweet> {
    return this.apiService.get(`/tweets/${id}`);
  }

  create(tweet: Tweet): Observable<TTweet> {
    return this.apiService.post('/tweets', tweet);
  }

  retweet(id: string): Observable<TTweet> {
    return this.apiService.post('/tweets', {
      userId: this.tokenService.id(),
      type: TweetType.RETWEET,
      relatedId: id,
    });
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`/tweets/${id}`);
  }

  feed(options: TPaginationOptions): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(`/tweets`, options);
  }

  likes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(`/tweets/${id}/likes`, options);
  }

  like(id: string): Observable<any> {
    return this.apiService.put(`/tweets/${id}/likes`, {
      userId: this.tokenService.id(),
    });
  }

  unlike(id: string): Observable<any> {
    return this.apiService.delete(`/tweets/${id}/likes`, {
      userId: this.tokenService.id(),
    });
  }

  quotes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(`/tweets/${id}/quotes`, options);
  }

  replies(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(`/tweets/${id}/replies`, options);
  }
}
