import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { editProfileGuard } from './modules/core/guards/edit-profile.guard';
import { userAuthenticatedGuard } from './modules/core/guards/user-authenticated.guard';
import { userResolver } from './modules/core/resolvers/user.resolver';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { FollowsComponent } from './pages/follows/follows.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
