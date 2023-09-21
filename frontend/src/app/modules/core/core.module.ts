import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditProfileGuard } from './guards/edit-profile.guard';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { UserResolver } from './resolvers/user.resolver';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { TweetService } from './services/tweet.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, SharedModule],
  providers: [
    DatePipe,
    ApiService,
    TokenService,
    TweetService,
    EditProfileGuard,
    UserAuthenticatedGuard,
    UserResolver,
  ],
})
export class CoreModule {}
