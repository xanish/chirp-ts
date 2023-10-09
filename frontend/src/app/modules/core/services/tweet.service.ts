import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TweetType } from '../../shared/enums/tweet-type.enum';
import { CreateTweet } from '../../shared/types/create-tweet.type';
import { TPaginationResponse } from '../../shared/types/paginated-response.type';
import { TPaginationOptions } from '../../shared/types/pagination-options.type';
import { TTweet } from '../../shared/types/tweet.type';
import { UploadAttachmentResponse } from '../../shared/types/upload-attachment-response.type';
import filterObjectKeysUtil from '../../shared/utils/filter-object-keys.util';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  create(tweet: CreateTweet): Observable<TTweet> {
    return this.apiService.post('/tweets', filterObjectKeysUtil(tweet));
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`/tweets/${id}`);
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

  findOne(id: string): Observable<TTweet> {
    return this.apiService.get(`/tweets/${id}`);
  }

  retweet(id: string): Observable<TTweet> {
    return this.create({
      userId: this.tokenService.id(),
      type: TweetType.RETWEET,
      relatedId: id,
    });
  }

  feed(options: TPaginationOptions): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(`/tweets`, filterObjectKeysUtil(options));
  }

  likes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/tweets/${id}/likes`,
      filterObjectKeysUtil(options)
    );
  }

  quotes(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/tweets/${id}/quotes`,
      filterObjectKeysUtil(options)
    );
  }

  replies(
    id: string,
    options: TPaginationOptions
  ): Observable<TPaginationResponse<TTweet>> {
    return this.apiService.get(
      `/tweets/${id}/replies`,
      filterObjectKeysUtil(options)
    );
  }

  upload(attachments: Array<File>): Observable<UploadAttachmentResponse> {
    const data = new FormData();

    for (let attachment of attachments) {
      data.append('attachments', attachment);
    }

    return this.apiService.put(`/attachments`, data);
  }
}
