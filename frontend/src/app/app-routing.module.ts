import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { editProfileGuard } from './modules/core/guards/edit-profile.guard';
import { userAuthenticatedGuard } from './modules/core/guards/user-authenticated.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FeedComponent } from './pages/feed/feed.component';
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
    canActivate: [userAuthenticatedGuard],
  },
  {
    path: ':username/edit',
    component: EditProfileComponent,
    canActivate: [userAuthenticatedGuard, editProfileGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
