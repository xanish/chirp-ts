import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { CanAccessAuthGuard } from './guards/can-access-auth.guard';
import { EditProfileGuard } from './guards/edit-profile.guard';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { TweetResolver } from './resolvers/tweet.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AlertService } from './services/alert.service';
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
    InfiniteScrollModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }),
    FontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    ToastrModule,
  ],
  providers: [
    DatePipe,
    ApiService,
    TokenService,
    TweetService,
    AlertService,
    EditProfileGuard,
    CanAccessAuthGuard,
    UserAuthenticatedGuard,
    UserResolver,
    TweetResolver,
  ],
})
export class CoreModule {}
