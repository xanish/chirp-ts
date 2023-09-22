import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Tweet } from '../../shared/models/tweet.model';
import { TTweet } from '../../shared/types/tweet.type';
import { TweetService } from '../services/tweet.service';

@Injectable()
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Tweet> {
    return this.tweetService
      .findOne(route.paramMap.get('tweetId') ?? '')
      .pipe(switchMap((tweet: TTweet) => of(new Tweet(tweet))));
  }
}

export const tweetResolver: ResolveFn<Tweet> = (route, state) => {
  return inject(TweetResolver).resolve(route, state);
};
