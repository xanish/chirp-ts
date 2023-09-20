import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User = User.default();
  loggedInUserId: string = '';
  isFollowing: boolean = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loggedInUserId = this.tokenService.id() ?? '';
  }
}
