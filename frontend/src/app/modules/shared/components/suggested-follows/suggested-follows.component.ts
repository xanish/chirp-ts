import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { FollowAction } from '../../enums/follow-action.enum';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-suggested-follows',
  templateUrl: './suggested-follows.component.html',
  styleUrls: ['./suggested-follows.component.css'],
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
})
export class SuggestedFollowsComponent {
  @Input() suggestions: Array<User> = [];
  @Output() toggleFollow: EventEmitter<{ id: string; action: FollowAction }> =
    new EventEmitter();

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  followUser(userId: string) {
    this.userService.follow(userId).subscribe({
      next: (response: any) => {
        this.suggestions = this.suggestions.map((follow: User) => {
          if (follow.id === userId) {
            follow.following = true;
          }

          return follow;
        });
        this.toggleFollow.emit({ id: userId, action: FollowAction.FOLLOW });
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to follow user');
      },
    });
  }

  unfollowUser(userId: string) {
    this.userService.unfollow(userId).subscribe({
      next: (response: any) => {
        this.suggestions = this.suggestions.map((follow: User) => {
          if (follow.id === userId) {
            follow.following = false;
          }

          return follow;
        });
        this.toggleFollow.emit({ id: userId, action: FollowAction.UNFOLLOW });
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to unfollow user');
      },
    });
  }
}
