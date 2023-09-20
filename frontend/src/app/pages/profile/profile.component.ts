import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { TabType } from 'src/app/modules/shared/enums/tab-type.enum';
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
  isFollowing: boolean = false;
  loggedInUserId: string = '';
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
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.tokenService.id() ?? '';
    this.route.params.subscribe((params) => {
      this.user = this.route.snapshot.data['user'];
      delete this.filters.tweets.offset;
      delete this.filters.replies.offset;
      delete this.filters.medias.offset;
      delete this.filters.likes.offset;
      // todo: call api for isFollowing
      this.userService
        .tweets(this.user.id ?? '', this.filters.tweets)
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
        .replies(this.user.id ?? '', this.filters.replies)
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
        .medias(this.user.id ?? '', this.filters.medias)
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
      this.userService.likes(this.user.id ?? '', this.filters.likes).subscribe({
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
    });
  }

  tabChange(tab: TabType) {
    this.tab = tab;
  }
}
