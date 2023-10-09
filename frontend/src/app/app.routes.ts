import { Routes } from '@angular/router';
import { editProfileGuard } from './modules/core/guards/edit-profile.guard';
import { userAuthenticatedGuard } from './modules/core/guards/user-authenticated.guard';
import { tweetResolver } from './modules/core/resolvers/tweet.resolver';
import { userResolver } from './modules/core/resolvers/user.resolver';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { FollowsComponent } from './pages/follows/follows.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RepliesComponent } from './pages/replies/replies.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      user: userResolver,
    },
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: ':username/edit',
    component: EditProfileComponent,
    resolve: {
      user: userResolver,
    },
    canActivate: [userAuthenticatedGuard, editProfileGuard],
  },
  {
    path: ':username/followers',
    component: FollowsComponent,
    resolve: {
      user: userResolver,
    },
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: ':username/following',
    component: FollowsComponent,
    resolve: {
      user: userResolver,
    },
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: 'tweets/:tweetId',
    component: RepliesComponent,
    resolve: {
      tweet: tweetResolver,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];