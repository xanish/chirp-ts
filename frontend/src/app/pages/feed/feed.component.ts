import { Component, OnInit } from '@angular/core';
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

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.tweetService.feed(this.filters).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.offset = response.nextOffset ?? undefined;
        this.tweets = response.records.map((tweet: TTweet) => new Tweet(tweet));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
