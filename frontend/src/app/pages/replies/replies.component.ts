import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { TweetLike } from 'src/app/modules/shared/enums/tweet-like.enum';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { TPaginationResponse } from 'src/app/modules/shared/types/paginated-response.type';
import { TPaginationOptions } from 'src/app/modules/shared/types/pagination-options.type';
import { TTweet } from 'src/app/modules/shared/types/tweet.type';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css'],
})
export class RepliesComponent implements OnInit {
  filters: TPaginationOptions = {
    limit: 10,
  };
  tweet: Tweet = Tweet.default();
  replies: Array<Tweet> = [];

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      delete this.filters.offset;
      this.tweet = this.route.snapshot.data['tweet'];
      this.tweetService.replies(this.tweet.id, this.filters).subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.replies = response.records.map(
            (tweet: TTweet) => new Tweet(tweet)
          );
          this.filters.offset = response.nextOffset ?? undefined;
        },
        error: (e) => {
          this.alertService.error(e);
        },
      });
    });
  }

  tweetLiked(event: any) {
    if (event.id === this.tweet.id) {
      this.tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
      this.tweet.liked = event.action === TweetLike.LIKED;
    } else {
      this.replies.map((tweet: Tweet) => {
        if (tweet.id === event.id) {
          tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
          tweet.liked = event.action === TweetLike.LIKED;
        }

        return tweet;
      });
    }
  }
}
