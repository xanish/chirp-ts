import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { User } from '../../models/user.model';
import { TweetModalComponent } from '../tweet-modal/tweet-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    FontAwesomeModule,
    TweetModalComponent,
    NgClickOutsideDirective,
  ],
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

  hideUserOptions() {
    this.userOptions = false;
  }

  toggleUserOptions() {
    this.userOptions = !this.userOptions;
  }

  logout() {
    this.tokenService.clear();
    this.router.navigate(['auth/login']);
  }
}
