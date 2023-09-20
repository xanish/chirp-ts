import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    SidebarComponent,
    TweetComponent,
    UserDetailsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ValidationMessageComponent,
    SidebarComponent,
    TweetComponent,
    UserDetailsComponent,
  ],
})
export class SharedModule {}
