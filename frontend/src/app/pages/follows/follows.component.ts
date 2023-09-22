import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    if (this.router.url.endsWith('followers')) {
      this.tab = FollowsTabType.FOLLOWERS;
      this.userService.followers(this.user.id ?? '', this.filters).subscribe({
        next: (response: TPaginationResponse<TUser>) => {
          this.filters.offset = response.nextOffset ?? undefined;
          this.follows = response.records.map((user: TUser) => new User(user));
        },
        error: (e) => console.log(e),
      });
    } else {
      this.tab = FollowsTabType.FOLLOWING;
      this.userService.following(this.user.id ?? '', this.filters).subscribe({
        next: (response: TPaginationResponse<TUser>) => {
          this.filters.offset = response.nextOffset ?? undefined;
          this.follows = response.records.map((user: TUser) => new User(user));
        },
        error: (e) => console.log(e),
      });
    }
  }

  tabChange(tab: FollowsTabType) {
    this.tab = tab;
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
    });
  }
}
