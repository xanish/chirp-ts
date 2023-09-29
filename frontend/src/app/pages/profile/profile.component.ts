import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { FollowAction } from 'src/app/modules/shared/enums/follow-action.enum';
import { TabType } from 'src/app/modules/shared/enums/tab-type.enum';
import { TweetLike } from 'src/app/modules/shared/enums/tweet-like.enum';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { TPaginationResponse } from 'src/app/modules/shared/types/paginated-response.type';
import { TTweet } from 'src/app/modules/shared/types/tweet.type';
import { User } from '../../modules/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tabType = TabType;
  tab: TabType = TabType.TWEETS;
  user: User = User.default();
  tweets: Array<Tweet> = [];
  replies: Array<Tweet> = [];
  medias: Array<Tweet> = [];
  likes: Array<Tweet> = [];
  filters: any = {
    tweets: { limit: 10 },
    replies: { limit: 10 },
    medias: { limit: 10 },
    likes: { limit: 10 },
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.user = this.route.snapshot.data['user'];
      delete this.filters.tweets.offset;
      delete this.filters.replies.offset;
      delete this.filters.medias.offset;
      delete this.filters.likes.offset;
      // todo: call api for isFollowing
      this.fetchTweets();
      this.fetchReplies();
      this.fetchMedias();
      this.fetchLikes();
    });
  }

  fetchTweets() {
    this.userService.tweets(this.user.id ?? '', this.filters.tweets).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.tweets.offset =
          response.nextOffset ?? this.filters.tweets.offset;
        this.tweets = this.tweets.concat(
          response.records.map((tweet: TTweet) => new Tweet(tweet))
        );
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to fetch tweets');
      },
    });
  }

  fetchReplies() {
    this.userService
      .replies(this.user.id ?? '', this.filters.replies)
      .subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.filters.replies.offset =
            response.nextOffset ?? this.filters.replies.offset;
          this.replies = this.replies.concat(
            response.records.map((tweet: TTweet) => new Tweet(tweet))
          );
        },
        error: (e) => {
          this.alertService.error(e, 'Failed to fetch replies');
        },
      });
  }

  fetchMedias() {
    this.userService.medias(this.user.id ?? '', this.filters.medias).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.medias.offset =
          response.nextOffset ?? this.filters.medias.offset;
        this.medias = this.medias.concat(
          response.records.map((tweet: TTweet) => new Tweet(tweet))
        );
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to fetch medias');
      },
    });
  }

  fetchLikes() {
    this.userService.likes(this.user.id ?? '', this.filters.likes).subscribe({
      next: (response: TPaginationResponse<TTweet>) => {
        this.filters.likes.offset =
          response.nextOffset ?? this.filters.likes.offset;
        this.likes = this.likes.concat(
          response.records.map((tweet: TTweet) => new Tweet(tweet))
        );
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to fetch likes');
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

  replyLiked(event: any) {
    this.replies.map((tweet: Tweet) => {
      if (tweet.id === event.id) {
        tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
        tweet.liked = event.action === TweetLike.LIKED;
      }

      return tweet;
    });
  }

  mediaLiked(event: any) {
    this.medias.map((tweet: Tweet) => {
      if (tweet.id === event.id) {
        tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
        tweet.liked = event.action === TweetLike.LIKED;
      }

      return tweet;
    });
  }

  likeLiked(event: any) {
    this.likes.map((tweet: Tweet) => {
      if (tweet.id === event.id) {
        tweet.count.likes += event.action === TweetLike.LIKED ? 1 : -1;
        tweet.liked = event.action === TweetLike.LIKED;
      }

      return tweet;
    });
  }

  nextPage() {
    switch (this.tab) {
      case TabType.TWEETS:
        this.fetchTweets();
        break;
      case TabType.REPLIES:
        this.fetchReplies();
        break;
      case TabType.MEDIA:
        this.fetchMedias();
        break;
      case TabType.LIKES:
        this.fetchLikes();
        break;
    }
  }

  objectLiked(event: any, type: string) {
    switch (type) {
      case 'TWEET':
        this.tweetLiked(event);
        break;
      case 'REPLY':
        this.replyLiked(event);
        break;
      case 'MEDIA':
        this.mediaLiked(event);
        break;
      case 'LIKE':
        this.likeLiked(event);
        break;
    }
  }

  handleFollowAction(event: any) {
    this.user.count.followers += event.action === FollowAction.FOLLOW ? 1 : -1;
    this.user.following = event.action === FollowAction.FOLLOW;
  }

  tabChange(tab: TabType) {
    this.tab = tab;
  }
}
