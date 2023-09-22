import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { InjectTokenInterceptor } from './modules/core/interceptors/inject-token.interceptor';
import { RefreshTokenInterceptor } from './modules/core/interceptors/refresh-token.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { FollowsComponent } from './pages/follows/follows.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RepliesComponent } from './pages/replies/replies.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    EditProfileComponent,
    NotFoundComponent,
    FollowsComponent,
    RepliesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
