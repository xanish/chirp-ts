import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  faGear = faGear;
  userOptions = false;
  user: User = this.tokenService.user();
  tweetModal = false;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  showTweetModal() {
    this.tweetModal = true;
  }

  hideTweetModal() {
    this.tweetModal = false;
  }

  toggleUserOptions() {
    this.userOptions = !this.userOptions;
  }

  logout() {
    this.tokenService.clear();
    this.router.navigate(['auth/login']);
  }
}
