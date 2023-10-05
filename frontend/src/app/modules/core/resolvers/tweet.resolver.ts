import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Tweet } from '../../shared/models/tweet.model';
import { TTweet } from '../../shared/types/tweet.type';
import { TweetService } from '../services/tweet.service';

export const tweetResolver: ResolveFn<Tweet> = (route, state) => {
  const tweetService = inject(TweetService);

  return tweetService
    .findOne(route.paramMap.get('tweetId') ?? '')
    .pipe(switchMap((tweet: TTweet) => of(new Tweet(tweet))));
};
