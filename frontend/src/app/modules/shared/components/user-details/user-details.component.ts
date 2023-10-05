import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { FollowAction } from '../../enums/follow-action.enum';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf, DatePipe],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User = User.default();
  @Output() toggleFollow: EventEmitter<{ id: string; action: FollowAction }> =
    new EventEmitter();
  loggedInUserId: string = '';

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.tokenService.id() ?? '';
  }

  followUser(userId: string) {
    this.userService.follow(userId).subscribe({
      next: (response: any) => {
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
        this.toggleFollow.emit({ id: userId, action: FollowAction.UNFOLLOW });
      },
      error: (e) => {
        this.alertService.error(e, 'Failed to unfollow user');
      },
    });
  }
}
