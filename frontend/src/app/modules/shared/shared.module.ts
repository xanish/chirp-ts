import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SuggestedFollowsComponent } from './components/suggested-follows/suggested-follows.component';
import { TweetModalComponent } from './components/tweet-modal/tweet-modal.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    ValidationMessageComponent,
    SidebarComponent,
    TweetComponent,
    UserDetailsComponent,
    NavbarComponent,
    TweetModalComponent,
    SuggestedFollowsComponent,
  ],
  exports: [
    ValidationMessageComponent,
    SidebarComponent,
    TweetComponent,
    UserDetailsComponent,
    NavbarComponent,
    TweetModalComponent,
    SuggestedFollowsComponent,
  ],
})
export class SharedModule {}
