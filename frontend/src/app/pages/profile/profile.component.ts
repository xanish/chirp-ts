import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { TabType } from 'src/app/modules/shared/enums/tab-type.enum';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { TPaginationResponse } from 'src/app/modules/shared/types/paginated-response.type';
import { TTweet } from 'src/app/modules/shared/types/tweet.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tabType = TabType;
  tab: TabType = TabType.TWEETS;
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
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userService
      .tweets(this.tokenService.id(), this.filters.tweets)
      .subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.filters.tweets.offset = response.nextOffset;
          this.tweets = response.records.map(
            (tweet: TTweet) => new Tweet(tweet)
          );
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    this.userService
      .replies(this.tokenService.id(), this.filters.replies)
      .subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.filters.replies.offset = response.nextOffset;
          this.replies = response.records.map(
            (tweet: TTweet) => new Tweet(tweet)
          );
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    this.userService
      .medias(this.tokenService.id(), this.filters.medias)
      .subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.filters.medias.offset = response.nextOffset;
          this.medias = response.records.map(
            (tweet: TTweet) => new Tweet(tweet)
          );
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    this.userService
      .likes(this.tokenService.id(), this.filters.likes)
      .subscribe({
        next: (response: TPaginationResponse<TTweet>) => {
          this.filters.likes.offset = response.nextOffset;
          this.likes = response.records.map(
            (tweet: TTweet) => new Tweet(tweet)
          );
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  tabChange(tab: TabType) {
    this.tab = tab;
  }
}
