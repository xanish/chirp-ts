import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TweetLike } from 'src/app/modules/shared/enums/tweet-like.enum';
import { TweetService } from '../../modules/core/services/tweet.service';
import { Tweet } from '../../modules/shared/models/tweet.model';
import { TPaginationResponse } from '../../modules/shared/types/paginated-response.type';
import { TPaginationOptions } from '../../modules/shared/types/pagination-options.type';
import { TTweet } from '../../modules/shared/types/tweet.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  tweets: Array<Tweet> = [];
  filters: TPaginationOptions = {
    limit: 10,
  };

  constructor(
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.tweetService.feed(this.filters).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.offset = response.nextOffset ?? undefined;
        this.tweets = response.records.map((tweet: TTweet) => new Tweet(tweet));
      },
      error: (e) => {
        this.alertService.error(e);
      },
    });
  }

  tweetLiked(event: any) {
    this.tweets.map((tweet: Tweet) => {
      if (tweet.id === event.id) {
        tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
        tweet.liked = event.action === TweetLike.LIKED;
      }

      return tweet;
    });
  }
}
