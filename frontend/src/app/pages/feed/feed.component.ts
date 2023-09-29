import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { SuggestionService } from 'src/app/modules/core/services/suggestion.service';
import { TweetLike } from 'src/app/modules/shared/enums/tweet-like.enum';
import { User } from 'src/app/modules/shared/models/user.model';
import { TUser } from 'src/app/modules/shared/types/user.type';
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
  suggestedFollows: Array<User> = [];
  filters: TPaginationOptions = {
    limit: 10,
  };

  constructor(
    private tweetService: TweetService,
    private suggestionService: SuggestionService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.populateFeed();
    this.populateSuggestedFollows();
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

  populateFeed() {
    this.tweetService.feed(this.filters).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.offset = response.nextOffset ?? this.filters.offset;
        this.tweets = this.tweets.concat(
          response.records.map((tweet: TTweet) => new Tweet(tweet))
        );
      },
      error: (e) => {
        this.alertService.error(e);
      },
    });
  }

  populateSuggestedFollows() {
    this.suggestionService.follows().subscribe({
      next: (response: TPaginationResponse<TUser>) => {
        this.suggestedFollows = response.records.map(
          (user: TUser) => new User(user)
        );
      },
      error: (e) => {
        this.alertService.error(e);
      },
    });
  }
}
