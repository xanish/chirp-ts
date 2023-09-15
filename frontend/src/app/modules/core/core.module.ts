import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditProfileGuard } from './guards/edit-profile.guard';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { TweetService } from './services/tweet.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [SharedModule],
  providers: [
    ApiService,
    TokenService,
    TweetService,
    EditProfileGuard,
    UserAuthenticatedGuard,
  ],
})
export class CoreModule {}
