import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { FollowAction } from 'src/app/modules/shared/enums/follow-action.enum';
import { FollowsTabType } from 'src/app/modules/shared/enums/follows-tab-type.enum';
import { User } from 'src/app/modules/shared/models/user.model';
import { TPaginationResponse } from 'src/app/modules/shared/types/paginated-response.type';
import { TPaginationOptions } from 'src/app/modules/shared/types/pagination-options.type';
import { TUser } from 'src/app/modules/shared/types/user.type';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css'],
})
export class FollowsComponent implements OnInit {
  tab: FollowsTabType = FollowsTabType.FOLLOWERS;
  tabType = FollowsTabType;
  filters: TPaginationOptions = { limit: 100 };
  user: User = User.default();
  follows: Array<User> = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    if (this.router.url.endsWith('followers')) {
      this.tab = FollowsTabType.FOLLOWERS;
      this.fetchFollowers();
    } else {
      this.tab = FollowsTabType.FOLLOWING;
      this.fetchFollowing();
    }
  }

  fetchFollowers() {
    this.userService.followers(this.user.id ?? '', this.filters).subscribe({
      next: (response: TPaginationResponse<TUser>) => {
        this.filters.offset = response.nextOffset ?? undefined;
        this.follows = this.follows.concat(
          response.records.map((user: TUser) => new User(user))
        );
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to followers');
      },
    });
  }

  fetchFollowing() {
    this.userService.following(this.user.id ?? '', this.filters).subscribe({
      next: (response: TPaginationResponse<TUser>) => {
        this.filters.offset = response.nextOffset ?? undefined;
        this.follows = this.follows.concat(
          response.records.map((user: TUser) => new User(user))
        );
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to following');
      },
    });
  }

  followUser(userId: string) {
    this.userService.follow(userId).subscribe({
      next: (response: any) => {
        this.follows = this.follows.map((follow: User) => {
          if (follow.id === userId) {
            follow.following = true;
            this.user.count.following += 1;
          }

          return follow;
        });
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to follow user');
      },
    });
  }

  unfollowUser(userId: string) {
    this.userService.unfollow(userId).subscribe({
      next: (response: any) => {
        if (this.tab === FollowsTabType.FOLLOWERS) {
          this.follows = this.follows.map((follow: User) => {
            if (follow.id === userId) {
              follow.following = false;
              this.user.count.following -= 1;
            }

            return follow;
          });
        } else {
          this.user.count.following -= 1;
          this.follows = this.follows.filter(
            (follow: User) => follow.id !== userId
          );
        }
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to unfollow user');
      },
    });
  }

  nextPage() {
    switch (this.tab) {
      case FollowsTabType.FOLLOWERS:
        this.fetchFollowers();
        break;
      case FollowsTabType.FOLLOWING:
        this.fetchFollowing();
        break;
    }
  }

  followProfileUser(event: any) {
    this.user.count.followers += event.action === FollowAction.FOLLOW ? 1 : -1;
    this.user.following = event.action === FollowAction.FOLLOW;
  }

  tabChange(tab: FollowsTabType) {
    this.tab = tab;
  }
}
